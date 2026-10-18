## 1. hit-pattern-craft

- [x] 1.1 起草：读源全文（153 行），流量路径 + 15 条性状 + 发行配套保留，私有曲名/数值删除；落盘 `skills/hit-pattern-craft/SKILL.md`。验证：正文 <500 行
- [x] 1.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 1.3 跑契约断言：路径 A / 路径 B / 双路径 / 15 条 / 曲名 / 合作署名 / 成组 / D0-D1 / 复刻阶梯 / 相关性。验证：10/10 通过
- [x] 1.4 迭代（若有）+ 留痕写入 `docs/porting/PORT-BATCH-6-LOG.md`

## 2. pre-generation-check

- [x] 2.1 起草：读源全文（265 行），11 道关卡重写为通用检查清单，去规则编号/私有路径/平台专属；落盘 `skills/pre-generation-check/SKILL.md`。验证：正文 <500 行
- [x] 2.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.3 跑契约断言：Gate 1-11 / BLOCKING/WARNING/INFO / 器乐。验证：15/15 通过
- [x] 2.4 迭代（若有）+ 留痕

## 3. launch-strategy

- [x] 3.1 起草：读源全文（142 行），4 阶段/蹭热度/上线节奏/变现保留，剔除已停用推广线，去私有数据与案例；落盘 `skills/launch-strategy/SKILL.md`。验证：正文 <500 行
- [x] 3.2 写 3 个 references（trending-tactics / distribution-channels / launch-plan-template）并脱敏。验证：无私有路径/数值
- [x] 3.3 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 3.4 跑契约断言：Phase 0-4 / 蹭热度 / 4 周 / 变现 / 模板 / 指标。验证：10/10 通过
- [x] 3.5 迭代（若有）+ 留痕

## 4. 验收（四命令 + 契约）

- [x] 4.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（22 skills）
- [x] 4.2 description lint：`npm run lint:skill-description` → 0 error
- [x] 4.3 脱敏 lint：`npm run lint:deid` → 0 命中（142 文件）
- [x] 4.4 `npm test` → 44 passed / 0 failed
- [x] 4.5 体量：3 个新 SKILL.md 均 <500 行（143/240/125）
- [x] 4.6 四字段：3 个新 skill 全部齐全

## 5. OpenSpec sedimentation

- [x] 5.1 归档后 `openspec validate --specs --strict` → 25/25 通过
- [x] 5.2 行为对照：逐条核对 3 个 capability spec 与实际交付物
- [x] 5.3 归档 change 并 sync main specs
