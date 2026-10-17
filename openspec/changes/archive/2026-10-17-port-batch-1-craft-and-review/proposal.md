## Why

open-music-skills 目前只有 1 个 skill（`xiaoyao-craft`），仓库的**创作生产**定位缺少基础方法论骨架：写词缺画面感技法的系统清单、缺叙事钩子的方法、缺编曲留白的量化标准、缺 AI 写作模式的检测工具。`docs/porting-plan.md` 把这 4 个 skill 判为 P0（零外部依赖、自包含、正文均 < 500 行），是整条移植路线图里风险最低、杠杆最高的首批。

## What Changes

新增 4 个公开自包含 skill（`skills/<name>/SKILL.md`）：

- **`imagery-craft`**（源自 0.5.0）：方文山画面感公式 + 10 维度创作清单（人称／具象名词／画面动词／上色形容词／比喻／比拟／词性活用／考据细节／蒙太奇／留白伏笔）+ 三阶段工作法（写词前定地基 → 写词中构建 → 写词后自检评分）+ 流派意象库 + 真实锚定 7 法 + 金句载体 11 族速查
- **`story-craft`**（源自 0.1.0）：冰山原则（只露 1/8）+ 10 技法（冰山省略／客观对应物／时间跳跃／二级意境／细节即故事／钩子开头／双视角／未发生／开放结尾／个人化第一人称）+ 三阶段工作法 + 流派适配 + 体裁边界 + 考据注入三道检验
- **`whitespace-craft`**（源自 1.2.0）：把「留白」定义为「人声缺席的时段」+ 创作者标准（头尾各 ≥30s 纯器乐 + 全曲人声缺席 ≥60%）+ 平台落地手段（标签 / Style 自然语言）+ 取气两派 + 各流派器乐占比模板
- **`voice-checker`**（源自 0.2.0）：11 类 AI 写作模式检测（抽象名词堆砌／过度解释／对称情绪弧／缺个性细节／陈词升级／完美语法／过度平行／成语堆砌／古诗拼贴／韵脚疲劳／「的」字泛滥）+ 严重度分级（Warning / Info）+ 陈词拒用反向解法

**改造（每 skill 相同）**：
- 删除内部规则编号引用 → 改为规则本身的表述
- 删除私有资料路径 → 改为「扩展阅读」或删除
- 删除私有批次号/曲目名/专辑名 → 去名或改公开示例
- 跨 skill 引用改为**最终目标名**（同仓库后续批次将落地：`music-creation-workflow` / `lyric-reviewer` / `pre-generation-check` / `songyun-craft` / `ego-miaoxiang-create` 等）
- 平台专属表述标注适用范围

**无 BREAKING 变更**（纯新增）。

## Capabilities

### New Capabilities

- `imagery-craft`：画面感创作契约 —— 10 维度创作清单、三阶段工作法、流派意象库、真实锚定、金句载体选型
- `story-craft`：故事性创作契约 —— 冰山原则、10 技法、流派适配、体裁边界、考据注入检验
- `whitespace-craft`：留白契约 —— 人声缺席定义、创作者标准（≥60% + 头尾 ≥30s）、平台落地手段、取气两派
- `voice-checker`：AI 写作模式检测契约 —— 11 类模式、严重度分级、仅建议不改写、流派敏感降级

### Modified Capabilities

（无 —— 本仓库此前无这 4 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/imagery-craft/SKILL.md`、`skills/story-craft/SKILL.md`、`skills/whitespace-craft/SKILL.md`、`skills/voice-checker/SKILL.md`（+ 各自的 `evals/`），`docs/generated/skills-index.md` 自动更新
- **依赖**：全部零运行时依赖（纯文本方法论 + 输出格式模板）
- **不影响**：源工程（只读）、`xiaoyao-craft`（既有）
- **后续批次**：本批 4 个 skill 的跨 skill 引用指向的 skill 将在 batch-2..8 落地（不阻塞本批验收）
