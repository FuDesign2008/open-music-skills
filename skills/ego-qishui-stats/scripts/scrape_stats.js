// 汽水合作平台数据中心批量抓取（ego-qishui-stats skill 配套）
// 用法：在本 skill 目录下 `ego-browser nodejs < scripts/scrape_stats.js`
// 环境变量：STATS_OUT_DIR（截图输出目录，默认 screenshots/<本地日期>）
// 产物：stdout 末尾一行 `RESULT_JSON {...}`（三周期 8 指标）+ 每周期 CDP 截图
// ⚠️ 脚本只做体力活：截图目视选中态、方向判读、CSV 追加、批次笔记仍须按 SKILL.md 流程人工完成
const task = await useOrCreateTaskSpace('qishui console statistics data')
const fs = await import('node:fs')

// 本地日期（勿用 toISOString——UTC 在 UTC+8 凌晨会落到前一天）
const d = new Date()
const pad = (n) => String(n).padStart(2, '0')
const DATE = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const OUT = process.env.STATS_OUT_DIR || ('screenshots/' + DATE)
fs.mkdirSync(OUT, { recursive: true })

// ⚠️ refs 每次会话不同：先跑一次 snapshotText() 从输出里确认三个周期按钮的实际 @N 再填这里。
//    若 refs 法点错按钮（见 SKILL.md 陷阱 7），改用坐标法：枚举 button 文本取 rect 中心 click([x,y])。
const periods = [
  { label: '近1天',  ref: '@REPLACE_1D',  file: 'qishui-stats-1d.png' },
  { label: '近7天',  ref: '@REPLACE_7D',  file: 'qishui-stats-7d.png' },
  { label: '近30天', ref: '@REPLACE_30D', file: 'qishui-stats-30d.png' },
]

const result = {}
const skipped = []
for (const p of periods) {
  if (p.ref.includes('REPLACE')) {
    skipped.push(p.label)
    cliLog('SKIP ' + p.label + ': ref 未填写（先跑 snapshotText 取实际 @N）')
    continue
  }
  await snapshotText()
  await click(p.ref)
  await wait(2.5)
  const cards = await js(String.raw`(() => {
    const out = []
    document.querySelectorAll('button').forEach(b => {
      const t = b.innerText
      if (/(指数|播放量|投稿量|点赞数)/.test(t) && /\d/.test(t)) {
        const img = b.querySelector('img')
        let svg = ''
        if (img && typeof img.src === 'string' && img.src.startsWith('data:')) {
          try { svg = atob(img.src.split(',')[1] || '') } catch (e) { svg = '' }
        }
        out.push({ raw: t.replace(/\n/g, '|'), svg: svg.replace(/\s+/g, '') })
      }
    })
    return out
  })()`)
  // svg 全文 hash 分组（仅供参考：方向以截图为唯一判据）
  const groups = {}
  cards.forEach(c => {
    const h = c.svg.length + '_' + c.svg.slice(0, 60).slice(-30) + '_' + c.svg.slice(-60)
    c.dirKey = h
    groups[h] = (groups[h] || 0) + 1
  })
  // CDP 截图存盘
  const shot = await cdp('Page.captureScreenshot', { format: 'png' })
  const outPath = OUT + '/' + p.file
  fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'))
  result[p.label] = cards.map(c => ({ raw: c.raw, dirKey: c.dirKey.slice(0, 24) }))
  cliLog('=== ' + p.label + ' ===')
  cards.forEach(c => cliLog(c.raw))
  cliLog('dirKeys: ' + [...new Set(cards.map(c => c.dirKey))].map(k => k.slice(0, 20) + '(' + cards.filter(x => x.dirKey === k).length + ')').join('  '))
  cliLog('screenshot: ' + outPath)
}
cliLog('RESULT_JSON ' + JSON.stringify(result))
if (skipped.length) cliLog('SKIPPED ' + skipped.join(','))
cliLog('DONE')
