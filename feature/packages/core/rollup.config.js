const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
    input: './dist/index.js',
    output: {
        dir: 'dist/bundle',
        format: 'es',
    },
    plugins: [commonjs(), nodeResolve()],
};
