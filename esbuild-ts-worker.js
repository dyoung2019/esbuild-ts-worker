// snowpack-worker.js
const fs = require('fs')
const esBuild = require('esbuild')
const path = require('path')

const getToMinify = (config) => {
  return config
    && config.optimize
    && config.optimize.minify
    || false
}

const getBuildRoot = (config) => {
  return config.buildOptions.out
}

const generateOutfile = (root, fileName) => {
  // const base = path.basename(fileName,'.ts')
  // const folderDir = path.dirname(fileName)
  return path.join(root, fileName)
}

module.exports = function (snowpackConfig, pluginOptions) {
  let buildRoot = getBuildRoot(snowpackConfig)
  let toMinify = getToMinify(snowpackConfig)

  return {
    name: 'esbuild-ts-worker',
    // resolve: {
    //   input: ['.worker.ts'],
    //   output: ['.js'],
    // },
    knownEntrypoints: [
      "esbuild",
      "typescript"
    ],
    async config(spConfig) {
      // modify or read from the Snowpack configuration object
      buildRoot = getBuildRoot(spConfig)
      toMinify = getToMinify(spConfig)
    },
    async run(options) {
      const filePath = pluginOptions.entrypoint
      const outfile = pluginOptions.outfile

      const tsconfig = pluginOptions.tsconfig || './tsconfig.json'

      const workerFile = generateOutfile(buildRoot, outfile)

      const buildOutput = esBuild.buildSync({
        entryPoints: [filePath],
        bundle: true,
        write: true,
        platform: 'node',
        tsconfig: tsconfig,
        resolveExtensions: ['.ts', '.js', '.mjs'],
        minify: toMinify,
        outfile: workerFile
      });

      return

      // const fileContents = fs.readFileSync(outfile)
      // return {
      //   '.worker.js': {code: fileContents},
      // }
    },
    // async transform({id, contents, isDev, fileExt, srcPath}) {
    //   // console.log(id)
    //   if (srcPath.endsWith('.worker.ts')) {
    //     return
    //   }
    // },
  };
};
