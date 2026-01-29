# Introduction

## Purpose and Scope

This documentation provides comprehensive guidance for data publishers, metadata managers, and data stewards who want to create and manage data catalogs using the simple_data_catalog framework. This guide covers the fundamentals of metadata management for data cataloging, with an emphasis on generic metadata management based on W3C standards.

The goal of this documentation is to both train people in the basics of (meta)data management and the use of the simple_data_catalog framework. It serves as both an educational resource for understanding metadata standards and a practical guide for implementing data catalogs in real-world scenarios.

## Overview of Simple Data Catalog

simple_data_catalog is a LinkML-based data catalog management tool that provides a low-barrier-to-entry approach for creating DCAT-compatible data catalogs. The framework is built around four core metadata areas:

- **Data Catalog Metadata** - Based on [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/) for describing datasets, distributions, and data services
- **Data Lineage** - Based on [PROV-O](https://www.w3.org/TR/prov-o/) for tracking data provenance and transformation history
- **Data Quality** - Based on [DQV](https://www.w3.org/TR/vocab-dqv/) for measuring and reporting data quality metrics
- **Data Policy** - Based on [ODRL 2.2](https://www.w3.org/TR/odrl-model/) for expressing usage rights and permissions

The framework uses a YAML-based configuration that generates RDF graphs compliant with these standards, making it easy to create interoperable data catalogs without requiring deep technical expertise.

## Target Audience

This guide is intended for:

- **Data Publishers** - Organizations and individuals who publish datasets and need to create catalog metadata
- **Metadata Managers** - Professionals responsible for managing data catalogs and metadata workflows
- **Data Stewards** - People responsible for data governance and quality management
- **Technical Staff** - IT professionals who implement and maintain catalog systems
- **Researchers** - Academics and students learning about metadata standards and data management

## Prerequisites

Readers should have:

- Basic understanding of data concepts and metadata
- Familiarity with web technologies and data formats
- Experience with data management workflows
- Interest in standards-based approaches to data cataloging

## How to Use This Guide

This documentation is structured to support both learning and practical implementation:

- **Progressive Complexity** - Each chapter starts with theoretical foundations and builds to advanced real-world examples
- **Standards-Based** - All implementations are grounded in W3C standards (DCAT, PROV, DQV, ODRL)
- **Practical Focus** - Emphasis on hands-on examples using simple_data_catalog
- **Cross-Reference** - Rich linking between chapters to show how different metadata areas work together

Each chapter includes:
- Theory and concepts behind the standard
- How the standard is implemented in simple_data_catalog
- Progressive examples from basic to advanced
- Best practices and common pitfalls

## Document Structure

This guide is organized into chapters covering each metadata area:

1. **Getting Started** - Setup and basic catalog creation
2. **Data Catalog Metadata (DCAT)** - Core catalog concepts and dataset description
3. **Data Lineage (PROV)** - Tracking data provenance and transformations
4. **Data Quality (DQV)** - Measuring and improving data quality
5. **Data Policy (ODRL)** - Managing usage rights and permissions
6. **Advanced Topics** - Complex scenarios and enterprise considerations
7. **Best Practices** - Governance, maintenance, and community engagement
8. **Appendices** - Quick references and troubleshooting

By following this guide, readers will gain both theoretical understanding and practical skills for creating and managing comprehensive data catalogs using simple_data_catalog.