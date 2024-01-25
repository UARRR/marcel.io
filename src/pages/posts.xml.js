import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");

  return rss({
    title: "Posts / marcel.io",
    description: "Thoughts about topics",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.timestamp,
      link: `/posts/${post.slug}/`,
      // content: sanitizeHtml(parser.render(post.body)),
      // content: sanitizeHtml(parser.render(post.body)),
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      ...post.data,
    })),
    customData: `<language>en-us</language>`,
    // stylesheet: "rss.xsl",
  });
}
