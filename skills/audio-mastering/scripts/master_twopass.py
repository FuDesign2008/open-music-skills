#!/usr/bin/env python3
"""two-pass loudnorm 精确母带（audio-mastering v5 配方：EQ + lowpass + loudnorm）

为何需要 two-pass：single-pass `loudnorm linear=true` 对动态范围大的 AI 音乐平台音轨实测偏响
1.1-1.9 LUFS（输出 -12.9 而非目标 -14）。two-pass（先测量、再用实测值归一化）精确命中 -14±0.1。

用法:
  python master_twopass.py [目录] [--exclude 'Track 02*'] [--out mastered]
默认处理当前目录所有 *.wav，输出到 mastered/，精确到 -14 LUFS / -1 dBTP。
"""
import subprocess, json, re, os, argparse, glob, fnmatch

EQ = "equalizer=f=250:t=o:w=200:g=-3,equalizer=f=3500:t=o:w=1500:g=+2,lowpass=f=15000"
TARGET_I, TARGET_TP, LRA = -14, -1, 11


def loudnorm_measure(infile, af_pre):
    cmd = ["ffmpeg", "-i", infile,
           "-af", f"{af_pre},loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={LRA}:print_format=json",
           "-f", "null", "-"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    m = re.search(r'\{\s*"input_i".*?\}', r.stderr, re.DOTALL)
    return json.loads(m.group()) if m else None


def main():
    ap = argparse.ArgumentParser(description="two-pass loudnorm 精确母带")
    ap.add_argument("dir", nargs="?", default=".", help="专辑目录（默认当前目录）")
    ap.add_argument("--exclude", nargs="*", default=[], help="排除的文件名模式，如 'Track 02*'")
    ap.add_argument("--out", default="mastered", help="输出目录（默认 mastered）")
    args = ap.parse_args()

    os.chdir(args.dir)
    os.makedirs(args.out, exist_ok=True)
    files = sorted(glob.glob("*.wav"))
    for ex in args.exclude:
        files = [f for f in files if not fnmatch.fnmatch(f, ex)]
    if not files:
        print("无 .wav 文件"); return

    for f in files:
        print(f"=== {f} ===")
        j = loudnorm_measure(f, EQ)
        if not j:
            print("  first-pass 测量失败，跳过"); continue
        ln = (f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={LRA}:"
              f"measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:"
              f"measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
        cmd2 = ["ffmpeg", "-y", "-i", f, "-af", f"{EQ},{ln}",
                "-c:a", "pcm_s16le", "-ar", "44100", f"{args.out}/{f}"]
        r2 = subprocess.run(cmd2, capture_output=True, text=True)
        print("  ", "OK" if r2.returncode == 0 else f"FAIL: {r2.stderr[-200:]}")

    print("\n=== 验证（目标 -14 LUFS / -1 dBTP）===")
    for f in files:
        rv = subprocess.run(["ffmpeg", "-i", f"{args.out}/{f}",
                             "-af", "loudnorm=print_format=json", "-f", "null", "-"],
                            capture_output=True, text=True)
        m = re.search(r'\{\s*"input_i".*?\}', rv.stderr, re.DOTALL)
        if m:
            jj = json.loads(m.group())
            ok = "✅" if (-14.5 <= float(jj["input_i"]) <= -13.5) else "⚠️"
            print(f"  {ok} {f:42s} {jj['input_i']} LUFS  {jj['input_tp']} dBTP")


if __name__ == "__main__":
    main()
