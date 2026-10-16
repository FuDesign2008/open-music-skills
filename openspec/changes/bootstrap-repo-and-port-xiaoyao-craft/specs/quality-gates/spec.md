## ADDED Requirements

### Requirement: Description 长度门禁

每个 skill 的 frontmatter `description` SHALL 不超过 1024 个 Unicode 码点（硬上限）；超过 950 码点 SHALL 产生警告但不阻断；超出硬上限 SHALL 使检查以非零退出码失败。

#### Scenario: 超硬上限阻断

- **WHEN** 某 SKILL.md 的 description 长度超过 1024 码点
- **THEN** 长度检查 SHALL 非零退出并列出该 skill 名与实际长度

#### Scenario: 软目标仅警告

- **WHEN** description 长度位于 951 至 1024 码点之间
- **THEN** 检查 SHALL 输出警告并以零退出码结束

### Requirement: 脱敏门禁

仓库 SHALL 提供按 denylist 检测内部标识符的检查，SHALL 支持三种模式——全量扫描、仅暂存区新增行、相对指定 ref 的 diff 新增行；检查 SHALL 自排除其自身与生成物目录。

#### Scenario: 暂存新增命中阻断提交

- **WHEN** 暂存模式下新增行扫描命中 denylist 字面量
- **THEN** 检查 SHALL 非零退出并输出「文件、行、列、命中词」

#### Scenario: 全量扫描干净通过

- **WHEN** 扫描范围内无任何命中
- **THEN** 检查 SHALL 零退出并报告已扫描文件数

#### Scenario: 检测器字面量自排除

- **WHEN** 检查脚本自身含 denylist 字面量（检测器的必要组成）
- **THEN** 扫描 SHALL 跳过该脚本自身，不产生自命中

### Requirement: 提交钩子编排

仓库 SHALL 在提交前按序执行——description 检查（仅当存在 SKILL.md 变更）、脱敏检查（仅当内容路径存在变更）、索引重生成与暂存（仅当 skill 元数据或索引生成器变更）；任一检查失败 SHALL 阻断本次提交。

#### Scenario: 坏 description 阻断提交

- **WHEN** 一次提交包含 description 超硬上限的 SKILL.md
- **THEN** 该提交 SHALL 在 description 检查阶段被阻断

#### Scenario: 索引随提交自动更新

- **WHEN** 一次提交修改了某 SKILL.md 的元数据
- **THEN** 钩子 SHALL 重生成索引并将其纳入本次提交
