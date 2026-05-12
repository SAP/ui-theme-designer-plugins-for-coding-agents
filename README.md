# SAP theming skills

This repository contains agent skills for SAP theming:

- **`skills/sap-theming-help`** — UI Theme Designer on BTP Cloud Foundry: theme integration, parameter migration, custom CSS, design tokens
- **`skills/sap-theming-abap`** — Theme management on SAP ABAP systems (on-premise NetWeaver / S/4HANA) via WebDAV: list, inspect, modify, copy, and delete themes

## How to use in a project

```sh
npx skills add https://github.tools.sap/themedesigner/theming-skills.git
```

## How to develop

### Prerequisites / tl;dr

- [ ] **`git`:** `brew install git` to clone this repository and the btp-ui-theme-designer submodule
- [ ] **`claude`:** `brew install claude-code` to use the /skill-creator skill
- [ ] **`/skill-creator`:** `claude plugin install skill-creator@claude-plugins-official` to eval the effectiveness of the sap-theming skill
- [ ] **`python3` (min. 3.10):** `brew install python3 && echo "export PATH=\$(brew --prefix)/bin:\$PATH" >> ~/.zshrc` to access the /skill-creator eval viewer (the homebrew `python3` has to be first in `$PATH` to have an effect)

### Development Setup

For local development, clone the skill and init its git submodules as described under [Installation](#installation):

```sh
git clone https://github.tools.sap/themedesigner/theming-skills
```

Development Experience is greatly improved when you work with the [`/skill-creator`](https://claude.com/plugins/skill-creator) claude skill. Install with

```sh
claude plugin install skill-creator@claude-plugins-official
```

The tools `/skill-creator` uses are python-based and often require at least python@3.10 . On macOS, `/usr/lib/python3` is python 3.9, which brings a lot of struggles. Install a modern python with

```sh
brew install python3
```

```sh
# in ~/.zshrc or ~/.bash_profile or similar
# make sure that new shells use homebrews python3 by prepending homebrews bin to PATH:
export PATH=$(brew --prefix)/bin:$PATH
```

### Testing

"Unit tests" are defined in `skills/sap-theming/evals/evals.json` and `skills/sap-theming-abap/evals/evals.json`. Claude (`/skill-creator`) discovers and executes them. Start a claude session and prompt something like

> /skill-creator evaluate this skill

Claude will then spawn sub-agents for every eval in the json (one `with-skill` and a "baseline" `without-skill`), and grade the effectiveness of the skill regarding this eval. Afterwards, it will generate an HTML file for manual review (with feedback for every eval). The HTML file (open in Chrome) finishes by downloading a `feedback.json` that claude picks up and uses to iterate on the skill.

The `sap-theming-abap` evals are fully offline — they use fixture files (mock PROPFIND XML, .theming JSON, LESS sources) so no live ABAP system is needed.
