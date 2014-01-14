### 【译】Node.js在PayPal的应用

最近很多关于PayPal使用Node.js开发应用平台的讨论。PayPay的工程师博客上曾经写了一篇名为[Set My UI Free](https://www.paypal-engineering.com/2013/06/17/set-my-ui-free-part-1-dust-javascript-templating-open-source-and-more/)的文章，现在（2013年11月22日）PayPal的工程师Jeff Harrel很高兴地承认这些消息的真实性，PayPal的网站应用正在从Java专享JavaScript和node.js。

一直以来，PayPal的工程师团队被分为针对浏览器编码的团队（使用HTML，CSS和
JavaScript）和针对应用层编码的团队（使用Java）。过去的场景是，HTML开发工程师需要让Java开发工程师帮忙将“A”页面和“B”页面链接到一起。有了“全栈”工程师后这种模式变得十分落后，“全栈”工程师不仅可以创建漂亮的用户界面，还可以构造相应的支撑应用。PayPal需要这些像独角兽一样（珍贵）的工程师。而且现在PayPal的主要阻碍就是在浏览器和服务器编程之间人为设立的边界。

Node.js使得在浏览器端和服务器端同时使用JavaScript编码成为可能。而且Node.js的技术栈能够让工程师团队各自发挥自己的技能，统一为理解和响应用户需求服务。

**早期改造**

与其他公司一样，PayPal刚开始只在原型平台上使用了Node.js，在充分熟悉后才决定在生产环境中进行尝试。

一开始，PayPal将[express](http://expressjs.com/)作为路由组件，[nconf](https://github.com/flatiron/nconf)用于系统配置，[grunt](http://gruntjs.com/)作为任务构建工具。PayPal特别中意express的普遍性，但是却发现在多支开发团队中使用时express的伸缩性并不太好。因为Express没有指定的规范，开发者有很大的灵活性，可以按照自己的方式来搭建服务器，这样不利于保持大型团队之间的一致性。随着越来越多的开发团队开始使用node.js，PayPal找出了一些模式并且将它们产出成Kraken.js框架。实际上这并不是一个框架，而是建立在express上的一个规范层，用于较大型开发组织间的扩展。PayPal希望工程师关注应用创建而不是环境配置。

> 目前Kraken.js已经开源，[github地址](https://github.com/PayPal/kraken-js)

**将node.js用于生产**

PayPal将node.js在生产环境中的第一次应用是在它们整站流量最大的页面之一：账户概览页面上。为了消除风险，PayPal平行使用Java开发了一套同样的系统。PayPal的工程师知道如何部署和扩展Java应用，可以在node.js应用出现问题的情况下，切换回Java系统。这样的部署获得了一些有趣的数据。

**开发**

PayPal从2013年1月开始，用了好几个月时间来完成运行node.js的基础架构，例如
:session，集中日志，关键存储等。同时，PayPal有5名工程师在开发Java应用。Java应用开发了两个月后，两名工程师开始开发并行的node.js应用。7月初，这两个系统实现了同样的功能。两名工程师组成的node.js应用开发团队赶上了java开发团队的进度。两套系统都跑了测试用例并且都通过了相同的功能测试。其中有些细节引人关注。node.js应用：
  
* 开发人员更少的情况下，开发速度快了近一倍
* 代码量（行数）减少了33%
* 代码文件数少了40%

这些激励人心的细节证明PayPal开发团队使用javascript会更快。因此PayPal决定暂停Java系统的开发，加大JavaScript系统的开发投入。好消息是这个项目里那些刚开始对node.js怀疑的java工程师也欣然投入了并行工作流的开发工作，并且表现出了以往两倍的生产效率。


**性能**

性能是一个有趣和值得争议的话题。PayPal

### 参考资料
1.  [英文原文](https://www.paypal-engineering.com/2013/11/22/node-js-at-paypal/)
2.  [http://highscalability.com/blog/2013/12/11/using-nodejs-paypal-doubles-rps-lowers-latency-with-fewer-de.html](http://highscalability.com/blog/2013/12/11/using-nodejs-paypal-doubles-rps-lowers-latency-with-fewer-de.html)
3.  [kraken-js](https://github.com/PayPal/kraken-js)
3.  [http://cnodejs.org/topic/52941d76a6957a0809781118](http://cnodejs.org/topic/52941d76a6957a0809781118)
4.  [http://www.csdn.net/article/2013-11-25/2817617-PayPal-Kraken-Nodejs-Framework](http://www.csdn.net/article/2013-11-25/2817617-PayPal-Kraken-Nodejs-Framework)
