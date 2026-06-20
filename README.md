# SenparcAiDocs

`Senparc.AI.AgentKernel` 新手友好文档站（中文主线，英文占位）。

## 本地运行

```bash
pnpm install
pnpm docs:dev
```

## 构建

```bash
pnpm docs:build
pnpm docs:serve
```

## GitHub Pages

- 默认 `DOCS_BASE=/`
- 如需子路径发布，例如 `https://<user>.github.io/SenparcAiDocs/`，构建时设置：

```bash
DOCS_BASE=/SenparcAiDocs/ pnpm docs:build
```
