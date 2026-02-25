# **Documentación Técnica: Portafolio de Carpintería "Luis Estrella"**

## **1\. Visión General del Proyecto**

Desarrollo de un sitio web tipo portafolio para un carpintero especializado en Framing y Remodelaciones en el área de Phoenix, Arizona.

* **Administrador:** Desarrollador (Gestión total del contenido).  
* **Cliente Final:** Usuario sin conocimientos técnicos (envía fotos por WhatsApp/Email).  
* **Público Objetivo:** Propietarios de viviendas en Phoenix, Scottsdale, Mesa, Tempe y alrededores.  
* **Objetivo Principal:** Mostrar la calidad del trabajo mediante comparativas visuales "Antes y Después" para generar leads (llamadas/contactos).

## **2\. Arquitectura de Software**

Se utiliza una arquitectura **Jamstack** basada en **SSG (Static Site Generation)**.

### **Flujo de Datos**

1. **Ingesta:** Fotos crudas \-\> Procesamiento Local (Redimensión) \-\> src/assets.  
2. **Contenido:** Datos del proyecto (Título, Ubicación, Descripción) \-\> Archivos Markdown en src/content.  
3. **Build:** Astro compila todo en HTML/CSS/JS estático.  
4. **Despliegue:** GitHub \-\> Vercel/Netlify \-\> CDN Global (Cloudflare).

### **Ventajas de esta Arquitectura**

* **Rendimiento:** Carga casi instantánea (HTML puro pre-renderizado). Vital para SEO y usuarios móviles (3G/4G).  
* **Seguridad:** Sin base de datos ni servidor backend expuesto a ataques.  
* **Costo:** Hospedaje gratuito en capas "Hobby" de Vercel/Netlify.

## **3\. Stack Tecnológico**

| Herramienta | Versión / Tipo | Justificación |
| :---- | :---- | :---- |
| **Astro** | v5.x | Framework principal. Envía 0kB de JS al cliente por defecto. Optimización de imágenes nativa. |
| **TypeScript** | Strict Mode | Tipado estático para evitar errores en producción y mejorar la DX (Developer Experience). |
| **Tailwind CSS** | v4.x | Estilado rápido basado en utilidades. Integración nativa con Astro. |
| **pnpm** | Package Manager | Más rápido y eficiente con el espacio en disco que npm. |
| **Astro Assets** | Built-in | Convierte imágenes a WebP/AVIF automáticamente y genera srcset para móviles. |
| **Web Components** | img-comparison-slider | Para el slider "Antes/Después" sin necesidad de React/Vue pesado. |

## **4\. Estrategia de Gestión de Imágenes (Crítico)**

Las imágenes originales (4032x3024, \~12MP) son demasiado pesadas para el repositorio.

### **Protocolo de Procesamiento**

1. **Recepción:** Descargar fotos del carpintero.  
2. **Redimensión Masiva (Batch Resize):**  
   * **Herramienta:** Microsoft PowerToys o BulkResizePhotos.  
   * **Configuración:** Fit a **1920px de ancho** (Full HD).  
   * **Formato:** JPG (Calidad 80-85%).  
3. **Renombrado SEO:**  
   * Renombrar archivos describiendo el contenido y ubicación.  
   * *Ejemplo:* remodelacion-cocina-scottsdale-antes.jpg  
4. **Ubicación:** Mover a src/assets/projects.

## **5\. Estructura de Directorios**

Organización del código fuente en src/:  
src/  
├── assets/  
│   └── projects/          \# Imágenes procesadas y renombradas  
├── components/  
│   ├── common/            \# Header, Footer, SEOHead  
│   ├── projects/          \# ProjectCard, BeforeAfterSlider  
│   └── ui/                \# Botones, Badges, Elementos UI  
├── content/  
│   ├── config.ts          \# Esquema de datos (Zod) para validación  
│   └── projects/          \# Archivos .md/.mdx (Uno por trabajo)  
├── layouts/  
│   └── Layout.astro       \# Plantilla base HTML (\<html\>...\</html\>)  
└── pages/  
    ├── index.astro        \# Home (Hero, Servicios, Destacados)  
    ├── contacto.astro     \# Formulario y Mapa  
    └── proyectos/  
        ├── index.astro    \# Galería principal con filtros  
        └── \[slug\].astro   \# Plantilla dinámica de detalle de proyecto  
