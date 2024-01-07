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
  const posts = await getCollection("posts");
  const shorts = await getCollection("shorts");
  const books = await getCollection("books");

  // Combine the posts, shorts, and books into a single array and sort them by publication date.
  const combinedItems = [...posts, ...shorts, ...books].sort((a, b) => {
    // Use 'data.timestamp' for posts and shorts, 'data.dateRead' for books
    const dateA =
      a.collection === "books"
        ? new Date(a.data.dateRead)
        : new Date(a.data.timestamp);
    const dateB =
      b.collection === "books"
        ? new Date(b.data.dateRead)
        : new Date(b.data.timestamp);
    return dateB - dateA;
  });

  // Map the combined items to the RSS format.
  return rss({
    title: "marcel.io",
    description: "Design, code & some of the things in between",
    site: context.site,
    items: combinedItems.map((item) => {
      const title =
        item.data.title ||
        (item.collection === "books"
          ? item.data.dateRead.toDateString()
          : item.data.timestamp.toDateString());

      // Determine the publication date based on the collection type
      const pubDate =
        item.collection === "books"
          ? new Date(item.data.dateRead)
          : new Date(item.data.timestamp);

      const linkPrefix =
        item.collection === "posts"
          ? "/posts/"
          : item.collection === "shorts"
          ? "/shorts/"
          : item.collection === "books"
          ? "/library/"
          : "/unknown/";

      const link = `${linkPrefix}${item.slug}/`;

      // Append star rating for books
      let content = sanitizeHtml(parser.render(item.body || ""));
      if (item.collection === "books" && item.data.rating) {
        const starRating = generateStarRating(item.data.rating);
        content += `<br>Rating: ${starRating}`;
      }

      return {
        title,
        pubDate,
        link,
        content,
      };
    }),
    customData: `<language>en-us</language>`,
    // stylesheet: "rss.xsl",
  });
}
