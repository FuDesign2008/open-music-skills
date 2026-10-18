# orchestration-craft Specification

## Purpose
定义配器织体契约：以六层织体与豪放/婉约/叙事三谱系模板构建丰满配器，按 A/B/C 响应度分层选件，并在标签式/自然语言式平台的字符预算内落地，同时声明配器红线。

## ADDED Requirements

### Requirement: 六层织体与三谱系

`orchestration-craft` SHALL 提供六层织体（低音／节奏／和声铺底／主奏／色彩／对位）与三谱系模板（豪放／婉约／叙事），每层 SHALL 绑定进入时机。

#### Scenario: 配器单薄

- **WHEN** 用户反馈配器太单薄、层次不够
- **THEN** skill SHALL 先诊断织体（低音层/对位层/层间进出），SHALL NOT 直接建议加乐器

### Requirement: 响应度分层与预算

skill SHALL 按 A 已实测／B 写法先例／C 零先例三层选件；C 层件 SHALL ≤2 件且标单变量实测；配器扩展段 SHALL 在目标平台字符预算内落地，骨架句 SHALL 逐字保留。

#### Scenario: 加入未实测乐器

- **WHEN** 用户要加入 C 层乐器
- **THEN** skill SHALL 标注「未实测」，限制单首 ≤2 件，并要求首夜单变量验证

### Requirement: 红线

skill SHALL 声明配器红线：民族编制禁裸 `orchestral`；`suona` 禁入婉约；双低音禁入 ≤62 BPM 慢曲；单句点名乐器 ≤3-4 件。

#### Scenario: 豪放谱系写法

- **WHEN** 用户要写豪放谱系 Style
- **THEN** skill SHALL 要求逐组点名乐器，SHALL NOT 使用裸 `orchestral`
