## Why

batch-1..6 已覆盖创作、审查、craft、工具链与上线；但**多 AI 交叉调研、知乎真人素材、七源大众情绪雷达**三条调研线仍缺。它们依赖 `ego-browser`（浏览器自动化），按命名约定保留 `ego-` 前缀；`ego-multi-ai-collab` 同时改名为 `ego-multi-ai-research`（表达「研究」而非「协作」）。`docs/porting-plan.md` 把它们列为批次 7。

## What Changes

新增 3 个公开自包含 skill：

- **`ego-multi-ai-research`**（源 `ego-multi-ai-collab` 改名）：统一问题组 + 七步流程 + 三分区报告（共识/分歧/独有）+ 来源分级 + 降级路径 + ego-browser 工具链配方
- **`ego-zhihu-inspiration`**：登录探针 + 三入口采集（热榜/搜索/问题详情）+ 四要素候选提取 + 8-gram 零复述版权纪律
- **`ego-emotion-radar`**：七源雷达 + 五层采集 + 情绪母题表 + 噪声过滤 + `scripts/collect.js` 随行

**改造**：
- 私有运行路径/日期/批次 ID/曲名/具体赞数 → 删除或通用化
- 内部规则编号 → 规则本身的表述
- 依赖 ego-browser 的安装与登录态前置 → 正文显式声明
- 跨 skill 引用改为最终目标名（`ego-multi-ai-research` / `ego-zhihu-inspiration` / `ego-emotion-radar` / `music-trends-report` / `music-creation-workflow`）

**无 BREAKING 变更**（纯新增；`ego-multi-ai-collab` → `ego-multi-ai-research` 为命名约定要求的改名）。

## Capabilities

### New Capabilities

- `ego-multi-ai-research`：多 AI 交叉调研契约 —— 七步、三分区、来源分级、降级
- `ego-zhihu-inspiration`：知乎灵感契约 —— 三入口、四要素、零文本借用
- `ego-emotion-radar`：大众情绪雷达契约 —— 七源、五层、母题表、噪声过滤

### Modified Capabilities

（无 —— 本仓库此前无这 3 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/{ego-multi-ai-research,ego-zhihu-inspiration,ego-emotion-radar}/SKILL.md` + `evals/` + emotion-radar 的 `scripts/collect.js`
- **依赖**：三者均依赖 `ego-browser` 与站点登录态（正文已声明）；无其他运行时依赖
- **不影响**：源工程（只读）、既有 22 个 skill
