# Batch-5 移植流程留痕（skill-creator）

> 本文件记录 `music-creation-workflow` / `music-trends-report` 两个大件 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-5。

## 裁剪声明

- 大件采用「核心方法论留正文 + 细则移 references/」；正文均 <500 行
- 评测用例：music-creation-workflow 2 / music-trends-report 1
- 不做 baseline 对照；断言限定为契约完整性；未做 description 触发优化

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| music-creation-workflow | 530 → 342（+ references/creation-rules.md 119） | 核心流程与模式 A/B 保留；内部规则编号去号留义；私有路径/曲目/批次/运营数值删除；平台专属字段改「按目标平台配置」；四维 craft 与检查链改为目标名 |
| music-trends-report | 270 → 181（+ 4 references 482） | 5 阶段/七类/BPM/制作签名/缺口保留；去私有报告模板与项目引用；references 重组为公开数据源/分析/模板/配方；平台归属与代理口径保留 |

## 评测段

- **用例**：2 组 `evals/`（creation 2 / trends 1）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本）：
  - `music-creation-workflow`：16 项（模式 A/B / Prompt 六段 / 四维 craft / 检查链 / 交付物 / references）
  - `music-trends-report`：16 项（5 阶段 / 七类 / BPM / 制作签名 / 权重 / 纠偏 / 配方 / 落盘 / 时效 / 缺口 / references）
  - **结果：32/32 全通过**
- **eval 文件可解析性**：2/2 组 JSON 解析通过

## 迭代段

- 初版契约断言 32/32 全通过；预提交双轴审查发现 4 Important + 5 Minor，已修复：
  - creation 反向边界改为「趋势/选型调研用 trends」；文件模板改通用命名
  - trends 前置检查统一为「工具缺失即终止」；报告模板统一 9 节；YAML 禁令明确
  - 补超限精简与骨架句保留；Step 2.5 补 remix-craft 可选自检
  - design 改称「规则手册」，留痕同步
- 修复后复验：四命令 + OpenSpec strict 全绿

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 19 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 19 skills, 0 error / 0 warning（新增 2 个：385 / 328 码点） |
| 脱敏 lint | 122 文件 0 命中 |
| `npm test` | 44 passed / 0 failed |
| 体量 | 342 / 181 行（均 <500；references 另计） |
| 四字段 | 2 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
