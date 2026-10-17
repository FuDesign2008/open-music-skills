## 1. ego-multi-ai-research

- [x] 1.1 起草：读源全文（181 行），七步/三分区/两种模式保留，去私有路径/日期/批次/曲名/规则编号；改名 ego-multi-ai-research；落盘 `skills/ego-multi-ai-research/SKILL.md`。验证：正文 <500 行
- [x] 1.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 1.3 跑契约断言：七步 / 问题组 / 三分区 / 来源 / 降级 / ego-browser / 两种模式 / 第四源。验证：12/12 通过
- [x] 1.4 迭代（若有）+ 留痕写入 `skills/PORT-BATCH-7-LOG.md`

## 2. ego-zhihu-inspiration

- [x] 2.1 起草：读源全文（130 行），三入口/四要素/8-gram 保留，去私有批次数据与路径；落盘 `skills/ego-zhihu-inspiration/SKILL.md`。验证：正文 <500 行
- [x] 2.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.3 跑契约断言：探针 / 三入口 / 四要素 / 8-gram / 零借用 / ego-browser / 报告 / 存量对照。验证：8/8 通过
- [x] 2.4 迭代（若有）+ 留痕

## 3. ego-emotion-radar

- [x] 3.1 起草：读源全文（155 行），七源/五层/母题表保留，去私有报告路径与批次 ID；落盘 `skills/ego-emotion-radar/SKILL.md`。验证：正文 <500 行
- [x] 3.2 随行迁移 `scripts/collect.js` 并去私有注释。验证：脚本语法可用、无私有路径
- [x] 3.3 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 3.4 跑契约断言：七源 / 五层 / 母题 / 脚本 / 过滤 / ego-browser / 选题 / 事件≠母题。验证：8/8 通过
- [x] 3.5 迭代（若有）+ 留痕

## 4. 验收（四命令 + 契约）

- [x] 4.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（25 skills）
- [x] 4.2 description lint：`npm run lint:skill-description` → 0 error
- [x] 4.3 脱敏 lint：`npm run lint:deid` → 0 命中（起草阶段 149 文件；最终以归档后为准）
- [x] 4.4 `npm test` → 44 passed / 0 failed
- [x] 4.5 体量：3 个新 SKILL.md 均 <500 行（181/134/154）
- [x] 4.6 四字段：3 个新 skill 全部齐全

## 5. OpenSpec sedimentation

- [x] 5.1 `openspec validate port-batch-7-research-line --strict` → 通过
- [x] 5.2 行为对照：逐条核对 3 个 capability spec 与实际交付物
- [x] 5.3 归档 change 并 sync main specs
