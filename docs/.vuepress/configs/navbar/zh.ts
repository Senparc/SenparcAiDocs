import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  { text: '首页', link: '/zh/' },
  {
    text: '快速上手',
    children: [
      '/zh/start/home/index.md',
      '/zh/start/environment.md',
      '/zh/start/clone-and-run.md',
      '/zh/start/first-chat.md',
    ],
  },
  {
    text: '配置',
    children: [
      '/zh/config/appsettings.md',
      '/zh/config/providers.md',
      '/zh/config/vector-db.md',
      '/zh/config/multi-model-switch.md',
    ],
  },
  {
    text: '实战教程',
    children: [
      '/zh/tutorials/chat.md',
      '/zh/tutorials/completion.md',
      '/zh/tutorials/embedding.md',
      '/zh/tutorials/rag.md',
      '/zh/tutorials/image-generate.md',
    ],
  },
  {
    text: '源码解析',
    children: [
      { text: '基础库源码解析', link: '/zh/source/foundation/index.md' },
      { text: 'Sample 库源码解析', link: '/zh/source/sample/index.md' },
      { text: '类库参考', link: '/zh/source/reference/index.md' },
    ],
  },
  {
    text: 'API 场景参考',
    children: [
      '/zh/api/chat-chain.md',
      '/zh/api/embedding-chain.md',
      '/zh/api/image-chain.md',
      '/zh/api/stt-chain.md',
      '/zh/api/tts-chain.md',
    ],
  },
  {
    text: 'FAQ',
    children: ['/zh/faq/common-errors.md', '/zh/faq/unsupported-features.md'],
  },
  {
    text: '开源仓库',
    children: [{ text: 'Senparc.AI', link: 'https://github.com/Senparc/Senparc.AI' }],
  },
]
