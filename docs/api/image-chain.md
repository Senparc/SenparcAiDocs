# Text-to-Image

## Scenario

I need to generate image files from natural-language prompts.

## Minimum Chain

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

## Notes

- First confirm current provider really supports image models.
- `TextToImage` model name must be configured under the selected provider node.
