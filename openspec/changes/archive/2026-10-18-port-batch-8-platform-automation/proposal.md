# P2 批次 8 · 平台自动化线移植

## Why

仓库已覆盖创作方法论、发布策略与工具链，但缺少「真实平台操作配方」这一层：把歌发到平台、采集平台数据、在平台批量生成、切换网络环境、读取验证码。这 5 个源 skill 是一手实测沉淀的自动化配方，公开后对任何做 AI 音乐分发的人都有复用价值。

## What Changes

把 5 个源 skill 移植为公开自包含版：

| 源 skill | 目标名 | 关键改造点 |
|---|---|---|
| `ego-qishui-release` | `ego-qishui-release` | 三步向导配方保留；删除账号细节与私有专辑数据；验证码标注可选依赖；evals 随行 |
| `ego-qishui-stats` | `ego-qishui-stats` | 数据中心采集与三件套保留；删除私有台账与收入口径中的账号数据；脚本随行 |
| `ego-miaoxiang-create` | `ego-miaoxiang-create` | 平台公开操作配方保留；删除私有词稿/专辑/批次引用 |
| `astrill-control` | `astrill-control` | 三命令 + 双探针保留；剥离源工程网络策略矩阵，改为用户自填模板；脚本随行 |
| `sms-code-reader` | `sms-code-reader` | chat.db 直读配方保留；删除发行流程绑定；注明完全磁盘访问与 iPhone-Mac 同步前置 |

## Impact

- `skills/` 新增 5 个目录（含 2 个随行脚本、5 组 evals）
- `docs/generated/skills-index.md` 由生成脚本更新
- 不触碰既有 skill 与 `.claude/skills/` 生成物

## Capabilities

- `ego-qishui-release`：三步向导发行自动化与发行 QC
- `ego-qishui-stats`：数据中心采集与口径判读
- `ego-miaoxiang-create`：平台生成自动化与资产库存
- `astrill-control`：VPN 三命令与 DNS 残留恢复
- `sms-code-reader`：chat.db 验证码读取与同步故障恢复
