---
description: Git write-operation policy — gated by .agent/config.yml `auto_commit`.
alwaysApply: true
---

# Git Policy

## The Rule

**Before any git write operation** (`git add`, `git commit`, `git push`, `git merge`, `git branch -d`, `git rebase`, `git reset --hard`, etc.), check `.agent/config.yml`:

- If `auto_commit: true` (or absent — true is the documented default for the upstream skills): proceed normally with the git operation as the skill describes.
- If `auto_commit: false`: **skip the git operation**. Leave files in their current working-tree state. Print:
  > Skipping git operation (auto_commit: false in .agent/config.yml). Files are ready for manual commit.

This rule wraps **every** skill that performs git writes — no need for each skill to individually check. The agent applies this gate before executing the skill's git step.

## Read-Only Git Is Always Allowed

`git status`, `git log`, `git diff`, `git show`, `git branch` (no flags), `git ls-files` — these never modify state and run regardless of `auto_commit`.

## Force Operations Are Never Auto

`git push --force`, `git reset --hard`, `git branch -D`, `git rebase -i` — even with `auto_commit: true`, ask the user explicitly before running these. They can destroy uncommitted work or rewrite shared history.

## Hooks

Never run with `--no-verify` unless the user explicitly asks. If a pre-commit hook fails, surface the failure and let the user decide.

## Default

`config.yml` ships with `auto_commit: false` so a fresh scaffold is conservative. Users opt in when they want the agent to commit on their behalf.
