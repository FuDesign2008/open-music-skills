## Why

batch-1..3 已覆盖写词、检查器、核心审查与三条 craft 线；但**配器维度、remix/公版改编、参考音频提取、专辑逻辑一致性**仍缺。`docs/porting-plan.md` 把这 4 个 skill 判为 P1（正文均 <500 行；`orchestration-craft` 带 references），是批次 4（craft 与工具链收尾）的核心内容。

## What Changes

新增 4 个公开自包含 skill（`skills/<name>/SKILL.md`）：

- **`orchestration-craft`**：六层织体（低音／节奏／铺底／主奏／色彩／对位）+ 三谱系（豪放／婉约／叙事）+ 乐器响应度三层 + 字符预算 + 红线清单；`references/instrument-pool.md` 随行
- **`remix-craft`**：公版过审范式 + 中式当代民谣做减法 + 借鉴现代热歌情感内核 + 调研真实素材 + 加长结构
- **`youtube-audio-extract`**：yt-dlp + deno + Chrome cookies 的下载配方 + 验证 + librosa 分析模板 + 合规提示
- **`logic-audit`**：D1–D7 七个审查维度（时间／情绪／叙事／自检表／锚点／索引／歌词自洽）+ 自动修复与人工决策分级

**改造（每 skill 相同）**：
- 内部规则编号 → 规则本身的表述
- 源工程私有路径 / 私有曲目 / 专辑 / 批次 ID / 精确运营数值 → 通用描述或删除
- 平台专属术语 → 平台中立表述（标签式 / 自然语言式；目标平台规则为准）
- 跨 skill 引用改为最终目标名（`music-creation-workflow` / `whitespace-craft` / `imagery-craft` / `story-craft` / `pre-generation-check` / `music-dna-extraction`）

**无 BREAKING 变更**（纯新增）。

## Capabilities

### New Capabilities

- `orchestration-craft`：配器织体契约 —— 六层织体、三谱系、响应度分层、预算与红线
- `remix-craft`：remix/公版改编契约 —— 公版合规、做减法、情感借鉴、加长结构
- `youtube-audio-extract`：参考音频提取契约 —— 前置检查、下载、验证、合规
- `logic-audit`：专辑逻辑审查契约 —— D1–D7、自动修复 / 人工决策、索引同步

### Modified Capabilities

（无 —— 本仓库此前无这 4 个 capability 的 spec。）

## Impact

- **新增文件**：`skills/{orchestration-craft,remix-craft,youtube-audio-extract,logic-audit}/SKILL.md`（+ `evals/`；orchestration 另含 `references/`），`docs/generated/skills-index.md` 自动更新
- **依赖**：`youtube-audio-extract` 依赖 `yt-dlp` + `deno` + `ffmpeg` + Chrome cookies（正文已声明）；其余零运行时依赖
- **不影响**：源工程（只读）、既有 13 个 skill
- **后续批次**：本批引用指向的 `pre-generation-check` 等将在 batch-6 落地（不阻塞本批验收）
