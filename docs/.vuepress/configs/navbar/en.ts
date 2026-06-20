import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  { text: 'Home', link: '/' },
  {
    text: 'Quick Start',
    children: [
      '/start/home/index.md',
      '/start/environment.md',
      '/start/clone-and-run.md',
      '/start/first-chat.md',
    ],
  },
  {
    text: 'Configuration',
    children: [
      '/config/appsettings.md',
      '/config/providers.md',
      '/config/vector-db.md',
      '/config/multi-model-switch.md',
    ],
  },
  {
    text: 'Tutorials',
    children: [
      '/tutorials/chat.md',
      '/tutorials/completion.md',
      '/tutorials/embedding.md',
      '/tutorials/rag.md',
      '/tutorials/image-generate.md',
    ],
  },
  {
    text: 'Source Analysis',
    children: [
      { text: 'Foundation Source Analysis', link: '/source/foundation/index.md' },
      { text: 'Sample Source Analysis', link: '/source/sample/index.md' },
      { text: 'Library Reference', link: '/source/reference/index.md' },
    ],
  },
  {
    text: 'API Scenarios',
    children: [
      '/api/chat-chain.md',
      '/api/embedding-chain.md',
      '/api/image-chain.md',
      '/api/stt-chain.md',
      '/api/tts-chain.md',
    ],
  },
  {
    text: 'FAQ',
    children: ['/faq/common-errors.md', '/faq/unsupported-features.md'],
  },
  {
    text: 'Chinese',
    link: '/zh/',
  },
  {
    text: 'Repository',
    children: [{ text: 'Senparc.AI', link: 'https://github.com/Senparc/Senparc.AI' }],
  },
]
