---
name: sap-theming-content
description: "Use this skill to answer questions about the structure and usage of the SAP theming content/the SAP Fiori design tokens: which themes/parameters exist, how parameters depend on each other, or how they are used in components of SAPs UI technologies (UI5, UI5 Web Components, Fundamental Styles)."
version: 1.0.0-rc2
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
4. `./webcomponents` exists; if not:
   ```sh
   git clone --depth 1 --filter=blob:none --no-checkout https://github.com/UI5/webcomponents
   git -C ./webcomponents sparse-checkout set --no-cone 'packages/*/src/themes/**/*.css' '!packages/theming/**/*.css'
   git -C ./webcomponents checkout
   ```
5. `./fundamental-styles` exists; if not:
   ```sh
   git clone --depth 1 --filter=blob:none --no-checkout https://github.com/SAP/fundamental-styles
   git -C ./fundamental-styles sparse-checkout set --no-cone 'packages/*/src/**/*.scss' '!packages/doc-ui/**/*.scss'
   git -C ./fundamental-styles checkout
   ```

## Context

- `./overview-of-sap-theming-content-91ebfe2.md` explains the structure of a theme repository;
- `.theming` files contain metadata about entities (i.e. frameworks => libraries => themes => files), mainly:
  - `aFiles` LESS source files
  - `aBuildFiles` CSS files built from `aFiles`
  - `sBase{Library,Theme,File}Id` the ID of the most important library/theme/file
  - `oExtends` the `<Framework>[.<Library>[.<Theme>[.<File>]]]` Object Path of the entity this entity derives from => in the extends chain, the first entry one to define a value, wins
  - `bIgnore=true` excludes the entity from theming -- in that case, search for CSS files in the same folder, they'll likely reference theming parameters as CSS custom properties (`var(--sapButton_Background)` instead of `@sapButton_Background`)
  - `sSourcePathPattern` the structure to resolve object paths to file paths in this framework 
- `./theming-base-content/content/` is the `Base/` folder of the theme repository
- the `UI5/` folder of the theme repository is scattered across `./openui5`:
   - `./openui5/src/sap.*/**/themes/base` contains the `base/` theme of the different libraries
   - `./openui5/src/themelib_sap_horizon/**/themes/` contains the `sap_horizon_*` themes of the different libraries
   - `./openui5/src/themelib_sap_fiori_3/**/themes/` contains the `sap_fiori_3_*` themes of the different libraries
- `./webcomponents/packages/*/src/themes` contains the CSS of UI5 Web Components
   - they don't participate in a theme repository
   - instead, they use the CSS custom properties from `Base/baseLib/<theme>/css_variables.css`
   - components have a theme-independent skeleton CSS in `./webcomponents/packages/*/src/themes/<component>.css`
   - this skeleton CSS is merged with CSS custom property definitions in `./webcomponents/packages/*/src/themes/base/<component>-parameters.css` (the "base", always used) and `./webcomponents/packages/*/src/themes/<theme>/<component>-parameters.cs` (the actual theme, as a delta)
- `./fundamental-styles` contains the SCSS (Sass) of Fundamental Styles
   - they don't participate in a theme repository
   - instead, they use the CSS custom properties from `Base/baseLib/<theme>/css_variables.css`

## Procedure

1. Read `./overview-of-sap-theming-content-91ebfe2.md`
2. Determine the SAP theme the users question targets, present the available theme IDs from `./theming-base-content/content/Base/baseLib` as select options if unclear, default to `sap_horizon`
3. Determine the framework the users question targets, present "UI5" (to focus on `./openui5`), "UI5 Web components" (focus on `./webcomponents`), "Fundamental Styles" (focus on `./fundamental-styles`) and "Other" (to focus on `./theming-base-content`) as select options if unclear, default to "Other"
4. Read the `.theming` file of the framework the users question targets, determine `sBaseLibraryId` and `sSourcePathPattern`
5. Read the `.theming` file of the theme of the `sBaseLibrary` of the framework the users question targets, based on `sSourcePathPattern` of the frameworks `.theming` file
6. While there is an `oExtends`:
   1. Read the `.theming` file of the theme referenced by `oExtends`; if you haven't encountered the framework (the first section of the Object Path) before, read the framework `.theming` first to determine its `sSourcePathPattern`
   2. Merge the `.theming` JSON with what you already have from the theme `.theming` files: if a key already exists, leave it untouched; add key+value if the key does not yet exist
7. Read the `${sBaseFileId}.less` file (`sBaseFileId` comes from the merged `.theming` files) of the theme of the `sBaseLibrary` of the framework the users question targets
8. For each LESS `@import` statement, recursively:
   1. Read the referenced LESS file
   2. Replace the `@import` statement with the read content
9. In the merged LESS file, map the lines `// [<Annotation> <required: Value> <optional: More Values>]` that precede parameter definitions to that parameter:
   1. If a parameter is defined multiple times, merge those annotations
   2. If an annotation already exists: append the value to the existing annotation values
   3. If an annotation has values for which it also has "anti-values" (the same value but starting with a `!`, e.g. "Protected" and "!Protected"), remove both values from the values list
   4. If an annotation values list is empty, remove the annotation
9. If the user targets "UI5 Web Components", scan the CSS files in `./webcomponents`, starting from the theme selected
9. If the user targets "Fundamental Styles", scan the CSS files in `./fundamental-styles`, starting from the theme selected
10. Answer the users question based on the information collected
