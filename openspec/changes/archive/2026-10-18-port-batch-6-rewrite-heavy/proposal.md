## Why

batch-1..5 已覆盖创作、审查、craft、工具链与趋势；但**单曲流量定位/性状自查、生成前最后一道门、上线与变现规划**仍缺。`docs/porting-plan.md` 把 3 个 skill 列为 P2「需重写与脱敏」批次，是批次 6 的核心内容。

## What Changes

新增 3 个公开自包含 skill：

- **`hit-pattern-craft`**：流量路径定位（推荐池氛围曲 vs UGC 钩子曲）+ 15 条性状库 + 曲名体系 + 发行配套（合作署名/成组发行/数据纪律）+ 复刻阶梯
- **`pre-generation-check`**：11 道通用检查关卡（Style/歌词/艺人名/显式标记/自检/元数据/情绪光谱/歌词可及/曲式/留白/原句占比）+ 严重度分级 + 器乐处理
- **`launch-strategy`**：4 阶段上线流程（前置确认/蹭热度/上线节奏/变现）+ `launch_plan.md` 模板 + 3 个 references

**改造**：
- 私有平台数据（具体曲名、播放/收录数值、相关系数）→ 只保留方法论结论，标注「相关性≠因果」
- 内部规则编号 → 检查项/规则本身的表述
- 已停用的内容侧推广线 → 从新计划剔除，仅作历史参考
- 平台专属字段 → 「按目标平台配置」
- 跨 skill 引用改为最终目标名

**无 BREAKING 变更**（纯新增）。

## Capabilities

### New Capabilities

- `hit-pattern-craft`：流量定位与性状契约 —— 路径 A/B、15 条性状、发行配套
- `pre-generation-check`：生成前关卡契约 —— 11 Gates、严重度、器乐处理
- `launch-strategy`：上线与变现契约 —— 4 阶段、4 周节奏、变现路径、模板

### Modified Capabilities

（无 —— 本仓库此前无这 3 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/{hit-pattern-craft,pre-generation-check,launch-strategy}/SKILL.md` + `evals/` + launch 的 3 个 `references/`
- **依赖**：零运行时依赖（纯文本方法论）
- **不影响**：源工程（只读）、既有 19 个 skill
