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
                      '@servicetitan/design-system': 'commonjs @servicetitan/design-system',
                      '@servicetitan/link-item': 'commonjs @servicetitan/link-item',
                      'react': 'react',
                      'react-dom': 'react-dom',
                      'react-router-dom': 'react-router-dom',
                  }
                : undefined,
    },
    plugins: {
        MiniCssExtractPlugin: {
            filename: 'index.css',
        },
    },
});
