---
name: sap-theming-abap
description: Manage custom themes on SAP ABAP systems (on-premise NetWeaver / S/4HANA). Lists themes, inspects structure and metadata, modifies theming parameters, defines palette parameters (custom LESS variables), edits custom CSS rules, deletes themes, and opens the UI Theme Designer in a browser. Use when the user mentions ABAP theming, on-premise themes, /UI5/THEME_TOOL, theme parameters on an ABAP system, custom CSS in ABAP themes, or wants to inspect/change/delete themes stored in SAP NetWeaver or S/4HANA.
---

# SAP Theming ABAP (WebDAV)

This skill enables you to interact with themes stored in an SAP ABAP system's theme repository via WebDAV. The ABAP system exposes themes at `/sap/bc/theming/themes/~client-<NNN>` — the same repository that the UI Theme Designer (transaction `/UI5/THEME_TOOL`) uses.

## Workflows

Load the appropriate workflow file based on the user's intent:

| Intent | Workflow |
|--------|----------|
| List available themes | [list-themes](./workflows/list-themes.md) |
| Explore a theme's files | [inspect-theme](./workflows/inspect-theme.md) |
| Read theme metadata (.theming) | [read-metadata](./workflows/read-metadata.md) |
| Change a theming parameter | [modify-parameter](./workflows/modify-parameter.md) |
| Add/modify custom CSS rules | [custom-css](./workflows/custom-css.md) |
| Define palette parameters (user variables) | [palette-parameters](./workflows/palette-parameters.md) |
| Copy/duplicate an existing theme | [copy-theme](./workflows/copy-theme.md) |
| Delete a custom theme from all frameworks and libraries | [delete-theme](./workflows/delete-theme.md) |
| Open the UI Theme Designer at `${SAP_ABAP_HOST}/sap/bc/theming/theme-designer/index.html?sap-client=${SAP_ABAP_CLIENT}` in a browser | [open-theme-designer](./workflows/open-theme-designer.md) |

Each workflow is self-contained: it declares its own prerequisites (including reference documents) and links to logical next steps. Follow the prerequisite chain — load referenced files before executing the procedure.

## Reference documents

These are loaded on demand by workflows that need them:

| Document | Content |
|----------|---------|
| [authentication](./reference/authentication.md) | Environment variables, Basic/Bearer auth setup, CSRF token flow |
| [http-patterns](./reference/http-patterns.md) | Repository URL structure, common headers, all WebDAV operations (PROPFIND/GET/PUT/DELETE/COPY/MKCOL), SAP-specific methods, content types, error codes |
| [discover-theme-locations](./reference/discover-theme-locations.md) | How to enumerate all framework/library folders containing a given theme (used by copy-theme and delete-theme) |

## Limitations

- **No compilation.** This skill can read and write theme source files (LESS, custom CSS, metadata), but it cannot compile themes. Compilation (turning LESS sources into the final CSS outputs) requires the theming engine, which only runs inside the UI Theme Designer browser session. If the user needs to see compiled output, they must open the theme in `/UI5/THEME_TOOL` and rebuild.
- **No theme creation from scratch.** Creating a new theme requires not just folder/file creation but also an initial compilation pass to generate the base content. Use this skill to inspect, modify, **copy**, or delete existing themes — not to create entirely new ones from nothing. To create a new theme, use [copy-theme](./workflows/copy-theme.md) to duplicate an existing one and then modify the copy.
- **SAP-provided themes are read-only.** Themes with `"sVendor": "SAP"` in their `.theming` metadata cannot be modified. Only customer themes (`"sVendor": "CUSTOMER"`) are writable.

## Safety guidelines

- **Always read before modifying.** Before overwriting a file with PUT, GET it first and show the user the current content.
- **Update `mThemeMasterState` on every write.** Whenever you PUT a source file (`css_variables.less`, `custom.less`, `custom_css.less`, or any other designtime file), you MUST also update `.theming` to set `mData.mThemeMasterState.mSourceInfo.sLastModified` to the current ISO 8601 timestamp (`new Date().toJSON()` format, e.g. `"2025-03-20T14:22:11.456Z"`). Without this, the UI Theme Designer won't know the theme needs recompilation.
- **Confirm destructive operations.** Before DELETE or overwriting an existing file, ask the user for confirmation.
- **Never store credentials.** Do not write `SAP_ABAP_AUTH` or decoded credentials to any file, memory, or log.
- **Notify after saves.** Always send the `ThemeSaved` notification after writing files — without it, the ABAP system won't invalidate its caches.
- **Check repository options first.** Call `GetRepositoryOptions` before writes to confirm the repository isn't read-only.
