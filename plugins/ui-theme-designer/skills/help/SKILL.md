---
name: help
description: "TRIGGER: how-to and conceptual questions about UI theme designer on BTP — setup, user/role management, creating/editing themes, quick/detailed/expert theming, publishing, transporting themes, fallback themes, theme sets, integrating with Build Work Zone / S/4HANA / SAPUI5 / SAP GUI, troubleshooting and error messages. SKIP: questions about which themes or parameters exist or what values they have (use design-tokens). SKIP: tenant-specific operational questions about a running system (\"which themes do we have?\", \"which users are assigned?\")."
allowed-tools: Bash(git clone *) Bash(git -C * sparse-checkout *) Bash(git -C * checkout) Read
metadata:
  version: 1.0.0-rc1
---

# UI theme designer help

_(all paths below are relative to the folder that contains this SKILL.md)_

## Prerequisites

`btp-ui-theme-designer/docs/cf` exists; if not:

```sh
git clone --depth 1 --filter=blob:none --no-checkout --sparse https://github.com/SAP-docs/btp-ui-theme-designer
git -C btp-ui-theme-designer sparse-checkout set docs/cf/
git -C btp-ui-theme-designer checkout
```

## Procedure

1. read `btp-ui-theme-designer/docs/cf/index.md`
2. read the file from the index whose title best matches the topic in the user's prompt; if uncertain, read 2–3 candidate files and pick the most relevant. Each entry in `index.md` links to a file in the same `docs/cf/` tree.
3. answer based on that information
