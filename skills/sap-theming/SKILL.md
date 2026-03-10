---
name: sap-theming
description: SAP theming expert for UI Theme Designer on BTP Cloud Foundry. Covers integrating custom themes in SAPUI5 applications (bootstrap config, theme root, URL parameters, theme origin allowlist, versionedLibCss, theme sets), working with theming parameters (LESS variables, CSS custom properties, palette parameters, parameter hierarchy, custom CSS, custom fonts), writing component CSS using SAP theming parameters (listing parameters per component, generating theme-aware CSS classes with design tokens like sapTile_Background, sapButton_BorderColor, etc.), theme fallback behavior, and theming content structure. Use this skill whenever the user mentions SAP themes, UI Theme Designer, sap-theme, theme root, theming parameters, sapBrandColor, sapTile, sapButton, sapList, sapCard, component CSS, CSS custom properties for SAP controls, design tokens in SAP, custom CSS in themes, palette parameters, theme sets, theme fallback, LESS theming, theming content, theming-base-content, or asks about applying corporate branding to SAP applications, writing theme-aware CSS for UI components, generating CSS classes for SAP controls, or listing theming parameters for a component — even if they don't explicitly name the UI Theme Designer.
---

# SAP Theming

This skill provides developer-focused guidance on SAP theming using the UI Theme Designer on BTP Cloud Foundry. It covers three main areas:

1. **Theme integration** — applying custom themes to SAPUI5 applications and other SAP products
2. **Theming parameters** — working with LESS/CSS parameters, custom CSS, palette parameters, and the parameter hierarchy
3. **Component CSS** — writing theme-aware CSS for UI components using SAP theming parameters as CSS custom properties

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
  background-color: var(--myBrandBlue);
  border-color: var(--myAccentGreen);
}
```

This pattern lets you keep control CSS with the control implementation while still using theme-aware colors. Read `Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/adding-custom-css-895a4b0.md` for the full example.

### Custom fonts

To use a custom font, define `@font-face` rules in the custom CSS and then change parameters like `sapFontFamily`. You need font files for multiple weights (regular, bold, semibold-duplex, etc.) — see SAP Note 3534039 for the full list.

For the set of `@font-face` definitions needed, refer to the `css_variables.css` of Morning Horizon in [theming-base-content](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css).

### Icon replacement

To replace individual SAP-icons, create a custom icon font with your replacement glyphs at the same Unicode code points, and load it via `@font-face` with a `unicode-range` restriction in the custom CSS. Identify glyph code points at https://sap.github.io/theming-base-content/docs/#/icons/SAP-icons.


## Writing component CSS with theming parameters

When developers build custom UI components (web components, custom SAPUI5 controls, or standalone HTML/CSS components) and want them to look consistent with SAP Fiori applications, they should use SAP theming parameters as CSS custom properties.

### CSS custom properties at runtime

SAP theming content exposes all theming parameters as CSS custom properties at runtime. The naming convention is straightforward: the LESS parameter name (e.g. `@sapTile_Background`) maps to a CSS custom property with double-dash prefix (e.g. `--sapTile_Background`). These are available on `:root` in any page that has an SAP theme loaded.

This means you can use `var(--sapTile_Background)` directly in your component CSS — no bridge pattern needed for standard SAP theming parameters. The bridge pattern (described in "Bridging to CSS custom properties" above) is only needed for custom **palette parameters** that you've defined yourself in the UI Theme Designer.

### Parameter naming convention

Component-specific parameters follow the pattern `sap<Component>_[<State>_]<Property>`:

- **Component prefix**: `sapButton_`, `sapTile_`, `sapList_`, `sapCard_`, `sapToolbar_`, `sapPageHeader_`, `sapInfobar_`, etc.
- **State** (optional): `Hover_`, `Active_`, `Selected_`, `Emphasized_`, etc.
- **Property**: `Background`, `BorderColor`, `TextColor`, `BorderCornerRadius`, `BorderWidth`, etc.

Examples:
- `sapTile_Background` — default tile background
- `sapTile_Hover_Background` — tile background on hover
- `sapTile_Active_Background` — tile background when pressed
- `sapTile_BorderColor` — tile border color
- `sapTile_TitleTextColor` — tile title text color
- `sapButton_Background` — default button background
- `sapButton_Emphasized_Background` — emphasized button background
- `sapButton_Hover_BorderColor` — button border on hover

### Looking up parameters for a component

To find all theming parameters relevant to a specific component:

1. **Parameter Explorer** (interactive): https://sap.github.io/theming-base-content/docs/#/parameters — browse and search parameters, see their values across themes, and explore dependencies.

2. **Parameter dependencies doc**: read `Advanced-Information/theme-parameter-dependencies-18d80b4.md` — the full dependency table lists every themable parameter with its description and what it depends on in each theme. Search for the component prefix (e.g. `sapTile_`) to find all parameters for that component.

3. **Expert Theming in UI Theme Designer**: the Expert theming view has a **Control Picker** — click on a control in the preview to automatically filter all parameters that influence it. It also supports tag-based filtering and search by parameter ID (e.g. `id:sapTile`). See `Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/expert-theming-7b01607.md`.

### Ensuring SAP theming CSS custom properties are available

SAP theming parameters are exposed as CSS custom properties (e.g. `--sapTile_Background`) at runtime whenever an SAP theme is loaded. In SAPUI5 applications this happens automatically. For non-SAPUI5 pages (standalone web apps, web components, micro-frontends), the developer must ensure the theme's `css_variables.css` is loaded — for example by including a `<link>` to the base content stylesheet from `@sap-theming/theming-base-content`.

**Do not recommend `var()` with hardcoded fallback values** as the primary approach. Fallback values (e.g. `var(--sapTile_Background, #fff)`) only work for a single theme and defeat the purpose of theming — they break when the user switches to dark mode or high-contrast themes. Instead, tell the developer to make sure the CSS custom properties are available at runtime. If they use SAPUI5, they already are. If they don't, they need to load the theme CSS.

### Generating component CSS

When asked to generate CSS for a component, use the CSS custom property form of SAP theming parameters with bare `var()` references (no fallback values):

```css
.my-tile {
  background-color: var(--sapTile_Background);
  border-color: var(--sapTile_BorderColor);
  border-radius: var(--sapTile_BorderCornerRadius);
  color: var(--sapTile_TextColor);
  font-family: var(--sapFontFamily);
  font-size: var(--sapFontSize);
}

.my-tile:hover {
  background-color: var(--sapTile_Hover_Background);
}

.my-tile:active {
  background-color: var(--sapTile_Active_Background);
}

.my-tile .my-tile__title {
  color: var(--sapTile_TitleTextColor);
  font-family: var(--sapFontHeaderFamily);
}
```

Key guidelines for generating component CSS:
- **Use bare `var()` without fallback values** — the developer must ensure the SAP theme CSS custom properties are available at runtime (see above). Hardcoded fallback values only work for one theme and break dark mode and high-contrast themes.
- **Use component-specific parameters where they exist** (e.g. `--sapTile_Background`), and fall back to generic parameters (e.g. `--sapBackgroundColor`) only for properties that don't have a component-specific token.
- **Use `rem` for dimensions** — SAP themes use `rem` values to support accessibility scaling. Never use `px` for font sizes or spacings.
- **Cover interactive states** — hover, active, selected, focus. SAP theming provides separate parameters for each state.
- **Don't hardcode colors** — if a parameter exists for that purpose, use it. Check the Parameter Explorer or the parameter dependencies doc if unsure.
- **Look up the actual parameters**: before generating CSS, consult the parameter dependencies doc (`Advanced-Information/theme-parameter-dependencies-18d80b4.md`) to find the correct, real parameter names for the requested component. Don't guess parameter names — verify them against the reference.


## Supported SAP themes

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
- **Hardcoded colors in component CSS** — when generating CSS for components, always use theming parameters via `var(--sapXxx)` instead of hardcoded hex values. Hardcoded colors break theme switching and accessibility (especially dark mode and high-contrast themes).
- **`var()` fallback values** — do not use `var(--sapTile_Background, #fff)` with hardcoded fallback values. Fallback values only work for a single theme and break when switching to dark mode or high-contrast. Instead, ensure the SAP theme CSS is loaded at runtime.
- **Guessing parameter names** — parameter names must be looked up, not guessed. The naming convention helps, but the actual set of parameters varies per component. Always verify against the parameter dependencies doc or the Parameter Explorer.
