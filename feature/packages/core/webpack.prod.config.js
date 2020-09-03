const webpack = require('webpack');
const { createWebpackConfig } = require('@servicetitan/startup');

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
        HtmlWebpackPlugin: {
            templateContent: '',
        },
        MiniCssExtractPlugin: {
            filename: 'index.css',
        },
    },
});
