const { createWebpackConfig } = require('@servicetitan/startup');

module.exports = createWebpackConfig({
    configuration: {
        mode: 'development',
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
                        exposes: 'ServiceTitan_DesignSystem',
                    },
                },
                {
                    test: require.resolve('@servicetitan/link-item'),
                    loader: 'expose-loader',
                    options: {
                        exposes: 'ServiceTitan_LinkItem',
                    },
                },
            ],
        },
    },
});
