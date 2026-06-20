# 环境准备

## 目标

确认你的机器满足运行 `Senparc.AI.Samples.AgentKernelConsoles` 的最小要求。

## 前置条件

- 操作系统：Windows / macOS / Linux
- .NET SDK：`10.0.x`
- Git：任意稳定版本

> 说明：如果你只运行 `Senparc.AI` 示例程序，只需要 `.NET 10`，不需要 Node.js 或 pnpm。  
> Node.js / pnpm 仅用于运行本 `SenparcAiDocs` 文档站本身。

## 步骤

1. 检查 .NET：

```bash
dotnet --version
```

2. 准备可用的 AI 平台密钥（当前文档覆盖）：
- NeuCharAI
- OpenAI
- Azure OpenAI
- Ollama（本地）

## 预期结果与排错

- 预期：`.NET` 版本命令有输出，且为 `10.0.x`。
- 若 `dotnet` 不存在：先安装 .NET 10 SDK，再重开终端。
- 若你只想先体验流程：可先填一个平台的配置跑通，再补齐其他平台。
