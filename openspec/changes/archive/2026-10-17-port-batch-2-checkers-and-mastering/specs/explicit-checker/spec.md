# explicit-checker Specification

## Purpose
定义歌词显式内容检查契约：扫描中英文显式内容与变体，核对分发平台的 Explicit 标记一致性，并声明平台配置优先与「只标记不改写」边界。

## ADDED Requirements

### Requirement: 中英文显式内容扫描

`explicit-checker` SHALL 扫描英文显式词与中文 A/B 两档敏感词，并 SHALL 检测谐音、拆字与字母缩写变体。

#### Scenario: 英文显式词命中

- **WHEN** 歌词包含 F-word/S-word 等英文显式词或其变体
- **THEN** skill SHALL 标记为 A 档并建议 `Explicit: Yes`

#### Scenario: 中文 B 档命中

- **WHEN** 歌词包含政治敏感、毒品等 B 档词汇
- **THEN** skill SHALL 额外提示国内平台拒审风险，并 SHALL 在生成前呈报改词决策

### Requirement: 标记一致性

skill SHALL 对比歌词内容与文件中的 `Explicit: Yes/No` 标记；发现不匹配时 SHALL 报告差异与建议操作，并 SHALL NOT 自动改写歌词。

#### Scenario: 标记为 No 但内容显式

- **WHEN** 文件标记 `Explicit: No` 但扫描命中显式词
- **THEN** skill SHALL 报「标记不匹配」并建议设置 `Explicit: Yes`

### Requirement: 平台配置为准

skill SHALL 以项目配置的目标分发平台为准，平台名只作示例；SHALL 区分海外平台的标记要求与国内平台的审核风险。

#### Scenario: 目标平台未配置

- **WHEN** 项目未指定目标分发平台
- **THEN** skill SHALL 要求先确认平台配置，并 SHALL NOT 假定单一平台规则
