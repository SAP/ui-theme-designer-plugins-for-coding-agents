# BTP UI Theme Designer Documentation Index

Index of files in `btp-ui-theme-designer/docs/cf/`. This is the official SAP Help Portal documentation for UI Theme Designer on Cloud Foundry.

## Root

- `docs/cf/index.md` -- Table of contents for the UI Theme Designer documentation, listing all sections from introductory topics through setup, theming, integration scenarios, administration, security, and advanced information.
- `docs/cf/ui-theme-designer-for-the-cloud-foundry-environment-7bb58b3.md` -- Landing page stating that this guide describes how to use the UI Theme Designer in the Cloud Foundry environment.
- `docs/cf/what-is-ui-theme-designer-935325f.md` -- Overview of UI Theme Designer as a browser-based WYSIWYG tool for applying corporate branding across SAP UI technologies (SAPUI5, Web Dynpro, SAP GUI for HTML, SAP Mobile Start, etc.), listing key features.
- `docs/cf/what-s-new-for-ui-theme-designer-377f905.md` -- Release notes covering recent changes such as palette parameter restrictions, base content updates, SVG icon support, parameter deprecations, and improved editor features.
- `docs/cf/service-plans-and-metering-ea32bd2.md` -- Explains that UI Theme Designer is delivered as part of SAP Build Work Zone, with a single "standard" service plan for Cloud Foundry, Kyma, and Kubernetes environments.
- `docs/cf/accessibility-features-in-ui-theme-designer-71f3184.md` -- Notes that UI Theme Designer inherits SAPUI5 accessibility features and points to SAPUI5 accessibility documentation for screen reader support and keyboard shortcuts.
- `docs/cf/getting-support-71e5105.md` -- Guide for reporting support incidents via the SAP Support Portal, listing the correct component codes for different issue types and what to include in a ticket.
- `docs/cf/known-issues-8b0bf5c.md` -- Lists common known issues with solutions, including CSP-blocked CSS, web font limitations, themes not being applied, missing permissions, and gateway timeouts.
- `docs/cf/troubleshooting-6736ce0.md` -- Entry point recommending users check SAP Trust Center for platform status, review known issues, and contact SAP Support if needed.

## About Themes

- `docs/cf/About-Themes/about-themes-c95e26d.md` -- Introduction to the About Themes section, stating that administrators should understand the basics of theming before applying corporate branding.
- `docs/cf/About-Themes/overview-of-sap-theming-content-91ebfe2.md` -- Describes the SAP Theming Content structure (parameters, fonts, images, metadata organized by framework and library), lists supported SAP themes (Horizon and Quartz sets), and explains LESS-based implementation.
- `docs/cf/About-Themes/what-is-a-theme-71bcf85.md` -- Explains that custom themes are always based on an SAP theme and store only the delta (customized colors, images, fonts, dimensions), and describes the exported theme ZIP structure.
- `docs/cf/About-Themes/what-is-a-theme-set-53de0b1.md` -- Describes theme sets as collections of theme references mapping to light, dark, and high-contrast appearances based on CSS media features (`prefers-color-scheme`, `prefers-contrast`).

## Get Started

- `docs/cf/Get-Started/get-started-f5fb1fc.md` -- Introduction to UI Theme Designer as a cross-theming tool for building corporate identity themes, targeted at developers, visual designers, and administrators.
- `docs/cf/Get-Started/available-documentation-b29ee63.md` -- Lists links to platform-specific and UI technology-specific documentation for the UI Theme Designer.
- `docs/cf/Get-Started/keyboard-shortcuts-2dbefe1.md` -- Lists keyboard shortcuts for the UI Theme Designer including Tab/arrow navigation, Enter, Escape, and Ctrl+Shift+A for custom CSS.
- `docs/cf/Get-Started/supported-browsers-b1e96e2.md` -- Documents browser support: latest Edge, Chrome, Firefox on Windows 11, and Safari/Chrome on macOS (desktop only).

## Initial Setup

- `docs/cf/Initial-Setup-of-UI-Theme-Designer/initial-setup-of-ui-theme-designer-d9eb188.md` -- Overview of the setup flow, distinguishing SaaS (SAP Build Work Zone with pre-configured roles) and PaaS (manual service instance + Application Router) setup paths.
- `docs/cf/Initial-Setup-of-UI-Theme-Designer/creating-a-role-collection-d3162e4.md` -- Step-by-step instructions for creating a custom role collection in the BTP cockpit and adding theming roles.
- `docs/cf/Initial-Setup-of-UI-Theme-Designer/creating-a-service-instance-4b5273f.md` -- How to create a UI Theme Designer service instance with the standard plan in a Cloud Foundry space.
- `docs/cf/Initial-Setup-of-UI-Theme-Designer/entitling-a-service-26c1006.md` -- How a global account administrator assigns service entitlements and quotas to a subaccount.
- `docs/cf/Initial-Setup-of-UI-Theme-Designer/integrating-with-application-router-3f26353.md` -- How to integrate UI Theme Designer with a custom Application Router by binding service instances; endpoints are automatically exposed under `comsapuitheming.*` paths.

## Create and Edit Themes and Theme Sets

- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/create-and-edit-themes-and-theme-sets-0d2d662.md` -- Overview of the end-to-end workflow for creating and editing themes and theme sets.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/launching-the-theme-designer-web-app-8f49dce.md` -- Two ways to launch the UI Theme Designer: via the Theme Manager in SAP Build Work Zone, or by appending `/comsapuitheming.themedesigner/` to the AppRouter URL.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/managing-themes-and-theme-sets-on-the-welcome-page-e358508.md` -- Overview of the welcome page for managing themes and theme sets, covering available actions and the three states: Never Published, Modified, Published.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/creating-new-themes-and-theme-sets-72c730b.md` -- How to create a new theme (based on an SAP theme template) or a new theme set via the welcome page.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/editing-themes-and-theme-sets-04d4487.md` -- How to open an existing theme or theme set for editing from the welcome page, requiring the Editor or CustomCssEditor role.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/customizing-theme-sets-ca5d6be.md` -- How to customize a theme set by defining properties and assigning themes for light, dark, light high-contrast, and dark high-contrast appearances.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/publishing-themes-and-theme-sets-f4889a4.md` -- Themes must be published (requiring the Publisher role) to become available to applications, and re-published after every change.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/exporting-themes-and-theme-sets-26e5140.md` -- How to export themes as zip archives with configurable content (source files, CSS resources, base theme resources) for transport or self-hosting.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/importing-themes-and-theme-sets-5e3c430.md` -- How to import themes from a local zip archive; only themes based on supported SAP themes can be imported.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/duplicating-themes-and-theme-sets-ec77044.md` -- How to create a copy of an existing theme or theme set, producing an independent copy with a new ID and title.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/renaming-themes-and-theme-sets-39a6269.md` -- How to rename themes and theme sets, with a warning that renaming a published theme causes fallback for existing users.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/deleting-themes-and-theme-sets-0729728.md` -- Permanent deletion of themes and theme sets; themes referenced by a theme set must have the reference removed first.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/migrating-themes-cb63341.md` -- How to migrate a custom theme to a different SAP base theme, carrying over customizations but requiring manual fine-tuning for parameter structure differences.

### Customizing Themes in the Editor

- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/customizing-themes-in-the-editor-aa4b233.md` -- Overview of the theme editor interface with its three panes, Theme Menu actions, and the different theming approaches (Quick, Detailed, Mobile, Expert, Palette, CSS).
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/quick-theming-e4d2a95.md` -- Quick Theming lets users rapidly apply branding by adjusting main colors, logos, and shell background images.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/detailed-theming-db09bb9.md` -- Detailed Theming offers more parameters than Quick Theming plus key control-specific options, without requiring individual adjustment of every control.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/expert-theming-7b01607.md` -- Expert Theming provides access to all themable parameters with filtering capabilities for fine-tuned adjustments.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/mobile-theming-6237538.md` -- Mobile Theming for SAP Mobile Start exposes only the limited parameter subset supported by the native mobile app.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-colors-b6900f3.md` -- How to change color parameters using the color picker (HSL, RGB, palette) or by entering hex codes, parameter references, or LESS color expressions.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-dimensions-49c377f.md` -- How to change dimension parameters using `rem`-based values; shorthand values are not supported.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-font-families-8af3480.md` -- How to change font family parameters, including web-safe fonts, `@font-face` for custom fonts, weight-specific parameters, and icon font replacement.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-parameters-0d328f8.md` -- General overview of changing theme parameters of any type, including discarding unsaved changes or resetting to originals.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-theme-properties-9766329.md` -- How to view and modify theme metadata (Theme ID, Title, Vendor, Based On, Fallback Theme ID, Support RTL) and naming constraints.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/adding-custom-css-895a4b0.md` -- How to add custom CSS (LESS 1.6.3) per UI technology, with examples for CSS custom properties, `@font-face`, and icon replacement via `unicode-range`.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/adding-images-047e630.md` -- How to upload and assign images (logos, favicons, backgrounds) via the Assign Image dialog, with size limits (100MB total, 3MB per image).
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/defining-a-fallback-theme-af0f4e6.md` -- How to set a fallback theme ID for when the primary theme cannot be applied (e.g., SAPUI5 version incompatibility).
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/reusing-color-parameters-16ed37f.md` -- How to create custom palette parameters (reusable named colors) and reference them throughout the theme.
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/saving-themes-c99d9df.md` -- The three save options: Save, Save As (creates copy), and Save & Publish (saves and publishes immediately).
- `docs/cf/Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/selecting-and-adding-preview-pages-8988483.md` -- How to add, remove, and configure preview pages in the editor, including predefined test suites and custom application URLs.

## Administration

- `docs/cf/Administration/administration-a3d9e1e.md` -- Landing page for the Administration section covering system settings and theme transport between SAP systems.
- `docs/cf/Administration/transporting-themes-between-systems-ebc8f52.md` -- Overview of the two transport methods: manual export/import and automated transport via SAP Content Agent service.
- `docs/cf/Administration/transport-using-export-and-import-functionality-in-ui-theme-designer-d2a6041.md` -- Manual export/import workflow for transporting themes between systems (e.g., test to production, cloud to on-premise).
- `docs/cf/Administration/transport-using-sap-content-agent-service-79fe4d9.md` -- How UI Theme Designer integrates with SAP Content Agent service for standardized theme export/import via APIs.

## Integration Scenarios

- `docs/cf/Integration-Scenarios/integration-scenarios-f04b3a0.md` -- Overview of different ways to integrate custom themes into SAP applications, including setting default themes or enabling user theme selection.
- `docs/cf/Integration-Scenarios/integrating-in-sap-build-work-zone-2292463.md` -- How administrators use the Theme Manager to set default themes or enable user selection in SAP Build Work Zone.
- `docs/cf/Integration-Scenarios/integrating-in-sap-fieldglass-80642ec.md` -- How to export a theme and request its upload to SAP Fieldglass through a Fieldglass representative.
- `docs/cf/Integration-Scenarios/integrating-in-sap-gui-for-windows-d026b59.md` -- How to export and deploy a theme to SAP S/4HANA for SAP GUI for Windows.
- `docs/cf/Integration-Scenarios/integrating-in-sap-mobile-start-eeb654b.md` -- How to export and upload a theme to SAP Mobile Start, noting mobile theming restrictions for native apps.
- `docs/cf/Integration-Scenarios/integrating-in-sap-s-4hana-and-sap-s-4hana-cloud-private-edition-with-sap-btp-cloud-found-455d218.md` -- How to use published BTP Cloud Foundry themes directly in SAP S/4HANA or S/4HANA Cloud Private Edition.
- `docs/cf/Integration-Scenarios/integrating-in-sap-s-4hana-cloud-public-edition-and-sap-btp-abap-environment-f69af60.md` -- How to integrate via communication arrangement `SAP_COM_0623` with SAP S/4HANA Cloud Public Edition or BTP ABAP Environment.
- `docs/cf/Integration-Scenarios/integrating-in-standalone-sapui5-applications-25896d0.md` -- How to apply custom themes in standalone SAPUI5 applications by configuring Theme ID, Theme Root, and `versionedLibCss=true`.

## Advanced Information

- `docs/cf/Advanced-Information/advanced-information-620d248.md` -- Landing page covering custom theme management, theming content structure, fallback behavior, complex techniques, and permissions.
- `docs/cf/Advanced-Information/permissions-c3fdb69.md` -- The permission model (scopes, roles, role collections) following BTP hierarchy, defining Viewer, Editor, CustomCssEditor, and Publisher roles.
- `docs/cf/Advanced-Information/theme-fallback-bfe0aa3.md` -- The multi-phase theme fallback mechanism ensuring applications always receive a valid theme, walking through custom fallback chains, preferred SAP themes, flavor fallbacks, and defaults.
- `docs/cf/Advanced-Information/theme-parameter-dependencies-18d80b4.md` -- Reference table of theme parameter dependencies showing how specific parameters inherit from more generic ones for semantic theming.

## Security

- `docs/cf/Security/security-45a6e57.md` -- Landing page for the security section, indexing all security aspects including data protection.
- `docs/cf/Security/authentication-ecda6c0.md` -- Authentication is handled by the consuming application rather than UI Theme Designer itself.
- `docs/cf/Security/protecting-access-to-ui-theme-designer-53955c0.md` -- Pointer to the permissions documentation for restricting access by assigning roles.
- `docs/cf/Security/audit-logging-cb346e3.md` -- Audit logging records changes to themes for 30 days.
- `docs/cf/Security/auditing-and-logging-information-5eeab0e.md` -- Detailed table of all security events logged, covering theme operations, configuration changes, repository events, tenant subscriptions, and backup operations.
- `docs/cf/Security/clickjacking-framing-protection-644d146.md` -- Clickjacking framing protection is enabled by default, preventing loading in frames from different hosts.
- `docs/cf/Security/content-security-policy-b07600d.md` -- How Content Security Policy lets administrators control which resources (image/font sources) the user agent can load for custom themes.
- `docs/cf/Security/data-protection-bcfa58d.md` -- No user-related data is stored (only User IDs in audit logs); administrators must ensure custom themes contain no personal data.
- `docs/cf/Security/deletion-of-custom-themes-following-contract-termination-17a570d.md` -- Custom themes are deleted when all subaccount subscriptions are removed, but terminating the service alone does not trigger deletion.
- `docs/cf/Security/rate-limitation-12e1b87.md` -- Per-tenant rate limits: 10 rps for runtime endpoints and 4 rps for the repository endpoint, with HTTP 429 responses when exceeded.
