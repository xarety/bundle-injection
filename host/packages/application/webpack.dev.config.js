const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { createWebpackConfig } = require('@servicetitan/startup');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.config.js');

const config = createWebpackConfig({
    configuration: merge(common, {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /design-system.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].bundle.css',
                chunkFilename: '[name].[contenthash:8].bundle.css',
            }),
        ],
    }),
});

const rule = config.module.rules.find(({ test }) => test.toString() === /(\.css)$/.toString());

const originExclude = rule.exclude;
rule.exclude = path => originExclude.test(path) || /design-system.css$/.test(path);

module.exports = config;
