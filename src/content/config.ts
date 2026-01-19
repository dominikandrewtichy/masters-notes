import { defineCollection, z } from "astro:content";

const topics = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().min(1).max(11),
    tags: z.array(z.string()).optional().default([]),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = {
  topics,
};
