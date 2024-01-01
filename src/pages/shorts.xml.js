import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const shorts = await getCollection("shorts");

  return rss({
    title: "marcel.io",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site,
    items: shorts.map((short) => ({
      title: short.data.timestamp.toDateString(),
      pubDate: short.data.timestamp,
      link: `/blog/${short.slug}/`,
      content: sanitizeHtml(parser.render(short.body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
