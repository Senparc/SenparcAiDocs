# 平台切换（NeuCharAI / OpenAI / Azure / Ollama）

## 目标

用一套 Sample 在不同平台之间切换，并知道各平台最小必填项。

## 前置条件

- 已完成 [appsettings 配置](/zh/config/appsettings.html)

## 步骤

1. 选择平台：

```json
"AiPlatform": "NeuCharAI"
```

可选值：`NeuCharAI`、`OpenAI`、`AzureOpenAI`、`Ollama`。

2. 平台最小字段：
- NeuCharAI：`ApiKey`、`NeuCharEndpoint`、`ModelName.Chat`
- OpenAI：`ApiKey`、`ModelName.Chat`
- Azure OpenAI：`ApiKey`、`AzureEndpoint`、`AzureOpenAIApiVersion`、`ModelName.Chat`
- Ollama：`Endpoint`、`ModelName.Chat`

3. 通过菜单 `[0] 进入设置` 验证当前已识别配置：
- 可切换 `Default` / 平台键 / `Items` 子项

## 预期结果与排错

- 预期：设置页能列出你已配置的平台项。
- 若列表没有某平台：通常是该平台关键字段为空。
- 若切换后请求失败：先打印当前 `Endpoint` 与 `ModelName.Chat` 对照检查。
