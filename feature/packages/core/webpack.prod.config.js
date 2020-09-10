const path = require('path');
const webpack = require('webpack');
const { createWebpackConfig } = require('@servicetitan/startup');

// will be one of createWebpackConfig presets
module.exports = createWebpackConfig({
    configuration: {
        mode: 'production',
        output: {
            path: path.resolve(process.cwd(), `dist/bundle/${process.env.BUNDLE_TYPE}`),
            filename: 'index.js',
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new webpack.DefinePlugin({
                BUNDLE_TYPE: JSON.stringify(process.env.BUNDLE_TYPE),
            }),
        ],
        externals:
            process.env.BUNDLE_TYPE === 'light'
                ? {
                      '@servicetitan/design-system': 'ServiceTitan.DesignSystem',
                      '@servicetitan/link-item': 'ServiceTitan.LinkItem',
                      'react': 'React',
                      'react-dom': 'ReactDOM',
                      'react-router-dom': 'ReactRouterDOM',
                  }
                : undefined,
    },
    plugins: {
        MiniCssExtractPlugin: {
            filename: 'index.css',
        },
    },
});
