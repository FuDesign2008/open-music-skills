## 1. pronunciation-check

- [x] 1.1 起草：读源全文（266 行），去内部规则编号 / 私有曲目 / 私有路径，平台术语中立化；落盘 `skills/pronunciation-check/SKILL.md`。验证：正文 <500 行
- [x] 1.2 新写 `skills/pronunciation-check/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 1.3 跑契约断言：三类风险 / 三级策略 / 单音字原则 / 两种数字读法 / 报告与还原 / 公版原句。验证：15/15 通过
- [x] 1.4 迭代（若有）+ 留痕写入 `docs/porting/PORT-BATCH-2-LOG.md`

## 2. explicit-checker

- [x] 2.1 起草：读源全文（179 行），去内部规则编号 / 私有路径，平台名单改「按目标分发平台配置」；落盘 `skills/explicit-checker/SKILL.md`。验证：正文 <500 行
- [x] 2.2 新写 `skills/explicit-checker/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.3 跑契约断言：英文词表 / 中文 A/B 档 / 变体 / 标记不匹配 / 平台配置 / 合规前置 / 不改写。验证：10/10 通过
- [x] 2.4 迭代（若有）+ 留痕

## 3. reality-check

- [x] 3.1 起草：读源全文（73 行）+ 随行 evals，去内部规则编号与私有日期/事故数字，AI 协作引用改 `ego-multi-ai-research`；落盘 `skills/reality-check/SKILL.md`。验证：正文 <500 行
- [x] 3.2 随行迁移 `skills/reality-check/evals/evals.json`（2 个 case）并核对与正文一致性。验证：JSON 可解析
- [x] 3.3 跑契约断言：三问 / 溯源 A–D / 幻觉诱捕 / 三级判定 / 实例卡。验证：14/14 通过
- [x] 3.4 迭代（若有）+ 留痕

## 4. audio-mastering

- [x] 4.1 起草：读源全文（334 行），去平台专属工作流术语 / 私有专辑与实验编号，路径改 `<专辑目录>`；落盘 `skills/audio-mastering/SKILL.md`。验证：正文 <500 行
- [x] 4.2 随行迁移 `scripts/master_twopass.py` 与 `scripts/rms_silence_check.py`，docstring 脱敏。验证：`python3 -m py_compile` 通过
- [x] 4.3 新写 `skills/audio-mastering/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 4.4 跑契约断言：响度基线 / 目标 -14 与 -1 dBTP / v5 链 / two-pass / 验证 / 静默检查 / 不覆盖原始。验证：13/13 通过
- [x] 4.5 迭代（若有）+ 留痕

## 5. 验收（四命令 + 契约）

- [x] 5.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（9 skills）
- [x] 5.2 description lint：`npm run lint:skill-description` → 0 error（新增 4 个均 ≤1024 码点）
- [x] 5.3 脱敏 lint：`npm run lint:deid` → 0 命中（58 文件）
- [x] 5.4 `npm test` → 44 passed / 0 failed
- [x] 5.5 体量：4 个新 SKILL.md 均 <500 行（257 / 175 / 75 / 336）
- [x] 5.6 四字段：4 个新 skill 的 frontmatter 均含 name（=目录名）/ version / user-invocable / description

## 6. OpenSpec sedimentation

- [x] 6.1 `openspec validate port-batch-2-checkers-and-mastering --strict` → 通过
- [x] 6.2 行为对照：逐条核对 4 个 capability spec 的 requirement 与 scenario 与实际交付物
- [x] 6.3 归档 change 并 sync main specs
