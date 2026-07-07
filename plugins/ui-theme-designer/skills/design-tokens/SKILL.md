---
name: design-tokens
description: "TRIGGER: questions about the SAP Design System and SAP Fiori design tokens — which themes exist, what value a theme parameter (e.g. sapButton_Background, sapHighlightColor) has in a given theme, how parameters inherit/extend across the theme chain, which parameters a specific UI component (UI5 control, UI5 Web Component, Fundamental Styles component) consumes. SKIP: how-to questions about UI theme designer as a product (creating, publishing, transporting themes — use help)."
allowed-tools: Bash(git clone *) Bash(git -C * sparse-checkout *) Bash(git -C * checkout) Read WebFetch
---

# Design Tokens

_(all paths below are relative to the folder that contains this SKILL.md)_

## Prerequisites

1. `overview-of-sap-theming-content-91ebfe2.md` exists; if not: fetch https://raw.githubusercontent.com/SAP-docs/btp-ui-theme-designer/main/docs/cf/About-Themes/overview-of-sap-theming-content-91ebfe2.md into that file
2. Ensure `theming-base-content/` is checked out at tag `11.36.4`:
   - Directory does not exist → clone it:
     ```sh
     git clone --depth 1 --branch 11.36.4 --filter=blob:none --no-checkout --sparse https://github.com/SAP/theming-base-content theming-base-content
     git -C theming-base-content sparse-checkout set content/
     git -C theming-base-content checkout
     ```
   - Directory exists but `git -C theming-base-content describe --tags --exact-match` differs → update it:
     ```sh
     git -C theming-base-content fetch --depth 1 origin 11.36.4
     git -C theming-base-content checkout 11.36.4
     ```

The remaining framework repositories (`openui5`, `webcomponents`, `fundamental-styles`) are cloned lazily in step 3, only if the user's question targets them.

## Context

Read [references/theming-repository-layout.md](references/theming-repository-layout.md) for the layout of `.theming` files, the theme repository structure, and where each framework's themes live across `theming-base-content`, `openui5`, `webcomponents`, and `fundamental-styles`.

## Procedure

1. Read `overview-of-sap-theming-content-91ebfe2.md`
2. Determine the SAP theme the users question targets, present the available theme IDs from `theming-base-content/content/Base/baseLib` as select options if unclear, default to `sap_horizon`
3. Determine the framework the user's question targets. Present "UI5" (to focus on `openui5`), "UI5 Web Components" (focus on `webcomponents`), "Fundamental Styles" (focus on `fundamental-styles`) and "Other" (to focus on `theming-base-content`) as select options if unclear, applying these defaults:
   - **Specific component, no framework stated** → default to "UI5 Web Components":
     1. Clone `webcomponents` lazily (see below), then search it for a CSS file matching the component name
     2. **If found:** use it as the primary source; additionally search `theming-base-content` for parameters matching `sap<ComponentName>_*`; report any such parameters not already referenced in the webcomponents CSS as supplementary, labelled "defined in theming-base-content, not yet referenced in webcomponents CSS" (covers new or not-yet-wired parameters); report only `theming-base-content` parameters — do not surface internal webcomponents CSS custom properties
     3. **If not found in `webcomponents`:** fall back to `theming-base-content` parameters containing the component name as the sole source
   - **No specific component** → default to "Other"

   Once the framework is settled, ensure the corresponding repository is checked out at the pinned version; if not, clone or update it lazily:
   - **UI5** → `openui5` at tag `1.150.0`:
     - Directory does not exist → clone it:
       ```sh
       git clone --depth 1 --branch 1.150.0 --filter=blob:none --no-checkout https://github.com/UI5/openui5 openui5
       git -C openui5 sparse-checkout set --no-cone 'src/themelib_sap_horizon/**/themes/' 'src/themelib_sap_fiori_3/**/themes/' 'src/sap.*/**/themes/base/'
       git -C openui5 checkout
       ```
     - Directory exists but `git -C openui5 describe --tags --exact-match` differs → update it:
       ```sh
       git -C openui5 fetch --depth 1 origin 1.150.0
       git -C openui5 checkout 1.150.0
       ```
   - **UI5 Web Components** → `webcomponents` at tag `v0.33.0`:
     - Directory does not exist → clone it:
       ```sh
       git clone --depth 1 --branch v0.33.0 --filter=blob:none --no-checkout https://github.com/UI5/webcomponents webcomponents
       git -C webcomponents sparse-checkout set --no-cone 'packages/*/src/themes/**/*.css' '!packages/theming/**/*.css'
       git -C webcomponents checkout
       ```
     - Directory exists but `git -C webcomponents describe --tags --exact-match` differs → update it:
       ```sh
       git -C webcomponents fetch --depth 1 origin v0.33.0
       git -C webcomponents checkout v0.33.0
       ```
   - **Fundamental Styles** → `fundamental-styles` at tag `v0.41.8`:
     - Directory does not exist → clone it:
       ```sh
       git clone --depth 1 --branch v0.41.8 --filter=blob:none --no-checkout https://github.com/SAP/fundamental-styles fundamental-styles
       git -C fundamental-styles sparse-checkout set --no-cone 'packages/*/src/**/*.scss' '!packages/doc-ui/**/*.scss'
       git -C fundamental-styles checkout
       ```
     - Directory exists but `git -C fundamental-styles describe --tags --exact-match` differs → update it:
       ```sh
       git -C fundamental-styles fetch --depth 1 origin v0.41.8
       git -C fundamental-styles checkout v0.41.8
       ```
   - **Other** → no additional clone; `theming-base-content` is already available from Prerequisites
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
10. If the user targets "UI5 Web Components", for each relevant component look up the three CSS sources documented in [references/theming-repository-layout.md](references/theming-repository-layout.md): the theme-independent skeleton at `webcomponents/packages/*/src/themes/<component>.css`, merged with the always-used base parameters at `webcomponents/packages/*/src/themes/base/<component>-parameters.css`, then with the theme-specific delta at `webcomponents/packages/*/src/themes/<theme>/<component>-parameters.css`
11. If the user targets "Fundamental Styles", scan `fundamental-styles/packages/*/src/**/*.scss` for the relevant component; theme-specific values come from the CSS custom properties in `theming-base-content/content/Base/baseLib/<theme>/css_variables.css`
12. Answer the users question based on the information collected
