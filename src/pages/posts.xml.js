import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");

  return rss({
    title: "marcel.io",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.timestamp,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
