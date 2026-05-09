---
description: Execute an approved plan task-by-task with checkpoints.
---

# /execute-plan

Read `.agent/skills/executing-plans/SKILL.md` and follow it exactly.

Required input: a plan file (path or content). If the user did not provide one, ask which plan to execute.

For each task: invoke the `test-driven-development` skill, then `verification-before-completion`. Pause at human checkpoints defined in the plan.
