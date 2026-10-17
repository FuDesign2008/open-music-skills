# audio-mastering Specification

## Purpose
定义 AI 音乐音频母带契约：以流媒体响度标准为目标，使用 two-pass 精确归一化，保护原始文件并提供生成后验证。

## ADDED Requirements

### Requirement: 响度目标

`audio-mastering` SHALL 以 -14 LUFS / -1 dBTP 为目标，并 SHALL 说明平台会对过响音轨做压低处理、损失动态。

#### Scenario: 源音轨过响

- **WHEN** 源音轨实测在 -8 ～ -12 LUFS
- **THEN** skill SHALL 建议完整母带链（EQ + lowpass + loudnorm），重点在降响度

### Requirement: two-pass 成品

skill SHALL 要求成品使用 two-pass（first pass 测量 → second pass 用实测值归一化）；SHALL 声明 single-pass 仅适合快速预览，SHALL NOT 用于批量成品。

#### Scenario: 批量成品处理

- **WHEN** 用户要对整张专辑做成品母带
- **THEN** skill SHALL 指向 `scripts/master_twopass.py` 或等价的 two-pass 流程

### Requirement: 安全与验证

skill SHALL NOT 覆盖原始文件，母带输出 SHALL 放入 `mastered/`；SHALL 验证输出响度在 -14±1 LUFS，并 SHALL 提供静默/留白生效验证方法。

#### Scenario: 处理含战略性静默的曲目

- **WHEN** 曲目含 `[Silence]` 或下划线占位
- **THEN** skill SHALL 要求用 `scripts/rms_silence_check.py` 验证静默是否真正生效

### Requirement: 平台适用性

skill SHALL 声明：若目标平台在生成后锁定音频、不支持替换文件，则不适用本 skill。

#### Scenario: 平台锁定音频

- **WHEN** 目标平台的音频在生成后不可替换
- **THEN** skill SHALL 明确说明没有本地处理/替换环节，并 SHALL NOT 建议走本地母带
