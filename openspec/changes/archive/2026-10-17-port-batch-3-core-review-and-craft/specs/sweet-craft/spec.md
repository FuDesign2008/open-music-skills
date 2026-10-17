# sweet-craft Specification

## Purpose
定义甜歌甜感美学契约：以物件化甜感 7 技、女声配方与曲名双截流构建可复用的甜歌创作链路，并规定打包归因与 [S]/[W]/[H] 证据分级纪律。

## ADDED Requirements

### Requirement: 物件化甜感 7 技

`sweet-craft` SHALL 提供 7 技：甜感物件化、酸先甜后、温度对照、颜色贯穿、克制收尾、时间具体化、高辨识日常场景容器；甜点 SHALL 有物理载体，SHALL NOT 只用形容词直给。

#### Scenario: 歌词牙酸

- **WHEN** 歌词被评「牙酸/太腻/甜得假」
- **THEN** skill SHALL 诊断为形容词直给，并按 7 技给出物件化改造方向

### Requirement: 打包归因

skill SHALL 把同曲双版本 A/B 结论标记为**打包证据**（女声+曲名后缀等变量未分离），SHALL NOT 写成变量级胜因断言。

#### Scenario: 复用发行结论

- **WHEN** 用户要复用「女声+品类词后缀」的发行经验
- **THEN** skill SHALL 说明这是打包采用，归因时保持打包表述

### Requirement: 证据分级

skill SHALL 用 [S] 强实证 / [W] 单实例 / [H] 待验证假说三级标注条目；SHALL NOT 把单实例结论外溢为工程规则；精确运营数值 SHALL 以脱敏结论或方向性表述替代。

#### Scenario: 待验证假说

- **WHEN** 某结论只有单实例或单一数据窗口支持
- **THEN** skill SHALL 标为 [W] 或 [H]，并说明验证边界
