---
name: astrill-control
version: 0.1.0
user-invocable: true
description: 控制 macOS 上 Astrill VPN 的开关与状态查询（连接/断开/状态三命令，GUI 菜单 Toggle 锚点加双探针验证），并检测 Astrill 断开后的 DNS/路由残留。触发场景：任何提到 Astrill、VPN 开/关、VPN on/off、断开 VPN、连接 VPN、发布前关代理、检查 VPN 状态、出口 IP 检查的任务；需要「暂时切换 VPN 状态」的流程编排；某个平台在代理下上传不稳定需要直连时。前置依赖：运行 agent 的宿主 App（Terminal / iTerm2 / VS Code / CMUX 等）已获 macOS「辅助功能」授权（一次性配置）。反向边界：不控制其他 VPN 客户端，也不修改系统代理规则。
---

# Astrill VPN 控制（GUI 菜单 Toggle 锚点 + 双探针验证）

> 原理：Astrill macOS 版**无官方 CLI**，但其应用菜单栏 `Menu → Toggle ON/OFF` 可被 AppleScript（System Events）按名字定位点击——菜单项文本即连接状态。
> 实测基础：OpenVPN 全局隧道模式，on↔off 往返验证。

## 用法

```bash
# 在 skill 目录下运行（安装后路径为 .claude/skills/astrill-control/）
bash scripts/astrill.sh status   # 查状态（app/隧道/GUI/出口 IP）
bash scripts/astrill.sh on       # 连接（幂等：已连则跳过）
bash scripts/astrill.sh off      # 断开（幂等：已断则跳过；app 保活）
```

## DNS 残留检测与恢复

**现象**：Astrill 隧道模式 off 后网络差/域名解析失败——DNS（10.x 虚拟段）与路由残留。实测这类残留会让后续平台上传反复异常（容易被误归因为「代理本身」）。

**off 后必做检测**（自动化，无需 GUI）：

```bash
# 1. 检测残留：scutil --dns 的 nameserver 出现 10.x 段 = 残留
scutil --dns | grep nameserver | grep -E "10\." && echo "⚠️ DNS 残留" || echo "✓ DNS 干净"
# 2. 默认路由走了 utun = 路由残留
route -n get default | grep -q utun && echo "⚠️ 路由残留" || echo "✓ 路由干净"
```

**恢复命令**（等价 GUI 的 Renew DHCP Lease，需 sudo）：

```bash
sudo networksetup -setdnsservers Wi-Fi Empty   # 清手动 DNS → 回 DHCP
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder  # 冲 DNS 缓存
# 仍异常时（完整 renew）：
sudo ipconfig set en0 BOOTP && sudo ipconfig set en0 DHCP
```

sudo 不可交互时 → 交用户执行（或 GUI：系统设置 → Wi-Fi → 详细信息 → TCP/IP → 续租 DHCP 租约）。

**纪律**：凡「发布/上传前需直连」的前置，不能只看 VPN 状态——必须 off + 本检测通过（相当于第三探针）。

## 状态机与探针

| 信号 | 采集方式 | 说明 |
|---|---|---|
| app 进程 | `pgrep -x astrill` | GUI 控制的前提；off 后保活，on 更快 |
| VPN 隧道 | `pgrep -x asovpnc` | OpenVPN 模式主判据；断开收尾约 10s（脚本已轮询容错） |
| GUI 菜单 | System Events 读 `Menu` 菜单项 | `Toggle OFF` 在场=已连接；`Toggle ON` 在场=未连接 |
| 出口 IP | `curl --max-time 6 ipinfo.io/ip` | 交叉验证（连上=海外节点 IP；断开=国内直连 IP） |

命令均为幂等：on 时已连接直接成功返回；off 时已断开直接成功返回。

## 前置配置（一次性）

**宿主 App 辅助功能授权**：系统设置 → 隐私与安全性 → 辅助功能 → 添加运行 agent 的宿主 App（Terminal / iTerm2 / VS Code / CMUX 等）。
未授权时脚本报 `GUI 不可达` 并在 status 中提示。

## 网络策略矩阵（按你的平台实测填写）

不同平台对网络的要求可能相反——完整工作流常需要在 VPN on/off 之间切换。先用自己的实测填一张矩阵，再决定编排顺序：

| 平台/操作 | 网络要求 | 实测依据 |
|---|---|---|
| <平台 A：上传/发布> | 🟢 直连 | <如：代理下上传反复异常，关代理一次成功> |
| <平台 B：创作/下载> | 🔴 VPN ON | <如：国内直连不可达> |
| <本地处理：音频母带/转码> | ⚪ 无所谓 | 纯本地命令 |

### 全流程自动编排（标准范式）

```bash
AST=scripts/astrill.sh   # 在 skill 目录下运行
bash $AST on     # ① 需要代理的平台段
# ...生成/下载...
bash $AST off    # ② 需要直连的平台段（双探针 + DNS 检测通过后再上传）
# ...上传/发布/电子签...
bash $AST on     # ③ 恢复用户日常（可选，问用户）
```

⚠️ 执行顺序敏感：`off` 必须发生在「上传第一步」之前；`on` 在代理段会话开始前。任何跨阶段长流程在阶段边界处调用本脚本切换，不要在同一个网络状态下跑完两种要求的平台。

## 已知边界

- Astrill 模式为 **OpenVPN**（全局隧道）时双探针都有效；若切到 **OpenWeb**（仅浏览器代理）模式，没有 `asovpnc` 隧道进程——脚本的 on/off 以 GUI 菜单为主判据，不会因缺隧道判失败，但「出口 IP」在 curl 下可能不反映浏览器代理状态。
- Toggle 断开收尾约 10 秒（隧道进程退出慢于 UI 切换），脚本轮询窗口 30s 已覆盖。
- `quit app` 方式（杀 app）也能断开但会丢 GUI 会话——脚本用 Toggle 方式保持 app 运行，后续 on 无需重新启动 app。
- macOS 升级或 Astrill 大版本更新可能改变菜单结构——若 `Menu` 菜单或 `Toggle ON/OFF` 菜单项消失，用 `osascript -e 'tell application "System Events" to tell process "Astrill" to get name of every menu of menu bar 1'` 重新探测菜单名并更新脚本。
- **改脚本时的 bash 陷阱**：`$var` 后紧跟中文/全角字符时，bash 会把 UTF-8 字节并入变量名（`set -u` 下报 unbound variable）——变量一律写 `${var}` 花括号形式（实测踩过）。
