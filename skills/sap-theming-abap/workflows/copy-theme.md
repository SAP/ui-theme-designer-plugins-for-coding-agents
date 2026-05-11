---
name: copy-theme
description: Copy (duplicate) an existing theme to create a new custom theme with a different ID
---

## Context

User wants to duplicate an existing theme to create a new custom theme. This is the typical way to create a new theme — you copy an SAP-provided or existing custom theme and then modify the copy.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference (COPY, PUT, PROPFIND, CSRF flow)
- [discover-theme-locations](../reference/discover-theme-locations.md): How to find all framework/library folders for a theme

## Procedure

### 1. Choose the source theme

Confirm the source theme exists by reading its `.theming`:

```bash
curl -s -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/<sourceTheme>/.theming"
```

Note the `sId`, `sLabel`, and `oExtends` from the response.

### 2. Discover all occurrences of the source theme

Follow [discover-theme-locations](../reference/discover-theme-locations.md) to enumerate all framework/library paths containing the source theme.

### 3. Fetch a CSRF token

Follow the CSRF token flow described in [authentication](../reference/authentication.md).

### 4. Copy all occurrences

For each library path found in step 2, issue a WebDAV COPY:

```bash
/usr/bin/curl -s -o /dev/null -w "%{http_code}" -X COPY \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "Destination: $SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/<path>/<newThemeId>/" \
  -H "Overwrite: F" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/<path>/<sourceTheme>/"
```

- `Overwrite: F` prevents overwriting an existing theme. Use `T` only if the user explicitly confirms.
- Expected response: 201 (created). 412 means the target already exists.

### 5. Rename the theme in all files

After the copy, the new theme's files still contain references to the source theme ID. You must update both `.theming` metadata and LESS source files.

**5a. Update `.theming` files:**

For each `.theming` in the copy (at minimum `Base/baseLib/<newThemeId>/.theming`, but also check other framework/library locations), GET it and update:
- `sId` → the new theme ID
- `sLabel` → user-provided label (or "Copy of <original label>")
- `sVendor` → `"CUSTOMER"`
- `mData.mThemeMasterState.mSourceInfo.sCreated` → current ISO 8601 timestamp
- `mData.mThemeMasterState.mSourceInfo.sLastModified` → current ISO 8601 timestamp

PUT each updated `.theming` back.

**5b. Update LESS source files:**

LESS files within the theme contain `@import` paths and references that include the source theme ID. For each LESS file in the copy (`base.less`, `custom.less`, `library.less`, etc.):

1. GET the file
2. Replace all occurrences of the source theme ID with the new theme ID (e.g. in import paths like `../../sap_horizon/base.less` that should now point to the new theme's own file, or theme ID references within the LESS content)
3. PUT the modified file back

The key files to check are in `Base/baseLib/<newThemeId>/` — they typically have imports referencing the theme's own folder name.

### 6. Send ThemeSaved notification

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/?X-SAP-Method=Notify&X-SAP-Events=%5B%7B%22EventId%22%3A%22ThemeSaved%22%2C%22ThemeId%22%3A%22<newThemeId>%22%7D%5D"
```

### 7. Verify

PROPFIND `Base/baseLib/` and confirm the new theme ID appears.

## Notes

- The new theme inherits the source's compiled CSS outputs. It is immediately usable by applications without a rebuild — but any subsequent source modifications will require a rebuild in `/UI5/THEME_TOOL`.
- Theme IDs must be unique within a client.
- If copying an SAP theme (e.g. `sap_horizon`), the copy's `oExtends` should remain pointing to the SAP theme's parent — this is the correct inheritance chain.

## Next steps

- [modify-parameter](./modify-parameter.md): Change parameters in the new theme
- [custom-css](./custom-css.md): Add custom CSS to the new theme
- [palette-parameters](./palette-parameters.md): Define palette parameters in the new theme
