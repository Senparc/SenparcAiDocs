# 我要做文本生图

## 场景

我需要输入自然语言描述并生成图片文件。

## 最小链路

```csharp
var run = handler.IWantTo(setting)
    .ConfigImageModel("Jeffrey")
    .BuildKernel();

var image = await run.Kernel.ImageGenerationAsync("a cute cat", 1024, 1024);
if (image.Value.ImageBytes is { Length: > 0 } bytes)
{
    await File.WriteAllBytesAsync("demo.png", bytes);
}
```

## 注意事项

- 先确认当前平台确实支持图像模型。
- `TextToImage` 模型名需在当前平台节点中配置。
