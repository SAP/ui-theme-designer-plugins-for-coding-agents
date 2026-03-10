---
name: sap-theming
description: SAP theming expert for UI Theme Designer on BTP Cloud Foundry. Covers integrating custom themes in SAPUI5 applications (bootstrap config, theme root, URL parameters, theme origin allowlist, versionedLibCss, theme sets), working with theming parameters (LESS variables, CSS custom properties, palette parameters, parameter hierarchy, custom CSS, custom fonts), writing component CSS using SAP theming parameters (listing parameters per component, generating theme-aware CSS classes with design tokens like sapTile_Background, sapButton_BorderColor, etc.), migrating existing CSS to SAP design system parameters (replacing hardcoded CSS values with theming tokens, mapping legacy design system properties to SAP equivalents, identifying unmatched properties), theme fallback behavior, and theming content structure. Use this skill whenever the user mentions SAP themes, UI Theme Designer, sap-theme, theme root, theming parameters, sapBrandColor, sapTile, sapButton, sapList, sapCard, component CSS, CSS custom properties for SAP controls, design tokens in SAP, custom CSS in themes, palette parameters, theme sets, theme fallback, LESS theming, theming content, theming-base-content, or asks about applying corporate branding to SAP applications, writing theme-aware CSS for UI components, generating CSS classes for SAP controls, listing theming parameters for a component, migrating CSS to SAP design tokens, replacing hardcoded colors with theming variables, or mapping legacy design system properties to SAP equivalents — even if they don't explicitly name the UI Theme Designer.
---

# SAP Theming

This skill provides developer-focused guidance on SAP theming using the UI Theme Designer on BTP Cloud Foundry.

## Reference documentation

This skill is backed by the complete BTP UI Theme Designer documentation for Cloud Foundry. Consult it for all factual questions — parameter names, integration steps, configuration options, theme IDs, etc.

1. **Start with the index**: read `references/btp-ui-theme-designer.md` — it lists every documentation page with a one-line summary, grouped by topic.
2. **Read the full page**: once you've identified the relevant page(s), read them from `references/btp-ui-theme-designer/docs/cf/<path>`.
3. **Look up parameter names**: use `Advanced-Information/theme-parameter-dependencies-18d80b4.md` to find every themable parameter with its description and dependencies. Search by component prefix (e.g. `sapTile_`, `sapField_`, `sapButton_`) to find the full set. Never guess parameter names — verify them.
4. **Parameter Explorer** (interactive): https://sap.github.io/theming-base-content/docs/#/parameters

## Terminology

The product is called **UI Theme Designer** (not "Theme Editor" — that's a different tool from a different SAP technology). Within the UI Theme Designer, the *Editor pane* is one of several panes in the theme editing view.

## Migrating existing CSS to SAP theming parameters

When developers have existing CSS with hardcoded color values or legacy design system custom properties, they can migrate it to use SAP theming parameters. This makes the CSS theme-aware — it automatically adapts when users switch to dark mode, high-contrast themes, or apply corporate branding.

This applies to any component — buttons, tiles, cards, lists, form fields, charts, toolbars, progress indicators, etc. The approach is the same regardless of the component.

### Migration philosophy: component-first, not property-by-property

The wrong approach is replacing individual CSS properties one-by-one with their closest SAP equivalent. This produces incomplete results because the original CSS was designed for one static theme — it only has properties for that single appearance. The migrated CSS needs to work across all SAP themes (light, dark, high-contrast, branded), which typically means it needs *more* parameters than the original had properties.

The right approach is **component-first**:
1. Identify which SAP component the CSS is styling (e.g. "this is a tile", "this is an emphasized button", "this is a form field with error state")
2. Look up *all* SAP theming parameters for that component in the parameter dependencies doc — search for the component prefix (e.g. `sapTile_`, `sapField_`, `sapButton_Emphasized_`)
3. Write the CSS for each variant using the complete parameter set — including parameters that have no counterpart in the original

For example, if the original CSS for a card only had `background-color` and `border`, but SAP's tile/card family also has `sapTile_BorderCornerRadius`, `sapTile_SeparatorColor`, hover parameters, and active parameters — include them all.

### Variant-specific parameter completeness

This is the most common mistake in CSS migration, even when the right parameter families are identified: using incomplete parameter sets for states and variants.

**Every variant and every state gets its own full set of visual properties.** When a button variant has hover, active, or selected states, each state block must set all visual properties that have variant-specific parameters — not just `background-color`.

Concretely, for each variant+state combination:
1. Search the parameter dependencies doc for `<Component>_<Variant>_<State>_` (e.g. `sapButton_Success_Hover_`)
2. Use every parameter that exists for that combination
3. For visual properties where no variant+state-specific parameter exists, use the variant's base parameter (e.g. if `sapButton_Success_Hover_BorderColor` doesn't exist, use `sapButton_Success_BorderColor`)
4. Never fall back to the *base component's* parameter for a typed variant — an emphasized button's text color in any state comes from `sapButton_Emphasized_TextColor` or a more specific state parameter, never from `sapButton_TextColor`

Example of what goes wrong without this rule: a success button's hover only sets `background-color: var(--sapButton_Success_Hover_Background)` but keeps using `color: var(--sapButton_TextColor)` (the base button text color) instead of `color: var(--sapButton_Success_TextColor)`. In dark mode, the base text color may be light-on-dark while the success variant expects dark-on-green — the text becomes unreadable.

### Generic parameters for interactive components

These parameters apply to all interactive components but are easy to miss because they don't contain the component name:

- **Focus**: `sapContent_FocusColor`, `sapContent_FocusWidth`, `sapContent_FocusStyle`
- **Disabled**: `sapContent_DisabledOpacity`
- **Fonts**: `sapFontFamily`, `sapFontSize`, `sapFontHeaderFamily` — but prefer component-specific font parameters where they exist (e.g. `sapButton_Emphasized_FontFamily` over `sapFontFamily`)
- **Shadows**: `sapContent_Shadow0` through `sapContent_Shadow3`

### Semantic mapping

The hardest part of migration is mapping CSS class names to the correct SAP parameter family. Look at what the CSS class does visually and structurally, then find the SAP component that serves the same purpose.

**Watch out for SAP's action vs state distinction in buttons:**
- `.btn-success` (positive feedback) → `sapButton_Success_*`, **not** `sapButton_Accept_*`
- `.btn-danger` (error/destructive) → `sapButton_Negative_*`, **not** `sapButton_Reject_*`
- `.btn-warning` (caution) → `sapButton_Critical_*`
- Accept/Reject are reserved for action semantics ("I confirm" / "I decline")

### Migration deliverables

When migrating CSS, produce these four outputs:

1. **Migrated CSS** — the complete CSS file with all replaceable values substituted with `var(--sapXxx)`. Remove `:root` blocks that defined legacy custom properties. Use bare `var()` without fallback values — hardcoded fallbacks defeat theming. Use `rem` for dimensions.

2. **Mapping comments** — a CSS comment above each section noting the semantic mapping, e.g. `/* Success Button → sapButton_Success_* */`.

3. **Unmatched legacy properties** — legacy custom properties that have no SAP equivalent.

4. **Unused SAP parameters** — SAP parameter families relevant to the component that are NOT used in the migrated CSS, summarized by family (not every individual parameter).

### Don't preserve hardcoded `transparent`

Legacy CSS often uses `background-color: transparent` for secondary/ghost variants. In the SAP design system, even "transparent" backgrounds come from the parameter — the theme decides the actual value. Replace `transparent` with the correct SAP parameter just like any other hardcoded value.

## Generating new component CSS

When generating CSS for a new component (not migrating existing CSS), follow the same component-first philosophy:
1. Identify the SAP component family — look up all parameters in the parameter dependencies doc
2. Use the full parameter set per variant, including all state combinations
3. Use bare `var()` without fallback values
4. Use `rem` for dimensions
5. Cover interactive states: hover, active, selected, focus, disabled

The reference documentation has everything needed about parameter names, theme integration, theme sets, and other topics. Consult the index to find the right page.
