# 我要做文本转语音（TTS）

## 场景

我需要把文本合成为音频文件，用于播报、语音回复或语音通知。

## 最小链路

```csharp
var run = handler.IWantTo(setting)
    .ConfigTextToSpeechModel("Jeffrey")
    .BuildKernel();

var audio = await run.RunTextToSpeechAsync("你好，欢迎使用 Senparc.AI");
await File.WriteAllBytesAsync("tts.mp3", audio.ToArray());
```

## 常用增强

```csharp
var audio = await run.RunTextToSpeechAsync(
    text: "请在 10 分钟后提醒我开会",
    voice: "alloy",
    format: "mp3",
    speedRatio: 1.0f);

await File.WriteAllBytesAsync("tts-alloy.mp3", audio.ToArray());
```

- 常用音色：`alloy` / `ash` / `ballad` / `coral` / `echo` / `fable` / `onyx` / `nova` / `sage` / `shimmer` / `verse`。
- 常用格式：`mp3` / `opus` / `aac` / `flac` / `wav` / `pcm`。
- 建议语速：`0.5` ~ `2.0`（默认 `1.0`）。

