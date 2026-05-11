---
name: http-patterns
description: WebDAV HTTP operations, URL structure, headers, content types, and error codes for the ABAP theme repository
---

## Repository URL structure

```
$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT
```

All three values come from the environment variables defined in [authentication](./authentication.md).

### Theme file paths

```
<repository-root>/<framework>/<library>/<theme-id>/<file>
```

**Frameworks:** `Base` (base content — primary framework for theme discovery), `UI5` (SAPUI5 library themes), `UR` (Unified Rendering)

**Finding themes:** To list available themes, always PROPFIND on the `Base/baseLib/` path. Each subfolder under `Base/baseLib/` is a theme ID. The `UI5` and `UR` frameworks contain per-library subfolders within each theme but are not suitable for theme discovery.

**Example paths:**
```
<repo-root>/Base/baseLib/custom_horizon/.theming
<repo-root>/Base/baseLib/custom_horizon/css_variables.less
<repo-root>/Base/baseLib/custom_horizon/custom.less
<repo-root>/Base/baseLib/custom_horizon/custom_css.less
<repo-root>/UR/ls/custom_horizon/custom.less
<repo-root>/UI5/sap/ui/core/themes/custom_horizon/custom.less
```

## Common headers for ALL requests

```
Authorization: $SAP_ABAP_AUTH
X-Requested-With: XMLHttpRequest
sap-client: $SAP_ABAP_CLIENT
Cache-Control: no-cache
```

## Operations

### List themes (PROPFIND)

```bash
curl -X PROPFIND \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -H "Depth: 1" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/"
```

**Parsing the response:**
- Extract all `<href>` or `<D:href>` values from the XML
- Entries ending with `/` are folders (theme IDs)
- The first entry is the folder itself (skip it)
- Strip the path prefix to get theme IDs

### Read a file (GET)

```bash
curl -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/.theming"
```

### Check file existence (HEAD)

```bash
curl -I -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/.theming"
```

Returns 200 if exists, 404 if not.

### Create folder (MKCOL)

```bash
curl -X MKCOL \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/my_new_theme/"
```

Returns 201 (created) or 200 (already exists).

### Write/save a file (PUT)

```bash
curl -X PUT \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "Content-Type: text/plain" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  --data-binary @custom.less \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/custom_horizon/custom.less"
```

Returns 201 (created) or 204 (updated).

**Content-Type by file extension:**
| Extension | Content-Type |
|-----------|-------------|
| `.css` | `text/css` |
| `.less` | `text/plain` |
| `.theming` | `application/json` |
| `.json` | `application/json` |
| `.properties` | `text/plain` |
| `.png`, `.gif`, `.jpg` | `image/png`, `image/gif`, `image/jpeg` |

### Delete a file or folder (DELETE)

```bash
curl -X DELETE \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -H "Depth: infinity" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/old_theme/"
```

Returns 204 (deleted) or 404 (already gone — not an error).

### Copy a theme (COPY)

```bash
curl -X COPY \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "Destination: $SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/theme_copy/" \
  -H "Overwrite: F" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/Base/baseLib/original_theme/"
```

Returns 201 (created) or 204 (overwritten if `Overwrite: T`).

### Repository methods (SAP-specific)

SAP extends WebDAV with query-parameter-based methods:

**Get repository options:**
```bash
curl -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/.theme-repository-options.json?X-SAP-Method=GetRepositoryOptions"
```

Returns JSON with repository capabilities:
```json
{
  "bReadOnly": false,
  "aUnsupportedWebDavMethods": [],
  "aNotify": ["ThemeSaved", "ThemeBuilt"]
}
```

**Notify after save:**
```bash
curl -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/?X-SAP-Method=Notify&X-SAP-Events=%5B%7B%22EventId%22%3A%22ThemeSaved%22%2C%22ThemeId%22%3A%22custom_horizon%22%7D%5D"
```

The `X-SAP-Events` parameter is a URL-encoded JSON array:
```json
[{"EventId": "ThemeSaved", "ThemeId": "custom_horizon"}]
```

**Important:** After saving theme files, you MUST call `Notify` with `ThemeSaved` — this tells the ABAP system to invalidate its caches so that applications loading the theme pick up the new content.

## Error handling

| Status | Meaning | Action |
|--------|---------|--------|
| 200/201/204 | Success | Proceed |
| 207 | Multi-status (PROPFIND) | Parse XML body |
| 304 | Not modified | Use cached version |
| 401 | Unauthorized | Credentials invalid — check `SAP_ABAP_AUTH` |
| 403 | Forbidden (CSRF) | Refetch CSRF token and retry |
| 404 | Not found | File/folder doesn't exist |
| 423 | Locked | Resource locked by another user |
| 507 | Insufficient storage | Repository quota exceeded |
