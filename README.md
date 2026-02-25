# Portfolio Luis Estrella - Carpintería Profesional en Phoenix, AZ

Sitio web estático de alto rendimiento construido con Astro 5, TypeScript y Tailwind CSS para mostrar proyectos de carpintería y remodelaciones.

## 🚀 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos (favicon, robots.txt)
├── src/
│   ├── assets/
│   │   └── projects/    # Imágenes de proyectos (1920px max)
│   ├── components/
│   │   ├── common/      # Header, Footer, SEOHead
│   │   ├── projects/    # ProjectCard, BeforeAfterSlider
│   │   └── ui/          # Button, etc.
│   ├── config/
│   │   └── site.ts      # Configuración del sitio
│   ├── content/
│   │   ├── config.ts    # Schema de Content Collections
│   │   └── projects/    # Archivos .md de cada proyecto
│   ├── layouts/
│   │   └── Layout.astro # Layout base con SEO
│   ├── pages/
│   │   ├── index.astro
│   │   ├── contacto.astro
│   │   └── proyectos/
│   │       ├── index.astro    # Galería
│   │       └── [slug].astro   # Detalle del proyecto
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts     # Tipos TypeScript globales
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 📋 Comandos Disponibles

| Comando          | Acción                                      |
|:-----------------|:--------------------------------------------|
| `pnpm install`   | Instalar dependencias                       |
| `pnpm dev`       | Iniciar servidor de desarrollo en `localhost:4321` |
| `pnpm build`     | Compilar sitio para producción en `./dist/` |
| `pnpm preview`   | Vista previa del build antes de deploy      |

## 🎨 Personalización

### Información del Negocio

Edita `src/config/site.ts` para actualizar:
- Nombre del negocio
- Teléfono y email
- Áreas de servicio
- Tipos de servicios

### Agregar Proyectos

Lee la guía completa en `GUIA_PROYECTOS.md`

## 🚢 Despliegue

### Vercel (Recomendado)

1. Haz push a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura el dominio personalizado

### Netlify

1. Haz push a GitHub
2. Importa el proyecto en [Netlify](https://netlify.com)
3. Build command: `pnpm build`
4. Publish directory: `dist`

## 🔧 Stack Tecnológico

- **Framework:** Astro 5.x
- **Estilos:** Tailwind CSS v4
- **Lenguaje:** TypeScript (Strict)
- **Optimización de Imágenes:** astro:assets + Sharp
- **SEO:** @astrojs/sitemap + Schema.org
- **Interactividad:** Web Components (img-comparison-slider)

## 📱 Características

✅ Optimización automática de imágenes (WebP/AVIF)  
✅ Slider "Antes y Después" para proyectos  
✅ SEO local optimizado para Phoenix, AZ  
✅ Core Web Vitals optimizados  
✅ 100% estático (sin servidor)  
✅ Responsive design  
✅ Formulario de contacto (Netlify Forms)

## 📞 Soporte

Para dudas técnicas, consulta la documentación de:
- [Astro](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
