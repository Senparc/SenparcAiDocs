# Multi-model and Dynamic Switching

## Goal

Use `Items` plus the settings menu to switch models within one running program.

## Prerequisites

- You understand [Provider Switching](/config/providers.html)

## Steps

1. Add a sub-configuration under `SenparcAiSetting.Items`:

```json
"Items": {
  "AzureImage": {
    "AiPlatform": "AzureOpenAI",
    "AzureOpenAIKeys": {
      "ApiKey": "<YOUR_AZURE_KEY>",
      "AzureEndpoint": "<YOUR_AZURE_ENDPOINT>",
      "AzureOpenAIApiVersion": "2022-12-01",
      "ModelName": {
        "TextToImage": "dall-e-3"
      }
    }
  }
}
```

2. Run sample and enter `0` for settings.
3. Choose "Select Model" and switch to `Items/AzureImage`.

## Expected Result and Troubleshooting

- Expected: main menu shows `Current model: AzureImage - AzureOpenAI - endpoint`.
- If a capability fails after switching: check model field exists for that capability (`Chat` / `Embedding` / `TextToImage`).
