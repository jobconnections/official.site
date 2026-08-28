// @ts-nocheck
import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const stringOrEmpty = z.string().optional().nullable().transform(v => v ?? '');
const numberOrNull = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
}, z.number().optional().nullable());
const dateOrEmpty = z.preprocess((val) => {
  if (!val || val === '' || val === null) return undefined;
  return new Date(val as string);
}, z.date().optional().nullable());

const jobsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
  schema: z.object({
    companyName: z.string().default(''),
    title: z.string().default(''),
    status: z.enum(['published', 'draft', 'closed']).default('draft'),
    jobCategory: z.string().optional().nullable(),
    employmentType: z.union([z.array(z.string()), z.string()]).transform(v => Array.isArray(v) ? v : (v ? [v] : ['派遣社員'])),
    jobDescription: z.string().default(''),
    jobAppeal: stringOrEmpty,
    targetCandidates: stringOrEmpty,
    jobFeatures: z.union([z.array(z.string()), z.string()]).optional().nullable().transform(v => Array.isArray(v) ? v : (v ? [v] : [])),
    prefecture: z.string().default('三重県'),
    locationDetail: stringOrEmpty,
    transportationNotes: stringOrEmpty,
    salaryType: z.enum(['時給', '日給', '月給']).default('時給'),
    salaryAmount: z.preprocess((val) => {
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    }, z.number().default(0)),
    salaryUpperLimit: numberOrNull,
    benefits: stringOrEmpty,
    workingHours: stringOrEmpty,
    japaneseSpeaking: z.string().optional().nullable().default('問わない'),
    japaneseReading: z.string().optional().nullable().default('問わない'),
    japaneseWriting: z.string().optional().nullable().default('問わない'),
    japaneseJlpt: z.string().optional().nullable().default('問わない'),
    requiredInfo: z.string().optional().nullable().default('氏名・連絡先のみ'),
    requirePhone: z.boolean().optional().nullable().default(false),
    applicationPhone: stringOrEmpty,
    selectionProcess: stringOrEmpty,
    image: stringOrEmpty,
    datePosted: z.preprocess((val) => {
      if (!val) return new Date();
      return new Date(val as string);
    }, z.date()),
    validThrough: dateOrEmpty,
  }),
});

export const collections = {
  'jobs': jobsCollection,
};
