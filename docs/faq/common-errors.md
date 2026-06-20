# Common Errors and Fixes

## 1. 401 / 403 Authentication Failure

- Symptom: request fails immediately with permission error.
- Fix: verify `AiPlatform` matches the corresponding `*Keys` node. Do not place OpenAI keys under Azure nodes.

## 2. Model Unavailable or Not Found

- Symptom: `model not found` or `unsupported`.
- Fix: switch to a model name actually available under current provider.

## 3. Embedding Dimension Mismatch

- Symptom: dimension errors during ingestion or retrieval.
- Fix: ensure `EmbeddingDimensions` equals actual embedding model dimensions.

## 4. Redis/Qdrant Connection Failure

- Symptom: embedding initialization fails.
- Fix: first fallback to `VectorDB.Type=Memory` to validate business chain, then debug connection string.

## 5. .NET Version Mismatch

- Symptom: build fails for `TargetFramework net10.0`.
- Fix: install .NET 10 SDK.

![Typical error preview](/images/faq/error-example-20260617.svg)

What you should see: error messages clearly fall into one category among auth/model/connection/version.
