# 我要做多轮 Chat

## 场景

我需要可持续上下文的聊天机器人。

## 最小链路

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel(userId, chatOptions)
    .BuildKernelWithAgentSessionAsync();

var session = iWantToRun.Kernel.AgentSession;
var result = await iWantToRun.RunChatAsync("你好", session);
Console.WriteLine(result.Result.Text);
```

## 常用增强

- 流式输出：给 `RunChatAsync` 提供流处理委托。
- 动态替换变量：在 Session StateBag 中注入参数后调用。
