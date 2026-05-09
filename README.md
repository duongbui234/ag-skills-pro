# ag-skills-pro

Bộ skills, workflows và rules always-on cho **Google Antigravity** — scaffold profile `.agent/` chỉ với một câu lệnh.

## Bạn nhận được gì

```
.agent/
├── config.yml              # tuỳ chỉnh per-project (auto_commit, tmp_dir, language)
├── version.json            # ghi nhận version package + nguồn skills
├── rules/                  # directives always-on (load vào mọi response)
│   ├── superpowers.md      # rule cốt lõi: check skill trước khi hành động
│   ├── git-policy.md       # gate các git write theo `auto_commit` trong config
│   ├── code-style.md       # think → simplify → surgical → verify
│   └── scratch-files.md    # dùng .agent/tmp/, không xài /tmp
├── skills/                 # 14 skills composable
│   ├── brainstorming/
│   ├── writing-plans/
│   ├── executing-plans/
│   ├── test-driven-development/
│   ├── systematic-debugging/
│   ├── verification-before-completion/
│   ├── requesting-code-review/
│   ├── receiving-code-review/
│   ├── using-git-worktrees/
│   ├── finishing-a-development-branch/
│   ├── subagent-driven-development/
│   ├── dispatching-parallel-agents/
│   ├── using-superpowers/
│   └── writing-skills/
└── workflows/              # entry point cho slash command
    ├── brainstorm.md       /brainstorm
    ├── write-plan.md       /write-plan
    ├── execute-plan.md     /execute-plan
    ├── debug.md            /debug
    ├── review.md           /review
    └── finish-branch.md    /finish-branch
```

## Bắt đầu nhanh

```bash
npx ag-skills-pro init
```

Lệnh trên scaffold thư mục `.agent/` vào working directory hiện tại. Mở project bằng Google Antigravity — rule always-on trong `.agent/rules/superpowers.md` sẽ điều hướng agent đến đúng skill trước mỗi hành động.

Ghi đè `.agent/` đang có:

```bash
npx ag-skills-pro init --force
```

Xem trước, không ghi đĩa:

```bash
npx ag-skills-pro init --dry-run
```

## Cách hoạt động

1. **Rule always-on** (`rules/superpowers.md`) yêu cầu agent: trước mỗi hành động không tầm thường, kiểm tra xem skill nào áp dụng và đọc nó qua `view_file`.
2. **Skills** là hướng dẫn quy trình đầy đủ cho các task lặp đi lặp lại (brainstorm, debug, code review, …). Mỗi skill nằm tại `.agent/skills/<name>/SKILL.md`, agent gọi khi cần.
3. **Workflows** là stub ngắn ánh xạ slash command (`/brainstorm`, `/debug`, …) sang skill tương ứng, kèm điều kiện đầu vào / khung định hướng.
4. **Config** (`config.yml`) cho phép từng project tinh chỉnh hành vi — quan trọng nhất là `auto_commit`, được gate qua `rules/git-policy.md` cho mọi thao tác git.

## Cấu hình

Sửa `.agent/config.yml`:

```yaml
auto_commit: false   # mặc định — agent để file ở dạng modified, bạn tự commit
tmp_dir: .agent/tmp  # nơi skills ghi file tạm / file phiên
# language: en       # bỏ comment để buộc ngôn ngữ phản hồi chính
```

Khi `auto_commit: true`, các skills sẽ tự `git add` + `git commit` sau các mốc (design doc xong, task trong plan xong, đóng nhánh). Khi `false`, các bước đó bị bỏ qua — xem chi tiết trong `rules/git-policy.md`.

## Bảng map tool sang Antigravity

Skills viết bằng tên tool generic (ví dụ `Read`, `Bash`, `Edit`). Bảng tương đương cho Antigravity (`view_file`, `run_command`, `edit_file`) nằm tại:

```
.agent/skills/using-superpowers/references/antigravity-tools.md
```

Agent đọc file này khi cần dịch một chỉ dẫn trong skill thành tool call thật của Antigravity.

## Cập nhật skills

Chạy lại `npx ag-skills-pro init --force` để pull phiên bản skills + rules mới.

**Smart merge — file nào được giữ, file nào bị ghi đè:**

| File / thư mục | Khi `--force` |
|---|---|
| `.agent/config.yml` | **Giữ nguyên** (file user customize) |
| `.agent/skills/<package-skill>/` | Ghi đè (contract của package) |
| `.agent/rules/<package-rule>.md` | Ghi đè |
| `.agent/workflows/<package-workflow>.md` | Ghi đè |
| `.agent/skills/<your-custom-skill>/` | **Giữ nguyên** (không có trong template) |
| `.agent/rules/<your-custom-rule>.md` | **Giữ nguyên** |
| Bất kỳ file/thư mục nào bạn tự thêm | **Giữ nguyên** |

Quy tắc: file thuộc template gốc của package → ghi đè khi update; file user thêm hoặc nằm trong danh sách preserve (`config.yml`) → giữ nguyên.

Muốn xem trước trước khi update:

```bash
npx ag-skills-pro init --dry-run
```

Output đánh dấu `+` cho file sẽ ghi và `·` cho file đã preserve.

Muốn reset `config.yml` về mặc định: xoá file đó rồi chạy lại `init --force`.

## Tuỳ biến

- **Thêm skill riêng:** tạo thư mục `.agent/skills/<your-skill>/SKILL.md`. Sau đó thêm một dòng vào bảng skill index trong `rules/superpowers.md` để agent biết khi nào dùng.
- **Thêm slash command:** tạo `.agent/workflows/<command>.md` trỏ đến skill tương ứng.
- **Rule chỉ áp cho project này:** thêm file vào `.agent/rules/`. File nào có `alwaysApply: true` trong frontmatter sẽ load vào mọi response.

Hướng dẫn đầy đủ ở `.agent/skills/writing-skills/SKILL.md`.

## Ghi công

Phần skills được dẫn xuất từ project [Superpowers](https://github.com/obra/superpowers) của Jesse Vincent (MIT). Phần adapt cho Antigravity, rules, workflows và CLI là nguyên gốc.

Project này không liên kết với Google hay sản phẩm Antigravity.

## License

MIT — xem [LICENSE](LICENSE).
