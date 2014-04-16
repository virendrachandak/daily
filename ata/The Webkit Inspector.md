【译】Webkit Inspector
---
Webkit几乎已经统一了移动浏览器，学习和了解Webkit Inspector非常有意义。
Google和Chrome团队在Webkit Inspector上投入了大量资源。Webkit Inspector的功能也变得非常丰富和强大，但是我们身边仍然有许多开发者没有有效地将这些功能利用起来。本文将详细介绍Webkit Inspector，并重点介绍非常有用的bug调试等功能。

### 准备
*	用`data:`URLscheme做实验节省时间。例如：<br>`data:text/html,<b>I am bold font.</b>`
	>	译者注：`data:`是使用的协议名称，表示使用的是`data url scheme`。冒号后面跟的是具体内容，其中`text/html`指明了请求的文件类型。当然，可以替换成任何合理的http请求文件类型，例如`image/jpeg`，或者`application/javascript`。生造的也没关系。
	>	
	>	后面的`<b>I am bold font</b>`请求文件的具体内容，可以修改成你想要测试的任何内容。
	>	例如，可以这样`data:text/html,<script>alert(1)</script>`

### Webkit浏览器
*	使用Webkit内核的浏览器都有Webkit Inspector工具，按照更新速度从慢到快排序如下：
	1.	Safari稳定版
	2.	Chrome稳定版
	3.	Webkit Nightlies
	4.	Chromium
	5.	Chrome Canary
*	也就是说，Chrome Canary上会有最新的Webkit Inspector功能！

### 开始使用Webkit Inspector
*	打开Google Chrome（推荐Chrome Canary），按快捷键`F12`或者`Ctr+shift+c`打开Webkit Inspector的"inspect element"功能。
*	熟悉Webkit界面
	*	按住西方的![]()按钮不动，会有

### 参考资料
1. [原文](http://jtaby.com/blog/2012/04/23/modern-web-development-part-1)
2. [浏览器工作原理](http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
3. [MDN](https://developer.mozilla.org/en/docs)