## 1. lyric-reviewer

- [x] 1.1 起草：读源全文（335 行），16 点框架保留，去内部规则编号 / 私有路径 / 私有批次与曲目 ID，平台长度项中立化；落盘 `skills/lyric-reviewer/SKILL.md`。验证：正文 <500 行
- [x] 1.2 新写 `skills/lyric-reviewer/evals/evals.json`（2 个 case）。验证：JSON 可解析
- [x] 1.3 跑契约断言：16 点全现、严重度、只审查不改写、自动修复边界。验证：17/17 通过
- [x] 1.4 迭代（若有）+ 留痕写入 `skills/PORT-BATCH-3-LOG.md`

## 2. music-dna-extraction

- [x] 2.1 起草：读源全文（164 行）+ 2 个 references，去私有报告路径 / 平台专属术语，双载体改「标签式/自然语言式」；落盘 `skills/music-dna-extraction/SKILL.md`。验证：正文 <500 行
- [x] 2.2 随行迁移 `references/dna-dimensions.md` 与 `references/search-prompt-template.md` 并脱敏。验证：无私有路径/平台专属残留
- [x] 2.3 新写 `skills/music-dna-extraction/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.4 跑契约断言：5 步 / 7 维 / 分布 / 双输出 / 专辑参数 / references。验证：16/16 通过
- [x] 2.5 迭代（若有）+ 留痕

## 3. songyun-craft

- [x] 3.1 起草：读源全文（98 行）+ evals，八测试与六组保留，去私有美学手册路径与规则编号，移除未公开批次规划表述；落盘 `skills/songyun-craft/SKILL.md`。验证：正文 <500 行
- [x] 3.2 随行迁移 `evals/evals.json`（6 个）与 `evals/trigger-evals.json`（20 条）并脱敏。验证：JSON 可解析、无私有路径
- [x] 3.3 跑契约断言：T1–T8 / 六组 / 警示 / 红线。验证：16/16 通过
- [x] 3.4 迭代（若有）+ 留痕

## 4. sweet-craft

- [x] 4.1 起草：读源全文（147 行）+ evals，物件化 7 技保留，私有标杆曲目/歌词/路径/精确 A/B 数值改脱敏结论；落盘 `skills/sweet-craft/SKILL.md`。验证：正文 <500 行
- [x] 4.2 随行迁移 `evals/evals.json`（7 个）并脱敏。验证：JSON 可解析、无私有数值
- [x] 4.3 跑契约断言：7 技 / 打包归因 / 证据分级 / 女声配方 / 曲名双截流。验证：12/12 通过
- [x] 4.4 迭代（若有）+ 留痕

## 5. 验收（四命令 + 契约）

- [x] 5.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（13 skills）
- [x] 5.2 description lint：`npm run lint:skill-description` → 0 error（新增 4 个均 ≤1024 码点）
- [x] 5.3 脱敏 lint：`npm run lint:deid` → 0 命中（82 文件）
- [x] 5.4 `npm test` → 44 passed / 0 failed
- [x] 5.5 体量：4 个新 SKILL.md 均 <500 行（288 / 146 / 78 / 122）
- [x] 5.6 四字段：4 个新 skill 的 frontmatter 均含 name（=目录名）/ version / user-invocable / description

## 6. OpenSpec sedimentation

- [x] 6.1 归档后 `openspec validate --specs --strict` → 16/16 通过
- [x] 6.2 行为对照：逐条核对 4 个 capability spec 的 requirement 与 scenario 与实际交付物
- [x] 6.3 归档 change 并 sync main specs
