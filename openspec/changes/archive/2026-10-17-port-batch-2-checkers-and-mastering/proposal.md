## Why

batch-1 已落地写词与审查的四个基础 skill，但生成前/发布前仍缺三类检查与一条音频后处理链：中文发音风险（多音字/低频字/阿拉伯数字）没有专项扫描器；显式内容与分发平台标记没有一致性检查；实物常识与 AI 调研候选没有核查门；平台导出的 WAV 没有响度达标的母带流程。`docs/porting-plan.md` 把这 4 个 skill 判为 P0（零外部依赖或仅依赖 ffmpeg，正文均 <500 行），是批次 2 的核心内容。

## What Changes

新增 4 个公开自包含 skill（`skills/<name>/SKILL.md`）：

- **`pronunciation-check`**：三类中文发音风险（多音字／低频单音字／阿拉伯数字）+ 听感/字面分离修复 + 三级处理策略 + 替换表与报告格式
- **`explicit-checker`**：英文显式词表 + 中文 A/B 两档敏感词框架 + 变体检测 + Explicit 标记一致性核对 + 报告格式
- **`reality-check`**：实物常识三问（计量形制／使用动作链／保存时限）+ 溯源 A–D 级 + 幻觉诱捕清单 + 🔴/🟡/🟢 分级
- **`audio-mastering`**：平台输出响度基线 + 流媒体目标表 + 经验证的 EQ+lowpass+loudnorm 链 + two-pass 精确配方 + 验证脚本

**改造（每 skill 相同）**：
- 内部规则编号 → 规则本身的表述
- 源工程私有路径 / 私有曲目 / 专辑 / 实验编号 → 通用描述或删除
- 平台专属术语 → 平台中立表述；平台名单改为「按目标分发平台配置」
- 跨 skill 引用改为**最终目标名**（`pre-generation-check` / `lyric-reviewer` / `imagery-craft` / `whitespace-craft` / `ego-multi-ai-research`）
- `audio-mastering` 的 `scripts/` 随行迁移，docstring 同步脱敏

**无 BREAKING 变更**（纯新增）。

## Capabilities

### New Capabilities

- `pronunciation-check`：中文发音检查契约 —— 三类风险、听感/字面分离、三级处理
- `explicit-checker`：显式内容检查契约 —— 中英文扫描、A/B 档、标记一致性、平台配置
- `reality-check`：实物常识核查契约 —— 三问、溯源分级、判定分级
- `audio-mastering`：音频母带契约 —— 响度目标、two-pass、安全与验证、平台适用性

### Modified Capabilities

（无 —— 本仓库此前无这 4 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/{pronunciation-check,explicit-checker,reality-check,audio-mastering}/SKILL.md`（+ `evals/`；audio-mastering 另含 `scripts/`），`docs/generated/skills-index.md` 自动更新
- **依赖**：前 3 个零运行时依赖；`audio-mastering` 依赖 `ffmpeg`（可选 `ffmpeg-normalize` / `librosa` / `numpy`），正文已前置声明
- **不影响**：源工程（只读）、既有 5 个 skill
- **后续批次**：本批引用指向的 `pre-generation-check` / `lyric-reviewer` / `ego-multi-ai-research` 将在 batch-3..8 落地（不阻塞本批验收）
