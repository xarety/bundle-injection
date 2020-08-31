module.exports = {
    mode: 'production',
    entry: './dist/index.js',
    output: {
        library: 'Feature',
        libraryTarget: 'umd',
        filename: './bundle/index.js',
    },
};
