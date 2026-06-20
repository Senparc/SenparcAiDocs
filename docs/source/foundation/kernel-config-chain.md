# Real Call Chain from Interface Layer to Kernel Layer

This page answers one core question:

What exactly happens underneath `IWantTo().Config...().BuildKernel().Run...()`?

## 1. Interface-layer chain calls (what developers see)

Common AgentKernel sample usage:

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel(userId, options)
    .BuildKernelWithAgentSessionAsync();

var result = await iWantToRun.RunChatAsync(prompt, iWantToRun.Kernel.AgentSession);
```

Common Kernel sample usage:

```csharp
var iWantToRun = handler.IWantTo(setting)
    .ConfigModel(ConfigModel.TextCompletion, userId)
    .BuildKernel();

var request = iWantToRun.CreateRequest(prompt, true);
var result = await iWantToRun.RunAsync(request);
```

## 2. Underlying call chain in AgentKernel route

1. `IWantTo(setting)`
- Creates `IWantToConfig(new IWantTo(handler, setting))`
- Binds `AgentKernelHelper` and `IAIKernelBuilder` container

2. `Config...Model(...)`
- Falls into `KernelConfigExtension.ConfigModel(...)`
- Dispatches to `AgentKernelHelper.ConfigChat / ConfigTextEmbeddingGeneration / ConfigImageGeneration / ConfigSpeechToText / ConfigTextToSpeech`
- Then uses `KernelBuilderExtension.*` to bind concrete clients

3. `BuildKernel...()`
- Calls `AgentKernelHelper.BuildKernel(...)`
- `AIKernelBuilder.Build(...)` creates `AiKernel`
- `AiKernel` initializes `ChatClientAgent` / `EmbeddingGenerator`
- `BuildKernelWithAgentSessionAsync()` additionally creates and binds `AgentSession`

4. `Run...()`
- `RunChatAsync` -> `CreateRequest` -> `request.ReplacePrompt()` -> `AiKernel.InvokeChatAsync / InvokeChatStreamingAsync`
- Embedding/RAG -> `GetEmbeddingAsync` + `TextSearchStore`
- STT/TTS -> `AiKernel.SpeechToTextAsync` / `AiKernel.TextToSpeechAsync`

## 3. Underlying call chain in Kernel (Semantic) route

1. `IWantTo(setting)`
- Creates `IWantToConfig` with `SemanticKernelHelper`

2. `ConfigModel(...)`
- Falls into `KernelConfigExtension.ConfigModel(...)`
- Dispatches to `SemanticKernelHelper.ConfigChat / ConfigTextCompletion / ConfigTextEmbeddingGeneration / ConfigImageGeneration / ConfigAudioToText / ConfigTextToAudio`

3. `BuildKernel()`
- `SemanticKernelHelper.BuildKernel(...)` produces `Microsoft.SemanticKernel.Kernel`

4. `RunAsync(...)`
- In `KernelConfigExtensions.RunAsync(...)`, execution path is chosen by input type:
- `InvokePromptAsync`
- `InvokeAsync(function, arguments)`
- `InvokeStreamingAsync`

## 4. Engineering value of this chain

- One business style can be reused across AgentKernel and Kernel implementation routes.
- Configuration layer and execution layer are separated:
- Configuration layer binds model and clients
- Execution layer handles request, context, and streaming
- During troubleshooting, only locate which stage is failing (config/build/execute).
