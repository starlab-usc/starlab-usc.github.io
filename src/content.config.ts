import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './assets/news' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.iso.date(),
    summary: z.string().min(1),
  }),
});

export const collections = { news };
