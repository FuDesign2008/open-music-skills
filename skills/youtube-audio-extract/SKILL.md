---
name: youtube-audio-extract
version: "0.1.0"
user-invocable: true
description: Use when 需要从 YouTube 视频提取音频（WAV）用于音乐分析、参考素材收集，或用户提到下载音频、提取音频、youtube 音频、download audio、extract audio、参考音频。提供 yt-dlp + deno + Chrome cookies 的前置检查、下载命令、验证步骤与 librosa 分析模板。触发词包括下载音频、提取音频、youtube 音频、download audio、extract audio、youtube audio、参考音频。反向边界：只提取音频、不下载视频画面；不适用于 Bilibili 等需要不同 cookies 策略的平台；仅用于个人分析/参考，遵守平台条款与版权，不用于再分发。
---

# YouTube 音频提取 / YouTube Audio Extract

> 从 YouTube 视频提取音频（WAV），用于音乐分析、参考素材收集。
> **合规提示**：仅用于个人分析/参考，遵守 YouTube 服务条款与版权；提取的音频不用于再分发或商业使用。

## 触发条件

- **下载音频**、**提取音频**、**youtube 音频**
- **download audio**、**extract audio**、**youtube audio**
- 提供了 YouTube 链接并要求提取音频

## 何时不使用

- 下载视频画面（非音频）→ 用 yt-dlp 视频模式
- 从 Bilibili 提取 → 需要不同的 cookies 策略
- 音频已存在于本地 → 直接使用

---

## 前置条件检查

每次执行前，检查以下工具是否可用：

```bash
# 检查 yt-dlp
which yt-dlp || echo "❌ 未安装 → brew install yt-dlp"

# 检查 deno（YouTube 签名解析必需）
which deno || echo "❌ 未安装 → brew install deno"

# 检查 ffmpeg（WAV 转码与 ffprobe 验证必需）
which ffmpeg || echo "❌ 未安装 → brew install ffmpeg"

# 检查 Chrome 是否登录了 YouTube（cookies 可用）
# 如果 cookies 失败，提示用户在 Chrome 中登录 YouTube
```

**安装缺失工具**：

```bash
brew install yt-dlp deno ffmpeg
```

> ⚠️ `deno` 是 YouTube 签名解析的 JS runtime。没有它，yt-dlp 只能下载图片格式，无法下载音频流。

---

## 工作流程

### Step 1：接收参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| **URL** | ✅ | YouTube 视频链接 | `https://www.youtube.com/watch?v=xxxxx` |
| **保存路径** | ✅ | 目标目录（含文件名） | `<输出目录>/song_name.wav` |
| **文件名** | ✅ | 英文拼音命名 | `reference_song.wav` |

### Step 2：执行下载

```bash
yt-dlp --no-playlist -x --audio-format wav \
  --cookies-from-browser chrome \
  -o "<保存路径>" \
  "<URL>"
```

**参数说明**：
- `--no-playlist`：只下载单个视频，不下载播放列表
- `-x`：仅提取音频
- `--audio-format wav`：转换为 WAV（无损，适合 librosa 分析）
- `--cookies-from-browser chrome`：使用 Chrome cookies 绕过 YouTube 反机器人检测
- `-o`：输出路径（不含扩展名，yt-dlp 自动加 `.wav`）

### Step 3：验证

```bash
# 检查文件存在 + 大小
ls -la <保存路径>

# 检查时长
ffprobe -v quiet -show_entries format=duration -of csv=p=0 <保存路径>
```

### Step 4：可选音频分析

如果用户需要深度分析（BPM/调式/音高曲线），使用 librosa：

```bash
python3 << 'EOF'
import librosa
y, sr = librosa.load("<路径>", sr=22050, mono=True)
tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
# ... BPM / 调式 / 音高曲线 / 段落结构分析
EOF
```

详见下文 librosa 分析模板。

---

## 常见错误

| 错误 | 原因 | 修复 |
|------|------|------|
| `Sign in to confirm you're not a bot` | 未使用 cookies | 加 `--cookies-from-browser chrome` |
| `Signature solving failed` | 缺少 deno JS runtime | `brew install deno` |
| `Only images are available` | 同上（签名失败） | 同上 |
| `Requested format is not available` | 签名失败导致流不可见 | 确认 deno 已安装且 yt-dlp 是最新版 |
| `Skipping client "android_vr"` | 该 client 不支持 cookies | 正常警告，不影响下载 |
| 下载速度极慢 | YouTube 限速 | 正常现象，等待即可 |
| Chrome cookies 提取失败 | Chrome 未登录 YouTube | 在 Chrome 中打开 youtube.com 并登录 |

---

## 与其他 skill 的关系

```
youtube-audio-extract（提取参考音频）
  → librosa 音频分析（BPM/调式/音高曲线/段落结构）
  → music-dna-extraction（7 维 DNA 提取）
  → music-creation-workflow（基于 DNA 创作 Style）
  → 生成
```

---

## 附录：librosa 分析模板

```python
import librosa
import numpy as np

FILE = "<音频路径>"
y, sr = librosa.load(FILE, sr=22050, mono=True)

# 1. BPM
tempo, _ = librosa.beat.beat_track(y=y, sr=sr)

# 2. 调式（Krumhansl-Schmuckler）
chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
chroma_mean = chroma.mean(axis=1)
notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
# ... key detection

# 3. 音高曲线（F0）
f0, voiced, _ = librosa.pyin(y, sr=sr,
    fmin=librosa.note_to_hz('C3'), fmax=librosa.note_to_hz('C6'))

# 4. 频谱质心（音色明暗）
sc = librosa.feature.spectral_centroid(y=y, sr=sr)

# 5. 段落结构（RMS 能量曲线）
rms = librosa.feature.rms(y=y)[0]
```
