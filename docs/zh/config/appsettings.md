# appsettings 配置

## 目标

理解并正确填写 `SenparcAiSetting`，确保 Sample 能稳定调用 AI 能力。

## 前置条件

- 已知你要使用的平台（NeuCharAI/OpenAI/Azure/Ollama）

## 步骤

1. 打开：

```text
Samples/Senparc.AI.Samples.AgentKernelConsoles/appsettings.json
```

2. 最小可运行模板（示例，已脱敏）：

```json
{
  "SenparcAiSetting": {
    "IsDebug": true,
    "AiPlatform": "OpenAI",
    "VectorDB": {
      "Type": "Memory",
      "ConnectionString": ""
    },
    "OpenAIKeys": {
      "ApiKey": "<YOUR_OPENAI_API_KEY>",
      "OrganizationId": "<YOUR_ORG_ID>",
      "ModelName": {
        "Chat": "gpt-4o",
        "Embedding": "text-embedding-ada-002",
        "EmbeddingDimensions": 1536,
        "TextCompletion": "gpt-4o-instruct"
      }
    }
  }
}
```

3. 核心规则：
- `AiPlatform` 选哪个，就重点检查对应 `*Keys` 节点。
- `EmbeddingDimensions` 必须和 Embedding 模型匹配。
- `VectorDB.Type` 建议先用 `Memory` 跑通。

![关键配置示意图](/images/config/config-appsettings-20260617.svg)

你应该看到什么：`AiPlatform`、`ModelName`、`VectorDB` 三个关键块清晰存在。

## 预期结果与排错

- 预期：启动时能看到“当前模型：`配置名称` - `平台` - `端点`”。
- 若报模型不可用：模型名与平台不匹配（最常见）。
- 若报 Embedding 维度错误：修正 `EmbeddingDimensions`。
