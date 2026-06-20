# Senparc.AI（基础标准层）

## 1. 枚举

### 1.1 `AiPlatform`

| 成员 | 值 | 说明 |
| --- | ---: | --- |
| `UnSet` | `0` | 未设置 |
| `None` | `1` | 显式无平台 |
| `Other` | `2` | 其他平台占位 |
| `NeuCharAI` | `4` | NeuChar AI |
| `OpenAI` | `8` | OpenAI |
| `AzureOpenAI` | `16` | Azure OpenAI |
| `HuggingFace` | `32` | HuggingFace |
| `FastAPI` | `128` | FastAPI 自定义网关 |
| `Ollama` | `256` | Ollama |
| `DeepSeek` | `512` | DeepSeek |

### 1.2 `ConfigModel`

| 成员 | 值 | 说明 |
| --- | ---: | --- |
| `Other` | `-1` | 其他类型 |
| `Unknown` | `0` | 未知 |
| `TextCompletion` | `1` | 文本补全 |
| `Chat` | `2` | 聊天 |
| `TextEmbedding` | `3` | 向量化 |
| `TextToImage` | `4` | 文生图 |
| `ImageGeneration` | `4` | 旧名（已废弃） |
| `ImageToText` | `5` | 图生文 |
| `TextToSpeech` | `6` | 文转语音 |
| `SpeechToText` | `7` | 语音转文本 |
| `SpeechRecognition` | `8` | 语音识别扩展位 |

### 1.3 `VectorDBType`

| 成员 | 值 | 说明 |
| --- | ---: | --- |
| `Memory` | `0` | 内存向量库 |
| `HardDisk` | `1` | 本地磁盘（实现层支持受限） |
| `Redis` | `2` | Redis 向量存储 |
| `Milvus` | `3` | Milvus |
| `Chroma` | `4` | Chroma |
| `PostgreSQL` | `5` | PostgreSQL |
| `Sqlite` | `6` | SQLite |
| `SqlServer` | `7` | SQL Server |
| `Qdrant` | `8` | Qdrant |
| `Default` | `0` | 默认映射到 `Memory` |

## 2. 核心接口

### 2.1 `IAiHandler<TRequest, TResult, TContext>`

| 成员 | 签名 | 说明 |
| --- | --- | --- |
| `Run` | `TResult Run(TRequest request, ISenparcAiSetting? senparcAiSetting = null)` | 统一执行入口 |

### 2.2 `IAiRequest<TContext>`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `UserId` | `string` | 用户标识 |
| `RequestContent` | `string` | Prompt / 输入文本 |
| `ParameterConfig` | `PromptConfigParameter` | 推理参数 |
| `TempAiArguments` | `TContext` | 临时上下文 |

### 2.3 `IAiResult`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `InputContent` | `string` | 输入文本 |
| `InputContext` | `IAiContext` | 输入上下文 |
| `OutputString` | `string` | 输出文本 |
| `LastException` | `Exception?` | 最近异常 |

### 2.4 `IAiContext` / `IAiContext<T>` / `IAiAgentContext<T>`

| 类型 | 关键成员 | 说明 |
| --- | --- | --- |
| `IAiContext` | `Context` | 通用上下文字典 |
| `IAiContext<T>` | `KernelArguments` | 扩展上下文（SK） |
| `IAiAgentContext<T>` | `AgentKernelArguments` | 扩展上下文（Agent） |

### 2.5 `ISenparcKernelArguments`

| 成员 | 签名 | 说明 |
| --- | --- | --- |
| `ReplacePrompt` | `string ReplacePrompt(string prompt, string prefix = "${{", string suffix = "}}")` | 用上下文值替换提示词占位符 |

### 2.6 `ISenparcAiSetting`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `IsDebug` | `bool` | 调试开关 |
| `VectorDB` | `VectorDB` | 向量库配置 |
| `AiPlatform` | `AiPlatform` | 当前平台 |
| `OpenAIKeys` | `OpenAIKeys` | OpenAI 密钥配置 |
| `AzureOpenAIKeys` | `AzureOpenAIKeys` | Azure OpenAI 配置 |
| `NeuCharAIKeys` | `NeuCharAIKeys` | NeuChar 配置 |
| `HuggingFaceKeys` | `HuggingFaceKeys` | HuggingFace 配置 |
| `FastAPIKeys` | `FastAPIKeys` | FastAPI 配置 |
| `OllamaKeys` | `OllamaKeys` | Ollama 配置 |
| `DeepSeekKeys` | `DeepSeekKeys` | DeepSeek 配置 |
| `ApiKey` | `string` | 按平台派生的 API Key |
| `OrganizationId` | `string` | 组织 ID（OpenAI/FastAPI） |
| `Endpoint` | `string` | 按平台派生的 Endpoint |
| `ModelName` | `ModelName` | 模型名集合 |
| `DeploymentName` | `string` | Azure 部署名 |

## 3. 配置与模型类

### 3.1 `ModelName`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `TextCompletion` | `string` | 补全模型名 |
| `Chat` | `string` | 聊天模型名 |
| `Embedding` | `string` | 向量模型名 |
| `EmbeddingDimensions` | `int?` | 向量维度 |
| `TextToImage` | `string` | 文生图模型名 |
| `ImageToText` | `string` | 图生文模型名 |
| `TextToSpeech` | `string` | 文转语音模型名 |
| `SpeechToText` | `string` | 语音转文本模型名 |

### 3.2 `VectorDB`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `Type` | `VectorDBType` | 向量库类型 |
| `ConnectionString` | `string?` | 连接串 |

### 3.3 `PromptConfigParameter`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `MaxTokens` | `int?` | 最大 Token |
| `MaxCompletionTokens` | `int?` | 同步别名 |
| `Temperature` | `double?` | 温度 |
| `TopP` | `double?` | Top-P |
| `PresencePenalty` | `double?` | 话题惩罚 |
| `FrequencyPenalty` | `double?` | 频率惩罚 |
| `StopSequences` | `List<string>?` | 停止词 |

### 3.4 `SenparcAiSettingBase`

关键属性（摘录）：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `AiPlatform` | `AiPlatform` | 当前平台 |
| `ApiKey` | `string` | 自动按平台取值 |
| `Endpoint` | `string` | 自动按平台取值（接口默认实现） |
| `ModelName` | `ModelName` | 自动按平台取值 |
| `DeploymentName` | `string` | 仅 Azure 等需部署名场景 |

关键方法：

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `SetOpenAI` | `OpenAIKeys openAIKeys` | 切换到 OpenAI |
| `SetAzureOpenAI` | `AzureOpenAIKeys azureOpenAIKeys` | 切换到 Azure OpenAI |
| `SetNeuCharAI` | `NeuCharAIKeys neuCharAIKeys` | 切换到 NeuChar AI |
| `SetHuggingFace` | `HuggingFaceKeys huggingFaceKeys` | 切换到 HuggingFace |
| `SetFastAPI` | `FastAPIKeys fastAPIKeys` | 切换到 FastAPI |
| `SetOllama` | `OllamaKeys ollamaAPIKeys` | 切换到 Ollama |
| `SetDeepSeek` | `DeepSeekKeys deepSeekKeys` | 切换到 DeepSeek |
| `SetOtherPlatform` | 无 | 切换到其他平台 |

### 3.5 `*Keys` 类型速查

| 类型 | 关键属性 |
| --- | --- |
| `OpenAIKeys` | `ApiKey`, `OrganizationId`, `OpenAIEndpoint`, `ModelName` |
| `AzureOpenAIKeys` | `ApiKey`, `AzureEndpoint`, `AzureOpenAIApiVersion`, `DeploymentName`, `ModelName` |
| `NeuCharAIKeys` | `ApiKey`, `NeuCharEndpoint`, `NeuCharAIApiVersion`, `ModelName` |
| `OllamaKeys` | `Endpoint`, `ModelName` |
| `DeepSeekKeys` | `ApiKey`, `Endpoint`, `ModelName` |
| `FastAPIKeys` | `Endpoint`, `ApiKey`, `OrganizationId`, `ModelName` |
| `HuggingFaceKeys` | `Endpoint`, `ModelName` |

## 4. 运行期基础工具

### 4.1 `DefaultSetting`

| 成员 | 签名 | 说明 |
| --- | --- | --- |
| `DEFAULT_SYSTEM_MESSAGE` | `const string` | 默认系统提示词 |
| `GetPromptForChat` | `string GetPromptForChat(string systemMessage = ..., string humanId = "User", string robotId = "Assistant", string hisgoryArgName = "history", string humanInputArgName = "human_input")` | 生成 Chat Prompt 模板 |

### 4.2 `Config`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `SenparcAiSetting` | `ISenparcAiSetting` | 全局 AI 配置入口 |

### 4.3 `Register`

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `UseSenparcAICore` | `IRegisterService UseSenparcAICore(this IRegisterService registerService)` | 核心注册扩展 |

### 4.4 `SenparcAiException`

| 类型 | 说明 |
| --- | --- |
| `SenparcAiException : BaseException` | 模块统一异常类型 |
