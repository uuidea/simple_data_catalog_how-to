'use strict'

const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

module.exports.register = function ({ config, playbook }) {
  const logger = this.getLogger('multi-format-generator')
  
  // Check for environment variable MULTI_FORMATS
  const envFormats = process.env.MULTI_FORMATS
  let formats = []
  
  if (envFormats) {
    // Parse formats from environment variable: MULTI_FORMATS=pdf,epub
    formats = envFormats.split(',').map(f => f.trim().toLowerCase())
    logger.info(`Using formats from environment: ${formats.join(', ')}`)
    
    // Update the extension config dynamically
    const multiFormatExt = playbook.antora.extensions.find(ext => ext.require && ext.require.includes('multi-format-generator'))
    if (multiFormatExt) {
      multiFormatExt.formats = formats
    }
  } else {
    // Use configuration from playbook
    formats = config.formats || []
    if (!Array.isArray(formats) || formats.length === 0) {
      logger.info('No formats specified in multi-format extension configuration')
      return
    }
    logger.info(`Multi-format generator enabled for: ${formats.join(', ')}`)
  }
  
  // Hook after navigation is built to access all content
  this.on('navigationBuilt', async ({ contentCatalog, siteAsciiDocConfig }) => {
    if (formats.length === 0) return
    
    // Collect all modules respecting navigation order
    const allModules = collectAllModules(contentCatalog)
    

    
    // Generate each format independently with error isolation
    if (formats.includes('pdf')) {
      await generateConsolidatedPdf(allModules, contentCatalog, siteAsciiDocConfig, config.pdf || {}, logger)
    }
    
    if (formats.includes('epub')) {
      await generateConsolidatedEpub(allModules, contentCatalog, siteAsciiDocConfig, config.epub || {}, logger)
    }
  })
}

function collectAllModules(contentCatalog) {
  const modules = {}
  const moduleOrder = ['ROOT', 'getting-started', 'dcat', 'dqv', 'prov', 'odrl']
  
  // Initialize module containers
  moduleOrder.forEach(name => { modules[name] = [] })
  
  // Collect pages sorted by navigation order
  contentCatalog.getComponents().forEach(component => {
    component.versions.forEach(version => {
      const pages = contentCatalog.findBy({
        component: component.name,
        version: version.version,
        family: 'page'
      })
      
      // Filter out partials and appendices (we only want regular pages)
      const regularPages = pages.filter(page => !page.src.relative.includes('_') && page.src.basename !== '404')
      
      // Group pages by their actual module (from src.path)
      regularPages.forEach(page => {
        const modulePath = page.src.path
        const moduleMatch = modulePath.match(/modules\/([^\/]+)/)
        if (moduleMatch) {
          const actualModuleName = moduleMatch[1]
          if (modules[actualModuleName]) {
            modules[actualModuleName].push(page)
          }
        }
      })
    })
  })
  
  // Sort pages within each module by navigation order
  contentCatalog.getComponents().forEach(component => {
    component.versions.forEach(version => {
      Object.keys(modules).forEach(moduleName => {
        modules[moduleName].sort((a, b) => {
          const orderA = getNavigationOrder(a, version.navigation)
          const orderB = getNavigationOrder(b, version.navigation)
          return orderA - orderB
        })
      })
    })
  })
  
  return modules
}

function getNavigationOrder(page, navigation) {
  // Extract order from navigation structure
  try {
    if (!navigation || !Array.isArray(navigation)) {
      return 999
    }
    const flatNav = flattenNavigation(navigation)
    if (!Array.isArray(flatNav)) {
      return 999
    }
    const navItem = flatNav.find(item => item.url && item.url === page.pub.url)
    return navItem ? navItem.order : 999
  } catch (error) {
    return 999
  }
}

function flattenNavigation(items, result = [], order = 0) {
  if (!Array.isArray(items)) {
    return order
  }
  
  items.forEach(item => {
    result.push({ ...item, order })
    if (item.items && Array.isArray(item.items)) {
      order = flattenNavigation(item.items, result, order + 1)
    } else {
      order++
    }
  })
  return order
}

async function generateConsolidatedPdf(modules, contentCatalog, siteAsciiDocConfig, pdfConfig, logger) {
  try {
    const masterDoc = createMasterDocument(modules, 'pdf', pdfConfig)
    const tempPath = path.join(process.cwd(), 'build', 'temp-master-pdf.adoc')
    const outputDir = path.join(process.cwd(), pdfConfig.output_dir || 'pdf')
    const outputFile = path.join(outputDir, 'simple-data-catalog.pdf')
    
    // Ensure directories exist
    await fs.mkdir(path.dirname(tempPath), { recursive: true })
    await fs.mkdir(outputDir, { recursive: true })
    
    // Write master document
    await fs.writeFile(tempPath, masterDoc)
    
    // Generate PDF without kroki extension for standalone
    const cmd = `asciidoctor-pdf -a pdf-theme=${pdfConfig.theme || 'default'} "${tempPath}" -o "${outputFile}"`
    await execAsync(cmd)
    
    logger.info(`PDF generated successfully: ${outputFile}`)
    
    // Cleanup
    await fs.unlink(tempPath)
    
  } catch (error) {
    logger.warn(`PDF generation failed: ${error.message}`)
    // Don't throw - allow HTML build to continue
  }
}

async function generateConsolidatedEpub(modules, contentCatalog, siteAsciiDocConfig, epubConfig, logger) {
  try {
    const masterDoc = createMasterDocument(modules, 'epub', epubConfig)
    const tempPath = path.join(process.cwd(), 'build', 'temp-master-epub.adoc')
    const outputDir = path.join(process.cwd(), epubConfig.output_dir || 'epub')
    const outputFile = path.join(outputDir, 'simple-data-catalog.epub')
    
    // Ensure directories exist
    await fs.mkdir(path.dirname(tempPath), { recursive: true })
    await fs.mkdir(outputDir, { recursive: true })
    
    // Write master document
    await fs.writeFile(tempPath, masterDoc)
    
    // Generate EPUB without kroki extension for standalone
    const cmd = `asciidoctor-epub3 "${tempPath}" -o "${outputFile}"`
    await execAsync(cmd)
    
    logger.info(`EPUB generated successfully: ${outputFile}`)
    
    // Cleanup
    await fs.unlink(tempPath)
    
  } catch (error) {
    logger.warn(`EPUB generation failed: ${error.message}`)
    // Don't throw - allow HTML build to continue
  }
}

function createMasterDocument(modules, format, config) {
  const sections = []
  const moduleOrder = ['ROOT', 'getting-started', 'dcat', 'dqv', 'prov', 'odrl']
  
  moduleOrder.forEach(moduleName => {
    const pages = modules[moduleName] || []
    if (pages.length === 0) return
    
    sections.push(`\n\n== ${getModuleTitle(moduleName)}`)
    
    pages.forEach(page => {
      // Read the source AsciiDoc content directly from the file
      let content
      try {
        // Read the source file directly to get raw AsciiDoc
        content = require('fs').readFileSync(page.src.abspath, 'utf8')
      } catch (error) {
        console.warn(`Could not read source file for page ${page.src.basename}: ${error.message}`)
        return
      }
      
      // Skip if content is empty or invalid
      if (!content || content.trim() === '') return
      
      // Remove leading document title if it's a standalone page (to avoid duplicate titles)
      content = content.replace(/^= .+?\n\n/, '')
      
      // Adjust heading levels: increment by 1 for proper hierarchy (since modules are level 2 ==)
      content = content.replace(/^(=+)/gm, (match, p1) => '=' + p1)
      
      sections.push(`\n\n${content}`)
    })
  })
  
  const header = `= Data Management for Data Publishers
:doctype: book
:toc: left
:toclevels: 3
:sectnums:
:source-highlighter: rouge
:kroki-fetch-diagram: true
${format === 'pdf' ? ':pdf-theme: ' + (config.theme || 'default') : ''}
${format === 'epub' ? ':ebook-format: ' + (config.format || 'epub3') : ''}

`
  
  return header + sections.join('\n\n')
}

function getModuleTitle(moduleName) {
  const titles = {
    'ROOT': 'Introduction',
    'getting-started': 'Getting Started',
    'dcat': 'Data Catalog Metadata (DCAT)',
    'dqv': 'Data Quality (DQV)',
    'prov': 'Data Lineage (PROV)',
    'odrl': 'Data Policy (ODRL)'
  }
  return titles[moduleName] || moduleName
}