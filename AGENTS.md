# 项目知识库

> 本文件是 open-music-skills 的仓库规范（对人与 AI 同等有效）。写 skill、改门禁、发版本前先读这里。

## 这是什么

**open-music-skills** —— music 相关 agent skill 的公开分发仓库，覆盖四类：

1. **创作生产** —— AI 音乐生成平台的 prompt 工程、歌词创作、编曲/风格控制、母带验收
2. **发布分发** —— 上架各音乐平台、元数据、封面、版权、作品库管理
3. **运营增长** —— 播放/收入数据复盘、歌单投放、内容日历、A/B、自然选择式淘汰决策
4. **工具链技术** —— 音频处理、DAW 自动化、MIDI、素材管理、格式转换

分发形态：每个 skill 一个 `skills/<name>/SKILL.md`，可经 `npx skills` 安装到 Claude Code / Cursor / OpenCode 等。

## 结构

```
skills/<name>/SKILL.md     每个 skill 一个目录（含可选 evals/、references/、scripts/、assets/）
scripts/                   仓库工具链：索引生成 / description lint / 脱敏 lint / 全局安装
docs/generated/            自动生成物（**勿手改**，由 pre-commit 与 CI 校验新鲜度）
openspec/                  行为契约（specs/）与变更归档（changes/archive/）
.github/workflows/         CI：索引新鲜度、自动版本发布
```

## Skill 创作与编辑（硬规范）

**任何 SKILL.md 的创作与编辑必须经由 `skill-creator` 流程** —— 加载它并遵循：起草 → test cases → 评测 → 迭代。

- **无此工具的环境**：遵循等效流程（起草 → test cases → 评测 → 迭代），**不得跳过评测直接落盘**。
- **理由**：skill 是长期资产，评测是唯一能发现"指令与期望不一致"的环节。本仓库首个 skill（`xiaoyao-craft`）移植时，评测准备阶段就暴露出其 evals 的期望值（strain/push 类词汇）与 SKILL.md 的第一性原则（禁用这些词）相互矛盾——这类矛盾不经评测无法察觉。
- 评测的产出（test case 运行记录、迭代前后差异）是 skill 变更的验收证据。

## SKILL.md 格式

- **frontmatter 必填**：`name`（**必须等于目录名**，否则索引生成报错）/ `version` / `user-invocable` / `description`
- **description 硬上限 1024 个 Unicode 码点**（软目标 950）——只放触发路由四要素（做什么 / 何时用 / 触发词 / 反向边界），细节归正文。超限平台加载器会报警。
- 正文建议 < 500 行；超出时拆 `references/` 并按需指引
- 写作用力方向：解释 **why** 而非堆砌 MUST；给触发条件与反向边界（说明什么时候**不**该用本 skill）

## 门禁（三道）

| 检查 | 命令 | 拦截条件 |
|---|---|---|
| description 长度 | `npm run lint:skill-description` | 超 1024 码点（硬失败）；超 950 仅警告 |
| 脱敏 | `npm run lint:deid`（全量）<br>`npm run lint:deid -- --staged`（暂存新增）<br>`npm run lint:deid -- --base origin/main`（PR 新增） | 命中 denylist（内部路径模式 / 内部规则编号模式） |
| 索引新鲜度 | `npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` | 生成后仍有差异 |

`.husky/pre-commit` 自动串联前三项（需先 `npm install`）；CI 兜底同一套检查。

新增脱敏规则：改 `scripts/lint-skill-deidentification.mjs` 的 `DENYLIST`。两种条目形态——字符串（字面量，自动转义）或 `{ pattern }`（正则，用于带数字/需结构边界的模式）；正则含分组时请用非捕获组 `(?:...)`。

## 验证命令（改完必跑）

```bash
npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md
npm run lint:skill-description
npm run lint:deid
npm test
```

## 发布与版本

- **版本源**：`package.json` 的 `version`
- 推送 main 且改动含 `skills/**` → `.github/workflows/release.yml` 自动：推断递增类型 → bump → 打 annotated tag → 建 GitHub Release
- 递增类型：commit message 含 `BREAKING CHANGE` → major；以 `feat:` / `feature:` 开头 → minor；其余 → patch。也可 `workflow_dispatch` 手动指定。
- 版本提交带 `[skip ci]` 且直推 main（不建 version-bump PR）
- **前置**：GitHub 仓库需配置 `GH_PAT` secret（workflow 推送版本提交所需）
- 人读的版本说明写进 `RELEASE-NOTES.md`

## 命名约定

- 目录名 = frontmatter `name`，kebab-case
- skill 名应表达能力而非实现（如 `xiaoyao-craft` 而非 `suno-aesthetic-3`）
- 中文排版：中文与西文/数字之间留空格（既有文档为准）

## 反模式（禁止）

- 手改 `docs/generated/` 下的任何文件
- 绕过 `skill-creator` 直接改写 SKILL.md 正文
- 在公开内容中出现内部路径、内部规则编号（会被脱敏门禁拦截）
- 把 `.omc/`、`.goal-driven/`、`skills/*-workspace/`（本地运维与评测产物）提交进仓库
