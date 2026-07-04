# Auditoría técnica — Julio 2026

Hallazgos de la revisión completa del sitio (arquitectura, bugs, SEO, performance y buenas prácticas), con su estado de corrección. Las referencias archivo:línea corresponden al estado del código **antes** de las correcciones.

## 🐛 Bugs críticos (afectan conversión)

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| B1 | Enlaces de tarjetas de proyecto rotos: en EN generan `/en/proyectos/...` (ruta inexistente → 404) y en ES llevan a la versión EN | `src/components/projects/ProjectCard.astro:16` | ✅ Corregido |
| B2 | URL de WhatsApp inválida por doble código de país: el teléfono limpiado ya incluye el `1` y la URL antepone otro → `wa.me/114805146765` | `src/components/ui/WhatsAppButton.astro:11`, `src/pages/contacto.astro:6,60`, `src/pages/es/contacto.astro` | ✅ Corregido |
| B3 | `og-image.jpg` referenciada por defecto en Open Graph/Twitter no existe en `public/` → al compartir el sitio no aparece imagen | `src/components/common/SEOHead.astro:10` | ✅ Corregido |
| B4 | Contenido markdown de proyectos sin estilos: clases `prose` sin `@tailwindcss/typography` instalado | `src/pages/proyectos/[slug].astro:145,150` y copia ES | ✅ Corregido |
| B5 | Listado ES muestra títulos/descripciones en inglés (ProjectCard ignora `titleEs`/`descriptionEs`) y fechas siempre en español (`es-US` fijo, también en páginas EN) | `src/components/projects/ProjectCard.astro:11-22` | ✅ Corregido |

## 🔍 SEO

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| S1 | Sin `hreflang` alternates en un sitio bilingüe con URLs paralelas | `src/components/common/SEOHead.astro` | ✅ Corregido |
| S2 | `og:locale` fijo en `es-US` para todas las páginas y con formato inválido (OpenGraph usa `es_US`/`en_US`); sin `og:locale:alternate` | `src/config/site.ts:8`, `SEOHead.astro:41` | ✅ Corregido |
| S3 | La home EN usa `siteConfig.title`/`description` en español; JSON-LD siempre con descripción en español | `src/pages/index.astro:35`, `SEOHead.astro:59-84` | ✅ Corregido |
| S4 | URLs del sitio inglés en español (`/proyectos`, `/contacto`) — subóptimo para posicionar en inglés | `src/pages/proyectos/`, `src/pages/contacto.astro` | ✅ Corregido |
| S5 | `pages/es/404.astro` genera `/es/404/` que Vercel estático nunca sirve (solo usa `/404.html` raíz) y además entra al sitemap | `src/pages/es/404.astro` | ✅ Corregido |

## ⚡ Performance

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| P1 | Hero (LCP) carga foto genérica de Unsplash externa ~2000px sin optimizar, teniendo fotos reales locales | `src/pages/index.astro:44`, copia ES | ✅ Corregido |
| P2 | Logo cargado con `(await import(...)).default.src` sin `width`/`height` (CLS) y sin pasar por el optimizador | `src/components/common/Header.astro:35`, heros de ambas index | ✅ Corregido |
| P3 | ~224 fotos originales sin usar (409 MB) committeadas en `src/assets/Estrella brothers_/` — infla clones y builds | `src/assets/Estrella brothers_/` | ✅ Corregido |

## 🏗️ Arquitectura

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| A1 | Árbol de páginas EN/ES duplicado casi literal (~5 páginas × 2); cada cambio se hace dos veces y los bugs divergen | `src/pages/` vs `src/pages/es/` | ✅ Corregido |
| A2 | i18n repartido en 3 sistemas: diccionario `ui.ts`, ternarios `lang === "es"` inline, y textos hardcodeados por página | `src/i18n/ui.ts`, Header, Footer, páginas | ✅ Corregido |
| A3 | Enlaces localizados con ternarios repetidos en vez de un helper/route map central; el swap del selector de idioma es ingenuo | Header, index, `LanguageSelector.astro:8-13` | ✅ Corregido |
| A4 | Interfaz `Project` muerta y desincronizada del schema real de la colección (categorías distintas) | `src/types/index.ts:3-14` vs `src/content/config.ts:9` | ✅ Corregido |
| A5 | Claves de traducción de servicios derivadas del string de display con `as any` (apaga el chequeo de tipos); array de imágenes paralelo por índice | `src/pages/index.astro:145-161`, `src/config/site.ts:17` | ✅ Corregido |
| A6 | Título del hero partido con `.split(" Phoenix")[0]` — se rompe si cambia la traducción | `src/pages/index.astro:67`, copia ES | ✅ Corregido |
| A7 | Content Collections con API legacy de Astro 4 (`type: 'content'`, `entry.slug`, `entry.render()`) — deprecada en Astro 5 | `src/content/config.ts`, páginas `[slug]`, ProjectCard | ✅ Corregido |

## 🧹 Buenas prácticas / detalles

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| L1 | `astro-mcp` (herramienta de desarrollo) como integración también en builds de producción | `astro.config.mjs:22` | ✅ Corregido |
| L2 | Enlaces sociales del footer apuntan a `#` (enlaces muertos) | `src/components/common/Footer.astro:96-125` | ✅ Corregido |
| L3 | Teléfono hardcodeado `tel:+14805146765` en vez de `siteConfig` | `src/pages/proyectos/[slug].astro:167`, copia ES | ✅ Corregido |
| L4 | Selector de idioma solo abre con hover: inusable con teclado y errático en táctil (y se renderiza en el menú móvil); botones sin `aria-expanded` | `src/components/ui/LanguageSelector.astro:54`, `Header.astro:77` | ✅ Corregido |
| L5 | Filtro de categorías manipula ~10 clases por botón en JS; categorías sin traducir en ES ("Framing", "Deck"… y sentinel "All") | `src/pages/proyectos/index.astro:84-193` | ✅ Corregido |
| L6 | Stats del hero ("10+ años / 500+ proyectos") contradicen la narrativa nueva ("desde 2020, ~100 proyectos") | `src/pages/index.astro:99-107`, `AboutSection.astro` | ✅ Corregido |
| L7 | Sin verificación de tipos en el build (`astro check` no corre en CI ni en `npm run build`) | `package.json` | ✅ Corregido |

## Plan de corrección — COMPLETADO (julio 2026)

Fases aplicadas en este orden (cada una un commit que deja el sitio funcional):

1. **Red de seguridad + bugs atómicos** — B1–B5, L1–L3, L6, L7, A4, A6
2. **Route map + translatePath + a11y** — A3, L4
3. **De-duplicación EN/ES** — A1, A2, A5, L5, S5
4. **Migración content collections** — A7
5. **SEO** — S1, S2, S3
6. **Rename rutas EN con redirects 308** — S4
7. **Performance** — P1, P2, P3

Notas:
- Las fotos raw eliminadas en la fase 7 permanecen en el historial de git; purgarlas del historial requeriría `git filter-repo` (decisión futura, fuera de alcance).
- Los redirects de Vercel (fase 6) solo son verificables tras el deploy: comprobar con `curl -I https://estrellabrotherscarpentry.com/proyectos` (debe responder 308 → `/projects/`) y lo mismo para `/contacto` y `/proyectos/proyecto-01`.
- Verificación final local: `npm run build` (incluye `astro check`, 0 errores) y click-through de todas las rutas EN/ES en `astro preview` (todas 200, contenido localizado, 404 bilingüe).
