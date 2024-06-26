const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

const smw = new SpeedMeasureWebpack5Plugin();

const loadersPath = path.resolve(__dirname, 'loaders');

module.exports = smw.wrap({
  mode: 'development',
  devtool: 'source-map',
  context: process.cwd(),
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 js
      new TerserPlugin(),
    ],
  },
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    // extensions: ['.js', '.jsx', '.json'],
    // alias: {},
    // modules: [],
  },
  resolveLoader: {
    modules: [loadersPath],
    // extensions: [],
    // mainFields: [],
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'logger-loader' },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 压缩 html
        collapseInlineTagWhitespace: true,
        removeComments: true,
      },
    }),
    new BundleAnalyzerPlugin({
      // 不启动展示打包报告的 HTTP 服务器
      analyzerMode: 'disabled',
      // 生成 stats.json 文件
      generateStatsFile: true,
    }),
    // 压缩 css
    new OptimizeCssAssetsWebpackPlugin(),
    // CSS 和 JS 的加载可以并行
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new webpack.DefinePlugin({
      // 在 webpack 编译阶段进行替换，运行阶段就已经是值了
      ENVIRONMENT: JSON.stringify('development'),
    }),
  ],
});
