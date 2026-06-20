# Modules and Two-layer Reading

This chapter is no longer organized only by sample menus. It follows **core modules + two layers**:

- Core projects: `Senparc.AI`, `Senparc.AI.AgentKernel`
- Historical project: `Senparc.AI.Kernel` (discontinued, list-only note)
- Two layers:
- `Interface layer`: methods developers call directly in Sample/business code
- `Implementation layer`: underlying classes, core methods, key comments, and call chains

## Module Overview

| Project | Positioning | Interface Layer (direct calls) | Implementation Layer (for debugging/extending) |
| --- | --- | --- | --- |
| `Senparc.AI` | Unified standard layer | `ISenparcAiSetting`, `IAiHandler`, `ConfigModel`, `AiPlatform` | `IAiRequest/IAiResult/IAiContext`, `SenparcAiSettingBase`, `ModelName`, `VectorDB` |
| `Senparc.AI.AgentKernel` | Microsoft Agent Framework implementation layer (recommended main line) | `IWantTo().ConfigChatModel().BuildKernelWithAgentSessionAsync()`, `RunChatAsync()`, `CreateTextSearchStore()` | `AgentAiHandler`, `AgentKernelHelper`, `AIKernelBuilder/AiKernel`, `KernelConfigExtension(s)` |
| `Senparc.AI.Kernel` | Historical implementation layer (based on Semantic Kernel) | No longer expanded | This module is discontinued; SK has been partially merged/replaced by MAF, so `Senparc.AI.AgentKernel` is recommended |

## Test Projects (Brief)

| Project | Directory | Purpose |
| --- | --- | --- |
| `Senparc.AI.Tests` | `src/Senparc.AI.Tests` | Behavior checks for standard layer (config/entity/registration) |
| `Senparc.AI.AgentKernel.Tests` | `src/Senparc.AI.AgentKernel.Tests` | Behavior checks for main-line capabilities (chain config, kernel runtime, Chat/Embedding/Image/STT/TTS) |

## Recommended Reading Order

1. Read standard layer first: [/source/foundation/senparc-ai-module.html](/source/foundation/senparc-ai-module.html)
2. Read main implementation (AgentKernel): [/source/foundation/agent-framework-module.html](/source/foundation/agent-framework-module.html)
3. Read test constraints (recommended): [/source/foundation/unit-tests.html](/source/foundation/unit-tests.html)
4. Check class/method details: [/source/reference/index.html](/source/reference/index.html)

If you want to reverse-trace from console entry, also read:

- [/source/sample/program-and-di.html](/source/sample/program-and-di.html)
- [/source/foundation/kernel-config-chain.html](/source/foundation/kernel-config-chain.html)

## Selection Conclusion (Current Recommendation)

- For new projects, prefer `Senparc.AI.AgentKernel`
- `Senparc.AI.Kernel` is discontinued and not recommended for new projects
- Whichever implementation line you choose, unified abstractions come from `Senparc.AI`
