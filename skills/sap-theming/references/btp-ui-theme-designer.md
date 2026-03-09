# BTP UI Theme Designer Documentation Index

Index of files in `btp-ui-theme-designer/docs/cf/`. This is the official SAP Help Portal documentation for UI Theme Designer on Cloud Foundry.


## Root
- **`accessibility-features-in-ui-theme-designer-71f3184.md`**: SAP BTP's UI theme designer offers accessibility features and settings to enhance user experience, in line with SAPUI5 standards.
- **`getting-support-71e5105.md`**: To receive support for the UI theme designer from SAP, users should report incidents on the SAP Support Portal using the appropriate component and provide detailed information about their issues.
- **`index.md`**: UI Theme Designer 1.26 is a tool for creating, customizing, and managing themes and theme sets for various SAP environments, including setup, integration, administration, security, and troubleshooting guidance.
- **`known-issues-8b0bf5c.md`**: The document outlines common issues encountered with the UI theme designer, their reasons, and recommended solutions for each problem.
- **`service-plans-and-metering-ea32bd2.md`**: The UI theme designer is an integrated theming service available within SAP Build Work Zone's standard and advanced editions, rather than a standalone product.
- **`troubleshooting-6736ce0.md`**: To troubleshoot issues with the service, check the platform status, review known issues for solutions, and contact SAP Support if necessary.
- **`ui-theme-designer-for-the-cloud-foundry-environment-7bb58b3.md`**: The guide explains how to utilize the UI theme designer within the Cloud Foundry environment.
- **`what-is-ui-theme-designer-935325f.md`**: The UI Theme Designer is a browser-based tool that allows users to apply corporate branding to SAP applications by customizing standard theme templates across various SAP UI technologies.
- **`what-s-new-for-ui-theme-designer-377f905.md`**: The UI Theme Designer has introduced several updates in 2026, including the prohibition of palette parameters starting with underscores, updates to theming content versions, new icons, and improved usability features for better user experience.


## Security
- **`Security/audit-logging-cb346e3.md`**: Audit Logging captures theme changes for a duration of 30 days.
- **`Security/auditing-and-logging-information-5eeab0e.md`**: The UI theme designer logs various security events related to theme management, configuration, repository actions, tenant subscriptions, and backup operations.
- **`Security/authentication-ecda6c0.md`**: Authentication is handled by the application utilizing the theme, not by the UI theme designer.
- **`Security/clickjacking-framing-protection-644d146.md`**: Clickjacking framing protection, enabled by default, prevents malicious applications from loading the UI theme designer in a frame when the parent is hosted on a different site.
- **`Security/content-security-policy-b07600d.md`**: The Content Security Policy enables administrators to manage and restrict the resources an application can load, thereby enhancing security.
- **`Security/data-protection-bcfa58d.md`**: Administrators must ensure that no personal data is saved in custom themes on SAP BTP and be cautious about the information contained in uploaded files, as any authenticated user can access them.
- **`Security/deletion-of-custom-themes-following-contract-termination-17a570d.md`**: Custom themes are deleted following the termination of an SAP BTP contract after all relevant subscriptions are removed, but merely terminating related services does not delete the themes.
- **`Security/protecting-access-to-ui-theme-designer-53955c0.md`**: A role should be added and assigned to the UI theme designer permission to limit access to the UI theme designer.
- **`Security/rate-limitation-12e1b87.md`**: Rate limitation is a crucial mechanism in cloud services that controls the rate of incoming requests to prevent misuse and ensure optimal service performance, applying specific request limits per tenant for certain APIs in the SAP UI Theme Designer.
- **`Security/security-45a6e57.md`**: Administrators can explore all security-related aspects, including data protection, of the UI theme designer in this guide section.


## Integration Scenarios
- **`Integration-Scenarios/integrating-in-sap-build-work-zone-2292463.md`**: Administrators can manage and set themes for SAP Build Work Zone sites using the Theme Manager, while users can select their preferred theme through the Appearance settings.
- **`Integration-Scenarios/integrating-in-sap-fieldglass-80642ec.md`**: To integrate a custom theme in SAP Fieldglass, export the theme with specific settings and contact your representative for upload.
- **`Integration-Scenarios/integrating-in-sap-gui-for-windows-d026b59.md`**: You can export and deploy your custom theme in SAP S/4HANA to personalize the SAP GUI for Windows.
- **`Integration-Scenarios/integrating-in-sap-mobile-start-eeb654b.md`**: You can upload your exported themes to SAP Mobile Start to customize your branding, following specific prerequisites and procedures.
- **`Integration-Scenarios/integrating-in-sap-s-4hana-and-sap-s-4hana-cloud-private-edition-with-sap-btp-cloud-found-455d218.md`**: You can integrate themes from SAP BTP, Cloud Foundry directly into your SAP S/4HANA or SAP S/4HANA Cloud Private Edition by following specific setup and application procedures.
- **`Integration-Scenarios/integrating-in-sap-s-4hana-cloud-public-edition-and-sap-btp-abap-environment-f69af60.md`**: To apply themes in SAP Fiori launchpad for SAP S/4HANA Cloud Public Edition or SAP BTP ABAP environment, administrators must set up a communication arrangement with the SAP BTP UI theme designer service and specify user settings for theme selection.
- **`Integration-Scenarios/integrating-in-standalone-sapui5-applications-25896d0.md`**: Standalone SAPUI5 applications can apply themes by specifying the Theme ID and Theme Root, configuring theme origins, and using either URL parameters, bootstrap attributes, or global configuration to set the theme settings.
- **`Integration-Scenarios/integration-scenarios-f04b3a0.md`**: Themes created in the UI theme designer can be integrated into SAP applications for user selection or applied by developers to custom applications.


## Initial Setup of UI Theme Designer
- **`Initial-Setup-of-UI-Theme-Designer/creating-a-role-collection-d3162e4.md`**: You can create role collections in SAP BTP to group individual roles, provided you are a manager of the subaccount and have the necessary service entitlements and subscriptions.
- **`Initial-Setup-of-UI-Theme-Designer/creating-a-service-instance-4b5273f.md`**: To create a service instance of the UI theme designer in SAP BTP, you must be a Space Developer in the Cloud Foundry space and follow specific steps in the SAP BTP cockpit.
- **`Initial-Setup-of-UI-Theme-Designer/entitling-a-service-26c1006.md`**: Entitling a service involves assigning permissions and quotas from a global account to subaccounts in SAP BTP, allowing users to access and create instances of the service.
- **`Initial-Setup-of-UI-Theme-Designer/initial-setup-of-ui-theme-designer-d9eb188.md`**: Administrators can set up the UI theme designer for SAP Build Work Zone or custom applications by assigning the necessary role collections and following specific steps based on whether they are using SaaS or PaaS services.
- **`Initial-Setup-of-UI-Theme-Designer/integrating-with-application-router-3f26353.md`**: You can seamlessly integrate the UI Theme Designer with your Application Router by binding service instances of both services, allowing automatic endpoint accessibility without manual routing configuration.


## Get Started
- **`Get-Started/available-documentation-b29ee63.md`**: The UI theme designer supports multiple SAP platforms and technologies, offering documentation links for integration and theming.
- **`Get-Started/get-started-f5fb1fc.md`**: The UI theme designer is a browser-based tool that allows administrators, developers, and visual designers to create and customize corporate identity themes using provided templates.
- **`Get-Started/keyboard-shortcuts-2dbefe1.md`**: Keyboard shortcuts in the UI theme designer enable efficient navigation and action execution within the interface.
- **`Get-Started/supported-browsers-b1e96e2.md`**: The UI theme designer supports the latest browser versions on Windows and macOS, but not on mobile devices.


## Create and Edit Themes and Theme Sets
- **`Create-and-Edit-Themes-and-Theme-Sets/create-and-edit-themes-and-theme-sets-0d2d662.md`**: Designers can create and edit themes and theme sets for SAP Build Work Zone sites and applications by following specific procedures for creating, customizing, and publishing.
- **`Create-and-Edit-Themes-and-Theme-Sets/creating-new-themes-and-theme-sets-72c730b.md`**: You can create new themes and theme sets from the welcome page using the corresponding buttons.
- **`Create-and-Edit-Themes-and-Theme-Sets/customizing-theme-sets-ca5d6be.md`**: You can customize theme sets for light, dark, and high-contrast appearances by providing specific details and either saving or publishing your changes in the theme set editor.
- **`Create-and-Edit-Themes-and-Theme-Sets/deleting-themes-and-theme-sets-0729728.md`**: You can permanently delete themes and theme sets in SAP Build Work Zone, but this action cannot be undone.
- **`Create-and-Edit-Themes-and-Theme-Sets/duplicating-themes-and-theme-sets-ec77044.md`**: You can duplicate an existing theme or theme set by selecting it, choosing "Duplicate," entering new properties, and confirming the action, allowing independent edits to both themes.
- **`Create-and-Edit-Themes-and-Theme-Sets/editing-themes-and-theme-sets-04d4487.md`**: You can edit themes and theme sets created with the UI theme designer if you have the appropriate permissions and have already created a theme or theme set.
- **`Create-and-Edit-Themes-and-Theme-Sets/exporting-themes-and-theme-sets-26e5140.md`**: You can export themes and theme sets as a zip archive by selecting the desired theme, choosing export options, and configuring the contents based on your needs.
- **`Create-and-Edit-Themes-and-Theme-Sets/importing-themes-and-theme-sets-5e3c430.md`**: You can import themes and theme sets from a local archive file by selecting the *Import* button and following the provided steps, while noting certain prerequisites and limitations regarding supported themes and UI technologies.
- **`Create-and-Edit-Themes-and-Theme-Sets/launching-the-theme-designer-web-app-8f49dce.md`**: To launch the Theme Designer web app, use the *Launch Theme Designer* option in the *Theme Manager* of your SAP Build Work Zone or append `/comsapuitheming.themedesigner/` to your Application Router URL.
- **`Create-and-Edit-Themes-and-Theme-Sets/managing-themes-and-theme-sets-on-the-welcome-page-e358508.md`**: The welcome page allows users to manage themes and theme sets by creating, editing, publishing, exporting, deleting, renaming, duplicating, and migrating them.
- **`Create-and-Edit-Themes-and-Theme-Sets/migrating-themes-cb63341.md`**: To migrate custom themes, select the theme, choose Migrate, provide the new Theme ID and Title, select a base SAP theme, and confirm the migration.
- **`Create-and-Edit-Themes-and-Theme-Sets/publishing-themes-and-theme-sets-f4889a4.md`**: You can publish themes and theme sets to make them available for use in SAP Build Work Zone, provided you meet specific prerequisites and follow the publishing procedure.
- **`Create-and-Edit-Themes-and-Theme-Sets/renaming-themes-and-theme-sets-39a6269.md`**: You can rename themes and theme sets to modify their properties, ensuring to follow specific procedures to avoid disrupting end users.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/adding-custom-css-895a4b0.md`**: You can add custom CSS to your theme for various UI technologies, allowing for advanced design changes, but must ensure you have the appropriate permissions and understand the risks involved, including potential breakage due to updates.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/adding-images-047e630.md`**: You can upload and manage images within your theme using the *Assign Image* dialog in the editor, ensuring the total theme size does not exceed 100mb and individual images do not exceed 3mb.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-colors-b6900f3.md`**: You can change the colors of your theme by using a color picker or manually entering a color value in LESS 1.6.3 format.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-dimensions-49c377f.md`**: SAP theme dimensions should be modified using `rem` values to ensure accurate layout without calculation errors.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-font-families-8af3480.md`**: You can change font families in SAP Build Work Zone with caution, as it may impact layout and requires ensuring font availability for end users.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-parameters-0d328f8.md`**: You can change various theme parameters like colors, images, dimensions, and fonts using dedicated pickers in the editor, with options to discard unsaved changes or reset values, while the preview updates automatically.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/changing-theme-properties-9766329.md`**: You can update theme properties such as Theme ID, Title, Vendor, Fallback Theme ID, and Support RTL in the editor, but changes to Theme ID and Based On require additional steps.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/customizing-themes-in-the-editor-aa4b233.md`**: The editor allows users to customize and preview themes with a structured interface, featuring different panes for previewing pages, editing themes, and managing theme properties.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/defining-a-fallback-theme-af0f4e6.md`**: You can set a fallback theme ID to ensure a primary theme is used if the originally requested theme cannot be applied, providing a consistent user experience across different SAPUI5 versions.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/detailed-theming-db09bb9.md`**: Detailed theming allows for greater customization of parameters in the editor than Quick Theming, enabling users to refine control-specific options without adjusting each control individually.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/expert-theming-7b01607.md`**: Expert theming allows fine-tuned adjustments to your theme by offering access to all parameters and various filtering and search options within the editing tool.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/mobile-theming-6237538.md`**: Mobile theming in SAP Mobile Start allows customization of themes for web and native mobile applications, with specific parameters affecting the mobile design that may require adjustments based on the mobile operating system.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/quick-theming-e4d2a95.md`**: Quick theming enables users to effortlessly customize their SAP Build Work Zone site's color scheme, background image, and logo without intricate adjustments.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/reusing-color-parameters-16ed37f.md`**: You can create a reusable color palette in your theme's editor by defining unique color parameters that can be accessed across various UI technologies.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/saving-themes-c99d9df.md`**: You can save changes to your theme at any stage by using options in the Theme menu to either save, save a copy, or save and publish.
- **`Create-and-Edit-Themes-and-Theme-Sets/Customizing-Themes-in-the-Editor/selecting-and-adding-preview-pages-8988483.md`**: You can customize your preview pages in the UI theme designer by adding predefined options or your own applications, with your selections being stored for future use.


## Advanced Information
- **`Advanced-Information/advanced-information-620d248.md`**: Manage and customize SAP themes by organizing content, configuring fallback behavior, and controlling user permissions for editing and publishing.
- **`Advanced-Information/permissions-c3fdb69.md`**: The UI theme designer defines permissions, scopes, and roles for managing access to custom theme editing, which administrators can configure within the SAP BTP permission model.
- **`Advanced-Information/theme-fallback-bfe0aa3.md`**: Theme fallback is a multi-phase mechanism that ensures applications receive a valid theme by sequentially validating and applying custom, SAP, flavor, and default themes when the initially requested theme is unavailable or invalid.
- **`Advanced-Information/theme-parameter-dependencies-18d80b4.md`**: The theme parameters are organized in a hierarchical structure to facilitate semantic theming, where specific parameters derive values from more generic ones, with an accompanying table detailing dependencies across various themes.


## Administration
- **`Administration/administration-a3d9e1e.md`**: System settings and transport themes can be managed between SAP systems.
- **`Administration/transport-using-export-and-import-functionality-in-ui-theme-designer-d2a6041.md`**: You can create UI themes in one system and transport them to other systems through export and import functionality.
- **`Administration/transport-using-sap-content-agent-service-79fe4d9.md`**: The SAP Content Agent service on Cloud Foundry enables the export and import of themes, ensuring that they are only applied if they don't already exist or are newer than existing versions in the target system.
- **`Administration/transporting-themes-between-systems-ebc8f52.md`**: Themes can be imported and exported manually through the UI theme designer or managed automatically using the SAP Content Agent service for efficient transfers between different landscapes and subaccounts.


## About Themes
- **`About-Themes/about-themes-c95e26d.md`**: This section outlines the foundational concepts of theming and the organization of theme files for corporate branding.
- **`About-Themes/overview-of-sap-theming-content-91ebfe2.md`**: SAP Theming Content encompasses parameters and assets that define the branding and visual styles for various SAP applications, leveraging the SAP Design System and supporting multiple themes.
- **`About-Themes/what-is-a-theme-71bcf85.md`**: A theme in SAP applications allows for corporate branding customization, including colors, logos, and some dimension parameters, based on an existing SAP theme structure.
- **`About-Themes/what-is-a-theme-set-53de0b1.md`**: A theme set allows users to choose between various visual themes, including light, dark, and high-contrast options, tailored to their operating system preferences in SAP Build Work Zone.