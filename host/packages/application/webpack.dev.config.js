const webpack = require('webpack');
const { createWebpackConfig } = require('@servicetitan/startup');

const { dependencies } = require('./package.json');

module.exports = createWebpackConfig({
    configuration: {
        mode: 'development',
        entry: [
            require.resolve('@servicetitan/design-system'),
            require.resolve('@servicetitan/link-item'),
            require.resolve('react'),
            require.resolve('react-dom'),
            require.resolve('react-router-dom'),
        ],
        module: {
            rules: [
                {
                    test: require.resolve('react'),
                    loader: 'expose-loader',
                    options: {
                        exposes: 'React',
                    },
                },
                {
                    test: require.resolve('react-dom'),
                    loader: 'expose-loader',
                    options: {
                        exposes: 'ReactDOM',
                    },
                },
                {
                    test: require.resolve('react-router-dom'),
                    loader: 'expose-loader',
                    options: {
                        exposes: 'ReactRouterDOM',
                    },
                },
                {
                    test: require.resolve('@servicetitan/design-system'),
                    loader: 'expose-loader',
                    options: {
                        exposes: 'ServiceTitan.DesignSystem',
                    },
                },
                {
                    test: require.resolve('@servicetitan/link-item'),
                    loader: 'expose-loader',
                    options: {
                        exposes: 'ServiceTitan.LinkItem',
                    },
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                // TODO: collect a list of dependencies which can be shared
                DEPENDENCIES: JSON.stringify(
                    [
                        '@servicetitan/design-system',
                        '@servicetitan/link-item',
                        'react',
                        'react-dom',
                        'react-router-dom',
                    ].reduce(
                        (result, dependency) =>
                            Object.assign(result, { [dependency]: dependencies[dependency] }),
                        {}
                    )
                ),
            }),
        ],
    },
});
