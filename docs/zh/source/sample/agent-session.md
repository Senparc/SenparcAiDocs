# AgentSession

`ChatSample.cs` 体现了 AgentSession 的两种使用方式：

- 共享 Session：同一会话上下文持续保留（推荐）
- 每轮新建 Session：不保留上下文（用于对比）

## 相关 API

- `BuildKernelWithAgentSessionAsync()`：创建并绑定 session。
- `RunChatAsync(prompt, agentSession)`：显式用 session 发送。

## 排错建议

- 你觉得“像失忆”：先确认是否误选“每轮新建 Session”。
- 想复现问题：固定同一个 session，多轮追问观察变化。
