const webpack = require('webpack');

const { dependencies } = require('./package.json');

// TODO: collect a list of dependencies which can be shared
const shared = {
    'ServiceTitan.DesignSystem': '@servicetitan/design-system',
    'ServiceTitan.LinkItem': '@servicetitan/link-item',
    'React': 'react',
    'ReactDOM': 'react-dom',
    'ReactRouterDOM': 'react-router-dom',
};

module.exports = {
    entry: Object.values(shared).map(package => require.resolve(package)),
    module: {
        rules: Object.entries(shared).map(([variable, package]) => ({
            test: require.resolve(package),
            loader: 'expose-loader',
            options: {
                exposes: variable,
            },
        })),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                'design-system': {
                    test: /[\\/]node_modules[\\/]@servicetitan[\\/](tokens|anvil-fonts|design-system)[\\/].*\.css$/,
                    name: 'design-system',
                },
            },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            DEPENDENCIES: JSON.stringify(
                Object.values(shared).reduce(
                    (result, package) =>
                        Object.assign(result, { [package]: dependencies[package] }),
                    {}
                )
            ),
        }),
    ],
};
