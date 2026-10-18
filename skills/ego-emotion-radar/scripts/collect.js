// ego-emotion-radar · 七源情绪快照采集
// 用法：ego-browser nodejs < skills/ego-emotion-radar/scripts/collect.js
// 输出：/tmp/emotion-radar-<YYYY-MM-DD>/emotion-radar-<YYYY-MM-DD>.json
// （ego-browser eval 环境无法可靠定位项目根，故默认落 /tmp；入库时手工复制到项目调研目录）
// 纪律：单源失败不阻塞其余源；不做重试轰炸（失败即降级并记录 error）
import fs from 'fs';
import path from 'path';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const outDir = path.join('/tmp', `emotion-radar-${date}`);
fs.mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}/emotion-radar-${date}.json`;

const task = await taskSpace('emotion-radar');
const pages = await task.pages();
const page = pages[0] || await task.newPage();

const result = { date, collectedAt: now.toISOString(), sources: {} };

async function grabText(key, url, wait = 7000) {
  try {
    await page.goto(url, { timeout: 60000 });
    await sleep(wait);
    const r = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      text: (document.body.innerText || '').slice(0, 9000),
    }));
    result.sources[key] = r;
    console.log(`[ok] ${key} len=${r.text.length}`);
  } catch (e) {
    result.sources[key] = { error: String(e).slice(0, 200) };
    console.log(`[ERR] ${key} ${String(e).slice(0, 80)}`);
  }
}

// ---------- 1. 豆瓣（需登录） ----------
await grabText('douban_gallery', 'https://www.douban.com/gallery/');
await grabText('douban_explore', 'https://www.douban.com/explore');
await grabText('douban_groups', 'https://www.douban.com/group/explore');

// ---------- 2. 微信读书（公开，7 榜） ----------
const WEREAD = ['rising', 'hot_search', 'newbook', 'general_novel_rising', 'all', 'newrating_publish', 'newrating_potential_publish'];
for (const tab of WEREAD) {
  await grabText(`weread_${tab}`, `https://weread.qq.com/web/category/${tab}`, 6500);
}

// ---------- 3. 知乎（公开 API，上限 30） ----------
try {
  await page.goto('https://www.zhihu.com/hot', { timeout: 60000 });
  await sleep(4000);
  const z = await page.evaluate(async () => {
    const r = await fetch('/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true', { credentials: 'include' });
    const j = await r.json();
    const data = (j.data || []).map(d => ({
      title: d.target?.title || '',
      hot: d.detail_text || '',
    }));
    return { status: r.status, items: data };
  });
  result.sources.zhihu = z;
  console.log(`[ok] zhihu n=${z.items.length}`);
} catch (e) {
  result.sources.zhihu = { error: String(e).slice(0, 200) };
  console.log(`[ERR] zhihu ${String(e).slice(0, 80)}`);
}

// ---------- 4. 百度（5 tab） ----------
for (const tab of ['homepage', 'realtime', 'novel', 'movie', 'teleplay']) {
  await grabText(`baidu_${tab}`, `https://top.baidu.com/board?tab=${tab}`, 6500);
}

// ---------- 5. 虎扑步行街（需登录；滚动加载） ----------
try {
  await page.goto('https://bbs.hupu.com/all-gambia', { timeout: 60000 });
  await sleep(6000);
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy(0, 1500));
    await sleep(1400);
  }
  const h = await page.evaluate(() => ({
    url: location.href,
    text: (document.body.innerText || '').slice(0, 12000),
  }));
  result.sources.hupu_gambia = h;
  console.log(`[ok] hupu len=${h.text.length}${h.text.includes('登录') ? ' (可能未登录)' : ''}`);
} catch (e) {
  result.sources.hupu_gambia = { error: String(e).slice(0, 200) };
  console.log(`[ERR] hupu ${String(e).slice(0, 80)}`);
}

// ---------- 6. B站热搜（公开 API） ----------
try {
  await page.goto('https://www.bilibili.com/', { timeout: 60000 });
  await sleep(4000);
  const b = await page.evaluate(async () => {
    const r = await fetch('https://s.search.bilibili.com/main/hotword?limit=50', { credentials: 'include' });
    const j = await r.json();
    return { status: r.status, items: (j.list || []).map(x => x.show_name || x.keyword || '') };
  });
  result.sources.bilibili = b;
  console.log(`[ok] bilibili n=${b.items.length}`);
} catch (e) {
  result.sources.bilibili = { error: String(e).slice(0, 200) };
  console.log(`[ERR] bilibili ${String(e).slice(0, 80)}`);
}

// ---------- 7. 微博热搜（公开 API） ----------
try {
  await page.goto('https://m.weibo.cn/', { timeout: 60000 });
  await sleep(3000);
  const w = await page.evaluate(async () => {
    const url = 'https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot';
    const r = await fetch(url, { credentials: 'include' });
    const j = await r.json();
    const cards = (j.data && j.data.cards) || [];
    const items = [];
    for (const c of cards) {
      const list = (c.card_group || (c.card && c.card.card_group) || []);
      for (const g of list) if (g.desc) items.push(g.desc);
    }
    return { status: r.status, items };
  });
  result.sources.weibo = w;
  console.log(`[ok] weibo n=${w.items.length}`);
} catch (e) {
  result.sources.weibo = { error: String(e).slice(0, 200) };
  console.log(`[ERR] weibo ${String(e).slice(0, 80)}`);
}

fs.writeFileSync(outFile, JSON.stringify(result, null, 1));
console.log(`SAVED ${outFile}`);
