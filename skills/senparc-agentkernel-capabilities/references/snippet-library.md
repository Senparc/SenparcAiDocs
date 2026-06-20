# Snippet Library

## Chat (with AgentSession + stream callback)

```csharp
var iWantToRun = await handler.IWantTo(setting)
    .ConfigChatModel("Jeffrey", new ChatClientAgentOptions
    {
        ChatOptions = new() { Instructions = "You are a helpful assistant." }
    })
    .BuildKernelWithAgentSessionAsync();

var session = iWantToRun.Kernel.AgentSession;
var result = await iWantToRun.RunChatAsync("你好，请介绍一下 NCF。", session, update =>
{
    Console.Write(update.Text);
});
Console.WriteLine();
Console.WriteLine(result.Result.Text);
```

## Completion

```csharp
var run = handler.IWantTo(setting)
    .ConfigModel(ConfigModel.TextCompletion, "Jeffrey")
    .BuildKernel();

var result = await run.RunChatAsync("用一句话解释向量检索。");
Console.WriteLine(result.Result.Text);
```

## Embedding + Search

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextEmbeddingModel("Jeffrey", "MyCollection")
    .BuildKernel();

var store = run.CreateTextSearchStore();
await store.UpsertDocumentsAsync(new[]
{
    new TextSearchDocument
    {
        SourceId = 1,
        SourceName = "doc-1",
        SourceLink = "local://doc-1",
        Text = "Senparc.AI.AgentKernel supports Chat and Embedding."
    }
});

var hits = await store.SearchAsync("What does AgentKernel support?", 3);
foreach (var hit in hits)
{
    Console.WriteLine($"{hit.SourceName}: {hit.Text}");
}
```

## Image

```csharp
var run = handler.IWantTo(setting)
    .ConfigImageModel("Jeffrey")
    .BuildKernel();

var image = await run.Kernel.ImageGenerationAsync("A modern skyline at sunrise", 1024, 1024);
if (image.Value.ImageBytes != null)
{
    await File.WriteAllBytesAsync("output.png", image.Value.ImageBytes);
}
```

## STT

```csharp
var run = handler.IWantTo(setting)
    .ConfigSpeechToTextModel("Jeffrey")
    .BuildKernel();

var text = await run.RunSpeechToTextAsync("sample.m4a");
Console.WriteLine(text);
```

## TTS

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextToSpeechModel("Jeffrey")
    .BuildKernel();

var audio = await run.RunTextToSpeechAsync("你好，欢迎使用 Senparc.AI.AgentKernel。", "alloy", "mp3", speedRatio: 1.0f);
await File.WriteAllBytesAsync("tts.mp3", audio.ToArray());
```
