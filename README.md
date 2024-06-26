# webpack 优化

- 如何进行数据性能分析
- 编译时间的优化
- 编译体积的优化
- 如何运行的更快

# 编译时间优化

- 缩小查找的范围

  - extensions
  - alias
  - modules
    - 对于直接声明依赖名的模块，webpack 会使用类型 Node.js 一样进行路径搜索
  - mainFields
    - 从 package.json 中的哪个字段查找入口文件
  - mainFiles
  - oneOf
  - external

- noParse

  - 可以用于配置哪些模块文件的内容不需要进行解析
  - 不需要解析依赖的第三方大型类库等

- IgnorePlugin

  - 用户忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去
  - requestRegExp
  - contextRegExp

- thread-loader

- 利用缓存
  - babel-loader: cacheDirectory
  - cache-loader
  - hard-source-webpack-plugin

# 编译体积的优化

- 压缩 JS、CSS、HTML 和图片
- 清除无用的 css
  - purgecss-webpack-plugin
- Tree Shaking
