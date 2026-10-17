## 1. music-creation-workflow

- [x] 1.1 起草：读源全文（530 行）+ 规则手册结构，核心流程留正文，细则移 references，去规则编号/私有数据/平台术语；落盘 `skills/music-creation-workflow/SKILL.md`。验证：正文 <500 行
- [x] 1.2 写 `references/creation-rules.md`（12 条核心规则 + 专辑审查 + 修订纪律）并脱敏。验证：无私有路径/规则编号
- [x] 1.3 新写 `evals/evals.json`（模式 A/B 2 个 case）。验证：JSON 可解析
- [x] 1.4 跑契约断言：模式 A/B / 六段 / 四维 / 检查链 / 交付物 / references。验证：16/16 通过
- [x] 1.5 迭代（若有）+ 留痕写入 `skills/PORT-BATCH-5-LOG.md`

## 2. music-trends-report

- [x] 2.1 起草：读源全文（270 行）+ 4 个 references，5 阶段/七类/BPM/制作签名/缺口保留，去私有报告模板与项目引用；落盘 `skills/music-trends-report/SKILL.md`。验证：正文 <500 行
- [x] 2.2 写 4 个 references（trend-analysis / data-sources / report-template / style-prompt-patterns）并脱敏。验证：无私有路径/项目数据
- [x] 2.3 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.4 跑契约断言：5 阶段 / 七类 / 权重 / 纠偏 / 配方 / 落盘 / 时效 / 缺口 / references。验证：16/16 通过
- [x] 2.5 迭代（若有）+ 留痕

## 3. 验收（四命令 + 契约）

- [x] 3.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（19 skills）
- [x] 3.2 description lint：`npm run lint:skill-description` → 0 error
- [x] 3.3 脱敏 lint：`npm run lint:deid` → 0 命中（122 文件）
- [x] 3.4 `npm test` → 44 passed / 0 failed
- [x] 3.5 体量：2 个新 SKILL.md 均 <500 行（342 / 181）
- [x] 3.6 四字段：2 个新 skill 全部齐全

## 4. OpenSpec sedimentation

- [x] 4.1 归档后 `openspec validate --specs --strict` → 22/22 通过
- [x] 4.2 行为对照：逐条核对 2 个 capability spec 与实际交付物
- [x] 4.3 归档 change 并 sync main specs
