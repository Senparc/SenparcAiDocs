# 获取代码并运行

## 目标

拉取 `Senparc.AI` 项目，启动 `Senparc.AI.Samples.AgentKernelConsoles`，看到主菜单。

## 前置条件

- 已完成 [环境准备](/zh/start/environment.html)
- 已有任一可用 AI 平台配置参数

## 步骤

1. 进入源码目录并打开解决方案（你也可以直接用已有本地仓库）：

```bash
cd <your-workspace>
git clone https://github.com/Senparc/Senparc.AI.git
cd Senparc.AI/src
```

2. 打开并编辑配置文件：
- 路径：`Samples/Senparc.AI.Samples.AgentKernelConsoles/appsettings.json`
- 填写 `SenparcAiSetting`（至少配置一个平台）

3. 启动 Sample：

```bash
cd ../Samples/Senparc.AI.Samples.AgentKernelConsoles
dotnet run
```

4. 看到菜单后，先输入 `1` 进入 Chat。

![首次启动菜单示意图](/images/start/start-menu-20260617.svg)

你应该看到什么：包含 `[1] Chat`、`[2] Completion`、`[3] Embedding`、`[4] GPT-Image-2`、`[7] STT`、`[8] TTS` 等菜单项；其中 `[5] Planner`、`[6] PluginFromObject` 当前会提示尚未提供。

## 预期结果与排错

- 预期：控制台打印“AgentKernel Sample 启动完毕”并显示菜单。
- 若报 `TargetFramework net10.0` 相关错误：确认安装 .NET 10 SDK。
- 若报配置读取错误：检查 `appsettings.json` 是否是合法 JSON。
- 若报 API 调用失败：优先检查 `AiPlatform` 与对应 `*Keys` 节点是否匹配。
