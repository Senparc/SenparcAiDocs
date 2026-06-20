# SenparcAiSetting 分步配置向导

Agent 在写入 `appsettings.json` 前，**必须先与用户确认配置**；禁止直接复制占位符模板后宣称“已完成”。

> **关键提醒**：项目能 `dotnet run` 启动，不代表 AI 可用。若 `ApiKey`、`Endpoint` 或 `ModelName.Chat` 仍为占位符/空值，Chat 调用会在运行时失败。

## 何时触发

- 新建 `appsettings.json` 时
- 用户说“跑不起来 / 401 / 模型不可用 / 连接失败”时
- 用户尚未说明要使用哪个 AI 平台时

## 第 0 步：说明必要性

向用户说明：

1. `SenparcSetting` 控制 CO2NET 缓存与调试开关，通常可沿用模板默认值。
2. **`SenparcAiSetting` 决定实际调用的 AI 平台与模型**；未正确填写时，程序启动成功但无法完成 Chat。
3. 所有密钥使用占位符写入文件，由用户在本地替换；Agent 不收集、不回显真实密钥。

## 第 1 步：选择 AI 平台

逐项询问用户（可用选择题），确认 `AiPlatform`：

| 值 | 适用场景 | 典型前置 |
|---|---|---|
| `OpenAI` | 直连 OpenAI API | OpenAI API Key |
| `AzureOpenAI` | Azure 托管 OpenAI | Azure 资源 Endpoint + Key |
| `NeuCharAI` | NeuChar 平台 | NeuChar ApiKey + Developer Endpoint |
| `Ollama` | 本地模型 | 本机已安装并启动 Ollama |

若用户不确定，优先建议：

- 已有 OpenAI Key → `OpenAI`
- 仅本地试用 → `Ollama`（需确认 `http://localhost:11434/` 可访问）
- 国内 NeuChar 账号 → `NeuCharAI`

## 第 2 步：收集平台必填项

仅配置与 `AiPlatform` 对应的 `*Keys` 节点；其他平台节点可保留占位符或省略（与 `minimal-appsettings.json` 结构对齐即可）。

### OpenAI → `OpenAIKeys`

| 字段 | 是否必填 | 说明 |
|---|---|---|
| `ApiKey` | 是 | 用户自行填写，Agent 写 `<Your-OpenAI-Key>` |
| `OrganizationId` | 否 | 无 Org 可留空字符串 |
| `ModelName.Chat` | 是 | 如 `gpt-4o`；须与用户账号可用模型一致 |
| `ModelName.Embedding` | Chat 可省略 | 仅 Embedding/RAG 需要 |
| `ModelName.EmbeddingDimensions` | Embedding 时必填 | 如 `text-embedding-3-small` → `1536` |

### AzureOpenAI → `AzureOpenAIKeys`

| 字段 | 是否必填 |
|---|---|
| `ApiKey` | 是 |
| `AzureEndpoint` | 是，形如 `https://<resource>.openai.azure.com/` |
| `AzureOpenAIApiVersion` | 是，如 `2022-12-01` |
| `ModelName.Chat` | 是，须与 Azure 部署名一致 |

### NeuCharAI → `NeuCharAIKeys`

| 字段 | 是否必填 |
|---|---|
| `ApiKey` | 是 |
| `NeuCharEndpoint` | 是，形如 `https://www.neuchar.com/<DeveloperId>` |
| `NeuCharAIApiVersion` | 是 |
| `ModelName.Chat` | 是 |

### Ollama → `OllamaKeys`

| 字段 | 是否必填 |
|---|---|
| `Endpoint` | 是，默认 `http://localhost:11434/` |
| `ModelName.Chat` | 是，须为本机已 `ollama pull` 的模型名 |

询问示例（OpenAI）：

1. “你是否已有 OpenAI API Key？（只需回答是/否，不要把 Key 发给我）”
2. “计划使用的 Chat 模型名是什么？（例如 gpt-4o；需与你的账号权限一致）”
3. “本次是否只需要 Chat？若还需要 Embedding/RAG，请一并确认 Embedding 模型与维度。”

## 第 3 步：确认通用块

向用户确认或说明默认值：

```json
"IsDebug": true,
"VectorDB": {
  "Type": "Memory",
  "ConnectionString": ""
}
```

- 首次 Bootstrap **建议** `VectorDB.Type` 为 `Memory`。
- 仅当用户明确需要外部向量库时，再引导查阅 `docs/zh/config/vector-db.md`。

## 第 4 步：写入并自检

1. 根据用户回答生成/更新 `appsettings.json`（结构参考 `minimal-appsettings.json`）。
2. 写入前自检清单：
   - [ ] `AiPlatform` 与用户选择一致
   - [ ] 对应 `*Keys` 中 **Chat 相关字段** 已按用户输入填写（非空、非占位符说明已提醒用户替换）
   - [ ] `ModelName.Chat` 与用户确认的模型名一致
   - [ ] 若涉及 Embedding，`EmbeddingDimensions` 与模型匹配
3. **明确告知用户**：请将 `<Your-*-Key>` 等占位符在本地替换为真实密钥后再执行 `dotnet run`。

## 第 5 步：运行前最后确认

在建议用户 `dotnet run` 之前，输出一段配置摘要（不含真实密钥）：

```text
当前配置摘要：
- AiPlatform: OpenAI
- Chat 模型: gpt-4o
- ApiKey: 已由用户在本地填写 / 仍为占位符（需替换后才能调用）
- VectorDB: Memory
```

若 ApiKey 仍为占位符，**必须警告**：此时只能验证项目编译与 DI 注册，**无法**验证 AI 返回。

## 常见失败与对应检查

| 现象 | 优先检查 |
|---|---|
| 401 / Unauthorized | 对应平台 `ApiKey` 是否已替换、是否过期 |
| 模型不存在 / NotFound | `ModelName.Chat` 与平台可用模型/部署名是否一致 |
| 连接超时 | Ollama `Endpoint`、代理网络、Azure/NeuChar Endpoint 是否正确 |
| Embedding 维度错误 | `EmbeddingDimensions` 是否与 Embedding 模型匹配 |
| 启动正常但无 AI 输出 | `AiPlatform` 与已填写的 `*Keys` 是否匹配（最常见：选了 OpenAI 却只填了 Azure Keys） |

## 延伸阅读

- 字段说明：`docs/zh/config/appsettings.md`
- 平台最小必填：`docs/zh/config/providers.md`
- 多模型 `Items`：`docs/zh/config/multi-model-switch.md`（Bootstrap 阶段通常不需要）
