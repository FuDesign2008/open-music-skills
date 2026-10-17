# 7 维 DNA 框架详解 + 双载体映射（标签式 / 自然语言式）

> **用途**：在 `music-dna-extraction` skill 的 Step 3-4 中，用于跨歌综合和 Style 配方生成——双载体：**标签式**（英文标签）／**自然语言式**（中文单段指令）。
> **示例**：治愈系 10 首标杆歌曲的真实提取（BPM/调式/乐器/歌词/制作全部来自 web-search agent 调研验证）。

---

## 维度 1：BPM 分布

### 提取方法

| 步骤 | 操作 |
|------|------|
| 数据源 | 吉他谱（guitarworld.com.cn / chord4.com）+ MIDI（midishow.com）+ SongBPM |
| 交叉验证 | 至少 2 个来源一致才确认 |
| 特殊处理 | 若 BPM > 100，检查是否为 half-time（如 123 BPM 可能感知为 ~61） |

### 综合方法

**不要取平均值**。画分布图：

```
示例（治愈系 10 首）：
60-63 BPM ████████████ 4 首 (40%)  ← 深夜叙事型
69-70 BPM ██████       2 首 (20%)  ← 回忆漫步型
77 BPM    ███          1 首 (10%)  ← 日常温暖型
84-85 BPM ██████       2 首 (20%)  ← 中速流行型
123(ht)   ███          1 首 (10%)  ← 史诗半速型
```

### 双载体映射（标签式 / 自然语言式）

| BPM 区间 | 标签式写法 | 自然语言式 | 情绪定位 |
|---------|-----------------|----------------------|---------|
| 60-65 | `slow tempo around 62 BPM` | 「慢板约 62 BPM」 | 深夜独白、极慢叙事 |
| 68-72 | `moderate slow tempo around 70 BPM` | 「中慢板约 70 BPM」 | 回忆漫步、行走速度 |
| 77-85 | `moderate tempo around 82 BPM` | 「中板约 82 BPM」 | 日常温暖、轻快治愈 |
| 120+ (half-time) | `moderate tempo around 120 BPM with half-time feel` | 「约 120 BPM，半速感」 | 弦乐史诗、叙事宏大 |

### 专辑 BPM 分配建议

按标杆分布比例分配到新专辑 8 首歌。例如治愈系标杆 40% 在 60-63 区间 → 新专辑 3-4 首用此区间。

---

## 维度 2：调式（Key）

### 提取方法

| 步骤 | 操作 |
|------|------|
| 数据源 | 吉他谱（标注原调 + Capo）+ 钢琴谱 + MIDI 文件 |
| 记录 | 原调（如 B♭ Major）、是否有转调、吉他 Capo 位置 |

### 综合方法

统计：
- 大调 vs 小调比例
- 具体出现的 Key 列表
- 是否有偏好 Key（如 B♭ 出现 2 次）

### 双载体映射（标签式 / 自然语言式）

| 调式 | 标签式写法 | 自然语言式 | 情绪效果 |
|------|-----------------|----------------------|---------|
| C Major | `in C major` | 「C 大调」 | 明亮、纯净、简单 |
| D Major | `in D major` | 「D 大调」 | 温暖、开放 |
| E Major | `in E major` | 「E 大调」 | 中正、温暖 |
| F# Major | `in F# major` | 「升F 大调」 | 柔和、梦幻 |
| A Major | `in A major` | 「A 大调」 | 明亮、自信 |
| B♭ Major | `in B-flat major` | 「降B 大调」 | 圆润、温暖（歌手友好） |

**DNA 法则**：治愈系 10/10 全部是大调。新专辑应 100% 大调，副歌可引入关系小调和弦制造「甜中带酸」。

---

## 维度 3：乐器编配

### 提取方法

| 步骤 | 操作 |
|------|------|
| 数据源 | 百度百科 Credits + 编曲分析文章 + MIDI 音轨列表 |
| 记录 | 每件乐器 + 演奏者 + 进入时序 + 编曲哲学 |

### 综合方法

统计每种乐器的**出现频率**（x/10 首出现）：

```
示例（治愈系 10 首）：
钢琴          ████████████████████ 8/10 (80%)  ← 核心
木吉他(指弹)   ██████████████████   7/10 (70%)  ← 核心
弦乐(pad/乐团) ████████████████     6/10 (60%)  ← 副歌铺底
口琴          ████████████         4/10 (40%)  ← 标志色彩
贝斯          ██████████████       5/10 (50%)  ← 低频支撑
轻鼓组        ██████████████       5/10 (50%)  ← 刷镲为主
```

### 双载体映射（标签式 / 自然语言式）

| 角色 | 乐器 | 标签式 | 自然语言式 |
|------|------|----------|----------------------|
| 主导（选 1） | 钢琴 | `felt piano lead` / `warm piano` | 温暖钢琴主奏 |
| 主导（选 1） | 木吉他 | `fingerpicked acoustic guitar lead` | 指弹木吉他主奏 |
| 色彩（选 1） | 口琴 | `harmonica solo, nostalgic` | 口琴点缀，怀旧感 |
| 色彩（选 1） | 口哨 | `whistle melody` | 口哨旋律 |
| 色彩（选 1） | 长笛 | `flute accents` | 长笛点缀 |
| 色彩（选 1） | 手风琴 | `accordion, retro warmth` | 手风琴点缀，复古暖意 |
| 色彩（选 1） | 大提琴 | `cello solo` | 大提琴独奏 |
| 色彩（选 1） | Rhodes | `Rhodes electric piano, warm pad` | 电钢暖垫铺底 |
| 铺底 | 弦乐 | `light string pad` / `lush strings` | 弦乐轻铺底 / 弦乐满铺 |
| 低频 | 贝斯 | `fingerstyle bass, melodic` | 指弹贝斯，旋律化 |
| 节奏（可选） | 轻鼓 | `light brushes, soft drum kit` | 轻刷鼓点 |

**DNA 法则**：每首歌选 1 个主导 + 1 个色彩 + 弦乐铺底。绝不堆砌。

---

## 维度 4：曲式结构

### 提取方法

从 LRC 时间戳歌词 + 编曲分析文章中提取段落划分。

### 综合方法

| 结构类型 | 占比 | 特征 |
|---------|------|------|
| 标准 Verse-Chorus-Bridge | ~60% | 主歌-副歌-桥段-副歌 |
| 叙事自由体 | ~30% | 无标准副歌，按故事章节划分 |
| 双声线对话式 | ~10% | 两个声线交替（如向云端） |

### 双载体映射（标签式 / 自然语言式）

在 Style Prompt 的结构描述段落中体现：

```
# 标准结构
states main theme on piano, develops through verse and chorus,
stripped-back bridge with solo instrument, returns to full
arrangement in final chorus, fades with piano hook

# 叙事自由体
continuously evolving narrative structure, each section flowing
into the next, folk ballad form with recurring melodic motif
```

> **自然语言式**：同一结构信息写成中文结构句——「主歌低音区叙事像自言自语，预副歌稍微流动，副歌只放开六分靠情绪浓度推进，桥段留最大空气只留吉他与气声，最后一遍副歌加一层和声再温柔收尾」类写法（写法实例见 项目内各 track 的 Style 段）。

**DNA 法则**：前奏 ≤15 秒。Hook 在前 5-8 秒。Bridge = 乐器抽离。Outro = 渐弱回归单一乐器。

---

## 维度 5：歌词意象

### 提取方法

| 步骤 | 操作 |
|------|------|
| 找歌词 | 搜索「歌曲名 歌词」，从 LRC 或歌词网站获取 |
| 分析（不复制） | 提取意象词、主题、押韵、句长、金句 |

### 综合方法

**合并所有歌曲的意象词**，按主题分类统计词频：

```
示例（治愈系意象词频）：
远方思念：路/车窗/云/风/回家/夕阳/火车/城市灯火  ← 最高频
日常诗意：阳光/早饭/风铃/便利店/衣服味道/出租屋
自我接纳：平凡/像我这样/不完美/没关系/普通
时间记忆：小时候/从前/那些年/时空/圆圈/记忆
陪伴承诺：风雪/平淡/荣华/目光/余生/一起
```

### 歌词创作指导（不是标签，是创作方向）

| 法则 | 说明 |
|------|------|
| 具体感官词 | 每首 12-15 个（视觉+听觉+味觉+触觉+嗅觉） |
| 短句为主 | 5-10 字/行，副歌可 10-12 字 |
| 1 句金句 | 副歌核心，可被短视频切片传播 |
| 散韵 > 工整 | 口语化自由韵脚比 AABB 更真实 |
| 具象替代抽象 | 「乌梅子酱」替代「甜蜜」，「南墙」替代「执着」 |

---

## 维度 6：制作工艺

### 提取方法

从百度百科 Credits + 制作人访谈 + 乐评文章中提取。

### 综合方法

统计共性制作特征：

| 特征 | 出现率 | 标签式 | 自然语言式 |
|------|--------|----------|----------------------|
| 温暖模拟音色 | 10/10 | `warm tape saturation, analog-tone production` | 温暖模拟质感 |
| 干净分离度 | 8/10 | `clear instrument separation, modern clean production` | 干净分离度、现代清爽制作 |
| 轻混响 | 10/10 | `light hall reverb (1.2-1.8s), intimate space` | 轻混响、近场空间感 |
| 电台级打磨 | 10/10 | `radio-ready polished production` | radio-ready |
| 人声靠前 | 10/10 | `vocal-forward mix, close-miked` | 人声靠前、贴近感 |

### 标签式组合（直接复制到 Style Prompt 末尾）

```
warm tape saturation, analog-tone production, clear instrument
separation, light hall reverb, radio-ready polished production,
vocal-forward mix, intimate space, warm and clean
```

> **自然语言式**：不打标签块——上述要素化入单段 Style 指令的自然语言句（如「温暖模拟质感，轻混响，人声靠前，radio-ready」）。

---

## 维度 7：情绪有效性

### 提取方法

搜索「歌曲名 乐评」「歌曲名 为什么好听」「歌曲名 分析」，从乐评人文章和听众评论中提取。

### 综合方法

归纳出该类型的**治愈机制**（为什么听众被治愈）：

```
示例（治愈系 6 大治愈机制）：
1. 温暖近场人声 = 私语般的亲密感
2. 具体日常意象 = 听众看到自己的生活
3. 大调+慢速 = 生理性降低心率
4. 减法编曲 = 不被乐器干扰，专注情绪
5. 金句共鸣 = 一句话击中内心
6. 反内卷姿态 = 给高压社会提供情绪出口
```

### 应用

这些治愈机制**不直接写入生成提示词**，而是作为**歌词创作和编曲决策的指导原则**。例如：
- 如果治愈机制是「具体日常意象」，歌词就必须写具体场景而非抽象情感
- 如果治愈机制是「减法编曲」，Prompt 中就要避开 heavy drums / distorted guitar

---

## 完整 标签式 Prompt 词典模板

将维度 1-6 的 标签式合并，形成可直接复用的标签块：

> **自然语言式对应**：不以标签块组织——按 Step 4 双输出转写为**单段中文 Style 指令**（流派/声线/BPM/调式/乐器/结构/时长锚句），按目标平台的 Style 配方规范转写。下方为 标签式载体形态。

```
# === BPM ===
[根据分配表填入]

# === 调式 ===
in [Key] major

# === 人声 ===
warm male vocal, conversational delivery, clear diction,
close-miked, intimate, breathy in chorus, vulnerable

# === 乐器 ===
[主导乐器] lead, [色彩乐器] accents, light string pad,
fingerstyle bass, [可选: light brushes / finger snaps]

# === 结构 ===
immediate melodic hook within 5 seconds, no long intro,
slow build through verse, warm strings enter in chorus,
stripped-back bridge with solo instrument,
return to full arrangement in final chorus, fade outro

# === 制作 ===
warm tape saturation, analog-tone production,
clear instrument separation, light hall reverb,
radio-ready polished production, vocal-forward mix
```
