#!/bin/bash
# astrill.sh — Astrill VPN 控制（macOS，GUI 菜单 Toggle 锚点 + 双探针验证）
# 用法: astrill.sh <status|on|off>
# 前置: 运行 agent 的宿主 App（Terminal / iTerm2 / VS Code / CMUX 等）已获「辅助功能」授权
# 判据: GUI 菜单文本为主判据；asovpnc 隧道进程为并行判据（OpenVPN 模式）。
#       OpenWeb（仅浏览器代理）模式没有隧道进程，on/off 以 GUI 菜单为准，不因缺隧道判失败。

set -u
APP="Astrill"
MENU_PROBE='tell application "System Events" to tell process "Astrill" to get name of every menu item of menu "Menu" of menu bar 1'

ip_probe() { curl -s --max-time 6 ipinfo.io/ip 2>/dev/null || echo "ip-query-failed"; }
tunnel_up() { pgrep -x asovpnc >/dev/null 2>&1; }
app_running() { pgrep -x astrill >/dev/null 2>&1; }

# 读 Menu 菜单项，输出 "TOGGLE_ON" / "TOGGLE_OFF" / "NO_APP" / "GUI_ERROR"
menu_state() {
  if ! app_running; then echo "NO_APP"; return; fi
  local items
  items=$(osascript -e "$MENU_PROBE" 2>/dev/null)
  if [[ -z "$items" ]]; then echo "GUI_ERROR"; return; fi
  if [[ "$items" == *"Toggle OFF"* ]]; then echo "TOGGLE_OFF"   # 已连接（可断开）
  elif [[ "$items" == *"Toggle ON"* ]]; then echo "TOGGLE_ON"   # 未连接（可连接）
  else echo "GUI_ERROR"; fi
}

click_toggle() {  # $1 = "Toggle ON" | "Toggle OFF"
  osascript -e "tell application \"System Events\" to tell process \"Astrill\" to click menu item \"$1\" of menu \"Menu\" of menu bar 1" >/dev/null 2>&1
}

wait_gui_ready() {  # 等 app GUI 菜单可达（open 后 GUI 初始化需数秒；循环 10×2s=20s）
  for i in $(seq 1 10); do
    local s; s=$(menu_state)
    [[ "$s" == "TOGGLE_ON" || "$s" == "TOGGLE_OFF" ]] && return 0
    sleep 2
  done
  return 1
}

cmd_status() {
  echo "── Astrill 状态 ──"
  app_running && echo "app 进程:    运行中" || echo "app 进程:    未运行"
  tunnel_up   && echo "VPN 隧道:    已连接" || echo "VPN 隧道:    未连接（OpenWeb 模式下属正常）"
  local st; st=$(menu_state)
  case "$st" in
    TOGGLE_OFF) echo "GUI 菜单:    Toggle OFF（已连接态）" ;;
    TOGGLE_ON)  echo "GUI 菜单:    Toggle ON（未连接态）" ;;
    NO_APP)     echo "GUI 菜单:    app 未运行" ;;
    GUI_ERROR)  echo "GUI 菜单:    不可达（检查宿主 App 辅助功能授权/App 启动）" ;;
  esac
  echo "出口 IP:     $(ip_probe)"
}

cmd_on() {
  local st; st=$(menu_state)
  if [[ "$st" == "NO_APP" ]]; then
    echo "app 未运行，启动 $APP ..."
    open -a "$APP" || { echo "❌ 启动失败（/Applications/Astrill.app 存在？）"; exit 1; }
    wait_gui_ready || { echo "❌ GUI 20s 内未就绪（检查宿主 App 辅助功能授权）"; exit 1; }
    st=$(menu_state)
  fi
  if [[ "$st" == "GUI_ERROR" ]]; then echo "❌ GUI 不可达——检查宿主 App（Terminal/iTerm2/VS Code/CMUX）的辅助功能授权"; exit 1; fi
  if [[ "$st" == "TOGGLE_OFF" ]]; then
    # 幂等短路径也跑双探针：GUI 已连接 + 隧道状态如实报告
    if tunnel_up; then echo "已处于连接状态（GUI + 隧道），无需操作"; else echo "已处于连接状态（GUI；隧道进程不在，OpenWeb 模式属正常），无需操作"; fi
    exit 0
  fi

  local ip_before; ip_before=$(ip_probe)
  echo "连接中（点击 Toggle ON）..."
  click_toggle "Toggle ON" || { echo "❌ 点击失败"; exit 1; }

  # 主判据：GUI 变成 Toggle OFF（已连接）；并行判据：隧道进程（OpenVPN 模式）
  local reached=0
  for i in $(seq 1 15); do
    sleep 3
    if [[ "$(menu_state)" == "TOGGLE_OFF" ]]; then reached=1; break; fi
  done
  if [[ "$reached" == "1" ]]; then
    local ip_now; ip_now=$(ip_probe)
    if tunnel_up; then
      echo "✅ 已连接（GUI + 隧道）| 出口 IP: ${ip_now}（操作前: ${ip_before}）"
    else
      echo "✅ GUI 已连接 | 隧道进程不在（OpenWeb 模式属正常；OpenVPN 模式下请复查）| 出口 IP: ${ip_now}"
    fi
    exit 0
  fi
  echo "❌ 45s 内 GUI 未切换到已连接"; exit 1
}

cmd_off() {
  local st; st=$(menu_state)
  if [[ "$st" == "NO_APP" ]]; then echo "app 未运行＝未连接，无需操作"; exit 0; fi
  if [[ "$st" == "GUI_ERROR" ]]; then echo "❌ GUI 不可达——检查宿主 App（Terminal/iTerm2/VS Code/CMUX）的辅助功能授权"; exit 1; fi
  if [[ "$st" == "TOGGLE_ON" ]]; then
    if tunnel_up; then echo "已处于断开状态（GUI；隧道进程收尾中）"; else echo "已处于断开状态（GUI + 无隧道），无需操作"; fi
    exit 0
  fi

  # GUI=TOGGLE_OFF（已连接）→ 无条件点击 Toggle OFF（OpenWeb 下同样生效）
  echo "断开中（点击 Toggle OFF，app 保活）..."
  click_toggle "Toggle OFF" || { echo "❌ 点击失败"; exit 1; }

  local reached=0
  for i in $(seq 1 10); do
    sleep 3
    if [[ "$(menu_state)" == "TOGGLE_ON" ]]; then reached=1; break; fi
  done
  if [[ "$reached" == "1" ]]; then
    echo "✅ 已断开 | app 运行中 | 出口 IP: $(ip_probe)"
    if tunnel_up; then echo "⚠️ 隧道进程仍在（收尾中，可稍后复查）"; fi
    echo "⚠️ 下一步必须跑 DNS/路由残留检测（见 SKILL.md「DNS 残留检测与恢复」）"
    exit 0
  fi
  echo "❌ 30s 内 GUI 未切换到已断开（fallback: osascript -e 'quit app \"Astrill\"'）"; exit 1
}

case "${1:-}" in
  status) cmd_status ;;
  on)     cmd_on ;;
  off)    cmd_off ;;
  *) echo "用法: astrill.sh <status|on|off>"; exit 2 ;;
esac
