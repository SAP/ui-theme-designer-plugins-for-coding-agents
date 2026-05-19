---
name: sap-theming-content
description: "Use this skill to answer questions about the structure and usage of SAPs theming content/design tokens: which themes/parameters exist, how parameters depend on each other, or how they are used in components of SAPs UI technologies (openUI5)."
version: 1.0.0-rc0
---

# SAP Theming Content

_(with `.` being the folder that contains this SKILL.md)_

## Prerequisites

1. `./overview-of-sap-theming-content-91ebfe2.md` exists; if not: fetch https://raw.githubusercontent.com/SAP-docs/btp-ui-theme-designer/main/docs/cf/About-Themes/overview-of-sap-theming-content-91ebfe2.md into that file
2. `./theming-base-content/` exists; if not:
   ```sh
   git clone --depth 1 --filter=blob:none --no-checkout --sparse https://github.com/SAP/theming-base-content
   git -C ./theming-base-content sparse-checkout set content/
   git -C ./theming-base-content checkout
   ```
3. `./openui5` exists; if not:
   ```sh
   git clone --depth 1 --filter=blob:none --no-checkout https://github.com/UI5/openui5
   git -C ./openui5 sparse-checkout set --no-cone 'src/themelib_sap_horizon/**/themes/' 'src/themelib_sap_fiori_3/**/themes/' 'src/sap.*/**/themes/base/'
   git -C ./openui5 checkout
   ```

## Context

- `./overview-of-sap-theming-content-91ebfe2.md` explains the structure of a theme repository;
- `.theming` files contain metadata about entities (i.e. frameworks => libraries => themes => files), mainly:
  - `aFiles` LESS source files
  - `aBuildFiles` CSS files built from `aFiles`
  - `sBase{Library,Theme,File}Id` the ID of the most important library/theme/file
  - `oExtends` the `<Framework>[.<Library>[.<Theme>[.<File>]]]` Object Path of the entity this entity derives from => in the extends chain, the first entry one to define a value, wins
  - `bIgnore=true` excludes the entity from theming -- in that case, search for CSS files in the same folder, they'll likely reference theming parameters as CSS custom properties (`var(--sapButton_Background)` instead of `@sapButton_Background`)
- `./theming-base-content/content/` is the `Base/` folder of the theme repository
- the `UI5/` folder of the theme repository is scattered across `./openui5`:
   - `./openui5/src/sap.*/**/themes/base` contains the `base/` theme of the different libraries
   - `./openui5/src/themelib_sap_horizon/**/themes/` contains the `sap_horizon_*` themes of the different libraries
   - `./openui5/src/themelib_sap_fiori_3/**/themes/` contains the `sap_fiori_3_*` themes of the different libraries

## Procedure

1. Read `./overview-of-sap-theming-content-91ebfe2.md`
2. Determine the SAP theme the users question targets, present the available theme IDs from `./theming-base-content/content/Base/baseLib` as select options if unclear, default to `sap_horizon`
3. Determine the framework the users question targets, present "UI5" (to focus on `./openui5`) and "Other" (to focus on `./theming-base-content`) as select options if unclear, default to "Other"
4. Follow the `oExtends` of the `.theming` files and the LESS imports of the `${sBaseFileId}.less` of the framework, `${sBaseLibraryId}` and theme the users question targets, to build an "import graph" of affected themes, libraries and frameworks starting from the `sBaseFileId`
5. Answer the users question based on that import graph
