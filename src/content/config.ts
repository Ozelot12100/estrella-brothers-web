import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        category: z.enum(['Framing', 'Remodelación', 'Deck', 'Custom', 'Acabados']),
        location: z.string(),
        description: z.string(),
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
