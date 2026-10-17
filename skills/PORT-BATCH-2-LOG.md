# Batch-2 移植流程留痕（skill-creator）

> 本文件记录 `pronunciation-check` / `explicit-checker` / `reality-check` / `audio-mastering` 四个 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-2。

## 裁剪声明

- 每 skill **1 个 representative test case**（`evals/evals.json`）；`reality-check` 随行保留源版 2 个 case
- 不做 baseline 对照；断言限定为**契约完整性**（清单是否齐全、分级是否正确、禁忌是否声明）
- 未做 description 触发优化（需多轮外部评测，超本卡预算）

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| pronunciation-check | 266 → 257 | 去内部规则编号与私有曲目/批次引用；私有调研路径改「自建扩展表」；平台专属术语改通用描述；三类风险、三级策略与替换表保留 |
| explicit-checker | 179 → 175 | 去内部规则编号；私有路径改「项目歌词文件」；平台名单改「按目标分发平台配置」，保留示例；英文词表与中文 A/B 档保留 |
| reality-check | 73 → 75 | 去内部规则编号与私有项目日期/事故数字；AI 协作 skill 引用改为最终目标名 `ego-multi-ai-research`；三问、溯源 A–D、实例卡保留 |
| audio-mastering | 334 → 336 | 去平台专属工作流术语与私有专辑/实验编号；路径改 `<专辑目录>`；标题与描述改平台中立；two-pass 配方、响度标准与脚本保留；两个 Python 脚本随行并同步脱敏 docstring |

## 评测段

- **用例**：4 个 `evals/evals.json`（pronunciation 1 / explicit 1 / reality 2 / audio 1）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本，可用等价关键词检查复跑）：
  - `pronunciation-check`：15 项（三类风险 / 听感字面分离 / 三级策略 / 单音字原则 / 两种数字读法 / 谐音梗 / 报告与还原 / 公版原句 / 常见坑）
  - `explicit-checker`：10 项（英文词表 / 中文 A/B 档 / 变体 / 标记不匹配 / 平台配置 / 合规前置 / 不改写）
  - `reality-check`：14 项（三问 / 溯源 A–D / 幻觉诱捕 / 三级判定 / 实例卡 / 目标名）
  - `audio-mastering`：13 项（响度基线 / 目标 -14 与 -1 dBTP / v5 链 / 排除滤镜 / two-pass / 验证 / 静默检查 / 不覆盖原始）
  - **结果：52/52 全通过**
- **eval 文件可解析性**：4/4 JSON 解析通过

## 迭代段

- 初版契约断言 52/52 全通过；随后预提交双轴审查发现 7 Important + 3 Minor，已修复：
  - `reality-check` 私有案例改通用示例（同步 evals 与 spec）
  - `pronunciation-check` 将「明确代号」并入 🟢，仅谐音梗保留 🟡
  - `explicit-checker` 补「平台未配置先确认」场景
  - `.gitignore` 补 `__pycache__/` 与 `*.pyc`
  - 留痕数字按最终树同步；🔴 处置改为「阻断 + 给修正方向，由创作者决定改法」
- 修复后复验：四命令 + `py_compile` + `openspec validate --strict` 全绿
- 随行脚本只做了 docstring 脱敏（平台名与私有环境说明），算法逻辑未改

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 9 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 9 skills, 0 error / 0 warning（新增 4 个：238–294 码点） |
| 脱敏 lint | 58 文件 0 命中 |
| `npm test` | 44 passed / 0 failed |
| 体量 | 257 / 175 / 75 / 336 行（均 <500） |
| 四字段 | 4 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
