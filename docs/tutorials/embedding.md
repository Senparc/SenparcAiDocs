# Embedding Tutorial (Ingestion and Retrieval)

## Goal

Run `EmbeddingSample` and complete the loop: ingest text -> vectorize -> retrieve by similarity.

## Prerequisites

- Embedding model is available
- `VectorDB` is configured (start with `Memory`)

## Steps

1. Enter `3`, then choose sub-item `1`.
2. In ingestion stage, input text line by line and enter `n` to stop.
3. In retrieval stage, input a query and inspect TopK results.

Key chain:

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextEmbeddingModel(userId, collectionName)
    .BuildKernel();

var store = run.CreateTextSearchStore();
await store.UpsertDocumentsAsync(...);
var hits = await store.SearchAsync(question, 3);
```

## Expected Result and Troubleshooting

- Expected: each ingestion prints vector dimensions.
- Expected: query returns 1 to 3 matched records.
- If dimension error appears: `EmbeddingDimensions` mismatches model dimensions.
- If no hit returned: check content was ingested and same collection is used.

![Embedding retrieval preview](/images/tutorials/embedding-search-20260617.svg)

What you should see: fields such as `Result[1]`, `Id`, `Name`, and `Text` are printed.
