# Inicio rápido

Sitio de **Estrella Brothers Carpentry** (Astro 5 + Tailwind 4, bilingüe EN/ES). Ya está configurado; estos son los pasos para trabajar en él.

## Paso 1: Instalar dependencias

Este proyecto usa **npm**:

```bash
npm install
```

## Paso 2: Desarrollo local

```bash
npm run dev
```

Abre http://localhost:4321.

## Paso 3: Editar los textos

Todo el texto visible del sitio vive en [`src/i18n/ui.ts`](src/i18n/ui.ts), con una clave en `en` y otra en `es`. Edita ahí (ambos idiomas) en lugar de tocar los componentes.

## Paso 4: Datos del negocio

Edita [`src/config/site.ts`](src/config/site.ts):

```typescript
export const siteConfig: SiteConfig = {
  name: 'Estrella Brothers',
  url: 'https://www.estrellabrotherscarpentry.com',
  author: {
    name: 'Luis Estrella',
    phone: {
      e164: '+14805146765',       // ← para tel: y WhatsApp (sin espacios)
      display: '+1 (480) 514-6765', // ← como se muestra en pantalla
    },
    email: 'tu@email.com',
  },
  business: {
    location: 'Phoenix, Arizona',
    areaServed: ['Phoenix', 'Scottsdale', 'Mesa', 'Tempe', 'Chandler', 'Gilbert'],
    // Claves de servicio; sus etiquetas visibles están en ui.ts (service.*)
    serviceTypes: ['framing', 'remodeling', 'decks', 'carpentry', 'finishes', 'woodrot'],
  },
};
```

> El teléfono es un objeto `{ e164, display }`, no un string. `e164` alimenta los enlaces `tel:` y `wa.me`; `display` es lo que ve el usuario.

## Paso 5: Agregar proyectos

Cada proyecto es un `.md` en `src/content/projects/` con imágenes en `src/assets/projects/`. La guía completa (plantilla, campos bilingües y **categorías válidas**) está en [`GUIA_PROYECTOS.md`](GUIA_PROYECTOS.md).

## Paso 6: Build y deploy

```bash
npm run build    # verifica tipos + compila a dist/
npm run preview  # vista previa local del build
```

El deploy es automático en **Vercel** con cada push a `master` (ver [`vercel.json`](vercel.json)).

## Problemas comunes

**`category: Invalid enum value` / falla `astro check`**
El valor de `category` debe ser uno de: `Framing, Deck, Carpentry, Patio, Roofing, Interior, Addition, Repair` (ver [GUIA_PROYECTOS.md](GUIA_PROYECTOS.md#4-categorías-válidas)).

**`coverImage: Required` o error de imagen**
Revisa que la ruta relativa sea correcta (`../../assets/projects/imagen.webp`) y que el archivo exista (los nombres distinguen mayúsculas/minúsculas).

**Un enlace interno lleva al idioma equivocado**
No escribas rutas a mano; usa `localizePath("contact", lang)` de [`src/i18n/routes.ts`](src/i18n/routes.ts).
