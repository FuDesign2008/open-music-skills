## Context

- 源工程 4 个 skill 均为**纯文本方法论**（无运行时依赖、无 scripts/），逐一核对规模：`imagery-craft` 260 行 / `story-craft` 225 / `whitespace-craft` 199 / `voice-checker` 274 —— 全部 < 500 行，无需拆 `references/`。
- 它们共同构成写词的**四维创作模型**：画面（imagery）+ 故事（story）+ 留白（whitespace）+ AI 味检测（voice-checker）。四者互相引用，是本批一起移植的根本原因。
- 执行规范已在 `docs/porting-plan.md` §十 冻结（skill-creator 流程 / 四字段 / 脱敏三查 / 四命令验收）。
- 源工程这些 skill **均无 evals/** —— 评测用例需在移植时新写（不同于 `xiaoyao-craft` 那种随行迁移）。

## Goals / Non-Goals

**Goals:**
- 4 个 skill 以**公开自包含**形态落地，语义与源版一致（方法论本体不动）
- 每个 skill 通过 `skill-creator` 流程并留痕
- 四命令全绿；正文均 < 500 行

**Non-Goals:**
- 不追求评测的统计严谨（budget 限制；见 D4）
- 不移植源工程的私有调研资料与课程笔记资产（它们属于私有资料，不是 skill 本体）
- 不为跨 skill 引用补建桩（引用指向后续批次的目标名，悬空由 batch-2..8 收口）

## Decisions

### D1. 脱敏改写：编号去号留义，路径转「扩展阅读」

- **决策**：内部规则编号一律改写为规则本身的表述；私有资料路径删除或改为「扩展阅读」占位；私有批次号/曲目名/专辑名去名或换公开示例。
- **理由**：本仓库脱敏门禁的 denylist 精确匹配「规则编号 + 数字」与「私有目录前缀 + 路径段」——保留即被拦；且公开读者无上下文。
- **备选**：保留编号并扩大 denylist 白名单 → 否决（破坏门禁的可预测性）。

### D2. 跨 skill 引用指向最终目标名

- **决策**：保留跨 skill 引用，但使用**最终目标名**（`music-creation-workflow` / `lyric-reviewer` / `pre-generation-check` / `songyun-craft` / `ego-miaoxiang-create`），并在正文注明「同仓库 skill，见 skills/」。
- **理由**：四维创作模型的价值正在于互引；改成通用描述会丢失可操作性。这些 skill 会在后续批次落地（batch-3..8）。
- **风险处置**：本批验收**不要求**被引用 skill 已存在（proposal 已声明）；后续批次落地后引用自动生效。

### D3. 体量守门

- **决策**：每个 skill 正文目标 ≤ 400 行（源版均在 200–280 行，脱敏改写通常**净减少**）；若改写后超 500 行，拆 `references/`。
- **备选**：不设限 → 否决（AGENTS.md 契约）。

### D4. 评测深度：每 skill 1 个 test case + 定性检查（裁剪）

- **决策**：本卡预算 ≤120min / 4 个 skill。评测按 skill-creator 流程但**裁剪深度**：每 skill 1 个 representative test case（不做 baseline 对照），断言限定为**可程序化检查的显式契约**（如 imagery 的 10 维度是否全部出现、voice-checker 的 11 类是否齐全、story 的 10 技法是否齐全、whitespace 的 ≥60% 标准是否出现）。
- **理由**：这些 skill 的产出是**创意文本**，美学上限无法机器评分；可验证的是「契约完整性」（清单是否齐全、分级是否正确、禁忌是否声明）。这与 `xiaoyao-craft` 的裁剪口径一致。
- **裁剪须声明**：留痕里写明「未做 baseline 对照、未做描述触发优化」。

### D5. 四字段与命名

- **决策**：`name` = 目录名（kebab-case，与源同名，不涉及本批改名）；`version` 从 `0.1.0` 起；`user-invocable: true`；`description` 保留源版的触发词与反向边界，但**压缩到 ≤1024 码点**（源版 imagery-craft 描述较长，需核）且**去内部引用**。

## Risks / Trade-offs

- **[跨 skill 引用悬空]** → proposal 显式声明；后续批次收口；本批验收不检查被引用 skill 存在性。
- **[脱敏漏网]** → 四命令中的 `lint:deid` 全量扫描兜底（含 `openspec/`）；提交前再跑一次。
- **[description 超 1024]** → `lint:skill-description` 硬失败兜底；源版 imagery-craft 描述含大量触发词，可能需要压缩。
- **[评测裁剪导致质量下限未验证]** → 在留痕中声明裁剪范围；断言聚焦「契约完整性」而非美学质量。
- **[4 个 skill 一次交付导致索引多次重生成]** → 每写完一个 skill 就跑一次索引；最终统一验收（不影响正确性）。

## Review Record

**Stage 4 双轴审查（2026-10-17）** · Reversibility：two-way door（纯新增）→ standard 深度

- **Standards 轴**：`solution-review` 9 维 —— Effectiveness ✅（4 skill 覆盖四维创作模型）；Side-effects ✅（零运行时依赖，不触碰既有 skill）；Feasibility ✅（源版均 <500 行，无 scripts）；Reversibility two-way door；FMEA 最高风险 = description 超限 / 脱敏漏网，均有门禁兜底；Operability ✅（CI 兜底）；Cost-value ✅（~2h 换 4 个基础 skill）；Team cognitive fit ✅。
- **Spec 轴**：4 个 capability 的 requirement/scenario 与本方案一致；`openspec validate` 已通过 ✅。
- **总体：✅ PASS**（无 blocking）。

## Open Questions

- 无。评测深度裁剪已在 D4 冻结并声明。
