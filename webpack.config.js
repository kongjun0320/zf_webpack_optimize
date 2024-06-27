const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack5 中的 tree-shaking 是经过加强的，优化的，功能比 webpack4 强很多
module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
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
    }),
  ],
};
