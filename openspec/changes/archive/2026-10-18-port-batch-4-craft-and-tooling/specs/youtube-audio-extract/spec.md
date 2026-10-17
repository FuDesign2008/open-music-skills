# youtube-audio-extract Specification

## Purpose
定义 YouTube 参考音频提取契约：检查 yt-dlp/deno/ffmpeg 与 Chrome cookies 前置条件，以 yt-dlp 提取 WAV，完成文件与时长验证，并声明个人分析与版权合规边界。

## ADDED Requirements

### Requirement: 前置检查与下载

`youtube-audio-extract` SHALL 在执行前检查 `yt-dlp`、`deno` 与 Chrome cookies 可用性；SHALL 使用 `yt-dlp --no-playlist -x --audio-format wav --cookies-from-browser chrome` 提取音频。

#### Scenario: 缺少 deno

- **WHEN** `deno` 未安装
- **THEN** skill SHALL 提示 `brew install deno`，并说明缺少它只能下载图片格式

### Requirement: 验证与合规

skill SHALL 用 `ls` 与 `ffprobe` 验证文件存在与时长；SHALL 声明仅用于个人分析/参考，遵守平台条款与版权，不用于再分发。

#### Scenario: 提取完成

- **WHEN** 音频下载完成
- **THEN** skill SHALL 验证文件与时长，并提醒合规使用边界
