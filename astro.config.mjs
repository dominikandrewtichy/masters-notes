// @ts-check
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dominikandrewtichy.github.io",
  base: "/final-exam-notes",
  integrations: [mdx()],
});
