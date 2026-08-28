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
    location: z.string(),
    salaryType: z.enum(['時給', '日給', '月給']),
    salaryAmount: z.number(),
    japaneseSpeaking: z.string().optional().default('問わない'),
    japaneseReading: z.string().optional().default('問わない'),
    japaneseWriting: z.string().optional().default('問わない'),
    japaneseJlpt: z.string().optional().default('問わない'),
    image: z.string().optional(),
    datePosted: z.date(),
    validThrough: z.date().optional(),
  }),
});

export const collections = {
  'jobs': jobsCollection,
};
