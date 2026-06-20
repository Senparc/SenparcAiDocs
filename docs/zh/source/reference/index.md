# 总览（CHM 风格）

> 本章节提供可检索的“类型-成员-参数”级别说明，主覆盖 `Senparc.AI` 与 `Senparc.AI.AgentKernel`。`Senparc.AI.Kernel` 已停止维护，仅保留列表说明。

## 1. 使用方式

- 若你先看架构：从 [/zh/source/foundation/module-overview.html](/zh/source/foundation/module-overview.html) 开始。
- 若你要查具体类/枚举：直接进入本页下方模块参考。
- 若你在 Sample 里看到一个链式 API：优先在 AgentKernel 参考页搜索同名方法。
- 若你要看测试工程结构：先看 [/zh/source/foundation/unit-tests.html](/zh/source/foundation/unit-tests.html)。

## 2. 参考入口

| 模块 | 参考页 | 适用场景 |
| --- | --- | --- |
| `Senparc.AI`（基础标准层） | [/zh/source/reference/senparc-ai.html](/zh/source/reference/senparc-ai.html) | 查统一接口、配置模型、枚举约定 |
| `Senparc.AI.AgentKernel`（MAF 主线） | [/zh/source/reference/agentkernel.html](/zh/source/reference/agentkernel.html) | 查 `IWantTo` 链、`AgentSession`、RAG、STT/TTS |
| `Senparc.AI.Kernel`（Semantic Kernel 路线） | 不再展开 | 该模块已停止维护；SK 已部分被 MAF 融合/替代，推荐直接使用 `Senparc.AI.AgentKernel` |

## 3. 常见查找路径

| 你要做什么 | 先看类型 |
| --- | --- |
| 切换 OpenAI / Azure / Ollama 平台 | `ISenparcAiSetting`、`SenparcAiSettingBase`、`AiPlatform` |
| 配置聊天 / Embedding / 图片 / 语音 | `ConfigModel`、`KernelConfigExtension(s)`、`AgentKernelHelper` |
| 构建 Agent 多轮会话 | `BuildKernelWithAgentSessionAsync()`、`AiKernel.SetAgentSessionAsync()` |
| 做向量检索 / RAG | `VectorDB`、`VectorDBType`、`CreateTextSearchStore()`、`TextSearchStore` |
| 看请求上下文如何传递 | `SenparcAiRequest`、`SenparcAiArguments`、`SetTempContext()` |
| 判断是否 Function Calling | `SenparcAiResult.GetLastFunctionResultContent()` |

## 4. 统计范围

本参考以以下源码目录为准（不含 Tests）：

- `src/Senparc.AI`
- `src/Senparc.AI.AgentKernel`
- `src/Senparc.AI.Kernel`（仅历史说明）
