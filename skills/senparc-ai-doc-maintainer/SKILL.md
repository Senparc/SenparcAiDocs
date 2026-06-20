---
name: senparc-ai-doc-maintainer
description: 维护 SenparcAiDocs 文档站，要求中英文结构同步、导航同步、源码对齐、能力状态准确、构建可通过。用于任何 SenparcAiDocs 内容更新、导航调整、源码解析更新、FAQ/教程新增、Logo 与资源维护场景。
---

# SenparcAiDocs Maintainer

## 固定范围

- 维护项目：`SenparcAiDocs`（独立项目，不并入 NcfDocs）
- 主源码依据：
- `Senparc.AI.AgentKernel`
- `Samples/Senparc.AI.Samples.AgentKernelConsoles`
- 必须覆盖的补充源码：
- `Senparc.AI`
- `Senparc.AI.Tests`
- `Senparc.AI.AgentKernel.Tests`

## 不可违背规则

1. 运行要求口径
- 运行 Senparc.AI Sample 仅要求 `.NET 10`。
- `Node.js/pnpm` 仅用于文档站构建与预览。

2. 模块定位
- 主推荐：`Senparc.AI.AgentKernel`（基于 MAF）。
- `Senparc.AI.Kernel` 已停止维护，仅保留历史说明，不展开深度章节。

3. 能力状态
- 可用：Chat、Completion、Embedding、RAG、Image、STT、TTS。
- 当前 Sample 菜单未提供：Planner、PluginFromObject / Function Calling。

4. 导航同步
- 每次页面改动必须同步 `navbar + sidebar`。
- 必须同步中英文两套导航：
- `docs/.vuepress/configs/navbar/zh.ts`
- `docs/.vuepress/configs/sidebar/zh.ts`
- `docs/.vuepress/configs/navbar/en.ts`
- `docs/.vuepress/configs/sidebar/en.ts`

5. 中英文同步
- `docs/zh` 与 `docs/` 保持一一对应。
- 中文新增/删除/重命名页面，英文必须同周期同步。
- 若 Sample 本身输出中文菜单，可在英文页保留原文并注明原因。

## 写作与校验标准

1. 教程结构固定为：
- Goal
- Prerequisites
- Steps
- Expected Result and Troubleshooting

2. 命令与代码必须可执行或与源码行为一致。
3. 敏感信息必须使用占位符。
4. 图片存放在 `docs/.vuepress/public/images/...`。
5. Logo 使用 `docs/.vuepress/public/images/logo.svg`，保持既定风格。

## 执行流程

1. 先对照源码更新文档，再更新导航。
2. 先更新中文，再一一镜像到英文。
3. 运行构建并修复所有链接/导航/编译问题。
4. 用 `references/maintenance-checklist.md` 完成最终自检。
5. 新教程和场景页优先套用 `templates/` 下模板。

## 快速命令

```bash
cd SenparcAiDocs
pnpm docs:build
pnpm docs:dev
```

```bash
cd Senaprc.AI
dotnet test src/Senparc.AI.Tests/Senparc.AI.Tests.csproj
dotnet test src/Senparc.AI.AgentKernel.Tests/Senparc.AI.AgentKernel.Tests.csproj
```
