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

# 提取公共代码

## why

- 大网站有多个页面，每个页面由于采用相同技术栈和样式代码，会包含很多公共代码，如果都包含会有问题
- 相同的资源被重复的加载，浪费用户的流量和服务器的成本
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验
- 如果能把公共代码抽离成单独文件进行加载能进行优化，可以减少网络传输流量，降低服务器成本

## 如何提取

- 基础类库，方便长期缓存
- 页面之间的共用代码
- 各个页面单独生成文件

# module、chunk、bundle

- module：就是 JS 的模块化 webpack 支持 commonjs、ES6 等模块化规范，简单来说就是你通过 import 语句引入的代码
- chunk
  - 你的项目入口
  - 通过 import() 动态引入的代码
  - 通过 splitChunks 拆分出来的代码
- bundle：bundle 是 webpack 打包之后的各个文件，一般就是和 chunk 是一对一的关系，bundle 就是对 chunk 进行编译压缩打包等处理之后的产出
