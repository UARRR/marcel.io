import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// import sanitizeHtml from "sanitize-html";
// import MarkdownIt from "markdown-it";
// const parser = new MarkdownIt();

export async function GET(context) {
  const books = await getCollection("books");

  return rss({
    title: "Library / marcel.io",
    description: "Opinions on books",
    site: context.site,
    items: books.map((book) => ({
      title: book.data.title,
      pubDate: book.data.dateRead,
      link: `/library/${book.slug}/`,
      content: sanitizeHtml(parser.render(book.body)),
      ...book.data,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "rss.xsl",
  });
}
