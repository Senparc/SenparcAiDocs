# 模块与两层阅读法

本章不再只按 Sample 菜单讲功能，而是按 **核心模块 + 两层结构** 来读源码：

- 核心项目：`Senparc.AI`、`Senparc.AI.AgentKernel`
- 历史项目：`Senparc.AI.Kernel`（已停止维护，仅保留说明）
- 两层结构：
- `接口层`：开发者在 Sample / 业务代码里直接调用的方法
- `实现层`：底层类、核心方法、关键注释与调用链

## 模块总览

| 项目 | 定位 | 接口层（你会直接调用） | 实现层（你排错/扩展会看） |
| --- | --- | --- | --- |
| `Senparc.AI` | 统一标准层 | `ISenparcAiSetting`、`IAiHandler`、`ConfigModel`、`AiPlatform` | `IAiRequest/IAiResult/IAiContext`、`SenparcAiSettingBase`、`ModelName`、`VectorDB` |
| `Senparc.AI.AgentKernel` | Microsoft Agent Framework 实现层（主线推荐） | `IWantTo().ConfigChatModel().BuildKernelWithAgentSessionAsync()`、`RunChatAsync()`、`CreateTextSearchStore()` | `AgentAiHandler`、`AgentKernelHelper`、`AIKernelBuilder/AiKernel`、`KernelConfigExtension(s)` |
| `Senparc.AI.Kernel` | 历史实现层（基于 Semantic Kernel） | 不再展开介绍 | 该模块已停止维护；SK 已部分被 MAF 融合/替代，推荐直接使用 `Senparc.AI.AgentKernel` |

## 测试项目（简要）

| 项目 | 目录 | 作用 |
| --- | --- | --- |
| `Senparc.AI.Tests` | `src/Senparc.AI.Tests` | 基础标准层行为校验（配置、实体、注册） |
| `Senparc.AI.AgentKernel.Tests` | `src/Senparc.AI.AgentKernel.Tests` | 主线能力行为校验（链式配置、Kernel 运行、Chat/Embedding/Image/STT/TTS） |

## 推荐阅读顺序

1. 先读基础标准层：[/zh/source/foundation/senparc-ai-module.html](/zh/source/foundation/senparc-ai-module.html)
2. 再读主线实现（AgentKernel）：[/zh/source/foundation/agent-framework-module.html](/zh/source/foundation/agent-framework-module.html)
3. 看测试约束（推荐）：[/zh/source/foundation/unit-tests.html](/zh/source/foundation/unit-tests.html)
4. 查类/方法明细：[/zh/source/reference/index.html](/zh/source/reference/index.html)

如果你要从控制台入口反推源码，可再看：

- [/zh/source/sample/program-and-di.html](/zh/source/sample/program-and-di.html)
- [/zh/source/foundation/kernel-config-chain.html](/zh/source/foundation/kernel-config-chain.html)

## 选型结论（当前文档建议）

- 新项目优先：`Senparc.AI.AgentKernel`
- `Senparc.AI.Kernel` 已停止维护，不建议新项目继续使用
- 无论选哪条实现线，统一抽象都来自 `Senparc.AI`
