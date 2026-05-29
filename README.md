# SAP theming skills

This repository contains agent skills for SAP theming:

- **`skills/sap-theming-help`** — UI Theme Designer on BTP Cloud Foundry: theme integration, parameter migration, custom CSS, design tokens
- **`skills/sap-theming-content`** — Structure and usage of SAP theming content / SAP Fiori design tokens: themes, parameters, dependencies, and component usage in UI5, UI5 Web Components, and Fundamental Styles

## How to use in a project

### Claude Code (recommended)

This repository is a plugin in the `sap-theming-internal` Claude Code marketplace:

```
/plugin marketplace add https://github.tools.sap/themedesigner/theming-team-skills.git
/plugin install theming-skills@sap-theming-internal
```

Pull updates with `/plugin marketplace update sap-theming-internal`.

### Other editors (Codex, Cursor, Copilot, …)

```sh
npx skills add https://github.tools.sap/themedesigner/theming-skills.git
```

## How to develop

Clone this repository:

```sh
git clone https://github.tools.sap/themedesigner/theming-skills
```

## License

This project is licensed under the Apache License, Version 2.0 — see [LICENSE](LICENSE).
