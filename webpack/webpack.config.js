const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = (env) => {
  const ifProd = plugin => env.prod ? plugin : undefined;
  const ifDev = plugin => env.dev ? plugin : undefined;
  const removeEmpty = array => array.filter(p => !!p);
  const NODE_ENV = env.prod ? 'production' : 'development';
  return {
    devtool: ifDev('source-map'),
    entry: {
      app: removeEmpty([
        ifDev('react-hot-loader/patch'),
        ifDev(`webpack-hot-middleware/client?http://localhost:${env.port}`),
        path.join(__dirname, '../src/index.ts')
      ]),
      vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'tslib'],
    },

    resolve: {
      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    output: {
      filename: '[name].[hash].js',
      sourceMapFilename: '[name].[hash].map.js',
      path: path.join(__dirname, '../build/'),
      // publicPath: '/', can uncomment if you want everything relative to root '/'
    },

    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: ['react-hot-loader/webpack', env.prod
            ? 'awesome-typescript-loader?target=es5'
            : 'awesome-typescript-loader'],
        },
        {
          test: /\.(css)$/,
          loaders:
          env.dev || env.test
            ? [
              'style-loader',
              'css-loader?modules=true&minimize&-autoprefixer',
              'postcss-loader'
            ]
            : ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules=true&minimize&-autoprefixer!postcss-loader' }),
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
        }
      ],
    },

    plugins: removeEmpty([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: '[name].[hash].js',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),
        filename: 'index.html',
        inject: 'body',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: env.prod,
        debug: env.dev,
        options: {
          context: __dirname,
          postcss: [Autoprefixer({ browsers: ['last 3 versions'] })],
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),

      new webpack.DefinePlugin({
        __DEVELOPMENT__: Boolean(env.dev),
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      }),

      ifProd(new ExtractTextPlugin({
        filename: '[name].[hash].css',
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          'screw_ie8': true,
          'warnings': false,
          'unused': true,
          'dead_code': true,
        },
        output: {
          comments: false,
        },
        sourceMap: false,
      })),
    ]),
  };
};
