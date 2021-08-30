# esbuild-ts-worker

Snowpack plugin for build web worker script bundles using typescript, ES6 & import

> typescript, ES6, import, web worker, snowpack, esbuild, bundle, js

## HOWTO

1. snowpack.config.js

```js
// Snowpack Configuration File

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    [
      './esbuild-ts-worker.js',
      {
        entrypoint: "./src/my.worker.ts",
        tsconfig: 'tsconfig.json',
        outfile: "worker.js",
      }
    ],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};

```