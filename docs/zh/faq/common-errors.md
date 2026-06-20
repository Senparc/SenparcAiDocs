# 常见错误与处理

## 1. 401 / 403 鉴权失败

- 现象：调用立即报无权限。
- 处理：检查 `AiPlatform` 与对应 `*Keys` 是否匹配；不要把 OpenAI Key 放到 Azure 节点。

## 2. 模型不可用或未找到

- 现象：返回 model not found / unsupported。
- 处理：改成当前平台真实可用模型名。

## 3. Embedding 维度不一致

- 现象：写入或检索时报维度错误。
- 处理：`EmbeddingDimensions` 必须与 Embedding 模型维度一致。

## 4. Redis/Qdrant 连接失败

- 现象：Embedding 初始化失败。
- 处理：先回退 `VectorDB.Type=Memory`，确认业务链路，再排查连接串。

## 5. .NET 版本不匹配

- 现象：`TargetFramework net10.0` 构建失败。
- 处理：安装 .NET 10 SDK。

![典型错误示意图](/images/faq/error-example-20260617.svg)

你应该看到什么：错误信息会明确指向“鉴权/模型/连接/版本”中的一类。
