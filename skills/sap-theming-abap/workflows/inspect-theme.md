---
name: inspect-theme
description: Explore the file structure of a specific theme
---

## Context

User wants to see what files a theme contains — either to understand its structure or to find a specific file before reading/modifying it.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference
- Know the theme ID (run [list-themes](./list-themes.md) first if needed)

## Procedure

1. PROPFIND with depth infinity on the theme folder:
   ```bash
   curl -X PROPFIND \
     -H "Authorization: $SAP_ABAP_AUTH" \
     -H "X-Requested-With: XMLHttpRequest" \
     -H "sap-client: $SAP_ABAP_CLIENT" \
     -H "Depth: infinity" \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/"
   ```
2. Parse the XML response. Key files in a theme:
   - `.theming` — JSON metadata (theme name, parent theme, vendor, etc.)
   - `css_variables.css` — compiled CSS variables output
   - `css_variables.less` — LESS source for CSS variables (parameter overrides)
   - `library.css` — compiled library CSS (per UI5 library subfolder)
   - `custom.less` — custom LESS content (meaning varies by framework — see [custom-css](./custom-css.md))
   - `custom_css.less` — (Base/baseLib only) auto-generated merged custom CSS from UR + UI5 frameworks

**Note:** A theme spans multiple frameworks. To see the full picture, also PROPFIND on:
- `UR/ls/<theme>/` and `UR/c2/<theme>/` for UR framework files
- `UI5/sap/ui/core/themes/<theme>/` for UI5 core library files

## Result

A tree of files and folders that make up the theme across its framework/library locations.

## Next steps

- [read-metadata](./read-metadata.md): Read the `.theming` JSON for details about the theme
- [modify-parameter](./modify-parameter.md): Change a theming parameter value
- [custom-css](./custom-css.md): Understand or modify the theme's custom CSS
