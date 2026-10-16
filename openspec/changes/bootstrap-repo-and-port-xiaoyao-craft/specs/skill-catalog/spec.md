## ADDED Requirements

### Requirement: Skill 目录与 frontmatter 契约

仓库中每个 skill SHALL 位于 `skills/<name>/SKILL.md`，其 frontmatter 的 `name` 字段 SHALL 与所在目录名完全一致，并 SHALL 包含 `description`、`version`、`user-invocable` 字段。

#### Scenario: name 与目录名不一致时中止

- **WHEN** 索引生成遇到某 `skills/<dir>/SKILL.md` 的 frontmatter `name` 不等于 `<dir>`
- **THEN** 生成 SHALL 以错误中止并指名该路径

#### Scenario: 缺失 frontmatter

- **WHEN** 某个 `skills/<dir>/SKILL.md` 不含 YAML frontmatter
- **THEN** 生成 SHALL 以错误中止并指名该文件

### Requirement: 索引自动生成与新鲜度

仓库 SHALL 提供零依赖的索引生成能力，从 skills 目录生成 `docs/generated/skills-index.md`；提交钩子 SHALL 在 skill 元数据或生成器变更时自动重生成并暂存该文件；CI SHALL 在索引落后于 skills 变更时失败。

#### Scenario: 索引包含全部 skill 元数据

- **WHEN** 在含 N 个 skill 的仓库运行索引生成
- **THEN** 生成的索引 SHALL 含 N 个 skill 条目，每条携带 name / version / user-invocable / description

#### Scenario: 索引过期被 CI 拦截

- **WHEN** 一次变更修改了 `skills/**` 但未同步索引
- **THEN** 索引新鲜度检查 SHALL 因生成后工作区仍存在差异而失败

### Requirement: 全局安装与归属清理

仓库 SHALL 提供全局安装入口；其清理行为 SHALL 仅作用于本仓库此前安装过的 skill 副本，归属判定 SHALL 依据安装清单。

#### Scenario: 不误删他源 skill

- **WHEN** 执行全量全局安装，且全局目录中存在非本仓库来源的 skill
- **THEN** 安装入口 SHALL NOT 删除任何未列入本仓库安装清单的目录
