# launch-strategy Specification

## Purpose
定义专辑上线与变现契约：4 阶段流程、曲名蹭热度、4 周上线节奏、变现路径与 launch_plan 模板；已停用推广线不纳入新计划。

## ADDED Requirements

### Requirement: 4 阶段上线流程

`launch-strategy` SHALL 按 4 阶段执行：前置确认、蹭热度策略、上线节奏、变现路径；SHALL 输出 `launch_plan.md`。

#### Scenario: 专辑上线

- **WHEN** 专辑生成完成
- **THEN** skill SHALL 先确认生成/母带/曲名/商用授权，再进入蹭热度与节奏规划

### Requirement: 蹭热度与 4 周节奏

skill SHALL 为每首曲目给出蹭热度主词 + 品类/场景池 + BGM 垂类，并 SHALL 按 4 周节奏排序（蹭热度最强→SEO 最强→同名主打+梗歌→其余）。

#### Scenario: 曲名策略

- **WHEN** 用户要制定曲名策略
- **THEN** skill SHALL 给出主词池/品类池/场景池，并做重名检查

### Requirement: 变现与模板

skill SHALL 给出流媒体播放分成 + 短视频 BGM 联动主路径及风险；SHALL NOT 将已停用的内容侧推广线纳入新计划；SHALL 按模板输出上线计划。

#### Scenario: 变现规划

- **WHEN** 用户要规划变现
- **THEN** skill SHALL 说明现役主路径、历史/暂停项与指标口径
