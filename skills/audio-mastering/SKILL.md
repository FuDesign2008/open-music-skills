---
name: audio-mastering
version: "0.1.0"
user-invocable: true
description: Use when 需要把 AI 音乐平台导出的 WAV 处理到流媒体响度标准（母带/响度标准化/音频后处理），或用户提到母带、mastering、响度、LUFS、真峰值。提供实测响度基线、流媒体目标表、经验证的 EQ+lowpass+loudnorm 链、two-pass 精确配方与验证脚本。触发词包括母带、mastering、母带处理、音频母带、响度标准化、音频后处理、LUFS、true peak。反向边界：平台若在生成后锁定音频、不支持替换文件则不适用；不做编曲/混音创作，只做后处理；永远不覆盖原始文件。
---

# AI 音乐音频母带处理指南（audio-mastering）

> **平台适用性**：适用于**可下载 WAV 并重新上传/分发**的平台。若目标平台在生成后锁定音频、不支持替换文件，本 skill 不适用（没有本地处理/替换环节）。下文以 Suno 类平台的输出为实测样本；其他平台按同样方法校准响度基线。
> **依据**：某专辑 5 轮真实 ffmpeg 实验总结，每条结论均有 A/B 试听验证。
> **定位**：生成后处理的最后一步，在分发之前执行。

## 触发词

- **母带 / mastering / 母带处理**：对平台导出的 WAV 文件执行母带处理
- **音频母带**：同上
- **响度标准化**：仅调整响度至流媒体标准
- **音频后处理**：泛指生成后的音频处理

## 适用范围

- AI 音乐平台导出的 WAV 文件（16-bit/24-bit，44.1kHz+；以 Suno V5/V5.5 为实测样本）
- 目标平台：Spotify / Apple Music / YouTube / 国内流媒体与短视频平台
- 目标格式：WAV 16-bit/44.1kHz（分发通用格式）

### 依赖声明

- `ffmpeg` ≥ 7.0（音频处理核心）：`brew install ffmpeg`
- `ffmpeg-normalize` ≥ 1.27（批量响度归一化，可选）：`pip3 install ffmpeg-normalize`
- `librosa` + `numpy`（RMS 静默验证，可选）：`pip3 install librosa numpy`
- `afplay`（macOS A/B 试听，可选）：系统自带
- 本 skill 自带脚本：`scripts/master_twopass.py`、`scripts/rms_silence_check.py`

---

## 1. 核心知识：平台输出的真实响度

| 内容类型 | 实测 LUFS | 说明 |
|---------|----------|------|
| 人声/摇滚/电子 | -8 ～ -12 LUFS | 已经过内部限幅，响度很高 |
| 氛围/器乐/冥想 | -13 ～ -15 LUFS | 动态较大，相对安静 |
| 纯钢琴/弦乐 | -14 ～ -16 LUFS | 动态最大 |

**关键结论**：平台输出并非「未处理的干声」，而是已经过内部限幅处理。直接使用 `ffmpeg-normalize` 或纯 `loudnorm` 对已接近目标响度的音轨**几乎无听感差异**。

---

## 2. 流媒体平台响度标准

| 平台 | 目标 LUFS | 真峰值限制 | 归一化方式 |
|------|----------|-----------|-----------|
| Spotify | -14 LUFS | -1 dBTP | 自动降低过响音轨 |
| Apple Music | -16 LUFS | -1 dBTP | Sound Check |
| YouTube | -14 LUFS | -1 dBTP | 自动归一化 |
| 国内流媒体/短视频平台 | ~-14 LUFS | -1 dBTP | 类似 Spotify |

**策略**：以 -14 LUFS / -1 dBTP 为目标。过响的音轨会被平台**压低**（损失动态），而不是被提升——所以宁可比 -14 安静 1-2 LUFS，也不要超过。

---

## 3. 经验证的母带链（v5 配方）

### 3.1 推荐链：EQ + Lowpass + Loudnorm

```bash
ffmpeg -i input.wav \
  -af "equalizer=f=250:t=o:w=200:g=-3,equalizer=f=3500:t=o:w=1500:g=+2,lowpass=f=15000,loudnorm=I=-14:TP=-1:LRA=11:linear=true" \
  -c:a pcm_s16le -ar 44100 \
  output.wav
```

### 3.2 参数解释

| 滤镜 | 参数 | 作用 | 原因 |
|------|------|------|------|
| `equalizer` | f=250, w=200, g=-3 | 衰减 250Hz 附近 3dB | 减少「浑浊感」，清理低频共振 |
| `equalizer` | f=3500, w=1500, g=+2 | 提升 3.5kHz 附近 2dB | 增强人声/乐器存在感（presence） |
| `lowpass` | f=15000 | 切除 15kHz 以上 | **关键**：移除平台输出常见的高频数字伪影 |
| `loudnorm` | I=-14, TP=-1, LRA=11 | EBU R128 响度归一化 | 适配流媒体标准，linear=true 避免音色变化 |

### 3.3 为什么是这个链？

经过 5 轮迭代对比（v1 → v5），排除了一切「听起来应该有用但实际破坏音质」的滤镜：

| 被排除的滤镜 | 问题 |
|-------------|------|
| `aexciter`（谐波激励） | 在 AI 音频上产生**金属质感伪影**，高频刺耳 |
| `acompressor`（压缩器） | makeup gain 放大所有频率**包括伪影**，让问题更严重 |
| `stereotools=mlev=0.1`（立体声展宽） | 高频产生**相位抵消**，听感变薄 |
| 高频提升 >8kHz | 暴露 AI 合成的数字痕迹，听感不自然 |
| `afftdn`（降噪） | 过度衰减导致音色变闷，平台输出底噪已很低 |

**一句话总结**：AI 生成音频的母带 = 做减法（切伪影、清浑浊），不做加法（不激励、不压缩、不展宽）。

### 3.4 ⚠️ single-pass 偏响，成品必须 two-pass（实测）

3.1 的单命令 `loudnorm linear=true` 是 **single-pass**：对动态范围大的音轨实测**偏响 1.1-1.9 LUFS**（源 -14.77 → single-pass 输出 -12.88，反被推高 1.9 LUFS）。偏响音轨会被流媒体平台**压低**、损失动态——违背「宁可比 -14 安静」策略。

**成品必须 two-pass**（first pass 测量 → second pass 用实测值精确归一化）：

```bash
# 配套脚本（参数化通用版）：scripts/master_twopass.py
python scripts/master_twopass.py <专辑目录> [--exclude 'Track 02*']
# 自动 first-pass 测量 + second-pass 归一化 + 验证，精确命中 -14±0.1 LUFS
```

**实测对照**：single-pass 4 首 -12.9 LUFS（偏响）→ **two-pass 4 首全部 -14.00 LUFS** ✅。

---

## 4. 执行流程

### 阶段 1：前置检查

1. **确认源文件**：检查目录下 `.wav` 文件列表
2. **测量源响度**：获取 LUFS 基线，决定处理策略

```bash
# 测量单文件响度
ffmpeg -i input.wav -af loudnorm=print_format=json -f null - 2>&1 | tail -12

# 批量测量（快速扫描）
for f in *.wav; do
  lufs=$(ffmpeg -i "$f" -af loudnorm=print_format=json -f null - 2>&1 | grep '"input_i"' | head -1 | grep -oE '-?[0-9]+\.[0-9]+')
  echo "$lufs LUFS  $f"
done
```

3. **策略决策**：

| 源 LUFS | 策略 |
|---------|------|
| -8 ～ -12 | 需要完整母带链（EQ + lowpass + loudnorm），重点在降响度 |
| -13 ～ -15 | 需要完整链，EQ 提供听感改善 |
| -16 以下 | 可跳过 lowpass，仅 EQ + loudnorm |

### 阶段 2：创建输出目录

```bash
# 在专辑目录下创建 mastered/ 子目录，保留原始文件
mkdir -p mastered
```

**硬规则**：永远不覆盖原始文件。母带输出放入 `mastered/`，保留原始文件用于 A/B 对比。

### 阶段 3：执行母带

#### 单文件处理

```bash
ffmpeg -i "input.wav" \
  -af "equalizer=f=250:t=o:w=200:g=-3,equalizer=f=3500:t=o:w=1500:g=+2,lowpass=f=15000,loudnorm=I=-14:TP=-1:LRA=11:linear=true" \
  -c:a pcm_s16le -ar 44100 \
  "mastered/input.wav"
```

#### 批量处理（two-pass 精确模式，成品推荐）

```bash
# 配套脚本（first/second pass + 自动验证，精确 -14 LUFS）
python scripts/master_twopass.py . --exclude 'Track 02*'   # 排除未定稿曲目
```

> ⚠️ 勿用 single-pass for 循环做批量成品——偏响 1-2 LUFS（见 3.4）。single-pass 仅适合快速预览 EQ 效果。

#### 专辑模式（保持曲目间相对响度）

使用 `ffmpeg-normalize` 的 `--batch` 模式：

```bash
ffmpeg-normalize *.wav \
  -lra 11 --true-peak -1 --target-level -14 \
  --linear --sample-rate 44100 \
  --output-folder mastered \
  --batch
```

> 注意：`ffmpeg-normalize` 的 `--batch` 模式仅做响度归一化，不包含 EQ 和 lowpass。如需完整链，需用 `--custom-filter` 参数或回退到单文件 ffmpeg 循环。

### 阶段 4：验证

1. **响度验证**：确认输出在 -14 ±1 LUFS 范围内

```bash
for f in mastered/*.wav; do
  lufs=$(ffmpeg -i "$f" -af loudnorm=print_format=json -f null - 2>&1 | grep '"output_i"' | head -1 | grep -oE '-?[0-9]+\.[0-9]+')
  echo "$lufs LUFS  $(basename "$f")"
done
```

2. **A/B 对比**（macOS）

```bash
# 原始
afplay "input.wav"

# 母带
afplay "mastered/input.wav"
```

3. **听感检查要点**：
   - 高频是否干净（无金属质感）
   - 低频是否清晰（无浑浊）
   - 人声/主奏乐器存在感是否增强
   - 整体响度是否与流媒体参考曲目接近

### 阶段 5：静默/留白生效验证（含战略性静默的曲目）

含 `[Silence]`/`_ _ _ _ _` 下划线占位/drop 前蓄势的曲目，**必须验证平台是否真正静下来**（prompt 写了 ≠ 生效，见 `whitespace-craft` §四「规划人声缺席时段」）：

```bash
python scripts/rms_silence_check.py mastered/*.wav
# 输出 <10% 帧占比：< 0.5% = 静默未执行（[Silence] 被忽略），需重送或走备选梯度
#          ≥ 1%   = 静默生效 ✅
```

---

## 5. 参数调优指南

v5 配方是经过验证的「安全默认值」。以下场景可能需要微调：

### 5.1 浑浊严重的音轨

增大低频衰减：

```
equalizer=f=250:t=o:w=200:g=-3  →  equalizer=f=250:t=o:w=250:g=-4
```

### 5.2 人声存在感不足

增大中频提升（谨慎，最多 +3dB）：

```
equalizer=f=3500:t=o:w=1500:g=+2  →  equalizer=f=3500:t=o:w=1500:g=+3
```

### 5.3 器乐/氛围音轨（无高频伪影）

可放宽 lowpass 或跳过：

```
lowpass=f=15000  →  lowpass=f=16000  (或直接移除此滤镜)
```

### 5.4 需要更大动态范围

调整 LRA 值：

```
LRA=11  →  LRA=15  (保留更多动态)
LRA=11  →  LRA=8   (更压缩，响度更均匀)
```

---

## 6. 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 听不出区别 | 源文件已接近 -14 LUFS | 正常。EQ 的改善是微妙的，用 A/B 对比仔细听 |
| 高频金属感 | 使用了 aexciter 或高频提升 | 移除 aexciter，确保 lowpass=15000 |
| 低频变薄 | 低频衰减过多 | 减小 g 值（-3 → -2）或增宽频率窗口 |
| 整体变安静 | loudnorm 目标设置过低 | 确认 I=-14（不是 -18 或更低） |
| 响度没有变化 | 源已接近目标，loudnorm 线性模式几乎不调整 | 这是正确行为——避免过度处理 |
| 批处理后音轨间响度不一致 | 未使用 --batch 模式 | 用 ffmpeg-normalize --batch 或确保每轨目标一致 |

---

## 7. 工具清单

| 工具 | 用途 | 安装 |
|------|------|------|
| `ffmpeg` ≥ 7.0 | 音频处理核心 | `brew install ffmpeg` |
| `ffmpeg-normalize` ≥ 1.27 | 批量响度归一化 | `pip3 install ffmpeg-normalize` |
| `afplay` (macOS) | A/B 试听 | 系统自带 |
| `ffprobe` | 查看音频元数据 | 随 ffmpeg 安装 |
| `librosa` + `numpy` | RMS 静默验证（阶段5） | `pip3 install librosa numpy` |
| `scripts/master_twopass.py` | two-pass 精确母带（3.4） | 本 skill 自带 |
| `scripts/rms_silence_check.py` | 静默生效验证（阶段5） | 本 skill 自带 |

验证安装：

```bash
ffmpeg -version | head -1           # 确认版本
ffmpeg-normalize --version          # 确认版本
```

---

## 8. 完整工作流速查

```bash
# 1. 进入专辑目录
cd <专辑目录>/

# 2. 测量源响度
for f in *.wav; do
  lufs=$(ffmpeg -i "$f" -af loudnorm=print_format=json -f null - 2>&1 | grep '"input_i"' | head -1 | grep -oE '-?[0-9]+\.[0-9]+')
  echo "$lufs LUFS  $f"
done

# 3. 创建输出目录
mkdir -p mastered

# 4. 批量母带（two-pass 精确，见 3.4；勿用 single-pass，偏响 1-2 LUFS）
python scripts/master_twopass.py . --exclude 'Track 02*'

# 5. 验证响度
for f in mastered/*.wav; do
  lufs=$(ffmpeg -i "$f" -af loudnorm=print_format=json -f null - 2>&1 | grep '"output_i"' | head -1 | grep -oE '-?[0-9]+\.[0-9]+')
  echo "$lufs LUFS  $(basename "$f")"
done

# 6. A/B 对比
afplay "01 Track.wav"        # 原始
afplay "mastered/01 Track.wav"  # 母带
```

---

## 实验历史参考

本 skill 基于某专辑的 5 轮真实实验：

| 版本 | 滤镜链 | 结果 | 问题 |
|------|--------|------|------|
| v1 | EQ + aexciter + stereowiden + compressor + lowpass + loudnorm | 有听感变化 | 金属质感伪影 |
| clean | EQ + lowpass + loudnorm（去掉 aexciter） | 改善 | 高频仍有金属光泽 |
| v3 | 减小参数版本 | 微改善 | 高频金属感仍在 |
| v4 | EQ + cut highs + lowpass + loudnorm | 仍不干净 | compressor makeup gain 放大伪影 |
| **v5** | **EQ + lowpass + loudnorm** | **干净，无伪影** | **无——采用为最终配方** |

**核心教训**：AI 生成音频的母带 = 做减法。一切「增强」类滤镜（激励、压缩、展宽）在 AI 音频上都会放大数字伪影。
