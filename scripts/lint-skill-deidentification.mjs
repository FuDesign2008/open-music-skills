#!/usr/bin/env node
/**
 * 脱敏门禁：检测 skills/commands/docs 中的内部标识符（私有工程路径 / 内部规则编号）。
 * 把"靠人工自觉"升级为"机器强制"——公开仓库不得泄漏私有工程的目录结构与内部规范编号。
 *
 * 三种模式：
 *   全量（默认 / npm run lint:deid）：扫描全仓内容表面，列出所有命中 → 推动清理存量。
 *   --staged :只扫暂存区新增行(git diff --cached 的 + 行)→ pre-commit 用,"禁止新增泄漏"。
 *   --base <ref>:只扫相对 <ref> 的新增行(git diff <ref>...HEAD)→ CI 用,校验 PR diff 不引入新泄漏。
 *
 * 自排除:本脚本含 denylist 规则(检测器的必要组成),扫描时跳过自身与 docs/generated/(自动生成)。
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");
const SELF = path.relative(root, __filename).split(path.sep).join("/"); // scripts/lint-skill-deidentification.mjs

// 内部标识符 denylist(发现新的内部信息时按需扩充)。
// 两种条目形态:
//   - 字符串:按字面量匹配(自动转义,大小写不敏感)
//   - { pattern, flags? }:按正则匹配(用于「铁律 N」这类带数字、或需要结构边界的模式)
// 说明:detect 用的规则本身含敏感字面量/模式,这是检测器的必要组成,扫描时自排除。
export const DENYLIST = [
  // 私有工程路径形态:顶层目录 + 斜杠 + ASCII 路径段。
  // 限定 ASCII 首字符,避免误伤「Suno/妙响」这类平台并列写法;
  // 否定后顾排除 URL 路径段与 myresearch/ 这类词内嵌(只看真正的顶层目录)。
  { pattern: "(?<![A-Za-z0-9_./-])(?:suno|masterclass)/[A-Za-z0-9]" },
  // research 是常见英文词,分两种路径形态命中:
  //   a) 段内含 . 或 /(文件/子目录)——形态明确,直接命中;
  //   b) 无扩展名的裸目录名——仅当其后不是「空白+小写英文」(避免 research/engineering collaboration)。
  // 否定后顾排除词内嵌(myresearch/)与 URL 路径段,并排除反引号(交给下一条,避免重复命中)。
  { pattern: "(?<![A-Za-z0-9_./`-])research/[A-Za-z0-9._-]*[./]" },
  { pattern: "(?<![A-Za-z0-9_./`-])research/[A-Za-z0-9_-]+(?![A-Za-z0-9_-])(?![\\s][a-z]|[./])" },
  // 反引号包裹的私有目录形态:如 `masterclass/...`。路径段可能是省略号或占位符,
  // 上面的 ASCII 首字符规则覆盖不到;此条目只列私有目录,不含 suno(避免误伤平台名)。
  { pattern: "`(?:masterclass|research)/[^`\\n]*`" },
  // 内部规则编号引用:「铁律 12」「铁律26」(容忍全角空格)。
  { pattern: "铁律[\\s　]*\\d+" },
];

const TEXT_EXT = new Set([".md", ".json", ".sh", ".mjs", ".js", ".ts", ".yaml", ".yml", ".txt"]);
// 扫描范围：所有会进入公开仓库的内容表面。
// openspec/ 必须在内 —— 归档件与行为契约同样是公开内容（曾因遗漏它造成内部标识符静默泄漏）。
const SCOPE_PREFIXES = ["skills/", "commands/", "docs/", "openspec/"];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 将 denylist 条目编译为单一正则:字面量项转义,正则项原样(调用方负责用非捕获组避免编号冲突)。 */
export function compileDenylist(denylist = DENYLIST) {
  const sources = denylist.map((entry) =>
    typeof entry === "string" ? escapeRegex(entry) : entry.pattern,
  );
  return new RegExp(sources.join("|"), "gi");
}

const PATTERN = compileDenylist();

/** 扫描文本,返回命中列表 {line, column, token, snippet}。大小写不敏感。 */
export function scanText(text) {
  const findings = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    PATTERN.lastIndex = 0;
    let m;
    while ((m = PATTERN.exec(line)) !== null) {
      findings.push({
        line: i + 1,
        column: m.index + 1,
        token: m[0],
        snippet: line.trim().slice(0, 100),
      });
      if (m.index === PATTERN.lastIndex) PATTERN.lastIndex++; // 防零宽死循环
    }
  });
  return findings;
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

/** 判断相对路径是否在扫描范围内。 */
export function inScope(rel) {
  rel = toPosix(rel);
  if (rel === SELF) return false;
  if (rel.startsWith("docs/generated/")) return false;
  if (rel.startsWith("node_modules/")) return false;
  // skill-creator 评测工作区：gitignored 的本地产物（AI 生成的自由文本），
  // 不进入仓库 → 不扫描，避免其内容造成误报而阻塞合法提交。
  if (/^skills\/[^/]+-workspace\//.test(rel)) return false;
  if (!SCOPE_PREFIXES.some((s) => rel.startsWith(s))) return false;
  return TEXT_EXT.has(path.extname(rel).toLowerCase());
}

/** 递归收集全量模式下需扫描的文件(相对 root 的 posix 路径)。 */
function collectFullFiles() {
  const out = [];
  for (const prefix of SCOPE_PREFIXES) {
    const dir = path.join(root, prefix);
    if (!fs.existsSync(dir)) continue;
    walk(dir, out);
  }
  return out.sort();
}
function walk(absDir, out) {
  for (const e of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, e.name);
    const rel = toPosix(path.relative(root, abs));
    if (e.isDirectory()) walk(abs, out);
    else if (inScope(rel)) out.push(rel);
  }
}

/** 解析 `git diff` 统一输出,提取每个文件的新增行(+ 行)。diffArgs 透传给 git diff。 */
export function addedLinesFromDiff(diffArgs) {
  const out = execSync(`git diff ${diffArgs} -U0 --no-color`, {
    cwd: root,
    maxBuffer: 1024 * 1024 * 64,
    encoding: "utf8",
  });
  const groups = []; // { file, lines: [] }
  let cur = null;
  for (const line of out.split(/\r?\n/)) {
    if (line.startsWith("+++ b/")) {
      cur = { file: line.slice(6), lines: [] };
      groups.push(cur);
    } else if (line.startsWith("+") && cur) {
      cur.lines.push(line.slice(1));
    }
  }
  return groups;
}

function formatFindings(findings) {
  return findings
    .map((f) => `    L${f.line}:${f.column}  '${f.token}'  ${f.snippet}`)
    .join("\n");
}

function runFull() {
  const files = collectFullFiles();
  let total = 0;
  for (const rel of files) {
    const findings = scanText(fs.readFileSync(path.join(root, rel), "utf8"));
    if (findings.length) {
      total += findings.length;
      console.error(`❌ ${rel}  (${findings.length})`);
      console.error(formatFindings(findings));
    }
  }
  if (total > 0) {
    console.error(
      `\n共 ${total} 处疑似内部标识符命中(脱敏门禁)。请替换为通用表述后重试。`
    );
    process.exit(1);
  }
  console.log(`✅ 脱敏全量扫描通过:${files.length} 个文件,无内部标识符命中。`);
}

function runAddedLineMode(diffArgs, label) {
  const groups = addedLinesFromDiff(diffArgs).filter((g) => inScope(g.file));
  let total = 0;
  for (const g of groups) {
    const findings = scanText(g.lines.join("\n"));
    if (findings.length) {
      total += findings.length;
      console.error(`❌ ${g.file}  新增行命中 (${findings.length})`);
      console.error(formatFindings(findings));
    }
  }
  if (total > 0) {
    console.error(
      `\n${label}:检测到 ${total} 处新增内部标识符(脱敏门禁)。请替换为通用表述后再提交。`
    );
    process.exit(1);
  }
  console.log(`✅ ${label}:无新增内部标识符。`);
}

// CLI(被 import 做单元测试时不执行)
const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes("--staged")) {
    runAddedLineMode("--cached", "pre-commit (--staged)");
  } else if (args.includes("--base")) {
    const ref = args[args.indexOf("--base") + 1];
    if (!ref) {
      console.error("--base 需要一个 git ref 参数,例如 --base origin/main");
      process.exit(2);
    }
    runAddedLineMode(`${ref}...HEAD`, `CI (--base ${ref})`);
  } else {
    runFull();
  }
}
