## Context

- 源工程 4 个 skill：`lyric-reviewer` 335 行 / `music-dna-extraction` 164 行 + 2 个 references / `songyun-craft` 98 行 + evals / `sweet-craft` 147 行 + evals。全部正文 <500 行。
- 它们覆盖「核心歌词审查 + 三条 craft 线」：审查、标杆 DNA、宋韵审美、甜感美学。
- 执行规范已在 `docs/porting-plan.md` §十 冻结（skill-creator 流程 / 四字段 / 脱敏三查 / 四命令验收）。
- `songyun-craft` 与 `sweet-craft` 源版自带 evals；`lyric-reviewer` / `music-dna-extraction` 需新写。

## Goals / Non-Goals

**Goals:**
- 4 个 skill 以**公开自包含**形态落地，方法论本体不动
- 每个 skill 通过 `skill-creator` 流程并留痕
- 四命令全绿；正文均 <500 行；references/evals 随行并脱敏

**Non-Goals:**
- 不追求评测的统计严谨（budget 限制；见 D3）
- 不移植源工程的私有词法/美学手册、私有运营数据与具体排行榜
- 不为跨 skill 引用补建桩（引用指向后续批次的目标名）

## Decisions

### D1. 脱敏改写：编号去号留义，私有资产去名/脱敏

- **决策**：内部规则编号一律改写为规则本身的表述；私有路径改为通用描述或「自建扩展阅读」；私有曲目/专辑/批次 ID 去名；精确运营数值（播放、点赞、受众比例）删除，只保留方向性结论与打包归因纪律。
- **理由**：公开读者无内部上下文；本仓库脱敏门禁会拦截规则编号与私有目录前缀。
- **备选**：保留编号并扩大 denylist 白名单 → 否决（破坏门禁可预测性）。

### D2. 平台中立：标签式 / 自然语言式双载体，配置为准

- **决策**：`lyric-reviewer` 的长度项写成「目标平台上限 / 词量门」；`music-dna-extraction` 的 Style 双输出写成「标签式 / 自然语言式」；`songyun-craft` 与 `sweet-craft` 的平台术语改为「目标平台」。
- **理由**：skill 名不得锁定单一平台（AGENTS.md 命名约定）；方法论跨平台复用。
- **风险处置**：实测样本仍注明来源类型；读者按同样方法校准。

### D3. 评测深度：随行 evals + 新写 representative case

- **决策**：`lyric-reviewer` 新写 2 个 case；`music-dna-extraction` 新写 1 个；`songyun-craft` 随行 6 个 + 20 条触发检查；`sweet-craft` 随行 7 个并脱敏。不做 baseline 对照；断言限定为契约完整性。
- **理由**：审查/创作类 skill 的可验证项是「清单是否齐全、分级是否正确、禁忌是否声明」；美学上限无法机器评分。
- **裁剪须声明**：留痕里写明未做 baseline 与 description 触发优化（songyun 随行触发盲评除外）。

### D4. 随行资产：references / evals 原样迁移 + 脱敏

- **决策**：`music-dna-extraction/references/` 两个文件随行；`songyun-craft/evals/`、`sweet-craft/evals/` 随行。只改私有路径/平台名/精确数值，方法论结构不动。
- **理由**：references 与 evals 是 skill 的可操作核心；重写会引入回归风险。
- **验证**：JSON 可解析；references 与正文交叉引用一致。

### D5. 四字段与命名

- **决策**：`name` = 目录名；`version` 从 `0.1.0` 起；`user-invocable: true`；`description` 只放触发路由四要素，≤1024 码点。
- **理由**：AGENTS.md 硬规范；索引生成与平台加载器依赖。

## Risks / Trade-offs

- **[平台专属经验泛化后精度下降]** → 保留实测样本说明；方法（测量→目标→验证）平台无关。
- **[私有运营数据删除后论证变弱]** → 保留方向性结论与「打包归因」纪律；不保留具体数值。
- **[跨 skill 引用悬空]** → proposal 显式声明；后续批次收口。
- **[评测裁剪导致质量下限未验证]** → 留痕声明裁剪范围；断言聚焦契约完整性。

## Review Record

**Stage 4/7 双轴审查（2026-10-17，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **首轮预提交审查**：发现 2 Important + 5 Minor —— 甜歌停用线状态丢失、宋韵「全部未实测」被弱化、lyric-reviewer 第 17 点省略未说明、平台专有词残留、严重度 Blocker 与分级表不一致、DNA 小样本场景未显式落地、songyun eval 与正文组名不一致。
- **修复**：补「已停用」标注；恢复「全部技法未实测」；lyric-reviewer 加范围说明并把 Blocker 改为 Critical；平台词中立化；DNA 补「少于 8 首」停手；songyun eval 对齐组二。
- **复验**：四命令 + `openspec validate --strict` 全绿。
- **总体：✅ PASS**（修复后无 blocking）。
