# skeleton-test
使用vue-cli搭建项目后，使用vue-skeleton-webpack-plugin注入骨架屏。

1.在安装好插件依赖后，首先在build目录下创建webpack.skeleton.conf.js,并在webpack.prod.conf.js和webpack.dev.conf.js中引入插件。

插件参数说明：
SkeletonWebpackPlugin
webpackConfig 必填，渲染 skeleton 的 webpack 配置对象
insertAfter 选填，渲染 DOM 结果插入位置，默认值为字符串 div id="app"
也可以传入 Function，方法签名为 insertAfter(entryKey: string): string，返回值为挂载点字符串
quiet 选填，在服务端渲染时是否需要输出信息到控制台
router 选填 SPA 下配置各个路由路径对应的 Skeleton
mode 选填 路由模式，两个有效值 history|hash
routes 选填 路由数组，其中每个路由对象包含两个属性：
path 路由路径 string|RegExp
skeletonId Skeleton DOM 的 id string
minimize 选填 SPA 下是否需要压缩注入 HTML 的 JS 代码
  
2.在引用好插件后在src文件下次创建入口文件entry-skeleton.js，然后添加骨架屏组件。
