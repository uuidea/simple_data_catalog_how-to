#!/usr/bin/env node

'use strict'

const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')

const cwd = process.cwd()

// Parse format from CLI
const format = process.argv[2]
if (!format) {
  console.error('Please specify format: pdf or epub')
  process.exit(1)
}

if (!['pdf', 'epub'].includes(format)) {
  console.error('Invalid format. Supported formats: pdf, epub')
  process.exit(1)
}

// Create minimal playbook for single format generation
const playbook = {
  site: {
    title: 'Data Management for Data Publishers',
    url: 'https://uuidea.github.io/simple_data_catalog_how-to'
  },
  content: {
    sources: [{ url: '.', branches: 'HEAD' }]
  },
  output: { dir: './build/site' },
  ui: {
    bundle: {
      url: 'https://gitlab.com/antora/antora-ui-default/-/jobs/artifacts/HEAD/raw/build/ui-bundle.zip?job=bundle-stable',
      snapshot: true
    },
    supplemental_files: 'supplemental-ui'
  },
  antora: {
    extensions: [{
      require: path.join(cwd, 'extensions/multi-format-generator'),
      formats: [format],
      pdf: { output_dir: 'pdf' },
      epub: { output_dir: 'epub' }
    }]
  },
  asciidoc: {
    attributes: {
      'page-pagination': '',
      'experimental': '',
      'kroki-fetch-diagram': false,
      'kroki-default-format': 'svg@',
      'kroki-server-url': 'http://kroki.uuidea.eu:8000/'
    },
    extensions: ['@djencks/asciidoctor-mathjax']
  }
}

// Write temporary playbook
const tempPlaybookPath = path.join(process.cwd(), 'build', 'temp-playbook.yml')

// Ensure build directory exists
fs.mkdir(path.dirname(tempPlaybookPath), { recursive: true })
  .then(() => fs.writeFile(tempPlaybookPath, JSON.stringify(playbook, null, 2)))
  .catch(err => {
    console.error('Failed to create temp playbook:', err)
    process.exit(1)
  })

// Run Antora with temporary playbook
const { spawn } = require('child_process')
const antora = spawn('npx', ['antora', tempPlaybookPath, '--to-dir', 'build/site'], {
  stdio: 'inherit'
})

antora.on('close', (code) => {
  // Cleanup
  fs.unlink(tempPlaybookPath).catch(() => {})
  
  if (code !== 0) {
    console.error(`Build failed with code ${code}`)
    process.exit(code)
  } else {
    console.log(`${format.toUpperCase()} generation completed successfully`)
  }
})