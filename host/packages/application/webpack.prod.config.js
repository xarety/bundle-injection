const { createWebpackConfig } = require('@sandboxes/startup');

module.exports = createWebpackConfig(
    {
        configuration: {
            mode: 'production',
        },
    },
    { exposeSharedDependencies: true }
);
