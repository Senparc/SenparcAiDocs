# SampleSetting and ModelSettingCatalog

`SampleSetting.cs` + `ModelSettingCatalog.cs` handle runtime model-setting switching.

## Key points

- `CurrentSettingKey`: currently selected config key (default `Default`).
- `ModelSettingCatalog.GetChoices()`: dynamically enumerates available providers and `Items` sub-configurations.
- `Resolve(key)`: resolves selected key into `ISenparcAiSetting`.
- You can switch model and toggle `HttpClient` logging in menu `[0]`.

## Practical value

- One executable can switch providers without code changes.
- Useful for same-prompt cross-provider comparison tests.
