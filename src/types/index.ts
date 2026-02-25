import type { ImageMetadata } from 'astro';

export interface Project {
    title: string;
    date: Date;
    category: 'Framing' | 'Remodelación' | 'Deck' | 'Custom' | 'Acabados';
    location: string;
    description: string;
    coverImage: ImageMetadata;
    beforeImage?: ImageMetadata;
    afterImage?: ImageMetadata;
    featured?: boolean;
    tags?: string[];
}

export interface SiteConfig {
    name: string;
    title: string;
    description: string;
    url: string;
    locale: string;
    author: {
        name: string;
        phone: string;
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
