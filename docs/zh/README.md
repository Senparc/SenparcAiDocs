---
home: true
title: Senparc.AI 首页
description: Senparc.AI 文档
heroImage: /images/logo.svg
heroText: Senparc.AI
tagline: 从 0 到跑通 Senparc.AI（含源码解析）
actions:
  - text: 5 分钟跑通
    link: /zh/start/clone-and-run.html
    type: primary
  - text: 查看实战教程
    link: /zh/tutorials/chat.html
    type: secondary
features:
  - title: 新手可用
    details: 从安装环境开始，按步骤执行即可跑通第一个对话。支持 SKILL 托管编程。
  - title: 模块化设计
    details: 模块化设计，灵活切换不同 AI 平台，可独立可组合，便于扩展和维护。
  - title: 能力清晰
    details: 当前可用 Chat、Completion、Embedding、RAG、Image、STT、TTS 等不同场景，均可单独或混合调用。
footer: Apache License 2.0 | SenparcAiDocs
---

## 5 分钟跑通入口

1. [环境准备](/zh/start/environment.html)
2. [获取代码并运行 Sample](/zh/start/clone-and-run.html)
3. [完成第一次 Chat](/zh/start/first-chat.html)

## 能力地图

- 已提供：Chat、Completion、Embedding、RAG、Image Generate、STT、TTS
- 尚未提供：Planner、PluginFromObject / Function Calling

## 模块定位（源码阅读建议）

- 基础层：`Senparc.AI`（接口与配置标准）
- 推荐主线：`Senparc.AI.AgentKernel`（Microsoft Agent Framework）
- 历史说明：`Senparc.AI.Kernel`（基于 Semantic Kernel，现已停止维护）

源码总览入口：[/zh/source/foundation/index.html](/zh/source/foundation/index.html)

> 若你只想先跑起来，请直接进入“5 分钟跑通入口”；若你要理解整体架构，请从“模块定位”开始。
