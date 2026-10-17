# Skill 移植评估与路线图（源工程 → open-music-skills）

> 评估日期：2026-10-17
> 源：源工程 `.claude/skills/`（45 个 skill，逐一核对；含 1 个评测工作区不计入）
> 目标：本仓库 `skills/<name>/SKILL.md`（公开自包含版）
> 用途：移植批次的决策依据与执行清单，可直接拆为 goal-driven 队列任务卡

## 一、结论摘要

- 45 个源 skill 分档：**P0 直接移植 8 个** · **P1 小改移植 8 个** · **P2 改造移植 13 个** · **P3 缓移植 13 个** · **不移植 2 个**；`xiaoyao-craft` 已完成移植（v0.5.0，本仓库首个样板）。
- 最高价值低风险资产 = **craft 族（写词/编曲/审美）+ 通用审查（AI 味/发音/合规/常识）**——自包含、无平台依赖，与目标仓库「创作生产」定位完全吻合，建议作为首批。
- 最大单件 = `suno-workflow`（530 行，超出正文 500 行建议），需拆分 `references/` 后最后处理。
- 平台自动化类（妙响 / 汽水 / Suno / 抖音）可移植，但必须先做敏感信息审查（见 §十一）。
- **批次之间必须串行**：每个 skill 变更都会触碰 `docs/generated/skills-index.md`，并发批次会冲突（与既有队列 triage 的模块非重叠原则一致）。

## 二、评估标准

| 维度 | 判定问题 |
| --- | --- |
| 自包含性 | 脱离源工程私有目录、账号、数据后能否独立运行？ |
| 领域通用性 | 对「任意 AI 音乐创作者 / 发行者」是否成立，而非仅对源账号成立？ |
| 敏感信息成本 | 是否含私有运营数据、平台内部接口、账号操作细节、内部规则编号？（见 §十一） |
| 体量与结构 | 正文 < 500 行；超出拆 `references/`；有 `evals/` 的随行迁移 |
| 定位匹配 | 目标仓库四类：创作生产 / 发布分发 / 运营增长 / 工具链技术 |

### 命名约定（2026-10-17 定，源工程的 skill 命名铁律）

- **依赖前缀 `ego-`**：运行时依赖 `ego-browser` 的 skill **必须保留 `ego-` 前缀**（前缀即依赖声明）；不依赖者不得使用该前缀。受此约束的目标名：`ego-multi-ai-research` / `ego-zhihu-inspiration` / `ego-emotion-radar` / `ego-miaoxiang-create` / `ego-qishui-release` / `ego-qishui-stats`。
- **不得锁定单一平台**：方法论跨平台复用时取中性名 —— `suno-workflow` → **`music-creation-workflow`**。
- **其余改名**：仅当语义更准确且不违反上述两条时才改。

优先级定义：

- **P0 直接移植**：自包含、无平台依赖，改造仅限去掉源工程示例引用
- **P1 小改移植**：方法论自包含，但需清除内部规则编号与私有实证引用
- **P2 改造移植**：依赖外部运行时（ego-browser）或含私有数据 / 平台内部接口，需重写部分内容
- **P3 缓移植**：已停用历史线或价值重叠，等明确使用需求再处理
- **不移植**：无独立价值或已被覆盖

## 三、总览表（45 项）

| # | 源 skill | 规模 | 目标分类 | 判断 | 建议目标名 | 关键改造点 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | imagery-craft | 260 行 | 创作生产 | P0 | imagery-craft | 去源工程示例引用；金句词法学习档案改为可选扩展阅读 |
| 2 | story-craft | 225 行 | 创作生产 | P0 | story-craft | 去源工程示例；冰山原则本体不动 |
| 3 | whitespace-craft | 199 行 | 创作生产 | P0 | whitespace-craft | 去内部模板版本号与工程案例 |
| 4 | voice-checker | 274 行 | 创作生产 | P0 | voice-checker | 去内部词法档案引用；检测项保留 |
| 5 | pronunciation-check | 266 行 | 创作生产 | P0 | pronunciation-check | 去内部批次引用；三级处理表保留 |
| 6 | explicit-checker | 179 行 | 创作生产 | P0 | explicit-checker | 平台名单改为通用表述 |
| 7 | reality-check | 73 行 + evals | 创作生产 | P0 | reality-check | 私有案例改为通用示例 |
| 8 | audio-mastering | 334 行 + scripts | 工具链技术 | P0 | audio-mastering | 去 Suno 平台专属语境；ffmpeg 配方保留 |
| 9 | lyric-reviewer | 335 行 | 创作生产 | P1 | lyric-reviewer | 内部规则编号全部改为规则表述；私有实证去名 |
| 10 | music-dna-extraction | 164 行 + references | 创作生产 | P1 | music-dna-extraction | 去内部平台配方引用；7 维框架保留 |
| 11 | songyun-craft | 98 行 + evals | 创作生产 | P1 | songyun-craft | 去内部美学手册路径引用 |
| 12 | sweet-craft | 147 行 + evals | 创作生产 | P1 | sweet-craft | 私有数据实证改为脱敏结论 |
| 13 | orchestration-craft | 312 行 + evals + references | 创作生产 | P1 | orchestration-craft | 去内部响应度数据来源；层组方法保留 |
| 14 | remix-craft | 90 行 | 创作生产 | P1 | remix-craft | 去内部批次编号与实证引用 |
| 15 | youtube-audio-extract | 173 行 | 工具链技术 | P1 | youtube-audio-extract | 去内部工具链路径；yt-dlp 配方保留 |
| 16 | logic-audit | 222 行 | 工具链技术 | P1 | album-logic-audit | 泛化「专辑文件结构」假设为可配置 |
| 17 | suno-workflow | 530 行 | 创作生产 | P2 | music-creation-workflow | 拆 references/；规则编号去号留义；平台专属字段标注适用平台（名字不锁单一平台） |
| 18 | music-trends-report | 270 行 + references | 运营增长 | P2 | music-trends-report | 去内部报告模板与私有数据 |
| 19 | hit-pattern-craft | 153 行 | 运营增长 | P2 | hit-pattern-craft | 私有平台数据实证改为脱敏方法论 |
| 20 | pre-generation-check | 265 行 | 创作生产 | P2 | pre-generation-check | 大量内部规则引用需重写为通用检查清单 |
| 21 | launch-strategy | 142 行 + references | 发布分发 | P2 | launch-strategy | 剔除已停用推广线；去私有投放数据 |
| 22 | ego-multi-ai-collab | 181 行 + evals | 运营增长 | P2 | ego-multi-ai-research | 去私有选题流程；通用「统一问题组」保留 |
| 23 | ego-zhihu-inspiration | 130 行 | 运营增长 | P2 | ego-zhihu-inspiration | 去私有版权纪律编号；采集配方保留 |
| 24 | ego-emotion-radar | 155 行 + scripts | 运营增长 | P2 | ego-emotion-radar | 去私有选题链引用；六源配方保留 |
| 25 | ego-miaoxiang-create | 190 行 | 发布分发 | P2 | ego-miaoxiang-create | 去私有词稿/专辑引用；平台配方保留 |
| 26 | ego-qishui-release | 367 行 + evals | 发布分发 | P2 | ego-qishui-release | 去账号细节与私有数据；验证码环节标注可选 |
| 27 | ego-qishui-stats | 153 行 + evals + scripts | 运营增长 | P2 | ego-qishui-stats | 去私有台账体系引用；采集方法保留 |
| 28 | astrill-control | 121 行 + scripts | 工具链技术 | P2 | astrill-control | 剥离源工程网络策略矩阵，保留控制与双探针 |
| 29 | sms-code-reader | 93 行 | 工具链技术 | P2 | sms-code-reader | 去发行流程绑定；通用验证码读取保留 |
| 30 | audio-distribute | 209 行 | 发布分发 | P3 | audio-distribute | 基于本地 wav 的历史工作流，妙响线不需要 |
| 31 | douyin-tuwen-promo | 197 行 + evals + references | 运营增长 | P3 | douyin-tuwen-promo | 已停用推广线；有需求再恢复 |
| 32 | ego-doubao-imagegen | 135 行 | 工具链技术 | P3 | doubao-imagegen | 已停用；「参考图先行」可泛化后移植 |
| 33 | ego-douyin-creator-export | 196 行 | 运营增长 | P3 | douyin-creator-export | 已停用；平台导出配方可复用 |
| 34 | ego-miaoxiang-activity | 42 行 | 发布分发 | P3 | miaoxiang-activity | 平台活动入口配方，需求驱动 |
| 35 | ego-miaoxiang-mv | 28 行 | 发布分发 | P3 | miaoxiang-mv | MV 流水线，付费墙与平台绑定 |
| 36 | ego-qishui-audience | 41 行 | 运营增长 | P3 | qishui-audience | 含平台内部接口，公开需人工审阅 |
| 37 | ego-qishui-quota | 79 行 + evals | 运营增长 | P3 | qishui-quota | 绑私有库存与发行节奏，泛化成本高 |
| 38 | ego-qishui-revenue | 124 行 | 运营增长 | P3 | qishui-revenue | 私有收入数据重，需彻底脱敏后才可评估 |
| 39 | ego-suno-generate | 120 行 | 发布分发 | P3 | suno-generate | 历史 / 休眠线；Suno 配方可复用 |
| 40 | ego-suno-library-export | 124 行 | 发布分发 | P3 | suno-library-export | 历史 / 休眠线 |
| 41 | ego-tianyin-create | 49 行 | 发布分发 | P3 | tianyin-create | 已停用历史线 |
| 42 | quote-cards-and-text-graphics | 105 行 + evals + references | 创作生产 | P3 | quote-cards-and-text-graphics | 外部引入且兄弟依赖缺失；需求驱动 |
| 43 | album-status-sync | 110 行 | 工具链技术 | 不移植 | — | 判据基于已废弃工作流；状态同步模式由目标仓库工程实践覆盖 |
| 44 | suno-series-workflow | 221 行 | 创作生产 | 不移植 | — | 历史 skill、零引用、与 suno-workflow 重叠 |
| 45 | xiaoyao-craft | 139 行 + evals | 创作生产 | 已移植 | xiaoyao-craft | v0.5.0 已在本仓库（首个移植样板） |

## 四、P0 首批（8 个）：直接移植

共同前提：正文均 < 500 行、无外部运行时依赖；移植时按 §十 执行规范走 `skill-creator` 流程。

| Skill | 移植要点 | 评测建议（≥3 cases） |
| --- | --- | --- |
| `imagery-craft` | 方文山画面感 10 维清单 + 金句载体选型是核心；删除对源工程私有词法档案的路径引用，改为「可选扩展阅读」。 | ① 抽象歌词 → 给出画面感改写；② 副歌金句写不出 → 走载体选型；③ 非歌词场景不应误触发。 |
| `story-craft` | 冰山原则 10 技法本体不动；删除私有专辑/曲目示例，换成公开可理解的示例。 | ① 平铺直叙歌词 → 埋叙事钩子；② 已具故事性的文本 → 不应过度改写；③ 触发词边界（故事性/回味/流水账）。 |
| `whitespace-craft` | 留白 =「人声缺席时段」的定义与三档模板保留；删除内部模板版本号与工程案例，模板参数改为「按平台实测调整」的通用表述。 | ① 「歌词太密」反馈 → 给出留白方案；② 用户只要纯器乐 → 与器乐创作场景区分；③ 非音乐场景不误触发。 |
| `voice-checker` | 六类 AI 写作模式检测项完整保留；删除内部词法档案引用与工程实证，改为通用说明。 | ① 成语堆砌文本 → 逐项标记；② 无 AI 味文本 → 不误报；③ 输出仅为建议、不强制修改。 |
| `pronunciation-check` | 多音字 / 低频单音字 / 阿拉伯数字三类风险与三级处理表保留；删除内部批次引用；生成层替换 + 发行层还原的双层策略需写清。 | ① 「出差」类多音字命中；② 冷僻字命中；③ 数字「996」命中并给出改写；④ 普通文本不误报。 |
| `explicit-checker` | 显式内容扫描表保留；平台名从源工程平台清单改为「按目标分发平台配置」；删除内部合规前置流程引用。 | ① 命中显式词 → 分级；② 擦边词 → 正确分级；③ 干净文本 → 通过。 |
| `reality-check` | 三问法（计量单位 / 使用动作链 / 保存时限）+ 幻觉诱捕清单 + 溯源分级保留；私有案例（糖葫芦类）改为公开通用示例。evals 随行迁移并核对与正文一致性（参考 `xiaoyao-craft` 先例：评测期望值曾与正文第一性原则矛盾）。 | ① 含实物物件的歌词 → 三问核查；② 单源 AI 调研候选 → C 级禁入稿；③ 无误物件 → 快速通过。 |
| `audio-mastering` | ffmpeg 配方（EQ + lowpass + loudnorm）与流媒体响度目标保留；删除 Suno 平台专属语境，改为「任意 AI 生成音频的母带验收」。scripts/ 随行。 | ① 未处理 wav → 给出命令链；② 已达标文件 → 判定通过；③ 缺 ffmpeg → 安装指引。 |

## 五、P1（8 个）：小改移植

核心工作是**清除内部规则编号与私有实证引用**，方法论不动。

| Skill | 移植要点 |
| --- | --- |
| `lyric-reviewer` | 16 点审查框架（韵脚/节奏/结构/视角/可及性/升华/金句承重/峰值位置/洞见/单色/情理亮点/选题锚点/浓度检验等）完整保留；所有「内部规则编号」改为规则本身的表述；Critical/Warning 分级保留；私有曲目实证去名。 |
| `music-dna-extraction` | 7 维 DNA 框架与双载体（自然语言式 / 标签式）配方保留；删除内部平台与专辑引用；references/ 随行。 |
| `songyun-craft` | 宋韵「简淡韵常」审美机制与六组技法保留；删除内部美学手册路径；evals 随行。 |
| `sweet-craft` | 物件化甜感写法与三层链路保留；私有 A/B 数据改为脱敏后的结论表述（不出现具体曲名与播放数）；evals 随行。 |
| `orchestration-craft` | 六层织体与乐器三层选用保留；删除内部「响应度数据」来源与私有专辑实证；1000 字符预算段需标注为特定平台尺度；references/ 与 evals 随行。 |
| `remix-craft` | 公版过审范式与做减法方法论保留；删除内部批次编号与实证引用；与平台审核规则相关的表述改为「以平台当前规则为准」。 |
| `youtube-audio-extract` | yt-dlp + deno + 浏览器登录态的提取配方保留；删除内部工具链路径与私有用途描述。 |
| `logic-audit` | 叙事逻辑 / 元数据一致性 / 跨文件矛盾 / 索引同步四类检查保留；把「专辑文件结构」假设泛化为可配置模板。 |

## 六、P2（13 个）：改造移植

共同特点：依赖外部运行时、含私有数据或平台内部接口，需重写部分内容。**移植前须过 §十一 敏感信息审查。**

| Skill | 类型 | 移植要点 |
| --- | --- | --- |
| `suno-workflow` | 创作方法论主链 | 530 行需拆分：核心方法论留正文，细则移 `references/`；内部规则编号去号留义；平台专属字段标注适用平台；这是全库最大资产，放最后做。**目标名 `music-creation-workflow`**（方法论跨平台，名字不锁 Suno）。 |
| `music-trends-report` | 趋势调研 | 跨源榜单分析方法保留；删除内部报告模板、私有数据与工程路径；references/ 重组为公开可用的分析框架。 |
| `hit-pattern-craft` | 爆款模式 | 流量路径定位（UGC 钩子曲 vs 推荐池氛围曲）+ 性状库 + 数据反馈循环保留；私有平台数据（进池率、播放差等）只保留方法论结论，不出现具体数值与曲名；内部发行纪律改为通用建议。 |
| `pre-generation-check` | 生成前关卡 | 11 道关卡重写为通用检查清单；内部规则引用全部改为检查项本身；与目标平台无关的门（如诗词原句占比）应删除或标注适用条件。 |
| `launch-strategy` | 上线策略 | 冷启动 / 曲名截流 / 变现路径框架保留；剔除已停用的抖音内容推广线；私有投放数据与专辑案例去名；references/ 重组。 |
| `ego-multi-ai-collab` | 多 AI 调研 | 「统一问题组 + 三分区报告（共识/分歧/独有）+ 溯源留痕」保留；删除私有选题流程与内部规则编号引用；依赖 ego-browser 需在正文声明；目标名 `ego-multi-ai-research`（前缀保留，见源工程命名铁律）。 |
| `ego-zhihu-inspiration` | 灵感采集 | 三入口配方（热榜/搜索批量/问题详情）+ 成色判据 + 溯源分级保留；私有版权纪律改为通用版权说明；依赖 ego-browser 声明。 |
| `ego-emotion-radar` | 情绪雷达 | 六源榜单采集与「情绪母题表」保留；删除私有选题链引用；scripts/ 随行；目标名保持 `ego-emotion-radar`（前缀保留）。 |
| `ego-miaoxiang-create` | 妙响生成 | 平台公开操作配方（注入、确认卡、音色选择、时长攻关、发行入口）保留；删除私有词稿/专辑/批次引用；目标名保持 `ego-miaoxiang-create`（前缀保留）。 |
| `ego-qishui-release` | 汽水发行 | 三步向导自动化配方保留；删除账号细节、私有专辑数据与内部台账引用；验证码环节标注为可选依赖（`sms-code-reader`）；evals 随行；目标名保持 `ego-qishui-release`（前缀保留）。 |
| `ego-qishui-stats` | 数据采集 | 数据中心采集与「CSV + 截图证据 + 批次笔记」三件套保留；删除私有台账与收入口径分析中的账号数据；目标名保持 `ego-qishui-stats`（前缀保留）。 |
| `astrill-control` | 工具链 | 三命令 + 双探针 + macOS 辅助功能依赖保留；剥离源工程「发布/生成网络策略矩阵」（私有流程）；scripts/ 随行。 |
| `sms-code-reader` | 工具链 | chat.db 直读配方保留；删除发行流程绑定，改为「自动化流程中的验证码读取」通用件；注明完全磁盘访问与 iPhone-Mac 同步前置。 |

## 七、P3（13 个）：缓移植

已停用 / 历史线 / 依赖过重，等明确需求再评估：

| Skill | 缓移植原因 |
| --- | --- |
| `audio-distribute` | 基于本地 wav 文件的历史分发整理；妙响线音频直通发行，不再产生本地文件。 |
| `douyin-tuwen-promo` | 抖音内容侧图文推广线已停用；方法论有复用价值，但当前无使用场景。 |
| `ego-doubao-imagegen` | 已停用；「参考图先行」工作流可泛化为通用生图 skill 后再移植。 |
| `ego-douyin-creator-export` | 已停用；平台数据导出配方可复用。 |
| `ego-miaoxiang-activity` | 平台活动入口配方，需求驱动。 |
| `ego-miaoxiang-mv` | MV 流水线，含付费墙与平台阶段限制。 |
| `ego-qishui-audience` | 含平台内部接口与画像数据，公开前需人工审阅（见 §十一）。 |
| `ego-qishui-quota` | 绑私有库存体系与每日发行节奏，泛化成本高。 |
| `ego-qishui-revenue` | 私有收入数据与结算细节密集，需彻底脱敏并人工审阅。 |
| `ego-suno-generate` | 历史 / 休眠线；Suno 配方可复用，待明确需求。 |
| `ego-suno-library-export` | 历史 / 休眠线。 |
| `ego-tianyin-create` | 已停用历史线。 |
| `quote-cards-and-text-graphics` | 外部引入且依赖的兄弟 skill 不在本仓库；需求驱动。 |

## 八、不移植（2 个）

- `album-status-sync`：判据基于已废弃的本地文件工作流，「状态台账同步」模式由目标仓库自身工程实践覆盖。
- `suno-series-workflow`：历史 skill、现役零引用，与 `suno-workflow` 重叠。

## 九、批次计划与拆卡建议

**原则**：所有 skill 变更都会触碰 `docs/generated/skills-index.md`（索引）与版本发布链路，**批次间必须串行**；同一批次内的多个 skill 合并为一张卡、按顺序实现，避免索引文件并发冲突。

| 批次 | 内容 | 数量 | 说明 |
| --- | --- | --- | --- |
| 1 | imagery-craft / story-craft / whitespace-craft / voice-checker | 4 | 纯写词与审查，零外部依赖，风险最低 |
| 2 | pronunciation-check / explicit-checker / reality-check / audio-mastering | 4 | 审查 + 工具链；`reality-check` 携 evals |
| 3 | lyric-reviewer / music-dna-extraction / songyun-craft / sweet-craft | 4 | 核心审查与 craft；清除内部编号为主 |
| 4 | orchestration-craft / remix-craft / youtube-audio-extract / logic-audit | 4 | craft + 工具链收尾 |
| 5 | suno-workflow（拆分）/ music-trends-report（拆分） | 2 | 大件，单独批次，允许更长预算 |
| 6 | hit-pattern-craft / pre-generation-check / launch-strategy | 3 | 需重写与脱敏，人工审阅数据表述 |
| 7 | ego-multi-ai-collab / ego-zhihu-inspiration / ego-emotion-radar | 3 | 调研线，依赖 ego-browser |
| 8 | ego-qishui-release / ego-qishui-stats / ego-miaoxiang-create / astrill-control / sms-code-reader | 5 | 平台自动化线，先过敏感信息审查 |
| — | P3 清单 | 13 | 按需求单独立项，每项先评估 |

每张卡建议字段（与既有队列约定一致）：目标（本批次 skill 清单）、Modules（`skills/<name>/` + `docs/generated/` + 索引）、预算、验收命令；`Stage-exit policy` 按团队惯例。

## 十、每卡执行规范（硬门）

1. **必读**：本仓库 `AGENTS.md` + 目标 skill 对应源文件全文（含 `references/`、`evals/`、`scripts/`）。
2. **走 `skill-creator` 流程**：起草 → test cases → 评测 → 迭代；无该工具时按等效流程执行，**不得跳过评测**。评测留痕可放 `skills/<name>-workspace/`（gitignored，不提交）。
3. **frontmatter 四字段**：`name`（= 目录名，kebab-case）/ `version`（从 `0.1.0` 起）/ `user-invocable: true` / `description`（≤ 1024 码点，软目标 950；只放触发路由四要素：做什么 / 何时用 / 触发词 / 反向边界）。
4. **体量**：正文 < 500 行；超限拆 `references/`，正文给按需指引。
5. **脱敏改写**（三查）：
   - 内部规则编号 → 规则本身的表述（**不得保留任何编号形式**）
   - 源工程私有路径 / 工作区名 → 通用描述或删除
   - 私有运营数据（收入、播放、受众画像、进池率等）→ 删除具体数值；只保留方法论结论
   - 私有曲名 / 专辑名 / 团队内部代号 → 去名或换公开示例
6. **依赖声明**：依赖浏览器运行时（ego-browser）、macOS 权限、ffmpeg、yt-dlp 等，必须在正文前置声明安装与授权前提。
7. **验收四命令**（缺一不可）：
   ```bash
   npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md
   npm run lint:skill-description
   npm run lint:deid
   npm test
   ```
8. **交付**：feature 分支 → PR；不在仓库内提交 `skills/*-workspace/`、`.omc/`、`.goal-driven/`。

## 十一、敏感信息与人工审阅清单

移植前逐项过，命中即需人工拍板：

- [ ] **私有运营数据**：收入、结算、播放量、听众画像、进池率等具体数值——一律删除或只保留「方法 / 结论」层
- [ ] **平台内部接口**：非公开 API 端点、内部参数、未公开的字段结构——建议保留方法、不贴端点细节；是否公开由人工判断
- [ ] **账号信息**：账号 ID、cookie / token、后台截图路径、验证码流程细节——必须删除
- [ ] **私有组织信息**：内部规则编号、私有目录结构、团队代号、未公开的专辑/曲目规划——必须删除或改写
- [ ] **已停用业务线**：抖音内容推广、历史平台合作等——移植时标注「已停用 / 仅供参考」，或整体缓移植

## 十二、已知陷阱

- `.claude/skills/**` 是 openspec CLI 生成物，**不适用**本仓库 skill 契约；移植目标是 `skills/<name>/`，不要写错目录。
- `description` 超 1024 码点会被平台加载器报警；pre-commit 门禁硬失败。
- 脱敏门禁扫描范围含 `skills/`、`commands/`、`docs/`、`openspec/`；本文件也在扫描范围内，新增内容同样受约束。
- 索引文件禁止手改；提交时 pre-commit 会自动重生成并 `git add`。
- 不要在仓库内运行 `npx husky <任意参数>`（会把参数当 skill 目录名并破坏钩子路径）；查版本用 `node -p "require('husky/package.json').version"`。
- 批次并发会因索引文件重叠而冲突；坚持串行批次。

## 十三、建议的首个动作

按批次 1 开卡，先移植 4 个零依赖 skill；完成并验收后，再推进批次 2。`music-creation-workflow` 与平台自动化线留到最后，先积累移植经验与评测基线。
