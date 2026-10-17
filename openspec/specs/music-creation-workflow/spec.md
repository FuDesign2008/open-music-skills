# music-creation-workflow Specification

## Purpose
定义 AI 音乐创作全流程契约：模式 A 歌词演唱与模式 B 器乐纯音乐的 Prompt 结构、核心规则、检查链编排与发行前交付物。

## Requirements

### Requirement: 模式 A/B Prompt 结构

`music-creation-workflow` SHALL 提供模式 A 六段式（原创性声明／演唱声线／情绪定调／乐器编配／技术参数／结构要求）与模式 B 六段式（原创性声明／情绪定调／乐器编配／技术参数／结构要求／人声控制标记）；标签式平台 SHALL 检查字符上限，自然语言式平台 SHALL 用短指令与时长锚句。

#### Scenario: 歌词演唱

- **WHEN** 用户要写一首有歌词的歌
- **THEN** skill SHALL 按模式 A 组织 Prompt，并要求声线、段落标记与 2-3 个感官锚点

#### Scenario: 器乐纯音乐

- **WHEN** 用户要纯器乐、不要人声
- **THEN** skill SHALL 按模式 B 组织 Prompt，要求主导乐器/演奏技法/和声色彩三要素与人声控制标记

### Requirement: 检查链编排

skill SHALL 在模式 A 完成后自动按序调用 voice-checker → reality-check → lyric-reviewer → 四维 craft 自检 → pre-generation-check；模式 B SHALL 跳过歌词检查，直接 pre-generation-check 并检查器乐三要素。

#### Scenario: 模式 A 完成

- **WHEN** Prompt 与歌词已写入曲目文件
- **THEN** skill SHALL 自动推进检查链，BLOCKING 项修复后才能生成

### Requirement: 核心规则与平台适配

skill SHALL 提供原创性、长度、情绪、声线、格式化、技术参数、结构、元数据、专辑审查等核心规则；平台专属长度/格式 SHALL 以目标平台配置为准。

#### Scenario: 标签式平台长度

- **WHEN** 目标平台为标签式且 Style 超字符上限
- **THEN** skill SHALL 标记为硬约束并自动精简，骨架句保留
