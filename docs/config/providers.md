# Provider Switching (NeuCharAI / OpenAI / Azure / Ollama)

## Goal

Switch the same sample across providers and know each provider's minimum required fields.

## Prerequisites

- Completed [appsettings Configuration](/config/appsettings.html)

## Steps

1. Select provider:

```json
"AiPlatform": "NeuCharAI"
```

Supported values: `NeuCharAI`, `OpenAI`, `AzureOpenAI`, `Ollama`.

2. Minimum fields per provider:
- NeuCharAI: `ApiKey`, `NeuCharEndpoint`, `ModelName.Chat`
- OpenAI: `ApiKey`, `ModelName.Chat`
- Azure OpenAI: `ApiKey`, `AzureEndpoint`, `AzureOpenAIApiVersion`, `ModelName.Chat`
- Ollama: `Endpoint`, `ModelName.Chat`

3. Use menu `[0] Settings` to verify recognized configurations:
- You can switch among `Default` / provider key / `Items` sub-configs

## Expected Result and Troubleshooting

- Expected: settings page lists configured provider items.
- If a provider is missing in list: key fields are usually empty.
- If requests fail after switching: print current `Endpoint` and `ModelName.Chat` for quick comparison.
