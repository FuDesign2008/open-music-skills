# ego-emotion-radar Specification

## Purpose
定义七源大众情绪雷达契约：从豆瓣、微信读书、知乎、百度、虎扑、B站、微博采集公开榜单，产出五层雷达、情绪母题表与噪声过滤规则，依赖 ego-browser 驱动外部站点。

## ADDED Requirements

### Requirement: 七源与五层雷达

`ego-emotion-radar` SHALL 采集豆瓣/微信读书/知乎/百度/虎扑/B站/微博，并按五层雷达（常青/实时/叙事/圈层/核查）使用；单源失败 SHALL NOT 阻塞其余源。

#### Scenario: 单源失败

- **WHEN** 某源采集失败
- **THEN** skill SHALL 记录 error 并继续其余源，不重试轰炸

### Requirement: 情绪母题表

skill SHALL 输出情绪母题表（信号来源/母题/选题方向/唤醒度/时效）；事件 SHALL 转译为情绪（只借情绪、不写事件）；母题 SHALL 聚类 3-6 组。

#### Scenario: 热点事件

- **WHEN** 榜单出现强情绪事件
- **THEN** skill SHALL 将其转译为情绪母题，SHALL NOT 直接写成事件选题

### Requirement: 噪声过滤与不臆填

skill SHALL 按源过滤噪声（微博过滤娱乐八卦、虎扑过滤体育流等）；采集失败 SHALL NOT 编造数据；结论 SHALL 交创作者拍板。

#### Scenario: 微博娱乐过多

- **WHEN** 微博热搜娱乐八卦占多数
- **THEN** skill SHALL 按过滤规则丢弃娱乐项，保留具体人生时刻
