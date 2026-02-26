// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://estrellabrotherscarpinters.com',
  output: 'static',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    }
  },

  // Integrations
  integrations: [sitemap()],

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Vite configuration
  vite: {
    // @ts-expect-error Types for Tailwind Vite plugin currently conflict with Astro's Vite types
    plugins: [tailwindcss()],
  },

  // Build optimization
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});