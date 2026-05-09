# Google Antigravity Tool Mapping

Skills in this library are written with generic tool names (often borrowed from Claude Code conventions). When you encounter these inside a skill, use the Antigravity equivalent.

| Skill says | Antigravity equivalent |
|---|---|
| `Read` (read a file) | `view_file` |
| `Write` (create/overwrite a file) | `create_file` (or `edit_file` if path exists) |
| `Edit` (modify a file) | `edit_file` |
| `Bash` (run a shell command) | `run_command` |
| `Grep` (regex search file content) | `grep` (or `run_command` with `rg`) |
| `Glob` (find files by name) | `find_files` (or `run_command` with `find`) |
| `TodoWrite` (track tasks) | Use Antigravity's task list / plan UI |
| `Skill` tool (invoke a skill) | `view_file` on `.agent/skills/<name>/SKILL.md` then follow exactly |
| `WebFetch` | `fetch_url` |
| `WebSearch` | `web_search` |
| `Task` tool (dispatch subagent) | Antigravity sub-agents — see Subagent support below |

## Subagent Support

When a skill says to dispatch a subagent (`Task tool with prompt template X`), do the following in Antigravity:

1. Read the prompt template referenced by the skill (e.g. `subagent-driven-development/implementer-prompt.md`).
2. Fill all placeholders (`{WHAT_WAS_IMPLEMENTED}`, `[FULL TEXT of task]`, etc.).
3. Dispatch a sub-agent (parallel agent / generalist) with the filled prompt as its instructions.
4. When the sub-agent returns, integrate its result into the current task.

If the skill calls for **parallel** subagent dispatch, fire all independent tasks at once and wait for all to return. Do not serialize independent agents.

## Skill Invocation Rule

The always-on rule in `.agent/rules/superpowers.md` requires that — before any non-trivial response — you check whether a skill applies and read it via `view_file`. The check is required even if you think you already know the answer. Skill content updates frequently; rely on the file, not memory.

## Path Conventions

- Skills: `.agent/skills/<skill-name>/SKILL.md`
- Workflows (slash commands): `.agent/workflows/<command>.md`
- Rules (always-on): `.agent/rules/<rule>.md`
- Per-project config: `.agent/config.yml`
- Scratch/temporary files: `.agent/tmp/` (do not write to system `/tmp`)
- Personal user-level skills: `~/.agent/skills/` (optional; loaded if present)
