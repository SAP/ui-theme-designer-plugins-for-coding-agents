---
name: delete-theme
description: Completely delete a custom theme from all frameworks and libraries in the ABAP theme repository
---

## Context

User wants to delete a custom theme from the ABAP system. A compiled theme exists not only in `Base/baseLib/` but in every library of every framework (UI5, UR, NWBC). All occurrences must be found and deleted individually.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference (DELETE, PROPFIND, CSRF flow)
- [discover-theme-locations](../reference/discover-theme-locations.md): How to find all framework/library folders for a theme

## Procedure

### 1. Verify the theme is deletable

GET the theme's `.theming` metadata from `Base/baseLib/<themeId>/.theming` and check:
- `sVendor` must NOT be `"SAP"` — SAP-provided themes are read-only
- Confirm with the user before proceeding

### 2. Discover all occurrences of the theme

Follow the procedure in [discover-theme-locations](../reference/discover-theme-locations.md) to enumerate all framework/library paths that contain the theme.

### 3. Fetch a CSRF token

Follow the CSRF token flow described in [authentication](../reference/authentication.md).

### 4. Delete all occurrences

For each path found in step 2, issue a DELETE with `Depth: infinity`:

```bash
/usr/bin/curl -s -o /dev/null -w "%{http_code}" -X DELETE \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -H "Depth: infinity" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/<path>/"
```

Expected responses: 200 or 204 (success), 404 (already gone — not an error).

### 5. Notify the repository (optional)

Send a `ThemeDeleted` notification so that caches are invalidated. This may not be supported on all systems — if it fails, that's acceptable.

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "xsrfid: <token>" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -b "$COOKIE_FILE" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/?X-SAP-Method=Notify&X-SAP-Events=%5B%7B%22EventId%22%3A%22ThemeDeleted%22%2C%22ThemeId%22%3A%22<themeId>%22%7D%5D"
```

### 6. Verify deletion

Spot-check a few paths (e.g. `Base/baseLib/`, one UI5 library, one UR library) with PROPFIND to confirm the theme no longer appears.

## Notes

- Deleting from `Base/baseLib/` alone is NOT sufficient — the theme will still appear in the Theme Designer's theme list and applications will still find compiled CSS in the UI5/UR library folders.

## Next steps

- [list-themes](./list-themes.md): Verify the theme no longer appears in the theme list
