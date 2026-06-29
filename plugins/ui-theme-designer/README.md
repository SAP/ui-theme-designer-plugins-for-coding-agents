# UI Theme Designer Plugin

General plugin for coding agents working with the UI theme designer [SAP Help pages](https://help.sap.com/docs/btp/sap-business-technology-platform/sap-ui-theme-designer) and the SAP Design System — including [SAP Fiori design tokens](https://github.com/SAP/theming-base-content).

## Key Features

### 📋 Skills

#### help

Answers how-to get started with UI theme designer and conceptual questions about UI theme designer on BTP:

- Initial setup, including user/role management
- Creating, editing, and publishing themes
- Quick, detailed, and expert theming workflows
- Transporting themes, fallback themes, theme sets
- Integration with SAP Build Work Zone, S/4HANA, SAPUI5, SAP GUI
- Troubleshooting and error messages

#### design-tokens

Answers questions about the SAP Design System and SAP Fiori design tokens:

- Which themes exist (e.g. `sap_horizon`, `sap_fiori_3`) and what value a parameter has in each
- How parameters inherit and extend across the theme chain via `.theming` files
- Which parameters a specific UI component consumes — for [SAPUI5/OpenUI5](https://github.com/UI5/openui5), [UI5 Web Components](https://github.com/UI5/webcomponents), and [Fundamental Styles](https://github.com/SAP/fundamental-styles)

## Installation

### Via Claude CLI (coming soon)

```bash
claude plugin install ui-theme-designer@claude-plugins-official
```

### In Claude Code (coming soon)

```
/plugin install ui-theme-designer@claude-plugins-official
```

## Installing Skills Only

If your coding agent doesn't support plugins, install the skills directly using the [skills](https://www.npmjs.com/package/skills) package:

```bash
npx skills add SAP/ui-theme-designer-plugins-for-coding-agents
```


## Examples

Examples showing in which situations the UI Theme Designer plugin can help you.

### Develop a Custom Component Using Design Tokens of Similar Components

**Situation:** You are building a custom component library and want to add a new component that looks consistent with the SAP Design System. The UI technology doesn't matter — this works with UI5, Web Components, or any other framework. To make the component themable, you want to reuse the SAP theming parameters that standard components of the same type already use.

**Example:** You want to build a `ThemeCard` component that displays a preview of an SAP theme. Instead of guessing which parameters to use, ask:

> _"I want to develop a card control to display a preview of a SAP theme. Please list existing card parameters I can use in the CSS."_

**Result:** The agent returns the theming parameters that the UI5 Web Components `Card` uses, grouped by purpose. UI5 Web Components serve as the reference implementation of the SAP Design System, so the skill defaults to them when no UI framework is specified — for example:

| Purpose | Parameters |
|---|---|
| Background & border | `--sapTile_Background`, `--sapTile_BorderColor`, `--sapTile_BorderCornerRadius` |
| Elevation | `--sapContent_Shadow0` (default), `--sapContent_Shadow2` (hover) |
| Title text | `--sapGroup_TitleTextColor`, `--sapFontHeaderFamily`, `--sapFontHeader6Size` |
| Header separator | `--sapTile_SeparatorColor` |
| Focus ring | `--sapContent_FocusColor`, `--sapContent_FocusWidth`, `--sapContent_FocusStyle` |

You can use this list directly in your CSS, reference it in a feature description ("the ThemeCard should look like standard cards"), or let the agent propose a full CSS implementation based on it.