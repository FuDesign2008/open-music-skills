# Batch-7 移植流程留痕（skill-creator）

> 本文件记录 `ego-multi-ai-research` / `ego-zhihu-inspiration` / `ego-emotion-radar` 三个调研线 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-7。

## 裁剪声明

- 本批为调研线（依赖 ego-browser）：保留方法论与工具链配方，去私有运行数据/批次 ID/报告路径
- 评测用例：3 个（各 1 case）
- 不做 baseline 对照；断言限定为契约完整性；未做 description 触发优化

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| ego-multi-ai-research | 181 → 181（改名） | 七步流程/三分区/两种模式保留；去私有运行路径、日期、批次 ID、曲名与规则编号；依赖 ego-browser 声明；改名为 ego-multi-ai-research |
| ego-zhihu-inspiration | 130 → 134 | 三入口/四要素/8-gram 纪律保留；去私有批次数据、具体故事赞数、内部路径；依赖 ego-browser 声明 |
| ego-emotion-radar | 155 → 154（+ scripts/collect.js） | 七源雷达/五层/母题表保留；去私有报告路径、批次 ID、规则编号；collect.js 随行并去私有注释 |

## 评测段

- **用例**：3 组 `evals/`（各 1 case）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本）：
  - `ego-multi-ai-research`：12 项（七步 / 统一问题组 / 三分区 / 来源 / 降级 / ego-browser / 两种模式 / 第四源）
  - `ego-zhihu-inspiration`：8 项（探针 / 三入口 / 四要素 / 8-gram / 零借用 / ego-browser / 报告 / 存量对照）
  - `ego-emotion-radar`：8 项（七源 / 五层 / 母题 / 脚本 / 过滤 / ego-browser / 选题 / 事件≠母题）
  - **结果：28/28 全通过**
- **eval 文件可解析性**：3/3 组 JSON 解析通过

## 迭代段

- 初版契约断言 28/28 全通过
- **预提交双轴审查（fresh context）**：1 Critical + 5 Minor
  - **Critical（并发索引）**：batch-8 文件与 batch-7 落在同一工作树，pre-commit 会生成 30-skill 索引而 batch-8 文件未提交 → 单独提交 batch-7 会让索引不自洽。**处置 = 串行化提交**（stash batch-8 → 提交 batch-7 → pop → 提交 batch-8），非内容缺陷。
  - Minor 修复：①「七源」命名统一（原正文「六源」却列七个源，脚本注释与 proposal 同步）②控制台输出描述与脚本对齐（`[ok] key len=N`，无「首条样例」）③微读等待 7s+ → 约 6.5-7s（与脚本 6500ms 一致）④报告落点去除 `runs/` 私有路径形态 ⑤删除「原名 ego-multi-ai-collab」改名说明（公开版无需 provenance）

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 25 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 25 skills, 0 error / 0 warning（新增 3 个：282-311 码点） |
| 脱敏 lint | 157 文件 0 命中（batch-7 单独状态；共享工作树含 batch-8 时为 178） |
| `npm test` | 44 passed / 0 failed |
| 体量 | 181 / 134 / 154 行（均 <500；scripts 另计） |
| 四字段 | 3 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
| OpenSpec | change strict 校验通过；归档后主 specs 28/28 |
