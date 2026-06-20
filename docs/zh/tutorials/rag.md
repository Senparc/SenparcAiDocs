# RAG 教程（检索增强生成）

## 目标

运行 `EmbeddingRagSample`，理解 TextSearchProvider 在调用前注入上下文的过程。

## 前置条件

- Chat + Embedding 模型都可用
- 向量库可用

## 步骤

1. 输入 `3`，再选子项 `2`。
2. 程序会自动写入示例文档（NCF 相关样本）。
3. 输入问题，例如：

```text
What is NCF?
```

4. 观察回答是否包含来源引用。

核心片段：

```csharp
var options = new TextSearchProviderOptions
{
    SearchTime = TextSearchProviderOptions.TextSearchBehavior.BeforeAIInvoke,
    CitationsPrompt = "Always cite sources...",
    RecentMessageMemoryLimit = 6,
};

var chatOptions = new ChatClientAgentOptions
{
    AIContextProviders = [new TextSearchProvider(SearchAdapter, options)]
};
```

## 预期结果与排错

- 预期：回答中包含来源提示（SourceName/SourceLink）。
- 若未出现引用：检查 `CitationsPrompt` 是否被修改，或模型是否遵循指令。
- 若检索为空：确认文档已写入向量库。

![RAG 引用示意图](/images/tutorials/rag-citations-20260617.svg)

你应该看到什么：回答正文后包含来源信息（source/citation）。
