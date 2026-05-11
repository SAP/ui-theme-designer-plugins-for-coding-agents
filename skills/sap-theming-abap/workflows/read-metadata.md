---
name: read-metadata
description: Read a theme's .theming metadata file to understand its identity, parent, and state
---

## Context

User wants to know a theme's parent, vendor, label, creation date, last modification, or build state. This is also a prerequisite for most write operations (you need to read `.theming` before updating it).

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference
- Know the theme ID (run [list-themes](./list-themes.md) first if needed)

## Procedure

1. GET the `.theming` file:
   ```bash
   curl -H "Authorization: $SAP_ABAP_AUTH" \
     -H "X-Requested-With: XMLHttpRequest" \
     -H "sap-client: $SAP_ABAP_CLIENT" \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/.theming"
   ```

2. Parse the JSON response. Key fields:
   ```json
   {
     "sEntity": "Theme",
     "sId": "custom_horizon",
     "sVendor": "CUSTOMER",
     "oExtends": "sap_horizon",
     "sLabel": "Custom Morning Horizon",
     "sFallbackThemeId": "sap_horizon",
     "mData": {
       "mThemeMasterState": {
         "mSourceInfo": {
           "sCreated": "2025-01-10T08:00:00.000Z",
           "sLastModified": "2025-03-20T14:22:11.456Z"
         },
         "mBuildInfo": {
           "sLastBuilt": "2025-03-20T14:23:05.789Z"
         }
       }
     }
   }
   ```

3. Interpret the state:
   - `sVendor: "SAP"` → read-only (SAP-provided theme)
   - `sVendor: "CUSTOMER"` → writable (custom theme)
   - `oExtends` → the parent theme this one inherits from
   - `sLastModified > sLastBuilt` → theme has uncompiled changes ("modified, needs rebuild")
   - `sLastModified <= sLastBuilt` → theme is up to date

## Result

Understanding of the theme's identity, lineage, and current state (whether it needs recompilation).

## Next steps

- [modify-parameter](./modify-parameter.md): Change a theming parameter if the theme is writable
- [custom-css](./custom-css.md): Add or modify custom CSS
- [palette-parameters](./palette-parameters.md): Define user-defined variables
