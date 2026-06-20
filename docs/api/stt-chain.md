# Speech-to-Text (STT)

## Scenario

I need to transcribe audio files into text for summarization, retrieval, or chat input.

## Minimum Chain

```csharp
var run = handler.IWantTo(setting)
    .ConfigSpeechToTextModel("Jeffrey")
    .BuildKernel();

var text = await run.RunSpeechToTextAsync("demo.m4a");
Console.WriteLine(text);
```

## Common Enhancements

```csharp
using OpenAI.Audio;

var options = new AudioTranscriptionOptions
{
    Language = "zh"
};

var text = await run.RunSpeechToTextAsync("demo.m4a", options);
```

- Supported input formats: `flac` / `m4a` / `mp3` / `mp4` / `mpeg` / `mpga` / `oga` / `ogg` / `wav` / `webm`.
- If `Language` is not specified, automatic detection is used.
