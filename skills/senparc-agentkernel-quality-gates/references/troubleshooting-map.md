# Troubleshooting Map

| Symptom | Likely Cause | Fix |
|---|---|---|
| `当前示例需要 AgentAiHandler` | 未注册 `AddSenparcAI(config)` 或 DI 覆盖了 `IAiHandler` | 检查 `Program.cs` 注册链并恢复默认注册 |
| `ConfigModel is required to create AIAgent` | 未执行任何 `Config*Model` 就调用运行 | 先调用 `ConfigChatModel`/`ConfigModel` 再 `BuildKernel*` |
| `EmbeddingCollectionName is required` | 调用了 Embedding 但未给 collectionName | 使用 `ConfigTextEmbeddingModel(userId, collectionName)` |
| `EmbeddingDimensions is required` | 模型配置缺 `EmbeddingDimensions` | 在对应平台 `ModelName` 下补齐维度 |
| `TextToImage is not configured for this kernel` | 未调用 `ConfigImageModel` | 先配置 TextToImage 再调用 `ImageGenerationAsync` |
| STT/TTS 返回空或失败 | 模型名或平台密钥不匹配 | 核对 `SpeechToText`/`TextToSpeech` 配置与 API 权限 |
| Sample 启动但请求失败 | 平台不可达、Key 无效、额度限制 | 切换到可用平台并验证 API Key |

## Known Status Guardrail

- 推荐：`Senparc.AI.AgentKernel`（MAF）
- 基础：`Senparc.AI`
- 历史：`Senparc.AI.Kernel`（停止维护，不新增深度实现）
