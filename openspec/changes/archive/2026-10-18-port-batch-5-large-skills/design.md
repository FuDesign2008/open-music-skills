## Context

- 源工程 2 个大件：`suno-workflow` 530 行 + 31 条内部规则（另 1040 行规则手册）/ `music-trends-report` 270 行 + 4 个 references（988 行）。
- 目标：核心方法论留正文（<500 行），细则移 references；规则编号去号留义；平台专属字段中立化。
- 执行规范已在 `docs/porting-plan.md` §十 冻结。

## Goals / Non-Goals

**Goals:**
- 2 个 skill 以公开自包含形态落地，方法论本体不动
- 每个 skill 通过 skill-creator 流程并留痕
- 四命令全绿；正文 <500 行；references 随行并脱敏

**Non-Goals:**
- 不逐字迁移 1040 行内部规则手册（提炼为 references/creation-rules.md）
- 不保留私有报告模板、私有曲目/批次与运营数据
- 不为跨 skill 引用补建桩

## Decisions

### D1. 脱敏改写：编号去号留义，私有资产去名

- 内部规则编号一律改写为规则本身的表述；私有路径/曲目/专辑/批次 ID/运营数值删除或通用化。
- 平台专属术语改「按目标平台配置」；平台名只作示例。

### D2. 大件拆分：核心留正文，细则进 references

- `music-creation-workflow`：正文保留模式 A/B、12 条核心规则、检查链、交付物、模式 B 技法；细则（情绪光谱/曲式光谱/声线光谱/洞见/钻石/浓度等）进 `references/creation-rules.md`。
- `music-trends-report`：正文保留 5 阶段与关键口径；分析框架/数据源/报告模板/Style 配方进 4 个 references。
- 理由：平台加载器与上下文预算；progressive disclosure。

### D3. 评测深度：representative cases

- `music-creation-workflow` 2 个（模式 A/B）；`music-trends-report` 1 个（完整 5 阶段）。不做 baseline；断言限定契约完整性。

### D4. 平台中立与双载体

- 标签式（英文标签，≤平台字符上限）与自然语言式（中文短指令）双载体；平台差异按目标平台配置。

### D5. 四字段与命名

- `name` = 目录名；`version` 0.1.0；`user-invocable: true`；description 只放触发路由四要素，≤1024 码点。
- `suno-workflow` 按命名约定改名为 `music-creation-workflow`。

## Risks / Trade-offs

- **[1040 行规则手册无法逐条迁移]** → 提炼为 12 条核心规则 + references；未覆盖的细则按需后续补。
- **[趋势数据源会失效]** → references 标注可用性复核策略；采集失败不臆填。
- **[跨 skill 引用悬空]** → proposal 声明；后续批次收口。
- **[评测裁剪]** → 留痕声明。

## Review Record

**Stage 4/7 双轴审查（2026-10-18，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **首轮预提交审查**：发现 4 Important + 5 Minor —— 反向边界循环（creation/trends 互相指向）、`prompt_track` 私有命名残留、趋势「硬门控」自相矛盾、超限精简行为未落地；报告节数/YAML 措辞/设计规则手册引用/四维 craft 落链不一致。
- **修复**：creation 反向边界改为「趋势/选型调研用 trends」；文件模板改通用命名；趋势前置检查统一为「缺失即终止」；补超限精简与骨架句保留；报告模板统一 9 节；YAML 禁令明确；design 改称「规则手册」；Step 2.5 补 remix-craft 可选自检。
- **复验**：四命令 + `openspec validate --strict` 全绿。
- **总体：✅ PASS**（修复后无 blocking）。
