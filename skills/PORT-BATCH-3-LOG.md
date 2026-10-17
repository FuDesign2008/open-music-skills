# Batch-3 移植流程留痕（skill-creator）

> 本文件记录 `lyric-reviewer` / `music-dna-extraction` / `songyun-craft` / `sweet-craft` 四个 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-3。

## 裁剪声明

- 评测用例随 skill 规模：`lyric-reviewer` 2 / `music-dna-extraction` 1 / `songyun-craft` 6 + 20 条触发检查 / `sweet-craft` 7
- 不做 baseline 对照；断言限定为**契约完整性**（清单是否齐全、分级是否正确、禁忌是否声明）
- 未做 description 触发优化（`songyun-craft` 随行保留源版 20 条触发盲评记录）

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| lyric-reviewer | 335 → 288 | 16 点框架保留；内部规则编号→规则表述；私有批次/曲目 ID 与审查实例去名；私有词法档案路径改「自建扩展阅读」；平台长度项改「目标平台上限/词量门」 |
| music-dna-extraction | 164 → 146（+ references 278 / 107） | 5 步 + 7 维框架保留；私有报告路径改「自建标杆池/趋势报告」；双载体改「标签式/自然语言式」；references 随行并同步脱敏 |
| songyun-craft | 98 → 78 | 八测试 + 六组保留；去私有美学手册路径与规则编号；平台术语中立化；移除未公开批次规划表述，改为变量隔离方法论 |
| sweet-craft | 147 → 122 | 物件化 7 技保留；私有标杆曲目/歌词/路径/精确 A/B 数值改为脱敏结论；保留打包归因与 [S]/[W]/[H] 证据分级 |

## 评测段

- **用例**：4 组 `evals/`（lyric 2 / dna 1 / songyun 6 + trigger-evals 20 / sweet 7）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本，可用等价关键词检查复跑）：
  - `lyric-reviewer`：17 项（16 点 + 自动修复）
  - `music-dna-extraction`：16 项（5 步 / 7 维 / 分布 / 双输出 / 专辑参数 / references）
  - `songyun-craft`：16 项（T1–T8 / 六组 / 警示 / 红线）
  - `sweet-craft`：12 项（7 技 / 打包归因 / 证据分级 / 女声配方 / 曲名双截流）
  - **结果：61/61 全通过**
- **eval 文件可解析性**：4/4 组 JSON 解析通过

## 迭代段

- 初版契约断言 61/61 全通过；预提交双轴审查发现 2 Important + 5 Minor，已修复：
  - `sweet-craft` 补「三重标签已停用」标注；`songyun-craft` 恢复「全部技法未实测」
  - `lyric-reviewer` 加第 17 点省略说明；严重度 Blocker 统一为 Critical
  - 平台专有词中立化（抖音切片/DOU+）；`music-dna-extraction` 补「少于 8 首」停手
  - `songyun-craft` eval 的组名与正文对齐
- 修复后复验：四命令 + OpenSpec strict 全绿

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 13 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 13 skills, 0 error / 0 warning（新增 4 个：312–347 码点） |
| 脱敏 lint | 82 文件 0 命中 |
| `npm test` | 44 passed / 0 failed |
| 体量 | 288 / 146 / 78 / 122 行（均 <500；references 另计） |
| 四字段 | 4 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
