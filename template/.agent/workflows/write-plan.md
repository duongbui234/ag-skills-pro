---
description: Turn an approved design into a verifiable implementation plan.
---

# /write-plan

Read `.agent/skills/writing-plans/SKILL.md` and follow it exactly.

A plan is only ready after a design has been approved (see `/brainstorm`). If no design exists yet, redirect the user to `/brainstorm` first.

Output a plan file under `docs/plans/YYYY-MM-DD-<topic>-plan.md`. Each task in the plan must have a clear verification step (test, build check, manual smoke).
