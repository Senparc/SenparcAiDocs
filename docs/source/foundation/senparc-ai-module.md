# Senparc.AI (Foundation Standard Layer)

`Senparc.AI` itself does not decide which SDK performs remote requests. It defines unified interfaces, configuration objects, and shared conventions across implementation layers.

## 1. Interface Layer (what developers touch directly)

In Sample/business code, `Senparc.AI` mainly provides a unified contract so you are not hard-bound to a single implementation.

### 1.1 Base capability interfaces

Core interfaces are in `src/Senparc.AI/Interfaces/*`:

- `IAiHandler` / `IAiHandler<TRequest, TResult, TContext>`
- `IAiRequest<TContext>`
- `IAiResult`
- `IAiContext` / `IAiContext<T>` / `IAiAgentContext<T>`
- `ISenparcAiSetting`

These interfaces define a unified contract for request/context/result. Both `Senparc.AI.Kernel` and `Senparc.AI.AgentKernel` implement this contract.

### 1.2 Unified configuration object and provider selection

`SenparcAiSetting` in `appsettings.json` is ultimately bound to the `ISenparcAiSetting` contract.

Most frequently used shared enums:

- `AiPlatform`: `OpenAI`, `AzureOpenAI`, `NeuCharAI`, `Ollama`, `DeepSeek`, etc.
- `ConfigModel`: `Chat`, `TextCompletion`, `TextEmbedding`, `TextToImage`, `SpeechToText`, `TextToSpeech`

### 1.3 Fast provider switching (code level)

`SenparcAiSettingBase` offers quick provider switching helpers such as:

- `SetOpenAI(OpenAIKeys)`
- `SetAzureOpenAI(AzureOpenAIKeys)`
- `SetNeuCharAI(NeuCharAIKeys)`
- `SetOllama(OllamaKeys)`
- `SetDeepSeek(DeepSeekKeys)`

Value of this approach: switch providers while keeping the same business-level API chain.

## 2. Implementation Layer (core underlying classes and methods)

### 2.1 Request/context/result triad contract

- `IAiRequest<TContext>`: defines `UserId`, `RequestContent`, `ParameterConfig`, `TempAiArguments`
- `IAiResult`: defines `InputContent`, `InputContext`, `OutputString`, `LastException`
- `IAiContext`: abstract context dictionary
- `ISenparcKernelArguments.ReplacePrompt()`: unified placeholder replacement contract

This keeps upper-layer call semantics consistent across different kernels (SK / MAF).

### 2.2 Core logic in `SenparcAiSettingBase`

File: `src/Senparc.AI/Entities/SenparcAiSettingBase.cs`

Key points:

- Derives `ApiKey`, `Endpoint`, `ModelName`, and `DeploymentName` by `AiPlatform`
- Supports grouped multi-model configuration via `Items` (`ConcurrentDictionary<string, T>`)
- Default `VectorDB = Default` (`Memory`)

Meaning: once business layer gets `ISenparcAiSetting`, it does not need provider-specific branching; branching is already encapsulated in settings properties.

### 2.3 Model naming and vector store configuration

Files:

- `src/Senparc.AI/Entities/Keys/Base/BaseKeys.cs`
- `src/Senparc.AI/Interfaces/VectorDB.cs`

`ModelName` is split by capabilities:

- `TextCompletion`
- `Chat`
- `Embedding`
- `TextToImage`
- `TextToSpeech`
- `SpeechToText`
- `EmbeddingDimensions`

`VectorDB` provides unified config entry (`Type + ConnectionString`) so upper layer can switch across Memory / Redis / Qdrant.

### 2.4 Global config anchor

File: `src/Senparc.AI/Config.cs`

- `Config.SenparcAiSetting` is the global shared setting entry.
- Both implementation layers (`Kernel` / `AgentKernel`) write settings back here during registration, forming a unified config source.

## 3. What to remember when reading other modules

- When you see `IWantTo(...).ConfigModel(...).BuildKernel(...)`, it is still consuming the standard contracts defined by `Senparc.AI`.
- Different `Run...Async` return shapes do not break contracts; they map to the same unified result model around `IAiResult`.

## 4. Library reference entry

- Full CHM-style table: [/source/reference/senparc-ai.html](/source/reference/senparc-ai.html)
