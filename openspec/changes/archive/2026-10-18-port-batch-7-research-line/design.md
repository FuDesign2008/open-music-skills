## Context

- 源工程 3 个调研线 skill：`ego-multi-ai-collab` 181 行 / `ego-zhihu-inspiration` 130 / `ego-emotion-radar` 155 + 1 个采集脚本。
- 三者依赖 `ego-browser` 与站点登录态；方法论与工具链配方是核心，私有运行数据需去除。
- 执行规范已在 `docs/porting-plan.md` §十 冻结。

## Goals / Non-Goals

**Goals:**
- 3 个 skill 以公开自包含形态落地，方法论与工具链配方保留
- 依赖 ego-browser 的安装/授权前置显式声明
- 四命令全绿；正文 <500 行；scripts 随行并脱敏

**Non-Goals:**
- 不保留私有运行路径、日期、批次 ID、曲名、具体赞数
- 不迁移私有报告与批次产物
- 不为跨 skill 引用补建桩

## Decisions

### D1. 私有数据 → 方法论

- 运行路径/日期/批次 ID/曲名/具体赞数删除；结论保留为方法（如「高赞=大众投票」），不写具体数值。
- 理由：公开读者无内部上下文；避免把单次实验写成普遍规律。

### D2. 改名与 ego- 前缀

- `ego-multi-ai-collab` → `ego-multi-ai-research`：表达「研究」而非「协作」。
- 三者均依赖 ego-browser，按 AGENTS.md 命名约定保留 `ego-` 前缀（前缀即依赖声明）。

### D3. 依赖声明

- 正文前置声明 `ego-browser` 与站点登录态；失效时按降级路径或交创作者扫码，不硬试。
- 理由：porting-plan §十.6 要求依赖前置声明。

### D4. 评测深度

- 每个 skill 1 个 representative case；不做 baseline；断言限定契约完整性。

### D5. 四字段

- `name` = 目录名；`version` 0.1.0；`user-invocable: true`；description 只放触发路由四要素，≤1024 码点。

## Risks / Trade-offs

- **[站点结构漂移]** → 工具链配方标注「首访实测后回写」；陷阱表覆盖常见失效。
- **[登录态依赖]** → 降级路径（双源成立/交创作者扫码）。
- **[私有数据删除后论证变弱]** → 保留方法论与方向性结论。
- **[评测裁剪]** → 留痕声明。

## Review Record

**Stage 4/7 双轴审查（2026-10-18，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **预提交审查（batch-7）**：1 Critical + 5 Minor。Critical 为**并发提交顺序**问题（batch-8 文件同在工作树 → 索引 30 skills 而 batch-8 未提交），处置为串行化提交，非内容缺陷；5 Minor（七源命名/脚本输出描述/等待时长/`runs/` 路径/改名说明）全部修复。
