# Overview (CHM Style)

> This chapter provides searchable type/member/parameter-level references, mainly for `Senparc.AI` and `Senparc.AI.AgentKernel`. `Senparc.AI.Kernel` is discontinued and kept as list-only note.

## 1. How to use

- If you want architecture first: start from [/source/foundation/module-overview.html](/source/foundation/module-overview.html).
- If you need specific classes/enums: go directly to module references below.
- If you see a chain API in Sample: search same method name in AgentKernel reference first.
- If you need test project structure: see [/source/foundation/unit-tests.html](/source/foundation/unit-tests.html).

## 2. Reference entries

| Module | Reference Page | Best for |
| --- | --- | --- |
| `Senparc.AI` (foundation standard layer) | [/source/reference/senparc-ai.html](/source/reference/senparc-ai.html) | Unified interfaces, config models, enum conventions |
| `Senparc.AI.AgentKernel` (MAF main line) | [/source/reference/agentkernel.html](/source/reference/agentkernel.html) | `IWantTo` chain, `AgentSession`, RAG, STT/TTS |
| `Senparc.AI.Kernel` (Semantic Kernel route) | Not expanded | Discontinued; SK has been partially merged/replaced by MAF, use `Senparc.AI.AgentKernel` directly |

## 3. Common lookup paths

| What you want to do | Start with these types |
| --- | --- |
| Switch among OpenAI / Azure / Ollama | `ISenparcAiSetting`, `SenparcAiSettingBase`, `AiPlatform` |
| Configure chat / embedding / image / speech | `ConfigModel`, `KernelConfigExtension(s)`, `AgentKernelHelper` |
| Build multi-turn agent session | `BuildKernelWithAgentSessionAsync()`, `AiKernel.SetAgentSessionAsync()` |
| Run vector retrieval / RAG | `VectorDB`, `VectorDBType`, `CreateTextSearchStore()`, `TextSearchStore` |
| Trace request context flow | `SenparcAiRequest`, `SenparcAiArguments`, `SetTempContext()` |
| Check function calling result | `SenparcAiResult.GetLastFunctionResultContent()` |

## 4. Scope

This reference is based on these source directories (excluding tests):

- `src/Senparc.AI`
- `src/Senparc.AI.AgentKernel`
- `src/Senparc.AI.Kernel` (historical note only)
