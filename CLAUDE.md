# CLAUDE.md

Guidance for Claude when working on skills in this repository.

## Running evaluations for skills in this repo

When using `skill-creator` (or otherwise running evals) for any skill in this repo, **every individual run must execute in its own fresh `mktemp` directory in a `claude -p --bare` session, with the same `--allowed-tools` set for both configurations**. Anything less and the comparison measures noise instead of skill value.

### Why

Three independent contamination sources each break the comparison; all three must be addressed:

1. **CLAUDE.md leakage.** This repo's working directory and the maintainer's `~/.claude/CLAUDE.md` typically contain rich context about SAP UI Theme Designer, BTP, theming workflows, and sometimes pointers to the very docs the skill clones. If the eval run inherits any of that — directly via CLAUDE.md auto-discovery, or indirectly via subagents spawned from a contextful parent — the baseline answers correctly not because the model knows the domain, but because we leaked our notes into its prompt. **Fix:** `claude -p --bare` disables CLAUDE.md auto-discovery (and hooks, plugins, auto-memory, etc.). Always prefer it over `Agent(subagent_type=general-purpose)`, which inherits the parent's CLAUDE.md and cwd.
2. **Cross-run filesystem contamination.** If multiple runs share a working directory, a skill that clones docs (like `sap-theming-help`) leaves them on disk. The next run — including baselines — finds the artifacts of the previous one and gets unfair help. **Fix:** every single run gets its own fresh `mktemp -d` directory, never shared.
3. **Permission asymmetry.** With-skill runs typically get `--add-dir <skill-path>` plus whatever the skill's `allowed-tools` lists. If the baseline runs with default `--bare` permissions only, the with-skill run wins partly because it has tools the baseline doesn't. **Fix:** pass the same `--allowed-tools` set to both configurations. The only difference between with-skill and baseline should be the skill's *content* (SKILL.md instructions + `--add-dir`), not its *capabilities*.

### How to apply

```sh
SKILL_PATH=/Users/D064766/git/github.tools.sap/themedesigner/theming-skills/skills/<skill-name>
COMMON_TOOLS="Read,Write,Bash,WebFetch,Glob,Grep"   # whatever the skill needs — same for both

# Each run gets its own throwaway cwd; clean it up when the run finishes
TMP=$(mktemp -d -t eval-run-XXXXXX)
trap 'rm -rf "$TMP"' EXIT
cd "$TMP"

# Baseline run (no skill, no --add-dir, but same tools)
cat <<'EOF' | claude -p --bare --allowed-tools "$COMMON_TOOLS" > baseline.txt
<eval prompt>
EOF

# With-skill run — fresh tmp, --add-dir grants the skill dir, prompt via stdin
TMP2=$(mktemp -d -t eval-run-XXXXXX)
trap 'rm -rf "$TMP2"' EXIT
cd "$TMP2"
cat <<EOF | claude -p --bare --add-dir "$SKILL_PATH" --allowed-tools "$COMMON_TOOLS" > with-skill.txt
Read the file $SKILL_PATH/SKILL.md and follow its instructions to answer this user question:

<eval prompt>
EOF
```

Notes:
- The with-skill prompt has to bootstrap the skill explicitly because `--bare` disables auto-discovery.
- Pass the prompt via stdin (not as a positional arg) — `--add-dir` is variadic, so a trailing positional prompt gets consumed as another `--add-dir` value and Claude exits with `Error: Input must be provided either through stdin or as a prompt argument`.
- For N evals × M configurations, that's N×M fresh tmp dirs. Don't reuse them. Clean up with `trap 'rm -rf "$TMP"' EXIT` so they don't accumulate (or the next run finds artifacts the previous one wrote).

### Symptoms that something contaminated the run

- **Cold baseline cites internal filenames, repo names, or jargon** that only appear in local CLAUDE.md or local repo tree → CLAUDE.md leaked (issue 1).
- **Cold baseline answers correctly on a domain-specific prompt that doesn't even name the domain** (e.g. answers "duplicate vs migrate a theme" with SAP UI Theme Designer specifics, not Shopify/WordPress) → either CLAUDE.md leaked (issue 1) or the baseline saw artifacts a prior run dropped on disk (issue 2).
- **With-skill wins by a suspicious margin on prompts where the skill content seems thin** → permission asymmetry might be doing the work, not the skill itself (issue 3).

Re-run with stricter isolation before trusting the comparison.
