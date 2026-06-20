---
name: senparc-agentkernel-quality-gates
description: 为 Senparc.AI 与 Senparc.AI.AgentKernel 开发执行质量门禁，包括单元测试、Sample 冒烟、配置排错、版本发布前检查与模块定位说明。用于交付前验收、回归修复、上线前核查场景。
---

# Senparc AgentKernel Quality Gates

对交付执行固定的“测试-排错-验收”流程，避免仅凭主观判断发布。

## 1. 必跑测试

在仓库根目录执行：

```bash
dotnet test src/Senparc.AI.Tests/Senparc.AI.Tests.csproj
dotnet test src/Senparc.AI.AgentKernel.Tests/Senparc.AI.AgentKernel.Tests.csproj
```

需要覆盖旧模块兼容性时再执行：

```bash
dotnet test src/Senparc.AI.Kernel.Tests/Senparc.AI.Kernel.Tests.csproj
```

## 2. 必做冒烟

1. 运行 AgentKernel sample：

```bash
dotnet run --project Samples/Senparc.AI.Samples.AgentKernelConsoles/Senparc.AI.Samples.AgentKernelConsoles.csproj
```

2. 至少验证：
- `[1] Chat`
- `[3] Embedding`（含检索）
- `[4] Image`
- `[7] STT`
- `[8] TTS`

## 3. 常见失败优先排查

1. 配置类问题：
- `AiPlatform` 与 `*Keys` 不一致
- `ModelName` 缺失（如 `EmbeddingDimensions` 未设置）
2. 环境问题：
- 非 .NET 10 SDK
- 本地模型服务未启动（如 Ollama）
3. 代码路径问题：
- 未调用 `AddSenparcAI(config)` 或 `UseSenparcAI()`
- 把 `IAiHandler` 当成非 `AgentAiHandler` 使用

## 4. 模块定位口径

1. 推荐开发路径：`Senparc.AI.AgentKernel`（MAF 实现）。
2. `Senparc.AI` 为基础模型与配置抽象层，需要保持兼容。
3. `Senparc.AI.Kernel` 已停止维护，仅保留历史兼容说明，不新增深度实现。

## 5. 交付前清单

1. 确认测试命令通过。
2. 确认示例能力描述与当前菜单一致。
3. 确认文档/API 示例不包含过时链路。
4. 如涉及文档变更，同步执行 `senparc-ai-doc-maintainer`。

## 按需读取的参考文件

- `references/quality-checklist.md`
- `references/troubleshooting-map.md`
