
const path = require('path');
const webpack = require('webpack');

/*
* configuration for running in node (Server-side rendering)
*/

module.exports = env => {
  const baseConfig = require('./webpack.config.js')(env);
  return Object.assign(baseConfig, {
    target: 'node',
    entry: {
      'app.node': path.join(__dirname, '../src/index.node.ts')
    },
    output: Object.assign(baseConfig.output, {
      filename: '[name].js',
      libraryTarget: 'umd'
    }),
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: env.prod,
        debug: env.dev,
        options: {
          context: __dirname,
          postcss: [],
        },
      }),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: Boolean(env.dev),
        'process.env.NODE_ENV': env.NODE_ENV,
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: ['awesome-typescript-loader'],
        },
        {
          test: /\.(css)$/,
          loaders:
          [
            'css-loader?modules=true&minimize&-autoprefixer',
            'postcss-loader',
          ]
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
        }
      ],
    }
  })
};