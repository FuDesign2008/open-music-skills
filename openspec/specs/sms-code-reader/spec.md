# sms-code-reader Specification

## Purpose
定义 macOS 短信验证码读取契约：chat.db 直读、完全磁盘访问与 iPhone-Mac 同步前置、时间窗判定、三类同步故障恢复与隐私边界。

## Requirements

### Requirement: 前置检查

`sms-code-reader` SHALL 先检查完全磁盘访问（`authorization denied` 时给授权指引）与同步健康（db/wal mtime、Messages 进程、APNs 连通）；SHALL 声明 iPhone 与 Mac 需在同一网络且短信转发已开启。

#### Scenario: 权限未授权

- **WHEN** sqlite3 返回 authorization denied
- **THEN** skill SHALL 引导用户添加终端到完全磁盘访问并重启终端，不得继续轮询

### Requirement: 时间窗与不重复触发

skill SHALL 只接受 0-270 秒内的码；超窗 SHALL 判 STALE 并丢弃；轮询窗内无新码 SHALL NOT 重复触发「获取验证码」。

#### Scenario: 码迟到

- **WHEN** 触发后 2 分钟 DB 仍无新码
- **THEN** skill SHALL 延长轮询窗而非重触发，避免旧码作废与网关限流

### Requirement: 同步故障分类与恢复

skill SHALL 区分 iPhone 侧（低电量省电、离家不同网络、夜间省电）、Mac 侧（wal mtime 冻结）与 iCloud 同步回滚（刚读到的码稍后从库中消失）三类故障；Mac 侧停滞 SHALL 用 `killall Messages` + `open -a Messages` 恢复；iCloud 回滚 SHALL 要求读到立即用、勿间隔复查；全部失败 SHALL 给人工报码 fallback。

#### Scenario: wal mtime 冻结

- **WHEN** chat.db-wal mtime 停在最后活动时刻且 Messages 进程与 APNs 均正常
- **THEN** skill SHALL 判定 Mac 本地库写入停滞并重启 Messages

#### Scenario: iCloud 快照回滚

- **WHEN** 刚读到的码在复查时从库中消失、最新记录回退
- **THEN** skill SHALL 按「读到立即用」处理，码失效则重触发，不得相信库内「最新」记录

### Requirement: 隐私边界

skill SHALL 只查询含「验证码」模式的消息；SHALL NOT 读取或存储其他短信内容；读取结果 SHALL 只用于当前自动化步骤。

#### Scenario: 查询实现

- **WHEN** 执行读取 SQL
- **THEN** WHERE 子句 SHALL 含 `LIKE '%验证码%'` 过滤，不得全表导出短信
