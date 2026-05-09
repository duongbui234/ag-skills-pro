---
description: Wrap up a development branch — merge, PR, or discard.
---

# /finish-branch

Read `.agent/skills/finishing-a-development-branch/SKILL.md` and follow it exactly.

The skill walks through the choice tree: merge into main, push for PR, or discard. Each path checks `auto_commit` (see `.agent/rules/git-policy.md`) before any git write.

If the user hasn't decided which path, ask before starting.
