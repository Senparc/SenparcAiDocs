# Chat 教程（多轮会话）

## 目标

运行 `ChatSample`，掌握共享 Session 与每轮新建 Session 的差异。

## 前置条件

- Chat 模型可用
- 已启动 `Senparc.AI.Samples.AgentKernelConsoles`

## 步骤

1. 输入 `1` 进入 Chat。
2. 设置 System Message（可留空使用默认）。
3. 选择模式：
- `1` 共享 `AgentSession`（推荐）
- `2` 每轮新建 Session（用于实验）
4. 连续发两轮相关问题，观察第二轮是否继承上下文。

代码对应链路（简化）：

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel(userId, chatOptions)
    .BuildKernelWithAgentSessionAsync();

var result = await iWantToRun.RunChatAsync(input, iWantToRun.Kernel.AgentSession);
```

## 预期结果与排错

- 预期：共享 Session 模式可稳定保留上下文。
- 预期：控制台输出 Token 用量统计。
- 若结果异常跳跃：确认没有误选“每轮新建 Session”。
- 若需要抓请求日志：进入设置开启 `HttpClient` 日志后再试。

![Chat 成功示意图](/images/tutorials/chat-success-20260617.svg)

你应该看到什么：机器回复后，紧接着打印 `Tokens — input/output/total`。
