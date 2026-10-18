# Batch-4 移植流程留痕（skill-creator）

> 本文件记录 `orchestration-craft` / `remix-craft` / `youtube-audio-extract` / `logic-audit` 四个 skill 的移植过程（起草 / 评测 / 迭代三段），对应任务卡 batch-4。

## 裁剪声明

- 评测用例随 skill 规模：orchestration 10 / remix 1 / youtube 1 / logic 1
- 不做 baseline 对照；断言限定为**契约完整性**（清单是否齐全、分级是否正确、禁忌是否声明）
- 未做 description 触发优化

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| orchestration-craft | 312 → 278（+ references 70） | 六层织体/三谱系/响应度三层保留；去内部响应度数据（收入/先例计数/曲目 ID）；平台术语改标签式/自然语言式；references 随行并去私有统计 |
| remix-craft | 90 → 88 | 公版过审/做减法/情感借鉴/调研四条保留；去内部批次、规则编号与平台专属字段；公版判定改为逐首核实（含整理者权） |
| youtube-audio-extract | 173 → 159 | yt-dlp + deno + cookies 配方保留；去私有路径与提取历史表；补个人分析/版权合规提示 |
| logic-audit | 222 → 212 | D1–D7 七维保留（覆盖时间/情绪/叙事、自检表、锚点与索引、歌词自洽四族）；平台专属检查改为可配置规则；去私有路径与规则编号 |

## 评测段

- **用例**：4 组 `evals/`（orchestration 10 / remix 1 / youtube 1 / logic 1）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本）：
  - `orchestration-craft`：16 项（六层 / 三谱系 / 六技法 / A-B-C / 预算 / references）
  - `remix-craft`：8 项（公版 / 整理者 / 38-40% / 做减法 / 情感致敬 / 调研 / 加长 / 不采样）
  - `youtube-audio-extract`：7 项（yt-dlp / deno / cookies / 格式 / 验证 / librosa / 合规）
  - `logic-audit`：11 项（D1–D7 / 自动修复 / 人工决策 / 索引）
  - **结果：42/42 全通过**
- **eval 文件可解析性**：4/4 组 JSON 解析通过

## 迭代段

- 初版契约断言 42/42 全通过；预提交双轴审查发现 3 Important + 7 Minor，已修复：
  - `youtube-audio-extract` 补 ffmpeg 前置与依赖声明；`logic-audit` 收窄纯器乐边界、去 Track 示例、修检查命令
  - `orchestration-craft` 豪放模板改用 A/B 层乐器（cello/harp/crotales），满足 C 层 ≤2
  - `remix-craft` 自检补曲名商标核查；orchestration evals 预算按平台分叉
  - design references 描述与留痕数字同步
- 修复后复验：四命令 + OpenSpec strict 全绿

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 17 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 17 skills, 0 error / 0 warning（新增 4 个：257–426 码点） |
| 脱敏 lint | 104 文件 0 命中 |
| `npm test` | 44 passed / 0 failed |
| 体量 | 278 / 88 / 159 / 212 行（均 <500；references 另计） |
| 四字段 | 4 个新 skill 全部齐全（name=目录名 / version 0.1.0 / user-invocable / description） |
