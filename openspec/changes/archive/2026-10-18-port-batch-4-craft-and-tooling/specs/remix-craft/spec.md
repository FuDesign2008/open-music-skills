# remix-craft Specification

## Purpose
定义 remix/公版改编契约：逐首核查公版状态与整理者权，以做减法保留中式韵味，借鉴现代热歌情感内核但词全原创，并按加长结构产出可发行的 remix 作品。

## ADDED Requirements

### Requirement: 公版合规

`remix-craft` SHALL 要求逐首核实公版状态（词曲作者生卒取晚者 +50 年；民歌 SHALL 额外核整理者权）；SHALL NOT 采样未公版录音；平台过滤/审核规则 SHALL 以目标平台当前规则为准。

#### Scenario: 民歌改编

- **WHEN** 用户要改编一首民歌
- **THEN** skill SHALL 先核整理者生卒与曲名商标，SHALL NOT 假设「集体创作=公版」

### Requirement: 做减法与情感借鉴

skill SHALL 建议去猎奇概念与硬风格碰撞，保留中式韵味；借鉴现代热歌 SHALL 只取情感内核，词 SHALL 全原创，SHALL NOT 使用原句原曲。

#### Scenario: 老歌新编

- **WHEN** 用户要做老歌新编
- **THEN** skill SHALL 给出做减法方向与情感借鉴方法，并提醒不用原句原曲

### Requirement: 加长结构

skill SHALL 提供加长结构（V-V-PreCh-Ch 反复 + Bridge + 最终 Ch + Outro，副歌 3 次，35–39 行）；副歌公版原句占比 SHALL 说明为听感甜区（38-40%），SHALL NOT 表述为过审上限。

#### Scenario: 结构规划

- **WHEN** 用户规划 remix 结构
- **THEN** skill SHALL 给出加长结构范式，并说明 38-40% 是听感甜区而非平台上限
