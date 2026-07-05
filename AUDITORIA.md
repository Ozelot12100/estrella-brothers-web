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

---

# Segunda auditoría — Documentación y UX/UI (julio 2026)

## 🔴 Integridad de contenido (legal)

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| C1 | El FAQ afirmaba tener licencia de Arizona y seguro de responsabilidad civil (General Liability). El negocio **no** los tiene todavía → afirmación falsa con riesgo legal (AZ ROC). Reformulado a trayectoria/garantía verídica; suavizado el claim de gestión de permisos. **Restaurar la afirmación real cuando se obtenga la licencia (~1 año).** | `src/components/home/FAQ.astro:8-9,31-32` | ✅ Corregido |

## 🐛 UX — bug de conversión

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| U1 | Enlace "Contáctenos directamente" del FAQ hardcodeado: EN → `/en/contacto` (404); ES → `/contacto` (redirige a la versión inglesa). Migrado a `localizePath` | `src/components/home/FAQ.astro:66` | ✅ Corregido |
| U2 | Slider "ANTES/DESPUÉS" hardcodeado en español, visible en páginas EN | `src/components/projects/BeforeAfterSlider.astro` | ✅ Corregido |

## ♿ Accesibilidad

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| UX1 | Sin "skip to content" | `src/layouts/Layout.astro` | ✅ Corregido |
| UX2 | Foco de teclado eliminado sin reemplazo (acordeón FAQ, slider antes/después) | `FAQ.astro:94`, `BeforeAfterSlider.astro` | ✅ Corregido |
| UX3 | CTA de servicios solo visible con hover (invisible al foco por teclado) | `HomePage.astro` (overlay) | ✅ Corregido (`group-focus-within`) |
| UX4 | Contraste sub-AA por el remapeo ámbar (`blue-600` = `#d97706`, ~3.3:1) en badges, botones pequeños y links | sistémico | ✅ Corregido (ámbar → `blue-700`, hovers → `blue-800`) |
| UX5 | `prefers-reduced-motion` no cubría `animate-bounce-slow` ni `scroll-smooth` | `global.css`, `AboutSection.astro` | ✅ Corregido |
| UX6 | `<nav>` sin `aria-label`; áreas táctiles < 44px (tema, hamburguesa, idioma) | `Header.astro`, `ThemeToggle.astro`, `LanguageSelector.astro` | ✅ Corregido |

## 🛡️ Robustez

| # | Hallazgo | Ubicación | Estado |
|---|----------|-----------|--------|
| UX7 | ScrollReveal oculta Servicios/Proyectos/CTA con `opacity:0`; si el JS falla quedan invisibles | `src/components/ui/ScrollReveal.astro` | ✅ Corregido (fallback `<noscript>`) |
| UX8 | Header (~88-96px) más alto que el offset `pt-20` del `main` (recorte latente) | `src/layouts/Layout.astro` | ✅ Corregido (`pt-24`) |

## 📄 Documentación

| # | Hallazgo | Estado |
|---|----------|--------|
| D1 | Los 4 docs usaban `pnpm`; el proyecto usa `npm` | ✅ Corregido |
| D2 | Plantillas de proyecto con `category: "Remodelación"` (enum inválido → rompe el build) | ✅ Corregido (enum en inglés documentado) |
| D3 | README afirmaba "Formulario de contacto (Netlify Forms)" — no existe | ✅ Corregido |
| D4 | Rutas de archivo obsoletas (`content/config.ts`, `contacto.astro`, `proyectos/`), sin árbol `es/` ni `components/pages/` | ✅ Corregido |
| D5 | `site.ts`: `phone` como string (ahora objeto `{e164, display}`); `title/description/locale` ya no existen | ✅ Corregido |
| D6 | Sistema i18n sin documentar (pieza central del refactor); campos bilingües `titleEs/descriptionEs` no explicados | ✅ Corregido |
| D7 | Marca vieja "Luis Estrella / Portfolio" en vez de "Estrella Brothers"; dominio `www` no mencionado | ✅ Corregido |
| D8 | Documentación Técnica: "CDN Cloudflare" (es Vercel) y "Archivos .mdx" (solo `.md`) | ✅ Corregido |

## Observaciones (sin acción de código)

- **Restaurar licencia/seguro en el FAQ** cuando el negocio los obtenga (~2027). Mientras tanto, no se muestran badges de "Licensed & Insured" para no afirmar algo falso.
- **El slider "Antes/Después"** (una característica destacada) no lo usa ningún proyecto actual: ninguno define `beforeImage`/`afterImage`. El código quedó localizado y listo; falta agregar contenido con esas imágenes.
- **CTA de llamar en el header móvil**: hoy vive dentro del menú hamburguesa (el botón flotante de WhatsApp compensa parcialmente). Mejora opcional de conversión pendiente de decisión.

---

# Evolución posterior a las auditorías (julio 2026)

Cambios mayores aplicados después de cerrar las dos auditorías. Actualizan el estado del sitio y **dejan obsoletos** algunos hallazgos anteriores (marcados abajo).

- **Rediseño "Artisan Timber & Earth"** — se reemplazó el sistema visual anterior (remapeo de color ámbar/piedra + modo oscuro) por una identidad cálida derivada del logo: superficie crema, primario umber quemado, secundario roble tostado; titulares en **Source Serif 4** y cuerpo en **Work Sans** (auto-alojadas con `@fontsource-variable`). Se **eliminó el modo oscuro** y el componente `ThemeToggle`, y se añadió `MobileBar` (barra inferior móvil con Llamar/WhatsApp/Proyectos/Cotizar). → *Deja obsoletos UX4 y UX5 (eran del sistema de color ámbar anterior).*
- **CTA de llamar en móvil** — resuelto por la nueva `MobileBar` fija (ya no depende del menú hamburguesa). → *Cierra la observación "CTA de llamar en el header móvil".*
- **Fotos reales** — se reemplazaron las imágenes de stock por fotos del trabajo real de Luis. La galería quedó en **6 proyectos verídicos** (ubicación "Phoenix, AZ", pendiente afinar ciudad por proyecto). `og-image.jpg` se regeneró desde una foto de proyecto (gazebo junto a alberca), no desde el logo.
- **Íconos de marca** — el favicon mostraba un recorte cerrado e ilegible de las tablas (parecía madera sin forma, sobre todo en la miniatura de WhatsApp). Se regeneraron **todos** los íconos desde el logo completo con un esquema por tamaño: **marca de tablas cruzadas** para el favicon chico (16/32/48 + `.ico`, nítido en la pestaña) y **letrero completo** para los íconos grandes (WhatsApp, iOS, PWA). Detalle en [`GUIA_PROYECTOS.md`](GUIA_PROYECTOS.md#iconos-y-og-image).
- **Contacto y analítica** — formulario de contacto por `mailto:` (sin backend) en `ContactPage`; inyección (solo en producción) de los scripts de Vercel Web Analytics y Speed Insights. *(Pendiente del usuario: activarlos en el dashboard de Vercel; opcionalmente migrar el formulario a Web3Forms/Formspree con un access key.)*
