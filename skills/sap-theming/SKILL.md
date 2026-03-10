---
name: sap-theming
description: SAP theming expert for UI Theme Designer on BTP Cloud Foundry. Covers integrating custom themes in SAPUI5 applications (bootstrap config, theme root, URL parameters, theme origin allowlist, versionedLibCss, theme sets), working with theming parameters (LESS variables, CSS custom properties, palette parameters, parameter hierarchy, custom CSS, custom fonts), theme fallback behavior, and theming content structure. Use this skill whenever the user mentions SAP themes, UI Theme Designer, sap-theme, theme root, theming parameters, sapBrandColor, custom CSS in themes, palette parameters, design tokens in SAP, theme sets, theme fallback, LESS theming, theming content, theming-base-content, or asks about applying corporate branding to SAP applications — even if they don't explicitly name the UI Theme Designer.
---

# SAP Theming

This skill provides developer-focused guidance on SAP theming using the UI Theme Designer on BTP Cloud Foundry. It covers two main areas:

1. **Theme integration** — applying custom themes to SAPUI5 applications and other SAP products
2. **Theming parameters** — working with LESS/CSS parameters, custom CSS, palette parameters, and the parameter hierarchy

## Using the reference documentation

This skill is backed by the complete BTP UI Theme Designer documentation for Cloud Foundry.

1. **Start with the index**: read `references/btp-ui-theme-designer.md` — it lists every documentation page with a one-line summary, grouped by topic. Use this to find the right page for the user's question.
2. **Read the full page**: once you've identified the relevant page(s), read them from `references/btp-ui-theme-designer/docs/cf/<path>`. The paths in the index are relative to this directory.

Always consult the reference docs before answering questions — they contain the authoritative, up-to-date details. The sections below give you enough context to understand the domain and navigate the docs efficiently, but the docs themselves are the source of truth.

## Terminology

The product is called **UI Theme Designer** (or "the UI Theme Designer"). Never shorten it to "Theme Editor" — that's a different tool from a different SAP technology. Within the UI Theme Designer, the *Editor pane* is one of several panes in the theme editing view, so "the Editor pane" or "the editor" (lowercase, referring to the pane) is fine, but "Theme Editor" as a product name is wrong.


## Theme integration

Custom themes created in UI Theme Designer can be applied to SAPUI5 applications and integrated into SAP Build Work Zone and other SAP products.

### Applying a custom theme to a standalone SAPUI5 app

To apply a custom theme, you need its **Theme ID** (e.g. `my_company_theme`) and **Theme Root** (the URL of your UI Theme Designer service instance). There are three ways to configure them:

**Via URL parameters** (simplest, good for testing):
```
/your-app?sap-theme=my_company_theme@https://theming.example.com&sap-ui-versionedLibCss=true
```

**Via bootstrap attributes** (for production — note the `/UI5` suffix on the theme root):
```html
<script id="sap-ui-bootstrap"
  src="resources/sap-ui-core.js"
  data-sap-ui-theme="my_company_theme"
  data-sap-ui-theme-roots='{"my_company_theme": "https://theming.example.com/UI5"}'
  data-sap-ui-versionedLibCss="true">
</script>
```

**Via global configuration** (for programmatic setups — also needs `/UI5` suffix):
```js
globalThis["sap-ui-config"] = {
  ...globalThis["sap-ui-config"],
  theme: "my_company_theme",
  "theme-roots": {
    ...globalThis["sap-ui-config"]?.["theme-roots"],
    my_company_theme: "https://theming.example.com/UI5"
  },
  versionedlibcss: true
};
```

When using bootstrap attributes or global configuration, append `/UI5` to the theme root. This suffix is not needed for URL parameters — SAPUI5 adds it automatically.

### Theme origin allowlist

Before SAPUI5 will load a theme from an external origin, the origin must be allowlisted:
```html
<meta name="sap-allowed-theme-origins" content="https://theming.example.com">
```

Without this, SAPUI5 silently refuses to load the custom theme. This is a common source of "my theme doesn't apply" issues.

### versionedLibCss

Setting `versionedLibCss=true` makes SAPUI5 pass its version to the theming service. The service uses this to compile a CSS that matches the SAPUI5 version the app is running. Without it, the service doesn't know the SAPUI5 version and the theme may not render correctly.

### Theme sets

A theme set bundles multiple theme variants (typically light, dark, high-contrast black, and high-contrast white) under a single ID. Theme sets cannot be applied directly to standalone SAPUI5 apps. Instead, the app must resolve the user's OS preference (light/dark/high-contrast) to the corresponding individual theme from the set, and apply that.

For the structure of theme sets and how to resolve them, read the doc page `About-Themes/what-is-a-theme-set-53de0b1.md`.

### Theme fallback

When a requested theme is unavailable or fails to compile, the theming service walks through a multi-phase fallback:

1. **Custom fallback chain** — custom themes can define a fallback theme, forming a chain
2. **Preferred SAP themes** — the SAP themes that the custom themes in the chain extend
3. **Flavor fallback** — themes in the same color-scheme family (e.g. HCB Horizon → HCB Quartz)
4. **Default fallback** — the default theme defined by the Base framework
5. **Final fallback** — last-resort actions including retrieving from the latest compiled patch

This matters especially when apps upgrade their SAPUI5 version and older themes (like Belize) are no longer supported — the fallback mechanism ensures the app still gets a valid theme.

For full details with an example, read `Advanced-Information/theme-fallback-bfe0aa3.md`.

### Integration with SAP Build Work Zone

In SAP Build Work Zone, themes are managed via the **Theme Manager**. You publish themes from UI Theme Designer, and they become available for site administrators to assign and for end users to select via Appearance settings. Read `Integration-Scenarios/integrating-in-sap-build-work-zone-2292463.md` for details.

### Integration with Application Router

The UI Theme Designer service can be bound to an Application Router, which makes the theming endpoint available without manual route configuration. Read `Initial-Setup-of-UI-Theme-Designer/integrating-with-application-router-3f26353.md` for setup instructions.

### Other integration scenarios

The documentation covers integration with SAP S/4HANA (public and private edition), SAP GUI for Windows, SAP Fieldglass, and SAP Mobile Start. Consult the index under "Integration Scenarios" for the relevant pages.


## Theming parameters

SAP theming content consists of LESS variables that define colors, fonts, dimensions, and images across SAP UI technologies. Custom themes store only the delta — your changes compared to the base SAP theme.

### Parameter hierarchy

Parameters are organized hierarchically: generic parameters feed into more specific ones. For example, `sapBrandColor` influences `sapButton_Emphasized_Background`, which in turn influences hovered/active states. Changing a generic parameter cascades through all its dependents.

The hierarchy varies between themes (Horizon vs Quartz vs High Contrast). Consult `Advanced-Information/theme-parameter-dependencies-18d80b4.md` for the full dependency table, or explore interactively at https://sap.github.io/theming-base-content/docs/#/parameters.

### Key parameters

| Parameter | What it controls |
|---|---|
| `sapBrandColor` | Your primary brand color — influences buttons, links, highlights |
| `sapHighlightColor` | Selection and highlight color |
| `sapBaseColor` | Foundation color — influences backgrounds, borders |
| `sapShellColor` | Shell/header background |
| `sapBackgroundColor` | Application background |
| `sapFontFamily` | Primary font |
| `sapFontHeaderFamily` | Header/title font |
| `sapCompanyLogo` | Company logo image |
| `sapShell_BackgroundImage` | Shell background image |

### Palette parameters

Palette parameters let you define reusable colors in your theme. They are available across all UI technologies and can be referenced by other parameters.

**Naming rules:**
- Alphanumeric characters and underscores only
- Must start with an alphabetic character
- Must not start with "SAP" (case-insensitive) or underscore
- Max 50 characters
- Must be unique within the theme

Read `Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/reusing-color-parameters-16ed37f.md` for the full procedure.

### Custom CSS

Custom CSS lets you make changes that aren't possible through parameters alone. Important things to know:

- **It's LESS, not CSS.** The custom CSS editor compiles LESS 1.6.3. Some modern CSS features aren't available or are misinterpreted. For example, LESS evaluates `calc(100% - 2px)` to `calc(98%)` — escape it as `~"calc(100% - 2px)"`.
- **Per UI technology.** Custom CSS is added separately for SAPUI5, UR (Unified Rendering), and Base (all other). CSS for one technology doesn't affect the others.
- **Fragile by nature.** Custom CSS relies on the HTML/CSS structure of the targeted UI technology, which changes between versions. Prefer Expert Theming (parameter changes) wherever possible.
- **Requires the `CustomCssEditor` role.**

### Bridging to CSS custom properties

To use palette parameters in your own (non-themed) CSS, expose them as CSS custom properties in the custom CSS editor:

```less
:root {
  --myBrandBlue: @myBrandBlue;
  --myAccentGreen: @myAccentGreen;
}
```

Then use them in your control's stylesheet:
```css
.myControl {
  background-color: var(--myBrandBlue, blue);
  border-color: var(--myAccentGreen, green);
}
```

This pattern lets you keep control CSS with the control implementation while still using theme-aware colors. Read `Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/adding-custom-css-895a4b0.md` for the full example.

### Custom fonts

To use a custom font, define `@font-face` rules in the custom CSS and then change parameters like `sapFontFamily`. You need font files for multiple weights (regular, bold, semibold-duplex, etc.) — see SAP Note 3534039 for the full list.

For the set of `@font-face` definitions needed, refer to the `css_variables.css` of Morning Horizon in [theming-base-content](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css).

### Icon replacement

To replace individual SAP-icons, create a custom icon font with your replacement glyphs at the same Unicode code points, and load it via `@font-face` with a `unicode-range` restriction in the custom CSS. Identify glyph code points at https://sap.github.io/theming-base-content/docs/#/icons/SAP-icons.


## Supported SAP themes

**Horizon (recommended for new themes):**

| Theme | Technical ID |
|---|---|
| SAP Morning Horizon | `sap_horizon` |
| SAP Evening Horizon | `sap_horizon_dark` |
| SAP High-Contrast White (Horizon) | `sap_horizon_hcw` |
| SAP High-Contrast Black (Horizon) | `sap_horizon_hcb` |
| SAP Horizon (Set) | `sap_horizon_set` |

**Quartz:**

| Theme | Technical ID |
|---|---|
| SAP Quartz Light | `sap_fiori_3` |
| SAP Quartz Dark | `sap_fiori_3_dark` |
| SAP High-Contrast White (Quartz) | `sap_fiori_3_hcw` |
| SAP High-Contrast Black (Quartz) | `sap_fiori_3_hcb` |
| SAP Quartz (Set) | `sap_fiori_3_set` |

Older themes (Belize, Blue Crystal) have been removed from recent SAPUI5 versions. Custom themes based on these will trigger the theme fallback mechanism.

### Theming content structure

Theming content is organized by framework and library:
- **Base/baseLib** — foundation for all UI technologies
- **UI5/** — SAPUI5 libraries (sap/m, sap/ui/core, sap/ui/ushell, etc.)
- **UR/** — Unified Rendering libraries

Each library has per-theme directories containing LESS files, CSS output, `.theming` metadata, and assets. The open-source base content is at https://github.com/SAP/theming-base-content.


## Common pitfalls

When helping users, watch out for these frequent issues:

- **Missing theme origin allowlist** — custom theme silently doesn't apply. Always check for the `sap-allowed-theme-origins` meta tag.
- **Missing `/UI5` suffix** — needed for bootstrap attributes and global config, but not for URL parameters.
- **Missing `versionedLibCss`** — theme applies but looks wrong because the service compiled it for the wrong SAPUI5 version.
- **LESS vs CSS confusion** — the custom CSS editor uses LESS 1.6.3, not modern CSS. `calc()`, container queries, and some CSS functions need escaping or aren't available.
- **Dimension changes** — modifying dimensions (border widths, font sizes, spacings) can break layouts. Warn users to be cautious and use `rem` values.
- **Custom CSS fragility** — custom CSS may break when the target UI technology updates its HTML/CSS structure. Always prefer parameter changes over custom CSS.
- **Theme set resolution** — theme sets can't be applied directly to standalone apps. The app must resolve the appropriate variant.
- **Belize/Blue Crystal deprecation** — these themes are not supported in recent SAPUI5 versions. Custom themes based on them will fall back to Horizon/Quartz variants.
- **Terminology: "Rebuild" vs "Migrate"** — in the Cloud Foundry UI Theme Designer, the correct term for moving a custom theme to a new base theme is **Migrate** (via the Migrate button on the welcome page). "Rebuild" was the term used in the ABAP Theme Designer and does not apply here.
