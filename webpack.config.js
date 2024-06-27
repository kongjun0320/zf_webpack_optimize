const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack5 中的 tree-shaking 是经过加强的，优化的，功能比 webpack4 强很多
module.exports = {
  mode: 'development',
  // devtool: 'source-map',
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
      minSize: 0, // 分割出去的代码块的最小体积，0 表示不限制
      maxSize: 0,
      cacheGroups: {
        default: false, // 禁用默认缓存组
        // 缓存组，配置如何对模块分组，相同分组会分到一个代码中
        commons: {
          minChunks: 1,
          reuseExistingChunk: true,
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
      template: './src/index1.html',
      filename: 'entry1.html',
      chunks: ['entry1'], // 包含哪些代码块，往 HTML 页面里插入哪些资源文件 bundle
    }),
    new HtmlWebpackPlugin({
      template: './src/index2.html',
      filename: 'entry2.html',
      chunks: ['entry2'],
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index1.html',
    //   filename: 'page1.html',
    //   chunks: ['page1'], // 包含哪些代码块，往 HTML 页面里插入哪些资源文件 bundle
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/index2.html',
    //   filename: 'page2.html',
    //   chunks: ['page2'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/index3.html',
    //   filename: 'page3.html',
    //   chunks: ['page3'],
    // }),
  ],
};
