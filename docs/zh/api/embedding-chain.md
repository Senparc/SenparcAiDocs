# 我要做 Embedding 与 RAG

## 场景

我需要把文本写入向量库并做相似检索，或进一步做 RAG。

## 最小链路（Embedding 检索）

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextEmbeddingModel(userId, "MyCollection")
    .BuildKernel();

var store = run.CreateTextSearchStore();
await store.UpsertDocumentsAsync(docs);
var hits = await store.SearchAsync("查询词", 3);
```

## RAG 关键点

- 使用 `TextSearchProvider` 注入检索上下文。
- `SearchTime=BeforeAIInvoke` 常用于“先检索再回答”。
