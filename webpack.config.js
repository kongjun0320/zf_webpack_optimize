const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 默认只分割异步模块
      minSize: 0, // 分割出去的代码块的最小体积， 0 表示不限制
      maxSize: 0, //  分割出去的代码块的最大体积， 0
      cacheGroups: {
        default: false,
        commons: {
          minChunks: 1,
          reuseExistingChunk: false,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page1.html',
      chunks: ['entry1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page2.html',
      chunks: ['entry2'],
    }),
  ],
};
