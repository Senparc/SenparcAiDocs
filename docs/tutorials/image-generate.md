# Image Generate Tutorial (Text-to-Image)

## Goal

Run `ImageGenerateSample`, generate an image, and save it locally.

## Prerequisites

- Current provider supports `TextToImage` (model name is configured)

## Steps

1. Enter `4` for image generation.
2. Enter a prompt, for example:

```text
a cute cat running on grass, photorealistic, daylight
```

3. Program calls `ImageGenerationAsync`.
4. On success, image is saved locally as `Senparc.AI.Image-<ticks>.png`.

Core chain:

```csharp
var run = handler.IWantTo(setting)
    .ConfigImageModel("Jeffrey")
    .BuildKernel();

var image = await run.Kernel.ImageGenerationAsync(input, 1024, 1024);
```

## Expected Result and Troubleshooting

- Expected: console prints generation completed and save path.
- If URI returned but bytes are empty: check provider return mode support.
- If model unsupported appears: verify `ModelName.TextToImage` under current provider.

![Image output preview](/images/tutorials/image-output-20260617.svg)

What you should see: `Image saved: Senparc.AI.Image-xxxx.png`.
