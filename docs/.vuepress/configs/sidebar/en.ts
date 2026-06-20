import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/start/': [
    {
      text: 'Quick Start',
      children: [
        '/start/home/index.md',
        '/start/environment',
        '/start/clone-and-run',
        '/start/first-chat',
      ],
    },
  ],
  '/config/': [
    {
      text: 'Configuration',
      children: [
        '/config/appsettings',
        '/config/providers',
        '/config/vector-db',
        '/config/multi-model-switch',
      ],
    },
  ],
  '/tutorials/': [
    {
      text: 'Tutorials',
      children: [
        '/tutorials/chat',
        '/tutorials/completion',
        '/tutorials/embedding',
        '/tutorials/rag',
        '/tutorials/image-generate',
      ],
    },
  ],
  '/source/': [
    {
      text: 'Foundation Source Analysis',
      children: [
        '/source/foundation/index',
        '/source/foundation/module-overview',
        '/source/foundation/senparc-ai-module',
        '/source/foundation/agent-framework-module',
        '/source/foundation/kernel-config-chain',
        '/source/foundation/unit-tests',
      ],
    },
    {
      text: 'Sample Source Analysis',
      children: [
        '/source/sample/index',
        '/source/sample/program-and-di',
        '/source/sample/sample-setting',
        '/source/sample/agent-session',
      ],
    },
    {
      text: 'Library Reference',
      children: [
        '/source/reference/index',
        '/source/reference/senparc-ai',
        '/source/reference/agentkernel',
      ],
    },
  ],
  '/api/': [
    {
      text: 'API Scenarios',
      children: [
        '/api/chat-chain',
        '/api/embedding-chain',
        '/api/image-chain',
        '/api/stt-chain',
        '/api/tts-chain',
      ],
    },
  ],
  '/faq/': [
    {
      text: 'FAQ / Troubleshooting',
      children: ['/faq/common-errors', '/faq/unsupported-features'],
    },
  ],
  '/meta/': [
    {
      text: 'Release and Contribution',
      children: ['/meta/release-notes', '/meta/contributing'],
    },
  ],
}
