// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://luisestrella.com',
  output: 'static',

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
    plugins: [tailwindcss()],
  },

  // Build optimization
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});