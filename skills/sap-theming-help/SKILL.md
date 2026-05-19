---
name: sap-theming-help
description: "Use this skill to answer how-to and conceptual questions about SAP UI Theme Designer: setup, creating/editing/publishing/migrating themes and theme sets, customizing via quick/detailed/expert theming, integrating with SAP products (Build Work Zone, S/4HANA, SAPUI5, SAP GUI), transporting themes, and security/troubleshooting. Don't trigger for tenant-specific questions (\"Which custom themes do we have?\"). Only trigger for theme-specific questions (\"What's sapButton_Background?\") if the sap-theming-content skill is not available."
version: 1.0.0-rc0
---

# SAP Theming Help

_(with `.` being the folder that contains this SKILL.md)_

## Prerequisites

`./btp-ui-theme-designer/docs/cf` exists; if not:

```sh
git clone --depth 1 --filter=blob:none --no-checkout --sparse https://github.com/SAP-docs/btp-ui-theme-designer
git -C ./btp-ui-theme-designer sparse-checkout set docs/cf/
git -C ./btp-ui-theme-designer checkout
```

## Procedure

1. read `./btp-ui-theme-designer/docs/cf/index.md`
2. read the reference documentation file most relevant for the prompt
3. answer based on that information
