为什么要用JavaScript？
---

有许多编程语言可以使用，为什么要用JavaScript呢？本章关注在选择编程语言时非常重要的七个问题，并给出JavaScript在总体上做得更好的论据。

1. 是否可以自由获取？
2. 语言是否优雅？
3. 实际中是否有用？
4. 是否有好用的工具，尤其是集成开发环境（Integrated Development Environments，IDEs）？
5. 能否快速完成任务？
6. 未来是否仍然有用？

### JavaScript是否可以自由获取？

JavaScript是一门充满争议的开源编程语言，它遵循ISO标准的ECMA-262规范。许多独立团体的实现都遵循了该规范。其中一些实现是开源的。此外，JavaScript语言的进化是由TC39委员会处理的，TC39委员会由多家公司组成，包括所有的主流浏览器厂商。其中许多公司还是竞争者，但他们因为JavaScript语言而工作在了一起。

### JavaScript是否优雅？

优雅，也不优雅。我用不同范式的几种语言写过大量代码。因此，我很清楚JavaScript并非最优雅的语言。不过，它是一门非常灵活的语言，有足够优雅的内核，能让你混合使用面向对象方法和函数方法编程。

JavaScript引擎之间的语言兼容性曾是个问题，但现在已经不是了，部分要感谢test262测试套件，它用于检查引擎的ECMAScript规范一致性。相反，浏览器和DOM的差别仍然是挑战。这也是为什么一般最好依赖框架来隐藏这些差别。

### JavaScript是否有用？

世界上最漂亮的编程语言是没有用的，除非它能让你写出你需要的程序。

#### 图形用户界面

至于图形用户界面，JavaScript受益于是HTML5的一部分。本节将术语HTML5用于表示“浏览器平台”（HTML，CSS以及浏览器JavaScript API）。HTML5部署广泛、稳步前进，正在慢慢变成一个用于书写全功能、跨平台应用的完整层。类似于，比如说，Java平台，几乎是一个嵌入式操作系统。HTML5的卖点之一在于让人书写跨平台的用户界面。通常需要有妥协：放弃质量来交换在单个操作系统上的限制。过去，“跨平台”意味着windows，Mac OS和Linux。但是现在有两种传统的交互平台：Web和移动。有了HTML5，可以通过[PhoeGap](http://phonegap.com/)，[Chrome Apps](http://developer.chrome.com/apps/)和[TideSDK](http://www.tidesdk.org/)等技术将目标定位为所有平台。

此外，一些平台会将web应用作为原生应用，或者可以原生安全，例如Chrome OS,Firefox OS以及Android。

#### 其他补充JavaScript的技术

不止HTML5，还有更多技术补充了JavaScript，让JavaScript更加有用：

**库：**

*   JavaScript有丰富的库，可以完成从JavaScript解析（通过[Esprima](http://esprima.org/)）到处理以及显示PDF文件（通过[PDF.js](https://github.com/mozilla/pdf.js)）等任务。

**Node.js**

*   Node.js平台让你可以编写服务器端代码和shell脚本（build工具，测试工具等等）。

**JSON（JavaScript Object Notation，见第22章）**

JSON是源于JavaScript的格式，以及称为Web数据交换的流行格式（例如：web服务的结果）。

**NoSQL数据库（例如[CouchDB](http://couchdb.apache.org/)和[MongoDB](http://www.mongodb.org/)）

#### JavaScript是否有好工具？

JavaScript有日益完善的构建工具（例如：[Grunt](http://gruntjs.com/)）和测试工具（例如：[moncha](http://visionmedia.github.io/mocha/)）。Node.js使得通过shell（而不只是浏览器）运行各种工具成为可能。这个领域的一种风险在于碎片化，因为我们慢慢地有了太多这样的工具。

JavaScript IDE处于初期但是也在快速发展。web开发的复杂性和动态性让这个领域成为了创新的沃土。两个开源实例为[Brackets](http://brackets.io/)和[Light Table](http://www.lighttable.com/)。

此外，浏览器也变成了越来越有用的开发环境。尤其是Chrome，最近又有一些引人注目的进展。了解未来IDE和浏览器有多集成是很有趣的事情。

#### JavaScript是否够快？

JavaScript引擎进步很大，从缓慢的解释器进化成了快速的实时（just-in-time）编译器。JavaScript引擎对于大部分应用以及足够快。不过，有一些新点子正在开发，来为剩下的应用加快JavaScript：

*   [asm.js](http://asmjs.org/)是JavaScript（非常静态）的子集，在现代引擎上运行非常迅速，速度大约为经过编译的C++的70%。asm.js可以用于实现web应用的关键算法部分。过去曾被用于将基于C++的游戏移植到Web平台。
*   [ParallelJS](http://www.2ality.com/2013/12/paralleljs.html)并行化了使用新的数组方法mapPar，filterPar以及reducePar的JavaScript代码（已有数组方法map、filter和reduce的可并行版本）。为了让并行化工作，必须编写特殊风格的回调；主要的限制在于不能模拟在回调中还没有创建的数据。

#### JavaScript是否得到了广泛使用？

一门语言被广泛应用有两个好处。首先，这样的语言的文档和支持更好。第二，更多的程序员了解它，这对于无论是招聘还是寻找基于该语言的工具的用户都非常重要。

JavaScript得到了广泛使用，收获了以下优势：

*   现在有各种各样的JavaScript文档和支持：书、播客、播客文章、电子邮件新闻、论坛等等，第13张将为你指引这些重要的资源。
*   对JavaScript开发者的需求旺盛，而且他们的等级也在稳步提升。

#### JavaScript是否有未来？

几件事可以说明JavaScript有光明的未来：

*   语言稳步进化；ECMAScript6开上去不错。
*   有许多与JavaScript相关的创新（例如之前提到的asm.js和ParallelJS,微软的TypeScript等等）
*   和JavaScript是一个整体的Web平台正快速成熟起来。
*   JavaScript得到了广阔的公司联盟支持--不是单个人或者公司控制。

#### 总结

考虑到上面列出的语言的吸引力，JavaScript做得非常不错。当然并非完美，但是在现在，难以被击败--而且正在变得越来越好。
