const { createWebpackConfig } = require('@servicetitan/startup');

module.exports = createWebpackConfig({
    configuration: {
        mode: 'development',
        entry: [
            require.resolve('react'),
            require.resolve('react-dom'),
            require.resolve('react-router-dom'),
            require.resolve('@servicetitan/design-system'),
            require.resolve('@servicetitan/link-item'),
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
    },
});
