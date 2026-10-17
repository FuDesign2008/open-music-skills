---
name: sms-code-reader
version: 0.1.0
user-invocable: true
description: 读取 macOS Messages 短信验证码（chat.db 直读）——自动化流程中替代人工报验证码。触发场景：电子签/登录/意愿认证等需要手机验证码的自动化环节、流程走到验证码步骤、「读取验证码」「自动获取验证码」「短信验证码自动化」、排查「码收不到/读到旧码/同步停了」。前置依赖：执行终端已授权完全磁盘访问（Full Disk Access）；iPhone 与 Mac 的短信转发已开启。返回验证码字符串，或失败原因加 fallback 建议。反向边界：不读取非验证码短信，不做短信管理或备份。
---

# 短信验证码自动读取

> 原理：验证码短信经 iPhone「短信转发」同步到 Mac Messages，落库 `~/Library/Messages/chat.db`（SQLite），直读提取。
> 适用范围：任何需要短信验证码的自动化流程（电子签、登录、意愿认证等）——不绑定具体平台。

## 前置检查（首次使用/失败时先查）

```bash
# 1. 权限检查（authorization denied = 未授权）
sqlite3 ~/Library/Messages/chat.db "SELECT count(*) FROM message LIMIT 1;" 2>&1
# authorization denied → 引导用户：System Settings → Privacy & Security → Full Disk Access
#   → 添加终端 App（Terminal/iTerm2/VS Code）→ 重启终端生效
# 一键直达面板：open "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles"

# 2. 同步健康诊断（读不到新码时）
ls -la ~/Library/Messages/chat.db*   # db/wal 的 mtime——若 mtime 停在数小时前=零同步
pgrep -lf Messages                    # 进程活
nc -z -w 3 courier.push.apple.com 5223 2>&1   # APNs 通
# 库活但无新短信 → iPhone 侧问题：短信转发开关重开（Settings→Apps→Messages→Text Message Forwarding）
```

## 核心读取（触发验证码后调用）

```bash
# 通用：输出「时间戳 | 消息全文」，再从最新一行用 grep -oE '[0-9]{4,8}' 提取数字
# （不同平台句式不同：全角/半角冒号、「验证码为」「您的验证码」等，勿依赖固定 substr 偏移）
sqlite3 ~/Library/Messages/chat.db "SELECT datetime(date/1000000000 + 978307200, 'unixepoch', 'localtime') || ' | ' || text FROM message WHERE text LIKE '%验证码%' ORDER BY date DESC LIMIT 3;"

# 指定发件人（把 <发件人关键词> 换成平台名）
sqlite3 ~/Library/Messages/chat.db "SELECT datetime(date/1000000000 + 978307200, 'unixepoch', 'localtime') || ' | ' || text FROM message WHERE text LIKE '%<发件人关键词>%验证码%' ORDER BY date DESC LIMIT 1;"
```

**新鲜度判定（必须）**：取回的时间戳与当前时间比对，**只接受 0-270 秒内**的码（验证码通常 5 分钟有效 + 同步延迟余量）——旧码输入必失败；同步延迟时可能读到数小时前的码。
短时间读不到新码**不等于没收到**：短信实体已到达但 DB 晚可见是常态，**不要重复触发**（重触发 = 发新码、旧码作废、网关限流更紧），延长轮询窗即可。

## 时序节奏（实测）

1. 触发验证码（网页点「获取验证码」）→ 平台显示「已发送」+ 60s 倒计时
2. **等 30-90 秒**（iPhone 接收 + iCloud 同步到 Mac 的延迟；同网络下可低至 2 秒）
3. 轮询读取（每 15s 一次，最多 18 次 ≈ 270s，覆盖入库延迟）→ 取时间窗内的码 → 输入
4. 同步故障诊断（前置检查 2）→ 修复（重开短信转发）→ 重触发再读
5. 全部失败 → **fallback：请用户看手机报码**（实测 ~10 秒）

## 已知故障模式（实测）

| 故障 | 特征 | 处理 |
|---|---|---|
| 权限未授权 | `authorization denied` | 完全磁盘访问 + 重启终端 |
| 同步通道断 | 库活（mtime 新）但无新短信；昨日码可读今日码缺 | iPhone 重开短信转发开关（会话重建需数分钟）；仍不通 = 人工报码 fallback |
| 读到旧码 | 时间窗判定 STALE | 丢弃重读；**严禁输入旧码** |
| **iCloud 同步回滚** | 刚读到的码（2 分钟内、判定 FRESH）稍后复查从库中**消失**，最新记录回退到数小时前——iCloud 同步以旧快照覆盖本地 WAL | **读到立即用**（取码 → 填入 → 确定一气呵成，勿间隔复查）；码失效/对不上则重触发再读，勿信库内「最新」记录 |
| **Mac Messages 同步停滞** | 轮询窗内新码不来 + **`chat.db-wal` mtime 冻结**（停在最后活动时刻）；Messages 进程活 + APNs 通均正常（对照排除 iPhone 侧）——Mac 本地库写入停滞 | `killall Messages` + `open -a Messages` 重启 → wal mtime 立即更新、同步秒级恢复；恢复后失败步骤走恢复轮 |

## Mac 侧同步停滞：判据与恢复

**场景**：多次触发中偶发一次读不到码，排查后故障在 **Mac 侧**（与 iPhone 侧故障并列的第三类同步故障）。

**判据三步**（chat.db 在轮询窗内无新码时按序执行）：

1. **`chat.db-wal` mtime 是否冻结**——停在最后活动时刻（>5min 无更新）且无新码 = Mac Messages 同步停滞信号；
2. **对照排除 iPhone 侧**：`pgrep -lf Messages` 进程活 + `nc -z -w 3 courier.push.apple.com 5223` APNs 通（ICMP 不通 = Apple 常态，非故障）——两边皆正常时，故障在 **Mac 本地库写入**，而非转发链路/网关限流；
3. **区别于 iPhone 侧三类**（低电量省电/离家不同网络/夜间自动省电）：本型手机侧无变量可查——诊断顺序反过来（先查 Mac 的 wal mtime，再查手机）。

**恢复配方（秒级）**：`killall Messages` + `open -a Messages` → **wal mtime 立即更新、同步恢复**。恢复后：①在跑的链继续（用后续步骤验证链路已通）②失败步骤走**恢复轮**——重触发验证码 → 轮询 → 填码提交。

**纪律复用**：轮询窗内无码**不重复触发**——首轮码可能从未同步入库，重复触发无益且烧限流额度；恢复后新触发一次即中。

## iPhone 低电量省电模式暂停转发

**低电量（<20%）→ iOS 省电模式 → 短信转发暂停**——这是「同步时好时坏」的最可能根因（容易被误判为网络/会话问题）。

- 特征：无规律断续（电量波动即断续）；充电至 >20% 后恢复。
- 排查口诀：**先问 iPhone 电量**，再查网络/开关。
- 无人值守前检查项：确认 iPhone 电量 >50%（或插电）。
- **夜间自动省电模式**：夜间长跑断同步而电量检查通过时，注意 iPhone 可能定时/自动进入省电模式——跨夜无人值守任务预留人工报码 fallback，预算与计划留此变量。

## 核心基础设施依赖

**iPhone 与 Mac 必须在同一网络环境**——短信转发（Text Message Forwarding）依赖同网络推送通道：

| 场景 | 同步状态 |
|---|---|
| iPhone 与 Mac 同一网络 | ✅ **可低至 2 秒进库** |
| iPhone 被带走（离家/不同网络） | ❌ **完全断同步**——新码全部缺失，回来即恢复 |

**诊断口诀**：读不到新码时，先问「iPhone 在家吗/和 Mac 同网络吗」——**基础设施问题优先于软件排查**（曾出现权限/进程/APNs 全部正常但忽略了这个前提）。

**无人值守含义**：用户离家场景下，验证码环节**必然**回退到人工报码（~10 秒/次）或流程中断——预算与计划需预留此变量。

## 隐私边界

仅查询验证码模式消息（`LIKE '%验证码%'`），不读取/存储其他短信内容；时间窗过滤进一步缩小暴露面。读取结果只用于当前自动化步骤、用后即弃。注意：命令输出可能进入 agent transcript 或 shell history——避免 `set -x`，不要把验证码写入长期存储或提交到仓库；宿主日志不由本 skill 控制。
