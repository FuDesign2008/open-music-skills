# hit-pattern-craft Specification

## Purpose
定义单曲流量定位与爆款性状契约：以两条流量路径定位、15 条性状自查、发行配套与数据纪律，指导企划与写作。

## Requirements

### Requirement: 流量路径定位

`hit-pattern-craft` SHALL 在企划时定位路径 A（推荐池氛围曲）/ 路径 B（UGC 钩子曲）/ 双路径，并 SHALL 用两个定位问题（72 小时无人用靠什么活 / 哪 15 秒会被选中）判定。

#### Scenario: 双路径曲

- **WHEN** 两个定位问题都能回答
- **THEN** skill SHALL 给出双路径配方：氛围底色做 A、副歌做 B

### Requirement: 15 条性状库

skill SHALL 提供 15 条性状（路径 B 钩子 6 条 / 路径 A 氛围 4 条 / 合作曲 5 条），并 SHALL 给出写完词后的自查清单。

#### Scenario: 写词自查

- **WHEN** 歌词完成
- **THEN** skill SHALL 逐条对照性状库，标注命中与缺口，不强求全占

### Requirement: 发行配套与数据纪律

skill SHALL 提供合作署名、成组发行、D0/D1 不读数据、按署名分层归因等发行配套；所有平台数据结论 SHALL 标注「相关性≠因果」，并以目标平台当前规则为准。

#### Scenario: 发行后归因

- **WHEN** 一批曲目发行后 3 天复盘
- **THEN** skill SHALL 要求先按署名分层再比较，solo 沉底不构成性状淘汰证据
