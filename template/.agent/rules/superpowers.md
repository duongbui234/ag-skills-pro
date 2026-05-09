---
description: Always-on rule — check skills before any non-trivial action and follow them exactly.
alwaysApply: true
---

# ag-skills-pro — Always-On Rule

This workspace uses the **ag-skills-pro** skill library. Skills live under `.agent/skills/<name>/SKILL.md` and define authoritative procedures for the most common engineering tasks.

## The Core Rule

**Before any non-trivial response or action, check whether a skill applies and read it via `view_file`.**

If there's even a 1% chance a skill is relevant — read it. Then follow it exactly. The skill file is the contract; do not paraphrase or shortcut from memory.

**Skip the skill check only for:**
- Trivial factual questions ("what does this error mean?", "is X a valid keyword?")
- Single-line answers with no implementation
- Read-only navigation (open file, jump to symbol)

If in doubt, check anyway. The cost of reading a skill is one tool call; the cost of skipping it is wrong work.

## Skill Index

Read `using-superpowers/SKILL.md` first if this is your first action of a session — it explains how to use the rest. Otherwise jump directly to the relevant skill below.

### Workflow Skills

| Skill | Use when |
|---|---|
| `using-superpowers` | Starting any session — orient yourself, find applicable skills |
| `brainstorming` | Before any creative work — features, components, behavior changes |
| `writing-plans` | After design is approved — break work into 2–5 minute verifiable tasks |
| `executing-plans` | Running a plan in batches with human checkpoints |
| `subagent-driven-development` | Dispatching subagents per task with two-stage review |
| `dispatching-parallel-agents` | Running independent subagent tasks concurrently |

### Quality Skills

| Skill | Use when |
|---|---|
| `test-driven-development` | During ALL implementation — RED → GREEN → REFACTOR |
| `systematic-debugging` | Debugging any non-trivial issue |
| `verification-before-completion` | Before declaring any fix or task is done |
| `requesting-code-review` | Before submitting code for review |
| `receiving-code-review` | When responding to review feedback |

### Branch & Repo Skills

| Skill | Use when |
|---|---|
| `using-git-worktrees` | Starting work on an isolated branch |
| `finishing-a-development-branch` | Tasks complete — merge / PR / discard |

### Meta Skills

| Skill | Use when |
|---|---|
| `writing-skills` | Creating new skills for this library |

## How to Read a Skill

Use Antigravity's `view_file`:

```
view_file .agent/skills/<skill-name>/SKILL.md
```

Some skills have sub-files (templates, prompts, references). The SKILL.md will tell you when to read them.

## Tool Mapping

Skills use generic tool names. For the Antigravity equivalents, see `.agent/skills/using-superpowers/references/antigravity-tools.md`.

## Instruction Priority

1. **User's explicit instructions** (this conversation) — highest
2. **Skills + rules in `.agent/`** — override default model behavior
3. **Default model behavior** — lowest

If `.agent/config.yml` or a user instruction conflicts with a skill, the user wins. Skills only override the default model.

## Key Principles

- **YAGNI** — don't build what isn't needed yet
- **TDD always** — failing test first, then code
- **Systematic over ad-hoc** — follow the skill, don't improvise
- **Evidence over claims** — verify before declaring success
- **Surgical changes** — touch only what the request requires
