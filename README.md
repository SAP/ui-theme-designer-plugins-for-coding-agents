# SAP theming skills

## How to use in a project

Theming skills are installed with [`npx skills`](https://skills.sh). As of today, `npx skills` is not capable of working with GitHub Enterprise instances (like github.tools.sap). Hence, you have to clone the skill on your machine and then use the "local path" installation mode to install the skill in your project:

```sh
# clone the skill itself, e.g. to ~/git/github.tools.sap/themedesigner/theming-skills
mkdir -p ~/git/github.tools.sap/themedesigner
cd ~/git/github.tools.sap/themedesigner
git clone https://github.tools.sap/themedesigner/theming-skills
cd theming-skills
git submodule update --init

# install the skill in your project, e.g. ~/git/my-project
npx skills add ~/git/github.tools.sap/themedesigner/theming-skills
```

## How to develop

### Prerequisites / tl;dr

- [ ] **`git`:** `brew install git` to clone this repository and the btp-ui-theme-designer submodule
- [ ] **`cf`:** `brew install cf` to access the SAP AI Core Service
- [ ] **cf space with theming-ai-core:** `cf login --sso ...` with a space that has a SAP AI Core Service in the _sap-internal_ (or _extended_) plan named `theming-ai-core`, to build the btp-ui-theme-designer.md index
- [ ] **`node`:** `brew install nvm && nvm install node` to run the build script (`scripts/build.mjs`) that calls `cf` and builds the btp-ui-theme-designer.md index
- [ ] **`claude`:** `brew install claude-code` to use the /skill-creator skill
- [ ] **`/skill-creator`:** `claude plugin install skill-creator@claude-plugins-official` to eval the effectiveness of the sap-theming skill
- [ ] **`python3` (min. 3.10):** `brew install python3 && echo "export PATH=\$(brew --prefix)/bin:\$PATH" >> ~/.zshrc` to access the /skill-creator eval viewer (the homebrew `python3` has to be first in `$PATH` to have an effect)

### Development Setup

For local development, clone the skill and init its git submodules as described under [Installation](#installation):

```sh
git clone https://github.tools.sap/themedesigner/theming-skills
cd theming-skills
git submodule update --init
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

### Build

This is mainly a static SKILL.md with a reference of the production UI Theme Designer CF help documentation, and a dynamically built index of that documentation (for faster lookup by agents). To rebuild the index, run

```sh
node scripts/build.mjs
```

You have to be logged in to a CF space where an instance of SAP AI Core Service with the sap-internal plan, named `theming-ai-core`, is available.

### Testing

"Unit tests" are defined in skills/sap-theming/evals/evals.json and claude (`/skill-creator`) discovers and executes them. Start a claude session and prompt something like

> /skill-creator evaluate this skill

Claude will then spawn sub-agents for every eval in the json (one `with-skill` and a "baseline" `without-skill`), and grade the effectiveness of the skill regarding this eval. Afterwards, it will generate an HTML file for manual review (with feedback for every eval). The HTML file (open in Chrome) finishes by downloading a `feedback.json` that claude picks up and uses to iterate on the skill.