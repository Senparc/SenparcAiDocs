# Quality Checklist

## A. Environment

- [ ] `dotnet --version` 为 `10.x`
- [ ] `global.json` 与本地 SDK 可兼容

## B. Build and Test

- [ ] `dotnet test src/Senparc.AI.Tests/Senparc.AI.Tests.csproj` 通过
- [ ] `dotnet test src/Senparc.AI.AgentKernel.Tests/Senparc.AI.AgentKernel.Tests.csproj` 通过

## C. Sample Smoke

- [ ] Sample 可启动
- [ ] Chat 可返回
- [ ] Embedding 可写入与检索
- [ ] Image 可生成 URL 或二进制
- [ ] STT 可识别音频文本
- [ ] TTS 可输出音频文件

## D. Communication Consistency

- [ ] 能力状态声明与当前菜单一致
- [ ] 未把 Planner/PluginFromObject 误标为已提供
- [ ] 保持 AgentKernel 优先推荐口径
