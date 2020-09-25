import webpack, { Configuration } from 'webpack';
import { Configuration as WebpackDevServerOptions } from 'webpack-dev-server';
const WriteFilePlugin = require('write-file-webpack-plugin');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';

import { Options } from '.';
import { createConfig as createSharedConfig, Overrides as SharedOverrides } from './shared.config';

interface WriteFilePluginOptions {
    atomicReplace?: boolean;
    exitOnErrors?: boolean;
    force?: boolean;
    log?: boolean;
    test?: RegExp;
    useHashIndex?: boolean;
}

type WatchIgnorePluginOptions = (string | RegExp)[];

export interface Overrides {
    configuration: SharedOverrides['configuration'] & {
        mode: 'development';
    } & WebpackDevServerOptions;
    plugins?: SharedOverrides['plugins'] & {
        WriteFilePlugin?: WriteFilePluginOptions;
        WatchIgnorePlugin?: WatchIgnorePluginOptions;
    };
}

export function createConfig(
    { configuration, plugins = {} }: Overrides,
    { customStyleRules, exposeSharedDependencies, webComponent }: Options = {}
): Configuration {
    const {
        WriteFilePlugin: writeFilePluginOptions,
        WatchIgnorePlugin: watchIgnorePluginOptions,
    } = plugins;

    return merge(
        createSharedConfig({ plugins }),
        {
            devtool: 'cheap-module-source-map',
            devServer: {
                port: 8080,
                historyApiFallback: true,
            },
            module: {
                rules: [
                    ...(!customStyleRules
                        ? [
                              {
                                  test: /\.module.css$/,
                                  use: [
                                      'style-loader',
                                      {
                                          loader: 'css-loader',
                                          options: {
                                              modules: { exportLocalsConvention: 'camelCase' },
                                          },
                                      },
                                  ],
                              },
                              {
                                  test: /(\.css)$/,
                                  exclude: (path: string) => {
                                      if (
                                          exposeSharedDependencies &&
                                          path.endsWith('design-system.css')
                                      ) {
                                          return true;
                                      }

                                      return path.endsWith('.module.css');
                                  },
                                  use: ['style-loader', 'css-loader'],
                              },
                          ]
                        : []),
                    ...(exposeSharedDependencies
                        ? [
                              {
                                  test: /design-system.css$/,
                                  use: [MiniCssExtractPlugin.loader, 'css-loader'],
                              },
                          ]
                        : []),
                ],
            },
            plugins: [
                new WriteFilePlugin(writeFilePluginOptions),
                new webpack.WatchIgnorePlugin(watchIgnorePluginOptions ?? [/\.tsx?$/]),
                ...(exposeSharedDependencies
                    ? [
                          new MiniCssExtractPlugin({
                              ...(webComponent
                                  ? { filename: 'index.css' }
                                  : {
                                        filename: '[name].[contenthash:8].bundle.css',
                                        chunkFilename: '[name].[contenthash:8].bundle.css',
                                    }),
                          }),
                      ]
                    : []),
            ],
            output: {
                filename: '[name].bundle.js',
            },
        },
        configuration
    );
}