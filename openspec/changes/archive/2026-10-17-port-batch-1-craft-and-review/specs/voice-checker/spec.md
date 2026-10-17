## ADDED Requirements

### Requirement: AI 写作模式检测

`voice-checker` SHALL 提供 11 类检测模式：抽象名词堆砌、过度解释隐喻、对称情绪弧、缺少个性细节、陈词升级短语、完美语法、过度平衡的平行结构、四字成语堆砌、古诗引用拼贴、韵脚疲劳、「的」字泛滥；每类 SHALL 附检测信号与建议方向。

#### Scenario: 逐类扫描并出报告

- **WHEN** 用户请求检测歌词的 AI 味
- **THEN** skill SHALL 逐类扫描并输出结构化报告（标记项 / 位置 / 内容 / 问题 / 方向），并 SHALL 汇总 Warning 与 Info 计数

### Requirement: 严重度分级（无 Critical）

skill SHALL 只用 Warning 与 Info 两级，SHALL NOT 使用 Critical；并 SHALL 声明这是品味问题而非对错问题。

#### Scenario: 不阻断流水线

- **WHEN** 检测报告存在 Warning 项
- **THEN** skill SHALL NOT 阻断后续流程，交付物 SHALL 是建议性报告

### Requirement: 仅建议、不改写

skill SHALL NOT 自动改写歌词，交付物 SHALL 是检测报告；作者决定改什么。

#### Scenario: 用户要求直接改

- **WHEN** 用户要求「直接帮我改掉这些 AI 味」
- **THEN** skill SHALL 说明自身定位是检测器，并 SHALL 给出方向后交由作者或创作类 skill 执行改写

### Requirement: 流派敏感与浓烈语法分界

skill SHALL 对氛围/梦幻/古风等抽象流派把「缺少个性细节」降级为 Info；并 SHALL 声明「大词不因大而判 AI 味」——判据是**是否被具体代价偿付**，防止把有意为之的浓烈表达误伤为陈词。

#### Scenario: 浓烈表达被误判时豁免

- **WHEN** 歌词中出现大词（梦/光/远方/英雄）但配了具体代价或细节
- **THEN** skill SHALL NOT 判为陈词或口号，SHALL 依据支付判据放行

#### Scenario: 陈词拒用反向解法

- **WHEN** 陈词已占据题材核心、无法回避
- **THEN** skill SHALL 提供「陈词拒用」三步法（写出陈词 → 当场点破其陈 → 换克制定量词承住），并 SHALL 标注其为候选级方法
