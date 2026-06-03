# Development Conventions and Guidelines

## Git Guidelines

### No Merge Commits

Please use [rebase instead of merge](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) to update a branch to the latest main. This helps keeping a clean commit history in the project.

### Commit Message Style

This project uses the [Conventional Commits specification](https://www.conventionalcommits.org/) to ensure a consistent way of dealing with commit messages — the [release-please](https://github.com/googleapis/release-please) workflow uses these to compile the changelog and bump versions.

````
feat(help): Cover quick theming workflow

Adds coverage for the quick theming workflow as documented in the UI theme designer help.
````

#### Structure

````
type(scope): Description
````

- required: every commit message has to start with a lowercase `type`. Common types: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`, `ci`, `deps`, `style`, `revert`.
- optional: the `scope` is typically the affected plugin or skill (e.g. `ui-theme-designer`, `help`, `design-tokens`). If multiple are affected, skip it or define a meaningful abstract scope.
- required: the `description` has to follow the Sentence Case style. Only the first word and proper nouns are written in uppercase.
