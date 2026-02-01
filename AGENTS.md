# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

Antora-based documentation repository for simple_data_catalog project - a LinkML-based data catalog management tool. Contains how-to guides for DCAT-compatible data catalogs, data lineage, data quality, and data policy management.

**Related repositories**:
- [simple_data_catalog](https://github.com/uuidea/simple_data_catalog)
- [simple_data_catalog_model](https://github.com/uuidea/simple_data_catalog_model)

**Publishing**: Built with Antora and published to GitHub Pages at https://uuidea.github.io/simple_data_catalog_how-to/

## Repository Structure

`modules/` contains Antora documentation modules (ROOT, getting-started, dcat, dqv, prov, odrl). All content is in AsciiDoc format. Key files: `antora-playbook.yml`, `package.json`, `AGENTS.md`.

## Commands

### Antora Build Commands
- Build documentation: `npx antora antora-playbook.yml --to-dir build/site`
- Build with clean output: `npx antora antora-playbook.yml --clean --to-dir build/site`
- Validate playbook: `npx antora antora-playbook.yml --dry-run`
- Serve locally: `cd build/site && python -m http.server 8000`
- Build and serve: `npx antora antora-playbook.yml --to-dir build/site && cd build/site && python -m http.server 8000`

### Documentation Validation
- Validate AsciiDoc: `find modules/ -name "*.adoc" -exec asciidoctor {} \;`
- Check for broken links: `find modules/ -name "*.adoc" -exec asciidoctor -r asciidoctor-html5s {} \;`
- Install dependencies: `npm install`
- Update dependencies: `npm update`

### Git Operations
- Check status: `git status`
- Add all changes: `git add .`
- Commit changes: `git commit -m "descriptive message"`
- Push to main: `git push origin main`
- View history: `git log --oneline -10`
- Create branch: `git checkout -b feature/name`
- Switch branches: `git checkout main`
- Merge branch: `git merge feature/name`

### Testing Commands
- **Single file validation**: `asciidoctor modules/ROOT/pages/index.adoc`
- **Module validation**: `asciidoctor modules/dcat/pages/*.adoc`
- **Link checking**: Use online AsciiDoc validators for comprehensive link validation
- **Preview build**: `npx antora antora-playbook.yml --to-dir test-build && ls -la test-build/`

### GitHub Pages Publishing
- Automatic deployment on push to main branch
- Documentation site: https://uuidea.github.io/simple_data_catalog_how-to/
- Local preview: `cd build/site && python -m http.server 8000`

## Code Style Guidelines

### Documentation Style
- Use AsciiDoc format with Antora extensions
- Maintain proper heading hierarchy (= == === ====) with no skipping levels
- Include internal links using Antora xref syntax (e.g., `xref:dcat:intro.adoc[DCAT Introduction]`)
- Include external links to standards: https://www.w3.org/TR/vocab-dcat-3/, https://www.w3.org/TR/prov-o/, https://www.w3.org/TR/vocab-dqv/, https://www.w3.org/TR/odrl-model/
- Use clear, concise language suitable for technical documentation
- Include code examples with proper syntax highlighting using `[source,language]` blocks
- Add line breaks before headings for readability
- Use bullet points (`*`) and numbered lists (`.`) for structured information

### File Organization
- Keep documentation files in the repository modules/ directory
- Use descriptive filenames in lowercase with underscores (e.g., `getting_started.adoc`)
- Maintain logical file structure with related content grouped

### Content Guidelines
- Focus on user-facing documentation and how-to guides
- Reference relevant W3C standards (DCAT, PROV, DQV, ODRL)
- Include practical examples with progressive complexity (basic → intermediate → advanced)
- Provide clear setup and configuration instructions
- Define technical terms on first use with brief explanations
- Use consistent terminology throughout (e.g., "dataset" not "data set")
 
### Code Examples in Documentation
- Use YAML format for LinkML data catalog examples
- make sure examples of instance data conform to the model published at github.com/uuidea/simple_data_catalog_model/
- Include complete, runnable examples with consistent indentation (2 spaces for YAML)
- Validate YAML syntax before including in documentation

## Standards Compliance

When working with this repository, ensure compliance with:
- [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/) (Data Catalog Vocabulary)
- [PROV-O](https://www.w3.org/TR/prov-o/) (Provenance Ontology)
- [DQV](https://www.w3.org/TR/vocab-dqv/) (Data Quality Vocabulary)
- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) (Open Digital Rights Language)

### W3C Standards Usage
- Use proper namespace prefixes: `dcat:`, `prov:`, `dqv:`, `odrl:`
- Follow standard class and property naming conventions
- Include references to normative specifications when explaining concepts
- Ensure examples demonstrate correct usage of standard vocabularies

### Related Projects
- `simple_data_catalog` - Main data catalog tool (Python/LinkML-based template)
- `simple_data_catalog_model` - Data model definitions (LinkML schema)
- `simple-data-catalog-generator` - Static site generator for publishing catalogs

## Error Handling

### Documentation Errors
- Check for broken links using online validators
- Validate YAML syntax in examples before including
- Test code commands before including in documentation

### Git Workflow Issues
- Handle merge conflicts: `git pull --rebase origin main`
- Resolve commit message formatting issues

## License

All contributions should be compatible with Creative Commons Attribution 4.0 International license.

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/name`
3. Make documentation changes
4. Validate AsciiDoc: `find modules/ -name "*.adoc" -exec asciidoctor {} \;`
5. Ensure all links are valid and relevant
6. Test any code examples or commands provided
7. Submit a pull request with clear description of changes
8. Ensure documentation follows style guidelines in this file

## Quality Assurance

- Verify all external links are accessible
- Check AsciiDoc syntax validity using `asciidoctor` or online validators
- Ensure consistent formatting and heading hierarchy
- Review for clarity and accuracy
- Test any code examples or commands provided
- Validate all YAML code blocks
- Ensure cross-references work correctly

## Quick Reference

### Common AsciiDoc Patterns
- Inline code: `` `code` ``
- Code blocks: `[source,language] ...`
- Links: `link:url[Text]` or `xref:page.adoc[Text]`
- Tables: `|===` format for tables
- Lists: Use `*` for bullet, `.` for numbered

### Standard Prefixes
```yaml
dcat: http://www.w3.org/ns/dcat#
prov: http://www.w3.org/ns/prov#
dqv: http://www.w3.org/ns/dqv#
odrl: http://www.w3.org/ns/odrl/2/
dcterms: http://purl.org/dc/terms/
foaf: http://xmlns.com/foaf/0.1/
xsd: http://www.w3.org/2001/XMLSchema#
```

### File Naming Conventions
- Use lowercase with underscores: `data_catalog_guide.adoc`
- Be descriptive but concise: `getting_started.adoc`
- Include version numbers for major updates: `migration_guide_v2.adoc`