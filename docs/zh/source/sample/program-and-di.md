# Program 入口与 DI 如何连接核心项目

> 本页聚焦 AgentKernel Sample 的启动入口，并把调用链回连到 `Senparc.AI` / `Senparc.AI.AgentKernel` 两个核心项目。

`Samples/Senparc.AI.Samples.AgentKernelConsoles/Program.cs` 是“业务入口层”，它只做组装，不做具体 AI 逻辑。

## 1. 启动阶段做了什么

### 1.1 读取配置

- `ConfigurationBuilder + appsettings.json`
- 最终配置对象会在 `AddSenparcAI(config)` 时绑定到 `SenparcAiSetting`

### 1.2 注册服务

- `AddSenparcGlobalServices(config)`
- `AddSenparcAI(config)`
- `AddMemoryCache()`

关键点：`AddSenparcAI(config)` 来自实现层（AgentKernel 或 Kernel），并把 `IAiHandler` 注入为具体处理器。

### 1.3 注册 Sample 类

- `ChatSample`
- `CompletionSample`
- `EmbeddingSample`
- `EmbeddingRagSample`
- `ImageGenerateSample`
- `SttSample`
- `TtsSample`

## 2. 菜单路由如何映射到链式 API

菜单本质是路由到不同 Sample 类；每个 Sample 再调用统一链式接口：

```csharp
handler.IWantTo(setting)
    .ConfigModel(...)
    .BuildKernel(...)
```

常见分支：

- Chat：`ConfigChatModel(...)` + `BuildKernelWithAgentSessionAsync()`
- Embedding：`ConfigTextEmbeddingModel(...)` + `CreateTextSearchStore()`
- Image：`ConfigImageModel(...)` + `Kernel.ImageGenerationAsync(...)`
- STT/TTS：`ConfigSpeechToTextModel(...)` / `ConfigTextToSpeechModel(...)`

## 3. 从 Program 往下追源码的最短路径

1. Program 中 `AddSenparcAI(config)`
2. 进入 `src/Senparc.AI.AgentKernel/Register.cs`
3. 看 `IAiHandler -> AgentAiHandler` 注入
4. 看 `AgentAiHandler.IWantTo(...)`（扩展方法在 `KernelConfigExtensions`）
5. 看 `AgentKernelHelper.Config*` 与 `AIKernelBuilder/AiKernel`
6. 看 `RunChatAsync / GetEmbeddingAsync / RunTextToSpeechAsync` 等执行扩展

## 4. 为什么这套结构方便扩展

- Program 与业务 Sample 只依赖 `IAiHandler` + 链式 API
- 具体平台分发（OpenAI/Azure/Ollama/DeepSeek）在 Helper 层集中处理
- 运行时细节（Session、Streaming、VectorStore）在 Kernel 层封装

这使你可以在不大改 Program 的前提下切换实现层或升级能力。
