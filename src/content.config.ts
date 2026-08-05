// @ts-nocheck
import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const jobsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['published', 'draft']),
    employmentType: z.enum(['正社員', '派遣社員', 'アルバイト']),
    location: z.object({
      city: z.string(),
      prefecture: z.string(),
    }),
    salary: z.object({
      type: z.enum(['時給', '日給', '月給']),
      amount: z.number(),
    }),
    japaneseLevel: z.enum(['不問', 'N4以上', 'N3以上', 'N2以上', 'N1以上']),
    image: z.string().optional(),
    datePosted: z.date(),
    validThrough: z.date().optional(),
  }),
});

export const collections = {
  'jobs': jobsCollection,
};
