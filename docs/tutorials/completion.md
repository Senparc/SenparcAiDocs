# Completion Tutorial (Single-turn Completion)

## Goal

Run `CompletionSample` and understand one-shot completion without history context.

## Prerequisites

- `TextCompletion` model is available

## Steps

1. Enter `2` for Completion.
2. Enter a prompt, for example:

```text
Describe the role of AgentKernel in three sentences.
```

3. Review returned text.

Core chain:

```csharp
var iWantToRun = handler.IWantTo(setting)
    .ConfigModel(ConfigModel.TextCompletion, userId)
    .BuildKernel();

var result = await iWantToRun.RunChatAsync(prompt);
```

## Expected Result and Troubleshooting

- Expected: each prompt is independent with no shared history.
- If model unsupported error appears: check `ModelName.TextCompletion` under current provider.
- If you need multi-turn context: switch to `[1] Chat`.
