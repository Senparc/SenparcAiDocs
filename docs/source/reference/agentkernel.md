# Senparc.AI.AgentKernel (Microsoft Agent Framework)

## 1. Core type overview

| Type | Purpose | Common entry |
| --- | --- | --- |
| `Register` | Injects `IAiHandler -> AgentAiHandler` | `services.AddSenparcAI(config)` |
| `AgentAiHandler` | Main AgentKernel handler | `IAiHandler` |
| `IWantTo / IWantToConfig / IWantToBuild / IWantToRun` | Chain configuration state containers | `handler.IWantTo(...).Config...().Build...()` |
| `AgentKernelHelper` | Configures models + builds `AiKernel` | `ConfigChat/ConfigTextEmbedding...` |
| `KernelConfigExtension(s)` | Public extension layer | `ConfigModel`, `BuildKernel`, `RunChatAsync` |
| `IAIKernelBuilder / AIKernelBuilder` | Runtime kernel builder | `CreateBuilder()` |
| `AiKernel` | Runtime capability container | Chat / Image / Embedding / STT / TTS |
| `SenparcAiRequest` | Request model | `CreateRequest(...)` |
| `AgentKernelArguments` | Agent context parameter dictionary | `ReplacePrompt()` |
| `SenparcAiResult / SenparcKernelAiResult<T>` | Result models | returned by `RunChatAsync` |
| `TextSearchStore` | RAG retrieval wrapper | `CreateTextSearchStore()` |

## 2. Enums and base data structures

### 2.1 `ContentType` (`Helpers/ChatHelper.cs`)

| Member | Description |
| --- | --- |
| `Text` | Text content |
| `Image` | Image content |

### 2.2 `TextSearchDocument`

| Property | Type | Description |
| --- | --- | --- |
| `SourceId` | `ulong` | Document ID |
| `SourceName` | `string` | Document name |
| `SourceLink` | `string` | Source link |
| `Text` | `string` | Text body |
| `Score` | `double?` | Retrieval score |

## 3. Registration and handler

### 3.1 `Register`

| Method | Signature | Description |
| --- | --- | --- |
| `GetAppSettingsFile` | `string GetAppSettingsFile()` | Automatically chooses `appsettings.Development.json` / `appsettings.json` |
| `AddSenparcAI` | `IServiceCollection AddSenparcAI(this IServiceCollection services, IConfiguration config, ISenparcAiSetting senparcAiSetting = null)` | Binds config and injects `IAiHandler` |
| `UseSenparcAI` | `IRegisterService UseSenparcAI(this IRegisterService registerService)` | Runtime registration entry |

### 3.2 `AgentAiHandler`

| Method | Parameter | Description |
| --- | --- | --- |
| `Run` | `SenparcAiRequest request, ISenparcAiSetting? senparcAiSetting = null` | Unified Run entry (currently not officially enabled) |
| `RemoveHistory` | `string history, int maxHistoryCount, string humanId = "Human", string robotId = "ChatBot"` | Trims history text by count |
| `RemoveHistory` | `ChatHistory chatHistory, int maxHistoryCount` | Trims `ChatHistory` by count |

## 4. Chain state objects (`IWantTo` series)

### 4.1 `IWantTo`

| Property | Type | Description |
| --- | --- | --- |
| `TempStore` | `ConcurrentDictionary<string, object>` | Temporary state pool |
| `KernelBuilder` | `IAIKernelBuilder` | Current builder |
| `AgentKernelHelper` | `AgentKernelHelper` | Helper entry |
| `AgentAiHandler` | `AgentAiHandler` | Handler reference |
| `SenparcAiSetting` | `ISenparcAiSetting` | Current setting |
| `Kernel` | `AiKernel` | Current kernel |
| `UserId` | `string` | User ID |
| `ModelName` | `string` | Current model name |

### 4.2 `IWantToConfig / IWantToBuild / IWantToRun`

| Type | Key properties |
| --- | --- |
| `IWantToConfig` | `IWantTo`, `UserId`, `ModelName`, `ChatClientAgentOptions` |
| `IWantToBuild` | `IWantToConfig`, `Kernel` |
| `IWantToRun` | `IWantToBuild`, `StoredAiArguments`, `PromptConfigParameter`, `Functions`, `Kernel` |

## 5. `AgentKernelHelper` (model configuration hub)

### 5.1 Core methods

| Method | Parameter | Description |
| --- | --- | --- |
| `ResetHttpClient` | `HttpClient httpClient = null, bool enableLog = false` | Resets client and optionally enables request logging |
| `GetServiceId` | `string userId, string modelName` | Builds service ID |
| `GetKernel` | `ChatClientAgentOptions chatClientAgentOptions = null, Action<IAIKernelBuilder>? kernelBuilderAction = null, bool refresh = false` | Gets/reuses `AiKernel` |
| `BuildKernel` | `IAIKernelBuilder kernelBuilder, ChatClientAgentOptions chatClientAgentOptions = null, Action<IAIKernelBuilder>? kernelBuilderAction = null` | Builds new `AiKernel` |
| `ResetSenparcAiSetting` | `ISenparcAiSetting aiSetting` | Resets setting |

### 5.2 `Config*` methods

| Method | Main parameters | Capability |
| --- | --- | --- |
| `ConfigChat` | `userId, modelName, senparcAiSetting, kernelBuilder, deploymentName` | Chat model |
| `ConfigTextEmbeddingGeneration` | same | Embedding model |
| `ConfigImageGeneration` | same | Text-to-image model |
| `ConfigSpeechToText` | same | STT model |
| `ConfigTextToSpeech` | same | TTS model |
| `ConfigAudioToText` | same | STT alias |
| `ConfigTextToAudio` | same | TTS alias |

## 6. Extension-method layer (public API)

### 6.1 `KernelConfigExtension` (configuration and build)

| Method | Description |
| --- | --- |
| `IWantTo(...)` | Chain entry |
| `ConfigModel(...)` | Generic capability dispatch (Chat/Completion/Embedding/Image/STT/TTS) |
| `ConfigTextEmbeddingModel(...)` | Embedding + collection |
| `ConfigChatModel(...)` | Chat + `ChatClientAgentOptions` |
| `ConfigImageModel(...)` | Text-to-image model |
| `ConfigSpeechToTextModel(...)` | STT model |
| `ConfigTextToSpeechModel(...)` | TTS model |
| `GetVectorStore(...)` | Creates vector store from `VectorDBType` |
| `CreateTextSearchStore()` | Creates RAG retrieval wrapper |
| `BuildKernel(...)` | Builds kernel |
| `BuildKernelAsync(...)` | Async build (optional session creation) |
| `BuildKernelWithAgentSessionAsync(...)` | Build and bind `AgentSession` |
| `CreateRequest(...)` | Creates request (multiple overloads) |

### 6.2 `KernelConfigExtensions.Chat`

| Method | Parameter | Description |
| --- | --- | --- |
| `CreateChatClientAgentOptions` | `agentName, systemMessage, chatOptions = null` | Creates agent options |
| `RunChatAsync` | `prompt/request, agentSession = null, streamCallback = null` | Unified chat execution entry (with streaming support) |

### 6.3 Other extensions

| File | Key methods |
| --- | --- |
| `KernelConfigExtensions.Embedding.cs` | `GetEmbeddingAsync(...)` |
| `KernelConfigExtensions.Speech.cs` | `RunSpeechToTextAsync(...)`, `RunTextToSpeechAsync(...)`, `ParseGeneratedSpeechVoice(...)`, `ParseGeneratedSpeechFormat(...)` |
| `KernelConfigExtensions.Context.cs` | `SetTempContext(...)`, `SetStoredContext(...)`, `GetTempArguments(...)`, `GetStoredArguments(...)` |
| `Extensions/AIToolExtension.cs` | `GetAITools(this IAiHandler aiHandler, object instance)` |

## 7. Runtime kernel types

### 7.1 `IAIKernelBuilder / AIKernelBuilder`

| Member | Type/Signature | Description |
| --- | --- | --- |
| `ConfigModels` | `List<ConfigModel>` | Configured capability list |
| `ChatClient` | `object` | Chat client |
| `EmbeddingClient` | `object` | Embedding client |
| `ImageClient` | `object` | Image client |
| `SpeechToTextClient` | `object` | STT client |
| `TextToSpeechClient` | `object` | TTS client |
| `EmbeddingCollectionName` | `string` | Embedding collection name |
| `AddConfigModel` | `void AddConfigModel(ConfigModel configModel)` | Adds capability marker |
| `Build` | `AiKernel Build(ISenparcAiSetting senparcAiSetting, ChatClientAgentOptions chatClientAgentOptions = null)` | Creates `AiKernel` |

### 7.2 `AiKernel`

Key properties:

| Property | Type | Description |
| --- | --- | --- |
| `ConfigModels` | `ConfigModel[]` | Capability set |
| `ChatClientAgent` | `ChatClientAgent` | MAF agent object |
| `AgentSession` | `AgentSession?` | Session object |
| `EmbeddingGenerator` | `IEmbeddingGenerator` | Embedding generator |
| `EmbeddingCollectionName` | `string` | Embedding collection name |
| `EmbeddingDimensions` | `int` | Embedding dimensions |

Public methods:

| Method | Parameter | Description |
| --- | --- | --- |
| `SetAgentSessionAsync` | `AgentSession session` | Creates/binds session |
| `ImageGenerationAsync` | `prompt, width = 1024, height = 1024, imageCount = 1, quality = null, style = null, cancellationToken = default` | Text-to-image |
| `SpeechToTextAsync` | `Stream audioStream, string audioFileName, AudioTranscriptionOptions? options = null, CancellationToken cancellationToken = default` | Audio stream to text |
| `SpeechToTextAsync` | `string audioFilePath, AudioTranscriptionOptions? options = null, CancellationToken cancellationToken = default` | Audio file to text |
| `TextToSpeechAsync` | `string text, GeneratedSpeechVoice voice, SpeechGenerationOptions? options = null, CancellationToken cancellationToken = default` | Text to audio |

## 8. Request, context, result

### 8.1 `SenparcAiRequest`

| Property | Type | Description |
| --- | --- | --- |
| `UserId` | `string` | User ID |
| `RequestContent` | `string?` | Request content |
| `ParameterConfig` | `PromptConfigParameter` | Inference parameters |
| `TempAiArguments` | `SenparcAiArguments` | Temporary context |
| `StoreAiArguments` | `SenparcAiArguments` | Persistent context |
| `FunctionPipeline` | `AIFunction[]` | Function pipeline |
| `AgentSession` | `AgentSession` | Session object |
| `ArgumentPrefix/ArgumentSuffix` | `string` | Placeholder boundary |

Key method:

| Method | Signature | Description |
| --- | --- | --- |
| `ReplacePrompt` | `string ReplacePrompt()` | Replaces prompt placeholders with context |

### 8.2 `AgentKernelArguments` / `SenparcAiArguments`

| Type | Key members | Description |
| --- | --- | --- |
| `AgentKernelArguments` | `ReplacePrompt(prompt, prefix = "${{", suffix = "}}")` | Argument dictionary + placeholder replacement |
| `SenparcAiArguments` | `AgentKernelArguments`, `KernelArguments`, `Context` | Context wrapper object |

### 8.3 `SenparcAiResult`

| Member | Description |
| --- | --- |
| `InputContent` / `InputContext` / `OutputString` / `LastException` | Unified output fields |
| `SetLastFunctionResultContent(...)` | Stores latest function invocation result |
| `GetLastFunctionResultContent()` | Gets function result and function-calling hit state |

## 9. RAG type

### 9.1 `TextSearchStore`

| Method | Parameter | Description |
| --- | --- | --- |
| `UpsertDocumentsAsync` | `IEnumerable<TextSearchDocument> documents, IWantToRun iWantToRun = null` | Ingests docs and generates vectors |
| `SearchAsync` | `string query, int topK, CancellationToken cancellationToken = default` | Similarity retrieval |
| `GetSampleDocuments` | none | Returns built-in sample documents |

## 10. Transport and content helper types

### 10.1 HTTP handler components

| Type | Key members | Description |
| --- | --- | --- |
| `HttpMessageHandlerBuilder` | `Add(DelegatingHandler)`, `Build()` | Assembles handler chain |
| `LoggingHttpMessageHandler` | `SendAsync(...)` | Logs request/response |
| `RedirectingHttpMessageHandler` | `SendAsync(...)` | Rewrites target address by provider config |
| `BufferedHttpContent` | `SerializeToStreamAsync(...)`, `TryComputeLength(...)` | Re-readable content wrapper |

### 10.2 Content item types (`Helpers/ChatHelper.cs`)

| Type | Property | Description |
| --- | --- | --- |
| `ContentItem` | `Type` | Content type marker (text/image) |
| `ContentItem_Text` | `TextContent` | Text content |
| `ContentItem_ImageBse64` | `ImageData` | Base64/binary image data |
| `ContentItem_ImageUrl` | `image_url` | Image URL object |
| `ImageUrl` | `Url` | Image URL string |
