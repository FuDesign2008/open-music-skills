# Open Music Skills

![GitHub stars](https://img.shields.io/github/stars/FuDesign2008/open-music-skills?style=flat-square)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/FuDesign2008/open-music-skills)
[![Version](https://img.shields.io/github/v/release/FuDesign2008/open-music-skills?style=flat-square)](https://github.com/FuDesign2008/open-music-skills/releases)
![Skills](https://img.shields.io/badge/skills-1-informational?style=flat-square)

**[English](README.md)** | **中文**

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

music 相关 agent skill 的开放库 —— 覆盖**创作生产**、**发布分发**、**运营增长**、**工具链技术**四类。以 **SKILL.md** 形态分发，可经 `npx skills` 安装到 **Claude Code**、**Cursor**、**OpenCode** 等支持 skills CLI 的 agent。完整 skill 列表（版本与触发条件）见 **[Skills 索引](docs/generated/skills-index.md)**。

## 内容范围

| 类别 | 覆盖 |
|---|---|
| **创作生产** | AI 音乐平台的 prompt 工程、歌词创作、编曲与风格控制、母带验收 |
| **发布分发** | 上架流媒体平台、元数据、封面、版权、作品库管理 |
| **运营增长** | 播放/收入数据复盘、歌单投放、内容日历、A/B 测试、自然选择式组合复盘 |
| **工具链技术** | 音频处理、DAW 自动化、MIDI、素材管理、格式转换 |

## 安装与更新

非交互全局安装（推荐；避开 PromptScript ✗ 噪音）：

```bash
git clone https://github.com/FuDesign2008/open-music-skills.git
cd open-music-skills
node scripts/install-skills.mjs
```

或经底层 CLI 交互式 / 单 agent 安装：

```bash
npx skills add FuDesign2008/open-music-skills -g
```

更新：

```bash
npx skills update
```

本仓库**只分发 skill** —— 不含斜杠命令、钩子或 marketplace 插件。

## 贡献

1. Fork → 新增或修改 `skills/<name>/SKILL.md`
2. skill 的创作与编辑须走 **`skill-creator` 流程**（起草 → test cases → 评测 → 迭代）。无此工具时遵循等效流程，**不得跳过评测**
3. 运行 `node scripts/gen-skill-docs.mjs` 重生成索引并提交 `docs/generated/skills-index.md`（**勿手改** —— CI `verify` 会失败）
4. 遵循 [AGENTS.md](AGENTS.md) 的 SKILL.md 格式、命名约定与质量门禁
5. 提交 Pull Request

## 发布

版本自动化：推送 main 且改动含 `skills/**` → bump `package.json`、打 annotated tag、发布 GitHub Release。人读的版本说明见 [RELEASE-NOTES.md](RELEASE-NOTES.md)。

## 许可

MIT License —— 见 [LICENSE](LICENSE)。
