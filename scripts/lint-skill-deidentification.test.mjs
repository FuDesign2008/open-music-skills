import test from "node:test";
import assert from "node:assert/strict";
import { scanText, inScope, DENYLIST } from "./lint-skill-deidentification.mjs";

test("scanText flags internal rule-number references", () => {
  const f = scanText("见铁律 12 与铁律26");
  assert.equal(f.length, 2);
  assert.ok(f[0].token.startsWith("铁律"));
});

test("scanText ignores the word 铁律 without a number", () => {
  assert.deepEqual(scanText("铁律法则不适用于此处"), []);
});

test("scanText flags internal project paths", () => {
  // 最小样本：只保留足以触发规则的前缀 + 一段路径（不内嵌任何真实私有工程的层级结构）
  const f = scanText("see suno/example.md for details");
  assert.equal(f.length, 1);
  assert.ok(f[0].token.startsWith("suno/"));
});

test("scanText does not flag platform-name juxtaposition", () => {
  // 「Suno/妙响 双线」是平台并列写法，不是内部路径
  assert.deepEqual(scanText("Suno/妙响 双线适配"), []);
});

test("scanText is case-insensitive and reports 1-based line", () => {
  const f = scanText("clean line\nMasterclass/craft/note.md");
  assert.equal(f.length, 1);
  assert.equal(f[0].line, 2);
});

test("scanText flags the research private directory", () => {
  // 归档文档曾残留该目录名；denylist 必须覆盖，而不是靠一次性人工清理
  const f = scanText("see research/example.md for details");
  assert.equal(f.length, 1);
  assert.ok(f[0].token.startsWith("research/"));
});

test("scanText flags backtick-wrapped private dirs with placeholders", () => {
  // 反引号 + 省略号形式不经由「ASCII 首字符」规则命中，需要独立模式兜底
  const f = scanText("删除私有路径（`research/...`、`masterclass/...`）");
  assert.equal(f.length, 2);
  assert.ok(f.every((x) => x.token.startsWith("`")));
});

test("scanText does not flag research as a common word, URL segment, or word suffix", () => {
  assert.deepEqual(scanText("research/engineering collaboration"), []);
  assert.deepEqual(scanText("https://example.com/research/notes.md"), []);
  assert.deepEqual(scanText("myresearch/foo"), []);
});

test("scanText returns [] for generic placeholders", () => {
  assert.deepEqual(scanText("https://example.com/docs/PROJ-1234 app-log"), []);
});

test("inScope: content surfaces in, generated/self/node_modules out", () => {
  assert.ok(inScope("skills/xiaoyao-craft/SKILL.md"));
  assert.ok(inScope("docs/some.md"));
  assert.ok(!inScope("docs/generated/skills-index.md"));
  assert.ok(!inScope("scripts/lint-skill-deidentification.mjs"));
  assert.ok(!inScope("node_modules/x/index.js"));
  assert.ok(!inScope("README.md")); // 根目录不在扫描范围
  // skill-creator 评测工作区（gitignored 本地产物）不在扫描范围
  assert.ok(!inScope("skills/xiaoyao-craft-workspace/iteration-1/eval-0/with_skill/outputs/answer.md"));
  // openspec/ 是公开内容表面，必须在扫描范围（曾因遗漏它导致归档件泄漏静默通过）
  assert.ok(inScope("openspec/changes/archive/2026-01-01-x/design.md"));
  assert.ok(inScope("openspec/specs/x/spec.md"));
});

test("DENYLIST covers all rule classes", () => {
  assert.ok(DENYLIST.length >= 3);
  assert.equal(scanText("suno/x.md").length, 1); // 私有路径
  assert.equal(scanText("`research/...`").length, 1); // 反引号占位路径
  assert.equal(scanText("铁律 3").length, 1); // 规则编号
});
