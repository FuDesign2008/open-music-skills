# music-dna-extraction Specification

## Purpose
定义标杆歌曲风格 DNA 提取契约：5 步流程、7 维框架、跨歌分布综合、双载体 Style 配方与零引用边界。

## ADDED Requirements

### Requirement: 5 步提取流程

`music-dna-extraction` SHALL 按 5 步执行：确认目标类型与 8-12 首标杆池、每 2 首一个后台 agent 并行调研、跨歌综合、生成 DNA 指纹与双载体 Style 配方、输出专辑参数。

#### Scenario: 标杆数量不足

- **WHEN** 标杆池少于 8 首
- **THEN** skill SHALL 提示样本不足，并 SHALL NOT 据此下类型级结论

### Requirement: 7 维框架与分布综合

skill SHALL 覆盖 7 维：BPM、调式、乐器编配、曲式结构、歌词意象、制作工艺、情绪有效性；SHALL 用跨歌分布（区间/比例/出现频率）综合，SHALL NOT 只取平均值。

#### Scenario: BPM 综合

- **WHEN** 综合多首标杆的 BPM
- **THEN** skill SHALL 输出区间分布（如「60% 在 60-70」），而非单一平均值

### Requirement: 双载体与零引用

skill SHALL 提供标签式与自然语言式两种 Style 载体；两种载体 SHALL NOT 出现标杆歌曲名或艺人名，只提取风格要素。

#### Scenario: 生成 Style 配方

- **WHEN** 根据 DNA 生成 Style 配方
- **THEN** skill SHALL 只写 BPM/调式/乐器/结构/制作等风格要素，SHALL NOT 引用具体作品或艺人
