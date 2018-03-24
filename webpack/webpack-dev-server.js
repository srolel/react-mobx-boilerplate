/**
 * Webpack Dev Server
 * This file is used to run our local enviroment
 */
const webpack = require('webpack');
const express = require('express');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const fallback = require('express-history-api-fallback');
const path = require('path');
const webpackConfig = require('./webpack.config');

/**
 * Always dev enviroment when running webpack dev server
 * There are other ways to do this, so feel free to do
 * whatever you find suites your taste
 */

const port = process.env.PORT || 3000;

const env = {
  dev: process.env.NODE_ENV === 'development',
  port
};

const devServerConfig = {
  hot: true,
  inline: true,
  https: false,
  lazy: false,
  contentBase: path.join(__dirname, '../src/'),
  historyApiFallback: { disableDotRule: true }, // Need historyApiFallback to be able to refresh on dynamic route
  stats: { colors: true } // Pretty colors in console
};

try {
  const app = express();
  const compiler = webpack(webpackConfig(env));
  const devMiddleware = WebpackDevMiddleware(compiler, devServerConfig);
  const hotMiddleware = WebpackHotMiddleware(compiler);
  app.use(devMiddleware);
  app.use(hotMiddleware);
  app.listen(port, 'localhost', err => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening to port ${port}`);
  });
} catch (e) {
  console.error(e);
}


