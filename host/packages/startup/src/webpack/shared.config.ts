import path from 'path';

import { Configuration, DefinePlugin, optimize } from 'webpack';
import HtmlWebpackPlugin, { Options as HtmlWebpackPluginOptions } from 'html-webpack-plugin';
import merge from 'webpack-merge';

// TODO: move "utils" to the "src" folder
import { getFolders, readJson } from '../cli/utils';

import { Options, WebComponent } from '.';

const sharedDependencies = {
    '@servicetitan/design-system': 'ServiceTitan.DesignSystem',
    'classnames': 'ClassNames',
    'formstate': 'FormState',
    'mobx': 'MobX',
    'mobx-react': 'MobXReact',
    'mobx-utils': 'MobXUtils',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
};

export interface Overrides {
    configuration?: Configuration;
    plugins?: {
        HtmlWebpackPlugin?: HtmlWebpackPluginOptions;
    };
}

export function createConfig(
    { configuration = {}, plugins = {} }: Overrides = {},
    { exposeSharedDependencies, webComponent }: Options = {}
): Configuration {
    const { destination } = getFolders();
    const { dependencies } = readJson('./package.json');

    const { HtmlWebpackPlugin: htmlWebpackPluginOptions } = plugins;

    return merge(
        {
            entry: [
                `./${destination}/index`,
                ...(exposeSharedDependencies
                    ? Object.keys(sharedDependencies).map(dependency => require.resolve(dependency))
                    : []),
            ],
            resolve: {
                extensions: ['.js'],
            },
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /\.js$/,
                        exclude: rawPath => {
                            if (!rawPath.includes('node_modules')) {
                                return false;
                            }

                            const path = rawPath.replace(/\\/g, '/');
                            return (
                                !path.includes('node_modules/@servicetitan') ||
                                path.includes('node_modules/@servicetitan/design-system')
                            );
                        },
                        loader: 'source-map-loader',
                    },
                    {
                        test: /\.worker\.js$/,
                        use: { loader: 'worker-loader' },
                    },
                    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
                    { test: /\.jpg$/, loader: 'file-loader' },
                    {
                        test: /\.(woff|woff2|png|gif|otf)$/,
                        use: [{ loader: 'url-loader', options: { prefix: 'font/', limit: 65000 } }],
                    },
                    {
                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: { limit: 65000, mimetype: 'application/octet-stream' },
                            },
                        ],
                    },
                    {
                        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: { limit: 65000, mimetype: 'image/svg+xml' },
                            },
                        ],
                    },
                    ...(exposeSharedDependencies
                        ? Object.entries(sharedDependencies).map(([dependency, variable]) => ({
                              test: require.resolve(variable),
                              loader: 'expose-loader',
                              options: {
                                  exposes: dependency,
                              },
                          }))
                        : []),
                ],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'ServiceTitan',
                    hash: true,
                    ...htmlWebpackPluginOptions,
                }),
                ...(exposeSharedDependencies
                    ? [
                          new DefinePlugin({
                              DEPENDENCIES: JSON.stringify(
                                  Object.keys(sharedDependencies).reduce(
                                      (result, dependency) =>
                                          Object.assign(result, {
                                              [dependency]: dependencies[dependency],
                                          }),
                                      {}
                                  )
                              ),
                          }),
                      ]
                    : []),
                ...(webComponent
                    ? [
                          new optimize.LimitChunkCountPlugin({
                              maxChunks: 1,
                          }),
                          new DefinePlugin({
                              // eslint-disable-next-line @typescript-eslint/naming-convention
                              WEB_COMPONENT: JSON.stringify(webComponent),
                          }),
                      ]
                    : []),
            ],
            ...(webComponent === WebComponent.Light
                ? {
                      externals: Object.entries(sharedDependencies).reduce(
                          (result, [dependency, variable]) =>
                              Object.assign(result, {
                                  [dependency]: variable,
                              }),
                          {}
                      ),
                  }
                : {}),
            output: {
                ...(webComponent
                    ? {
                          path: path.resolve(
                              process.cwd(),
                              `${destination}/bundle/${webComponent}`
                          ),
                          filename: 'index.js',
                      }
                    : { path: path.resolve(process.cwd(), `${destination}/bundle`) }),
            },
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    ...(exposeSharedDependencies
                        ? {
                              cacheGroups: {
                                  'design-system': {
                                      test: /[\\/]node_modules[\\/]@servicetitan[\\/](tokens|anvil-fonts|design-system)[\\/].*\.css$/,
                                      name: 'design-system',
                                  },
                              },
                          }
                        : {}),
                },
            },
        },
        configuration
    );
}