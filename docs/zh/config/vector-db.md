# 向量库配置

## 目标

正确配置 Embedding 场景所需的向量库，并了解当前支持边界。

## 前置条件

- 你准备使用 `[3] Embedding` 菜单
- 已配置可用 Embedding 模型

## 步骤

1. 先用内存库跑通：

```json
"VectorDB": {
  "Type": "Memory",
  "ConnectionString": ""
}
```

2. 可切到 Redis/Qdrant（连接字符串按环境填写）：

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

3. 当前代码里未支持的类型（会抛出 Not Supported）：
- `HardDisk`、`Milvus`、`Chroma`、`PostgreSQL`、`Sqlite`、`SqlServer`

## 预期结果与排错

- 预期：Embedding 录入后可检索到相似文本。
- 若 Redis/Qdrant 报连接错误：先回退到 `Memory` 验证业务链路。
- 若检索一直为空：检查是否完成了录入并输入了非空查询。
