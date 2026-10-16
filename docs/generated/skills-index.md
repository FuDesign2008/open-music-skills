# Skills 索引（自动生成）

> **请勿手改。** 由 `node scripts/gen-skill-docs.mjs` 从 `skills/<name>/SKILL.md` 生成。
> 
> 变更 skill 后：commit 时 pre-commit hook 自动更新；或手动执行 `node scripts/gen-skill-docs.mjs`

本仓库当前共 **1** 个 skill。

| Skill | 版本 | 用户可唤起 | 描述（含触发条件） |
| --- | --- | --- | --- |
| **xiaoyao-craft** | 0.5.0 | 是 | Use when 创作或优化 Suno 音乐时，想让音乐有「逍遥丧失 / 飘散 / 失重 / 无力 / 被困 / 迟暮」感——一种「曾经逍遥自在、如今不复逍遥」的悲剧声音美学。核心是「逍遥飘散」三尺度（句间长空白 + 段落飘散失重 + 全曲不冲的高潮）+「ambient 形态层」（短句不砍词 / 官方器乐段 / 长时长 / 开头结尾≥30s纯器乐）。**两条最高优先硬约束：时长≈5min20s + 开头结尾各>30s纯器乐（无人声）——见 skill 顶部**。**逍遥 = 曾经的自由境界（世间极速、想去哪去哪），逍遥者超越「冲」（用力挣扎），冲根本不该出现**——声音上不用 strain/reach/push（冲），用 drift/dissolve/fade/float/weightless（失重飘散、消逝、放手）。**即使用户没说「逍遥」，只要角色是「曾经逍遥/自由/巅峰，如今丧失/被困/迟暮」型（本性不冲），或反馈「想要飘散/失重/无力/不冲/无挣扎的高潮」，就应主动使用本 skill**。本 skill 专注逍遥失重美学（飘散→消逝）；需要用力/蓄势释放的燃曲战歌不适用。触发词包括逍遥、飘散、失重、消逝、停滞、落空、无力感、迟暮、被困、囚笼、时光囚徒、不冲、无高潮、释然收束、drift、dissolve、weightless、stagnation。 |

---

## 校验

```bash
node scripts/gen-skill-docs.mjs
git diff --exit-code docs/generated/skills-index.md
```
