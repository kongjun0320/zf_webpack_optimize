const path = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpack5Plugin();

module.exports = smw.wrap({
  mode: 'development',
  devtool: 'source-map',
  context: process.cwd(),
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      // 不启动展示打包报告的 HTTP 服务器
      analyzerMode: 'disabled',
      // 生成 stats.json 文件
      generateStatsFile: true,
    }),
  ],
});
