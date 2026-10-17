## Context

- 源工程 4 个 skill 均为**纯文本方法论 + 可选随行脚本**：`pronunciation-check` 266 行 / `explicit-checker` 179 / `reality-check` 73 + evals / `audio-mastering` 334 + 2 个 Python 脚本。全部 <500 行。
- 它们覆盖生成前/发布前的三类检查与一条音频后处理链：发音、显式内容、实物常识、母带。
- 执行规范已在 `docs/porting-plan.md` §十 冻结（skill-creator 流程 / 四字段 / 脱敏三查 / 四命令验收）。
- `reality-check` 源版自带 2 个 evals；其余 3 个需新写评测用例。

## Goals / Non-Goals

**Goals:**
- 4 个 skill 以**公开自包含**形态落地，方法论本体不动
- 每个 skill 通过 `skill-creator` 流程并留痕
- 四命令全绿；正文均 <500 行；`audio-mastering` 脚本可执行

**Non-Goals:**
- 不追求评测的统计严谨（budget 限制；见 D3）
- 不移植源工程的私有调研资料与私有案例库
- 不为跨 skill 引用补建桩（引用指向后续批次的目标名）

## Decisions

### D1. 脱敏改写：编号去号留义，私有资产去名

- **决策**：内部规则编号一律改写为规则本身的表述；私有路径改为通用描述或「自建扩展表」；私有曲目/专辑/实验编号去名；私有事故数字删除，只留教训。
- **理由**：公开读者无内部上下文；本仓库脱敏门禁会拦截规则编号与私有目录前缀。
- **备选**：保留编号并扩大 denylist 白名单 → 否决（破坏门禁可预测性）。

### D2. 平台中立：平台名只作示例，配置为准

- **决策**：`explicit-checker` 的平台名单改为「按目标分发平台配置」，正文保留示例；`pronunciation-check` 用「AI 演唱引擎」泛称；`audio-mastering` 标题与描述平台中立，并声明「平台锁定音频时不适用」。
- **理由**：skill 名不得锁定单一平台（AGENTS.md 命名约定）；方法论跨平台复用。
- **风险处置**：实测样本仍注明来源平台，读者可按同样方法校准。

### D3. 评测深度：每 skill 1 个 representative case（reality 保留 2 个）

- **决策**：每个 skill 新写 1 个 test case；`reality-check` 随行保留源版 2 个 case 并核对与正文一致性；不做 baseline 对照；断言限定为可程序化检查的显式契约。
- **理由**：产出是检查器/后处理指南，可验证的是「契约完整性」（风险类是否齐全、分级是否正确、禁忌是否声明）；美学上限无法机器评分。
- **裁剪须声明**：留痕里写明未做 baseline 与 description 触发优化。

### D4. 随行脚本：原样逻辑 + docstring 脱敏

- **决策**：`audio-mastering` 的 `scripts/master_twopass.py` 与 `scripts/rms_silence_check.py` 随行；只改 docstring 中的平台名与私有环境说明，算法逻辑不动。
- **理由**：脚本是 two-pass 与静默验证的可执行核心；重写会引入回归风险。
- **验证**：`python -m py_compile` 通过（环境含 Python 3）。

### D5. 四字段与命名

- **决策**：`name` = 目录名；`version` 从 `0.1.0` 起；`user-invocable: true`；`description` 只放触发路由四要素，≤1024 码点。
- **理由**：AGENTS.md 硬规范；索引生成与平台加载器依赖。

## Risks / Trade-offs

- **[平台专属经验泛化后精度下降]** → 保留实测样本说明；方法（测量→目标→验证）平台无关。
- **[随行 Python 脚本无仓库级测试]** → 脚本逻辑原样保留；`py_compile` + CLI `--help` 冒烟；不新增 Node 测试依赖。
- **[跨 skill 引用悬空]** → proposal 显式声明；后续批次收口。
- **[评测裁剪导致质量下限未验证]** → 留痕声明裁剪范围；断言聚焦契约完整性。

## Review Record

**Stage 4/7 双轴审查（2026-10-17，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **首轮预提交审查**：发现 7 Important + 3 Minor —— 私有案例残留、996 分级前后不一致、平台未配置场景未落地、`__pycache__` 未忽略、留痕文件数过期、🔴 处置措辞与「不擅自改写」冲突、eval 错误计数不一致等。
- **修复**：reality-check 私有案例改通用示例并同步 evals/spec；pronunciation 将「明确代号」并入 🟢、仅谐音梗保留 🟡；explicit-checker 补「平台未配置先确认」；`.gitignore` 补 `__pycache__/` 与 `*.pyc`；留痕数字按最终树同步；🔴 处置改为「阻断 + 给修正方向，由创作者决定改法」。
- **复验**：四命令 + `py_compile` + `openspec validate --strict` 全绿。
- **总体：✅ PASS**（修复后无 blocking）。
