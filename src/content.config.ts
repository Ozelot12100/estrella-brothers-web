import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        titleEs: z.string().optional(),
        date: z.date(),
        category: z.enum(['Framing', 'Deck', 'Carpentry', 'Patio', 'Roofing', 'Interior', 'Addition', 'Repair']),
        location: z.string(),
        description: z.string(),
        descriptionEs: z.string().optional(),
        coverImage: image(),
        beforeImage: image().optional(),
        afterImage: image().optional(),
        featured: z.boolean().default(false),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
};
