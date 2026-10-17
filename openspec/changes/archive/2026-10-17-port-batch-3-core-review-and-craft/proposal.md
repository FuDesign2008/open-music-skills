## Why

batch-1 提供写词与 AI 味/发音检查，batch-2 提供显式内容、实物常识与母带；但**核心歌词质量审查**与**三条 craft 线**仍缺：16 点歌词审查、标杆 DNA 提取、宋韵审美机制、甜感美学。`docs/porting-plan.md` 把这 4 个 skill 判为 P1（正文均 <500 行，`music-dna-extraction` 带 references、`songyun-craft` / `sweet-craft` 带 evals），是批次 3 的核心内容。

## What Changes

新增 4 个公开自包含 skill（`skills/<name>/SKILL.md`）：

- **`lyric-reviewer`**：16 点审查框架（韵脚／节奏／结构／视角／段落长度／情绪可及／艺人名／Prompt 长度／结构层／金句承重／峰值位置／洞见／单色／情理钻石／选题锚点／浓度）+ 严重度分级 + 报告格式
- **`music-dna-extraction`**：5 步流程 + 7 维 DNA 框架（BPM／调式／乐器／曲式／歌词意象／制作／情绪有效性）+ 双载体 Style 配方 + 专辑参数；`references/` 随行
- **`songyun-craft`**：宋韵审美机制（简·淡·韵·常）+ 八测试自检 + 六组技法（简素／平淡／韵致／日常／雅俗／开片）+ 执行纪律；`evals/` 随行
- **`sweet-craft`**：物件化甜感 7 技 + 女声配方 + 曲名双截流 + 打包归因与 [S]/[W]/[H] 证据分级；`evals/` 随行

**改造（每 skill 相同）**：
- 内部规则编号 → 规则本身的表述
- 源工程私有路径 / 私有曲目 / 专辑 / 批次 ID / 精确运营数值 → 通用描述、脱敏结论或删除
- 平台专属术语 → 平台中立表述（标签式 / 自然语言式；目标平台配置为准）
- 跨 skill 引用改为**最终目标名**（`music-creation-workflow` / `voice-checker` / `explicit-checker` / `pre-generation-check` / `whitespace-craft` / `xiaoyao-craft` / `hit-pattern-craft` / `launch-strategy`）

**无 BREAKING 变更**（纯新增）。

## Capabilities

### New Capabilities

- `lyric-reviewer`：歌词审查契约 —— 16 点框架、严重度、只审查不改写
- `music-dna-extraction`：DNA 提取契约 —— 5 步、7 维、分布综合、双载体、零引用
- `songyun-craft`：宋韵审美契约 —— 八测试、六组技法、变量隔离
- `sweet-craft`：甜感美学契约 —— 物件化 7 技、打包归因、证据分级

### Modified Capabilities

（无 —— 本仓库此前无这 4 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/{lyric-reviewer,music-dna-extraction,songyun-craft,sweet-craft}/SKILL.md`（+ `evals/`；music-dna-extraction 另含 `references/`），`docs/generated/skills-index.md` 自动更新
- **依赖**：全部零运行时依赖（纯文本方法论 + 调研模板）
- **不影响**：源工程（只读）、既有 9 个 skill
- **后续批次**：本批引用指向的 `pre-generation-check` / `hit-pattern-craft` / `launch-strategy` 等将在 batch-5..8 落地（不阻塞本批验收）
