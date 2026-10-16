import test from "node:test";
import assert from "node:assert/strict";
import { extractDescription, codePointLength, HARD_LIMIT, SOFT_TARGET } from "./lint-skill-description.mjs";

const fm = (inner) => `---\n${inner}\n---\n# body\n`;

test("extractDescription reads a single-line description", () => {
  const d = extractDescription(fm("name: x\ndescription: does a thing\nversion: 1"), "x");
  assert.equal(d, "does a thing");
});

test("extractDescription folds continuation lines until the next top-level field", () => {
  const d = extractDescription(
    fm("name: x\ndescription: first part\n  second part\nversion: 1"),
    "x",
  );
  assert.equal(d, "first part second part");
});

test("extractDescription strips wrapping double and single quotes", () => {
  assert.equal(extractDescription(fm('description: "quoted"'), "x"), "quoted");
  assert.equal(extractDescription(fm("description: 'quoted'"), "x"), "quoted");
});

test("extractDescription error path: missing frontmatter throws", () => {
  assert.throws(() => extractDescription("# no frontmatter\n", "x"), /缺少 YAML frontmatter/);
});

test("extractDescription error path: missing description field throws", () => {
  assert.throws(() => extractDescription(fm("name: x"), "x"), /缺少 description 字段/);
});

test("codePointLength counts code points, not UTF-16 units", () => {
  // 中文按 1 码点计；emoji（代理对）也按 1 码点计
  assert.equal(codePointLength("中文字"), 3);
  assert.equal(codePointLength("🎵"), 1);
  assert.equal(codePointLength(""), 0);
});

test("thresholds are the documented ones", () => {
  assert.equal(HARD_LIMIT, 1024);
  assert.equal(SOFT_TARGET, 950);
});

test("boundary: a description at exactly the hard limit is allowed", () => {
  const desc = "x".repeat(HARD_LIMIT);
  const d = extractDescription(fm(`description: ${desc}`), "x");
  assert.equal(codePointLength(d), HARD_LIMIT);
  assert.ok(!(codePointLength(d) > HARD_LIMIT), "应恰好不超上限");
});
