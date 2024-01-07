import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

// Function to generate star ratings
function generateStarRating(rating) {
  const filledStars = "★".repeat(rating);
  const unfilledStars = "☆".repeat(5 - rating);
  return filledStars + unfilledStars;
}

export async function GET(context) {
  const books = await getCollection("books");

  return rss({
    title: "Library / marcel.io",
    description: "Opinions on books",
    site: context.site,
    items: books.map((book) => {
      // Generate star rating string
      const starRating = generateStarRating(book.data.rating);

      return {
        title: book.data.title,
        pubDate: new Date(book.data.dateRead),
        link: `/library/${book.slug}/`,
        content: sanitizeHtml(
          parser.render(book.body || "") + `<br><br>Rating: ${starRating}`
        ),
      };
    }),
    customData: `<language>en-us</language>`,
    stylesheet: "rss.xsl",
  });
}
