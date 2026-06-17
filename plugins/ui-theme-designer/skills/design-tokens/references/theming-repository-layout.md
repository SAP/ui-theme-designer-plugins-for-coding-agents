# Theming repository layout

This document explains how SAP Theming Base Content is organized across multiple repositories and how the pieces fit together. The `design-tokens` skill loads it on demand when navigating these files.

_(all paths below are relative to the folder that contains the skill's `SKILL.md`)_

- `overview-of-sap-theming-content-91ebfe2.md` explains the structure of a theme repository;
- `.theming` files contain metadata about entities (i.e. frameworks => libraries => themes => files), mainly:
  - `aFiles` LESS source files
  - `aBuildFiles` CSS files built from `aFiles`
  - `sBase{Library,Theme,File}Id` the ID of the most important library/theme/file
  - `oExtends` the `<Framework>[.<Library>[.<Theme>[.<File>]]]` Object Path of the entity this entity derives from => in the extends chain, the first entry one to define a value, wins
  - `bIgnore=true` excludes the entity from theming -- in that case, search for CSS files in the same folder, they'll likely reference theming parameters as CSS custom properties (`var(--sapButton_Background)` instead of `@sapButton_Background`)
  - `sSourcePathPattern` the structure to resolve object paths to file paths in this framework
- `theming-base-content/content/` is the `Base/` folder of the theme repository
- the `UI5/` folder of the theme repository is scattered across `openui5`:
   - `openui5/src/sap.*/**/themes/base` contains the `base/` theme of the different libraries
   - `openui5/src/themelib_sap_horizon/**/themes/` contains the `sap_horizon_*` themes of the different libraries
   - `openui5/src/themelib_sap_fiori_3/**/themes/` contains the `sap_fiori_3_*` themes of the different libraries
- `webcomponents/packages/*/src/themes` contains the CSS of UI5 Web Components
   - they don't participate in a theme repository
   - instead, they use the CSS custom properties from `Base/baseLib/<theme>/css_variables.css`
   - components have a theme-independent skeleton CSS in `webcomponents/packages/*/src/themes/<component>.css`
   - this skeleton CSS is merged with CSS custom property definitions in `webcomponents/packages/*/src/themes/base/<component>-parameters.css` (the "base", always used) and `webcomponents/packages/*/src/themes/<theme>/<component>-parameters.css` (the actual theme, as a delta)
- `fundamental-styles` contains the SCSS (Sass) of Fundamental Styles
   - they don't participate in a theme repository
   - instead, they use the CSS custom properties from `Base/baseLib/<theme>/css_variables.css`
