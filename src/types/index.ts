export interface SiteConfig {
    name: string;
    title: string;
    description: string;
    url: string;
    locale: string;
    author: {
        name: string;
        phone: {
            /** Formato E.164, p.ej. '+14805146765' — para tel: y wa.me */
            e164: string;
            /** Formato legible para mostrar en la UI */
            display: string;
        };
        email: string;
    };
    business: {
        location: string;
        areaServed: string[];
        serviceTypes: string[];
    };
}

export interface SEOProps {
    title: string;
    description: string;
    image?: string;
    article?: boolean;
    noindex?: boolean;
    type?: 'website' | 'article' | 'profile';
}
