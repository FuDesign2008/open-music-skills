# ego-zhihu-inspiration Specification

## Purpose
定义知乎灵感采集契约：登录探针、三入口采集、四要素候选提取、存量对照与零文本借用版权纪律，依赖 ego-browser。

## Requirements

### Requirement: 登录探针与三入口

`ego-zhihu-inspiration` SHALL 先跑登录探针；SHALL 按热榜/搜索批量/问题详情三入口采集，搜索词 SHALL 采用「情绪象限 + 真实经历标记」双要素。

#### Scenario: 未登录

- **WHEN** 首页出现「登录/注册」按钮
- **THEN** skill SHALL 判定未登录并交创作者扫码，不硬试

### Requirement: 四要素候选提取

skill SHALL 从高赞回答提取时刻/情绪内核/升华方向/溯源四要素；纯观点/争论贴 SHALL NOT 入选；候选 SHALL 与存量选题对照并标新增/邻接。

#### Scenario: 纯观点贴

- **WHEN** 回答只有观点没有具体时刻
- **THEN** skill SHALL 不选为候选（没有时刻就没有歌）

### Requirement: 零文本借用

skill SHALL 将素材仅用于指向启发；SHALL NOT 借用原文、SHALL NOT 复述叙事；写词后 SHALL 由检查链核 8-gram 零复述。

#### Scenario: 写词完成

- **WHEN** 基于知乎素材完成写词
- **THEN** skill SHALL 要求 8-gram 零复述核验，确保无文本借用
