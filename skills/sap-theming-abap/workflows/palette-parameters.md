---
name: palette-parameters
description: Define user-defined LESS variables (palette parameters) that can be used as reusable tokens across a custom theme
---

## Context

User wants to define custom LESS variables (palette parameters) for a theme. These are reusable tokens like `@myBrandColor` that can be referenced throughout the theme's LESS files. They must NOT start with `sap` — that prefix is reserved for SAP-provided parameters.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference
- [read-metadata](./read-metadata.md): Confirm the theme is writable (`sVendor: "CUSTOMER"`)

## Procedure

Palette parameters are stored in `Base/baseLib/<theme>/custom.less` (file ID: `custom`). This is distinct from `custom_css.less` which holds merged visual CSS — see [custom-css](./custom-css.md) for that distinction.

### Steps

1. Read the current `Base/baseLib/<theme>/custom.less`:
   ```bash
   curl -H "Authorization: $SAP_ABAP_AUTH" \
     -H "X-Requested-With: XMLHttpRequest" \
     -H "sap-client: $SAP_ABAP_CLIENT" \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/custom.less"
   ```
2. Add or modify parameters between the `/*<SAP_FREETEXT_LESS>*/` markers:
   ```less
   /*<SAP_FREETEXT_LESS>*/
   @myBrandColor: #0070f2;
   @myHighlightColor: darken(@myBrandColor, 10%);
   @myBackgroundTint: fade(@myBrandColor, 5%);
   /*</SAP_FREETEXT_LESS>*/
   ```
3. Read and update the `.theming` file at `Base/baseLib/custom_horizon/.theming`:
   - Set `mData.mThemeMasterState.mSourceInfo.sLastModified` to current ISO 8601 timestamp
4. Fetch CSRF token
5. PUT the modified `custom.less`:
   ```bash
   curl -X PUT -H "xsrfid: <token>" -H "Content-Type: text/plain" \
     --data-binary @custom.less \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/custom.less"
   ```
6. PUT the updated `.theming` file
7. Send `ThemeSaved` notification

### Rules for palette parameters

- Must NOT start with `sap` (validation enforced — the engine rejects IDs starting with `sap`)
- Can reference other parameters, including SAP parameters (e.g. `@myTint: fade(@sapBrandColor, 5%);`)
- Can use LESS functions: `darken()`, `lighten()`, `fade()`, `mix()`, `contrast()`, etc.
- Are available as variables in all other LESS files of the same theme
- Are tagged with `Master,Custom` in the engine's annotation system (visible in the UI Theme Designer)

## Result

The palette parameters are saved in the theme's `Base/baseLib/<theme>/custom.less`. They can now be referenced as `@myBrandColor` etc. in custom CSS (see [custom-css](./custom-css.md)) or other LESS source files.

The theme shows "modified after last build" — a rebuild in `/UI5/THEME_TOOL` is needed.

## Next steps

- Open the theme in `/UI5/THEME_TOOL` and rebuild
- [custom-css](./custom-css.md): Write visual CSS rules that reference the new palette parameters
- [modify-parameter](./modify-parameter.md): Change SAP parameters that your palette parameters derive from
