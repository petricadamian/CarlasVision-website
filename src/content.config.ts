import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const proiecte = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proiecte" }),
  schema: z.object({
    titlu: z.string(),
    title: z.string(),
    descriere: z.string(),
    description: z.string(),
    data: z.date(),
    imagine: z.string().optional(),
    beneficiari: z.number(),
    locatie: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { proiecte };
