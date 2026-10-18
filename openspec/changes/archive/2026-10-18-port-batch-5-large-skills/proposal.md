## Why

batch-1..4 已覆盖写词、检查器、核心审查与 craft 线；但**创作全流程编排**与**趋势调研**两个大件仍缺：前者是写词/Style/检查链/发行的主流程，后者为新专辑选型提供数据支撑。`docs/porting-plan.md` 把它们列为 P2 大件（源版 530 / 270 行，需拆分 references），是批次 5 的核心内容。

## What Changes

新增 2 个公开自包含 skill（`skills/<name>/SKILL.md` + `references/`）：

- **`music-creation-workflow`**（源 `suno-workflow` 改名）：模式 A（歌词演唱）/模式 B（器乐纯音乐）的 Prompt 结构、12 条核心规则、检查链编排（voice-checker → reality-check → lyric-reviewer → 四维 craft → pre-generation-check）、发行前交付物清单；细则移 `references/creation-rules.md`
- **`music-trends-report`**：5 阶段流程（范围/采集/去重加权/七类分析/配方与报告）+ 跨源权重表 + 偏差纠偏 + 七类旋律/BPM/制作签名/缺口 + 报告模板；4 个 references

**改造**：
- 内部规则编号 → 规则本身的表述
- 源工程私有路径 / 曲目 / 专辑 / 批次 ID / 运营数值 → 通用描述或删除
- 平台专属字段 → 「按目标平台配置」；自然语言式/标签式双载体
- 跨 skill 引用改为最终目标名（`music-trends-report` / `music-dna-extraction` / `orchestration-craft` / `voice-checker` / `reality-check` / `lyric-reviewer` / `pre-generation-check` / `audio-mastering`）

**无 BREAKING 变更**（纯新增；`suno-workflow` → `music-creation-workflow` 为命名约定要求的改名）。

## Capabilities

### New Capabilities

- `music-creation-workflow`：创作流程契约 —— 模式 A/B Prompt、检查链、核心规则、交付物
- `music-trends-report`：趋势调研契约 —— 5 阶段、跨源权重、七类分析、配方与报告

### Modified Capabilities

（无 —— 本仓库此前无这 2 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/{music-creation-workflow,music-trends-report}/SKILL.md` + `evals/` + `references/`
- **依赖**：`music-trends-report` 需要可用的 web access 工具（正文已声明）；其余零运行时依赖
- **不影响**：源工程（只读）、既有 17 个 skill
- **后续批次**：本批引用指向的 `pre-generation-check` 等将在 batch-6 落地（不阻塞本批验收）
