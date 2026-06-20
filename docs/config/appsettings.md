# appsettings Configuration

## Goal

Understand and correctly fill `SenparcAiSetting` so the sample can call AI capabilities reliably.

## Prerequisites

- You know which provider you want to use (NeuCharAI/OpenAI/Azure/Ollama)

## Steps

1. Open:

```text
Samples/Senparc.AI.Samples.AgentKernelConsoles/appsettings.json
```

2. Minimum runnable template (sanitized example):

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

3. Core rules:
- The provider selected by `AiPlatform` must match its corresponding `*Keys` node.
- `EmbeddingDimensions` must match your embedding model.
- Start with `VectorDB.Type = Memory` first.

![Key config preview](/images/config/config-appsettings-20260617.svg)

What you should see: the three key blocks `AiPlatform`, `ModelName`, and `VectorDB` are present.

## Expected Result and Troubleshooting

- Expected: startup shows current model info in the format `config-name - provider - endpoint`.
- If model is unavailable: model name and provider are mismatched (most common).
- If embedding dimension errors appear: correct `EmbeddingDimensions`.
