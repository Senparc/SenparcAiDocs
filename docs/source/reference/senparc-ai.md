# Senparc.AI (Foundation Standard Layer)

## 1. Enums

### 1.1 `AiPlatform`

| Member | Value | Description |
| --- | ---: | --- |
| `UnSet` | `0` | Not set |
| `None` | `1` | Explicit no provider |
| `Other` | `2` | Placeholder for other providers |
| `NeuCharAI` | `4` | NeuChar AI |
| `OpenAI` | `8` | OpenAI |
| `AzureOpenAI` | `16` | Azure OpenAI |
| `HuggingFace` | `32` | HuggingFace |
| `FastAPI` | `128` | FastAPI custom gateway |
| `Ollama` | `256` | Ollama |
| `DeepSeek` | `512` | DeepSeek |

### 1.2 `ConfigModel`

| Member | Value | Description |
| --- | ---: | --- |
| `Other` | `-1` | Other type |
| `Unknown` | `0` | Unknown |
| `TextCompletion` | `1` | Text completion |
| `Chat` | `2` | Chat |
| `TextEmbedding` | `3` | Embedding |
| `TextToImage` | `4` | Text-to-image |
| `ImageGeneration` | `4` | Legacy name (deprecated) |
| `ImageToText` | `5` | Image-to-text |
| `TextToSpeech` | `6` | Text-to-speech |
| `SpeechToText` | `7` | Speech-to-text |
| `SpeechRecognition` | `8` | Speech recognition extension slot |

### 1.3 `VectorDBType`

| Member | Value | Description |
| --- | ---: | --- |
| `Memory` | `0` | In-memory vector store |
| `HardDisk` | `1` | Local disk (limited implementation support) |
| `Redis` | `2` | Redis vector store |
| `Milvus` | `3` | Milvus |
| `Chroma` | `4` | Chroma |
| `PostgreSQL` | `5` | PostgreSQL |
| `Sqlite` | `6` | SQLite |
| `SqlServer` | `7` | SQL Server |
| `Qdrant` | `8` | Qdrant |
| `Default` | `0` | Default maps to `Memory` |

## 2. Core interfaces

### 2.1 `IAiHandler<TRequest, TResult, TContext>`

| Member | Signature | Description |
| --- | --- | --- |
| `Run` | `TResult Run(TRequest request, ISenparcAiSetting? senparcAiSetting = null)` | Unified execution entry |

### 2.2 `IAiRequest<TContext>`

| Property | Type | Description |
| --- | --- | --- |
| `UserId` | `string` | User identifier |
| `RequestContent` | `string` | Prompt / input text |
| `ParameterConfig` | `PromptConfigParameter` | Inference parameters |
| `TempAiArguments` | `TContext` | Temporary context |

### 2.3 `IAiResult`

| Property | Type | Description |
| --- | --- | --- |
| `InputContent` | `string` | Input text |
| `InputContext` | `IAiContext` | Input context |
| `OutputString` | `string` | Output text |
| `LastException` | `Exception?` | Latest exception |

### 2.4 `IAiContext` / `IAiContext<T>` / `IAiAgentContext<T>`

| Type | Key Member | Description |
| --- | --- | --- |
| `IAiContext` | `Context` | Generic context dictionary |
| `IAiContext<T>` | `KernelArguments` | Extended context (SK) |
| `IAiAgentContext<T>` | `AgentKernelArguments` | Extended context (Agent) |

### 2.5 `ISenparcKernelArguments`

| Member | Signature | Description |
| --- | --- | --- |
| `ReplacePrompt` | `string ReplacePrompt(string prompt, string prefix = "${{", string suffix = "}}")` | Replaces prompt placeholders with context values |

### 2.6 `ISenparcAiSetting`

| Property | Type | Description |
| --- | --- | --- |
| `IsDebug` | `bool` | Debug switch |
| `VectorDB` | `VectorDB` | Vector store config |
| `AiPlatform` | `AiPlatform` | Current provider |
| `OpenAIKeys` | `OpenAIKeys` | OpenAI key config |
| `AzureOpenAIKeys` | `AzureOpenAIKeys` | Azure OpenAI config |
| `NeuCharAIKeys` | `NeuCharAIKeys` | NeuChar config |
| `HuggingFaceKeys` | `HuggingFaceKeys` | HuggingFace config |
| `FastAPIKeys` | `FastAPIKeys` | FastAPI config |
| `OllamaKeys` | `OllamaKeys` | Ollama config |
| `DeepSeekKeys` | `DeepSeekKeys` | DeepSeek config |
| `ApiKey` | `string` | Provider-derived API key |
| `OrganizationId` | `string` | Organization ID (OpenAI/FastAPI) |
| `Endpoint` | `string` | Provider-derived endpoint |
| `ModelName` | `ModelName` | Model-name collection |
| `DeploymentName` | `string` | Azure deployment name |

## 3. Config and model classes

### 3.1 `ModelName`

| Property | Type | Description |
| --- | --- | --- |
| `TextCompletion` | `string` | Completion model name |
| `Chat` | `string` | Chat model name |
| `Embedding` | `string` | Embedding model name |
| `EmbeddingDimensions` | `int?` | Embedding dimensions |
| `TextToImage` | `string` | Text-to-image model name |
| `ImageToText` | `string` | Image-to-text model name |
| `TextToSpeech` | `string` | Text-to-speech model name |
| `SpeechToText` | `string` | Speech-to-text model name |

### 3.2 `VectorDB`

| Property | Type | Description |
| --- | --- | --- |
| `Type` | `VectorDBType` | Vector store type |
| `ConnectionString` | `string?` | Connection string |

### 3.3 `PromptConfigParameter`

| Property | Type | Description |
| --- | --- | --- |
| `MaxTokens` | `int?` | Max tokens |
| `MaxCompletionTokens` | `int?` | Alias for completion max tokens |
| `Temperature` | `double?` | Temperature |
| `TopP` | `double?` | Top-P |
| `PresencePenalty` | `double?` | Presence penalty |
| `FrequencyPenalty` | `double?` | Frequency penalty |
| `StopSequences` | `List<string>?` | Stop sequences |

### 3.4 `SenparcAiSettingBase`

Key properties (excerpt):

| Property | Type | Description |
| --- | --- | --- |
| `AiPlatform` | `AiPlatform` | Current provider |
| `ApiKey` | `string` | Auto-resolved by provider |
| `Endpoint` | `string` | Auto-resolved by provider |
| `ModelName` | `ModelName` | Auto-resolved by provider |
| `DeploymentName` | `string` | Mainly for Azure-like deployment scenarios |

Key methods:

| Method | Parameter | Description |
| --- | --- | --- |
| `SetOpenAI` | `OpenAIKeys openAIKeys` | Switch to OpenAI |
| `SetAzureOpenAI` | `AzureOpenAIKeys azureOpenAIKeys` | Switch to Azure OpenAI |
| `SetNeuCharAI` | `NeuCharAIKeys neuCharAIKeys` | Switch to NeuChar AI |
| `SetHuggingFace` | `HuggingFaceKeys huggingFaceKeys` | Switch to HuggingFace |
| `SetFastAPI` | `FastAPIKeys fastAPIKeys` | Switch to FastAPI |
| `SetOllama` | `OllamaKeys ollamaAPIKeys` | Switch to Ollama |
| `SetDeepSeek` | `DeepSeekKeys deepSeekKeys` | Switch to DeepSeek |
| `SetOtherPlatform` | none | Switch to Other |

### 3.5 Quick lookup for `*Keys` types

| Type | Key properties |
| --- | --- |
| `OpenAIKeys` | `ApiKey`, `OrganizationId`, `OpenAIEndpoint`, `ModelName` |
| `AzureOpenAIKeys` | `ApiKey`, `AzureEndpoint`, `AzureOpenAIApiVersion`, `DeploymentName`, `ModelName` |
| `NeuCharAIKeys` | `ApiKey`, `NeuCharEndpoint`, `NeuCharAIApiVersion`, `ModelName` |
| `OllamaKeys` | `Endpoint`, `ModelName` |
| `DeepSeekKeys` | `ApiKey`, `Endpoint`, `ModelName` |
| `FastAPIKeys` | `Endpoint`, `ApiKey`, `OrganizationId`, `ModelName` |
| `HuggingFaceKeys` | `Endpoint`, `ModelName` |

## 4. Runtime base utilities

### 4.1 `DefaultSetting`

| Member | Signature | Description |
| --- | --- | --- |
| `DEFAULT_SYSTEM_MESSAGE` | `const string` | Default system prompt |
| `GetPromptForChat` | `string GetPromptForChat(string systemMessage = ..., string humanId = "User", string robotId = "Assistant", string hisgoryArgName = "history", string humanInputArgName = "human_input")` | Generates chat prompt template |

### 4.2 `Config`

| Property | Type | Description |
| --- | --- | --- |
| `SenparcAiSetting` | `ISenparcAiSetting` | Global AI config entry |

### 4.3 `Register`

| Method | Signature | Description |
| --- | --- | --- |
| `UseSenparcAICore` | `IRegisterService UseSenparcAICore(this IRegisterService registerService)` | Core registration extension |

### 4.4 `SenparcAiException`

| Type | Description |
| --- | --- |
| `SenparcAiException : BaseException` | Unified module exception type |
