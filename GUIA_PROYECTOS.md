# Guía para agregar proyectos

Cada proyecto es un archivo Markdown en `src/content/projects/`. El mismo archivo se muestra en ambos idiomas: los campos en inglés son la base y los campos `*Es` proveen la versión en español.

## 1. Preparar las imágenes

- Las imágenes finales van en `src/assets/projects/` en formato **`.webp`** (es lo que usa el repo hoy).
- Astro las optimiza y genera `srcset` automáticamente; no necesitas redimensionar a un ancho exacto, pero evita subir originales de 12 MP sin comprimir. Un ancho de ~1920px es suficiente.
- Usa nombres descriptivos en minúsculas con guiones, p. ej. `cocina-scottsdale-cover.webp`.

## 2. Crear el archivo Markdown

Crea `src/content/projects/mi-proyecto.md` (el nombre del archivo es el slug de la URL: `/projects/mi-proyecto` y `/es/proyectos/mi-proyecto`).

```markdown
---
title: "Custom Kitchen Remodel in Scottsdale"
titleEs: "Remodelación de Cocina en Scottsdale"
date: 2026-01-15
category: "Interior"
location: "Scottsdale, AZ"
description: "Full modern kitchen remodel with custom cabinetry and high-end finishes."
descriptionEs: "Remodelación completa de cocina moderna con gabinetes personalizados y acabados de alta calidad."
coverImage: ../../assets/projects/cocina-scottsdale-cover.webp
featured: true
tags: ["Kitchen", "Cabinets"]
---

## Project Overview

Descripción detallada del trabajo realizado. Este contenido se muestra con estilos
(`prose`) y admite encabezados, listas, etc.

### What we did
- Punto 1
- Punto 2
```

## 3. Campos del frontmatter

| Campo | Requerido | Notas |
|:------|:---------:|:------|
| `title` | ✅ | Título en inglés (base). |
| `titleEs` | opcional | Título en español; si falta, se usa `title`. |
| `date` | ✅ | Fecha `YYYY-MM-DD`. Ordena los proyectos (más reciente primero). |
| `category` | ✅ | Una de las categorías válidas (ver abajo). |
| `location` | ✅ | Ciudad, estado. P. ej. `"Mesa, AZ"`. |
| `description` | ✅ | Descripción en inglés. |
| `descriptionEs` | opcional | Descripción en español; si falta, se usa `description`. |
| `coverImage` | ✅ | Ruta relativa a `src/assets/projects/`. |
| `beforeImage` / `afterImage` | opcional | Si defines **ambas**, se muestra el slider "Antes/Después" en vez de la imagen de portada. |
| `featured` | opcional | `true` para que aparezca en la página de inicio (por defecto `false`). |
| `tags` | opcional | Lista de etiquetas cortas. |

> Las etiquetas de las categorías se traducen automáticamente al mostrarse (ver `category.*` en `src/i18n/ui.ts`); en el frontmatter siempre se escribe el valor en inglés de la lista de abajo.

## 4. Categorías válidas

El valor de `category` **debe** ser exactamente uno de estos (definido en [`src/content.config.ts`](src/content.config.ts)). Cualquier otro valor rompe el build (`astro check`):

`Framing` · `Deck` · `Carpentry` · `Patio` · `Roofing` · `Interior` · `Addition` · `Repair`

## 5. Rutas de imagen

Siempre relativas al archivo Markdown:
- ✅ Correcto: `../../assets/projects/imagen.webp`
- ❌ Incorrecto: `/src/assets/projects/imagen.webp`

## 6. Verificar

```bash
npm run build   # corre astro check; falla si una categoría o imagen es inválida
npm run preview # revisa el resultado en el navegador
```

---

## Iconos y og-image

El favicon, los iconos de app (`apple-touch-icon`, `icon-192/512`) y la imagen de vista previa social (`og-image.jpg`) se generan a partir del logo en `src/assets/logo/` con Sharp (`sharp`) y `png-to-ico`. Si cambias el logo, hay que regenerarlos y colocarlos en `public/`. Los `<link>` de iconos y las metaetiquetas Open Graph están en [`src/components/common/SEOHead.astro`](src/components/common/SEOHead.astro).
