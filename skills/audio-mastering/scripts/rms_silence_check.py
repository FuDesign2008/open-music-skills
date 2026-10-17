#!/usr/bin/env python3
"""RMS 深度低谷验证：检测 AI 音乐平台的静默指令（[Silence] / _ _ _ _ _ 下划线占位）是否真正生效。

原理：若平台执行了 drop 前静默，整曲必有「低于峰值 10%」的深度低谷帧；
若指令被忽略（用 humming/人声填满），全曲能量始终中高位，<10% 帧占比≈0。

用法:
  python rms_silence_check.py file1.wav [file2.wav ...]
输出每首 <10% / <15% / <20% 帧占比 + 最静/峰比值 + drop 强度(p95 能量)排序。
判定：<10% 占比 ≈ 0 → 静默未执行（重送或走备选梯度，见 whitespace-craft §四「规划人声缺席时段」）。

依赖：librosa, numpy（需自行安装：pip3 install librosa numpy）。
"""
import sys, librosa, numpy as np

files = sys.argv[1:]
if not files:
    print("用法: python rms_silence_check.py file1.wav [file2.wav ...]"); sys.exit(1)


def fmt_t(s):
    m, sec = divmod(int(s), 60)
    return f"{m}:{sec:02d}"


rows = []
for f in files:
    y, sr = librosa.load(f, sr=22050, mono=True)
    rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
    win = max(1, int(0.2 * sr / 512))
    rms_s = np.convolve(rms, np.ones(win) / win, mode="same")
    peak = rms_s.max()
    times = librosa.frames_to_time(np.arange(len(rms_s)), sr=sr, hop_length=512)
    mask = times > 2
    deep_idx = int(np.argmin(np.where(mask, rms_s, peak)))
    rows.append({
        "name": f,
        "min_ratio": float(rms_s.min() / peak),
        "deep_t": float(times[deep_idx]),
        "p10": float((rms_s < 0.10 * peak).mean()) * 100,
        "p15": float((rms_s < 0.15 * peak).mean()) * 100,
        "p20": float((rms_s < 0.20 * peak).mean()) * 100,
        "p95": float(np.percentile(rms_s, 95)),
    })

print(f"{'曲目':<40} {'最静/峰':>8} {'最静时刻':>8} {'<10%':>7} {'<15%':>7} {'<20%':>7}")
print("-" * 84)
for r in rows:
    verdict = "❌未执行" if r["p10"] < 0.5 else ("✅" if r["p10"] >= 1.0 else "⚠️弱")
    print(f"{r['name']:<40} {r['min_ratio']:>8.3f} {fmt_t(r['deep_t']):>8} "
          f"{r['p10']:>6.2f}% {r['p15']:>6.2f}% {r['p20']:>6.2f}%  {verdict}")

print("\n[drop 强度梯度] 按 p95 能量降序（核对设定排序 vs 实测）")
for i, r in enumerate(sorted(rows, key=lambda x: x["p95"], reverse=True), 1):
    print(f"  {i}. {r['name']:<40} p95={r['p95']:.4f}")

print("\n判定线：<10% 占比 ≥1% = 静默生效；<0.5% = 静默未执行（[Silence]/秒数被忽略），"
      "重送或见 whitespace-craft §四「规划人声缺席时段」备选梯度")
