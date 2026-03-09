# SAP theming skills

## Installation

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

## Development

For local development, clone the skill and init its git submodules as described under [Installation](#installation):

```sh
git clone https://github.tools.sap/themedesigner/theming-skills
cd theming-skills
git submodule update --init
```

## Build

This is mainly a static SKILL.md with a reference of the production UI Theme Designer CF help documentation, and a dynamically built index of that documentation (for faster lookup by agents). To rebuild the index, run

```sh
./scripts/build.sh
```

