# 乐器池完整词典（orchestration-craft references）

> **用途**：写 Style 选乐器时的完整速查——民族池 + 跨界池，含标签式写法、响应度分层与推荐用法。
> **口径**：响应度三层判定（A 已实测 / B 写法先例 / C 零先例），定义见 SKILL.md 第五节。分层随项目实测更新，不把当前分层当永恒真理。
> **平台注记**：本表「标签式写法」为英文标签载体；自然语言式平台按需转译为中文短指令，字符预算纪律见 SKILL.md §六 适配注记。选件与分层方法论各平台通用。

---

## 一、民族池

| 乐器 | 标签式写法 | 响应度 | 推荐用法 |
|---|---|---|---|
| 古筝 | `guzheng` | **A** | 实测全勤主奏；任何谱系主奏层首选 |
| 竹笛 | `bamboo flute` / `dizi` | **A** | 次主奏；戏腔曲常配；高频层 |
| 弦乐群 | `lush strings` | **A** | 头部曲常用铺底；升级对象是织体密度不是换掉 |
| 二胡 | `erhu` | **A** | 「痛」的代言；悲曲主奏；须弦乐托底 |
| 琵琶（tremolo） | `pipa tremolo` | **A** | 戏腔 pre-chorus 蓄力件 |
| 琵琶（旋律） | `pipa` | **B** | 与 A 层主奏同句绑定；华彩句 `pipa cascading runs` |
| 太鼓 | `soft taiko` / `taiko build` | **A** | 合唱曲配方成员；节奏层 |
| 轻手鼓 | `soft hand drums` | **A** | 婉约甜点区节奏层 |
| 三角铁系 | `crotales shimmering` | **A** | 「月光/泪光」高频闪烁层；色彩点缀 |
| 音乐盒件 | `glockenspiel` / `celesta` | **A** | 童声曲配方成员；婉约色彩层 |
| 古琴 | `guqin` | **A 数据 + 红灯** | 不上主打；仅慢曲托底且须 erhu/strings 陪 |
| 战鼓 | `war drums` | **B** | 豪放节奏层加重；与 taiko 同句绑定 |
| 马林巴 | `marimba` | **B** | 色彩层候选 |
| 竖琴 | `harp` + `glissandos`/`arpeggios` | **B** | 婉约铺底层 |
| 扬琴 | `yangqin` / `Chinese hammered dulcimer` | **未实测** | 豪放节奏层候选（C 层实验通道） |
| 箜篌 | `konghou` | **未实测** | 风险：可能被忽略或滑向 harp；用 `ancient Chinese harp` 引导 |
| 中阮 | `zhongruan` | **未实测** | 弹拨中音填空位候选 |
| 笙 | `sheng`（建议 `sheng organ`） | **未实测** | 和声铺底候选；`sheng` 单写有英文歧义风险 |
| 唢呐 | `suona` | **未实测** | 音量侵略性强：**婉约禁用**；豪放放间奏不放副歌人声下 |
| 箫 | `vertical bamboo flute`（慎用 `xiao flute`） | **未实测** | 更慢更暗的竹笛变体 |
| 编钟 | `bianzhong` / `ancient bronze bells` | **未实测** | 色彩层单发点缀 |
| 云锣 | `yunluo` / `cloud gongs` | **未实测** | 色彩层 |
| 排鼓 | `paigu drums` | **未实测** | 节奏层 |
| 大鼓 | `Chinese bass drum` | **未实测** | 低音层民乐化替代 |

## 二、跨界池

| 乐器 | 标签式写法 | 响应度 | 推荐用法 |
|---|---|---|---|
| 大提琴 | `cello` | **B** | 低音层首选；`warm cello underneath`（V1 即进最大杠杆） |
| 合成器铺底 | `subtle synth pad` | **A** | 流行融合件；戏腔/融合向 |
| 流行节奏组 | `light pop drums` | **A** | 融合向节奏层 |
| 低音提琴 | `double bass` | **未实测** | 豪放低音层；≤62 BPM 慢曲禁双低音 |
| 弦乐合奏 | `string ensemble` | **B** | 铺底层 |
| 木管组 | `woodwinds` | **未实测** | 婉约副旋律候选；慎与 Orchestral Cloud 拖拽 |
| 圆号 | `French horn` | **未实测** | 豪放副歌远军阵感候选 |
| 定音鼓 | `timpani` | **未实测** | Orchestral Cloud 成员，谨慎 |
| 拨弦弦乐 | `pizzicato strings` | **未实测** | 与 Orchestral Cloud 关联，配民乐主奏锚定 |
| 现代节奏组 | `modern rhythm section` | **未实测** | 融合向候选 |

---

## 三、C 层实验清单（首夜单变量实测通道）

若试点专辑选用以下件，须：单首 Style 内 ≤2 件 + 首夜 1-2 首校准样本 + 逐件单变量（同骨架只动这一件）：

- **民族池**：`yangqin` / `konghou` / `zhongruan` / `sheng organ` / `suona` / `vertical bamboo flute` / `bianzhong` / `yunluo` / `paigu drums` / `Chinese bass drum`
- **跨界池**：`double bass` / `woodwinds` / `French horn` / `timpani` / `pizzicato strings` / `modern rhythm section`

**B 层待响应验证清单**（已写过、响应未验证）：`pipa`（旋律用法）/ `war drums` / `marimba` / `harp` / `cello` / `string ensemble`

---

## 四、数据边界声明

- 响应度分层是**方法论**（先例分级），不是永恒规格；换赛道/新平台时按实测重新校准。
- B 层先例是「写法存在性」证据，非响应度证据——「已写入 Style」不等于「平台理解并响应」。
- 三谱系模板与升级版配方的响应度全部未实测——首夜试生成校准后再放量。
