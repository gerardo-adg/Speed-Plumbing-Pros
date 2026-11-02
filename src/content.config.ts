import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './data/categories';

const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({
    name: z.string(),
    category: z.enum(categoryIds),
    featured: z.boolean().optional(),
    short: z.string(),
    intro: z.string(),
    signs: z.array(z.string()),
    includes: z.array(z.string()),
  }),
});

const areas = defineCollection({
  loader: file('src/content/areas.json'),
  schema: z.object({
    name: z.string(),
    county: z.string(),
    order: z.number(),
    /** Unique local copy for the city page. Write this before launch to avoid thin, duplicate pages. */
    intro: z.string().optional(),
  }),
});

/**
 * Job posts ("Projects"). One Markdown file per job, written by the job-upload app.
 * Photos go in the same folder as the .md file and are optimized at build time.
 */
const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      area: reference('areas'),
      services: z.array(reference('services')).min(1),
      summary: z.string(),
      photos: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      /** Placeholder content migrated as an example; replace with the real post. */
      sample: z.boolean().default(false),
    }),
});

const reviews = defineCollection({
  loader: file('src/content/reviews.json'),
  schema: z.object({
    author: z.string(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    source: z.string(),
    label: z.string().optional(),
    service: reference('services').optional(),
    truncated: z.boolean().default(false),
  }),
});

const offers = defineCollection({
  loader: file('src/content/offers.json'),
  schema: z.object({ value: z.string(), suffix: z.string(), title: z.string(), text: z.string(), how: z.string() }),
});

const faqs = defineCollection({
  loader: file('src/content/faqs.json'),
  schema: z.object({ q: z.string(), a: z.string() }),
});

export const collections = { services, areas, jobs, reviews, offers, faqs };
