# Batch-1 移植流程留痕（skill-creator）

> 本文件记录 `imagery-craft` / `story-craft` / `whitespace-craft` / `voice-checker` 四个 skill 的移植过程（起草 / 评测 / 迭代三段），对应 tasks 1.4 / 2.4 / 3.4 / 4.4。

## 裁剪声明（design D4）

- 每 skill **1 个 representative test case**（`evals/evals.json`），不做 baseline 对照
- 断言限定为**契约完整性**（清单是否齐全、分级是否正确、禁忌是否声明），不做美学质量机器评分
- 未做 description 触发优化（需 `claude -p` 多轮，超预算）

## 起草段

| skill | 源行数 → 目标行数 | 脱敏改写要点 |
|---|---|---|
| imagery-craft | 260 → 257 | 去「规则编号 + 数字」引用 → 规则表述；删私有调研/词法档案路径 → 扩展阅读；跨 skill 引用改 `music-creation-workflow` 等目标名；描述收窄为触发路由四要素 |
| story-craft | 225 → 204 | 去编号引用；删私有案例与宋韵手册路径；删除「诗词题材已禁」的私有商业策略，**保留**「豪放型不适用冰山」的方法论边界；描述收窄为触发路由四要素 |
| whitespace-craft | 199 → 188 | 去编号引用与私有实测批次号；删私有路径；平台适配表述改为「支持段标 / 无段标平台」两类通道；统一「结构性留白 ≠ 内容压缩」口径 |
| voice-checker | 274 → 269 | 去私有批次/曲目名与平台专属路径；保留 11 类检测与 Warning/Info 分级（无 Critical）；统一报告字段为「位置/内容/问题/方向」 |

## 评测段

- **用例**：4 个 `evals/evals.json`（各 1 case）
- **契约断言**（本轮按下列清单逐项核对；未固化为仓库脚本，可用等价关键词检查复跑）：
  - `imagery-craft`：15 项（10 维度名 / 三阶段 / 真实锚定 / 11 族）
  - `story-craft`：14 项（10 技法 / 体裁边界 / 考据三检验）
  - `whitespace-craft`：8 项（人声缺席 / ≥60% / ≥30s / 两类落地 / 取气两派）
  - `voice-checker`：16 项（11 类 / 分级 / 仅建议 / 流派敏感 / 浓烈分界）
  - **结果：4/4 全通过**（初版 voice-checker 因断言词过严误报 1 项，已按语义等价修正断言）

## 迭代段

- **结论：无需内容迭代** —— 唯一修正是**断言词**（「不自动改写」→「绝不自动修改」），非 skill 内容；四命令全绿
- Part R 双轴审查后按意见修订：4 个 description 收窄为触发路由四要素并补反向边界；脱敏 denylist 补齐两类路径形态盲区（含反引号占位写法）；留白口径统一为「默认不压缩内容、留白档仅调词量窗」。修订后四命令仍全绿

## 四命令结果

| 检查 | 结果 |
|---|---|
| 索引新鲜度 | 5 skills 生成；提交后 `git diff --exit-code` 干净 |
| description lint | 5 skills, 0 error / 0 warning |
| 脱敏 lint | 37 文件 0 命中 |
| `npm test` | 40 passed / 0 failed |
