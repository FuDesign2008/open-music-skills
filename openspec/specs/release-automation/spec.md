# release-automation Specification

## Purpose
定义基于 skills/** 变更的自动版本递增、annotated tag 与 GitHub Release 生成，以及版本提交的防递归约束。

## Requirements

### Requirement: 变更触发的自动版本 bump

当 main 分支收到包含 `skills/**` 路径变更的推送时，仓库 SHALL 自动推断版本递增类型、更新版本源、创建 annotated tag 与对应发布；递增类型 SHALL 按提交消息推断——含 `BREAKING CHANGE` 判为 major，以 `feat:` 或 `feature:` 开头（含 Conventional Commits 的 scope 形式 `feat(<scope>):` / `feature(<scope>):`）判为 minor，其余判为 patch。

#### Scenario: feat 提交触发 minor

- **WHEN** 触发推送的提交消息以 `feat:` 或 `feature:` 开头（含 `feat(<scope>):` 形式）
- **THEN** 版本 SHALL 按 minor 递增（例如 0.1.0 变为 0.2.0）

#### Scenario: BREAKING CHANGE 触发 major

- **WHEN** 提交消息包含 `BREAKING CHANGE`
- **THEN** 版本 SHALL 按 major 递增

#### Scenario: 手动指定优先于消息推断

- **WHEN** 经手动触发并显式传入递增类型
- **THEN** 该类型 SHALL 优先于提交消息推断结果

### Requirement: Bump 提交不递归触发

自动版本提交 SHALL 标记跳过 CI，并 SHALL 直接推送到 main 而 SHALL NOT 创建版本递增 PR。

#### Scenario: bump 提交不再次触发发布

- **WHEN** 发布流程推送版本递增提交
- **THEN** 该提交 SHALL NOT 再次触发发布流程
