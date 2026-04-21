// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: 'https://petricadamian.github.io/carlasvision-website',
  // if repo name is not the root domain, also add:
  base: '/carlasvision-website',
  i18n: {
    defaultLocale: "ro",
    locales: ["ro", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});