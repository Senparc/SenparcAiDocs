# RAG Tutorial (Retrieval-Augmented Generation)

## Goal

Run `EmbeddingRagSample` and understand how `TextSearchProvider` injects context before model invocation.

## Prerequisites

- Both Chat and Embedding models are available
- Vector store is available

## Steps

1. Enter `3`, then choose sub-item `2`.
2. Program auto-ingests sample documents (NCF-related samples).
3. Ask a question, for example:

```text
What is NCF?
```

4. Observe whether answer includes source citations.

Core snippet:

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

## Expected Result and Troubleshooting

- Expected: answer contains source hints (`SourceName`/`SourceLink`).
- If no citation appears: check whether `CitationsPrompt` was changed, or model ignored instruction.
- If retrieval is empty: confirm documents were actually ingested.

![RAG citation preview](/images/tutorials/rag-citations-20260617.svg)

What you should see: response body followed by source/citation information.
