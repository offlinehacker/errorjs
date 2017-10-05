import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
import json from 'rollup-plugin-json';
const pkg = require("./package.json")
const camelCase = require("lodash.camelcase")

const libraryName = "errorjs"

export default {
  input: `compiled/${libraryName}.js`,
  output: [
    { file: pkg.main + '.js', format: "cjs" },
    { file: pkg.main + '.mjs', format: 'es'},
    { file: pkg.module, format: "es" },
    { file: pkg.browser, name: camelCase(libraryName), format: "umd" }
  ],
  sourcemap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "compiled/**"
  },
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),

    json()
  ],
  interop: false
}
