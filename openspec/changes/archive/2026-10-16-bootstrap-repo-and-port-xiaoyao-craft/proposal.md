## Why

open-music-skills 目前是一个只有 2 行 README（`# open-music-skills` / `Agentic skills for music`）、LICENSE 与 .gitignore 的空壳仓库，无法承载任何 music 相关 agent skill 的分发：既没有 skill 目录规范、索引与质量门禁，也没有发布流程。与此同时，作者的私有音乐工程已积累大量可复用的 music skill（覆盖创作、发布、运营、工具链四类），需要一个公开、可安装、可持续发布的载体——否则这些方法论只能困在私有工程中，也无法被 `npx skills` 生态消费。

## What Changes

**A. 工程骨架（与参考工程 open-skills 同形态，按本仓库标识适配）**

- 新增 `package.json`：作为版本源（`version: 0.1.0`），承载 6 项 scripts（`prepare` / `gen:skills-index` / `lint:skill-description` / `lint:deid` / `install:skills` / `test`），devDependency 仅 husky
- 新增 `scripts/`：
  - `gen-skill-docs.mjs`（零依赖，从各 `skills/<name>/SKILL.md` frontmatter 生成 `docs/generated/skills-index.md`）
  - `lint-skill-description.mjs`（description 硬上限 1024 码点 / 软目标 950）
  - `lint-skill-deidentification.mjs`（三模式：全量 / `--staged` / `--base <ref>`；denylist 改为本仓库规则，见下）
  - `install-skills.mjs`（全局安装 + 陈旧副本清理；manifest 名适配为 `.open-music-skills-manifest.json`）
- 新增质量门禁 `.husky/pre-commit`：三钩子按序执行（description lint → 脱敏 lint → 索引自动重生成并 `git add`）
- 新增 CI `.github/workflows/`：`docs-skills-verify.yml`（索引新鲜度：重生成后 `git diff --exit-code`）、`release.yml`（见 D）
- 新增文档：`README.zh-CN.md`（中文版；`README.md` 重写为英文完整版，含 badge / banner / 安装 / 贡献节）、`RELEASE-NOTES.md`（初始章节）、`AGENTS.md`（精简规范：**skill 创作与编辑须走 `skill-creator` 流程**、SKILL.md 格式与 frontmatter 陷阱、命名约定、门禁说明、验证命令、发布约定）
- 新增环境文件：`.nvmrc`（22）、`.gitattributes`（shell 脚本 LF）；`.gitignore` 并入 `.omc/` 与 `.goal-driven/`

**B. OpenSpec 环境**

- 新增 `openspec/`（`config.yaml` schema: spec-driven + 中文 artifact 规则、`specs/`、`changes/`），并沉淀本变更后归档

**C. 首个真实 skill：`skills/xiaoyao-craft/`（公开自包含版）**

- 移植作者私有工程的 Suno「逍遥丧失」声音美学 skill（v0.4.1），SKILL.md frontmatter 补齐 `user-invocable`，description 保持 ≤1024 码点（当前 587）
- 随行移植 `evals/evals.json`（3 个 eval case）
- **自包含化改写**（只清引用、不动美学实质）：清理内部路径字面量、铁律编号引用、未公开兄弟 skill 的悬空引用
- 保留：「妙响」平台名、合作署名、《遮天》同人标杆与 evals 素材（经确认不进 denylist）
- 编辑必须经由 `skill-creator` 流程（起草 → test cases → 评测 → 迭代），不得直接手改

**D. 发布自动化**

- `release.yml`：push 到 main 且改动 `skills/**` → 从 commit message 推断 bump 类型（BREAKING CHANGE → major / `feat:` → minor / 其余 → patch）→ bump `package.json` → 打 annotated tag → 创建 GitHub Release；支持 `workflow_dispatch` 手动指定 bump 类型

**无 BREAKING 变更**——本仓库此前不存在任何 skill 消费方。

## Capabilities

### New Capabilities

- `skill-catalog`：skill 目录与 frontmatter 契约、索引自动生成（零依赖）与 CI 新鲜度校验、全局安装与陈旧副本清理
- `quality-gates`：description 长度门禁（1024 硬上限 / 950 软目标）、脱敏门禁（denylist 三模式：全量 / 暂存新增 / PR diff 新增）、husky 提交钩子编排
- `release-automation`：基于 `skills/**` 变更触发的自动版本 bump、tag 与 GitHub Release 生成
- `xiaoyao-craft`：首个 skill 的行为契约——三尺度飘散框架（句/段/曲）、ambient 形态层、两条最高优先硬约束（时长 ≈5:20 + 头尾各 >30s 纯器乐）、「逍遥 ≠ 冲」第一性原则、自包含性（不引用未公开上下文）

### Modified Capabilities

（无。本仓库此前没有既有 spec——`openspec/specs/` 为空。）

## Impact

- **新增文件**：`package.json`、`scripts/`（4 个 .mjs + 随行测试）、`.husky/pre-commit`、`.github/workflows/`（2 条）、`docs/generated/skills-index.md`、`skills/xiaoyao-craft/`、`openspec/`（含本变更归档）、`AGENTS.md`、`RELEASE-NOTES.md`、`README.zh-CN.md`、`.nvmrc`、`.gitattributes`
- **修改文件**：`README.md`（2 行 → 完整版）、`.gitignore`（并入 `.omc/`、`.goal-driven/`）
- **外部依赖**：husky ^9（唯一 devDependency）；`npx skills` CLI（仅安装路径运行时需要）
- **人工步骤（非本变更执行依赖）**：GitHub 仓库侧配置 `GH_PAT` secret（`release.yml` 推送版本 bump 所需）；merge 与分支收尾保留人工
- **不影响的系统**：私有音乐工程（其原版保留现状，采用分叉策略）、参考工程 open-skills（只读）
