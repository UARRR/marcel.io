import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");
  const shorts = await getCollection("shorts");

  // Combine the posts and shorts into a single array and sort them by publication date.
  const combinedItems = [...posts, ...shorts].sort((a, b) => {
    return new Date(b.data.timestamp) - new Date(a.data.timestamp);
  });

  // Map the combined items to the RSS format.
  return rss({
    title: "marcel.io",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site,
    items: combinedItems.map((item) => ({
      title: item.data.title || item.data.timestamp.toDateString(),
      pubDate: item.data.timestamp,
      link: `/blog/${item.slug}/`,
      content: sanitizeHtml(parser.render(item.body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
