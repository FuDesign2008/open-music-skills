## Context

- 源工程 4 个 skill：`orchestration-craft` 312 行 + 1 个 reference / `remix-craft` 90 / `youtube-audio-extract` 173 / `logic-audit` 222。全部正文 <500 行。
- 它们覆盖「配器 + remix + 参考音频 + 专辑逻辑」：配器维度补齐 Style 三维分工，remix 补公版改编，youtube 补参考素材上游，logic-audit 补修改后的一致性保障。
- 执行规范已在 `docs/porting-plan.md` §十 冻结（skill-creator 流程 / 四字段 / 脱敏三查 / 四命令验收）。

## Goals / Non-Goals

**Goals:**
- 4 个 skill 以**公开自包含**形态落地，方法论本体不动
- 每个 skill 通过 `skill-creator` 流程并留痕
- 四命令全绿；正文均 <500 行；references 随行并脱敏

**Non-Goals:**
- 不追求评测的统计严谨（budget 限制；见 D3）
- 不移植源工程的私有响应度数据、收入数据与具体曲目
- 不为跨 skill 引用补建桩（引用指向后续批次的目标名）

## Decisions

### D1. 脱敏改写：编号去号留义，私有数据去数值

- **决策**：内部规则编号一律改写为规则本身的表述；私有路径改为通用描述；私有曲目/专辑/批次 ID 去名；精确运营数值（收入、先例计数、播放/点赞、受众比例）删除，只保留方向性结论与方法论。
- **理由**：公开读者无内部上下文；本仓库脱敏门禁会拦截规则编号与私有目录前缀。

### D2. 平台中立：标签式 / 自然语言式，规则以目标平台为准

- **决策**：`orchestration-craft` 的写法列标为「标签式写法」，字符预算注明为标签式平台尺度；`remix-craft` 的版权过滤与审核改为「以目标平台当前规则为准」；`youtube-audio-extract` 与 `logic-audit` 的平台专属检查改为可配置规则。
- **理由**：skill 名不得锁定单一平台（AGENTS.md 命名约定）；方法论跨平台复用。

### D3. 评测深度：随行 evals + 新写 representative case

- **决策**：`orchestration-craft` 随行 10 个 case；`remix-craft` / `youtube-audio-extract` / `logic-audit` 各新写 1 个。不做 baseline 对照；断言限定为契约完整性。
- **理由**：审查/创作/工具类 skill 的可验证项是「清单是否齐全、分级是否正确、禁忌是否声明」。

### D4. 随行资产：references 原样迁移 + 去私有统计

- **决策**：`orchestration-craft/references/instrument-pool.md` 随行；去私有响应度数据、曲目引用与平台专属「字符成本」列，乐器分层与推荐用法保留。
- **理由**：references 是选件与分层的可操作核心；重写会引入回归风险。

### D5. 四字段与命名

- **决策**：`name` = 目录名；`version` 从 `0.1.0` 起；`user-invocable: true`；`description` 只放触发路由四要素，≤1024 码点。

## Risks / Trade-offs

- **[平台专属经验泛化后精度下降]** → 保留实测样本说明；方法（测量→目标→验证）平台无关。
- **[私有响应度数据删除后论证变弱]** → 保留 A/B/C 先例分级方法论与方向性结论。
- **[跨 skill 引用悬空]** → proposal 显式声明；后续批次收口。
- **[评测裁剪导致质量下限未验证]** → 留痕声明裁剪范围；断言聚焦契约完整性。

## Review Record

**Stage 4/7 双轴审查（2026-10-17，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **首轮预提交审查**：发现 3 Important + 7 Minor —— youtube 未声明 ffmpeg 前置；logic-audit 纯器乐边界过宽、残留私有 Track 示例、检查命令变量未定义；orchestration 豪放模板使用 3 件 C 层乐器违反 ≤2；remix 自检缺商标核查；orchestration evals 预算未区分平台；design references 描述与交付不符；留痕数字过期。
- **修复**：补 ffmpeg 检查/安装与依赖声明；收窄 logic-audit 纯器乐边界、去 Track ID、修 Python 命令；豪放模板改用 A/B 层（cello/harp/crotales）；remix 自检补曲名商标；evals 预算按平台分叉；design D4 与留痕同步。
- **复验**：四命令 + `openspec validate --strict` 全绿。
- **总体：✅ PASS**（修复后无 blocking）。
