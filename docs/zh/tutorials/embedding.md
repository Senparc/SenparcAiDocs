# Embedding 教程（向量录入与检索）

## 目标

运行 `EmbeddingSample`，完成“录入文本 -> 向量化 -> 相似检索”闭环。

## 前置条件

- Embedding 模型可用
- `VectorDB` 已配置（建议先 `Memory`）

## 步骤

1. 输入 `3`，再选子项 `1`。
2. 进入录入阶段：逐行输入文本，输入 `n` 结束录入。
3. 进入检索阶段：输入问题，观察 TopK 命中。

关键链路：

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextEmbeddingModel(userId, collectionName)
    .BuildKernel();

var store = run.CreateTextSearchStore();
await store.UpsertDocumentsAsync(...);
var hits = await store.SearchAsync(question, 3);
```

## 预期结果与排错

- 预期：每条录入会打印向量维度。
- 预期：查询可返回 1~3 条命中记录。
- 若维度报错：`EmbeddingDimensions` 与模型维度不一致。
- 若无命中：检查录入内容是否为空、是否在同一 collection。

![Embedding 检索示意图](/images/tutorials/embedding-search-20260617.svg)

你应该看到什么：`应答结果[1]`、`Id`、`Name`、`Text` 字段被打印。
