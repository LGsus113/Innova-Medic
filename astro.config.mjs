// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({
      compat: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      jsxInject: `import { h } from 'preact'`,
    },
    resolve: {
      alias: {
        react: "@preact/compat",
        "react-dom": "@preact/compat",
        "react-dom/test-utils": "@preact/test-utils",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
  },
});
