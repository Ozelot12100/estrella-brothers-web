# Carpeta de Assets

Esta carpeta contiene todos los assets estáticos del proyecto (imágenes, íconos, etc.)

## Subdirectorios

- `projects/` - Imágenes de proyectos de carpintería
- Puedes agregar más carpetas según necesites (ej: `logos/`, `team/`, etc.)

## Uso con Astro

Las imágenes aquí se importan de la siguiente manera en componentes .astro:

```astro
---
import { Image } from 'astro:assets';
import miImagen from '../assets/projects/ejemplo.jpg';
---

<Image src={miImagen} alt="Descripción" />
```

Astro se encarga automáticamente de:
- Optimización de imágenes
- Conversión a WebP/AVIF
- Generación de srcset responsivo
- Lazy loading
