# Senparc.AI.AgentKernel（Microsoft Agent Framework）

## 1. 核心类型总览

| 类型 | 作用 | 常见入口 |
| --- | --- | --- |
| `Register` | 注入 `IAiHandler -> AgentAiHandler` | `services.AddSenparcAI(config)` |
| `AgentAiHandler` | AgentKernel 主处理器 | `IAiHandler` |
| `IWantTo / IWantToConfig / IWantToBuild / IWantToRun` | 链式配置状态容器 | `handler.IWantTo(...).Config...().Build...()` |
| `AgentKernelHelper` | 配置模型 + 构建 `AiKernel` | `ConfigChat/ConfigTextEmbedding...` |
| `KernelConfigExtension(s)` | 公开扩展方法层 | `ConfigModel`、`BuildKernel`、`RunChatAsync` |
| `IAIKernelBuilder / AIKernelBuilder` | 运行时内核构建器 | `CreateBuilder()` |
| `AiKernel` | 运行时能力容器 | Chat / Image / Embedding / STT / TTS |
| `SenparcAiRequest` | 请求模型 | `CreateRequest(...)` |
| `AgentKernelArguments` | Agent 上下文参数字典 | `ReplacePrompt()` |
| `SenparcAiResult / SenparcKernelAiResult<T>` | 结果模型 | `RunChatAsync` 返回 |
| `TextSearchStore` | RAG 检索封装 | `CreateTextSearchStore()` |

## 2. 枚举与基础数据结构

### 2.1 `ContentType`（`Helpers/ChatHelper.cs`）

| 成员 | 说明 |
| --- | --- |
| `Text` | 文本内容 |
| `Image` | 图片内容 |

### 2.2 `TextSearchDocument`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `SourceId` | `ulong` | 文档 ID |
| `SourceName` | `string` | 文档名称 |
| `SourceLink` | `string` | 来源链接 |
| `Text` | `string` | 文本正文 |
| `Score` | `double?` | 检索得分 |

## 3. 注册与处理器

### 3.1 `Register`

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `GetAppSettingsFile` | `string GetAppSettingsFile()` | 自动选择 `appsettings.Development.json` / `appsettings.json` |
| `AddSenparcAI` | `IServiceCollection AddSenparcAI(this IServiceCollection services, IConfiguration config, ISenparcAiSetting senparcAiSetting = null)` | 绑定配置并注入 `IAiHandler` |
| `UseSenparcAI` | `IRegisterService UseSenparcAI(this IRegisterService registerService)` | 运行时注册链接口 |

### 3.2 `AgentAiHandler`

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `Run` | `SenparcAiRequest request, ISenparcAiSetting? senparcAiSetting = null` | 统一 Run 接口（当前实现中未正式启用） |
| `RemoveHistory` | `string history, int maxHistoryCount, string humanId = "Human", string robotId = "ChatBot"` | 按文本历史裁剪 |
| `RemoveHistory` | `ChatHistory chatHistory, int maxHistoryCount` | 按 ChatHistory 裁剪 |

## 4. 链式状态对象（IWantTo 系列）

### 4.1 `IWantTo`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `TempStore` | `ConcurrentDictionary<string, object>` | 临时状态池 |
| `KernelBuilder` | `IAIKernelBuilder` | 当前构建器 |
| `AgentKernelHelper` | `AgentKernelHelper` | Helper 入口 |
| `AgentAiHandler` | `AgentAiHandler` | 处理器引用 |
| `SenparcAiSetting` | `ISenparcAiSetting` | 当前配置 |
| `Kernel` | `AiKernel` | 当前内核对象 |
| `UserId` | `string` | 用户 ID |
| `ModelName` | `string` | 当前模型名 |

### 4.2 `IWantToConfig / IWantToBuild / IWantToRun`

| 类型 | 关键属性 |
| --- | --- |
| `IWantToConfig` | `IWantTo`, `UserId`, `ModelName`, `ChatClientAgentOptions` |
| `IWantToBuild` | `IWantToConfig`, `Kernel` |
| `IWantToRun` | `IWantToBuild`, `StoredAiArguments`, `PromptConfigParameter`, `Functions`, `Kernel` |

## 5. `AgentKernelHelper`（模型配置中枢）

### 5.1 核心方法

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `ResetHttpClient` | `HttpClient httpClient = null, bool enableLog = false` | 重置并可启用请求日志 |
| `GetServiceId` | `string userId, string modelName` | 生成服务 ID |
| `GetKernel` | `ChatClientAgentOptions chatClientAgentOptions = null, Action<IAIKernelBuilder>? kernelBuilderAction = null, bool refresh = false` | 获取/复用 `AiKernel` |
| `BuildKernel` | `IAIKernelBuilder kernelBuilder, ChatClientAgentOptions chatClientAgentOptions = null, Action<IAIKernelBuilder>? kernelBuilderAction = null` | 构建新 `AiKernel` |
| `ResetSenparcAiSetting` | `ISenparcAiSetting aiSetting` | 重置配置 |

### 5.2 `Config*` 方法

| 方法 | 主要参数 | 能力 |
| --- | --- | --- |
| `ConfigChat` | `userId, modelName, senparcAiSetting, kernelBuilder, deploymentName` | Chat 模型 |
| `ConfigTextEmbeddingGeneration` | 同上 | Embedding 模型 |
| `ConfigImageGeneration` | 同上 | TextToImage 模型 |
| `ConfigSpeechToText` | 同上 | STT 模型 |
| `ConfigTextToSpeech` | 同上 | TTS 模型 |
| `ConfigAudioToText` | 同上 | STT 别名方法 |
| `ConfigTextToAudio` | 同上 | TTS 别名方法 |

## 6. 扩展方法层（公开 API）

### 6.1 `KernelConfigExtension`（配置与构建）

| 方法 | 说明 |
| --- | --- |
| `IWantTo(...)` | 链式入口 |
| `ConfigModel(...)` | 通用能力配置分发（Chat/Completion/Embedding/Image/STT/TTS） |
| `ConfigTextEmbeddingModel(...)` | Embedding + collection |
| `ConfigChatModel(...)` | Chat + `ChatClientAgentOptions` |
| `ConfigImageModel(...)` | 文生图模型 |
| `ConfigSpeechToTextModel(...)` | STT 模型 |
| `ConfigTextToSpeechModel(...)` | TTS 模型 |
| `GetVectorStore(...)` | 基于 `VectorDBType` 创建向量库 |
| `CreateTextSearchStore()` | 创建 RAG 检索封装 |
| `BuildKernel(...)` | 构建内核 |
| `BuildKernelAsync(...)` | 异步构建（可选建 Session） |
| `BuildKernelWithAgentSessionAsync(...)` | 构建并绑定 `AgentSession` |
| `CreateRequest(...)` | 创建请求（多重重载） |

### 6.2 `KernelConfigExtensions.Chat`

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `CreateChatClientAgentOptions` | `agentName, systemMessage, chatOptions = null` | 构造 Agent 选项 |
| `RunChatAsync` | `prompt/request, agentSession = null, streamCallback = null` | 统一聊天运行入口（支持流式） |

### 6.3 其他扩展

| 文件 | 关键方法 |
| --- | --- |
| `KernelConfigExtensions.Embedding.cs` | `GetEmbeddingAsync(...)` |
| `KernelConfigExtensions.Speech.cs` | `RunSpeechToTextAsync(...)`, `RunTextToSpeechAsync(...)`, `ParseGeneratedSpeechVoice(...)`, `ParseGeneratedSpeechFormat(...)` |
| `KernelConfigExtensions.Context.cs` | `SetTempContext(...)`, `SetStoredContext(...)`, `GetTempArguments(...)`, `GetStoredArguments(...)` |
| `Extensions/AIToolExtension.cs` | `GetAITools(this IAiHandler aiHandler, object instance)` |

## 7. 运行时内核类型

### 7.1 `IAIKernelBuilder / AIKernelBuilder`

| 成员 | 类型/签名 | 说明 |
| --- | --- | --- |
| `ConfigModels` | `List<ConfigModel>` | 已配置能力列表 |
| `ChatClient` | `object` | 聊天客户端 |
| `EmbeddingClient` | `object` | 向量客户端 |
| `ImageClient` | `object` | 图像客户端 |
| `SpeechToTextClient` | `object` | STT 客户端 |
| `TextToSpeechClient` | `object` | TTS 客户端 |
| `EmbeddingCollectionName` | `string` | 向量集合名 |
| `AddConfigModel` | `void AddConfigModel(ConfigModel configModel)` | 增加能力标记 |
| `Build` | `AiKernel Build(ISenparcAiSetting senparcAiSetting, ChatClientAgentOptions chatClientAgentOptions = null)` | 生成 `AiKernel` |

### 7.2 `AiKernel`

关键属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `ConfigModels` | `ConfigModel[]` | 能力集 |
| `ChatClientAgent` | `ChatClientAgent` | MAF Agent 对象 |
| `AgentSession` | `AgentSession?` | 会话对象 |
| `EmbeddingGenerator` | `IEmbeddingGenerator` | 向量生成器 |
| `EmbeddingCollectionName` | `string` | 向量集合名 |
| `EmbeddingDimensions` | `int` | 向量维度 |

公开方法：

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `SetAgentSessionAsync` | `AgentSession session` | 创建/绑定会话 |
| `ImageGenerationAsync` | `prompt, width = 1024, height = 1024, imageCount = 1, quality = null, style = null, cancellationToken = default` | 文生图 |
| `SpeechToTextAsync` | `Stream audioStream, string audioFileName, AudioTranscriptionOptions? options = null, CancellationToken cancellationToken = default` | 音频流转文本 |
| `SpeechToTextAsync` | `string audioFilePath, AudioTranscriptionOptions? options = null, CancellationToken cancellationToken = default` | 音频文件转文本 |
| `TextToSpeechAsync` | `string text, GeneratedSpeechVoice voice, SpeechGenerationOptions? options = null, CancellationToken cancellationToken = default` | 文本转音频 |

## 8. 请求、上下文、结果

### 8.1 `SenparcAiRequest`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `UserId` | `string` | 用户 ID |
| `RequestContent` | `string?` | 请求内容 |
| `ParameterConfig` | `PromptConfigParameter` | 推理参数 |
| `TempAiArguments` | `SenparcAiArguments` | 临时上下文 |
| `StoreAiArguments` | `SenparcAiArguments` | 持久上下文 |
| `FunctionPipeline` | `AIFunction[]` | 函数流水线 |
| `AgentSession` | `AgentSession` | 会话对象 |
| `ArgumentPrefix/ArgumentSuffix` | `string` | 占位符边界 |

关键方法：

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `ReplacePrompt` | `string ReplacePrompt()` | 用上下文替换 Prompt 占位符 |

### 8.2 `AgentKernelArguments` / `SenparcAiArguments`

| 类型 | 关键成员 | 说明 |
| --- | --- | --- |
| `AgentKernelArguments` | `ReplacePrompt(prompt, prefix = "${{", suffix = "}}")` | 参数字典 + 占位符替换 |
| `SenparcAiArguments` | `AgentKernelArguments`, `KernelArguments`, `Context` | 上下文包装对象 |

### 8.3 `SenparcAiResult`

| 成员 | 说明 |
| --- | --- |
| `InputContent` / `InputContext` / `OutputString` / `LastException` | 统一输出字段 |
| `SetLastFunctionResultContent(...)` | 写入最后一次 Function 调用结果 |
| `GetLastFunctionResultContent()` | 获取 Function 结果与是否命中 function-calling |

## 9. RAG 类型

### 9.1 `TextSearchStore`

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `UpsertDocumentsAsync` | `IEnumerable<TextSearchDocument> documents, IWantToRun iWantToRun = null` | 入库并生成向量 |
| `SearchAsync` | `string query, int topK, CancellationToken cancellationToken = default` | 相似检索 |
| `GetSampleDocuments` | 无 | 返回内置示例文档 |

## 10. 传输与内容辅助类型

### 10.1 HTTP Handler 组件

| 类型 | 关键成员 | 说明 |
| --- | --- | --- |
| `HttpMessageHandlerBuilder` | `Add(DelegatingHandler)`, `Build()` | 组装 Handler 链 |
| `LoggingHttpMessageHandler` | `SendAsync(...)` | 记录请求/响应日志 |
| `RedirectingHttpMessageHandler` | `SendAsync(...)` | 根据平台配置重写目标地址 |
| `BufferedHttpContent` | `SerializeToStreamAsync(...)`, `TryComputeLength(...)` | 读取后可重复消费的内容包装 |

### 10.2 内容项类型（`Helpers/ChatHelper.cs`）

| 类型 | 属性 | 说明 |
| --- | --- | --- |
| `ContentItem` | `Type` | 内容类型标记（文本/图片） |
| `ContentItem_Text` | `TextContent` | 文本内容 |
| `ContentItem_ImageBse64` | `ImageData` | Base64/二进制图像数据 |
| `ContentItem_ImageUrl` | `image_url` | 图片 URL 对象 |
| `ImageUrl` | `Url` | 图片 URL 字符串 |
