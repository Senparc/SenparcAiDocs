# Image Generate 教程（文本生图）

## 目标

运行 `ImageGenerateSample`，生成图片并保存到本地文件。

## 前置条件

- 平台已支持 `TextToImage`（模型名已配置）

## 步骤

1. 输入 `4` 进入生图菜单。
2. 输入描述词，例如：

```text
a cute cat running on grass, photorealistic, daylight
```

3. 程序会执行 `ImageGenerationAsync`。
4. 成功时会保存为本地文件：`Senparc.AI.Image-<ticks>.png`。

核心链路：

```csharp
var run = handler.IWantTo(setting)
    .ConfigImageModel("Jeffrey")
    .BuildKernel();

var image = await run.Kernel.ImageGenerationAsync(input, 1024, 1024);
```

## 预期结果与排错

- 预期：控制台输出“生成完成”，并显示保存路径。
- 若返回 URI 但无字节：按平台能力检查返回模式。
- 若报模型不支持：确认 `ModelName.TextToImage` 在当前平台配置下存在。

![Image 输出示意图](/images/tutorials/image-output-20260617.svg)

你应该看到什么：`图片已保存：Senparc.AI.Image-xxxx.png`。
