# Get Code and Run

## Goal

Clone `Senparc.AI`, start `Senparc.AI.Samples.AgentKernelConsoles`, and see the main menu.

## Prerequisites

- Completed [Environment Setup](/start/environment.html)
- At least one available AI provider configuration

## Steps

1. Enter workspace and clone solution (or use your existing local repository):

```bash
cd <your-workspace>
git clone https://github.com/Senparc/Senparc.AI.git
cd Senparc.AI/src
```

2. Open and edit config file:
- Path: `Samples/Senparc.AI.Samples.AgentKernelConsoles/appsettings.json`
- Fill `SenparcAiSetting` (configure at least one provider)

3. Start sample:

```bash
cd ../Samples/Senparc.AI.Samples.AgentKernelConsoles
dotnet run
```

4. After menu appears, enter `1` for Chat first.

![First-start menu preview](/images/start/start-menu-20260617.svg)

What you should see: menu items such as `[1] Chat`, `[2] Completion`, `[3] Embedding`, `[4] GPT-Image-2`, `[7] STT`, `[8] TTS`; `[5] Planner` and `[6] PluginFromObject` currently show not provided.

## Expected Result and Troubleshooting

- Expected: console prints "AgentKernel Sample started" and menu appears.
- If `TargetFramework net10.0` errors appear: confirm .NET 10 SDK is installed.
- If configuration parsing fails: verify `appsettings.json` is valid JSON.
- If API call fails: first verify `AiPlatform` and corresponding `*Keys` nodes match.
