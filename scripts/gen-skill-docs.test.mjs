import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseFrontmatter, mdCell, collectRows, renderIndex } from "./gen-skill-docs.mjs";

// ── parseFrontmatter ─────────────────────────────────────────────

test("parseFrontmatter reads plain key/value and booleans", () => {
  const d = parseFrontmatter('name: demo\nuser-invocable: true\nversion: "1.0.0"');
  assert.equal(d.name, "demo");
  assert.equal(d["user-invocable"], true);
  assert.equal(d.version, "1.0.0");
});

test("parseFrontmatter strips single and double quotes", () => {
  assert.equal(parseFrontmatter("a: 'x'").a, "x");
  assert.equal(parseFrontmatter('b: "y"').b, "y");
});

test("parseFrontmatter handles escaped double quote and single-quote doubling", () => {
  assert.equal(parseFrontmatter('a: "say \\"hi\\""').a, 'say "hi"');
  assert.equal(parseFrontmatter("b: 'it''s'").b, "it's");
});

test("parseFrontmatter boundary: empty block yields empty object", () => {
  assert.deepEqual(parseFrontmatter(""), {});
});

// ── mdCell ───────────────────────────────────────────────────────

test("mdCell escapes pipes and flattens newlines", () => {
  assert.equal(mdCell("a|b"), "a\\|b");
  assert.equal(mdCell("a\nb"), "a b");
});

test("mdCell boundary: null/undefined yield empty string", () => {
  assert.equal(mdCell(null), "");
  assert.equal(mdCell(undefined), "");
});

// ── collectRows (filesystem) ─────────────────────────────────────

function makeSkillsDir(skills) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
  for (const [name, fm] of Object.entries(skills)) {
    fs.mkdirSync(path.join(dir, name), { recursive: true });
    if (fm !== null) fs.writeFileSync(path.join(dir, name, "SKILL.md"), fm);
  }
  return dir;
}

test("collectRows maps a well-formed skill", () => {
  const dir = makeSkillsDir({
    alpha: '---\nname: alpha\nversion: "0.1.0"\nuser-invocable: true\ndescription: does a thing\n---\n# body\n',
  });
  const rows = collectRows(dir);
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0], {
    name: "alpha",
    version: "0.1.0",
    userInvocable: "是",
    description: "does a thing",
  });
});

test("collectRows error path: name must match directory", () => {
  const dir = makeSkillsDir({
    alpha: '---\nname: beta\nversion: "0.1.0"\ndescription: x\n---\n',
  });
  assert.throws(() => collectRows(dir), /name must match directory/);
});

test("collectRows error path: missing frontmatter throws", () => {
  const dir = makeSkillsDir({ alpha: "# no frontmatter\n" });
  assert.throws(() => collectRows(dir), /Missing frontmatter/);
});

test("collectRows skips directories without SKILL.md", () => {
  const dir = makeSkillsDir({
    alpha: '---\nname: alpha\nversion: "0.1.0"\ndescription: x\n---\n',
    notaskill: null,
  });
  assert.equal(collectRows(dir).length, 1);
});

test("collectRows boundary: empty skills dir yields no rows", () => {
  assert.deepEqual(collectRows(makeSkillsDir({})), []);
});

test("collectRows folds YAML multi-line description (block scalar style)", () => {
  // 折叠写法若不被处理，索引会把字面量 ">" 当作描述 —— 而两道门禁都会放行
  const dir = makeSkillsDir({
    folded:
      '---\nname: folded\nversion: "0.1.0"\ndescription: >\n  line one\n  line two\nuser-invocable: true\n---\n',
  });
  const rows = collectRows(dir);
  assert.equal(rows[0].description, "line one line two");
});

// ── renderIndex ──────────────────────────────────────────────────

test("renderIndex emits header, count and one row per skill", () => {
  const md = renderIndex([
    { name: "alpha", version: "0.1.0", userInvocable: "是", description: "d1" },
    { name: "beta", version: "—", userInvocable: "—", description: "d2" },
  ]);
  assert.match(md, /共 \*\*2\*\* 个 skill/);
  assert.match(md, /\| \*\*alpha\*\* \| 0\.1\.0 \| 是 \| d1 \|/);
  assert.match(md, /\| \*\*beta\*\* \| — \| — \| d2 \|/);
});

test("renderIndex boundary: zero rows still renders a valid document", () => {
  const md = renderIndex([]);
  assert.match(md, /共 \*\*0\*\* 个 skill/);
  assert.match(md, /git diff --exit-code/);
});
