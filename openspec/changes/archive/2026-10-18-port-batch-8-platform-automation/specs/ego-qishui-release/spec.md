# ego-qishui-release Specification

## Purpose
定义汽水合作平台三步向导发行自动化契约：前置物料、容器标记法、歌词框互斥分类、签署链路选择、发行 QC 四道门与 issuedId 直链快道，依赖 ego-browser。

## ADDED Requirements

### Requirement: 前置物料与查重

`ego-qishui-release` SHALL 在发行前核对查重、当日额度、网络直连、音频、歌词、专辑介绍、封面、登录态、浏览器实例、视觉模型、授权证明与无人值守预检；发行状态 SHALL 以 console/songs 搜索为唯一权威，搜索 SHALL 用发行名/资产名，空结果 SHALL 跑对照组；同名结果 SHALL 核对 songId/专辑归属。

#### Scenario: 查重空结果

- **WHEN** console/songs 搜发行名返回空
- **THEN** skill SHALL 搜一首已知已发行曲作对照组，排除搜索假阴性后才判定未发行

#### Scenario: 额度已满

- **WHEN** 当日额度已满
- **THEN** skill SHALL 只建到 step1 完整态停靠，跨日续跑，SHALL NOT 反复重试硬闯

### Requirement: 容器标记法与字段回读

skill SHALL 用容器标记法定位每个曲目块；歌词/介绍框 SHALL 用互斥正则分类（`/\d+\/10000/` 与 `/\d+\/1000(?!0)/`）；未命中 SHALL 报警中止；写后 SHALL 回读目标框长度作为守卫。

#### Scenario: 分类未命中

- **WHEN** 所有 textarea 的 `classify()` 都返回 unknown
- **THEN** skill SHALL 报警中止，SHALL NOT 退回位置或长度启发式

### Requirement: 批量扩散纪律

批量字段注入 SHALL 先跑 1 首并以「歌词长度 == 词稿长度」验证后才放量；收官 SHALL 全批逐首抽查字段。

#### Scenario: 首曲验证失败

- **WHEN** 首曲回读长度与词稿不符
- **THEN** skill SHALL 停止放量并定位字段缺陷，不得以「流程走得通」继续

### Requirement: 签署链路与验证码

skill SHALL 以「勾协议 checkbox 触发 letsign 渲染」为默认路径；**非独家授权路径为例外**（协议弹窗直接渲染、免勾 checkbox），SHALL 按现场表单形态选择；跨域 iframe SHALL 按工具链选择快照桥接或 OOPIF 直连，两者不可用时 SHALL 以系统级点击为最后通道（坐标现场截图现算）；SHALL NOT 跨链套用坐标配方；验证码 SHALL 用时间窗过滤，超窗 SHALL 丢弃，SHALL NOT 重复触发以等待同步。

#### Scenario: 读到超窗旧码

- **WHEN** 取回码龄超过 270 秒
- **THEN** skill SHALL 判定 STALE 并丢弃，不得输入旧码

#### Scenario: 非独家授权

- **WHEN** 签约模式为非独家授权
- **THEN** skill SHALL 按「协议弹窗直挂、免勾 checkbox」处理，不得等待不存在的 checkbox

### Requirement: 发行 QC 四道门

skill SHALL 执行四道门：静音（无 >4s）、尾部淡出（12s RMS 渐弱）、名与署名核验、提交后歌词核验；门 4 SHALL NOT 豁免；QC 豁免 SHALL 仅在创作者显式紧急令下且留痕三要素。

#### Scenario: 提交后歌词不符

- **WHEN** 平台歌词字段与工程词稿不一致
- **THEN** skill SHALL 走「修改」路径重注入，并以修复后长度 == 原始预填长度作为验收判据

### Requirement: issuedId 直链快道

skill SHALL 支持 `complete-publish-astra?enter_from=astra&issuedId=<id>` 直链（正格式无 `/publish` 前缀）；表单 SHALL 预绑定音频与歌词，无需上传；预填标题 SHALL 与工程曲名逐字核对；直链路径 step2 只出独家系两卡时 SHALL 说明与「非独家」互斥。

#### Scenario: 直链前缀错误

- **WHEN** 使用带 `/publish` 前缀的 URL
- **THEN** skill SHALL 识别为路由到「选择类型」页且 issuedId 上下文丢失，改用正格式重开
