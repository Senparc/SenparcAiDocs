# 单元测试项目简析

本页用于快速说明 `Senparc.AI` 与 `Senparc.AI.AgentKernel` 的测试工程结构，方便你在阅读源码时定位“行为约束”。

## 一、测试项目清单

| 项目 | 目录 | 作用 |
| --- | --- | --- |
| `Senparc.AI.Tests` | `src/Senparc.AI.Tests` | 验证基础标准层（配置对象、基础实体、全局注册） |
| `Senparc.AI.AgentKernel.Tests` | `src/Senparc.AI.AgentKernel.Tests` | 验证 AgentKernel 主线能力（链式配置、运行时内核、Chat/Embedding/Image/STT/TTS） |

## 二、`Senparc.AI.Tests`（基础标准层）

重点文件（示例）：

- `RegisterTest.cs`：验证 `UseSenparcAI()` 注册后，全局配置可被正确读取。
- `Entities/SenparcAiSettingBaseTests.cs`：验证 `SenparcAiSettingBase` 的关键属性行为（如 OpenAI Key 设置状态）。
- `Entities/SenparcAiSettingBaseKeyTests.cs`：验证多平台 Key 切换与映射行为。
- `Entities/PromptConfigParameterTests.cs`：验证提示词参数对象的约定行为。

辅助基类：

- `BaseSupport/BaseTest.cs`
- `BaseSupport/UnitTestHelper.cs`

## 三、`Senparc.AI.AgentKernel.Tests`（主线实现层）

重点文件（示例）：

- `RegisterTest.cs`：验证 AgentKernel 的 DI 注册与配置注入。
- `Handlers/AgentAiHandlerTests.cs`：验证 `AgentAiHandler` 核心行为。
- `Helpers/AgentKernelHelperTests.cs`：验证平台分发和构建辅助逻辑。
- `KernelConfigExtensions/*.cs`：验证链式 API（Chat / Embedding / Image / Speech）。
- `Kernels/AiKernelRunChatTests.cs`：验证 `AiKernel` 在对话执行路径上的核心行为。
- `GroupChat/GroupChatTests.cs`：验证多 Agent 群聊场景。
- `HttpMessageHandlers/HttpMessageHandlerBuilderTests.cs`：验证消息处理器拼装逻辑。

辅助基类：

- `BaseSupport/KernelTestBase.cs`
- `BaseSupport/RunChatTestHelper.cs`

## 四、如何使用这些测试定位问题

1. 先看失败测试所属目录，判断是“标准层问题”还是“AgentKernel 实现层问题”。
2. 再按测试类名反查实现类（例如 `KernelConfigExtensionsSpeechTests` 对应 `KernelConfigExtensions.Speech.cs`）。
3. 新增功能时，优先补对应测试类，再改实现，避免回归。

## 五、最常用运行命令

```bash
dotnet test src/Senparc.AI.Tests/Senparc.AI.Tests.csproj
dotnet test src/Senparc.AI.AgentKernel.Tests/Senparc.AI.AgentKernel.Tests.csproj
```

说明：

- 两个测试项目目标框架均为 `net10.0`。
- 部分语音相关测试依赖本地配置与外部模型服务可用性，执行前需先确认 `appsettings*.json` 配置。

