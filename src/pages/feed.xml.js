import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");
  const shorts = await getCollection("shorts");
  const books = await getCollection("books");

  // Combine the posts and shorts into a single array and sort them by publication date.
  const combinedItems = [...posts, ...shorts, ...books].sort((a, b) => {
    return new Date(b.data.timestamp) - new Date(a.data.timestamp);
  });

  // Map the combined items to the RSS format.
  return rss({
    title: "marcel.io",
    description: "Design, code & some of the things in between",
    site: context.site,
    items: combinedItems.map((item) => {
      // Default values for missing keys
      const title = item.data.title || item.data.timestamp.toDateString();

      const pubDate = item.data.timestamp
        ? new Date(item.data.timestamp)
        : new Date();

      const linkPrefix =
        item.collection === "posts"
          ? "/posts/"
          : item.collection === "shorts"
          ? "/shorts/"
          : item.collection === "books"
          ? "/library/"
          : "/unknown/";

      const link = `${linkPrefix}${item.slug}/`;

      return {
        title,
        pubDate,
        link,
        content: sanitizeHtml(parser.render(item.body || "")),
      };
    }),
    customData: `<language>en-us</language>`,
    stylesheet: "rss.xsl",
  });
}
