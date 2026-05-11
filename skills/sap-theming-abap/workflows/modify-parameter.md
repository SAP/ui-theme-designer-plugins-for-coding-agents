---
name: modify-parameter
description: Change an existing SAP theming parameter value in a custom theme
---

## Context

User wants to change a theming parameter (e.g. `sapBrandColor`, `sapUiBaseText`) in a custom theme stored on the ABAP system.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference
- [read-metadata](./read-metadata.md): Confirm the theme is writable (`sVendor: "CUSTOMER"`) and know its parent

## Procedure

### Determine the correct file

Parameters are defined in LESS source files. The `.theming` metadata does NOT index which file contains which parameter — you must find it by reading the source files.

**Step 1: Determine the framework from the parameter prefix:**

| Prefix | Framework | Base library path |
|--------|-----------|-------------------|
| `sapUi` | UI5 | `UI5/sap/ui/core/themes/<theme>/` |
| `sapUr` | UR | `UR/ls/<theme>/` |
| `sap` (all others) | Base | `Base/baseLib/<theme>/` |

**Step 2: Find which file defines the parameter.**

Each framework's `.theming` has a `sBaseFileId` field that names the file where SAP parameters are defined:

| Framework | `sBaseFileId` | File |
|-----------|---------------|------|
| Base | `base` | `base.less` |
| UR | `base` | `base.less` |
| UI5 | `library` | `library.less` |

Start by reading the `sBaseFileId` file in the **parent** theme (from `oExtends` in the custom theme's `.theming`). GET it and grep for `@<paramName>:` (the colon distinguishes a definition from a reference):

```bash
curl -s -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/sap_horizon/base.less" \
  | grep "@sapBrandColor:"
```

If the parameter isn't in the base file, it may be inherited further up the chain. Check the parent's parent via its `.theming` → `oExtends`.

Note: Palette parameters (user-defined variables) live in a different file — `Base/baseLib/<theme>/custom.less`. See [palette-parameters](./palette-parameters.md) for those.

**Step 3: Override in the same-named file in the custom theme.**

Once you know the parent defines `@sapBrandColor` in `base.less`, you override it in `Base/baseLib/<custom_theme>/base.less`. If this file doesn't exist yet in the custom theme, create it with just the parameter override.

### Steps

1. Read the `.theming` file of the custom theme to understand its structure:
   ```bash
   curl ... "<repo-root>/Base/baseLib/custom_horizon/.theming"
   ```
2. Read the correct LESS file for the parameter (e.g. `base.less` for `sapBrandColor`):
   ```bash
   curl ... "<repo-root>/Base/baseLib/custom_horizon/base.less"
   ```
3. Create or modify the LESS variable assignment (e.g. `@sapBrandColor: #0070f2;` → `@sapBrandColor: #ff0000;`)
4. Update `mData.mThemeMasterState.mSourceInfo.sLastModified` in the `.theming` JSON to the current ISO 8601 timestamp (e.g. `"2025-03-20T14:22:11.456Z"` — the format produced by `new Date().toJSON()`). If `mSourceInfo.sCreated` does not exist, set it to the same value.
5. Fetch CSRF token
6. PUT the modified LESS file first (ordering matters — if this fails, the `.theming` timestamp stays unchanged):
   ```bash
   curl -X PUT -H "xsrfid: <token>" -H "Content-Type: text/plain" \
     -b "$COOKIE_FILE" \
     --data-binary @modified.less "<repo-root>/Base/baseLib/custom_horizon/base.less"
   ```
7. PUT the updated `.theming` file:
   ```bash
   curl -X PUT -H "xsrfid: <token>" -H "Content-Type: application/json" \
     -b "$COOKIE_FILE" \
     --data-binary @updated.theming "<repo-root>/Base/baseLib/custom_horizon/.theming"
   ```
8. Notify the repository:
   ```bash
   curl -H "xsrfid: <token>" \
     -b "$COOKIE_FILE" \
     "<repo-root>/?X-SAP-Method=Notify&X-SAP-Events=<encoded>"
   ```

## Result

The LESS source file and `.theming` metadata are updated on the ABAP system. The theme now shows "modified after last build" in the UI Theme Designer, prompting the user to rebuild.

Modifying LESS source files does NOT automatically regenerate compiled CSS (`css_variables.css`, `library.css`, etc.). Compilation requires the theming engine which only runs inside the UI Theme Designer browser session.

## Next steps

- Open the theme in `/UI5/THEME_TOOL` and rebuild to compile the change into CSS output
- [custom-css](./custom-css.md): Add visual CSS rules that use the modified parameter
- [palette-parameters](./palette-parameters.md): Define user-defined variables that reference the modified parameter
