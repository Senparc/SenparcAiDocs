using Microsoft.Agents.AI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Senparc.AI.AgentKernel;
using Senparc.AI.AgentKernel.Handlers;
using Senparc.AI.Interfaces;
using Senparc.CO2NET;
using Senparc.CO2NET.RegisterServices;

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
    .Build();

var services = new ServiceCollection();
services.AddSenparcGlobalServices(config);
services.AddSenparcAI(config);
services.AddMemoryCache();

var sp = services.BuildServiceProvider();

RegisterService.Start()
    .UseSenparcGlobal()
    .UseSenparcAI();

var handler = sp.GetRequiredService<IAiHandler>() as AgentAiHandler
    ?? throw new InvalidOperationException("IAiHandler is not AgentAiHandler.");

var iWantToRun = await handler.IWantTo()
    .ConfigChatModel("demo-user", new ChatClientAgentOptions
    {
        ChatOptions = new() { Instructions = "You are a concise assistant." }
    })
    .BuildKernelWithAgentSessionAsync();

var result = await iWantToRun.RunChatAsync("请介绍一下 Senparc.AI.AgentKernel。", iWantToRun.Kernel.AgentSession);
Console.WriteLine(result.Result.Text);
