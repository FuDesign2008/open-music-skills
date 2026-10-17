# 调研 Agent 标准化 Prompt 模板

> **用途**：在 `music-dna-extraction` skill 的 Step 2 中，为每个后台调研 agent（`general-purpose` 子代理）提供标准化的调研 prompt。
> **使用方式**：复制下方模板，替换 `{song_1}` 和 `{song_2}` 为实际歌曲名和艺人名，传入 `Agent(subagent_type="general-purpose", run_in_background=true, prompt=...)`。

---

## 模板

```
[CONTEXT] I'm extracting musical DNA for a {type} AI music album. I need detailed musical characteristics of two Chinese songs to use as style references. The data will be used to create 100% ORIGINAL generation prompts — NOT to copy these songs.

[GOAL] Gather complete musical data for these 2 songs:
1. {artist_1}《{song_1}》({year_1}) — {reason_1}
2. {artist_2}《{song_2}》({year_2}) — {reason_2}

[DOWNSTREAM] I will use BPM/key/instrument/structure data to write Style prompts. I will use lyrical analysis to understand imagery patterns. NO actual lyrics or melodies will be copied.

[REQUEST] For EACH song, find and report ALL of the following:

A. **BPM** (exact or close approximate) — search "歌曲名 BPM" "歌曲名 节拍" "歌曲名 tempo"
   - Cross-verify with at least 2 sources (guitar tabs, MIDI files, SongBPM, etc.)
   - If sources disagree, report all values and explain the discrepancy

B. **Musical Key** — search "歌曲名 调式" "歌曲名 key" "歌曲名 调"
   - Report the original key (原调)
   - Note any modulation (转调) within the song
   - Report if guitar tabs use capo (and what fret)

C. **Instrument arrangement** — search "歌曲名 编曲" "歌曲名 乐器" "歌曲名 配器"
   - List EVERY instrument and who played it
   - Describe when each instrument enters (verse 1? chorus? bridge?)
   - Identify the "signature instrument" (the one that defines this song's sound)
   - Note the arrangement philosophy (减法编曲? layered build? etc.)

D. **Song structure** — search "歌曲名 结构" "歌曲名 段落"
   - Map out sections with timestamps (from LRC lyrics or analysis)
   - Format: [0:00-0:15] Intro, [0:15-0:45] Verse 1, etc.
   - Note any non-standard structure (narrative free-form? dual-vocal dialogue?)

E. **Lyrical analysis** (DO NOT reproduce full lyrics, only ANALYZE):
   - Main themes (2-3 keywords)
   - List 10-15 concrete imagery words (specific objects, scenes, senses)
   - Rhyme scheme pattern (AABB? ABAB? free verse?)
   - Average sentence length (short phrases vs long sentences?)
   - The MOST memorable chorus line (the 金句/hook that people quote)
   - Emotional progression: how does emotion change from verse → chorus → bridge?

F. **Production notes** — search "歌曲名 制作人" "歌曲名 录音" "歌曲名 混音"
   - Producer, arranger, recording engineer, mixing engineer, mastering engineer
   - Recording studio location
   - Any notable production techniques or philosophies

G. **Why is this song emotionally effective?** — search "歌曲名 乐评" "歌曲名 分析" "歌曲名 为什么好听"
   - What makes listeners feel healed/moved/comforted?
   - Any cultural context that amplifies the emotional impact?
   - Chart performance or streaming data that validates its impact

[SEARCH STRATEGY]
- Search Chinese music sites: 网易云音乐, QQ音乐, Bilibili, 豆瓣
- Search guitar tab sites: 吉他世界 (guitarworld.com.cn), 曲谱258, Chord4
- Search MIDI databases: MidiShow (midishow.com)
- Search BPM tools: SongBPM (songbpm.com)
- Search analysis: 知乎, music review blogs, 微信公众号 analysis posts
- Cross-verify BPM and Key from at least 2 independent sources

Return findings in structured format per song. Be exhaustive — more data is better than less.
```

---

## 使用示例

```python
# 10 首标杆 → 5 个 agent（每个 2 首）
songs = [
    ("周深", "小美满", 2024, "年度榜单前列"),
    ("周深", "花开忘忧", 2022, "长期在榜"),
    ("朴树", "平凡之路", 2014, "跨年代长尾金曲"),
    ("毛不易", "平凡的一天", 2018, "原创标杆"),
    ("李荣浩", "乌梅子酱", 2022, "跨平台热播"),
    ("赵雷", "我记得", 2022, "年度榜单前列"),
    ("木小雅", "可能否", 2018, "高播放代表作"),
    ("马良", "往后余生", 2018, "年度榜单前列"),
    ("毛不易", "像我这样的人", 2017, "高评论代表作"),
    ("小霞&海洋Bo", "向云端", 2023, "年度榜单前列"),
]

# 每 2 首一个 agent
for i in range(0, len(songs), 2):
    prompt = template.replace("{artist_1}", songs[i][0])...
    Agent(subagent_type="general-purpose", run_in_background=true,
          description=f"DNA 调研 {songs[i][1]} / {songs[i+1][1]}", prompt=prompt)
```

---

## 分组建议

| 标杆数量 | agent 数量 | 每个 agent 覆盖 |
|---------|-----------|--------------|
| 6 首 | 3 个 | 2 首/agent |
| 8 首 | 4 个 | 2 首/agent |
| 10 首 | 5 个 | 2 首/agent |
| 12 首 | 6 个 | 2 首/agent |

**关键**：`run_in_background=true`，全部并行启动（同一轮消息里发起）；后台 agent 完成时会自动回传结果，逐一汇总即可。
