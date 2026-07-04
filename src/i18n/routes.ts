import { ui } from './ui';

export type Lang = keyof typeof ui;

export type RouteKey = 'home' | 'projects' | 'contact';

/**
 * Única fuente de verdad para las rutas del sitio por idioma.
 * La consumen los enlaces internos, el selector de idioma y los hreflang.
 */
export const routes: Record<RouteKey, Record<Lang, string>> = {
    home: { en: '/', es: '/es/' },
    projects: { en: '/proyectos', es: '/es/proyectos' },
    contact: { en: '/contacto', es: '/es/contacto' },
};

/** URL de una sección en el idioma dado, con sub-path opcional (p.ej. slug de proyecto). */
export function localizePath(key: RouteKey, lang: Lang, subPath?: string): string {
    const base = routes[key][lang];
    if (!subPath) return base;
    return `${base.replace(/\/$/, '')}/${subPath.replace(/^\//, '')}`;
}

const stripTrailingSlash = (p: string) =>
    p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;

/**
 * Traduce un pathname al idioma destino usando el route map; el resto del
 * path (p.ej. el slug) se conserva tal cual porque es idéntico en ambos idiomas.
 */
export function translatePath(pathname: string, targetLang: Lang): string {
    const current = stripTrailingSlash(pathname);

    for (const key of Object.keys(routes) as RouteKey[]) {
        for (const lang of Object.keys(routes[key]) as Lang[]) {
            const base = stripTrailingSlash(routes[key][lang]);
            if (current === base || (base === '' && current === '/')) {
                return routes[key][targetLang];
            }
            if (base !== '' && base !== '/' && current.startsWith(`${base}/`)) {
                return localizePath(key, targetLang, current.slice(base.length + 1));
            }
        }
    }

    // Ruta fuera del map (p.ej. 404): swap simple del prefijo /es
    const withoutLang = current.startsWith('/es/') || current === '/es'
        ? current.slice(3) || '/'
        : current;
    return targetLang === 'es' ? `/es${withoutLang === '/' ? '/' : withoutLang}` : withoutLang || '/';
}
