import { z, defineCollection } from "astro:content";

const shortsCollection = defineCollection({
  type: "content",
  schema: z.object({
    timestamp: z.date(),
    tags: z.array(z.string()),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  shorts: shortsCollection,
};
