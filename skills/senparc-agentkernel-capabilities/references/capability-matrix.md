# Capability Matrix

| Capability | API Chain | Run Method | Sample File |
|---|---|---|---|
| Chat | `IWantTo().ConfigChatModel(...).BuildKernelWithAgentSessionAsync()` | `RunChatAsync(prompt, session, update?)` | `Samples/ChatSample.cs` |
| Completion | `IWantTo().ConfigModel(ConfigModel.TextCompletion,...).BuildKernel()` | `RunChatAsync(prompt)` | `Samples/CompletionSample.cs` |
| Embedding | `IWantTo().ConfigTextEmbeddingModel(userId, collection).BuildKernel()` | `GetEmbeddingAsync(text)` + `TextSearchStore` | `Samples/EmbeddingSample.cs` |
| RAG | `ConfigModel(Chat)+ConfigTextEmbeddingModel+BuildKernelWithAgentSessionAsync(chatOptions)` | `RunChatAsync(prompt, session)` | `Samples/EmbeddingRagSample.cs` |
| Image | `IWantTo().ConfigImageModel(userId).BuildKernel()` | `Kernel.ImageGenerationAsync(...)` | `Samples/ImageGenerateSample.cs` |
| STT | `IWantTo().ConfigSpeechToTextModel(userId).BuildKernel()` | `RunSpeechToTextAsync(...)` / `Kernel.SpeechToTextAsync(...)` | `Samples/SttSample.cs` |
| TTS | `IWantTo().ConfigTextToSpeechModel(userId).BuildKernel()` | `RunTextToSpeechAsync(...)` / `Kernel.TextToSpeechAsync(...)` | `Samples/TtsSample.cs` |

## Capability Status

- Available now: Chat, Completion, Embedding, RAG, Image, STT, TTS
- Not provided in current sample flow: Planner, PluginFromObject / Function Calling
