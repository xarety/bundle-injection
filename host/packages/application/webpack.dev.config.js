const { createWebpackConfig } = require('@sandboxes/startup');

module.exports = createWebpackConfig(
    {
        configuration: {
            mode: 'development',
        },
    },
    { exposeSharedDependencies: true }
);
