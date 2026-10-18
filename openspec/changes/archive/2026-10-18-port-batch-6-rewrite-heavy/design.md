## Context

- 源工程 3 个 skill：`hit-pattern-craft` 153 行 / `pre-generation-check` 265 行 / `launch-strategy` 142 行 + 5 个 references（501 行）。
- 本批特点：**需重写与脱敏**——私有平台数据密集、内部规则编号密集、已停用推广线混杂。
- 执行规范已在 `docs/porting-plan.md` §十 冻结。

## Goals / Non-Goals

**Goals:**
- 3 个 skill 以公开自包含形态落地，方法论本体不动
- 私有数据只留方法论结论；已停用线剔除
- 四命令全绿；正文 <500 行；references 随行并脱敏

**Non-Goals:**
- 不保留具体平台数值、曲名、投放案例
- 不保留已停用的内容侧推广线
- 不为跨 skill 引用补建桩

## Decisions

### D1. 私有数据 → 方法论结论

- 具体曲名/播放/收录数值/相关系数删除，改为方向性结论；强相关结论标注「相关性≠因果」。
- 理由：公开读者无内部数据上下文；避免把单平台经验写成普遍规律。

### D2. 内部规则编号 → 检查项本身

- `pre-generation-check` 的 11 道关卡重写为通用检查项；平台专属字段（长度/声明/词量）标「目标平台配置」。
- 理由：AGENTS.md 脱敏门禁与公开可读性。

### D3. 已停用推广线剔除

- `launch-strategy` 只保留现役路径（流媒体播放分成 + 短视频 BGM 联动）；历史/暂停项只作参考，不纳入新计划。
- 理由：避免公开 skill 推荐已停用战术。

### D4. References 重组

- `launch-strategy` 保留 3 个通用 references（蹭热度/发行渠道/上线模板）；私有案例 references 不迁移。
- 理由：案例文件含私有账号数据，公开价值低。

### D5. 四字段与命名

- `name` = 目录名；`version` 0.1.0；`user-invocable: true`；description 只放触发路由四要素，≤1024 码点。

## Risks / Trade-offs

- **[私有数据删除后论证变弱]** → 保留方向性结论与「相关性≠因果」边界。
- **[平台规则变化]** → 以目标平台当前协议为准；references 标注复核策略。
- **[跨 skill 引用悬空]** → proposal 声明；后续批次收口。
- **[评测裁剪]** → 留痕声明。

## Review Record

**Stage 4/7 双轴审查（2026-10-18，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **首轮预提交审查**：发现 1 Important + 5 Minor —— 私有歌词片段/系列前缀残留、log 文件数过期、review record 占位、launch 缺场景池/重名检查、hit-pattern 断言清单与任务文本不一致。
- **修复**：去私有歌词片段与系列前缀示例；launch 补场景池与重名检查；hit-pattern 自查改为「标注命中/缺口」；留痕数字与任务清单同步。
- **复验**：四命令 + `openspec validate --strict` 全绿。
- **总体：✅ PASS**（修复后无 blocking）。
