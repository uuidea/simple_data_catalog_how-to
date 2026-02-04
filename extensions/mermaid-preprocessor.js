'use strict'

const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

module.exports.register = function ({ config, playbook }) {
  const logger = this.getLogger('mermaid-preprocessor')
  
  const renderMode = playbook.asciidoc?.attributes?.['mermaid-render-mode'] || 'server'
  
  // Only run in server mode for offline generation
  if (renderMode !== 'server') {
    logger.info('Mermaid preprocessor disabled (client-side rendering mode)')
    return
  }
  
  logger.info('Mermaid preprocessor enabled for server-side rendering using standard Antora image directories')
  
  // Hook into navigation built to process all pages (same as multi-format-generator)
  this.on('navigationBuilt', async ({ contentCatalog }) => {
    try {
      logger.info('Processing Mermaid diagrams for offline SVG generation...')
      
      const processedPages = new Set()
      
      // Process all pages
      contentCatalog.getComponents().forEach(component => {
        component.versions.forEach(version => {
          const pages = contentCatalog.findBy({
            component: component.name,
            version: version.version,
            family: 'page'
          })
          
          pages.forEach(page => {
            if (!processedPages.has(page.src.path)) {
              processPage(page, logger)
              processedPages.add(page.src.path)
            }
          })
        })
      })
      
      logger.info('Mermaid diagram processing completed')
    } catch (error) {
      logger.error(`Mermaid preprocessor failed: ${error.message}`)
    }
  })
}

async function processPage(page, logger) {
  try {
    const content = page.contents?.toString() || ''
    if (!content.includes('[mermaid')) {
      return // No Mermaid diagrams found
    }
    
    logger.info(`Processing Mermaid diagrams in: ${page.src.relative}`)
    
    // Determine the module from the page path
    const moduleMatch = page.src.path.match(/modules\/([^\/]+)/)
    if (!moduleMatch) {
      logger.warn(`Could not determine module for page: ${page.src.relative}`)
      return
    }
    const moduleName = moduleMatch[1]
    
    // Create module-specific images/_generated directory
    const moduleImagesDir = path.join(process.cwd(), 'modules', moduleName, 'images', '_generated')
    await fs.mkdir(moduleImagesDir, { recursive: true })
    
    // Find all Mermaid blocks
    const mermaidRegex = /\[mermaid,\s*([^,\]]+),\s*svg\]\s*\n----\s*\n([\s\S]*?)\n----/g
    const matches = []
    let match
    
    while ((match = mermaidRegex.exec(content)) !== null) {
      matches.push({
        fullMatch: match[0],
        diagramId: match[1].trim(),
        diagramCode: match[2].trim()
      })
    }
    
    if (matches.length === 0) {
      return
    }
    
    let modifiedContent = content
    
    // Process each Mermaid diagram
    for (const { fullMatch, diagramId, diagramCode } of matches) {
      try {
        const svgPath = await generateSvg(diagramId, diagramCode, moduleImagesDir, logger)
        
        // Replace Mermaid block with standard Antora image directive
        const title = diagramId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        const imageDirective = `.${title}
image::${moduleName}/images/_generated/${diagramId}.svg[${title}]`
        
        modifiedContent = modifiedContent.replace(fullMatch, imageDirective)
        logger.info(`  Generated SVG: ${moduleName}/${diagramId}`)
      } catch (error) {
        logger.warn(`Failed to generate SVG for ${diagramId}: ${error.message}`)
        // Keep original Mermaid block as fallback
      }
    }
    
    // Update page content
    page.contents = Buffer.from(modifiedContent)
    
  } catch (error) {
    logger.warn(`Error processing page ${page.src.relative}: ${error.message}`)
  }
}

async function generateSvg(diagramId, diagramCode, moduleImagesDir, logger) {
  const svgPath = path.join(moduleImagesDir, `${diagramId}.svg`)
  const tempMermaidPath = path.join(moduleImagesDir, `temp-${diagramId}.mmd`)
  
  try {
    // Write temporary Mermaid file
    await fs.writeFile(tempMermaidPath, diagramCode, 'utf8')
    
    // Generate SVG using mmdc (Mermaid CLI) with native text config
    const configPath = path.join(process.cwd(), 'mermaid-config.json')
    const cmd = `npx mmdc -i "${tempMermaidPath}" -o "${svgPath}" -c "${configPath}" -b white -w 1024 -H 768`
    
    try {
      await execAsync(cmd, { timeout: 30000 })
    } catch (execError) {
      // Try alternative command format
      const altCmd = `npx @mermaid-js/mermaid-cli -i "${tempMermaidPath}" -o "${svgPath}" -c "${configPath}" -b white -w 1024 -H 768`
      await execAsync(altCmd, { timeout: 30000 })
    }
    
    // Verify the SVG was created
    const svgExists = await fs.access(svgPath).then(() => true).catch(() => false)
    if (!svgExists) {
      throw new Error('SVG file was not created')
    }
    
    return svgPath
    
  } finally {
    // Clean up temporary file
    try {
      await fs.unlink(tempMermaidPath)
    } catch (cleanupError) {
      // Ignore cleanup errors
    }
  }
}