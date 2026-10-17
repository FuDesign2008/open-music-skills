---
name: orchestration-craft
version: "0.1.0"
user-invocable: true
description: Use when 创作或优化 AI 音乐 Style（配器/编曲维度）时，想让配器丰满有层次、「繁花似锦」——先判谱系（豪放/婉约/叙事），再铺六层织体（低音/节奏/铺底/主奏/色彩/对位），乐器按响应度分层选用，并把配器扩展段嵌入平台字符预算。即使用户没说「配器」，只要写或改 Style，或提到配器、乐器、编曲、织体、丰满、层次感、乐器单一、编曲单薄、太薄、没层次、加乐器、对位、副旋律、call-and-response、countermelody，就应主动使用。触发词包括配器、编曲、织体、丰满、层次、繁花似锦、乐器单一、编曲单薄、配器升级、乐器池、层组、对位、副旋律、call-and-response、countermelody、orchestration。反向边界：人声缺席/器乐占比走 whitespace-craft；歌词画面/故事走 imagery-craft/story-craft；只做配器设计，不替代整体 Prompt 工程。
---

# 按谱系配器·织体丰满术（orchestration-craft）

> **定位**：写 Style（配器维度）时主动使用的创作 craft——判谱系、铺六层织体、按响应度选乐器、控字符预算，让配器「繁花似锦」而不堆砌。是 `music-creation-workflow`（整体 Prompt 工程）与 `whitespace-craft`（人声占比维度）之外的配器维度：**乐器池与织体丰满度**。
> **依据**：配器方法论（三谱系模板 + 乐器池响应度分层 + 层次编配技法）+ 实测校准；具体数据随赛道 DNA 更新。

---

## 一、核心心法：丰满 = 织体密度，不是乐器数量

听众反馈「层次不够繁花似锦」时，第一反应不该是「再加乐器」，而是先诊断织体。**问题往往不在「有没有弦乐」，在织体密度**：低音层缺位、对位层缺位、层间无进出设计。升级路径是**加声部与层间关系**，不是从零引入新乐器。

### 六层织体架构（配器的完整地图）

| 层 | 职能 | 典型乐器（按谱系换件） | 缺位症状 |
|---|---|---|---|
| **低音层** | 地基、叙事落定 | cello / double bass / taiko 鼓腔 | 「飘」「单薄」——**最大杠杆层** |
| **节奏层** | 脉冲、推进 | hand drums / taiko / war drums | 「平」「没有走向」 |
| **和声铺底层** | 幅面、氛围 | strings / harp / sheng | 「干」「小家子气」 |
| **主奏层** | 旋律主心骨 | guzheng / pipa / dizi / erhu | 「没记忆点」 |
| **色彩点缀层** | 闪光、转场 | crotales / celesta / gong | 「闷」「段落无转折」 |
| **对位层** | 情绪对话 | 副旋律、call-and-response 应答 | 「织体平」「只有一条线」 |

### 写 Style 前的三个诊断问题

1. **低音层 V1 就进了吗？**——单薄→丰满的第一杠杆。一句 `warm cello underneath from the first verse` 就能改变整首的「落地感」。
2. **全曲有几段 ≥3 层同响？**——副歌必须 ≥3 层（写法见第四节技法 6）；全程 ≤2 层的编曲无论乐器多好听感都薄。
3. **各层有「进入时机」设计吗？**——层与段落无进出关系 = 等于没分层（平台会把 Style 里的乐器从头铺到尾）。每层要绑定进入/撤出的段落（V1 弱进 / pre-chorus 渐强 / 副歌全编制 / bridge 撤层）。

### 织体为情感服务

每层进入时机与情感弧对齐：低音层进 = 叙事落定，对位层进 = 情绪对话，全编制 = 情感顶点，bridge 撤层 = 呼吸（与 `whitespace-craft` 的呼吸感设计互补）。配器丰满是手段，情感冲击是目的——概念服务于情感，载体束缚情感时调整载体。

---

## 二、第一步：判谱系（配器的总开关）

写 Style 配器段之前先判谱系——谱系决定乐器池重心、编制大小与进出节奏。谱系名源于宋词传统（豪放/婉约），但**气质三分通用**：任何题材按「壮阔激烈 / 细腻婉转 / 叙事递进」三选一进入对应模板。

| 谱系 | 作品气质 | 配器策略 |
|---|---|---|
| **豪放** | 金戈铁马、家国、壮阔、大悲大怆 | **民族管弦全编制**：五组全上，分层进出，副歌全编制 |
| **婉约** | 儿女情长、婉转、细腻、私密 | **民乐核心 + 跨界铺底**：主奏前置，织体丰满但不压人声 |
| **叙事** | 群像、故事线、层层推进 | **多层递进**：按段落累加，bridge 撤层，终章全编制 |

判谱系三个依据（按优先级）：
1. **词牌/题材气质**（壮阔→豪放；细腻→婉约；长卷叙事→叙事）
2. **专辑情感轴定位**
3. **声线形态**（合唱曲天然适配豪放/叙事的全编制；intimate 独唱适配婉约的克制铺底）

一首歌通常**主谱系 + 局部借层**：婉约曲的 bridge 可以借叙事谱系的撤层设计，叙事曲的副歌可以借豪放的全编制爆发。谱系是默认骨架，不是牢笼。

---

## 三、三谱系配器模板

### 3.1 豪放谱系：民族管弦全编制

**一句话定义**：弹拨组 + 吹管组 + 拉弦群 + 打击组 + 跨界低音五组全上，分层进出，副歌全编制。

| 层 | 乐器组 | 标签式写法 | 进入时机 |
|---|---|---|---|
| 低音层 | 大提琴（+ 低音提琴为 C 层候选） | `deep cello foundation` | Intro 即进，全曲常驻 |
| 节奏层 | 太鼓 + 战鼓 | `taiko and war drums pulse` | V2 起，副歌加重 |
| 和声铺底层 | 弦乐群 + 竖琴 | `lush strings and harp clusters` | V1 弱进，pre-chorus 渐强 |
| 主奏层 | 古筝 + 琵琶 + 竹笛 | `guzheng and pipa trade the melody with soaring dizi above` | 全曲主心骨 |
| 色彩点缀层 | 锣 + crotales | `crotales shimmering, distant gong swells` | 段落转折处单发 |
| 对位层 | 竹笛 ↔ 二胡应答 | `dizi and erhu answer each other in call-and-response` | 副歌与间奏专用 |

**升级手法**：在已验证配方上**只加低音与对位，不换主奏**——已验证的主奏组合是实测背书，动它等于重新赌博：

```
deep cello foundation,
guzheng and bamboo flute open softly, strings and soft taiko build,
dizi and erhu answer each other in call-and-response,
full mixed choir enters in the chorus, crotales shimmering, distant gong swell.
```

⚠️ **Orchestral Cloud 警告**：豪放谱系**禁写裸 `orchestral`**——平台的缠绕簇（orchestral/epic/cinematic/dramatic/piano）会把民族编制拖向 cinematic piano 味。民族编制必须**逐组点名乐器**锚定；`full Chinese orchestra` 这类总称写法未实测，优先逐组罗列。

### 3.2 婉约谱系：民乐核心 + 跨界铺底

**一句话定义**：guzheng/erhu 民乐主心骨 + cello/string ensemble/harp 跨界铺底，织体丰满但主奏前置、人声不压。

| 层 | 乐器组 | 标签式写法 | 进入时机 |
|---|---|---|---|
| 低音层 | 大提琴（慢曲单件） | `warm cello underneath` | **V1 即进**——婉约谱系「单薄→丰满」的最大杠杆 |
| 低音层（快曲变体） | 大提琴 + 低音提琴 | `cello and double bass underpinning with warmth` | 甜点区 64-76 BPM 可用双低音 |
| 节奏层 | 轻手鼓或无鼓 | `soft hand drums, light touch` | 慢区无鼓；甜点区轻手鼓 |
| 和声铺底层 | 弦乐群 + 竖琴 | `lush strings and harp arpeggios` | V1 弱进，chorus 满铺 |
| 主奏层 | 古筝 + 二胡 | `guzheng leads with erhu answering phrases` | 全曲主心骨 |
| 色彩点缀层 | 钢片琴 + crotales | `celesta sparkles, crotales shimmering` | 副歌点彩 |
| 对位层 | 弱对位 | `strings carry a soft countermelody under the vocal` | **只给 chorus**，verse 留白 |

```
warm cello underneath from the first verse,
guzheng and erhu lead with sparse aching notes,
lush strings and harp arpeggios aching in the chorus, no drums in verse,
final chorus returns quiet and unresolved.
```

（悲情婉约曲保留 `final chorus returns quiet and unresolved` 不解决收束——收束句式与形态匹配，见红线。）

### 3.3 叙事谱系：多层递进

**一句话定义**：配器按段落累加——双件开场 → 逐段加层 → 副歌全编制 → bridge 撤层 → 终章全编制 + 华彩。

**递进设计表**（以 10 段 4min 曲为基线，按实际段落伸缩）：

| 段落 | 层配置 | 写法示例 |
|---|---|---|
| Intro | 主奏双件 | `guzheng and dizi open softly` |
| V1 | +低音层 | `cello joins underneath` |
| V2 | +节奏层 | `soft hand drums enter` |
| Pre-chorus | +和声铺底蓄力 | `strings and soft taiko build` |
| Chorus | 全编制 | `full arrangement blooms, gong swell` |
| Interlude | 主奏对答华彩 | `pipa cascading runs answer the dizi` |
| Bridge | **撤到双件** | `stripped back to guzheng and erhu` |
| Final chorus | 全编制 + 对位 | `full arrangement returns, dizi and erhu call-and-response above the choir` |
| Outro | 回双件消散 | `outro fades with dizi and guzheng` |

**叙事谱系的灵魂是「加层—撤层」的往返**：只有累加没有撤层，听感会「越推越满直到糊」；bridge 撤层既给呼吸（`whitespace-craft` 维度），也让终章全编制的回归有落差可打。

---

## 四、层次编配技法（六种）

| # | 技法 | 标签式写法 | 部署纪律 |
|---|---|---|---|
| 1 | **countermelody（对位副旋律）** | `strings carry a soft countermelody under the vocal` | **只给 chorus，verse 不给**——对位层全曲常驻会稀释主奏与人声清晰度 |
| 2 | **call-and-response（乐句应答）** | `dizi and erhu answer each other in call-and-response` | 常用层次技法；变体：人声↔器乐应答；`[Call and Response]` 是合法结构 tag |
| 3 | **频段分层** | 低频 cello/double bass/taiko 鼓腔；中频 guzheng/pipa/人声；高频 crotales/celesta/dizi 高音区 | 由 `clear instrument separation` 制作句兜底频段不打架 |
| 4 | **动态递进** | `strings and soft taiko build` | verse 稀 → chorus 满的累积设计；叙事谱系递进表是它的体系化 |
| 5 | **间奏华彩** | `pipa cascading runs answer the dizi` | 放 Interlude，给主奏乐器炫技位——「繁花」的高光时刻 |
| 6 | **副歌 ≥3 层写法** | `full arrangement blooms: choir, taiko and gong swell, dizi and erhu call-and-response above the choir` | 触发词 `blooms` / `swells` / `layered` / `full arrangement` / `everything joins in`；**单句点名乐器 ≤3-4 件**，更多写进层组句 |

**countermelody 与 call-and-response 的选择**：想「织体内对话感」（两乐器互相接话）用 call-and-response；想「人声下面有另一条唱歌的线」用 countermelody。后者先例少、响应未充分验证，首用建议放单变量实验位。

---

## 五、乐器池：响应度三层选用

**响应度三层判定口径**（通用方法论，任何工程可复制——先例分级，防止把「写过」当「有效」）：

| 层 | 定义 | 使用纪律 |
|---|---|---|
| **A 已实测验证** | 有实测证据支持（听感/数据/多源交叉） | **可直接复用**，放心进主奏/关键层 |
| **B 写法先例** | 已写过的写法，但**不构成**平台响应度证据——「已写入 Style」≠「平台理解并响应」 | 可用，但写法谨慎：优先与 A 层乐器绑定出现，不单独扛关键层 |
| **C 零先例** | 零命中 | **一律「未实测」**：首夜单变量实测，且单首 Style 内 ≤2 件 |

**A 层速查**（完整词典见 `references/instrument-pool.md`）：

- 主奏：`guzheng`（实测全勤主奏）/ `bamboo flute`·`dizi` / `erhu`
- 铺底：`lush strings`（头部曲标配，升级对象是织体密度不是换掉它）
- 节奏：`soft taiko` / `soft hand drums`
- 色彩：`crotales shimmering` / `glockenspiel`·`celesta`
- 戏腔件：`pipa tremolo`
- 跨界：`subtle synth pad` / `light pop drums`
- ⚠️ `guqin`：数据上是 A 层但带红灯——实测多见于低收/垫底组，不上主打位，仅慢曲托底

**B 层代表**：`cello` / `string ensemble` / `harp` / `pipa`（旋律用法）/ `war drums` / `marimba`。
**C 层代表**：`double bass` / `yangqin` / `konghou` / `zhongruan` / `sheng` / `suona` / `xiao flute` / `bianzhong` / `woodwinds` / `French horn` / `timpani` 等（完整清单与推荐写法见 references）。

**选件三步**：① 主奏层从 A 层选（已验证组合优先）；② 低音/铺底/色彩层从 A/B 层配（B 层件与 A 层乐器同句绑定）；③ 想加 C 层新乐器？先问「这个音色是否无可替代」——是，则进首夜单变量实验；否，用 A/B 层等价件。

---

## 六、字符预算分配（加配器不减骨架）

> **平台适配注记**：下表的 1000 字符预算 = **标签式平台尺度**。自然语言式平台的 Style 为短指令（实测常见 100-207 字符），预算表不适用；**织体分层写法仍可用**，但须按平台长度习惯压缩（扩展上限待实测，勿照搬 240-380 字符配器段）。「骨架句优先、声线句最先」原则各平台通用。

配器丰满的最大工程约束是 Style 的字符上限。原则：**骨架句逐字保留，配器扩展段在剩余预算内做丰满**——砍骨架换配器是本末倒置（骨架是实测验证句，配器是升级项）。

| 模块 | 建议字符区间 | 说明 |
|---|---|---|
| 声线句（形态引擎） | 60-100 | 合唱/童声反差/戏腔描述；**实测第一决定因素，最先写** |
| 结构句（全勤） | ~92 | `Immediate melodic hook within 5 seconds, vocal enters within first 4-5 seconds, no long intro.` 逐字保留 |
| 制作句（全勤） | ~121 | `Warm analog-tone production, light hall reverb on vocal(s), radio-ready polished production, clear instrument separation.` 逐字保留 |
| BPM + 调式句 | 25-45 | 甜点区优先（示例 64-76） |
| **配器扩展段** | **240-380** | 五句式层组结构（见下） |
| Negative（可选） | 0-40 | `--no heavy drums` 等，2-4 项内 |
| **合计** | **≤1000** | 留 ≥15% 余量防溢出 |

**配器扩展段五句式**（总计 240-380 字符，顺序即重要度）：

1. 低音层句（40-60）：`deep cello and double bass foundation`
2. 主奏层句（50-80）：`guzheng and pipa trade the melody with soaring dizi above`
3. 铺底 + 递进句（60-100）：`lush strings and soft taiko build in the pre-chorus`
4. 层次技法句（50-80）：`dizi and erhu answer each other in call-and-response`
5. 色彩句（可选，40-60）：`crotales shimmering, distant gong swells`

**完整示例**（婉约曲，Python len() 实算约 446 字符）：

```
Female vocal, intimate and clear. Deep cello and double bass foundation, guzheng leads with erhu answering phrases, lush strings and harp arpeggios swell in the chorus, soft hand drums light touch, celesta sparkles. D minor pentatonic, 66 BPM. Warm analog-tone production, light hall reverb, radio-ready polished production, clear instrument separation. Immediate melodic hook within 5 seconds, vocal enters within 4 seconds, no long intro.
```

注意这个示例的句序：声线 → 低音层 → 主奏 → 铺底 → 节奏 → 色彩 → 调式 BPM → 制作句 → 结构句。**关键层放开头结尾**（prompt fatigue：越靠后指令权重越稀释）。

---

## 七、红线清单（配器升级不得触碰）

### 7.1 写法纪律（三条）

1. **自然句优于标签堆砌**：平台对 narrative 自然句的响应优于孤立标签串——`dizi and erhu answer each other` 好于 `dizi, erhu, call-and-response`。
2. **密度甜点**：每段落 2-3 个 instrument cue，Style 总描述符保持 4-7 组——超密度会触发 prompt fatigue，稀释全部指令。
3. **标点语义**：句点 = 概念边界；`and` / `with` 连接 = 必要元素；关键层放开头结尾。

### 7.2 兼容红线（不得为配器牺牲的既有验证）

1. **形态引擎优先于配器**：声线形态是实测第一决定因素——配器升级不得替换或稀释形态引擎（合唱 / 童声反差 / 普世烟火锚点）。配器段永远排在声线句之后。
2. **warm 制作句逐字保留**：cold / hollow / desolate / bleak 禁用（频谱实测与零收入强相关）。要冷感用「疏配器 + aching + warm 词」实现。
3. **全勤结构句保留**：hook 5 秒内 + 人声 4-5 秒内 + no long intro。
4. **收束句式与形态匹配**：合唱曲 `final chorus vast and accepting`；悲曲 `final chorus returns quiet and unresolved`。
5. **BPM 不为编制让路**：全编制不等于要提速——甜点区内做丰满（想提速需单变量实测）。

### 7.3 本 skill 新增红灯

1. **裸 `orchestral` 禁用于民族编制**（Orchestral Cloud 拖向 cinematic piano 味）；跨界池的 orchestral 系成员（timpani / pizzicato strings / woodwinds）须配民乐主奏锚定。
2. **`suona` 禁入婉约谱系**（音量侵略性盖人声）；豪放谱系若用，放间奏不放副歌人声下。
3. **双低音（cello + double bass）禁入 ≤62 BPM 慢曲**（压人声）；慢曲用单件 `warm cello underneath`。
4. **单首 Style 内「未实测」（C 层）乐器 ≤2 件**——多变量同轮不归因；新乐器须首夜单变量验证。

### 7.4 「繁花似锦 ≠ 乐器堆砌」平衡原则

1. **主奏清晰优先**：`clear instrument separation` 保留；单句点名乐器 ≤3-4 件；主奏句永远放配器段首位。
2. **织体为情感服务**：每层进入时机对齐情感弧（见第一节）。
3. **加层不加噪**：配器段写成 3-5 个「层组句」，句点分隔；不逐件罗列 15 件乐器——堆砌触发 prompt fatigue，反而稀释全部指令，听感糊成一团。
4. **试点验证路径**：每谱系首夜最多试生成 1-2 首校准样本，人听过确认平台对新层组句的响应后再放量。

---

## 八、创作工作流（写 Style 时走一遍）

```
1. 判谱系：题材气质 → 豪放 / 婉约 / 叙事（+ 局部借层设计）
2. 查乐器池：references/instrument-pool.md——主奏从 A 层选，
   低音/铺底/色彩从 A/B 层配，C 层件 ≤2 且列实验清单
3. 铺六层织体：按谱系模板填「层 × 写法 × 进入时机」表
4. 选层次技法：对位（只给 chorus）/ 应答 / 华彩 / 副歌 ≥3 层写法
5. 排预算：骨架句逐字保留 + 配器扩展段五句式（240-380）
   → Python len() 实算 ≤1000，留 ≥15% 余量
   （自然语言式平台：上两行不适用——Style 为短指令；
     织体分层写法压缩进短句，扩展上限待实测）
6. 过红线：7.1-7.4 全清单（特别自查：裸 orchestral？C 层超 2 件？
   双低音入慢曲？主奏句在首位？）
7. 标注未实测件：迭代记录或曲目文件注明「C 层实验件：XX——首夜单变量验证」
```

与既有流程的衔接：本 skill 介入 `music-creation-workflow` 写 Style 环节；`music-dna-extraction` 的维度 3（乐器编配）是本 skill 乐器池的证据来源——赛道 DNA 更新时乐器池响应度分层应随之更新。

---

## 九、与其他 skill 的关系

| 关系 | 分工 |
|---|---|
| `music-creation-workflow` | 整体 Prompt 工程（结构/声线/硬规则审查）；本 skill 管其中的配器维度深化 |
| `whitespace-craft` | 管人声缺席/器乐占比维度；本 skill 管乐器选择与织体密度。bridge 撤层是两者交叠点 |
| `imagery-craft` / `story-craft` | 歌词维度 craft（画面/故事）；本 skill 是 Style 维度 craft，创作中常组合 |
| `music-dna-extraction` | 维度 3 输出是本 skill 乐器池证据源；换赛道先提 DNA 再用本 skill |
| `pre-generation-check` | 生成前关卡；本 skill 的红线自查（7.1-7.4）是其配器维度的前置输入 |

---

## 十、本 skill 纪律

1. **写 Style 时主动使用为主**——配器设计在写 Style 阶段就融入（判谱系→铺层→控预算），不是写完再补丁式加乐器。
2. **方法论通用，数据引用标口径**——「A 已实测 / B 写法先例 / C 零先例」是先例分级方法论，任何工程可复制；具体乐器分层随赛道 DNA 更新而更新，不把当前分层当永恒真理。
3. **尊重骨架**——配器升级只加层不换主奏、只扩不减骨架句；动已验证配方前先自问有没有等价实测证据。
4. **新增乐器走实验通道**——C 层件永远标注、永远单变量、永远首夜限量；实验结果回写乐器池（胜出进 B/A 层，失败记录不重复）。
