# Documentación técnica — Estrella Brothers Carpentry

## 1. Visión general

Sitio web tipo portafolio para **Estrella Brothers Carpentry**, especialistas en framing, carpintería y remodelación en el área de Phoenix, Arizona.

- **Administrador:** desarrollador (gestión total del contenido).
- **Cliente final:** dueño del negocio (Luis Estrella); envía fotos por WhatsApp/Email.
- **Público objetivo:** propietarios de vivienda en Phoenix, Scottsdale, Mesa, Tempe y alrededores (muchos hispanohablantes).
- **Objetivo principal:** mostrar la calidad del trabajo para generar leads por **WhatsApp, llamada y un formulario de correo** (`mailto:`, sin backend).

> **Formulario de contacto:** en `ContactPage.astro` hay un formulario que arma un correo con `mailto:` al `author.email` de `site.ts` (abre la app de correo del visitante). No requiere backend ni claves. Para un envío en la página (sin abrir la app de correo) se puede cambiar a un servicio como Web3Forms/Formspree pegando su access key.

> **Analítica:** `Layout.astro` inyecta (solo en producción) los scripts de **Vercel Web Analytics** y **Speed Insights** desde el edge de Vercel. Hay que activarlos en el dashboard del proyecto (Analytics / Speed Insights → Enable). No añaden dependencias npm.

## 2. Arquitectura de software

Arquitectura **Jamstack** con **SSG (Static Site Generation)**: Astro pre-renderiza todo a HTML/CSS/JS estático en el build.

### Flujo de datos

1. **Ingesta:** fotos crudas → procesamiento local → `src/assets/projects/` (.webp).
2. **Contenido:** datos de cada proyecto → archivos Markdown en `src/content/projects/`.
3. **Build:** Astro valida tipos (`astro check`) y compila a `dist/`.
4. **Despliegue:** GitHub → Vercel (build + CDN de Vercel). El apex redirige a `www`.

### Ventajas

- **Rendimiento:** HTML pre-renderizado, carga casi instantánea (clave para SEO y móviles).
- **Seguridad:** sin base de datos ni backend expuesto.
- **Costo:** hosting en la capa gratuita de Vercel.

## 3. Stack tecnológico

| Herramienta | Versión / Tipo | Justificación |
| :---- | :---- | :---- |
| **Astro** | v5.x | Framework principal. 0 kB de JS por defecto. Optimización de imágenes nativa. |
| **TypeScript** | Strict | Tipado estático; evita errores en producción. |
| **Tailwind CSS** | v4.x | Utilidades; integración nativa con Astro. Modo oscuro por clase + remapeo de color a tonos ámbar/piedra. |
| **npm** | Gestor de paquetes | Lockfile `package-lock.json`; es lo que usa Vercel (`installCommand`). |
| **Astro Assets** | Built-in + Sharp | Convierte imágenes a WebP y genera `srcset`. |
| **img-comparison-slider** | Web Component | Slider "Antes/Después" sin framework pesado. |
| **@astrojs/sitemap** | Integración | Sitemap automático. |
| **astro-mcp** | Solo dev | Herramienta de desarrollo; no se incluye en el build de producción. |

## 4. Estrategia de imágenes

Las imágenes originales (~4032×3024, ~12 MP) son demasiado pesadas para el repo.

1. **Selección:** elegir las mejores fotos de cada trabajo.
2. **Optimización:** exportar a **`.webp`** (ancho ~1920px es suficiente). Astro genera después las variantes responsivas.
3. **Nombrado SEO:** describir contenido y ubicación, p. ej. `cocina-scottsdale-cover.webp`.
4. **Ubicación:** `src/assets/projects/`. (Referenciadas desde el frontmatter de cada proyecto con rutas relativas.)

## 5. Internacionalización (i18n)

Es la pieza estructural central del sitio.

- **Modelo de rutas:** inglés por defecto **sin prefijo** (`/`, `/projects`, `/contact`); español bajo **`/es/`** con slugs en español (`/es/`, `/es/proyectos`, `/es/contacto`). Configurado en `astro.config.mjs` (`i18n.defaultLocale: 'en'`, `prefixDefaultLocale: false`).
- **Diccionario:** [`src/i18n/ui.ts`](src/i18n/ui.ts) contiene TODOS los textos, con una clave por idioma. `useTranslations(lang)` (en `utils.ts`) devuelve la función `t()`.
- **Mapa de rutas:** [`src/i18n/routes.ts`](src/i18n/routes.ts) es la única fuente de verdad de las rutas por idioma. `localizePath(section, lang, sub?)` construye enlaces internos; `translatePath(path, targetLang)` traduce la URL actual al otro idioma (lo usan el selector de idioma y los hreflang). **Nunca** se escriben rutas a mano.
- **Redirects:** las URLs en español antiguas del sitio inglés (`/proyectos`, `/contacto`) redirigen con 308 a `/projects`, `/contact` (en `vercel.json`).

## 6. Estructura de directorios

```
src/
├── assets/
│   ├── projects/          # Imágenes .webp procesadas
│   └── logo/              # Logo de la marca (fuente de iconos/og-image)
├── components/
│   ├── common/            # Header, Footer, SEOHead
│   ├── home/              # AboutSection, Testimonials, FAQ
│   ├── pages/             # HomePage, ProjectsPage, ProjectDetailPage, ContactPage (cuerpo real)
│   ├── projects/          # ProjectCard, BeforeAfterSlider
│   └── ui/                # Button, ThemeToggle, LanguageSelector, ScrollReveal, WhatsAppButton
├── config/
│   └── site.ts            # Datos del negocio
├── content/
│   └── projects/          # Archivos .md (uno por trabajo)
├── content.config.ts      # Schema Zod + glob() loader de la colección
├── i18n/                  # ui.ts, routes.ts, utils.ts
├── layouts/
│   └── Layout.astro       # Base HTML (head, tema, skip link)
├── pages/                 # Wrappers finos; espejo es/ bajo /es/
│   ├── index.astro, contact.astro, 404.astro
│   ├── projects/ (index.astro, [slug].astro)
│   └── es/ (index, contacto, proyectos/...)
├── styles/
│   └── global.css         # Tailwind + tema + reduced-motion
├── utils/
│   └── contact.ts         # waLink() (enlaces de WhatsApp)
└── types/
    └── index.ts           # SiteConfig, ServiceKey, SEOProps
```

Los archivos de `src/pages/**` son wrappers de ~5 líneas que importan el componente de `src/components/pages/`. Ese componente detecta el idioma con `getLangFromUrl(Astro.url)`, de modo que una sola implementación sirve a ambos idiomas.

## 7. Colección de contenido

`src/content.config.ts` usa el **Content Layer** de Astro 5: `defineCollection` con `glob({ pattern: '**/*.md', base: './src/content/projects' })` y un schema Zod (incluye `image()` para validar las imágenes). En las páginas se usa `entry.id` (el slug de la URL) y `render(entry)` para el contenido Markdown.

## 8. SEO

`src/components/common/SEOHead.astro` emite por página: `<title>`/descripción por idioma (desde `ui.ts`), canonical con dominio `www` y slash final, **hreflang** `en`/`es`/`x-default` (vía `translatePath`), Open Graph (con `og:locale` `en_US`/`es_US` y `og-image.jpg`) y JSON-LD `ProfessionalService`. El sitemap lo genera `@astrojs/sitemap`.
