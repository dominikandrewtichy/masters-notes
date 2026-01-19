// @ts-check
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://dominikandrewtichy.github.io",
  base: "final-exam-notes",
  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
