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

# 运行速度优化

- 代码分割

  - 入口点分割
  - 懒加载
  - prefetch
  - 提取公共代码

  > preload 预加载，此资源肯定会用到，优先较高，需求提前获取，它要慎用，有可能有性能隐患
  > prefetch 预获取，此资源在以后可能会用到，它是在浏览器空闲的时候加载，没有性能问题

  ```js
  import(/* webpackChunkName:'', webpackPrefetch: true */ 'a');
  ```

# 代码分割

- 每个入口是一个 chunk
- 动态代码块 import()
- splitChunkPlugin

> vendors-node_modules_jquery_dist_jquery_js
> vendors-node_modules_lodash_lodash_js
> page1.js page1.js module1.js module2.js
> page2.js page2.js module1.js module2.js
> page3.js page3.js module1.js module3.js
> asyncModule1.js asyncModule1.js

# sideEffects

```json
"sideEffects": [
"*.css"
],
```
