---
description: Generic code-style rules to reduce common LLM mistakes.
alwaysApply: true
---

# Code Style — TL;DR

> 1. **Think first.** State assumptions, ask when unclear, present tradeoffs before acting.
> 2. **Simplicity.** Minimum code that solves the problem. If it could be 50 lines, don't write 200.
> 3. **Surgical.** Touch only what the request requires. Don't improve adjacent code.
> 4. **Verify.** Define success criteria upfront. Don't claim done without running the check.

## 1. Think Before Coding

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, surface them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.

## 2. Simplicity

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- Three similar lines is better than a premature abstraction.

## 3. Surgical Changes

- Match the existing style of the file, even if you'd write it differently.
- Don't reformat or refactor adjacent code.
- Remove imports/symbols that **your** changes orphan; leave pre-existing dead code alone.

Every changed line should trace directly back to the user's request.

## 4. Comments

Default to writing **no comments**. Add one only when the *why* is non-obvious — a hidden constraint, a workaround for a specific bug, behavior that would surprise a reader. Don't explain *what* the code does (well-named identifiers do that). Don't reference the current task or callers.

## 5. Verification

For any non-trivial task, define success criteria upfront and verify before declaring done. See the `verification-before-completion` skill.

---

These are defaults. Project-specific style guides (e.g. `STYLE.md`, lint config) override these where they conflict.
