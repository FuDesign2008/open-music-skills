# xiaoyao-craft Specification

## Purpose
定义首个 skill（Suno「逍遥丧失」声音美学）的行为契约：三尺度飘散框架、两条最高优先形态硬约束、公开自包含性。

## Requirements

### Requirement: 逍遥丧失美学框架

`xiaoyao-craft` SHALL 提供三尺度飘散框架（句尺度：短句独立换行与句间长空白；段尺度：飘散失重而非用力够；曲尺度：不冲的高潮与释然收束）、ambient 形态层，以及「逍遥 ≠ 冲」第一性原则——声音指令 SHALL 使用 drift / dissolve / fade / float / weightless / let go，SHALL NOT 使用 strain / reach for / push upward / falling short。

#### Scenario: 角色适配触发

- **WHEN** 用户描述一个「曾经逍遥、自由或处于巅峰，如今丧失、被困或迟暮」型角色并请求风格指令
- **THEN** skill SHALL 引导产出含三尺度手法的风格指令，且 SHALL NOT 建议 strain 或 push 类措辞

#### Scenario: 反向边界声明

- **WHEN** 需求属于「用力或蓄势释放」的燃曲、战歌
- **THEN** skill SHALL 声明自身不适用并指引排除

### Requirement: 两条最高优先形态硬约束

skill SHALL 声明两条最高优先形态指标——时长约 5 分 20 秒、开头与结尾各超过 30 秒纯器乐（无人声）——且 SHALL 明确其为软目标（诱导而非保证），并 SHALL 给出不达标时的备选梯度。

#### Scenario: 硬约束置于最高优先级区块

- **WHEN** 阅读该 skill 正文
- **THEN** 两条硬约束 SHALL 出现在首个「最高优先」区块，先于其他章节

#### Scenario: 软目标诚实性

- **WHEN** 生成结果未达时长或器乐段指标
- **THEN** skill SHALL NOT 宣称保证达成，并 SHALL 提供备选梯度

### Requirement: 公开自包含性

公开版 skill SHALL NOT 包含私有工程的内部路径字面量、内部规则编号引用（`铁律 N`）或对未公开 skill 的悬空引用；其美学实质（三尺度、形态层、第一性原则、两条硬约束、实测边界）SHALL 与私有原版保持一致；仓库全量脱敏扫描 SHALL 对其零命中。

#### Scenario: 自包含性可机器验证

- **WHEN** 对仓库运行全量脱敏扫描
- **THEN** 结果 SHALL 为零命中

#### Scenario: 评测用例随行

- **WHEN** 检查该 skill 目录
- **THEN** SHALL 存在覆盖至少 3 个场景的评测用例文件

#### Scenario: 美学实质不被改写

- **WHEN** 比对该 skill 与私有原版的美学内容
- **THEN** 三尺度框架、形态层、第一性原则与两条硬约束 SHALL 语义一致，仅允许引用层面的差异
