# 链式配置从接口层到内核层的真实调用链

本页回答一个核心问题：

`IWantTo().Config...().BuildKernel().Run...()` 这条链，底层到底发生了什么？

## 1. 接口层链式调用（开发者看到的）

AgentKernel Sample 常见写法：

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel(userId, options)
    .BuildKernelWithAgentSessionAsync();

var result = await iWantToRun.RunChatAsync(prompt, iWantToRun.Kernel.AgentSession);
```

Kernel Sample 常见写法：

```csharp
var iWantToRun = handler.IWantTo(setting)
    .ConfigModel(ConfigModel.TextCompletion, userId)
    .BuildKernel();

var request = iWantToRun.CreateRequest(prompt, true);
var result = await iWantToRun.RunAsync(request);
```

## 2. AgentKernel 路线的底层调用链

1. `IWantTo(setting)`
- 创建 `IWantToConfig(new IWantTo(handler, setting))`
- 绑定 `AgentKernelHelper`、`IAIKernelBuilder` 容器

2. `Config...Model(...)`
- 落到 `KernelConfigExtension.ConfigModel(...)`
- 分发到 `AgentKernelHelper.ConfigChat / ConfigTextEmbeddingGeneration / ConfigImageGeneration / ConfigSpeechToText / ConfigTextToSpeech`
- 进一步通过 `KernelBuilderExtension.*` 绑定具体客户端

3. `BuildKernel...()`
- 调用 `AgentKernelHelper.BuildKernel(...)`
- 由 `AIKernelBuilder.Build(...)` 生成 `AiKernel`
- `AiKernel` 初始化 `ChatClientAgent` / `EmbeddingGenerator`
- 若是 `BuildKernelWithAgentSessionAsync()`，会额外创建并绑定 `AgentSession`

4. `Run...()`
- `RunChatAsync` -> `CreateRequest` -> `request.ReplacePrompt()` -> `AiKernel.InvokeChatAsync / InvokeChatStreamingAsync`
- Embedding/RAG -> `GetEmbeddingAsync` + `TextSearchStore`
- STT/TTS -> `AiKernel.SpeechToTextAsync` / `AiKernel.TextToSpeechAsync`

## 3. Kernel（Semantic）路线的底层调用链

1. `IWantTo(setting)`
- 创建 `IWantToConfig`，持有 `SemanticKernelHelper`

2. `ConfigModel(...)`
- 落到 `KernelConfigExtension.ConfigModel(...)`
- 分发到 `SemanticKernelHelper.ConfigChat / ConfigTextCompletion / ConfigTextEmbeddingGeneration / ConfigImageGeneration / ConfigAudioToText / ConfigTextToAudio`

3. `BuildKernel()`
- `SemanticKernelHelper.BuildKernel(...)` 产出 `Microsoft.SemanticKernel.Kernel`

4. `RunAsync(...)`
- 在 `KernelConfigExtensions.RunAsync(...)` 中根据输入类型选择：
- `InvokePromptAsync`
- `InvokeAsync(function, arguments)`
- `InvokeStreamingAsync`

## 4. 这条链给你带来的工程价值

- 同一套业务风格，能复用到 AgentKernel 与 Kernel 两条实现路线。
- 配置层与执行层被拆开：
- 配置层负责模型与客户端绑定
- 执行层负责请求、上下文、流式处理
- 排错时你只需定位当前问题属于哪一段（配置、构建、执行）。
