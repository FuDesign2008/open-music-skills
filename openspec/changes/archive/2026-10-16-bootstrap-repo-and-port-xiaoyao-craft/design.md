## Context

- 本仓库当前为 3 文件空壳（2 行 README、MIT LICENSE、Node 模板 .gitignore），无 `package.json`、无 `scripts/`、无 CI、无 skill。动机见 `proposal.md` 的 Why。
- 参考工程 open-skills 提供**已验证可用**的同形态实现：7 个 `.mjs` 脚本（零依赖）、2 条 verify workflow + 1 条 release workflow、husky 三钩子、双语 README + 索引生成。
- 私有工程（音乐创作工作区）持有首个待移植 skill（Suno 逍遥丧失美学，v0.4.1，含 3 个 eval case）；采用**分叉策略**，其原版保留现状、不被本变更触碰。
- openspec 环境已由批准后前置步骤建立：CLI 1.10.0、`openspec/config.yaml`（schema: spec-driven，中文 artifact 规则）、门禁 4 名 native skill 实体就位（`openspec-new-change` / `openspec-continue-change` / `openspec-apply-change` / `openspec-archive-change`）。注意 CLI 1.10.0 已将 native skill 改名为 `propose` / `update-change`，旧名由前置步骤以实体副本补齐（旧名调用的 `openspec new|status|instructions` 命令在 1.10.0 仍存在，已验证兼容）。
- 本地执行环境：Node **v24.15.0**、npm 11.12.1；参考工程 `.nvmrc` 为 **22**（差异见 Decision D4）。

## Goals / Non-Goals

**Goals:**

- 移植并适配参考工程设施，使本仓库具备：skill 索引生成、三道质量门禁、自动发布，且全部**可在本地真实跑通**（不停留在"脚本已就位"）。
- 使首个 skill 通过全链路（索引 → description lint → 脱敏 lint → 提交钩子 → 索引新鲜度检查），且其编辑过程经由 `skill-creator` 流程留痕。
- 六项验收检查（卡片 D 块）全部有当轮真实执行证据。

**Non-Goals:**

- 不移植参考工程的 `mark-openspec-internal.mjs`（其专属用途，本仓库无对应对象）。
- 不实现 modes 渲染分支（本仓库当前无使用 `modes/_index.json` 的 skill）。
- **不实跑全局安装的 prune 路径**（该路径会删除全局目录内容，验证以单元测试 + 隔离路径进行）。
- 不配置 GitHub secret、不推送 main、不 merge、不执行分支收尾的合并选项。
- 不引入参考工程的通用 skill（如 git-commit 类工具）。

## Decisions

### D1. 移植策略：复制 + 裁剪适配（选定）

- **理由**：保留参考工程已验证的坑规避（如检测器自排除、`--staged`/`--base` 三模式、索引未变更时幂等）；同时不带入本仓库用不到的代码。
- **备选与否决**：直接照搬（带死代码）→ 否决；从零重写（重踩坑、重复造轮子）→ 否决；抽公共包（两仓库耦合、对当前规模过度设计）→ 否决。

### D2. 安装清单必须改名（阻断级）

- **决策**：`install-skills.mjs` 的 manifest 名从 `.open-skills-manifest.json` 改为 **`.open-music-skills-manifest.json`**。
- **理由**：参考实现的 prune 依据 manifest 判定"哪些全局 skill 归本仓库所有"。若沿用旧名，本仓库在**同一台机器**上运行时将读到参考工程的清单，进而可能删除由 open-skills 安装的全局 skill —— 这是本变更 FMEA 中 RPN 最高的失效模式（严重度高、静默、难检测）。
- **配套验证策略**：实现后不实跑 prune 路径；以单元测试覆盖归属判定，或以临时隔离目录运行。
- **备选**：保留旧名（与 open-skills 共享清单）→ 否决（误删风险不可接受）。

### D3. denylist 机制升级为「支持正则模式」（阻断级）

- **决策**：脱敏检测的 denylist 从"字面量字符串数组 + 统一转义"升级为"**模式数组**"：字面量项保持转义语义，正则项按原样编译（如 `铁律\s*\d+`）；自排除逻辑（跳过检测器自身与 `docs/generated/`）保持不变。
- **理由**：本仓库的两类脱敏规则中，「内部路径」可枚举为字面量前缀，但「内部规则编号」是**带数字的模式**（编号词 + 阿拉伯数字），字面量数组无法覆盖。
- **备选**：枚举全部规则编号（1–99）为字面量 → 否决（臃肿、脆弱、新增编号即漏检）。
- **自测样本要求**：真实形态的规则编号（含全/半角空格变体）必须命中；同前缀但无数字的词不得命中；内部路径前缀命中；检测器自身零自命中。

### D4. Node 版本策略

- **决策**：`.nvmrc` 取 **22**（与参考工程一致）；本变更的验证在本地实际 Node（v24.15.0）下执行，并在验证报告中**显式声明版本差异**；若环境允许，用 22 复跑一次工程验证命令。
- **理由**：`.nvmrc` 是对外契约（贡献者与 CI 的版本信号），应与参考生态一致；把本地版本差异**声明**而非掩盖，符合版本纪律。
- **备选**：`.nvmrc` 写 24 → 否决（与参考不一致，且 CI 默认镜像未必为 24）。

### D5. `gen-banner.sh` 不移植

- **决策**：README 的 ASCII banner 一次性手工生成并嵌入，不保留生成脚本。
- **理由**：banner 是静态产物，脚本常驻属零日常价值的偶然复杂度。
- **备选**：移植脚本 → 否决（accidental complexity）。

### D6. 裁剪索引生成器的 modes 渲染分支

- **决策**：`gen-skill-docs.mjs` 保留"遍历 skills → 校验 frontmatter（name 与目录一致，缺失即报错）→ 生成索引表格"主干；裁掉 `modes/_index.json` 检测与 `-modes.md` 渲染分支。
- **理由**：本仓库无使用该机制的 skill，保留即推测性通用性（speculative generality）。
- **约束**：若将来引入 modes，需在后续变更中按需加回 —— 这不是本变更的交付缺口。

### D7. 测试随行

- **决策**：随行移植参考工程的单元测试（`install-skills` 与脱敏检测器各一套，按其适用性裁剪），确保 `npm test`（`node --test`）有真实断言对象。
- **理由**：兑现 Layer A 可测试性；避免 `node --test` 空跑产生"绿灯假象"。

### D8. skill 编辑通道（卡片 rev.2 约束）

- **决策**：`skills/xiaoyao-craft/SKILL.md` 及其 evals 的任何编辑经由 `skill-creator` 流程（起草 → test cases → 评测 → 迭代），并在完成报告附可核验证据；评测深度可按预算裁剪但须声明。
- **配套**：该约束同时写入 `AGENTS.md` 成为仓库长期规范（含无此工具时的等效流程）。

## Risks / Trade-offs

- **[误删全局 skill]** → D2 改名 + 不实跑 prune 路径 + 单元测试覆盖归属判定。
- **[denylist 漏检或误伤]** → D3 的正则机制 + 四条自测样本（命中/不命中/自排除）。
- **[Node 版本差异导致行为不一致]** → D4 声明 + 尽量以 22 复跑；差异写入验证报告。
- **[husky 对未装依赖的贡献者不生效]** → 同一检查在 CI 侧复跑（索引新鲜度 workflow 已覆盖；脱敏在 CI 可用 `--base` 模式）。
- **[自动发布递归触发]** → 沿用 `[skip ci]` 标记 + 直接 push（已在 release-automation spec 固化为契约）。
- **[移植走样（裁剪过度或不足）]** → tasks 中逐文件标注参考来源与裁剪判定；D 块六项检查作最终兜底。
- **[`npx skills` 安装路径无法本地完整验证]** → 限定验证范围为"脚本逻辑 + 参数解析"，端到端安装若无法本地执行则记为 pending 并给出人工步骤（不冒充已通过）。

## Review Record

**Stage 4 双轴审查（2026-10-16）** · Reversibility：two-way door → standard 深度

- **轴 1 Standards**：`solution-review` 9 维全 ✅（FMEA 最高 RPN = install-skills 误删，已由 D2 缓解）；`code-design-review` Layer A/B/C 全 ✅（full path + security pass）。改进项：D5 / D6 裁剪、D4 版本策略、D7 测试随行。
- **轴 2 Spec**：proposal Why 成立 ✅；delta specs 4 个 capability 经 `openspec validate` 通过 ✅；design 风险覆盖 ✅；tasks 覆盖待 stage 5 产出后回查。
- **总体：✅ PASS**（两轴均无阻塞项）。
- **阻断级决策落点**：D2（manifest 改名 + 不实跑 prune）、D3（denylist 正则机制）—— 二者若在实现中被省略，视为**实现偏离设计**，须回到本阶段重审。

## Open Questions

- 端到端 `npx skills` 全局安装/清理验证能否本地完成（取决于网络与全局环境）→ 可延后：若不可行，验证报告记为 pending 并给出人工步骤，不影响 specs、方案或任务拆分。
- 将来引入 modes 类 skill 时是否加回渲染分支 → 可延后（本变更显式列为 Non-Goal）。
