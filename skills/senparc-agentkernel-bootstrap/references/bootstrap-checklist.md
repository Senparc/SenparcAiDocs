# Bootstrap Checklist

- [ ] `dotnet --version` 为 `10.x`
- [ ] 项目 TargetFramework 为 `net10.0`
- [ ] 已安装 `Senparc.AI.AgentKernel`
- [ ] 已安装 `Senparc.CO2NET`
- [ ] `appsettings.json` 包含 `SenparcSetting` 与 `SenparcAiSetting`
- [ ] 已通过分步询问确认 `AiPlatform` 与用户实际使用的平台一致
- [ ] 对应 `*Keys` 必填项已收集（至少 `ModelName.Chat`；密钥类字段已提醒用户在本地替换占位符）
- [ ] `AiPlatform` 与对应 `*Keys` 配置匹配
- [ ] 已向用户输出配置摘要（不含真实密钥），并区分“可编译”与“可调用 AI”两种状态
- [ ] 已调用 `AddSenparcGlobalServices(config)`
- [ ] 已调用 `AddSenparcAI(config)`
- [ ] 已调用 `RegisterService.Start().UseSenparcGlobal().UseSenparcAI()`
- [ ] `dotnet run` 可以得到首个 Chat 返回
