const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack5 中的 tree-shaking 是经过加强的，优化的，功能比 webpack4 强很多
module.exports = {
  mode: 'development',
  // devtool: 'source-map',
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
  optimization: {
    splitChunks: {
      chunks: 'all', // 默认只分割异步模块
      minSize: 0, // 分割出去的代码块的最小体积，0 表示不限制
      minRemainingSize: 0, // 分割后剩下的体积，0 表示不限制，webpack5 新增
      minChunks: 1, // 如果此模块被多个入口引用几次会被分割
      maxAsyncRequests: 30, // 异步请求最大分割出去几个代码块
      maxInitialRequests: 30, // 同步请求最大分割出去几个代码块
      enforceSizeThreshold: 50000, // 强制阈值，webpack5 新增
      cacheGroups: {
        // 缓存组，配置如何对模块分组，相同分组会分到一个代码中
        defaultVendors: {
          // 第三方模块
          test: /[\\/]node_modules[\\/]/, // 如果模块的路径匹配此正则的话
          priority: -10, // 很多缓存组，如果一个模块同属于多个缓存组，应该分到哪个组里，看优先级高
          reuseExistingChunk: true, // 是否可复用现有的代码块
        },
        default: {
          minChunks: 2, // 此模块，被几个入口引用，最少 2 次才会提取
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
      template: './src/index1.html',
      filename: 'page1.html',
      chunks: ['page1'], // 包含哪些代码块，往 HTML 页面里插入哪些资源文件 bundle
    }),
    new HtmlWebpackPlugin({
      template: './src/index2.html',
      filename: 'page2.html',
      chunks: ['page2'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index3.html',
      filename: 'page3.html',
      chunks: ['page3'],
    }),
  ],
};
