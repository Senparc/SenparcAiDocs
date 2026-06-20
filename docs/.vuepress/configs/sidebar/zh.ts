import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/start/': [
    {
      text: '快速上手',
      children: [
        '/zh/start/home/index.md',
        '/zh/start/environment',
        '/zh/start/clone-and-run',
        '/zh/start/first-chat',
      ],
    },
  ],
  '/zh/config/': [
    {
      text: '配置中心',
      children: [
        '/zh/config/appsettings',
        '/zh/config/providers',
        '/zh/config/vector-db',
        '/zh/config/multi-model-switch',
      ],
    },
  ],
  '/zh/tutorials/': [
    {
      text: '实战教程',
      children: [
        '/zh/tutorials/chat',
        '/zh/tutorials/completion',
        '/zh/tutorials/embedding',
        '/zh/tutorials/rag',
        '/zh/tutorials/image-generate',
      ],
    },
  ],
  '/zh/source/': [
    {
      text: '基础库源码解析',
      children: [
        '/zh/source/foundation/index',
        '/zh/source/foundation/module-overview',
        '/zh/source/foundation/senparc-ai-module',
        '/zh/source/foundation/agent-framework-module',
        '/zh/source/foundation/kernel-config-chain',
        '/zh/source/foundation/unit-tests',
      ],
    },
    {
      text: 'Sample 库源码解析',
      children: [
        '/zh/source/sample/index',
        '/zh/source/sample/program-and-di',
        '/zh/source/sample/sample-setting',
        '/zh/source/sample/agent-session',
      ],
    },
    {
      text: '类库参考',
      children: [
        '/zh/source/reference/index',
        '/zh/source/reference/senparc-ai',
        '/zh/source/reference/agentkernel',
      ],
    },
  ],
  '/zh/api/': [
    {
      text: 'API 场景参考',
      children: [
        '/zh/api/chat-chain',
        '/zh/api/embedding-chain',
        '/zh/api/image-chain',
        '/zh/api/stt-chain',
        '/zh/api/tts-chain',
      ],
    },
  ],
  '/zh/faq/': [
    {
      text: 'FAQ / 排错',
      children: ['/zh/faq/common-errors', '/zh/faq/unsupported-features'],
    },
  ],
  '/zh/meta/': [
    {
      text: '发布与贡献',
      children: ['/zh/meta/release-notes', '/zh/meta/contributing'],
    },
  ],
}
