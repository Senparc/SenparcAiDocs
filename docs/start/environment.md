# Environment Setup

## Goal

Confirm your machine meets the minimum requirements to run `Senparc.AI.Samples.AgentKernelConsoles`.

## Prerequisites

- OS: Windows / macOS / Linux
- .NET SDK: `10.0.x`
- Git: any stable version

> Note: if you only run `Senparc.AI` samples, you only need `.NET 10`; Node.js and pnpm are not required.  
> Node.js / pnpm are only needed to run this `SenparcAiDocs` documentation site.

## Steps

1. Check .NET:

```bash
dotnet --version
```

2. Prepare at least one AI provider key (covered by current docs):
- NeuCharAI
- OpenAI
- Azure OpenAI
- Ollama (local)

## Expected Result and Troubleshooting

- Expected: `.NET` version command returns `10.0.x`.
- If `dotnet` is missing: install .NET 10 SDK and reopen terminal.
- If you only want a quick trial: configure one provider first, then add others later.
