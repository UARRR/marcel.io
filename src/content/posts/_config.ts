import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    timestamp: z.date(),
    tags: z.array(z.string()),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
