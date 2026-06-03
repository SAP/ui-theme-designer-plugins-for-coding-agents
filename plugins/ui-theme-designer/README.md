# UI theme designer plugin for coding agents

Plugin for coding agents working with [UI theme designer](https://help.sap.com/docs/btp/sap-business-technology-platform/sap-ui-theme-designer) and the SAP Design System — including [SAP Fiori design tokens](https://github.com/SAP/theming-base-content).

## Key Features

### 📋 Skills

#### help

Answers how-to and conceptual questions about UI theme designer on BTP:

- Setup, user/role management
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

### Via Claude CLI

```bash
claude plugin install ui-theme-designer@claude-plugins-official
```

### In Claude Code

```
/plugin install ui-theme-designer@claude-plugins-official
```

## Installing Skills Only

If your coding agent doesn't support plugins, install the skills directly using the [skills](https://www.npmjs.com/package/skills) package:

```bash
npx skills add SAP/theming-plugins-coding-agents
```
