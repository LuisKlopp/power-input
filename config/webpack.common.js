const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const webpack = require('webpack');
require('dotenv').config({ silent: true });
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도로 보통 저는 사용합니다.

module.exports = {
  entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new EnvironmentPlugin({
      S3_API_URL: process.env.S3_API_URL,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
