# Program Entry and DI Connection to Core Projects

> This page focuses on AgentKernel Sample startup and traces the call chain back to the two core projects: `Senparc.AI` and `Senparc.AI.AgentKernel`.

`Samples/Senparc.AI.Samples.AgentKernelConsoles/Program.cs` is the business entry layer. It assembles dependencies but does not implement concrete AI logic.

## 1. What happens during startup

### 1.1 Read configuration

- `ConfigurationBuilder + appsettings.json`
- Final config object is bound to `SenparcAiSetting` during `AddSenparcAI(config)`

### 1.2 Register services

- `AddSenparcGlobalServices(config)`
- `AddSenparcAI(config)`
- `AddMemoryCache()`

Key point: `AddSenparcAI(config)` comes from the implementation layer (AgentKernel or Kernel) and injects `IAiHandler` with a concrete handler.

### 1.3 Register sample classes

- `ChatSample`
- `CompletionSample`
- `EmbeddingSample`
- `EmbeddingRagSample`
- `ImageGenerateSample`
- `SttSample`
- `TtsSample`

## 2. How menu routing maps to chain APIs

The menu routes to different sample classes; each sample then calls the unified chain interface:

```csharp
handler.IWantTo(setting)
    .ConfigModel(...)
    .BuildKernel(...)
```

Common branches:

- Chat: `ConfigChatModel(...)` + `BuildKernelWithAgentSessionAsync()`
- Embedding: `ConfigTextEmbeddingModel(...)` + `CreateTextSearchStore()`
- Image: `ConfigImageModel(...)` + `Kernel.ImageGenerationAsync(...)`
- STT/TTS: `ConfigSpeechToTextModel(...)` / `ConfigTextToSpeechModel(...)`

## 3. Shortest reverse-trace path from Program

1. `AddSenparcAI(config)` in Program
2. Enter `src/Senparc.AI.AgentKernel/Register.cs`
3. Check `IAiHandler -> AgentAiHandler` injection
4. Check `AgentAiHandler.IWantTo(...)` (extensions in `KernelConfigExtensions`)
5. Check `AgentKernelHelper.Config*` and `AIKernelBuilder/AiKernel`
6. Check execution extensions such as `RunChatAsync / GetEmbeddingAsync / RunTextToSpeechAsync`

## 4. Why this structure is extensible

- Program and business samples only depend on `IAiHandler` and chain APIs
- Provider dispatch (OpenAI/Azure/Ollama/DeepSeek) is centralized in helper layer
- Runtime details (Session, streaming, vector store) are encapsulated in kernel layer

This enables implementation switching or capability upgrades without major Program changes.
