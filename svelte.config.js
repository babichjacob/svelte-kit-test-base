import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

import { mkdir, readdir, rename, } from "fs/promises";

const build = "build";
const base = "/blog/me";
const output = `${build}${base}`;
const root = base.split("/")[1];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: {
      name: "custom-static-adapter",
      adapt: async (utils) => {
        await adapter({
          assets: build,
          pages: build,
          fallback: "404.html",
        }).adapt(utils);

        await mkdir(output, {
          recursive: true,
        });

        for (const file of await readdir(build)) {
          if (file === root) continue;
          await rename(`${build}/${file}`, `${output}/${file}`);
        }

      },
    },
    paths: {
      base,
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
