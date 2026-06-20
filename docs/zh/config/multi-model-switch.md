# 多模型与动态切换

## 目标

通过 `Items` 和设置菜单实现同一程序内的多模型切换。

## 前置条件

- 已理解 [平台切换](/zh/config/providers.html)

## 步骤

1. 在 `SenparcAiSetting.Items` 中新增子配置：

```json
"Items": {
  "AzureImage": {
    "AiPlatform": "AzureOpenAI",
    "AzureOpenAIKeys": {
      "ApiKey": "<YOUR_AZURE_KEY>",
      "AzureEndpoint": "<YOUR_AZURE_ENDPOINT>",
      "AzureOpenAIApiVersion": "2022-12-01",
      "ModelName": {
        "TextToImage": "dall-e-3"
      }
    }
  }
}
```

2. 运行 Sample，输入 `0` 进入设置。
3. 选择“选择模型”，从列表切换到 `Items/AzureImage`。

## 预期结果与排错

- 预期：主菜单显示“当前模型：AzureImage - AzureOpenAI - `endpoint`”。
- 若切换后某能力失败：检查该能力对应模型是否存在（如 `Chat`/`Embedding`/`TextToImage`）。
