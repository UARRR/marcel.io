import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const shorts = await getCollection("shorts");

  return rss({
    title: "Shorts / marcel.io",
    description: "Hot takes, brainfarts and shower thoughts",
    site: context.site,
    items: shorts.map((short) => ({
      title: short.data.timestamp.toDateString(),
      pubDate: short.data.timestamp,
      link: `/shorts/${short.slug}/`,
      content: sanitizeHtml(parser.render(short.body)),
      ...short.data,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "rss.xsl",
  });
}
