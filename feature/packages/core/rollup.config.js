const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const globals = require('rollup-plugin-node-globals');
const builtins = require('rollup-plugin-node-builtins');
const postcss = require('rollup-plugin-postcss');

module.exports = {
    input: './dist/index.js',
    context: 'window',
    output: {
        dir: 'dist/bundle',
        format: 'es',
    },
    plugins: [
        commonjs(),
        nodeResolve({
            preferBuiltins: true,
        }),
        globals(),
        builtins(),
        postcss(),
    ],
};
