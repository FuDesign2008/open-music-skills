# astrill-control Specification

## Purpose
定义 macOS 上 Astrill VPN 控制契约：status/on/off 三命令、GUI 菜单锚点与双探针验证、DNS 与路由残留检测恢复，以及用户自填的网络策略矩阵模板。

## ADDED Requirements

### Requirement: 三命令与幂等

`astrill-control` SHALL 提供 status/on/off 三命令；on 在已连接时 SHALL 直接成功，off 在已断开时 SHALL 直接成功；off SHALL 用 Toggle 方式保活 app。

#### Scenario: 重复 off

- **WHEN** VPN 已断开时执行 off
- **THEN** 脚本 SHALL 输出「已处于断开状态」并以 0 退出，不得报错

### Requirement: 双探针

skill SHALL 以 GUI 菜单文本为主判据、VPN 隧道进程为并行判据；on/off SHALL 在探针确认后才报成功；出口 IP SHALL 作交叉验证。

#### Scenario: GUI 不可达

- **WHEN** System Events 读不到 Menu 菜单
- **THEN** 脚本 SHALL 报「GUI 不可达」并提示检查辅助功能授权

### Requirement: DNS 与路由残留

off 后 skill SHALL 检测 `scutil --dns` 的 10.x nameserver 与默认路由 utun；有残留 SHALL 按恢复命令处理或在 sudo 不可用时交用户；「发布前直连」前置 SHALL 包含本检测。

#### Scenario: DNS 残留

- **WHEN** off 后 `scutil --dns` 仍出现 10.x nameserver
- **THEN** skill SHALL 执行或建议 DNS 恢复，不得直接进入上传步骤

### Requirement: 策略矩阵为模板

skill SHALL 以「按平台实测填写」的矩阵模板给出编排范式；SHALL NOT 把某一工程的平台网络要求写成通用结论。

#### Scenario: 新平台接入

- **WHEN** 用户要在新平台执行上传
- **THEN** skill SHALL 要求先实测该平台在代理与直连下的表现并填入矩阵，再决定切换顺序
