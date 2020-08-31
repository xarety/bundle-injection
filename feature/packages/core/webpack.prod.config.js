module.exports = {
    mode: 'production',
    entry: './dist/index.js',
    output: {
        libraryTarget: 'commonjs-module',
        filename: './bundle/index.js',
    },
};
