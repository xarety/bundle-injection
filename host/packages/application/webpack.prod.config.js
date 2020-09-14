const { merge } = require('webpack-merge');
const { createWebpackConfig } = require('@servicetitan/startup');

const common = require('./webpack.common.config.js');

module.exports = createWebpackConfig({
    configuration: merge(common, {
        mode: 'production',
    }),
    plugins: {
        MiniCssExtractPlugin: {
            filename: '[name].[contenthash:8].bundle.css',
            chunkFilename: '[name].[contenthash:8].bundle.css',
        },
    },
});
