## ADDED Requirements

### Requirement: 留白 = 人声缺席的时段

`whitespace-craft` SHALL 把「留白」定义为「人声缺席的时段」（而非「静默」），并 SHALL 说明人声缺席处可填器乐或静默两种填充，二者都算留白。

#### Scenario: 歌词过密反馈

- **WHEN** 用户反馈「歌词太密 / 词塞太满 / 没有时间听调调」
- **THEN** skill SHALL 直接触发并给出人声缺席方案，而非建议压缩歌词内容

#### Scenario: 留白不等于安静

- **WHEN** 用户把留白理解为「安静 / 静音」
- **THEN** skill SHALL 纠正为「没人唱」——大段纯器乐即使节奏强劲也构成留白

### Requirement: 人声缺席量化标准

skill SHALL 声明一组量化标准：开头 ≥30 秒纯器乐（人声晚进）、结尾 ≥30 秒纯器乐（人声早退）、全曲人声缺席占比 ≥60%；并 SHALL 注明这些是创作者的实测经验值、平台无法精确保证，生成后须验证。

#### Scenario: 标准作为软目标

- **WHEN** 生成结果未达占比或头尾时长
- **THEN** skill SHALL NOT 宣称保证达成，SHALL 给出备选梯度（重送 / 降级接受 / 后期补足，视平台能力而定）

### Requirement: 平台落地手段

skill SHALL 提供两类落地手段：结构标签（`[Intro]` / `[Outro]` / `[Instrumental Break]` 等，段内不写词）与 Style 自然语言指令（长描述驱动器乐段）；并 SHALL 针对不支持段标的平台给出「Style 自然语言 + 时长锚句」替代通道。

#### Scenario: 平台无段标能力

- **WHEN** 目标平台的段标识别行为未知或不可用
- **THEN** skill SHALL 引导改用 Style 自然语言描述器乐段 + 时长锚句，并 SHALL 标注段标方案为待实测

### Requirement: 取气两派与密度布局

skill SHALL 提供「密处取气」与「虚处取气」两派作为人声占比的定位选择，并 SHALL 说明一张专辑可交替布局两类曲目以制造整体呼吸。

#### Scenario: 专辑级密度规划

- **WHEN** 用户规划整张专辑的听感起伏
- **THEN** skill SHALL 建议交替使用密处取气与虚处取气曲目，作为情绪光谱的**密度维度**补充
