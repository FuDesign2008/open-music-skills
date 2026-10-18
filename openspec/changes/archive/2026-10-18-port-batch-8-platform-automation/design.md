## Context

- 源工程 5 个平台自动化 skill：release 367 行 / stats 153 行 + 1 脚本 / miaoxiang 190 行 / astrill 121 行 + 1 脚本 / sms 93 行。
- 该线是全仓库脱敏压力最大的一批：包含真实账号艺名、合作者姓名、私有曲名与专辑名、发行批次台账、收入与播放数据、内部规则编号与私有路径。
- 执行规范已在 `docs/porting-plan.md` §十 冻结。

## Goals / Non-Goals

**Goals:**
- 5 个 skill 以公开自包含形态落地，平台操作配方与实测结论保留
- 依赖前置（ego-browser / 登录态 / macOS 权限 / 完全磁盘访问）显式声明
- 脱敏后不残留任何账号、曲名、批次、内部编号、私有路径
- 四命令全绿；正文 <500 行；脚本随行并脱敏

**Non-Goals:**
- 不保留私有台账、收入数据、具体播放/点赞数值与案例曲名
- 不迁移源工程的批次报告与运行留痕
- 不为跨 skill 引用补建桩

## Decisions

### D1. 私有数据 → 方法论

- 账号艺名、合作者姓名 → `{艺名}` / `{合作者}` 占位符
- 私有曲名/专辑名 → 删除；事故描述改为「某次事故」而不点名
- 批次编号/日期/产出统计 → 删除；保留「每首 ~10 分钟」「验证码间隔」这类平台行为特性
- 内部规则编号 → 规则表述（不得保留编号形式）
- 私有路径（队列、台账、报告）→ 通用描述或删除

### D2. 平台公开事实保留

平台域名、API 端点、额度规则（每日 10 首 / 封面 20 次）、签约模式、授权证明要求、Semi Design 组件特征均属平台公开可观察事实，保留——它们是配方可用性的基础。

### D3. 脚本随行与参数化

- `scrape_stats.js`：输出目录改环境变量 `STATS_OUT_DIR`；周期 refs 改显式占位（`@REPLACE_1D` 等）并在缺失时跳过，避免把某次会话的 ref 当常量。
- `astrill.sh`：原样保留（无私有数据），仅更新注释中的路径引用。
- 其余 3 个 skill 无脚本。

### D4. 依赖声明分层

- 必需：ego-browser + 登录态（release / stats / miaoxiang）
- 可选增强：sms-code-reader（验证码自动读取）；缺失时退化为人工报码
- 系统前提：macOS 辅助功能授权（astrill）、完全磁盘访问 + iPhone-Mac 短信转发（sms）

### D5. 评测深度

- 每个 skill 1 个 representative case；不做 baseline；断言限定契约完整性。
- 平台自动化 skill 的真实评测需要登录态与真实账号，公开仓库中不可执行——留痕声明「契约级评测，非端到端实操」。

## Risks / Trade-offs

- **[平台结构漂移]** → 公开版不保留实测日期（脱敏要求），改用「以现场为准」+ 失效判据（如按钮无响应、DOM 读态不可信）+ 陷阱表覆盖；维护者更新时按现场复测。
- **[脱敏削弱论证]** → 保留方法论与方向性结论，删除的只是具体数值与命名。
- **[隐私敏感]** → sms-code-reader 与 stats 明确隐私边界；只查验证码模式消息、不存储；文档写明授权前提。
- **[评测裁剪]** → 留痕声明契约级评测。

## Review Record

**Stage 4/7 双轴审查（2026-10-18，ai-proxy）** · Reversibility：two-way door（纯新增）→ standard 深度

- **预提交审查（batch-8）**：PASS WITH FIXES —— 5 Important + 10 Minor（Standards 轴）+ 5 Important + 8 Minor（Spec 轴）。
  - **Important 修复**：① stats 删除真实播放/点赞数值（304/22 → 量级描述）② `scrape_stats.js` 补 `RESULT_JSON` 输出并修正文档形状 ③ `astrill.sh` OpenWeb 模式修复（GUI 为主判据，off 无条件点击 Toggle；on 以 GUI 切换为成功判据）④ stats 补「隐私与存储」节 + spec Requirement ⑤ `cmux.app` 泛化为「宿主 App（Terminal/iTerm2/VS Code/CMUX）」。
  - **Spec 修复**：① release 签署 Requirement 补非独家例外与系统级点击兜底 ② sms 轮询窗改 18×15s（≈270s）并与 spec 对齐 ③ sms eval 补隐私边界断言 ④ release eval 补 QC 门 1-3 ⑤ 契约断言改为行为级检查后重跑（2.4/4.4/7.2 回退后重验）。
  - **Minor 修复**：脚本本地日期/atob 保护/完整路径打印/`STATS_OUT_DIR` 文档；astrill 等待文案与 NO_APP 分支提示；sms SQL 改通用数字提取并声明句式差异；stats/miaoxiang/release/sms description 补反向边界；eval 补 `note` 声明契约级；LOG 计数更新；补 `.openspec.yaml`。
