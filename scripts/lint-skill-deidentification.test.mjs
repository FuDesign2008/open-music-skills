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
  const f = scanText("benchmark at suno/ip_adaptation/zhe_tian/prompt_track02.md");
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
});

test("DENYLIST covers both rule classes", () => {
  assert.ok(DENYLIST.length >= 2);
});
