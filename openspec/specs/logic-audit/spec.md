# logic-audit Specification

## Purpose
定义专辑逻辑一致性审查契约：以 D1–D7 覆盖时间、情绪、跨曲叙事、自检表、感官锚点、元数据索引与歌词自洽，并区分自动修复与人工决策。

## Requirements

### Requirement: D1–D7 审查维度

`logic-audit` SHALL 提供 D1 时间场景、D2 情绪-角色、D3 跨曲目叙事、D4 自检表、D5 感官锚点、D6 元数据与索引、D7 歌词内部自洽七个维度，覆盖时间/情绪/叙事、自检表、锚点与索引、歌词自洽四族。

#### Scenario: 修改时间场景

- **WHEN** 曲目的时间场景从深夜改为上午
- **THEN** skill SHALL 检查歌词/Outro 是否残留旧时间引用，并核对核心意象与自检表

### Requirement: 自动修复与人工决策

skill SHALL 自动修复机械问题（字符数/词量声明、锚点去重、引文对齐、索引同步）；叙事张力、情绪分类、背景故事等软伤 SHALL 提出选项交用户决策。

#### Scenario: 引文过时

- **WHEN** 自检表引文与实际 Prompt 不匹配
- **THEN** skill SHALL 自动替换为 Prompt 中的实际文字

### Requirement: 索引同步

skill SHALL 比对专辑索引/说明与曲目文件的实际内容（情绪/角色/意象/BPM/调式），发现不同步 SHALL 同步至曲目文件实际内容。

#### Scenario: 索引落后

- **WHEN** 曲目文件已修改但专辑索引未更新
- **THEN** skill SHALL 报告并同步索引
