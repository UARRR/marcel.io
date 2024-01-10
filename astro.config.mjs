import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://marcel.io",
  integrations: [icon(), mdx()],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "monokai",
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  // redirects: {
  //   "/feed": {
  //     status: 302,
  //     destination: "/feed.xml",
  //   },
  // },
  image: {
    domains: ["covers.openlibrary.org"],
  },
  build: {
    rollupOptions: {
      external: ["markdown-it", "sanitize-html"],
    },
  },
  output: "server",
  adapter: vercel(),
});
