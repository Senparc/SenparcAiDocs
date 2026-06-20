# Senparc.AI.AgentKernel (Microsoft Agent Framework)

`Senparc.AI.AgentKernel` is the current documentation main line and default recommendation. It is based on Microsoft Agent Framework (MAF), while reusing parts of Semantic Kernel vector ecosystem for Embedding / RAG.

## 1. Interface Layer (directly used by developers in Sample)

### 1.1 Registration entry

File: `src/Senparc.AI.AgentKernel/Register.cs`

In Program you call:

```csharp
services.AddSenparcAI(config);
```

This method:

- Reads and binds `SenparcAiSetting`
- Writes to global `Senparc.AI.Config.SenparcAiSetting`
- Injects `IAiHandler -> AgentAiHandler`

### 1.2 Typical chain API (actual sample usage)

File: `src/Senparc.AI.AgentKernel/KernelConfigExtensions/KernelConfigExtensions.cs`

Core entry:

```csharp
handler.IWantTo(setting)
    .ConfigModel(...)
    .BuildKernel(...)
```

Common capability-specific APIs:

- Chat: `ConfigChatModel(userId, options)`
- Completion: `ConfigModel(ConfigModel.TextCompletion, userId)`
- Embedding: `ConfigTextEmbeddingModel(userId, collectionName)`
- Image: `ConfigImageModel(userId)`
- STT: `ConfigSpeechToTextModel(userId)`
- TTS: `ConfigTextToSpeechModel(userId)`

Build stage:

- `BuildKernel()`
- `BuildKernelAsync(createAgentSession: ...)`
- `BuildKernelWithAgentSessionAsync()`

### 1.3 Runtime APIs

Mainly located in:

- `KernelConfigExtensions.Chat.cs`
- `KernelConfigExtensions.Embedding.cs`
- `KernelConfigExtensions.Speech.cs`

Common methods:

- `RunChatAsync(prompt, agentSession, streamCallback)`
- `GetEmbeddingAsync(text)`
- `CreateTextSearchStore()` + `SearchAsync(...)`
- `RunSpeechToTextAsync(...)`
- `RunTextToSpeechAsync(...)`
- `CreateRequest(...)` / `SetTempContext(...)` / `SetStoredContext(...)`

### 1.4 Mapping to AgentKernel sample menu

`Samples/Senparc.AI.Samples.AgentKernelConsoles/Program.cs` mapping:

- `[1]` Chat -> `ChatSample` -> `ConfigChatModel + BuildKernelWithAgentSessionAsync + RunChatAsync`
- `[2]` Completion -> `CompletionSample` -> `ConfigModel(TextCompletion) + RunChatAsync`
- `[3]` Embedding / RAG -> `EmbeddingSample` / `EmbeddingRagSample`
- `[4]` Image -> `ImageGenerateSample` -> `ConfigImageModel + Kernel.ImageGenerationAsync`
- `[7]` STT -> `SttSample`
- `[8]` TTS -> `TtsSample`

## 2. Implementation Layer (core classes and call chain)

### 2.1 `IWantTo*` object model

File: `src/Senparc.AI.AgentKernel/Entities/IWanTo.cs`

Core objects:

- `IWantTo`: holds `AgentKernelHelper`, `IAIKernelBuilder`, `SenparcAiSetting`
- `IWantToConfig`: config-stage container (`UserId`, `ModelName`, `ChatClientAgentOptions`)
- `IWantToBuild`: build-stage container
- `IWantToRun`: run-stage container with `StoredAiArguments`, `Functions`, `Kernel`

This layered model gives clear compile-time phase boundaries for chain APIs.

### 2.2 `AgentKernelHelper`: model config + kernel build hub

Files: `src/Senparc.AI.AgentKernel/Helpers/AgentKernelHelper*.cs`

Key responsibilities:

- `ConfigChat / ConfigTextEmbeddingGeneration / ConfigImageGeneration / ConfigSpeechToText / ConfigTextToSpeech`
- `GetKernel(...)`, `BuildKernel(...)`
- `ResetHttpClient(...)` (can attach logging and redirection handlers)
- `ResetSenparcAiSetting(...)`

Provider dispatch is centralized here: choose corresponding clients by `AiPlatform` across OpenAI / Azure / NeuChar / Ollama / DeepSeek.

### 2.3 `AIKernelBuilder` and `AiKernel`: runtime kernel objects

Files:

- `src/Senparc.AI.AgentKernel/Kernels/KernelBuilder.cs`
- `src/Senparc.AI.AgentKernel/Kernels/AiKernel.cs`

`AIKernelBuilder` aggregates:

- `ConfigModels`
- `ChatClient / EmbeddingClient / ImageClient / SpeechToTextClient / TextToSpeechClient`
- `EmbeddingCollectionName`

`AiKernel` handles runtime behavior:

- `CreateAIAgent()`: converts `ChatClient` into `ChatClientAgent`
- `SetAgentSessionAsync()`: creates/binds `AgentSession`
- `CreateEmbeddingGenerator()`: builds vector generator by `EmbeddingDimensions`
- `InvokeChatAsync / InvokeChatStreamingAsync`
- `ImageGenerationAsync / SpeechToTextAsync / TextToSpeechAsync`

### 2.4 Request and result models

Files:

- `Entities/SenparcAiRequest.cs`
- `Entities/AgentKernelArguments.cs`
- `Entities/SenparcAiResult.cs`

Key points:

- `SenparcAiRequest.ReplacePrompt()` replaces placeholders using `StoreAiArguments + TempAiArguments`
- `AgentKernelArguments` implements `ISenparcKernelArguments.ReplacePrompt()`
- `SenparcKernelAiResult<T>` supports both non-stream `Result` and stream `StreamResult`

### 2.5 Embedding/RAG implementation class

File: `VectorStore/TextSearchStore.cs`

- Uses `VectorStoreCollectionDefinition` to explicitly define `Embedding` vector column and dimensions
- `UpsertDocumentsAsync()` internally calls `GetEmbeddingAsync()` to generate vectors
- `SearchAsync()` returns `TextSearchDocument` for direct RAG provider consumption

### 2.6 Current source status (important)

- `AgentAiHandler.Run(...)` is still marked "not officially enabled" (throws not implemented).
- `KernelConfigExtensions.Plugin.cs` is commented out in AgentKernel; sample `[5][6]` uses `NotSupportedSample` placeholder.
- Naming currently includes both `KernelConfigExtension` and `KernelConfigExtensions`; search both when troubleshooting extension methods.

## 3. Suggested reading order

1. `Register.cs` (DI registration)
2. `Entities/IWanTo.cs` (chain object states)
3. `KernelConfigExtensions/KernelConfigExtensions.cs` (configuration and build)
4. `Helpers/AgentKernelHelper.Config.*.cs` (provider dispatch)
5. `Kernels/AiKernel.cs` (runtime behavior)
6. `KernelConfigExtensions/*.Chat|Embedding|Speech.cs` (execution stage)

## 4. Library reference entry

- Full CHM-style table: [/source/reference/agentkernel.html](/source/reference/agentkernel.html)
