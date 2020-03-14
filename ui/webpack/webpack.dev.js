const webpack = require('webpack');
const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: paths.src + '/build',
    compress: true,
    port: 9000
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});