# Senparc.AI（基础标准层）

`Senparc.AI` 本身不负责“具体调用哪个 SDK 发请求”，它负责定义统一接口、配置对象与跨实现层共用约定。

## 一、接口层（开发者直接接触）

在 Sample / 业务层，`Senparc.AI` 主要提供“统一协议”，让你不需要直接绑死某个实现层。

### 1. 基础能力接口

核心接口位于 `src/Senparc.AI/Interfaces/*`：

- `IAiHandler` / `IAiHandler<TRequest, TResult, TContext>`
- `IAiRequest<TContext>`
- `IAiResult`
- `IAiContext` / `IAiContext<T>` / `IAiAgentContext<T>`
- `ISenparcAiSetting`

这些接口定义了“请求-上下文-结果”的统一契约。`Senparc.AI.Kernel` 与 `Senparc.AI.AgentKernel` 都是基于这套契约实现。

### 2. 统一配置对象与平台选择

你在 `appsettings.json` 中配置的 `SenparcAiSetting`，最终都落在 `ISenparcAiSetting` 约定上。

开发时最常用的公共枚举：

- `AiPlatform`：`OpenAI`、`AzureOpenAI`、`NeuCharAI`、`Ollama`、`DeepSeek` 等
- `ConfigModel`：`Chat`、`TextCompletion`、`TextEmbedding`、`TextToImage`、`SpeechToText`、`TextToSpeech`

### 3. 快速切平台（代码层）

`SenparcAiSettingBase` 提供快速切平台方法，常见如：

- `SetOpenAI(OpenAIKeys)`
- `SetAzureOpenAI(AzureOpenAIKeys)`
- `SetNeuCharAI(NeuCharAIKeys)`
- `SetOllama(OllamaKeys)`
- `SetDeepSeek(DeepSeekKeys)`

这类方法的价值是：你可以在同一套业务调用链里，替换平台而不改业务层 API。

## 二、实现层（底层核心类与方法）

### 1. 请求/上下文/结果三件套约定

- `IAiRequest<TContext>`：定义 `UserId`、`RequestContent`、`ParameterConfig`、`TempAiArguments`
- `IAiResult`：定义 `InputContent`、`InputContext`、`OutputString`、`LastException`
- `IAiContext`：抽象上下文字典
- `ISenparcKernelArguments.ReplacePrompt()`：统一占位符替换协议

这决定了上层调用链可以在不同内核实现（SK / MAF）之间保持一致语义。

### 2. `SenparcAiSettingBase` 的核心逻辑

文件：`src/Senparc.AI/Entities/SenparcAiSettingBase.cs`

关键点：

- 通过 `AiPlatform` 统一派生 `ApiKey`、`Endpoint`、`ModelName`、`DeploymentName`
- 支持 `Items` 多模型分组配置（`ConcurrentDictionary<string, T>`）
- 默认初始化 `VectorDB = Default`（Memory）

也就是说：业务层拿到一个 `ISenparcAiSetting` 后，不需要再写平台分支判断，底层已经在属性层完成了分发。

### 3. 模型命名与向量库配置

文件：

- `src/Senparc.AI/Entities/Keys/Base/BaseKeys.cs`
- `src/Senparc.AI/Interfaces/VectorDB.cs`

`ModelName` 按能力拆分：

- `TextCompletion`
- `Chat`
- `Embedding`
- `TextToImage`
- `TextToSpeech`
- `SpeechToText`
- `EmbeddingDimensions`

`VectorDB` 提供统一配置入口（`Type + ConnectionString`），让上层可在 Memory / Redis / Qdrant 等类型间切换。

### 4. 全局配置落点

文件：`src/Senparc.AI/Config.cs`

- `Config.SenparcAiSetting` 是全局共享设置入口。
- 两个实现层（`Kernel` / `AgentKernel`）在注册时都把配置写回这里，形成统一配置源。

## 三、你在读另外两个模块时要记住

- 看到 `IWantTo(...).ConfigModel(...).BuildKernel(...)` 时，本质上都在消费 `Senparc.AI` 定义的这套基础协议。
- 看到 `Run...Async` 返回结构不同，不代表契约断裂；它们都映射到 `IAiResult` 的统一模型。

## 四、类库参考入口

- CHM 风格完整表格：[/zh/source/reference/senparc-ai.html](/zh/source/reference/senparc-ai.html)
