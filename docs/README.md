---
home: true
title: Senparc.AI Home
description: Senparc.AI Documentation
heroImage: /images/logo.svg
heroText: Senparc.AI
tagline: From zero to a running Senparc.AI workflow (with source analysis)
actions:
  - text: Run in 5 Minutes
    link: /start/clone-and-run.html
    type: primary
  - text: View Tutorials
    link: /tutorials/chat.html
    type: secondary
features:
  - title: Beginner-ready
    details: Start from environment setup and run your first chat step by step.
  - title: Modular Design
    details: Modular structure that is easy to extend and maintain.
  - title: Clear Capability Scope
    details: "Currently available: Chat, Completion, Embedding, RAG, Image, STT, and TTS. Unsupported capabilities are explicitly marked."
  - title: Source-aligned
    details: Commands, configuration fields, and API chains are aligned with current code behavior.
footer: Apache License 2.0 | SenparcAiDocs
---

## 5-Minute Entry

1. [Environment Setup](/start/environment.html)
2. [Get Code and Run Sample](/start/clone-and-run.html)
3. [Finish Your First Chat](/start/first-chat.html)

## Capability Map

- Available: Chat, Completion, Embedding, RAG, Image Generate, STT, TTS
- Not provided yet: Planner, PluginFromObject / Function Calling

## Module Positioning (How to Read the Source)

- Foundation layer: `Senparc.AI` (interface and configuration standards)
- Recommended main line: `Senparc.AI.AgentKernel` (Microsoft Agent Framework)
- Historical note: `Senparc.AI.Kernel` (based on Semantic Kernel, now discontinued)

Source overview entry: [/source/foundation/index.html](/source/foundation/index.html)

> If you only want to run it first, go directly to the 5-minute entry. If you want architecture understanding, start from module positioning.
