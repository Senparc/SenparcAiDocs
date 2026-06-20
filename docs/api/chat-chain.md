# Multi-turn Chat

## Scenario

I need a chatbot with persistent context.

## Minimum Chain

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel(userId, chatOptions)
    .BuildKernelWithAgentSessionAsync();

var session = iWantToRun.Kernel.AgentSession;
var result = await iWantToRun.RunChatAsync("Hello", session);
Console.WriteLine(result.Result.Text);
```

## Common Enhancements

- Streaming output: pass a stream callback delegate to `RunChatAsync`.
- Dynamic variable replacement: inject values into Session StateBag before invocation.
