import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import { head, navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs/index.js'

const __dirname = getDirname(import.meta.url)
const isProd = process.env.NODE_ENV === 'production'
const docsBase = process.env.DOCS_BASE ?? '/'

export default defineUserConfig({
  base: docsBase,
  head,

  locales: {
    '/': {
      lang: 'en-US',
      title: 'SenparcAiDocs',
      description: 'Beginner-friendly docs for Senparc.AI.AgentKernel',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'SenparcAiDocs',
      description: '面向新手的 Senparc.AI.AgentKernel 文档',
    },
  },

  bundler:
    process.env.DOCS_BUNDLER === 'vite'
      ? viteBundler()
      : webpackBundler({
          scss: {
            sassOptions: {
              silenceDeprecations: ['import'],
            },
          },
        }),

  theme: defaultTheme({
    hostname: 'https://senparc.github.io/SenparcAiDocs',
    logo: '/images/logo.svg',
    logoDark: '/images/logo.svg',
    repo: 'Senparc/Senparc.AI',
    docsRepo: 'Senparc/Senparc.AI',
    docsDir: 'SenparcAiDocs/docs',

    locales: {
      '/': {
        navbar: navbarEn,
        sidebar: sidebarEn,
        editLinkText: 'Edit this page on GitHub',
      },
      '/zh/': {
        navbar: navbarZh,
        sidebar: sidebarZh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
      },
    },

    themePlugins: {
      git: isProd,
      prismjs: !isProd,
    },

    colorMode: 'auto',
    colorModeSwitch: true,
    externalLinkIcon: true,
    lastUpdated: true,
    contributors: true,
  }),

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    isProd
      ? shikiPlugin({
          langs: ['bash', 'diff', 'json', 'md', 'ts', 'csharp'],
          theme: 'dark-plus',
        })
      : [],
  ],
})
