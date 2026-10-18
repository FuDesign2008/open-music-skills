## 1. orchestration-craft

- [x] 1.1 起草：读源全文（312 行）+ reference，六层织体/三谱系/响应度分层保留，去私有响应度数据与曲目 ID；落盘 `skills/orchestration-craft/SKILL.md`。验证：正文 <500 行
- [x] 1.2 随行迁移 `references/instrument-pool.md` 并去私有统计。验证：无私有数据残留
- [x] 1.3 随行迁移 `evals/evals.json`（10 个 case）并脱敏。验证：JSON 可解析
- [x] 1.4 跑契约断言：六层 / 三谱系 / 六技法 / A-B-C / 预算 / references。验证：16/16 通过
- [x] 1.5 迭代（若有）+ 留痕写入 `docs/porting/PORT-BATCH-4-LOG.md`

## 2. remix-craft

- [x] 2.1 起草：读源全文（90 行），公版过审/做减法/情感借鉴/调研四条保留，去内部批次与规则编号；落盘 `skills/remix-craft/SKILL.md`。验证：正文 <500 行
- [x] 2.2 新写 `skills/remix-craft/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.3 跑契约断言：公版 / 整理者 / 38-40% / 做减法 / 情感致敬 / 调研 / 加长 / 不采样。验证：8/8 通过
- [x] 2.4 迭代（若有）+ 留痕

## 3. youtube-audio-extract

- [x] 3.1 起草：读源全文（173 行），yt-dlp + deno + cookies 配方保留，去私有路径与提取历史表；落盘 `skills/youtube-audio-extract/SKILL.md`。验证：正文 <500 行
- [x] 3.2 新写 `skills/youtube-audio-extract/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 3.3 跑契约断言：yt-dlp / deno / cookies / 格式 / 验证 / librosa / 合规。验证：7/7 通过
- [x] 3.4 迭代（若有）+ 留痕

## 4. logic-audit

- [x] 4.1 起草：读源全文（222 行），D1–D7 七维保留（覆盖四族），平台专属检查改可配置规则；落盘 `skills/logic-audit/SKILL.md`。验证：正文 <500 行
- [x] 4.2 新写 `skills/logic-audit/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 4.3 跑契约断言：D1–D7 / 自动修复 / 人工决策 / 索引。验证：11/11 通过
- [x] 4.4 迭代（若有）+ 留痕

## 5. 验收（四命令 + 契约）

- [x] 5.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（17 skills）
- [x] 5.2 description lint：`npm run lint:skill-description` → 0 error（新增 4 个均 ≤1024 码点）
- [x] 5.3 脱敏 lint：`npm run lint:deid` → 0 命中（104 文件）
- [x] 5.4 `npm test` → 44 passed / 0 failed
- [x] 5.5 体量：4 个新 SKILL.md 均 <500 行（278 / 88 / 159 / 212）
- [x] 5.6 四字段：4 个新 skill 的 frontmatter 均含 name（=目录名）/ version / user-invocable / description

## 6. OpenSpec sedimentation

- [x] 6.1 归档后 `openspec validate --specs --strict` → 20/20 通过
- [x] 6.2 行为对照：逐条核对 4 个 capability spec 的 requirement 与 scenario 与实际交付物
- [x] 6.3 归档 change 并 sync main specs
