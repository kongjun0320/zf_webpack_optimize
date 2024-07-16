const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    page3: './src/page3.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  optimization: {
    splitChunks: {
      chunks: 'all', // 默认只分割异步模块
      minSize: 0, // 分割出去的代码块的最小体积， 0 表示不限制
      maxSize: 0, //  分割出去的代码块的最大体积， 0
      minRemainingSize: 0, // 分割后剩下体积，0 表示不限制
      // minChunks: 1, // 如果此模块被多个入口引用几次会被分割
      maxAsyncRequests: 30, // 异步请求最大分割出去几个代码块
      maxInitialRequests: 30, // 同步时最大分割出去几个代码块
      enforceSizeThreshold: 50000, // 强制阈值
      cacheGroups: {
        // 缓存组配置，配置如何对模块分组，相同分组会分到一个代码块中
        defaultVendors: {
          // 第三方模块
          test: /[\\/]node_modules[\\/]/, // 如果模块的路径匹配此正则的话
          priority: -10, // 优先级
          reuseExistingChunk: true, // 是否可复用现有的代码块
        },
        default: {
          minChunks: 2, // 此模块被几个入口引用过，最少两个才提取
          priority: -20,
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
      template: './src/index.html',
      filename: 'page1.html',
      chunks: ['page1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page2.html',
      chunks: ['page2'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page3.html',
      chunks: ['page3'],
    }),
  ],
};
