# Unit Test Projects (Brief)

This page gives a quick explanation of test project structure for `Senparc.AI` and `Senparc.AI.AgentKernel`, so you can locate behavior constraints while reading source code.

## 1. Test project list

| Project | Directory | Purpose |
| --- | --- | --- |
| `Senparc.AI.Tests` | `src/Senparc.AI.Tests` | Verifies standard layer (config objects, entities, global registration) |
| `Senparc.AI.AgentKernel.Tests` | `src/Senparc.AI.AgentKernel.Tests` | Verifies main-line capabilities (chain config, runtime kernel, Chat/Embedding/Image/STT/TTS) |

## 2. `Senparc.AI.Tests` (foundation standard layer)

Key files (examples):

- `RegisterTest.cs`: verifies global config binding after `UseSenparcAI()` registration.
- `Entities/SenparcAiSettingBaseTests.cs`: verifies key behavior of `SenparcAiSettingBase` (for example OpenAI key set-state).
- `Entities/SenparcAiSettingBaseKeyTests.cs`: verifies multi-provider key switching and mapping.
- `Entities/PromptConfigParameterTests.cs`: verifies prompt parameter object contracts.

Shared base classes:

- `BaseSupport/BaseTest.cs`
- `BaseSupport/UnitTestHelper.cs`

## 3. `Senparc.AI.AgentKernel.Tests` (main implementation layer)

Key files (examples):

- `RegisterTest.cs`: verifies DI registration and config injection for AgentKernel.
- `Handlers/AgentAiHandlerTests.cs`: verifies core behavior of `AgentAiHandler`.
- `Helpers/AgentKernelHelperTests.cs`: verifies provider dispatch and helper build logic.
- `KernelConfigExtensions/*.cs`: verifies chain APIs (Chat / Embedding / Image / Speech).
- `Kernels/AiKernelRunChatTests.cs`: verifies core behavior for `AiKernel` chat execution path.
- `GroupChat/GroupChatTests.cs`: verifies multi-agent group chat scenarios.
- `HttpMessageHandlers/HttpMessageHandlerBuilderTests.cs`: verifies message-handler pipeline assembly.

Shared base classes:

- `BaseSupport/KernelTestBase.cs`
- `BaseSupport/RunChatTestHelper.cs`

## 4. How to use these tests for troubleshooting

1. Check the failed test directory first: standard layer issue vs AgentKernel implementation issue.
2. Then trace by test class name back to implementation class (for example `KernelConfigExtensionsSpeechTests` -> `KernelConfigExtensions.Speech.cs`).
3. For new features, add tests first, then modify implementation to avoid regressions.

## 5. Most used test commands

```bash
dotnet test src/Senparc.AI.Tests/Senparc.AI.Tests.csproj
dotnet test src/Senparc.AI.AgentKernel.Tests/Senparc.AI.AgentKernel.Tests.csproj
```

Notes:

- Both test projects target `net10.0`.
- Some speech-related tests depend on local config and external model service availability. Verify `appsettings*.json` first.
