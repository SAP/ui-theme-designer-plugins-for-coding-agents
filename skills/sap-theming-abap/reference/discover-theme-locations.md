---
name: discover-theme-locations
description: How to enumerate all framework/library folders that contain a given theme ID
---

## Overview

A theme on an ABAP system spans multiple frameworks and libraries. A single theme ID (e.g. `custom_horizon`) exists as a folder in many locations:

```
Base/baseLib/custom_horizon/
Base/icons/custom_horizon/
UR/ls/custom_horizon/
UR/c2/custom_horizon/
UI5/sap/m/themes/custom_horizon/
UI5/sap/ui/core/themes/custom_horizon/
UI5/sap/ui/table/themes/custom_horizon/
... (30–40 total for a fully compiled theme)
```

Operations that affect the entire theme (copy, delete) must enumerate and process all of these locations.

## Discovery procedure

### 1. List frameworks

PROPFIND with Depth 1 on the repository root:

```bash
curl -s -X PROPFIND \
  -H "Authorization: $SAP_ABAP_AUTH" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "sap-client: $SAP_ABAP_CLIENT" \
  -H "Depth: 1" \
  "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/"
```

Typical frameworks: `Base`, `NWBC`, `UI5`, `UR`.

### 2. List libraries within each framework

The library structure varies by framework:

| Framework | Library path pattern | Example |
|-----------|---------------------|---------|
| Base | `Base/<lib>/` | `Base/baseLib/`, `Base/icons/` |
| NWBC | `NWBC/<lib>/` | `NWBC/baseLib/` |
| UR | `UR/<lib>/` | `UR/baseLib/`, `UR/ls/`, `UR/c2/` |
| UI5 | `UI5/sap/<org>/themes/` | `UI5/sap/m/themes/`, `UI5/sap/ui/core/themes/` |

**UI5 is nested:** `UI5/sap/` contains sub-orgs (e.g. `m`, `f`, `ui`, `ushell`). Some sub-orgs like `ui` have a further level of sub-libraries (e.g. `UI5/sap/ui/core/`, `UI5/sap/ui/table/`). The theme folder is always under a `themes/` directory at the leaf level.

To enumerate all UI5 libraries:
1. PROPFIND `UI5/sap/` → list sub-orgs
2. For each sub-org, PROPFIND `UI5/sap/<suborg>/themes/` — if it returns themes, this is a leaf library
3. If no `themes/` exists, PROPFIND `UI5/sap/<suborg>/` to find sub-libraries, then check `UI5/sap/<suborg>/<sublib>/themes/` for each

### 3. Find occurrences of the theme

For each library path, check whether it contains the theme ID:

- **Base/NWBC/UR:** PROPFIND `<framework>/<lib>/` with Depth 1, grep for `<themeId>/`
- **UI5:** PROPFIND `UI5/sap/<org>/themes/` (or `UI5/sap/<org>/<sublib>/themes/`) with Depth 1, grep for `<themeId>/`

### Result

A list of full paths to all folders containing the theme. Use these paths for per-folder operations (COPY, DELETE, etc.).

## Notes

- A typical theme with full UI5 content has 30–40 library occurrences. The exact number depends on which UI libraries are installed on the system.
- The discovery loop is safe to run sequentially; no parallelism needed since each PROPFIND is fast.
- Use `/usr/bin/curl` explicitly in loops/functions if the shell loses `curl` from PATH inside subshells.
