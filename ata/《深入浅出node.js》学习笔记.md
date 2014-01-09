《深入浅出Node.js》学习笔记

>	这是学习@朴灵的《深入浅出node.js》的学习笔记。一切，都从我的主管@清羽递给我这本书开始。。。

### 前言和序

一些相关概念

1.	网易pomelo游戏框架（nodejs）；
2.	eventmachine（ruby）；
3.	twisted（python）。
4.	阿里巴巴EDP部门（使用Node.js做了很多跟数据相关的开发和后端工作，值得学习借鉴）

>	一点想法：发现目前国外很多公司将nodejs用到了移动app后端服务器上，在无线all in的阿里，是不是也可以做点什么？

### 附录B--调试Node.js

node基于v8，v8提供了标准的调试API。
*	从进程内部调试；
*	基于v8 API的TCP调试协议，可以从进程外部进行调试。
	>	node内建了调试协议的客户端，可以在启动时带上debug参数来调试js代码

调试步骤：
1.	在代码里加上**debugger**；
2.	node命令后加上**debug**命令；

node调试客户端支持的v8调试命令有：
1.	cont或c，继续执行；
2.	next或n，执行到下一个断点；
3.	step或s，步进到函数内部；
4.	out或o，从函数内部跳出；
5.	pause，暂停执行。

设置断点和清除断点的方法：
1.	**setBreakpoint()**或简写为**sb()**，下面相同;
2.	**setBreakpoint(line)**;
3.	**setBreakpoint('script.js', 1)**；
4.	**setBreakpoint('fn()')**;
5.	**clearBreakpoint**或简写成**cb**，清除断点。

查看调试信息的命令：
1.	**backtrace**或**bt**，打印当前执行情况下的断点；
2.	**list(5)**，列出当前上下文前后5行的源代码；
3.	**watch(expr)**；添加表达式到观察列表；
4.	**unwatch(expr)**；从观察列表中移除对表达式的观察；
5.	**watchers**；列出所有观察的表达式和值；
6.	**repl**。打开node调试交互环境。

>	<span style="color:red">小马哥推荐：**第8章构建web应用**和**第11章产品化**。前端从单页面制作转向应用的开发。</span>

发送**SIGUSR1**信号启用调试
使用node-inspector来帮助调试

总之，线上环境调试nodejs代码会中断进程，只能在开发中调试，尽量做好单元测试。

---

### 附录C：node编码规范
#### 字面量
*	尽量使用**{}**,**[]**代替**new Object()**和**new Array()**；
#### 数组与对象
*	对对象使用for in，不要对数组使用for in。
>	一种原因是因为Array对象有可能被扩展有其他的方法。

#### 异步
异步编码实践约定：
1.	异步回调函数的第一个参数应该是错误提示；
>	并非所有函数都需将第一个参数设计为错误对象；但涉及异步时，将会导致try catch无法捕获到异步回调时的一场。好的设计代码示例如下：
>	`function(err, data){};`
2.	回调函数一定要执行（否则会造成调用等待），但不能多次执行（结果不如预期）。

#### 类与模块
1.	类继承
node推荐的类继承方式为：
```javascript
function Socket(options) {
	// ...
	stream.Stream.call(this);
	// ...
}
```
2.	导出
所有供外部调用的方法或变量需要挂在在exports变量上。代码为：
`modules.exports = Class`
而不是:
`exports = Class`

#### 注解规范
推荐使用dox的注释规范（源自JSDoc）

#### git和svn hook
**precommit**

#### 持续集成
包括两方面内容：一是代码质量的扫描（定时或者触发）；一是通过集中的平台统计代码质量的好坏变化趋势。

#### 参考资料：
1.	<http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml>
2.	<http://caolanmcmahon.com/posts/nodejs_style_and_structure/>
3.	<http://nodeguide.com/style.html>(Felix's Node.js Style Guide)
4.	<https://npmjs.org/doc/coding-style.html>(NPM)

---
### 搭建局域NPM仓库
npm仓库的源代码：<http://github.com/npm/npmjs.org>

>	nodejs的网络并发与Erlang常被拿来比较。
>	npm仓库设计基于couchDB实现。CouchDB基于Erlang写成，NPM使用CouchDB来托管模块。
>	npm仓库主要包括：www（npm站点的界面）和registry（利用CouchDB存储模块文件和提供JSON API，面向NPM站点和NPM命令行工具服务）。

Issac Z. Schlueter重构NPM时，因为用CouchDB构建Web应用较复杂，所以新建了一个NPM Web应用来代替CouchDB提供的WEB应用服务，而CouchDB只完成数据托管和HTTP Restful服务的提供工作。新NPM Web应用对应的源码在<http://github.com/npm/npm-www>上。

> <b style="color:red">detail need to be read</b>

---
### 第1章 Node简介
node-webkit项目

在使用nodejs进行异步编程时，需要注意流程控制和事件协作的方法和技巧（详见第4章）。

#### 单线程
弱点：1.	无法利用多核CPU；2.错误会引起整个应用的退出，应用健壮性问题需要考虑；3.大量计算占用CPU导致无法继续调用异步I/O。

浏览器中JavaScript与UI共用一个县城，javascript长时间执行会导致UI渲染和响应的终端。Node中长时间的CPU占用也会导致后续异步I/O调用发不出，已完成的I/O回调也不会执行。
最早解决方案是Goolg公司的Gear。启用完全独立的进程将需要计算的程序发送到这个进程，在得出结果后再通过实践传递回结果。这是一个将计算量分发到其他进程的模型，可以降低运算造成阻塞的几率。HTML5定制的Web Workers标准能够创建工作线程来计算，解决js阻塞UI渲染的问题。工作线程通过消息传递来传递运行结果，从而不阻塞主线程，因而工作线程不能访问到主线程中的UI。

**Node解决单线程大计算量问题的思路与Web Worker相同：child_process。**

子进程帮助Node从容面对单线程的健壮性和无法利用多核CPU的问题。将计算分发到子进程来分解大量计算，并通过进程之间的时间消息来传递结果，从而很好地保持应用模型的简单和相互之间的低依赖性。并通过Master-Worker管理各个工作子进程，提高健壮性。（详情见第9章）

#### 跨平台
node基于libuv实现了跨平台架构。

#### **Node的应用场景**
I/O密集型：Node依靠事件循环的处理能力，而不是为每一个请求服务启动一个新线程，资源占用更少。

CPU密集型业务：Node基于V8，V8性能不错，通过对Fibonacci计算使用各种脚本的实现比较，发现node性能不错。问题在于因为javascript是单线程，如果有长时间运行的计算，将导致CPU时间片不能释放，后续I/O无法发起。但是可以适当调整和分解大型CPU密集型应用的大型运算任务为多个小人物，及时释放CPU资源，不阻塞I/O调用的发起。这样就可以既享受并行异步I/O的好处，又能充分利用CPU。

Node的异步I/O解决了单线程上CPU与I/O之间阻塞无法重叠利用的问题，I/O阻塞造成的性能浪费远比CPU的影响小。