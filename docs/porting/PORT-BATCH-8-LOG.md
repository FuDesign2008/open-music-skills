# Batch-8 移植流程留痕（skill-creator）

> 本文件记录 `ego-qishui-release` / `ego-qishui-stats` / `ego-miaoxiang-create` / `astrill-control` / `sms-code-reader` 五个平台自动化 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-8。

## 裁剪声明

- 本批为平台自动化线（release/stats/miaoxiang 依赖 ego-browser；astrill/sms 依赖 macOS 系统能力）
- **脱敏强度最高的一批**：删除账号艺名、合作者姓名、私有曲名/专辑名、发行批次台账、收入与播放数据、内部规则编号、私有路径
- 评测用例：5 个（各 1 case）
- **评测深度诚实标注**：平台自动化 skill 的端到端评测需要真实登录态与账号，公开仓库中不可执行——本批为**契约级评测**（断言正文是否覆盖关键配方与安全门），非端到端实操；不做 baseline 对照；未做 description 触发优化

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| ego-qishui-release | 367 → 289 | 三步向导/容器标记法/歌词框互斥分类/QC 四道门/issuedId 直链保留；去账号艺名、合作者姓名、私有曲名与专辑名、批次编号与日期、规则编号、私有路径；验证码改标注为可选依赖；封面描述去掉私有审美前缀，改为「固定风格前缀」方法论 |
| ego-qishui-stats | 153 → 155（+ scripts/scrape_stats.js） | 双口径/周期映射/增量法/七步流程/判读纪律保留；去私有 CSV 落点、报告路径、案例曲名与具体数值、规则编号；脚本输出目录改环境变量、周期 refs 改显式占位 |
| ego-miaoxiang-create | 190 → 177 | 注入模板/三分支/音色池署名/时长攻坚/模型探针/资产库存/发行衔接保留；去私有曲名、艺人名、批次、路径、规则编号；人名改 `{艺名}`/`{合作者}` 占位 |
| astrill-control | 121 → 92（+ scripts/astrill.sh） | 三命令/双探针/DNS 残留/状态机/已知边界保留；**剥离源工程网络策略矩阵**，改「按平台实测填写」模板；脚本无私有数据，原样随行 |
| sms-code-reader | 93 → 98 | chat.db 直读/前置检查/时间窗/故障表/Mac 侧停滞/低电量/同网络依赖保留；删除发行流程绑定与案例日期；隐私边界保留并强化「只用于当前步骤、不写日志」 |

## 评测段

- **用例**：5 组 `evals/`（各 1 case）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本）：
  - `ego-qishui-release`：7 项（三步向导 / 容器标记法 / 互斥分类 / 回读 / QC 四门 / issuedId / 依赖声明）
  - `ego-qishui-stats`：7 项（双口径 / 禁跨口径 / 三周期 / 截图 / 增量 / 判读纪律 / 脚本）
  - `ego-miaoxiang-create`：8 项（注入 / 显式曲名 / 音色池 / 强制门 / assets 判据 / 探针 / 资产页 / 发行衔接）
  - `astrill-control`：8 项（三命令 / 双探针 / DNS / 幂等 / 前置授权 / 矩阵模板）
  - `sms-code-reader`：6 项（完全磁盘访问 / 同步 / 时间窗 / 不重复触发 / Mac 停滞 / 隐私边界）
  - **结果：36/36 全通过**（首轮 35/36，缺「双口径」字样，补标题后复跑通过）
- **eval 文件可解析性**：5/5 组 JSON 解析通过；每组含 `note` 声明契约级评测
- **行为级补充检查（预提交审查后新增）**：stats 脚本 stdout 契约（`RESULT_JSON` + `JSON.stringify(result)`）、本地日期、atob 保护；astrill 状态机（off 无条件点击 Toggle OFF、以 GUI 为成功判据、OpenWeb 不因缺隧道短路）；`node --check` / `bash -n` 通过
- **评测边界**：5 组 evals 未接入 `npm test`（后者只跑仓库工具链 44 tests）；evals 为静态用例，供人工/agent 按需执行

## 迭代段

- 初版契约断言首轮 35/36：`ego-qishui-stats` 正文用「两个互不通用的口径」表述但缺「双口径」关键词 → 标题补「双口径分列」，复跑 36/36
- 预提交双轴审查结果与修复见下
- 预提交审查：待补

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 30 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 30 skills, 0 error / 0 warning |
| 脱敏 lint | 182 文件 0 命中（batch-8 单独状态；另有人工数值/人名审查——deid lint 不覆盖这两类） |
| `npm test` | 44 passed / 0 failed |
| 体量 | 289 / 155 / 177 / 92 / 98 行（均 <500；scripts 另计） |
| 四字段 | 5 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
| OpenSpec | change strict 校验通过；batch-7 归档后主 specs 28/28，batch-8 归档后 33 |
