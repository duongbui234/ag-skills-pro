---
description: Where to put scratch files, logs, and session data — keep them out of the project root.
alwaysApply: true
---

# Scratch Files

## Use `.agent/tmp/`, not `/tmp`

Any temporary file the agent or a skill creates during a session must go under `.agent/tmp/` (or the path in `tmp_dir` from `.agent/config.yml`).

**Why:**
- System `/tmp` may be wiped by the OS between sessions.
- Files in `/tmp` aren't visible to teammates if they need to debug what happened.
- Keeping scratch files inside the project means they show up in `git status` and you can't accidentally lose work.

`.agent/tmp/` is gitignored by default (recommended `.gitignore` entry: `.agent/tmp/`). It is **not** wiped between sessions — clean it up in the skill that created the file.

## What counts as scratch

- Session logs from skill runs
- Intermediate files (rendered designs, generated diagrams)
- Throwaway test fixtures
- Captured tool output you want to revisit

## What is NOT scratch

- Design docs (`docs/specs/...`) — these are project artifacts, commit them.
- Plan files (`docs/plans/...`) — same.
- Test fixtures the test suite depends on — put them in the test directory.

## Cleanup

Each skill that writes to `.agent/tmp/` should clean up its own files when the work concludes (PR merged, design approved, etc.). If a skill doesn't, ask the user before purging — the file may be useful evidence.
