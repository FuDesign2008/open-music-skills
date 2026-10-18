# Batch-6 移植流程留痕（skill-creator）

> 本文件记录 `hit-pattern-craft` / `pre-generation-check` / `launch-strategy` 三个 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-6。

## 裁剪声明

- 本批为「需重写与脱敏」批次：私有平台数据只保留方法论结论，不出现具体数值与曲名
- 评测用例：hit-pattern 1 / pre-gen 1 / launch 1
- 不做 baseline 对照；断言限定为契约完整性；未做 description 触发优化

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| hit-pattern-craft | 153 → 143 | 流量路径定位 + 15 条性状库保留；私有平台数据（具体曲名/数值/相关系数）只留方法论结论；合作署名等结论标「相关性≠因果」 |
| pre-generation-check | 265 → 240 | 11 道关卡重写为通用检查清单；内部规则引用改检查项本身；平台专属字段改「目标平台配置」 |
| launch-strategy | 142 → 125（+ 3 references 139） | 冷启动/曲名截流/变现框架保留；剔除已停用推广线；私有投放数据与案例去名；3 个 references 重组 |

## 评测段

- **用例**：3 组 `evals/`（各 1 个 case）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本）：
  - `hit-pattern-craft`：10 项（路径 A/B / 双路径 / 15 条 / 曲名 / 合作署名 / 成组 / D0-D1 / 复刻阶梯 / 相关性）
  - `pre-generation-check`：15 项（Gate 1-11 / BLOCKING/WARNING/INFO / 器乐）
  - `launch-strategy`：10 项（Phase 0-4 / 蹭热度 / 4 周 / 变现 / 模板 / 指标）
  - **结果：35/35 全通过**
- **eval 文件可解析性**：3/3 组 JSON 解析通过

## 迭代段

- 初版契约断言 35/35 全通过；预提交双轴审查发现 1 Important + 5 Minor，已修复：
  - 去私有歌词片段（花瓣即刃/雨声太诚实/天台的云/借来的好日子）与系列前缀示例
  - launch 补场景池与重名检查；hit-pattern 自查改为「标注命中/缺口」
  - 留痕文件数与任务断言清单同步
- 修复后复验：四命令 + OpenSpec strict 全绿

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 22 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 22 skills, 0 error / 0 warning（新增 3 个：269-302 码点） |
| 脱敏 lint | 142 文件 0 命中 |
| `npm test` | 44 passed / 0 failed |
| 体量 | 143 / 240 / 125 行（均 <500；references 另计） |
| 四字段 | 3 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
