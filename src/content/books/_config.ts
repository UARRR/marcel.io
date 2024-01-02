import { z, defineCollection } from "astro:content";

const booksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    author: z.array(z.string()),
    rating: z.number(),
    genre: z.array(z.string()),
    dateRead: z.date(),
    isbn: z.string(),
    allTimeFav: z.boolean(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  books: booksCollection,
};
