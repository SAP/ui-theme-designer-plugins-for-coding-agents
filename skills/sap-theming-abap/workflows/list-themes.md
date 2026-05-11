---
name: list-themes
description: Discover available themes in an ABAP theme repository
---

## Context

User wants to see which themes exist on an ABAP system — either all themes or just custom ones.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference

## Procedure

1. PROPFIND on `Base/baseLib/` with depth 1:
   ```bash
   curl -X PROPFIND \
     -H "Authorization: $SAP_ABAP_AUTH" \
     -H "X-Requested-With: XMLHttpRequest" \
     -H "sap-client: $SAP_ABAP_CLIENT" \
     -H "Depth: 1" \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/"
   ```
2. Parse the XML response:
   - Extract all `<href>` or `<D:href>` values
   - Entries ending with `/` are folders (theme IDs)
   - The first entry is the folder itself — skip it
   - Strip the path prefix to get theme IDs
3. To distinguish custom from SAP-provided themes:
   - **Quick heuristic:** SAP themes have `sap_` prefix (e.g. `sap_horizon`). Custom themes typically use other prefixes.
   - **Authoritative check:** GET the `.theming` file for a theme and check `sVendor` — `"SAP"` means SAP-provided (read-only), `"CUSTOMER"` means custom (writable). Use this when you need certainty, not just a quick scan.

## Result

A list of theme IDs available in the repository. Each ID corresponds to a folder under `Base/baseLib/`.

## Next steps

- [inspect-theme](./inspect-theme.md): Explore a specific theme's file structure
- [read-metadata](./read-metadata.md): Read a theme's `.theming` JSON to see its parent, vendor, and timestamps
