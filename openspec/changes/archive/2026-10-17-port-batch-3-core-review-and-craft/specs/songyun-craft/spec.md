# songyun-craft Specification

## Purpose
定义宋韵审美机制契约：以「简·淡·韵·常」为核，提供 T1–T8 八测试自检、六组技法（简素/平淡/韵致/日常/雅俗/开片）与变量隔离纪律。

## ADDED Requirements

### Requirement: 八测试自检

`songyun-craft` SHALL 提供 T1–T8 八测试：简素、枯淡、韵、张力、直述/听写、换物/痕、哼唱、开片；每测试 SHALL 给出问法与判绿标准，并按 Warning 级处理。

#### Scenario: 枯淡误读

- **WHEN** 作品表面素净但底下没有暗劲
- **THEN** skill SHALL 用 T2 诊断为枯淡，并给出「表面素净、内里是厚的」方向，SHALL NOT 建议加配器堆料

### Requirement: 六组技法

skill SHALL 提供六组：简素、平淡、韵致、日常、雅俗、开片；每首 SHALL 认领 1–2 组，其余变量固定。

#### Scenario: 单曲创作

- **WHEN** 用户要一首宋韵方向的歌
- **THEN** skill SHALL 先定 1–2 组，再按组给词层与声音层要点，并提醒单变量纪律

### Requirement: 变量隔离

skill SHALL 与 `whitespace-craft`、`xiaoyao-craft`、`sweet-craft`、`orchestration-craft` 划界；两条线同跑时 SHALL 先隔离变量，大面积留白结构 SHALL 另行独立验证。

#### Scenario: 与 whitespace 同跑

- **WHEN** 用户同时要求宋韵与人声缺席工程
- **THEN** skill SHALL 说明变量隔离：留白只动结尾一处作对照，大面积留白结构另行独立验证
