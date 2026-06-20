# Embedding and RAG

## Scenario

I need to write text into vector storage and do similarity retrieval, optionally followed by RAG.

## Minimum Chain (Embedding Retrieval)

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextEmbeddingModel(userId, "MyCollection")
    .BuildKernel();

var store = run.CreateTextSearchStore();
await store.UpsertDocumentsAsync(docs);
var hits = await store.SearchAsync("query", 3);
```

## RAG Key Points

- Use `TextSearchProvider` to inject retrieval context.
- `SearchTime=BeforeAIInvoke` is commonly used for retrieval before answering.
