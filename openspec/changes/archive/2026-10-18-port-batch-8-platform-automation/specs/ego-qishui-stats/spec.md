# ego-qishui-stats Specification

## Purpose
定义汽水数据中心采集契约：双口径分列、三周期采集、截图证据链、增量法与发行后读数纪律，依赖 ego-browser 与登录态。

## ADDED Requirements

### Requirement: 双口径与禁跨口径比率

`ego-qishui-stats` SHALL 把汽水站内指标与音频点赞分列为两个口径；SHALL NOT 用跨口径数值计算比率；增量 SHALL 在同口径内按快照相减。

#### Scenario: 用户问点赞率

- **WHEN** 用户想把音乐卡点赞除以站内播放
- **THEN** skill SHALL 说明两口径基数不同、比值作废，并分别给出各自口径的读数

### Requirement: 三周期采集与截图

skill SHALL 采集近 1 天/7 天/30 天三窗口；每周期 SHALL 真实点击周期按钮、DOM 提取 8 指标、CDP 截图并存盘；方向与选中态 SHALL 以截图为唯一判据。

#### Scenario: 周期按钮点击落空

- **WHEN** 点击后截图显示选中态未变
- **THEN** skill SHALL 换坐标法或 refs 法重试，不得把未切换的数据当目标周期

### Requirement: 长表与批次笔记

skill SHALL 按 8 列长表追加 CSV，日期用 ISO 格式、数值标准化、备注用中文全角标点；TOP10 SHALL 只入批次笔记，SHALL NOT 混入账号 CSV。

#### Scenario: 数值显示为万

- **WHEN** 页面显示「1.6万」
- **THEN** skill SHALL 落库 16000，并把原显示写入备注

### Requirement: 采集脚本行为

`scripts/scrape_stats.js` SHALL 用本地日期生成默认输出目录、支持 `STATS_OUT_DIR` 覆盖；SHALL 在 stdout 末尾输出 `RESULT_JSON <json>`（形状 `{"近1天":[...],...}`）；refs 未填的周期 SHALL 跳过并打印 `SKIPPED`。

#### Scenario: refs 未填

- **WHEN** `periods[].ref` 仍是占位值
- **THEN** 脚本 SHALL 跳过该周期并显式打印 `SKIPPED`，不得静默当作成功采集

### Requirement: 隐私与存储

skill SHALL 将账号级 CSV、截图与批次笔记视为私有数据；SHALL 建议放在 gitignored 目录、不提交公开仓库；截图含账号标识时 SHALL 提示分享前裁剪或打码。

#### Scenario: 准备分享数据

- **WHEN** 用户要把采集结果发到公开渠道
- **THEN** skill SHALL 要求先聚合或脱敏，避免暴露账号标识与逐曲明细

### Requirement: 读数纪律

skill SHALL 先按署名分层再比较；D0/D1 SHALL NOT 下结论；SHALL NOT 立批级两态概念；跨引擎数据 SHALL NOT 互推；结构性缺口 SHALL 登记为采集边界。

#### Scenario: 同批 solo 曲低播放

- **WHEN** 同批 solo 曲集体沉底
- **THEN** skill SHALL 判定为预期行为，不得据此否定词曲或启动归因
