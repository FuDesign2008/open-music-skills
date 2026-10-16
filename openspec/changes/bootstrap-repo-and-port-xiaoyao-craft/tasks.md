## 1. Repository skeleton

- [x] 1.1 创建 `package.json`（`name=open-music-skills`、`private: true`、`version=0.1.0`、scripts 六项：`prepare`/`gen:skills-index`/`lint:skill-description`/`lint:deid`/`install:skills`/`test`、devDependencies 仅 `husky`）；验证：`node -p "const p=require('./package.json');[p.name,p.version,Object.keys(p.scripts).length]"` 输出含 `open-music-skills`、`0.1.0`、`6`
- [x] 1.2 移植 `scripts/gen-skill-docs.mjs` 并**裁剪 modes 渲染分支**（D6；保留 frontmatter 校验「name 必须等于目录名、缺失即抛错」+ 索引表格生成）；验证：对含 1 个 skill 的仓库运行成功产出索引；对 name/目录不一致的临时样例抛错（样例用后即删）
- [x] 1.3 移植 `scripts/lint-skill-description.mjs`（1024 硬上限 / 950 软目标原样）；验证：临时构造超限样例得非零退出并点名该文件，正常样例零退出（样例用后即删）
- [x] 1.4 改造并移植 `scripts/lint-skill-deidentification.mjs`（**D3：denylist 升级为正则模式数组**——内部路径前缀 + `铁律\s*\d+`；保留自排除：跳过检测器自身与 `docs/generated/`；保留三模式 `全量`/`--staged`/`--base`）；验证：自测样本 `铁律 12`（含全/半角空格变体）命中、`铁律法则` 不命中、内部路径前缀命中、检测器自身零自命中
- [x] 1.5 移植 `scripts/install-skills.mjs`（**D2：manifest 名改为 `.open-music-skills-manifest.json`**；`DEFAULT_AGENTS` 按本仓库支持平台适配）；验证：`node scripts/install-skills.mjs --help`（或等效干跑）不报错；`grep -c 'open-music-skills-manifest' scripts/install-skills.mjs` ≥1 且 `grep -c "'\.open-skills-manifest" ` 为 0
- [x] 1.6 随行移植单元测试（D7：脱敏检测器 + install-skills 归属判定各一套，按适用性裁剪）；验证：`node --test` 报告非零测试数且全部通过
- [x] 1.7 创建 `.husky/pre-commit`（三钩子按序：description lint（仅 SKILL.md 变更）→ 脱敏 lint（仅内容路径变更）→ 索引重生成并 `git add`）；验证：`grep -c 'node scripts/' .husky/pre-commit` = 3
- [x] 1.8 创建 `.github/workflows/docs-skills-verify.yml`（索引新鲜度：重生成后 `git diff --exit-code`）；验证：YAML 语法可解析
- [x] 1.9 创建 `.github/workflows/release.yml`（`skills/**` 触发 + `workflow_dispatch`；bump 推断；`[skip ci]` 直推 main；annotated tag + Release）；验证：YAML 语法可解析且含 `skip ci` 字样
- [x] 1.10 创建 `.nvmrc`（内容 `22`）与 `.gitattributes`（shell 脚本 LF）；更新 `.gitignore`（并入 `.omc/`、`.goal-driven/`）；验证：`git check-ignore -v .omc .goal-driven` 两条均命中
- [x] 1.11 执行 `npm install`（触发 husky `prepare`）；验证（**按 husky v9 实际机制修正**：`core.hooksPath=.husky/_`，非 `.git/hooks/`）：`git config core.hooksPath` = `.husky/_`、`.husky/_/` 转发脚本就位、`.husky/pre-commit` 可执行（`-rwxr-xr-x`）

## 2. First skill — xiaoyao-craft (via skill-creator)

- [x] 2.1 加载 `skill-creator` 并按其流程起草（Capture Intent → Interview/Research → Write the SKILL.md）：以私有原版为输入产出公开自包含版草稿；验证：流程留痕（Intent 与草稿版本）
- [x] 2.2 自包含化改写：清理内部路径字面量、`铁律 N` 编号引用、对未公开 skill 的悬空引用；**保留**「妙响」平台名、合作署名、《遮天》标杆与 eval 素材；验证：与私有原版逐节对照，差异仅限引用层面（美学实质：三尺度 / 形态层 / 第一性原则 / 两条硬约束 / 实测边界保持语义一致）
- [x] 2.3 落盘 `skills/xiaoyao-craft/SKILL.md`（frontmatter 含 `name`/`version`/`user-invocable`/`description`）；验证：`node scripts/lint-skill-description.mjs` 对其实测未超 1024 码点
- [x] 2.4 随行移植 `skills/xiaoyao-craft/evals/evals.json`；验证：JSON 可解析且 case 数 ≥3
- [x] 2.5 用 skill-creator 的 test cases 机制运行现有 3 个 eval（深度可按预算裁剪，裁剪须声明）；验证：运行结果留痕（每 case 的产出摘要或评分）
- [x] 2.6 按评测反馈迭代 SKILL.md（若有反馈）；验证：迭代前后差异记录（无反馈则声明"未触发迭代及理由"）
- [x] 2.7 汇总 skill-creator 流程留痕清单（供 4.7 引用）；验证：清单含起草、运行、迭代三段的可核验条目

## 3. Documentation

- [x] 3.1 重写 `README.md`（英文：badge 组 / ASCII banner / 定位段覆盖四类 music skill / 安装与更新 / 贡献（含「勿手改生成物」）/ 许可）；验证：逐节与参考工程形态对照
- [x] 3.2 创建 `README.zh-CN.md`；验证：节对节与英文版信息等价
- [x] 3.3 创建 `AGENTS.md`（精简规范：**skill 创作与编辑须走 `skill-creator` 流程**（含无此工具时的等效流程）/ SKILL.md 格式与 frontmatter 陷阱 / 命名约定 / 门禁说明 / 验证命令 / 发布与版本约定）；验证：`grep -c 'skill-creator' AGENTS.md` ≥1
- [x] 3.4 创建 `RELEASE-NOTES.md`（初始章节）；验证：文件存在且含版本入口段

## 4. Verification (all six checks executed for real)

- [ ] 4.1 索引生成与新鲜度：`node scripts/gen-skill-docs.mjs && git diff --exit-code docs/generated/skills-index.md` → 干净（记录输出）
- [ ] 4.2 description lint：`node scripts/lint-skill-description.mjs` → 0 error（记录计数行）
- [ ] 4.3 脱敏 lint：`node scripts/lint-skill-deidentification.mjs` 全量扫描 → 0 命中（记录扫描文件数）
- [ ] 4.4 `npm test` → 全部通过（记录测试数）
- [ ] 4.5 真实提交触发 husky pre-commit 一次，观察三钩子按序生效（记录实际输出）
- [ ] 4.6 Node 版本声明（D4）：记录本地 Node 版本与 `.nvmrc` 的差异；环境允许时以 22 复跑 4.1–4.4
- [ ] 4.7 skill-creator 流程留痕（**无证据 = 该项未通过**）：附起草/评测/迭代的可核验记录，或声明裁剪范围与理由

## 5. OpenSpec sedimentation

- [ ] 5.1 `openspec validate bootstrap-repo-and-port-xiaoyao-craft` → 通过
- [ ] 5.2 行为对照：逐条核对 4 个 capability spec 的 requirement 与 scenario 与实际交付物（逐项标注 executed / pending）
- [ ] 5.3 归档 change（经 `openspec-archive-change`）并检查归档 diff：main specs 更新与归档目录移动均已落在工作区变更中
