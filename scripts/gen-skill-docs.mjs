#!/usr/bin/env node
/**
 * 从 skills 各子目录下 SKILL.md 的 YAML frontmatter 生成 docs/generated/skills-index.md
 * 零依赖；修改 skills 后请运行：node scripts/gen-skill-docs.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const skillsDir = path.join(root, "skills");
const outDir = path.join(root, "docs", "generated");
const outFile = path.join(outDir, "skills-index.md");

export function parseFrontmatter(block) {
  const data = {};
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      const quote = val[0];
      val = val.slice(1, -1);
      if (quote === '"') {
        // YAML double-quoted escapes
        val = val.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      } else {
        // YAML single-quoted: '' -> '
        val = val.replace(/''/g, "'");
      }
    }
    if (val === "true") data[key] = true;
    else if (val === "false") data[key] = false;
    else data[key] = val;
  }
  return data;
}

export function readSkillMeta(skillPath) {
  const raw = fs.readFileSync(skillPath, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) {
    throw new Error(`Missing frontmatter: ${skillPath}`);
  }
  const data = parseFrontmatter(m[1]);
  // description 需支持 YAML 折叠/多行写法（`>` `|` 及其裁剪变体），
  // 与 lint-skill-description.mjs 的解析能力保持一致 —— 否则折叠写法会以字面量 ">" 进入索引，
  // 而两道门禁（description 长度 / 索引新鲜度）会全部绿灯放行。
  const lines = m[1].split("\n");
  const start = lines.findIndex((l) => l.startsWith("description:"));
  if (start !== -1) {
    const first = lines[start].slice("description:".length).trim();
    const parts = [];
    if (first && !/^[>|][-+]?$/.test(first)) parts.push(first);
    for (let i = start + 1; i < lines.length; i++) {
      if (/^[A-Za-z][\w-]*:/.test(lines[i])) break; // 下一个顶层字段
      parts.push(lines[i].trim());
    }
    let desc = parts.join(" ").replace(/\s+/g, " ").trim();
    if (
      (desc.startsWith('"') && desc.endsWith('"')) ||
      (desc.startsWith("'") && desc.endsWith("'"))
    ) {
      desc = desc.slice(1, -1);
    }
    data.description = desc;
  }
  return data;
}

export function mdCell(s) {
  if (s == null) return "";
  return String(s).replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

/** 遍历 skills 目录，产出索引行数据。name 与目录名不一致、或缺 frontmatter 时抛错。 */
export function collectRows(dir = skillsDir) {
  const dirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const rows = [];
  for (const sub of dirs) {
    const skillMd = path.join(dir, sub, "SKILL.md");
    if (!fs.existsSync(skillMd)) continue;
    const meta = readSkillMeta(skillMd);
    const name = meta.name;
    if (!name || name !== sub) {
      throw new Error(
        `SKILL name must match directory: ${sub} vs name=${meta.name}`,
      );
    }
    rows.push({
      name,
      version: meta.version ?? "—",
      userInvocable:
        meta["user-invocable"] === true
          ? "是"
          : meta["user-invocable"] === false
            ? "否"
            : "—",
      description: meta.description ?? "—",
    });
  }
  return rows;
}

/** 行数据 → 索引 markdown（纯函数，便于测试）。 */
export function renderIndex(rows) {
  const lines = [
    "# Skills 索引（自动生成）",
    "",
    `> **请勿手改。** 由 \`node scripts/gen-skill-docs.mjs\` 从 \`skills/<name>/SKILL.md\` 生成。`,
    "> ",
    "> 变更 skill 后：commit 时 pre-commit hook 自动更新；或手动执行 `node scripts/gen-skill-docs.mjs`",
    "",
    `本仓库当前共 **${rows.length}** 个 skill。`,
    "",
    "| Skill | 版本 | 用户可唤起 | 描述（含触发条件） |",
    "| --- | --- | --- | --- |",
  ];

  for (const r of rows) {
    lines.push(
      `| **${mdCell(r.name)}** | ${mdCell(r.version)} | ${mdCell(r.userInvocable)} | ${mdCell(r.description)} |`,
    );
  }

  lines.push("", "---", "", "## 校验", "", "```bash", "node scripts/gen-skill-docs.mjs", "git diff --exit-code docs/generated/skills-index.md", "```", "");

  return lines.join("\n");
}

function main() {
  const rows = collectRows(skillsDir);
  if (rows.length === 0) {
    throw new Error("No skills found");
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, renderIndex(rows), "utf8");
  console.error(`Wrote ${path.relative(root, outFile)} (${rows.length} skills)`);
}

const isMain =
  Boolean(process.argv[1]) &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main();
}
