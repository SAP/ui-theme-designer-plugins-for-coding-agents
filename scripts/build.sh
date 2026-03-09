#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Update submodule
git submodule update --remote skills/sap-theming/references/btp-ui-theme-designer

# Rebuild index
INDEX=skills/sap-theming/references/btp-ui-theme-designer.md
rm -f "$INDEX"

claude -p "$(cat <<'EOF'
Read all markdown files in skills/sap-theming/references/btp-ui-theme-designer/docs/cf/ (recursively).
Ignore non-markdown files (images, fonts, CSS).

Write an index file to skills/sap-theming/references/btp-ui-theme-designer.md with this format:

# BTP UI Theme Designer Documentation Index

Index of files in `btp-ui-theme-designer/docs/cf/`. This is the official SAP Help Portal documentation for UI Theme Designer on Cloud Foundry.

## <Section Name>

- `docs/cf/path/to/file.md` -- 1-2 sentence summary of what the file covers.

Group files by their subdirectory (About-Themes, Get-Started, etc.).
Root-level files go under a "## Root" heading.
Use the existing file skills/sap-theming/references/btp-ui-theme-designer.md as a formatting reference if it exists.
EOF
)"
