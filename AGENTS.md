# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a documentation repository for the simple_data_catalog project - a LinkML-based data catalog management tool. The repository contains documentation and how-to guides for end users working with DCAT-compatible data catalogs, data lineage, data quality, and data policy management.

this documentation concerns the following repositories:
- [simple_data_catalog](https://github.com/uuidea/simple_data_catalog)
- [simple_data_catalog_model](https://github.com/uuidea/simple_data_catalog_model)

**Publishing**: Documentation is published to GitHub Pages at https://uuidea.github.io/simple_data_catalog_how-to/

## Repository Structure

- `README.md` - Main project documentation
- `LICENSE` - Creative Commons Attribution 4.0 International license
- `AGENTS.md` - Guidelines for agentic coding agents

This is a documentation-only repository with no build system, tests, or source code. All content is in markdown format and served directly by GitHub Pages.

## Commands

Since this is a documentation repository, there are no build, lint, or test commands. The following commands are relevant:

### Documentation Commands
- View documentation: `cat README.md`
- Check license: `cat LICENSE`
- Validate markdown: `find . -name "*.md" -exec markdownlint {} \;` or use online validators
- Check links: `find . -name "*.md" -exec markdown-link-check {} \;`

### Git Operations
- Check status: `git status`
- Add changes: `git add .`
- Commit changes: `git commit -m "descriptive message"`
- Push changes: `git push`
- View history: `git log --oneline`
- Create branch: `git checkout -b new-feature`
- Merge changes: `git merge main`

### GitHub Pages Publishing
This repository uses GitHub Pages for documentation publishing. Changes are automatically deployed when pushed to the main branch.
- Documentation site: https://uuidea.github.io/simple_data_catalog_how-to/
- No build commands required - markdown files are served directly by GitHub Pages
- Local preview: `python -m http.server 8000` (serve docs locally for testing)

## Code Style Guidelines

### Documentation Style
- Use GitHub-flavored markdown with [CommonMark](https://commonmark.org/) compliance
- Maintain proper heading hierarchy (# ## ### ####) with no skipping levels
- Include internal links using relative paths (e.g., `[Chapter 1](#chapter-1)`)
- Include external links to standards: [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/), [PROV-O](https://www.w3.org/TR/prov-o/), [DQV](https://www.w3.org/TR/vocab-dqv/), [ODRL 2.2](https://www.w3.org/TR/odrl-model/)
- Use clear, concise language suitable for technical documentation
- Include code examples with proper syntax highlighting using triple backticks for inline and triple backticks for blocks
- Add line breaks before headings for readability
- Use bullet points and numbered lists for structured information

### File Organization
- Keep documentation files in the repository docs/ directory
- Use descriptive filenames in lowercase with underscores (e.g., `getting_started.md`)
- Maintain logical file structure with related content grouped
- Create `README.md` as main entry point with table of contents

### Content Guidelines
- Focus on user-facing documentation and how-to guides
- Reference relevant W3C standards (DCAT, PROV, DQV, ODRL)
- Include practical examples with progressive complexity (basic → intermediate → advanced)
- Provide clear setup and configuration instructions
- Define technical terms on first use with brief explanations
- Use consistent terminology throughout (e.g., "dataset" not "data set")

### Writing Style
- Use active voice ("Create a dataset" vs "A dataset is created")
- Be concise and direct (avoid unnecessary words)
- Use present tense for current procedures, past tense for completed actions
- Include relevant context and background information
- Use examples to illustrate abstract concepts
- Target audience: data publishers, metadata managers, data stewards

## Related Projects

This documentation references:
- `simple_data_catalog` - Main data catalog tool (Python/LinkML-based template)
- `simple_data_catalog_model` - Data model definitions (LinkML schema)
- `simple-data-catalog-generator` - Static site generator for publishing catalogs
- Related repositories may contain source code, build systems, and test examples

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

## GitHub Pages Publishing

This repository uses GitHub Pages for documentation publishing. Changes are automatically deployed when pushed to the main branch.
- Documentation site: https://uuidea.github.io/simple_data_catalog_how-to/
- No build commands required - markdown files are served directly by GitHub Pages

## Error Handling

### Documentation Errors
- Check for broken links using `markdown-link-check`
- Validate YAML syntax in examples
- Test code commands before including in documentation
- Provide troubleshooting sections for common issues

### Git Workflow Issues
- Handle merge conflicts by rebasing: `git pull --rebase origin main`
- Resolve commit message formatting issues
- Manage large file handling in documentation

## License

All contributions should be compatible with Creative Commons Attribution 4.0 International license.

## Documentation Structure Template

When creating new documentation files, follow this template:

```markdown
# Title

Brief description of what this document covers.

## Table of Contents
1. [Section 1](#section-1)
2. [Section 2](#section-2)

## Section 1
Content with examples.

## Section 2
More content.
```

## Quick Reference

### Common Markdown Patterns
- Inline code: `` `code` ``
- Code blocks: ```language ... ```
- Links: `[Text](url)` or `[Text](#anchor)`
- Tables: Use pipes `|` for alignment
- Lists: Use `-` for bullet, `1.` for numbered

### Standard Prefixes
```yaml
# DCAT (Data Catalog)
dcat: http://www.w3.org/ns/dcat#

# PROV (Provenance)
prov: http://www.w3.org/ns/prov#

# DQV (Data Quality)
dqv: http://www.w3.org/ns/dqv#

# ODRL (Rights)
odrl: http://www.w3.org/ns/odrl/2/

# Common
dcterms: http://purl.org/dc/terms/
foaf: http://xmlns.com/foaf/0.1/
xsd: http://www.w3.org/2001/XMLSchema#
```

### File Naming Conventions
- Use lowercase with underscores: `data_catalog_guide.md`
- Be descriptive but concise: `getting_started.md`
- Include version numbers for major updates: `migration_guide_v2.md`

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b new-feature`
3. Make documentation changes
4. Validate markdown: `find . -name "*.md" -exec markdownlint {} \;` or use online validators
5. Ensure all links are valid and relevant
6. Test any code examples or commands provided
7. Submit a pull request with clear description of changes
8. Ensure documentation follows style guidelines in this file

## Quality Assurance

- Verify all external links are accessible
- Check markdown syntax validity using `markdownlint` or online validators
- Ensure consistent formatting and heading hierarchy
- Review for clarity and accuracy
- Test any code examples or commands provided
- Check for proper spelling and grammar
- Validate all YAML/JSON code blocks
- Ensure cross-references work correctly