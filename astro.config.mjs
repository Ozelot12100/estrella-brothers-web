// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import mcp from 'astro-mcp';

// astro-mcp es una herramienta de desarrollo; no debe integrarse en builds de producción
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.estrellabrotherscarpentry.com',
  output: 'static',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    }
  },

  // Integrations
  integrations: [sitemap(), ...(isDev ? [mcp()] : [])],

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Dev server - fixed port so MCP URL in .vscode/mcp.json always matches
  server: {
    port: 4321,
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