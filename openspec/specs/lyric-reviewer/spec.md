# lyric-reviewer Specification

## Purpose
定义中文歌词质量审查契约：以 16 点框架检查技艺问题，按严重度输出审查报告与修复方向，不直接改写歌词。

## Requirements

### Requirement: 16 点审查框架

`lyric-reviewer` SHALL 提供 16 点审查：韵脚、音节/节奏、结构、视角、段落长度、情绪可及性、艺人名、Prompt 长度/词量门、结构层、金句承重、峰值位置、洞见、单色、情理钻石、选题锚点、浓度；每点 SHALL 给出严重度与处理建议。

#### Scenario: 缺少结构标记

- **WHEN** 歌词没有 `[Verse]` / `[Chorus]` 等段落标记
- **THEN** skill SHALL 标记检查点 3 为 Critical，并 SHALL 可自动补标记

#### Scenario: 情理钻石不足

- **WHEN** 全曲可数的情感/哲理亮点少于 2 处或全聚尾段
- **THEN** skill SHALL 标记检查点 14 为 Critical，并要求修复后复检

### Requirement: 只审查不改写

skill SHALL 输出审查报告与修复方向；SHALL NOT 直接改写歌词；仅结构标记缺失与 Explicit 标记缺失 SHALL 可自动修复。

#### Scenario: 押韵或节奏问题

- **WHEN** 审查发现押韵生硬或节奏失衡
- **THEN** skill SHALL 在报告中给出位置与修复方向，SHALL NOT 自动改写

### Requirement: 平台长度分叉

skill SHALL 按目标平台检查长度：标签式平台检查 Prompt 字符数上限（示例 1000 字符）；自然语言式平台检查词量门（示例 580+ 字）；SHALL NOT 用单一平台口径套用所有平台。

#### Scenario: 标签式平台超限

- **WHEN** Prompt 段落字符数超过目标平台上限
- **THEN** skill SHALL 标记为 Critical 并给出精简方向
