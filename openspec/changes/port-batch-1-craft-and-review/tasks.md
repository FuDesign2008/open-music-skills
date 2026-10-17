## 1. imagery-craft

- [ ] 1.1 起草：加载 `skill-creator` 流程，读源全文（260 行），按 D1 脱敏改写（去规则编号 / 私有路径 / 私有曲目名），按 D2 将跨 skill 引用改为最终目标名；落盘 `skills/imagery-craft/SKILL.md`。验证：文件存在且正文 < 500 行
- [ ] 1.2 新写 `skills/imagery-craft/evals/evals.json`（1 个 representative case + expected_output）。验证：JSON 可解析且 case 数 ≥1
- [ ] 1.3 跑评测（裁剪口径见 design D4）并做契约断言：10 维度名称全部出现、三阶段齐全、载体族 ≥10、真实锚定法出现。验证：断言脚本输出全通过，留痕写入 `skills/imagery-craft-workspace/`
- [ ] 1.4 迭代（若断言未过）+ 汇总流程留痕。验证：留痕含起草 / 评测 / 迭代三段

## 2. story-craft

- [ ] 2.1 起草：读源全文（225 行），脱敏改写（去规则编号 / 私有路径 / 私有案例），跨 skill 引用改目标名；落盘 `skills/story-craft/SKILL.md`。验证：正文 < 500 行
- [ ] 2.2 新写 `skills/story-craft/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [ ] 2.3 跑评测 + 契约断言：10 技法全现、冰山原则定义、体裁边界（豪放不适用）声明、考据三道检验。验证：断言全通过
- [ ] 2.4 迭代（若有）+ 留痕。验证：三段完备

## 3. whitespace-craft

- [ ] 3.1 起草：读源全文（199 行），脱敏改写（去规则编号 / 私有实测批次号 / 私有路径），平台表述标注适用范围；落盘 `skills/whitespace-craft/SKILL.md`。验证：正文 < 500 行
- [ ] 3.2 新写 `skills/whitespace-craft/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [ ] 3.3 跑评测 + 契约断言：留白=人声缺席定义、量化标准（头尾 ≥30s + ≥60%）、两类落地手段、取气两派。验证：断言全通过
- [ ] 3.4 迭代（若有）+ 留痕。验证：三段完备

## 4. voice-checker

- [ ] 4.1 起草：读源全文（274 行），脱敏改写（去规则编号 / 私有平台名 / 私有批次名），保留 11 类检测与分级；落盘 `skills/voice-checker/SKILL.md`。验证：正文 < 500 行
- [ ] 4.2 新写 `skills/voice-checker/evals/evals.json`（1 个 case）。验证：JSON 可解析
- [ ] 4.3 跑评测 + 契约断言：11 类模式全现、仅 Warning/Info 无 Critical、仅建议不改写声明、流派敏感降级、浓烈语法分界。验证：断言全通过
- [ ] 4.4 迭代（若有）+ 留痕。验证：三段完备

## 5. 验收（四命令 + 契约）

- [ ] 5.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 干净（此时应为 5 个 skill）
- [ ] 5.2 description lint：`npm run lint:skill-description` → 0 error（4 个新增均 ≤1024 码点）
- [ ] 5.3 脱敏 lint：`npm run lint:deid` → 0 命中（扫描含 `skills/`、`docs/`、`openspec/`）
- [ ] 5.4 `npm test` → 全过（既有 38 项不回退）
- [ ] 5.5 体量检查：4 个新 SKILL.md 均 < 500 行
- [ ] 5.6 四字段检查：4 个新 skill 的 frontmatter 均含 name（=目录名）/ version / user-invocable / description

## 6. OpenSpec sedimentation

- [ ] 6.1 `openspec validate port-batch-1-craft-and-review` → 通过
- [ ] 6.2 行为对照：逐条核对 4 个 capability spec 的 requirement 与 scenario 与实际交付物（标注 executed / pending）
- [ ] 6.3 归档 change（经 `openspec-archive-change`）并检查归档 diff；sync main specs
