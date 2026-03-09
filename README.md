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
