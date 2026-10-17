# reality-check Specification

## Purpose
定义实物常识核查契约：对歌词/曲名中的真实世界物件跑三问、对外部候选做溯源分级，并按 🔴/🟡/🟢 处置。

## Requirements

### Requirement: 三问核查

`reality-check` SHALL 对每个实物物件检查三问：计量与形制、使用动作链、保存与时限；任一问存疑时 SHALL 要求先追调再动笔。

#### Scenario: 计量与动作链错误

- **WHEN** 歌词写「一颗烤串揣兜里」
- **THEN** skill SHALL 判定为 🔴（串状物无「颗」单位 + 带签不能揣兜），并 SHALL 给出修正方向

### Requirement: 溯源分级

skill SHALL 将外部候选分为 A 实锤 / B 高共识 / C 单源推测 / D 转述四级；C 级 SHALL NOT 直接入稿，D 级 SHALL NOT 直接采信。

#### Scenario: 单源 AI 候选

- **WHEN** 曲名候选只有单一 AI 产出且无出处
- **THEN** skill SHALL 标记为 C 级，并要求三问自查 + 独立检索验证后方可入稿

### Requirement: 判定分级

skill SHALL 按 🔴/🟡/🟢 处置：🔴 阻断并给修正方向；🟡 留痕进发布注记；🟢 记录三问结果一行。skill SHALL NOT 擅自改写歌词。

#### Scenario: 通过核查

- **WHEN** 物件的三问全部成立
- **THEN** skill SHALL 记录一行三问结果（如「串计量✓ / 纸罩携带✓ / 现做现吃✓」）
