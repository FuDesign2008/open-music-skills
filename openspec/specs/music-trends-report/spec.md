# music-trends-report Specification

## Purpose
定义短视频/流媒体音乐趋势调研契约：5 阶段流程、跨源权重与偏差纠偏、七类分析、Style 配方与报告落盘。

## Requirements

### Requirement: 5 阶段流程

`music-trends-report` SHALL 按 5 阶段执行：范围确认、多源采集、跨源去重加权、七类分析、Style 配方与报告落盘；用户未明确时 SHALL 先确认数据窗口与平台权重。

#### Scenario: 近两周调研

- **WHEN** 用户要近两周趋势
- **THEN** skill SHALL 确认窗口/权重/输出路径，按 5 阶段执行，不缩成近一月

### Requirement: 跨源权重与偏差纠偏

skill SHALL 按核心平台 ×3、代理平台 ×2、辅助平台 ×1 加权，并 SHALL 检查头部艺人效应、K-Pop 高估、男声民谣低估等偏差；SHALL NOT 仅凭辅助平台数据下短视频结论。

#### Scenario: Apple 数据偏置

- **WHEN** TOP 5 被某一头部艺人效应主导
- **THEN** skill SHALL 重排序，并标注辅助平台受众与短视频受众不重合

### Requirement: 报告与配方

skill SHALL 输出含 9 节的报告（元数据/权重/TOP20/风格光谱/BPM/主题/Style 配方/洞察/局限/来源），并 SHALL 给出 Top 3 类型的双载体 Style 配方；报告 SHALL 标注数据窗口、调研日期与平台归属。

#### Scenario: 报告落盘

- **WHEN** 趋势报告完成
- **THEN** skill SHALL 按模板落盘、验证标签式 Prompt 字符数、更新研究索引，并标注代理平台归属
