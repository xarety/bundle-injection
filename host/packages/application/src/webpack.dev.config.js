const { createWebpackConfig } = require('@servicetitan/startup');

module.exports = createWebpackConfig({
    configuration: {
        mode: 'development',
    },
    plugins: {
        HtmlWebpackPlugin: {
            template: 'src/index.ejs',
            inject: false,
        },
    },
});
