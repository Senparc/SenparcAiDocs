# Completion 教程（单次补全）

## 目标

运行 `CompletionSample`，理解“无历史上下文”的一次性补全行为。

## 前置条件

- `TextCompletion` 模型可用

## 步骤

1. 输入 `2` 进入 Completion。
2. 输入提示词，例如：

```text
请用三句话介绍 AgentKernel 的作用。
```

3. 观察返回文本。

核心链路：

```csharp
var iWantToRun = handler.IWantTo(setting)
    .ConfigModel(ConfigModel.TextCompletion, userId)
    .BuildKernel();

var result = await iWantToRun.RunChatAsync(prompt);
```

## 预期结果与排错

- 预期：每次输入互相独立，不保留历史。
- 若报模型不支持：检查平台下 `ModelName.TextCompletion` 是否配置。
- 若只想要多轮：请切回 `[1] Chat`。
