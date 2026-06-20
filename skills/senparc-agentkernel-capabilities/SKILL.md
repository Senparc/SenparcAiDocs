---
name: senparc-agentkernel-capabilities
description: 基于 Senparc.AI.AgentKernel 实现具体能力开发，包括 Chat、Completion、Embedding、RAG、Image、STT、TTS 的链式 API 选型、代码生成与示例对齐。用于业务功能编码、能力组合、Sample 菜单映射与接口扩展场景。
---

# Senparc AgentKernel Capabilities

以 `AgentAiHandler + IWantTo` 链式 API 为唯一主线，按场景生成代码。

## 1. 先选能力，再选链路

1. Chat（多轮会话）：
- `IWantTo().ConfigChatModel(...).BuildKernelWithAgentSessionAsync()`
- `RunChatAsync(prompt, agentSession, streamCallback?)`

2. Completion（单轮）：
- `IWantTo().ConfigModel(ConfigModel.TextCompletion,...).BuildKernel()`
- `RunChatAsync(prompt)`

3. Embedding（向量生成/检索）：
- `IWantTo().ConfigTextEmbeddingModel(userId, collectionName).BuildKernel()`
- `GetEmbeddingAsync(text)`
- `CreateTextSearchStore().UpsertDocumentsAsync(...) / SearchAsync(...)`

4. RAG（检索增强）：
- 在 `ChatClientAgentOptions` 中配置 `AIContextProviders`
- 使用 `TextSearchProvider` 绑定检索适配器
- `BuildKernelWithAgentSessionAsync(chatOptions)`

5. Image：
- `IWantTo().ConfigImageModel(userId).BuildKernel()`
- `Kernel.ImageGenerationAsync(prompt, width, height)`

6. STT / TTS：
- STT：`ConfigSpeechToTextModel(...).BuildKernel()` + `RunSpeechToTextAsync(...)`
- TTS：`ConfigTextToSpeechModel(...).BuildKernel()` + `RunTextToSpeechAsync(...)`

## 2. 约束与状态

1. 对外说明能力时，保持与当前 Sample 一致：
- 已提供：Chat / Completion / Embedding / RAG / Image / STT / TTS
- 菜单中仍显示但未提供：Planner、PluginFromObject / Function Calling
2. 不生成“理想化 API”；只使用仓库已存在的方法名和参数。
3. 会话型场景优先 `AgentSession`，避免误导为无状态多轮。

## 3. 输出代码要求

1. 默认给出最小可运行片段，不堆砌无关封装。
2. 需要流式输出时，在 `RunChatAsync(..., update => ...)` 中处理 `AgentResponseUpdate`。
3. 需要跨平台切换时，只通过 `appsettings` 中 `AiPlatform + *Keys` 切换，不写硬编码分支。

## 4. 参考 Sample 对齐

1. Chat 对齐 `Samples/ChatSample.cs`
2. Completion 对齐 `Samples/CompletionSample.cs`
3. Embedding/RAG 对齐 `Samples/EmbeddingSample.cs`、`Samples/EmbeddingRagSample.cs`
4. Image 对齐 `Samples/ImageGenerateSample.cs`
5. STT/TTS 对齐 `Samples/SttSample.cs`、`Samples/TtsSample.cs`

## 5. 何时切换到其他技能

1. 遇到 SDK/NuGet/首跑问题，切换 `senparc-agentkernel-bootstrap`。
2. 遇到测试、回归、发布门禁问题，切换 `senparc-agentkernel-quality-gates`。

## 按需读取的参考文件

- `references/capability-matrix.md`
- `references/snippet-library.md`
