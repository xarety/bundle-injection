const webpack = require('webpack');
const { createWebpackConfig } = require('@servicetitan/startup');

// will be one of createWebpackConfig presets
module.exports = createWebpackConfig({
    configuration: {
        mode: 'production',
        output: {
            filename: 'index.js',
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
    },
    plugins: {
        MiniCssExtractPlugin: {
            filename: 'index.css',
        },
    },
});
