# ego-miaoxiang-create Specification

## Purpose
定义妙响创作自动化契约：注入模板与显式曲名、确认卡与音色池推进、时长攻坚、模型可用性探针、资产页库存与发行入口获取，依赖 ego-browser。

## ADDED Requirements

### Requirement: 注入模板与曲名显式传递

`ego-miaoxiang-create` SHALL 用固定注入模板并包含「曲名定为《X》」显式句；联合署名场景 SHALL NOT 包含「人声用 X」句；注入物 SHALL 从工程稿重抽，SHALL NOT 依赖早于定稿的缓存快照。

#### Scenario: 注入物来自旧缓存

- **WHEN** 注入物取自词稿定稿前的缓存
- **THEN** skill SHALL 弃用该缓存并从工程稿重抽，生成前用歌词块 CJK 字数比对验收

### Requirement: 音色池与署名强制门

skill SHALL 通过音色池点「选择」完成联合署名；点「生成歌曲」前 SHALL 读确认卡并校验含目标声线实名；不含时 SHALL 重发池请求，3 轮仍不含 SHALL 弃该次提交。

#### Scenario: 确认卡不含实名

- **WHEN** 重出确认卡的人声音色不是目标合作者
- **THEN** skill SHALL NOT 点击生成，按 3 轮上限重试后弃单

### Requirement: 产出判据与轮询

skill SHALL 以 assets API 真产出为唯一成功判据；`started=false` SHALL NOT 作放弃依据；轮询正则 SHALL 限定跨曲名。

#### Scenario: 信号缺失

- **WHEN** 工具层「开始生成」信号返回 false 但流程已推进
- **THEN** skill SHALL 继续轮询 assets API，不得提前判失败或计入失败计数

### Requirement: 模型探针与停用型故障

skill SHALL 用 `GET studio_api/aigc/config` 读 `Status`（0=可用/1=禁用）；故障期 SHALL 每 10 分钟探测；恢复判据 SHALL 为同会话出 assets 真产出，`Status=0` 仅作辅助；换模型 SHALL 交创作者拍板。

#### Scenario: 流程全绿但零产出

- **WHEN** 同脚本同流程短时间内从成功变全幽灵
- **THEN** skill SHALL 先跑模型探针定位平台侧停用，而非归因账号额度

### Requirement: 资产页与发行入口

skill SHALL 以资产页「生成结果」为库存权威源，hover 按钮组判发行状态；发行入口 SHALL 支持会话索取与资产页 WorkID 粒度两路；同曲多版本发行 SHALL 由创作者拍板。

#### Scenario: Agent 拒绝给另一版入口

- **WHEN** Agent 回复「发行入口按作品绑定」
- **THEN** skill SHALL 转资产页按卡片时长定位目标版并取该版独立 issuedId
