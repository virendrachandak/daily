前端开发统一方案--工具篇
---
> `grunt,gulp,midway,kissy-cake`等等

# 基础工具
---
## 1.`grunt`

#### 工具类型
构建工具

#### 意义和作用
自动化！

> 比如自动帮你压缩合并，自动编译`coffeescript`到`js`，编译页面模板等等。

#### 开发者需要做啥呢？

**配置需要的各种插件**。
**定制任务**

> 在开发时使用`grunt`来运行指定的自定义任务，让插件来完成特定任务定制的特定功能。

## 2.`npm`

1.  安装`nodejs`

2.  了解`npm`的基本用法
3.  [`npmjs.org`](http://npmjs.org)

## 3.`grunt`插件

通过`npmjs.org`来维护`grunt`插件。官方的模块有`contrib`标记。在`npmjs.org`上搜索关键词`gruntplugin`可以搜索到很多相关插件。

创建`grunt`插件建议使用[`gruntplugin grunt-init template`](https://github.com/gruntjs/grunt-init-gruntplugin)。

> `grunt-init-gruntplugin`在`grunt-init`工具的基础上还加上了`Nodeunit`的单元测试。

#### 使用`grunt-init-gruntplugin`写一个`grunt`插件

1.  安装`grunt-init`和`grunt-init-gruntplugin`

```
cnpm install -g grunt-init
git clone https://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin
mkdir grunt-init-gruntplugin-test
cd grunt-init-gruntplugin-test
grunt-init gruntplugintest
```

### 完成

常见需求：
* 压缩（minification等等）
* 编译（coffee，less，sass，compass，xtemplate,handlebars等等）
* 单元测试（nodeunit，mocha等等）
* 代码质量（jshint，linting等等）

> 常见模板：`handlebars`，`jade`等。
> javascript的预编译：`coffeescript`。
> css的预编译：`less`，`sass`，`stylus`等等。
> 代码语法检查：`jshint`。
