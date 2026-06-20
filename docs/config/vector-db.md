# Vector Database Configuration

## Goal

Configure vector storage for embedding scenarios and understand current support boundaries.

## Prerequisites

- You plan to use menu `[3] Embedding`
- A valid embedding model is configured

## Steps

1. Run through with in-memory vector store first:

```json
"VectorDB": {
  "Type": "Memory",
  "ConnectionString": ""
}
```

2. Then switch to Redis/Qdrant if needed (fill connection string by environment):

```json
"VectorDB": {
  "Type": "Redis",
  "ConnectionString": "127.0.0.1:6379"
}
```

```json
"VectorDB": {
  "Type": "Qdrant",
  "ConnectionString": "127.0.0.1"
}
```

3. Types not currently supported in code (will throw Not Supported):
- `HardDisk`, `Milvus`, `Chroma`, `PostgreSQL`, `Sqlite`, `SqlServer`

## Expected Result and Troubleshooting

- Expected: similar text can be retrieved after embedding ingestion.
- If Redis/Qdrant connection fails: revert to `Memory` first to verify business chain.
- If retrieval always returns empty: check ingestion was completed and query is not empty.
