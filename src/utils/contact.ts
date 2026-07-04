import { siteConfig } from '../config/site';

// wa.me espera el número internacional completo sin '+' ni separadores
const whatsappNumber = siteConfig.author.phone.e164.replace('+', '');

export function waLink(message?: string): string {
    const base = `https://wa.me/${whatsappNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
