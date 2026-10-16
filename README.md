# Open Music Skills

![GitHub stars](https://img.shields.io/github/stars/FuDesign2008/open-music-skills?style=flat-square)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/FuDesign2008/open-music-skills)
[![Version](https://img.shields.io/github/v/release/FuDesign2008/open-music-skills?style=flat-square)](https://github.com/FuDesign2008/open-music-skills/releases)
![Skills](https://img.shields.io/badge/skills-1-informational?style=flat-square)

**English** | **[中文](README.zh-CN.md)**

<!-- banner -->
```text
╔════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                    ║
║   ██████╗ ██████╗ ███████╗███╗   ██╗    ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗    ║
║  ██╔═══██╗██╔══██╗██╔════╝████╗  ██║    ████╗ ████║██║   ██║██╔════╝██║██╔════╝    ║
║  ██║   ██║██████╔╝█████╗  ██╔██╗ ██║    ██╔████╔██║██║   ██║███████╗██║██║         ║
║  ██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║    ██║╚██╔╝██║██║   ██║╚════██║██║██║         ║
║  ╚██████╔╝██║     ███████╗██║ ╚████║    ██║ ╚═╝ ██║╚██████╔╝███████║██║╚██████╗    ║
║   ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝    ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝    ║
║      ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗                                   ║
║      ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝                                   ║
║      ███████╗█████╔╝ ██║██║     ██║     ███████╗                                   ║
║      ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║                                   ║
║      ███████║██║  ██╗██║███████╗███████╗███████║                                   ║
║      ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝                                   ║
║                                                                                    ║
║  THE OPEN MUSIC SKILLS ECOSYSTEM                                                   ║
║  Claude Code • Cursor • OpenCode                                                   ║
║                                                                                    ║
╚════════════════════════════════════════════════════════════════════════════════════╝
```
<!-- /banner -->

An open library of agent skills for music — **creation & production**, **distribution**, **growth**, and **tooling**. Install as **SKILL.md** via `npx skills` on **Claude Code**, **Cursor**, **OpenCode**, and other agents that support the skills CLI. Full skill list (versions and triggers): **[Skills Index](docs/generated/skills-index.md)**.

## What's inside

| Area | Covers |
|---|---|
| **Creation & production** | Prompt engineering for AI music platforms, lyric writing, arrangement & style control, mastering checks |
| **Distribution** | Releasing to streaming platforms, metadata, cover art, copyright, catalog management |
| **Growth** | Play/revenue analytics, playlist pitching, content calendars, A/B tests, natural-selection portfolio reviews |
| **Tooling** | Audio processing, DAW automation, MIDI, asset management, format conversion |

## Install & Update

Non-interactive global install (recommended; avoids PromptScript ✗ noise):

```bash
git clone https://github.com/FuDesign2008/open-music-skills.git
cd open-music-skills
node scripts/install-skills.mjs
```

Or interactive / single-agent via the underlying CLI:

```bash
npx skills add FuDesign2008/open-music-skills -g
```

Update:

```bash
npx skills update
```

This repo ships **skills only** — no slash commands, hooks, or marketplace plugins.

## Contributing

1. Fork → add or modify `skills/<name>/SKILL.md`
2. Author the skill through the **`skill-creator` flow** (draft → test cases → evaluate → iterate). If you don't have that tool available, follow the equivalent flow — **do not skip evaluation**
3. Run `node scripts/gen-skill-docs.mjs` to regenerate the index and commit `docs/generated/skills-index.md` (**do not edit manually** — CI `verify` will fail)
4. Follow [AGENTS.md](AGENTS.md) for the SKILL.md format, naming conventions, and quality gates
5. Open a Pull Request

## Releases

Versioning is automated: a push to `main` touching `skills/**` bumps `package.json`, creates an annotated tag, and publishes a GitHub Release. Human-readable notes live in [RELEASE-NOTES.md](RELEASE-NOTES.md).

## License

MIT License — see [LICENSE](LICENSE).
