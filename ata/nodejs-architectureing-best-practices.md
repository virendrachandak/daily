### Node.js系统最佳架构实践

> 本文内容来自Quora上的问题“What are the best architecture practices when
designing a nodejs system?”，答案作者是NPM社区的活跃用户Halliday。不了解这个
人的可以参考[知乎上的问题--substack是谁？](http://www.zhihu.com/question/22036062) [url](http://www.quora.com/What-are-some-best-architecture-practices-when-designing-a-nodejs-system)

不要写成庞大的应用程序。相同进程里跑的“定制”代码越多，理解其已有功能和迭代新功能越困难。使用NPM模块可能帮助避免这样的陷阱，绝对应该多使用模块。尽管业务逻辑并不总能很轻松地模块化。

要避免将一大堆业务逻辑全部放进单个进程里，而应该考虑将功能分解成能够依赖网络互相通信的独立进程。Node.js非常适合写小型网络服务器！

写成大量小型应用的好处：
1.  扩展子系统的独立扩展性。某个子系统扛不住请求时只需要在同一台服务器或者不同服务器上    启动更多这样的子系统。
2.  子系统挂掉和崩溃时的优雅fail（译者注：也就是不会对系统有太大影响）。
3.  整个应用的流程易于记忆。在相同进程里运行所有功能很难避免子功能组件之间的状态冲突。网络边界可以强制标明状态。

需要面对的问题：
1.  网络通讯延迟明显高于进程间通信延迟。
2.  需要管理进程、进程运行位置以及启动顺序。
3.  创建网络服务器成本更高，需要考虑信息序列化和信息路由。
4.  版本难以保持同步。相同进程里运行的所有代码都在同一版本代码库里。而多服务器集群模型很容易发生代码意外连接到了两个版本的不兼容程序的情况。

Halliday参与的一些解决这些问题的项目有：
* <https://github.com/substack/seaport>(针对上面提到的2和4)
* <https://github.com/substack/fleet>(针对2)
* <https://github.com/substack/dnode>以及<https://github.com/substack/upnode>(针对3)

对于问题3，还可以使用<https://github.com/hookio/hook.io>或者使用简单的HTTP服务。对于Halliday来说，在实际中混合匹配不同传输机制并不是问题。

如果你使用了dnode/upnode路由并且还想使用seaport的话，可以看看<https://github.com/substack/airport>。这个项目可以让你连接dnode服务时可以使用semvers服务而不是主机名和端口号作为.connect()和.listen()的参数。
> 译者注，了解[semver your services with seaport](http://substack.net/semver_your_services_with_seaport)

无论如何，最重要的是快速让简单的东西跑起来再一点点渐进增强。可以使用上面提到的工具来增强你的应用栈功能。

### 参考资料
1.  [nodejs modules you should know about: semver/](http://www.catonmat.net/blog/nodejs-modules-semver/)
2.[] 
> 本文内容来自Quora上的问题“What are the best architecture practices when
designing a nodejs system?”，答案作者是NPM社区的活跃用户Halliday。不了解这个
人的可以参考[知乎上的问题--substack是谁？](http://www.zhihu.com/question/22036062) [url](http://www.quora.com/What-are-some-best-architecture-practices-when-designing-a-nodejs-system)

不要写成庞大的应用程序。相同进程里跑的“定制”代码越多，理解其已有功能和迭代新功能越困难。使用NPM模块可能帮助避免这样的陷阱，绝对应该多使用模块。尽管业务逻辑并不总能很轻松地模块化。

要避免将一大堆业务逻辑全部放进单个进程里，而应该考虑将功能分解成能够依赖网络互相通信的独立进程。Node.js非常适合写小型网络服务器！

写成大量小型应用的好处：
1.  扩展子系统的独立扩展性。某个子系统扛不住请求时只需要在同一台服务器或者不同服务器上    启动更多这样的子系统。
2.  子系统挂掉和崩溃时的优雅fail（译者注：也就是不会对系统有太大影响）。
3.  整个应用的流程易于记忆。在相同进程里运行所有功能很难避免子功能组件之间的状态冲突。网络边界可以强制标明状态。

需要面对的问题：
1.  网络通讯延迟明显高于进程间通信延迟。
2.  需要管理进程、进程运行位置以及启动顺序。
3.  创建网络服务器成本更高，需要考虑信息序列化和信息路由。
4.  版本难以保持同步。相同进程里运行的所有代码都在同一版本代码库里。而多服务器集群模型很容易发生代码意外连接到了两个版本的不兼容程序的情况。

Halliday参与的一些解决这些问题的项目有：
* <https://github.com/substack/seaport>(针对上面提到的2和4)
* <https://github.com/substack/fleet>(针对2)
* <https://github.com/substack/dnode>以及<https://github.com/substack/upnode>(针对3)

对于问题3，还可以使用<https://github.com/hookio/hook.io>或者使用简单的HTTP服务。对于Halliday来说，在实际中混合匹配不同传输机制并不是问题。

如果你使用了dnode/upnode路由并且还想使用seaport的话，可以看看<https://github.com/substack/airport>。这个项目可以让你连接dnode服务时可以使用semvers服务而不是主机名和端口号作为.connect()和.listen()的参数。
> 译者注，了解[semver your services with seaport](http://substack.net/semver_your_services_with_seaport)

无论如何，最重要的是快速让简单的东西跑起来再一点点渐进增强。可以使用上面提到的工具来增强你的应用栈功能。

### 参考资料
1.  [nodejs modules you should know about: semver/](http://www.catonmat.net/blog/nodejs-modules-semver/)
2.  [node-semver: The semver parser for Node that powers npm](http://thechangelog.com/node-semver-the-semver-parser-for-node-the-one-npm-uses/)
3.  [semver your service with seaport](http://substack.net/semver_your_services_with_seaport)
4.  [quora 原问题链接](http://www.quora.com/What-are-some-best-architecture-practices-when-designing-a-nodejs-system)
