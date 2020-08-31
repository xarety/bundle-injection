const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const globals = require('rollup-plugin-node-globals');
const builtins = require('rollup-plugin-node-builtins');

module.exports = {
    input: './dist/index.js',
    output: {
        dir: 'dist/bundle',
        format: 'es',
    },
    plugins: [commonjs(), nodeResolve(), globals(), builtins()],
};
