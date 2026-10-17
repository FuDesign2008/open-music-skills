# pronunciation-check Specification

## Purpose
定义中文 AI 演唱的发音检查契约：扫描多音字、低频单音字与阿拉伯数字三类风险，给出生成层修复与发行层还原要求，并按三级策略处理。

## Requirements

### Requirement: 三类发音风险扫描

`pronunciation-check` SHALL 扫描中文歌词中的三类发音风险：多音字、低频单音字、阿拉伯数字，并 SHALL 为每类给出病因、实例与修复方向。

#### Scenario: 多音字命中

- **WHEN** 歌词包含「出差」「行家」等多音字的目标读音
- **THEN** skill SHALL 标记目标读音与默认读音的差异，并 SHALL 给出单音字同音字候选

#### Scenario: 阿拉伯数字命中

- **WHEN** 生成层歌词框包含阿拉伯数字
- **THEN** skill SHALL 按「量 / 代号」判断读法（按数位读或逐位读），并 SHALL 给出中文形式

### Requirement: 听感/字面分离

skill SHALL 区分生成层与发行层：生成层用同音字或中文数字诱导正确读音，发行层 SHALL 保留原字/原数字；改动生成层时 SHALL 追加「发音修复说明」小节记录还原要求。

#### Scenario: 生成层替换

- **WHEN** 一个 🟢 级多音字被替换
- **THEN** skill SHALL 输出替换 diff，并 SHALL 在文件内记录发行层还原要求

### Requirement: 三级处理策略

skill SHALL 按 🟢/🟡/🔵 分级：🟢 自动改生成层；🟡（公版原句副歌内 / 未实测）仅标记；🔵（常见组合）仅 Info；skill SHALL NOT 对 🟡 裸跑自动修复。

#### Scenario: 公版原句副歌

- **WHEN** 命中字位于公版原句副歌内
- **THEN** skill SHALL 只标记并给出候选，SHALL NOT 自动修改生成层
