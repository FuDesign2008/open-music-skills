# pre-generation-check Specification

## Purpose
定义生成前关卡契约：11 道通用检查、BLOCKING/WARNING/INFO 分级、只报告不修改、器乐纯音乐的处理规则。

## Requirements

### Requirement: 11 道检查关卡

`pre-generation-check` SHALL 提供 11 道关卡：Style 完整、歌词就绪、艺人名、显式标记、自检+结构四查、元数据、情绪光谱、歌词可及、曲式光谱、留白起伏、原句占比；平台专属项 SHALL 以目标平台配置为准。

#### Scenario: 缺少 BPM

- **WHEN** Style 缺少 BPM/调式
- **THEN** skill SHALL 标记 Gate 1 为 BLOCKING，并精确到缺失项

### Requirement: 严重度与只报告

skill SHALL 按 BLOCKING/WARNING/INFO 分级；SHALL NOT 修改文件；BLOCKING 未通过 SHALL NOT 说「可以谨慎生成」。

#### Scenario: 含艺人名

- **WHEN** Prompt 中发现已知艺人名
- **THEN** skill SHALL 在有过滤器的平台标记 BLOCKING，在无过滤器平台降为 WARNING

### Requirement: 器乐处理

当曲目标注 `instrumental`/`no lyrics` 时，skill SHALL 跳过 Gate 2/4/8，并 SHALL 调整 Gate 1 为乐器/情绪描述检查。

#### Scenario: 纯器乐曲目

- **WHEN** 曲目为纯器乐
- **THEN** skill SHALL 跳过歌词相关关卡，保留曲式/留白检查
