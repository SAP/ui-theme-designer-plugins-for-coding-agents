---
name: open-theme-designer
description: Open the UI Theme Designer web application on an ABAP system, optionally with a theme pre-selected
---

## Context

User wants to open the UI Theme Designer (transaction `/UI5/THEME_TOOL`) in a browser, optionally jumping straight into a specific theme.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`)

## Procedure

1. Construct the URL:
   - Base: `$SAP_ABAP_HOST/sap/bc/theming/theme-designer/index.html?sap-client=$SAP_ABAP_CLIENT`
   - If a theme ID is known, append `&sap-initial-theme=<themeId>`

2. Open the URL in the user's browser. Try these approaches in order:
   - An MCP tool that can navigate a browser (e.g. Playwright's `browser_navigate`, or any similar tool)
   - A shell command to open the URL (e.g. `open` on macOS, `xdg-open` on Linux, `start` on Windows)
   - If none of the above are available, present the URL to the user as a clickable link

## Examples

| Scenario | URL |
|----------|-----|
| Open Theme Designer | `$SAP_ABAP_HOST/sap/bc/theming/theme-designer/index.html?sap-client=$SAP_ABAP_CLIENT` |
| Open with theme pre-selected | `$SAP_ABAP_HOST/sap/bc/theming/theme-designer/index.html?sap-client=$SAP_ABAP_CLIENT&sap-initial-theme=mytheme` |

## Notes

- Authentication in the browser is handled by the browser session (SSO/IDP login). The `SAP_ABAP_AUTH` env var is not needed here — it is only used for WebDAV API calls.
- If the system presents a login page, stop and tell the user to log in manually. Do NOT attempt to automate authentication or enter credentials — even if you have access to a browser automation tool.
- If the user is not yet logged in, the system will redirect to a login page.

## Next steps

- [list-themes](./list-themes.md): Discover available theme IDs to use with `sap-initial-theme`
- [inspect-theme](./inspect-theme.md): Explore a theme's files via WebDAV
