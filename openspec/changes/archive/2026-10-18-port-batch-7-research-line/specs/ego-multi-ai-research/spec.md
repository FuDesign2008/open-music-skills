# ego-multi-ai-research Specification

## Purpose
定义多 AI 站点交叉调研契约：统一问题组、七步流程、三分区报告、来源分级与降级路径，依赖 ego-browser 驱动外部站点。

## ADDED Requirements

### Requirement: 七步流程

`ego-multi-ai-research` SHALL 按七步执行：统一问题组、多家深聊、逐家追问、交叉三分区、第四源补充、来源留痕、降级路径；问题组 SHALL 覆盖 5-9 维且各家同题共答。

#### Scenario: 新选题调研

- **WHEN** 新选题创作前需要调研
- **THEN** skill SHALL 用创作调研模式设计四维起底问题组（意象升华/受众共鸣/高级表达/情感哲理渗透）

### Requirement: 三分区与来源分级

skill SHALL 输出共识区/分歧区/独有洞察区；来源 SHALL 按实锤/高共识/推测分级，单源结论 SHALL NOT 混入前两级。

#### Scenario: 数值分歧

- **WHEN** 多家给出的数值不一致
- **THEN** skill SHALL 并列呈现各家原话，不采信任何单值，采信方向性共识

### Requirement: 依赖与降级

skill SHALL 声明 ego-browser 与站点登录态依赖；某家失效 SHALL 按降级路径继续（双源成立），SHALL NOT 硬试或编造。

#### Scenario: 一家登录失效

- **WHEN** 某家站点登录态失效
- **THEN** skill SHALL 降级为双源交叉，并将单源结论标为「推测」级
