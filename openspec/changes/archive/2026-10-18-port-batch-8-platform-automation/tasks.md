## 1. ego-qishui-release

- [x] 1.1 起草：读源全文（367 行），三步向导/容器标记法/歌词框互斥分类/QC 四道门/issuedId 直链保留，去账号艺名/合作者/私有曲名/批次/规则编号/私有路径；落盘 `skills/ego-qishui-release/SKILL.md`。验证：正文 <500 行
- [x] 1.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 1.3 跑契约断言：三步向导 / 容器标记法 / 互斥分类 / 回读守卫 / QC 四门 / issuedId / 依赖声明。验证：通过
- [x] 1.4 迭代（若有）+ 留痕写入 `docs/porting/PORT-BATCH-8-LOG.md`

## 2. ego-qishui-stats

- [x] 2.1 起草：读源全文（153 行），双口径/周期映射/增量法/七步流程/判读纪律保留，去私有 CSV 落点/报告路径/案例曲名/规则编号；落盘 `skills/ego-qishui-stats/SKILL.md`。验证：正文 <500 行
- [x] 2.2 随行迁移 `scripts/scrape_stats.js`：输出目录参数化（`STATS_OUT_DIR`）、refs 改显式占位。验证：`node --check` 通过、无私有路径
- [x] 2.3 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 2.4 跑契约断言 + 行为级检查：双口径 / 禁跨口径比率 / 三周期 / 截图必选 / 增量法 / 判读纪律 / 脚本（`RESULT_JSON` 契约、本地日期、atob 保护）。验证：通过
- [x] 2.5 迭代（若有）+ 留痕

## 3. ego-miaoxiang-create

- [x] 3.1 起草：读源全文（190 行），注入模板/三分支/音色池署名/时长攻坚/模型探针/资产库存/发行衔接保留，去私有曲名/艺人名/批次/路径/规则编号；落盘 `skills/ego-miaoxiang-create/SKILL.md`。验证：正文 <500 行
- [x] 3.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 3.3 跑契约断言：注入模板 / 显式曲名 / 音色池 / 强制门 / assets 判据 / 模型探针 / 资产页 / 发行衔接。验证：通过
- [x] 3.4 迭代（若有）+ 留痕

## 4. astrill-control

- [x] 4.1 起草：读源全文（121 行），三命令/双探针/DNS 残留/状态机/已知边界保留；剥离源工程网络策略矩阵，改用户自填模板；落盘 `skills/astrill-control/SKILL.md`。验证：正文 <500 行
- [x] 4.2 随行迁移 `scripts/astrill.sh`。验证：`bash -n` 通过、无私有路径
- [x] 4.3 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 4.4 跑契约断言 + 状态机检查：三命令 / 双探针 / DNS 检测 / 幂等 / 前置授权 / 矩阵模板 / OpenWeb 不短路。验证：通过
- [x] 4.5 迭代（若有）+ 留痕

## 5. sms-code-reader

- [x] 5.1 起草：读源全文（93 行），chat.db 直读/前置检查/时间窗/故障表/Mac 侧停滞/低电量/同网络依赖保留，去发行流程绑定与案例日期；落盘 `skills/sms-code-reader/SKILL.md`。验证：正文 <500 行
- [x] 5.2 新写 `evals/evals.json`（1 个 case）。验证：JSON 可解析
- [x] 5.3 跑契约断言：完全磁盘访问 / iPhone-Mac 同步 / 时间窗 / 不重复触发 / Mac 停滞恢复 / 隐私边界。验证：通过
- [x] 5.4 迭代（若有）+ 留痕

## 6. 验收（四命令 + 契约）

- [x] 6.1 索引新鲜度：`npm run gen:skills-index && git diff --exit-code docs/generated/skills-index.md` → 提交后干净（30 skills）
- [x] 6.2 description lint：`npm run lint:skill-description` → 0 error
- [x] 6.3 脱敏 lint：`npm run lint:deid` → 0 命中
- [x] 6.4 `npm test` → 全过
- [x] 6.5 体量：5 个新 SKILL.md 均 <500 行
- [x] 6.6 四字段：5 个新 skill 全部齐全

## 7. OpenSpec sedimentation

- [x] 7.1 `openspec validate port-batch-8-platform-automation --strict` → 通过
- [x] 7.2 行为对照：逐条核对 5 个 capability spec 与实际交付物（审查后修订 spec 5 处）
- [ ] 7.3 归档 change 并 sync main specs

## 8. 预提交审查与提交

- [x] 8.1 fresh-context 双轴审查（Standards ∥ Spec），筛选 ≥80 置信度问题
- [x] 8.2 修复 + 四命令复验
- [x] 8.3 提交 batch-8
