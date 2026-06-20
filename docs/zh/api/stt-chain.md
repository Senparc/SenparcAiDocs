# 我要做语音转文字（STT）

## 场景

我需要把音频文件识别为文本，后续用于摘要、检索或对话输入。

## 最小链路

```csharp
var run = handler.IWantTo(setting)
    .ConfigSpeechToTextModel("Jeffrey")
    .BuildKernel();

var text = await run.RunSpeechToTextAsync("demo.m4a");
Console.WriteLine(text);
```

## 常用增强

```csharp
using OpenAI.Audio;

var options = new AudioTranscriptionOptions
{
    Language = "zh"
};

var text = await run.RunSpeechToTextAsync("demo.m4a", options);
```

- 支持文件类型：`flac` / `m4a` / `mp3` / `mp4` / `mpeg` / `mpga` / `oga` / `ogg` / `wav` / `webm`。
- 若未指定 `Language`，默认自动识别。

