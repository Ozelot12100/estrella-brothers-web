# Estrella Brothers Carpentry — Sitio web

Sitio estático bilingüe (inglés/español) de **Estrella Brothers Carpentry**, servicios de carpintería, framing y remodelación en Phoenix, AZ. Construido con Astro 5, TypeScript y Tailwind CSS 4.

- **Producción:** https://www.estrellabrotherscarpentry.com
- **Idiomas:** inglés (por defecto, sin prefijo) y español (bajo `/es/`)
- **Contacto/leads:** WhatsApp, llamada telefónica y un formulario de correo (vía `mailto:`, sin backend)

## 🚀 Estructura del proyecto

```
/
├── public/                 # Estáticos servidos tal cual
│   ├── favicon.ico, favicon-16/32.png, apple-touch-icon.png
│   ├── icon-192.png, icon-512.png, site.webmanifest
│   ├── og-image.jpg        # Vista previa al compartir (generada del logo)
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── projects/        # Imágenes curadas de proyectos (.webp)
│   │   └── logo/            # Logo de la marca
│   ├── components/
│   │   ├── common/          # Header, Footer, SEOHead
│   │   ├── home/            # AboutSection, Testimonials, FAQ
│   │   ├── pages/           # Cuerpo real de cada página (ver abajo)
│   │   ├── projects/        # ProjectCard, BeforeAfterSlider
│   │   └── ui/              # Button, ThemeToggle, LanguageSelector, ScrollReveal, WhatsAppButton
│   ├── config/
│   │   └── site.ts          # Datos del negocio (nombre, teléfono, áreas, servicios)
│   ├── content/
│   │   └── projects/        # Un .md por proyecto
│   ├── content.config.ts    # Schema (Zod) + loader de la colección de proyectos
│   ├── i18n/
│   │   ├── ui.ts            # Diccionario de todos los textos (en/es)
│   │   ├── routes.ts        # Mapa de rutas por idioma + helpers de enlaces
│   │   └── utils.ts         # getLangFromUrl, useTranslations
│   ├── layouts/
│   │   └── Layout.astro     # Layout base (head, tema, skip link)
│   ├── pages/               # Wrappers finos; ES refleja EN bajo /es/
│   │   ├── index.astro          → HomePage
│   │   ├── contact.astro        → ContactPage
│   │   ├── 404.astro            # 404 bilingüe (client-side)
│   │   ├── projects/
│   │   │   ├── index.astro      → ProjectsPage
│   │   │   └── [slug].astro     → ProjectDetailPage
│   │   └── es/                  # /es/, /es/contacto, /es/proyectos, ...
│   ├── styles/
│   │   └── global.css       # Tailwind + tema (remapeo de color) + reduced-motion
│   ├── utils/
│   │   └── contact.ts       # waLink() para los enlaces de WhatsApp
│   └── types/
│       └── index.ts         # Tipos (SiteConfig, ServiceKey, SEOProps)
├── astro.config.mjs
├── vercel.json              # Deploy + redirects 308 de las URLs viejas
└── package.json
```

**Nota de arquitectura:** los archivos en `src/pages/**` son wrappers de ~5 líneas; el contenido real vive en `src/components/pages/{HomePage,ProjectsPage,ProjectDetailPage,ContactPage}.astro`, que detectan el idioma desde la URL. Así una sola implementación sirve a ambos idiomas.

## 📋 Comandos

Este proyecto usa **npm** (hay `package-lock.json`).

| Comando          | Acción                                                        |
|:-----------------|:--------------------------------------------------------------|
| `npm install`    | Instalar dependencias                                         |
| `npm run dev`    | Servidor de desarrollo en `localhost:4321`                    |
| `npm run build`  | Verifica tipos (`astro check`) y compila a `./dist/`          |
| `npm run preview`| Vista previa local del build de producción                   |

> `npm run build` corre `astro check` antes de compilar: un error de tipos o de schema de contenido **detiene el build** (y el deploy en Vercel).

## 🌐 Internacionalización (i18n)

- Todos los textos visibles viven en [`src/i18n/ui.ts`](src/i18n/ui.ts), un diccionario por idioma. Para cambiar un texto, edítalo ahí (en las dos claves `en` y `es`).
- Las rutas por idioma están en [`src/i18n/routes.ts`](src/i18n/routes.ts). Usa `localizePath("contact", lang)` para enlaces internos y nunca escribas rutas a mano.
- El inglés no lleva prefijo (`/projects`, `/contact`); el español va bajo `/es/` con slugs en español (`/es/proyectos`, `/es/contacto`). Los redirects de las URLs antiguas están en `vercel.json`.

## 🎨 Personalización

**Información del negocio** — [`src/config/site.ts`](src/config/site.ts): nombre, `author.phone` (objeto `{ e164, display }`), email, áreas de servicio y `serviceTypes` (claves; sus etiquetas visibles están en `ui.ts` como `service.*`).

**Agregar un proyecto** — ver [`GUIA_PROYECTOS.md`](GUIA_PROYECTOS.md).

**Iconos / vista previa social** — se generan a partir del logo (ver [`GUIA_PROYECTOS.md`](GUIA_PROYECTOS.md#iconos-y-og-image)).

## 🚢 Despliegue (Vercel)

El proyecto está configurado para **Vercel** ([`vercel.json`](vercel.json)): build `npm run build`, salida `dist`, `trailingSlash: true` y redirects 308 de las URLs en español antiguas (`/proyectos → /projects/`, `/contacto → /contact/`).

1. Haz push a GitHub → Vercel despliega automáticamente en cada push a `master`.
2. El dominio primario es `www.estrellabrotherscarpentry.com` (el apex redirige a `www`).

> Otros hosts estáticos también sirven el `dist/`, pero perderían los redirects de `vercel.json`; habría que reconfigurarlos en el host.

## 🔧 Stack

- **Framework:** Astro 5 (salida estática, 0 kB de JS por defecto)
- **Estilos:** Tailwind CSS 4 (con modo oscuro por clase y un remapeo de color a tonos ámbar/piedra en `global.css`)
- **Lenguaje:** TypeScript (strict)
- **Imágenes:** `astro:assets` + Sharp (WebP responsivo)
- **SEO:** `@astrojs/sitemap`, hreflang y Schema.org por idioma
- **Interactividad:** Web Components (`img-comparison-slider` para antes/después)
- **Dev:** `astro-mcp` (solo en desarrollo)

## 📱 Características

✅ Bilingüe EN/ES con hreflang y metadatos por idioma
✅ Modo oscuro con preferencia del sistema y toggle
✅ Optimización automática de imágenes (WebP responsivo)
✅ Slider "Antes y Después" para proyectos (opcional por proyecto)
✅ Contacto por WhatsApp, llamada y formulario de correo, con botón flotante
✅ Analítica: Vercel Web Analytics + Speed Insights (activar en el dashboard del proyecto)
✅ SEO local para Phoenix, AZ; 100% estático
✅ Accesibilidad: skip link, focus visible, `prefers-reduced-motion`, áreas táctiles ≥44px

## 📚 Documentación

- [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) — puesta en marcha rápida
- [`GUIA_PROYECTOS.md`](GUIA_PROYECTOS.md) — cómo agregar proyectos e imágenes
- [`Documentación Técnica.md`](Documentación%20Técnica.md) — arquitectura
- [`AUDITORIA.md`](AUDITORIA.md) — hallazgos de auditoría y su estado
