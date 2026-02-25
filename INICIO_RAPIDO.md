# Inicio Rápido - Portfolio Luis Estrella

Este proyecto está completamente configurado y listo para usar. Sigue estos pasos para comenzar:

## 🚀 Paso 1: Instalar Dependencias

```bash
pnpm install
```

## 📸 Paso 2: Agregar Tus Imágenes

1. Redimensiona tus fotos a **1920px de ancho máximo** usando:
   - [PowerToys Image Resizer](https://learn.microsoft.com/en-us/windows/powertoys/) (Windows)
   - [BulkResizePhotos](https://bulkresizephotos.com/) (Online)

2. Renombra con nombres descriptivos:
   ```
   remodelacion-cocina-scottsdale-antes.jpg
   remodelacion-cocina-scottsdale-despues.jpg
   framing-casa-phoenix-cover.jpg
   ```

3. Guárdalas en: `src/assets/projects/`

## 📝 Paso 3: Crear Tu Primer Proyecto

Crea un archivo en `src/content/projects/mi-primer-proyecto.md`:

```markdown
---
title: "Remodelación de Cocina en Scottsdale"
date: 2025-02-10
category: "Remodelación"
location: "Scottsdale, AZ"
description: "Remodelación completa de cocina moderna con gabinetes personalizados."
coverImage: ../../assets/projects/cocina-cover.jpg
beforeImage: ../../assets/projects/cocina-antes.jpg
afterImage: ../../assets/projects/cocina-despues.jpg
featured: true
tags: ["Cocina", "Moderna"]
---

## Descripción del Proyecto

Aquí va la descripción detallada de tu proyecto...

### Características

- Característica 1
- Característica 2
```

**⚠️ Rutas de Imágenes:** Usa rutas relativas `../../assets/projects/nombre.jpg`

## 🎨 Paso 4: Personalizar Información

Edita `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Tu Nombre',
  title: 'Tu Título SEO',
  description: 'Tu Descripción',
  url: 'https://tu-dominio.com',
  author: {
    name: 'Tu Nombre',
    phone: '+1 (480) 000-0000',  // ← Cambia esto
    email: 'tu@email.com',       // ← Cambia esto
  },
  // ...resto de configuración
};
```

## 💻 Paso 5: Desarrollo Local

```bash
pnpm dev
```

Abre http://localhost:4321 en tu navegador.

## 🏗️ Paso 6: Build para Producción

```bash
pnpm build
pnpm preview  # Ver preview local
```

## 🚢 Paso 7: Desplegar

### Opción A: Vercel (Recomendado)

1. Push tu código a GitHub
2. Ve a [vercel.com](https://vercel.com) → "Import Project"
3. Conecta tu repositorio
4. ¡Listo! Auto-deploy en cada push

### Opción B: Netlify

1. Push tu código a GitHub
2. Ve a [netlify.com](https://netlify.com) → "Add new site"
3. Conecta tu repositorio
4. Build command: `pnpm build`
5. Publish directory: `dist`

## 📚 Recursos

- [GUIA_PROYECTOS.md](./GUIA_PROYECTOS.md) - Guía completa de proyectos
- [README.md](./README.md) - Documentación técnica completa
- [Astro Docs](https://docs.astro.build)

## ⚡ Comandos Útiles

```bash
pnpm dev          # Desarrollo
pnpm build        # Build producción
pnpm preview      # Preview del build
```

## 🆘 Problemas Comunes

**Error: "coverImage: Required"**
- Asegúrate de que la ruta de la imagen en el frontmatter sea correcta
- Usa rutas relativas: `../../assets/projects/imagen.jpg`

**Warning: "Collection projects is empty"**
- Normal si no tienes proyectos aún
- Agrega al menos un archivo .md en `src/content/projects/`

**404 en imágenes**
- Verifica que las imágenes existan en `src/assets/projects/`
- Revisa que los nombres coincidan exactamente (case-sensitive)

---

**¡Tu sitio está listo para brillar! 🌟**
