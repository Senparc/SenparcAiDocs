# Text-to-Speech (TTS)

## Scenario

I need to synthesize text into audio files for narration, voice replies, or notifications.

## Minimum Chain

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextToSpeechModel("Jeffrey")
    .BuildKernel();

var audio = await run.RunTextToSpeechAsync("Hello, welcome to Senparc.AI");
await File.WriteAllBytesAsync("tts.mp3", audio.ToArray());
```

## Common Enhancements

```csharp
var audio = await run.RunTextToSpeechAsync(
    text: "Please remind me about the meeting in 10 minutes",
    voice: "alloy",
    format: "mp3",
    speedRatio: 1.0f);

await File.WriteAllBytesAsync("tts-alloy.mp3", audio.ToArray());
```

- Common voices: `alloy` / `ash` / `ballad` / `coral` / `echo` / `fable` / `onyx` / `nova` / `sage` / `shimmer` / `verse`.
- Common formats: `mp3` / `opus` / `aac` / `flac` / `wav` / `pcm`.
- Recommended speed range: `0.5` to `2.0` (default `1.0`).
