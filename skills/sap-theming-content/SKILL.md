---
name: sap-theming-content
description: Explore and query SAP theming content — themes, libraries, LESS/CSS sources, and `.theming` metadata — across theming-base-content and openui5 repositories.
---

# SAP Theming Content

## Prerequisites

1. `./overview-of-sap-theming-content-91ebfe2.md` exists; if not: fetch https://raw.githubusercontent.com/SAP-docs/btp-ui-theme-designer/main/docs/cf/About-Themes/overview-of-sap-theming-content-91ebfe2.md into that file

2. `./theming-base-content/` exists; if not:
   ```sh
   git clone --depth 1 --filter=blob:none --no-checkout --sparse https://github.com/SAP/theming-base-content
   git -C theming-base-content sparse-checkout set content/
   git -C theming-base-content checkout
   ```
3. `./openui5` exists; if not:
   ```sh
   git clone --depth 1 --filter=blob:none --no-checkout https://github.com/UI5/openui5
   git -C openui5 sparse-checkout set --no-cone 'src/themelib_sap_horizon/**/themes/' 'src/themelib_sap_fiori_3/**/themes/' 'src/sap.*/**/themes/base/'
   ```

## Context

- `./overview-of-sap-theming-content-91ebfe2.md` explains the structure of a theme repository;
- `.theming` files contain metadata about entities (i.e. frameworks => libraries => themes => files), mainly:
  - `aFiles` LESS source files
  - `aBuildFiles` CSS files built from `aFiles`
  - `sBase{Library,Theme,File}Id` the ID of the most important library/theme/file
  - `oExtends` the `<Framework>[.<Library>[.<Theme>[.<File>]]]` Object Path of the entity this entity derives from => in the extends chain, the first entry one to define a value, wins
- `./theming-base-content/content/` is the `Base/` folder of the theme repository
- the `UI5/` folder of the theme repository is scattered across `./openui5`:
   - `./openui5/src/sap.*/**/themes/base` contains the `base/` theme of the different libraries
   - `./openui5/src/themelib_sap_horizon/**/themes/` contains the `sap_horizon_*` themes of the different libraries
   - `./openui5/src/themelib_sap_fiori_3/**/themes/` contains the `sap_fiori_3_*` themes of the different libraries

## Procedure

1. Determine the SAP theme the users question targets, present the available theme IDs from `./theming-base-content/content/Base/baseLib` as select options if unclear, default to `sap_horizon`
2. Determine the framework the users question targets, present "UI5" (to focus on `./openui5`) and "Other" (to focus on `./theming-base-content`) as select options if unclear, default to "Other"
3. Follow the `.theming` files and `${sBaseFileId}.less` of the framework, `${sBaseLibraryId}` and theme the users question targets, build an "import graph" of affected themes, libraries and frameworks starting from the `sBaseFileId`
4. Answer the users question based on that import graph
