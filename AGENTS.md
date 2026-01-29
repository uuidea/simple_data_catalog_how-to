# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a documentation repository for the simple_data_catalog project - a LinkML-based data catalog management tool. The repository contains documentation and how-to guides for end users working with DCAT-compatible data catalogs, data lineage, data quality, and data policy management.

**Publishing**: Documentation is published to GitHub Pages at https://uuidea.github.io/simple_data_catalog_how-to/

## Repository Structure

- `README.md` - Main project documentation
- `LICENSE` - Creative Commons Attribution 4.0 International license

This is a documentation-only repository with no build system, tests, or source code.

## Commands

Since this is a documentation repository, there are no build, lint, or test commands. The following commands are relevant:

### Documentation
- View documentation: `cat README.md`
- Check license: `cat LICENSE`

### GitHub Pages Publishing
This repository uses GitHub Pages for documentation publishing. Changes are automatically deployed when pushed to the main branch.
- Documentation site: https://uuidea.github.io/simple_data_catalog_how-to/
- No build commands required - markdown files are served directly

### Git Operations
- Check status: `git status`
- Add changes: `git add .`
- Commit changes: `git commit -m "descriptive message"`
- Push changes: `git push`

## Code Style Guidelines

### Documentation Style
- Use GitHub-flavored markdown
- Maintain proper heading hierarchy (# ## ### ####)
- Include links to relevant standards and repositories
- Use clear, concise language suitable for technical documentation
- Include code examples with proper syntax highlighting

### File Organization
- Keep documentation files in the repository root
- Use descriptive filenames
- Maintain consistent naming conventions (lowercase with underscores)

### Content Guidelines
- Focus on user-facing documentation and how-to guides
- Reference relevant W3C standards (DCAT, PROV, DQV, ODRL)
- Include practical examples and use cases
- Provide clear setup and configuration instructions

### Writing Style
- Use active voice
- Be concise and direct
- Define technical terms on first use
- Use consistent terminology throughout
- Include relevant context and background information

## Related Projects

This documentation references:
- `simple_data_catalog` - Main data catalog tool (Python/LinkML)
- `simple_data_catalog_model` - Data model definitions
- `simple-data-catalog-generator` - Static site generator

## Standards Compliance

When working with this repository, ensure compliance with:
- DCAT (Data Catalog Vocabulary)
- PROV (Provenance Ontology)
- DQV (Data Quality Vocabulary)
- ODRL (Open Digital Rights Language)

## GitHub Pages Publishing

This repository uses GitHub Pages for documentation publishing. Changes are automatically deployed when pushed to the main branch.
- Documentation site: https://uuidea.github.io/simple_data_catalog_how-to/
- No build commands required - markdown files are served directly by GitHub Pages

## License

All contributions should be compatible with Creative Commons Attribution 4.0 International license.

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Make documentation changes
4. Ensure all links are valid and relevant
5. Submit a pull request with clear description

## Quality Assurance

- Verify all external links are accessible
- Check markdown syntax validity
- Ensure consistent formatting
- Review for clarity and accuracy
- Test any code examples or commands provided