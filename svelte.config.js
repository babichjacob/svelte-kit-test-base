import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
    paths: {
      base: "/blog/me",
    },

    trailingSlash: "always",
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
