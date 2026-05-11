---
name: custom-css
description: Understand and modify custom CSS in a theme (framework-specific architecture, merged custom_css.less, save visual CSS rules)
---

## Context

User wants to add, modify, or understand custom CSS in a theme. Custom CSS in the SAP theming system is **framework-specific** and involves an auto-generation merge mechanism — it is NOT a single file.

## Prerequisites

- [authentication](../reference/authentication.md): Environment variables set (`SAP_ABAP_HOST`, `SAP_ABAP_CLIENT`, `SAP_ABAP_AUTH`)
- [http-patterns](../reference/http-patterns.md): WebDAV operations reference
- [read-metadata](./read-metadata.md): Confirm the theme is writable (`sVendor: "CUSTOMER"`)

## Architecture

### File structure per framework

| Framework | Base library | Custom file path | Purpose |
|-----------|-------------|------------------|---------|
| **Base** | `baseLib` | `Base/baseLib/<theme>/custom.less` | **Palette parameters** — see [palette-parameters](./palette-parameters.md) |
| **Base** | `baseLib` | `Base/baseLib/<theme>/custom_css.less` | **Merged custom CSS** (auto-generated from UR + UI5 custom CSS) |
| **UI5** | `sap/ui/core` | `UI5/sap/ui/core/themes/<theme>/custom.less` | UI5-specific custom CSS |
| **UR** | `ls` | `UR/ls/<theme>/custom.less` | UR Lightweight Styling custom CSS |
| **UR** | `c2` | `UR/c2/<theme>/custom.less` | UR c2 custom CSS |

**Important distinction — Base framework has TWO custom files:**
- `custom.less` (file ID: `custom`) — palette parameters (user-defined LESS variables). See [palette-parameters](./palette-parameters.md).
- `custom_css.less` (file ID: `custom_css`) — merged custom CSS auto-generated from UR.ls, UR.c2, and UI5.sap/ui/core sources.

### The Base framework merge mechanism

The `custom_css.less` file in `Base/baseLib/<theme>/` is **auto-generated**. It aggregates the freetext custom CSS content from three source files:

1. `UR/ls/<theme>/custom.less` — UR Lightweight Styling
2. `UR/c2/<theme>/custom.less` — UR c2 (skipped if identical to UR.ls)
3. `UI5/sap/ui/core/themes/<theme>/custom.less` — UI5 core library

Each source file wraps its custom CSS content in freetext markers:
```less
/*<SAP_FREETEXT_LESS>*/
.myComponent {
  background-color: @sapBackgroundColor;
}
/*</SAP_FREETEXT_LESS>*/
```

The merged `custom_css.less` contains a **regeneration marker** at the top:
```less
// WARNING: This file is auto-generated
// based on the custom CSS of the following
// libraries: UI5.sap/ui/core, UR.c2 and
// UR.ls. Any manual changes to this file
// will be overwritten during regeneration.
//
// To make permanent changes and stop the
// file from being overwritten, remove the
// following line (and you may also delete
// this comment):
// DELETE_THIS_LINE_TO_MAKE_CHANGES_PERMANENT
```

**Behavior:**
- If the marker `DELETE_THIS_LINE_TO_MAKE_CHANGES_PERMANENT` is present → the file will be **regenerated** (overwritten) on next theme load
- If the marker is removed → the file is treated as **manually maintained** and will NOT be overwritten

Each library's contribution in the merged file is annotated with timestamps:
```less
// UR.ls custom CSS at
// 2025-03-20T14:22:11.456Z:
<css content>

// UR.c2 custom CSS skipped because
// identical to UR.ls custom CSS at
// 2025-03-20T14:22:11.456Z

// UI5.sap/ui/core custom CSS at
// 2025-03-20T14:22:11.456Z:
<css content>
```

### Build file inclusion per framework

| Framework | Custom file in `aFiles`? | Custom file in `aBuildFiles`? |
|-----------|--------------------------|-------------------------------|
| **Base** | Yes (`custom` + `custom_css`) | Yes (`custom` + `custom_css`) |
| **UI5** | Yes (`custom`) | Yes (`custom`) |
| **UR** | Yes (`custom`, non-base libs only) | **No** (always empty) |

The UR framework intentionally excludes custom files from `aBuildFiles` — the custom CSS is instead merged into the Base framework's `custom_css.less` for compilation.

## Procedure — Save custom CSS (visual styling)

To save custom CSS, write to the correct framework-specific **source** file. The custom CSS uses LESS syntax and can reference theming parameters with `@paramName`.

**Determining the correct file:**
- For general/UR styling: `UR/ls/<theme>/custom.less`
- For UI5-specific styling: `UI5/sap/ui/core/themes/<theme>/custom.less`

### Steps

1. Read the current custom file to see existing content:
   ```bash
   curl -H "Authorization: $SAP_ABAP_AUTH" \
     -H "X-Requested-With: XMLHttpRequest" \
     -H "sap-client: $SAP_ABAP_CLIENT" \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/UR/ls/custom_horizon/custom.less"
   ```
2. Modify only the content between the `/*<SAP_FREETEXT_LESS>*/` and `/*</SAP_FREETEXT_LESS>*/` markers:
   ```less
   /*<SAP_FREETEXT_LESS>*/
   .myComponent {
     background-color: @sapBackgroundColor;
     border: 1px solid @sapGroup_ContentBorderColor;
   }
   /*</SAP_FREETEXT_LESS>*/
   ```
3. Read the `.theming` file for the framework+library where the custom file lives (e.g. `UR/ls/custom_horizon/.theming`)
4. Update `mData.mThemeMasterState.mSourceInfo.sLastModified` to the current ISO 8601 timestamp
5. Fetch CSRF token
6. PUT the modified custom file:
   ```bash
   curl -X PUT -H "xsrfid: <token>" -H "Content-Type: text/plain" \
     --data-binary @custom.less \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/UR/ls/custom_horizon/custom.less"
   ```
7. PUT the updated `.theming` file
8. Send `ThemeSaved` notification

## Result

The custom CSS source file is updated. On next theme load in the UI Theme Designer, `Base/baseLib/<theme>/custom_css.less` will be **regenerated** automatically (if the `DELETE_THIS_LINE_TO_MAKE_CHANGES_PERMANENT` marker is still present). You do NOT need to manually update `custom_css.less`.

The theme shows "modified after last build" — a rebuild in `/UI5/THEME_TOOL` is needed to compile the CSS.

## Next steps

- Open the theme in `/UI5/THEME_TOOL` and rebuild to see the custom CSS take effect
- [palette-parameters](./palette-parameters.md): Define reusable variables that can be referenced in custom CSS
- [modify-parameter](./modify-parameter.md): Change SAP parameters that your custom CSS references
