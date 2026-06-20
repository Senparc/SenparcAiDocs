# Senparc.AI.AgentKernel（Microsoft Agent Framework）

`Senparc.AI.AgentKernel` 是当前文档主线与默认推荐实现。它基于 Microsoft Agent Framework（MAF），并复用部分 Semantic Kernel 向量生态做 Embedding / RAG。

## 一、接口层（开发者在 Sample 里直接调用）

### 1. 注册入口

文件：`src/Senparc.AI.AgentKernel/Register.cs`

你在 Program 里调用：

```csharp
services.AddSenparcAI(config);
```

该方法会完成：

- 读取并绑定 `SenparcAiSetting`
- 写入全局 `Senparc.AI.Config.SenparcAiSetting`
- 注入 `IAiHandler -> AgentAiHandler`

### 2. 典型链式 API（Sample 实际调用）

文件：`src/Senparc.AI.AgentKernel/KernelConfigExtensions/KernelConfigExtensions.cs`

核心入口：

```csharp
handler.IWantTo(setting)
    .ConfigModel(...)
    .BuildKernel(...)
```

按能力的常用接口：

- 聊天：`ConfigChatModel(userId, options)`
- Completion：`ConfigModel(ConfigModel.TextCompletion, userId)`
- Embedding：`ConfigTextEmbeddingModel(userId, collectionName)`
- Image：`ConfigImageModel(userId)`
- STT：`ConfigSpeechToTextModel(userId)`
- TTS：`ConfigTextToSpeechModel(userId)`

构建阶段：

- `BuildKernel()`
- `BuildKernelAsync(createAgentSession: ...)`
- `BuildKernelWithAgentSessionAsync()`

### 3. 运行阶段 API

主要分布在：

- `KernelConfigExtensions.Chat.cs`
- `KernelConfigExtensions.Embedding.cs`
- `KernelConfigExtensions.Speech.cs`

常用方法：

- `RunChatAsync(prompt, agentSession, streamCallback)`
- `GetEmbeddingAsync(text)`
- `CreateTextSearchStore()` + `SearchAsync(...)`
- `RunSpeechToTextAsync(...)`
- `RunTextToSpeechAsync(...)`
- `CreateRequest(...)` / `SetTempContext(...)` / `SetStoredContext(...)`

### 4. 与 AgentKernel Sample 的菜单映射

`Samples/Senparc.AI.Samples.AgentKernelConsoles/Program.cs` 对应关系：

- `[1]` Chat -> `ChatSample` -> `ConfigChatModel + BuildKernelWithAgentSessionAsync + RunChatAsync`
- `[2]` Completion -> `CompletionSample` -> `ConfigModel(TextCompletion) + RunChatAsync`
- `[3]` Embedding / RAG -> `EmbeddingSample` / `EmbeddingRagSample`
- `[4]` Image -> `ImageGenerateSample` -> `ConfigImageModel + Kernel.ImageGenerationAsync`
- `[7]` STT -> `SttSample`
- `[8]` TTS -> `TtsSample`

## 二、实现层（底层核心类与调用链）

### 1. `IWantTo*` 对象模型

文件：`src/Senparc.AI.AgentKernel/Entities/IWanTo.cs`

核心对象：

- `IWantTo`：持有 `AgentKernelHelper`、`IAIKernelBuilder`、`SenparcAiSetting`
- `IWantToConfig`：配置阶段容器（`UserId`、`ModelName`、`ChatClientAgentOptions`）
- `IWantToBuild`：构建阶段容器
- `IWantToRun`：运行阶段容器，持有 `StoredAiArguments`、`Functions`、`Kernel`

这套分层让链式 API 在编译期有明显阶段边界。

### 2. `AgentKernelHelper`：模型配置与 Kernel 构建枢纽

文件：`src/Senparc.AI.AgentKernel/Helpers/AgentKernelHelper*.cs`

关键职责：

- `ConfigChat / ConfigTextEmbeddingGeneration / ConfigImageGeneration / ConfigSpeechToText / ConfigTextToSpeech`
- `GetKernel(...)`、`BuildKernel(...)`
- `ResetHttpClient(...)`（可挂日志与重定向处理器）
- `ResetSenparcAiSetting(...)`

平台分发逻辑在这里完成：根据 `AiPlatform` 选择 OpenAI / Azure / NeuChar / Ollama / DeepSeek 对应客户端。

### 3. `AIKernelBuilder` 与 `AiKernel`：运行时内核对象

文件：

- `src/Senparc.AI.AgentKernel/Kernels/KernelBuilder.cs`
- `src/Senparc.AI.AgentKernel/Kernels/AiKernel.cs`

`AIKernelBuilder` 负责聚合：

- `ConfigModels`
- `ChatClient / EmbeddingClient / ImageClient / SpeechToTextClient / TextToSpeechClient`
- `EmbeddingCollectionName`

`AiKernel` 负责运行时行为：

- `CreateAIAgent()`：把 `ChatClient` 转为 `ChatClientAgent`
- `SetAgentSessionAsync()`：创建/绑定 `AgentSession`
- `CreateEmbeddingGenerator()`：按 `EmbeddingDimensions` 生成向量器
- `InvokeChatAsync / InvokeChatStreamingAsync`
- `ImageGenerationAsync / SpeechToTextAsync / TextToSpeechAsync`

### 4. 请求与结果模型

文件：

- `Entities/SenparcAiRequest.cs`
- `Entities/AgentKernelArguments.cs`
- `Entities/SenparcAiResult.cs`

关键点：

- `SenparcAiRequest.ReplacePrompt()` 会将 `StoreAiArguments + TempAiArguments` 占位符替换进 prompt
- `AgentKernelArguments` 实现 `ISenparcKernelArguments.ReplacePrompt()`
- `SenparcKernelAiResult<T>` 同时支持非流式 `Result` 与流式 `StreamResult`

### 5. Embedding/RAG 落地类

文件：`VectorStore/TextSearchStore.cs`

- 使用 `VectorStoreCollectionDefinition` 显式声明 `Embedding` 向量列与维度
- `UpsertDocumentsAsync()` 内部会调用 `GetEmbeddingAsync()` 生成向量
- `SearchAsync()` 返回 `TextSearchDocument`，供 RAG provider 直接消费

### 6. 当前源码状态（重要）

- `AgentAiHandler.Run(...)` 仍标注“未正式启用”（抛 `尚未实现`）。
- `KernelConfigExtensions.Plugin.cs` 在 AgentKernel 中整体注释，Sample `[5][6]` 使用 `NotSupportedSample` 占位。
- 命名上存在 `KernelConfigExtension` 与 `KernelConfigExtensions` 并存（分别承载不同扩展方法），排查扩展方法时需同时检索。

## 三、建议阅读顺序

1. `Register.cs`（看 DI 注入）
2. `Entities/IWanTo.cs`（看链式对象状态）
3. `KernelConfigExtensions/KernelConfigExtensions.cs`（看配置与构建）
4. `Helpers/AgentKernelHelper.Config.*.cs`（看各平台分发）
5. `Kernels/AiKernel.cs`（看运行时行为）
6. `KernelConfigExtensions/*.Chat|Embedding|Speech.cs`（看执行阶段）

## 四、类库参考入口

- CHM 风格完整表格：[/zh/source/reference/agentkernel.html](/zh/source/reference/agentkernel.html)
