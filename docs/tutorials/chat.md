# Chat Tutorial (Multi-turn Session)

## Goal

Run `ChatSample` and understand the difference between shared session and per-turn new session.

## Prerequisites

- A chat model is available
- `Senparc.AI.Samples.AgentKernelConsoles` is running

## Steps

1. Enter `1` for Chat.
2. Set System Message (or leave empty for default).
3. Select mode:
- `1` Shared `AgentSession` (recommended)
- `2` New session each turn (for experiment)
4. Ask two related turns and observe whether context is kept.

Code chain (simplified):

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel(userId, chatOptions)
    .BuildKernelWithAgentSessionAsync();

var result = await iWantToRun.RunChatAsync(input, iWantToRun.Kernel.AgentSession);
```

## Expected Result and Troubleshooting

- Expected: shared session mode keeps context reliably.
- Expected: console prints token usage stats.
- If answers jump unexpectedly: confirm mode is not "new session each turn".
- If you need request tracing: enable `HttpClient` logging in settings and retry.

![Chat success preview](/images/tutorials/chat-success-20260617.svg)

What you should see: after the model reply, `Tokens — input/output/total` is printed.
