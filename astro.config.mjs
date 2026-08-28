import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.jobconnections.jp',
  output: 'static',
  redirects: {
    '/admin': '/admin/index.html'
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja',
          en: 'en',
          'pt-br': 'pt-BR',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
