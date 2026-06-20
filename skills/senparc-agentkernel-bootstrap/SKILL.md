---
name: senparc-agentkernel-bootstrap
description: 基于 Senparc.AI.AgentKernel 从零搭建可运行项目，包括 .NET 10 SDK 检查安装、NuGet 包引入、appsettings 中 SenparcAiSetting 分步配置引导、DI 注册、首次 Chat 跑通。用于安装集成、环境初始化、首个可运行 Demo 场景；若用户未配置有效 AI 密钥与模型，需逐步询问并完善 appsettings.json。
---

# Senparc AgentKernel Bootstrap

按以下顺序完成初始化，并严格与仓库源码保持一致。

## 1. 检查 SDK 与运行时

1. 执行 `dotnet --version`，要求 `10.x`（仓库 `global.json` 为 `10.0.100`）。
2. 若版本不满足，先安装 .NET 10 SDK 再继续：
- macOS：`brew install --cask dotnet-sdk`
- Windows：`winget install Microsoft.DotNet.SDK.10`
- Linux：按发行版安装 .NET 10 SDK 官方包
3. 重新执行 `dotnet --info`，确认 SDK 生效。

## 2. 创建项目并安装 NuGet

1. 创建 net10.0 项目：

```bash
dotnet new console -n MyAgentKernelApp -f net10.0
cd MyAgentKernelApp
```

2. 安装核心依赖（默认优先最新可用版本；预览版可加 `--prerelease`）：

```bash
dotnet add package Senparc.AI.AgentKernel --prerelease
dotnet add package Senparc.CO2NET
dotnet add package Microsoft.Extensions.Configuration.Json
dotnet add package Microsoft.Extensions.DependencyInjection
dotnet add package Microsoft.Extensions.Caching.Memory
```

## 3. 写入配置（含 SenparcAiSetting 分步引导）

> **必须先完成本节再执行 `dotnet run`。** 项目能启动不代表 AI 可用；`SenparcAiSetting` 未正确填写时，Chat 会在运行时失败。

1. 新建 `appsettings.json`，包含 `SenparcSetting` 与 `SenparcAiSetting`。
2. `SenparcSetting` 通常沿用模板即可（`IsDebug`、`DefaultCacheNamespace`）。
3. **`SenparcAiSetting` 必须与用户逐步确认后再写入**，禁止静默复制占位符并宣称配置完成。按 `references/senparc-ai-setting-wizard.md` 执行：
   - 先问用户使用的平台（`NeuCharAI` / `OpenAI` / `AzureOpenAI` / `Ollama`），确定 `AiPlatform`。
   - 再收集该平台 `*Keys` 的必填项（至少 `ModelName.Chat`；OpenAI/Azure/NeuChar 还需 Endpoint 或 Key 占位说明；Ollama 需本机 Endpoint 与已 pull 的模型名）。
   - 确认 `VectorDB.Type`（首次建议 `Memory`）及是否需要 Embedding（若需要，一并确认 `EmbeddingDimensions`）。
   - 写入后输出**不含真实密钥**的配置摘要，并提醒用户在本地替换 `<Your-*-Key>` 占位符。
4. 支持平台保持与 Sample 一致：`NeuCharAI`、`OpenAI`、`AzureOpenAI`、`Ollama`。
5. 结构参考：`references/minimal-appsettings.json`；交互流程参考：`references/senparc-ai-setting-wizard.md`。

## 4. 注册服务与首次调用

1. 在 `Program.cs` 中按顺序注册：
- `services.AddSenparcGlobalServices(config);`
- `services.AddSenparcAI(config);`
- `RegisterService.Start().UseSenparcGlobal().UseSenparcAI();`
2. 从 DI 获取 `IAiHandler`，并按 AgentKernel 链式 API 构建最小 Chat 调用。
3. 参考模板：`references/minimal-program.cs`。

## 5. 验证跑通

1. **运行前确认**：用户是否已在本地将 ApiKey 等占位符替换为有效值；若仍为占位符，仅可验证编译与 DI，**不能**作为 AI 跑通标准。
2. 执行 `dotnet run`。
3. 看到 AI 返回文本即通过。
4. 若失败，先检查：
- `AiPlatform` 与对应 `*Keys` 是否匹配（最常见：平台选 OpenAI 却只配置了 Azure Keys）
- `ModelName.Chat` 是否与该平台可用模型/部署名一致
- `ModelName` 其他字段是否配置完整（尤其 `EmbeddingDimensions`）
- 代理网络与 API Key 是否有效
- 是否跳过了第 3 节分步配置（回到 `references/senparc-ai-setting-wizard.md` 补全）

## 6. 输出规范

1. 所有示例只使用占位符密钥，不输出真实密钥。
2. 如果用户要求“与官方 Sample 对齐”，直接对齐 `Senparc.AI.Samples.AgentKernelConsoles` 的启动方式与模型切换方式。
3. 若用户需要能力扩展（Embedding/RAG/Image/STT/TTS），切换到 `senparc-agentkernel-capabilities`。

## 按需读取的参考文件

- `references/senparc-ai-setting-wizard.md`（**配置 appsettings 时优先读取**）
- `references/bootstrap-checklist.md`
- `references/minimal-appsettings.json`
- `references/minimal-program.cs`
