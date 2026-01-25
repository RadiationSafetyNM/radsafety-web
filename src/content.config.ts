import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
    }),
});

const inspection = defineCollection({
    type: 'content',
    schema: z.object({
        category: z.string(),
        title: z.string(),
        importance: z.enum(['필수', '권장']),
        order: z.number().default(99),
        example: z.string().optional(), // Description or text content of the example
        exampleImage: z.string().optional(), // Path to an example image
    }),
});

const findings = defineCollection({
    type: 'content',
    schema: z.object({
        category: z.string(), // Should match inspection category
        title: z.string(),
        description: z.string(),
        violationClause: z.string().optional(),
        solution: z.string().optional(),
    }),
});

export const collections = { inspection, findings };
