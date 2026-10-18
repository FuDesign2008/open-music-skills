---
name: music-creation-workflow
version: "0.1.0"
user-invocable: true
description: Use when 创作或优化 AI 音乐（写 Style/Prompt、写中文歌词、专辑情绪光谱审查、器乐纯音乐、分发策略），或用户提到创作音乐、生成 prompt、写一首关于 X 的歌、纯音乐、情绪优化、情绪光谱、专辑审查。提供模式 A（歌词演唱）/模式 B（器乐纯音乐）的 Prompt 结构、核心创作规则、检查链编排（voice-checker → reality-check → lyric-reviewer → 四维 craft → pre-generation-check）与发行前交付物清单。触发词包括创作音乐、生成 prompt、写歌词、纯音乐、情绪光谱、专辑审查、音乐创作、suno。反向边界：趋势/市场选型调研用 music-trends-report；remix/公版改编用 remix-craft；只做创作流程编排，不替代各专项审查 skill。
---

# 音乐创作全流程编排（music-creation-workflow）

> **定位**：AI 音乐创作的**方法论主体**——写词、Style 结构、情绪光谱、检查链编排与发行前交付。平台差异集中在「生成层」，本文以**目标平台配置**为准；标签式平台与自然语言式平台的差异按平台适配注记处理。

## 触发词

- **创作音乐**：基于情绪/氛围/场景生成 Style 与歌词
- **生成 prompt**：把抽象创作需求转化为可用的 Style
- **写歌词**：角色第一人称歌词创作与优化
- **纯音乐**：器乐纯音乐模式
- **专辑审查**：多曲目专辑的硬约束、索引、情绪光谱、歌词可及性审查
- **情绪光谱 / 情绪太单一 / 战歌太多**：专辑层情绪分布优化

## 适用范围

- **模式 A：歌词演唱**——以角色第一人称创作完整歌词，由指定声线演唱
- **模式 B：器乐纯音乐**——通过乐器音色、演奏技法、和声色彩传递情绪；允许无词人声（humming / chanting / wordless vocal pads）
- 目标平台与分发渠道按项目配置；命名语言按目标市场选择（中文/英文）

---

## Prompt 结构模板

> **平台形态**：标签式平台用六段式英文 Prompt（含原创性声明与字符上限，示例 ≤1000 字符）；自然语言式平台用单段 Style 指令 + 时长锚句（长度按平台习惯，常见 100-207 字符）。六段式的**信息维度**（声线/情绪/编配/技术参数/结构）各平台通用，只是载体形态不同。

### 模式 A：歌词演唱

```
[原创性声明] + [演唱声线] + [情绪/氛围定调] + [乐器编配] + [技术参数] + [结构要求]
```

**完整示例**：

```
Original song with deep commanding male vocals, imperial and melancholic.
Extended full-length piece approximately 4 minutes. A poet-warrior standing
alone at the peak of power, the fire of Red Cliff illuminating his solitude.
Structure: ancient guqin opens with solemn resonance, deep male vocals enter
commanding yet vulnerable, first section adds war drums building tension,
middle section introduces lyrical reflection, climactic passage with full
orchestra and roaring flames as vocals reach desperate intensity, then
solitary guqin returns with whispered resignation. Moderate tempo around
72 BPM in E minor.
```

### 模式 B：器乐纯音乐

```
[原创性声明] + [情绪/氛围定调] + [乐器编配] + [技术参数] + [结构要求] + [人声控制标记]
```

**完整示例（纯器乐）**：

```
Original instrumental composition. Extended full-length piece approximately 4 minutes.
Slow and deeply emotional, no vocals. Warm piano-led arrangement with lush string pads
underneath, subtle jazz-inflected chord voicings. Mellow slow tempo around 65 BPM in
C minor, warm analog-tone production, soft tape-hiss ambience. Immediate melodic hook
within 5 seconds, no long intro, cohesive mood from start to finish. Instrumental only,
no lyrics.
```

**完整示例（含无词人声）**：

```
Original instrumental composition. Extended full-length piece approximately 4 minutes.
Ethereal and deeply meditative. Sparse felt piano with ambient synth pads, gentle
humming and wordless ooh-aah vocal textures weaving through the harmony. Slow tempo
around 60 BPM in D minor, lush reverb, warm analog production. Immediate melodic hook
within 5 seconds, cohesive dreamy mood. Instrumental with wordless vocal pads only,
no lyrics, no spoken or sung words.
```

---

## 核心创作规则速查

> 完整规则与场景说明见 `references/creation-rules.md`。以下为创作时最常用的 12 条。

| # | 规则 | 一句话 | 模式 |
|---|------|--------|------|
| 1 | 原创性声明 | 标签式平台 Prompt 开头含 `original composition` / `original song` 类标记 | A+B |
| 2 | 长度上限 | 标签式平台 Style ≤ 目标平台上限（示例 1000 字符）；自然语言式平台按短指令习惯 | A+B |
| 3 | 情绪定调 | 每首有明确情绪主调，避免套用流行模板 | A+B |
| 4 | 声线与歌词 | 声线指定；视角多样化；短句；含段落标记 | 仅 A |
| 5 | 器乐情绪叙事 | 主导乐器 + 演奏技法 + 和声色彩三要素齐备 | 仅 B |
| 6 | 歌词格式化 | `()` = 唱（背景人声，跟随主唱声线）；`[]` = 指令（不唱）；声线切换用结构标签 | 仅 A |
| 7 | 技术参数 | BPM、调式、混响、音色、动态 | A+B |
| 8 | 结构要求 | 时长声明 + 前 5-8 秒进主旋律 + Hook 清晰可截 | A+B |
| 9 | 元数据 | 曲名含场景关键词；可搜索、可记忆；避免特殊字符 | A+B |
| 10 | 专辑审查 | ≥3 首专辑查情绪/曲式/声线光谱；硬约束自动修、软指南等用户决策 | A+B |
| 11 | 情绪可及性 | 每首含 2-3 个具体感官锚点，陌生听众能感受情绪来源 | 仅 A |
| 12 | 概念服务于情感 | 概念/修辞/技术是情感的载体；情感先行，载体束缚情感时调整载体 | A+B |

### 约束分级

| 类型 | 判定标准 | 处理方式 |
|------|---------|---------|
| **硬约束** | 违反会导致生成异常（超长/缺 BPM/缺原创声明/艺人名等） | **自动修复**；超限时按优先级精简非骨架句，声线/结构/制作句逐字保留 |
| **软指南** | 违反不影响技术产出（语言混用/内容边界/审美取向） | **提出等用户决策** |

---

## 平台分发策略速查

| 规则 | 创作影响 | Prompt 写法 |
|------|---------|------------|
| **前 30 秒有效收听** | 前奏必须短，快速进入主旋律 | `immediate melodic hook`、`no long intro` |
| **Hook 优先** | 必须有清晰的高潮段供短视频剪辑 | 指定 `hook section` 或 `main theme` |
| **无缝衔接** | 完整版开头与短视频片段情绪一致 | `cohesive mood and texture throughout` |
| **曲名可搜索** | 包含场景关键词 | 创作时即确定曲名，写入曲目文件 |
| **平台发行节奏** | 按目标平台的独家/首发规则安排 | 签约前确认独家期限 |

---

## 常见错误

| 错误 | 修正 |
|------|------|
| 引用具体作品或艺人 | 用抽象情绪/氛围描述替代 |
| 前奏过长 | 5-8 秒内进入主旋律或人声 |
| 曲名过于抽象 | 加入场景关键词 |
| 缺少原创性标记 | 开头包含 `original composition` / `original song` |
| 未指定演唱声线 | 歌词演唱模式必须描述声线特征 |
| 歌词用散文长句 | 短句为主，一行一意象，可唱性强 |
| 歌词缺乏段落标记 | 使用 `[Verse]` `[Chorus]` `[Bridge]` `[Outro]` 等标记 |
| 器乐模式未标注 `instrumental` | 纯器乐 Prompt 必须包含 `instrumental`、`no lyrics` |
| 生成了不想要的人声 | 加强约束：`wordless vocal textures only` 或 `instrumental only` |
| 专辑情绪单一化 | 执行情绪光谱审查（见 references/creation-rules.md） |
| 专辑曲式同质化 | 按情绪从曲式变体菜单选差异化骨架（BGM 可豁免） |
| 歌词中用括号舞台指令 | 删除括号指令；`[ ]` 用于制作指令 |
| 缺少时长声明导致生成过短 | 标签式平台加时长声明；自然语言式平台加时长锚句并按平台词量门校准 |
| `()` 中写声线指令无效 | `()` 内文字会被当歌词唱出；切换声线用 `[Female Vocal]` / `[Male Vocal]` 结构标签 |
| 企划修订按字段切分保留清单 | 按句子**功能**切分：参数句可保留；叙事句必须随歌词方向同步重写 |

---

## 快速参考：Prompt 构建顺序

### 模式 A：歌词演唱

1. **原创性声明** → `Original song with [vocal style]...`
2. **时长声明** → `Extended full-length piece approximately 4 minutes`
3. **演唱声线** → `deep commanding male vocals, imperial and melancholic`
4. **情绪定调** → `slow and deeply emotional...`
5. **乐器编配** → `ancient guqin with war drums and full orchestra...`
6. **技术参数** → `Moderate tempo around 72 BPM in E minor`
7. **结构要求** → `vocals enter commanding yet vulnerable, climactic passage...`

### 模式 B：器乐纯音乐

1. **原创性声明** → `Original instrumental composition...`
2. **时长声明** → `Extended full-length piece approximately 4 minutes`
3. **情绪定调** → `slow and deeply emotional...`
4. **乐器编配** → `Warm piano-led arrangement with lush string pads...`
5. **技术参数** → `Mellow slow tempo around 65 BPM in C minor...`
6. **结构要求** → `Immediate melodic hook within 5 seconds...`
7. **人声控制标记** → `Instrumental only, no lyrics.` 或 `Instrumental with wordless vocal pads only`

---

## 歌词创作：四维 craft 同参

写词时同时加载并融入（这是创作清单，不是写完再查）：

- `imagery-craft`（**画面**）：画面感公式 10 维度主动构建，重点 ⑥比拟 ⑦词性活用
- `story-craft`（**故事性/遐想**）：冰山原则 10 技法埋钩子，重点 ①冰山省略 ⑦钩子开头
- `whitespace-craft`（**留白起伏**）：写词时就构思副歌前静默/句尾消散/密疏布局
- `remix-craft`（**情感致敬/血肉**）：非 remix 场景也可用技法 3 借鉴现代歌情感、技法 4 真实议题调研

先过情绪可及及格线（2-3 个感官锚点），再用四维提升到优秀线。豪放/高声宣示型不适用冰山，见 `story-craft` 体裁边界。

### 洞见与金句（写作时可选）

- **洞见**：写词前定载体形态（陈述式一句可复述的话，或叙事承载式一段走完的路）；写完跑抽掉测试/转述测试/依附测试。
- **金句**：先选载体族、再造句；具象日常锚点 × 升维载体；峰值位置不必默认后置，定稿时二选一（递进式/首现式）。
- **选题锚点**：优先锚定听众经历过的关系/人生时刻，物件退为道具；关系槽位、唤醒度、可截句性三测试。
- **情理钻石**：每曲 ≥2 处情感/哲理亮点，跨段分布，剂量守「一点点，不能太多」。
- **浓度**：大词要被具体代价支付；先定形态（烈/静/暖/洞察）再选机制；每段 ≥1 泄漏动作、≥2 身体锚点。
- **开口设计**：V1 首句钩子级（禁铺垫句开场）；副歌首句可截句；前 30-35 秒有声音记忆点。

> 以上自检落链：`lyric-reviewer` 对应检查点；未实测的技法仍按「先方向后数值」使用。

---

## 完成后自动流程（工作流编排）

> 完成 Prompt 与歌词后，**自动按顺序**加载辅助 skill，无需等待用户手动触发。

### 跳过条件

- 曲目状态标注为「草稿」或「WIP」
- 用户明确说「只写 Prompt 不审查」「跳过审查」
- 纯探索/实验性质的 Prompt 生成（未指定专辑项目）

### 模式检测

- **模式 A**：曲目文件包含歌词段落（`[Verse]`、`[Chorus]` 等）→ 执行 Step 1→2→3
- **模式 B**：曲目文件标注 `instrumental`、`no lyrics` → 跳过 Step 1/2，直接 Step 3

### 自动流程（模式 A：歌词演唱）

```
Step 1: voice-checker
  → 检测歌词 AI 味；有标记项输出报告并标注「如有意为之可忽略」

Step 1.5: reality-check
  → 实物常识核查 + AI 调研候选溯源分级；🔴 硬错误改稿后重走本链

Step 2: lyric-reviewer
  → 16 点审查；自动修复可自动修项；报告 Critical/Warning

Step 2.5: 四维 craft 反向审查（软指南）
  → imagery-craft / story-craft / whitespace-craft 自检
  → remix-craft：情感致敬/血肉（非 remix 场景可选）
  → 标注薄弱维度，提优化建议（等用户决策）

Step 3: pre-generation-check
  → 运行生成前关卡；输出 ✅ READY 或 ❌ NOT READY
  → BLOCKING 项必须修复后才能生成
```

### 自动流程（模式 B：器乐纯音乐）

```
Step 3: pre-generation-check
  → 跳过歌词相关检查项（无歌词）
  → 额外检查：器乐情绪叙事三要素（主导乐器/演奏技法/和声色彩）
  → 额外检查：纯音乐命名独立（如存在歌词版对应）
  → 输出 ✅ READY 或 ❌ NOT READY
```

### 注意事项

- 用户在 Step 1/2 中要求修改歌词，修改后从 Step 1 重新开始
- pre-generation-check 返回 BLOCKING 时，告知具体阻塞项，修复后重跑
- 用户只需说「创作音乐」「写一首关于 XX 的歌」——流程自动推进

---

## 发行前交付物清单

> 生成完成 → 发行前，补齐两项交付物（软指南，不阻塞生成）。

### 1. 专辑介绍（平台发布位文案）

- **总述点题** → **逐首一行钩子**（数字/叙事场景 + 情绪一句话）→ **收尾共情句**
- 约 300-450 字，纯中文；专辑介绍文案可引用作品/艺人，交创作者自判
- 品牌词在公域简介里宜替换为通用词（「AI 对话框」「算法」「那首歌」）

### 2. 专辑封面 prompt（文生图提示词）

- ≤50 字（贴合平台输入框限制）
- 押该专辑已定的 imagery 词——从专辑索引/各曲目核心意象取
- 冷暖色调契合专辑情绪光谱：孤独/疏离偏冷，温暖/治愈偏暖
- **不出现人脸**：用场景符号（屏幕、气泡、光标、物件、光影）替代

### 产出时机

生成完成后、发行上线之前；两项写入专辑索引的新章节。

---

## 模式 B 技法指导：器乐纯音乐

### 核心原则

纯音乐没有歌词，情绪传递依赖**三个声音层面**：

| 层面 | 功能 | Prompt 中的体现 |
|------|------|----------------|
| **主导乐器** | 情绪代言人 | `piano-led` / `cello-led` / `guitar-led` |
| **演奏技法** | 情绪叙事手段 | `descends from high register` / `repeated with subtle variations` |
| **和声色彩** | 情绪底色 | `in C minor` / `Lydian mode` / `suspended chords` |

三者缺一不可。

### 情绪→乐器→技法映射表

| 情绪内核 | 主导乐器 | 演奏技法 | 调式建议 |
|---------|---------|---------|---------|
| 深情守望 | Harp / Warm piano | 反复变奏，不解决 | 悬浮和弦 |
| 骄傲崩塌 | Cello / French horn | 从高音区下行至中低区 | 弗里几亚 |
| 被困挣脱 | High piano / Crystalline strings | 密集→突然断裂→寂静 | 自然小调 |
| 温暖陪伴 | Acoustic guitar / Harp | 轻快拨弦，明亮 | 大调（唯一的大调场景） |
| 冷酷完美 | Oboe / Ambient piano | 单音穿透，不染尘埃 | 利底亚 |
| 遗忘与铭记 | Rhodes / Tenor sax | 温暖音色中偶现破碎片段 | 多利亚 |
| 空灵超脱 | Felt piano / Ambient synth | 极简音符，大空间 | 利底亚或悬浮和弦 |
| 暗涌蓄力 | Low strings / Bass piano | 低频持续垫，缓慢上升 | 弗里几亚或自然小调 |

### 结构技法（替代歌词段落标记）

| 结构功能 | 歌词模式标记 | 纯音乐替代写法 |
|---------|------------|--------------|
| 开场定调 | `[Verse]` | `opens with [instrument] stating the main theme` |
| 情绪推进 | `[Pre-Chorus]` | `building tension with [technique]` |
| 高潮/记忆点 | `[Chorus]` | `climactic passage where [instrument] reaches peak intensity` |
| 回落/反思 | `[Bridge]` | `stripped-back section, [instrument] alone with [technique]` |
| 收尾 | `[Outro]` | `fades with [instrument], [emotion] lingering` |

### 曲式变体菜单（防专辑结构同质化）

| 结构变体 | 适配情绪 | Prompt 结构描述写法 |
|---------|---------|--------------------|
| ① 起承转合再现式（默认） | 通用、叙事完整 | `states main theme … develops … returns to the theme … fades` |
| ② 渐变式无再现 | 旅程感、时间流逝 | `continuously evolving, each section flowing into the next without returning` |
| ③ ABA 拱形对称 | 出走与回归、对照 | `opens with theme A, contrasting middle B, returns to A transformed` |
| ④ 持续渐强单段 | 蓄力、爆发、积累 | `single continuous arc, building from sparse to climax then resolving` |
| ⑤ 对话交替式 | 互动、两件乐器问答 | `two instruments alternating lead in call-and-response throughout` |
| ⑥ 主题消解/静态冥想式 | 归寂、空灵、助眠 | `minimal evolving drone, theme gradually dissolving into ambient texture` |

### 常见错误（模式 B 专属）

| 错误 | 修正 |
|------|------|
| 只写乐器名不写技法 | 加演奏技法描述（如 `descends`、`repeated with variations`） |
| 用歌词段落标记 | 纯音乐用自然语言描述结构变化 |
| 忘记写人声控制标记 | 必须写 `Instrumental only, no vocals` 或明确无词人声类型 |
| 乐器堆砌太多 | 一首一个主导乐器 + 2-3 个配角 |
| 情绪全靠形容词堆 | 情绪来自乐器音色 + 演奏方式 |
| 纯音乐曲名与歌词版有关联 | 命名独立，不复用歌词版曲名元素 |

---

## 与其他 skill 的关系

| 关系 | 分工 |
|------|------|
| `music-trends-report` | 上游：定类型方向 |
| `music-dna-extraction` | 上游：提取标杆 DNA |
| `orchestration-craft` | 配器维度深化（本 skill 写 Style 时调用） |
| `voice-checker` / `reality-check` / `lyric-reviewer` | 写词后的检查链 |
| `imagery-craft` / `story-craft` / `whitespace-craft` | 写词时的四维 craft |
| `pre-generation-check` | 生成前最后一道门 |
| `audio-mastering` | 生成后母带（平台允许替换音频时） |
