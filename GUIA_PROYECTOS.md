# Guía de Gestión de Proyectos

## Agregar un Nuevo Proyecto

1. **Preparar las Imágenes:**
   - Redimensiona las fotos a 1920px de ancho usando PowerToys o BulkResizePhotos
   - Renómbralas con nombres descriptivos (ej: `remodelacion-cocina-scottsdale-antes.jpg`)
   - Guárdalas en `src/assets/projects/`

2. **Crear el Archivo Markdown:**
   - Crea un nuevo archivo en `src/content/projects/` con nombre en formato slug (ej: `remodelacion-cocina-scottsdale.md`)
   - Copia la plantilla de abajo

3. **Plantilla de Proyecto:**

```markdown
---
title: "Remodelación de Cocina en Scottsdale"
date: 2025-01-15
category: "Remodelación"
location: "Scottsdale, AZ"
description: "Remodelación completa de cocina moderna con gabinetes personalizados y acabados de alta calidad."
coverImage: ../../assets/projects/cocina-scottsdale-cover.jpg
beforeImage: ../../assets/projects/cocina-scottsdale-antes.jpg
afterImage: ../../assets/projects/cocina-scottsdale-despues.jpg
featured: true
tags: ["Cocina", "Moderna", "Gabinetes"]
---

## Detalles del Proyecto

Descripción detallada del trabajo realizado...

### Características Principales

- Característica 1
- Característica 2
- Característica 3
```

## Categorías Disponibles

- Framing
- Remodelación
- Deck
- Custom
- Acabados

## Marcar como Destacado

Establece `featured: true` en el frontmatter para que aparezca en la página de inicio.

## Nota Importante

Las rutas de las imágenes en el frontmatter deben ser relativas al archivo markdown:
- Correcto: `../../assets/projects/imagen.jpg`
- Incorrecto: `/src/assets/projects/imagen.jpg`
