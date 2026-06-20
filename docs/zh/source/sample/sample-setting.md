# SampleSetting 与 ModelSettingCatalog

`SampleSetting.cs` + `ModelSettingCatalog.cs` 负责“运行时切换模型配置”。

## 关键点

- `CurrentSettingKey`：当前选中配置键（默认 `Default`）。
- `ModelSettingCatalog.GetChoices()`：动态枚举可用平台与 `Items` 子配置。
- `Resolve(key)`：把选择结果解析成 `ISenparcAiSetting`。
- 可在菜单 `[0]` 中切换模型与开关 `HttpClient` 日志。

## 实战意义

- 同一个可执行程序，不改代码就能切平台。
- 适合做“同 Prompt 跨平台对比测试”。
