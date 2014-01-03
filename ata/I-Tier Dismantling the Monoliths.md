### 【译】I-Tier：大型应用的分解(I-Tier:Dismantling the Monoliths)

>	译者序：Groupon最近花了一年时间将其美国站点从过去庞大的Ruby on Rails应用迁移到了新的Node.js应用栈上，并且取得了不少成果。本文翻译自其官方博客上的文章['I-Tier:Dismantling the Monoliths'](https://engineering.groupon.com/2013/misc/i-tier-dismantling-the-monoliths/)，相信通过了解Node.js在Groupon的应用，也会对我们阿里的工程师有所启发。

Goupon整个美国站点的前端代码从一开始使用的就是Rails。但是随着前端代码库变得越来越庞大，维护和发布工作也变得越来越困难。为了解决这个庞大的代码库带来的问题，Groupon决定重新架构整个前端代码库，将它分解成小而独立的可控分块。而这个重构项目的核心，就是将整个前端站点的每个主要部分都重构成独立的Node.js应用程序。Groupon还重构了基础架构来让这些独立的Node.js应用能够一起工作，这个基础架构重构项目的成果就是Interaction Tier（简称I-Tier）。

我们这次迁移工作的主要收获有：

*	更快地整站网页加载速度；
*	开发团队的开发速度和发布速度更快，而且减少了对其他团队的依赖；
*	不用重复实现Groupon站点在不同国家的相同功能。

本文是一系列介绍这次对于Groupon业务发展具有重要意义的站点重构工作的第一篇文章，内容涉及重构方法及重构收益。请阅读全文。

### 历史
Groupon刚开始只有一个页面，针对芝加哥地区的人每天显示一笔交易（deal）。典型的交易可能是当地餐馆的折扣，或者当地某个活动的门票。每笔交易都有一个临界点（Goupon称为“tipping point”），也就是最少购买人数，只有达到这个人数交易才算生效。例如，只有购买人数达到临界点，所有人才能享受到交易折扣，否则都不能享受折扣。

Groupon站点起初是一个Ruby on Rails应用。因为当时的开发团队很小，又希望尽快让网站运转起来，rails无疑是Groupon当初的最佳选择。除此之外，早期的Groupon一直在增强功能，使用rails能够快速实现新功能，这对于Groupon来说无疑是巨大的财富。

最初的rails架构非常简单：

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch.png)

然而很快，用单个rails应用加单个数据库集群已经无法支撑Groupon的流量需求了。因此Groupon增加了前端服务器和数据库，并且使用了CDN，将系统瓶颈转移到了读数据库操作。又因为订单处理需要读数据库，Groupon将订单处理任务以及相关的数据库集群功能从rails应用中拆分出来作为一个新服务。

Groupon按照这种模式将已有的后台功能拆分成新服务，然而站点的其他功能（视图，控制器，静态资源等等）仍然是rails应用程序的一部分。

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch2.png)

这种系统架构为Groupon赢得了时间，但也只是暂时的。那时的Groupon开发团队仍然较小，代码库仍然可控，站点不会在流量高峰时崩溃。

##### 全球化

接下来Groupon开始了全球化。很快，Groupon的运营从美国扩展到了48个不同国家。在全球化扩展的同时，Groupon收购了一些像[cityDeal](http://dealbook.nytimes.com/2010/05/18/groupon-makes-a-deal-for-citydeal/)这样的国际公司，这些公司都有自己的一套系统架构。

例如CityDeal，它的系统架构和Groupon类似，但完全由不同团队开发实现，系统设计和使用的技术也不相同。CityDeal使用的是Java而不是Ruby，服务器使用了Apache而不是Nginx，数据库用的是PostgreSQL而不是MySQL。

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch3b.png)

作为一家飞速增长的公司，Groupon需要做出一个艰难的抉择，或者放慢速度来对集成不同的系统架构，或者保留不同系统架构，以后再来还清这些“技术债”。Groupon选择了放弃系统集成来获取更快的业务发展。随着并购的增加，Groupon系统的架构也变得越来越复杂。

##### 移动

Groupon在iPhone，iPad，Android和Windows手机上都有客户端，显然，工程师们绝不会想为Groupon运营的每个国家再去单独开发一个手机应用。因此，Groupon在后端系统平台的顶部构建了一个API层，用户的手机客户端会连接到它所在国家的API端点。

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch4.png)

这样的设计对于Groupon手机开发团队很有用，它们只需要开发一个手机应用就能在Groupon运营的所有国家使用。

但这样做也有问题。Groupon每次创建一个新产品或者新功能，都需要先在WEB端开发，然后再构建一个API给移动端的新产品或者新功能实现使用，造成了重复劳动。

现在Groupon美国有[将近一半的业务在移动端](https://engineering.groupon.com/2013/misc/mobile-first-lessons-learned/)，开发工程师必须有“移动第一”的观念。相应的，Groupon也需要一套能够同时服务移动端和WEB端的后台系统架构以减少开发工作量。

##### 多个大型应用
随着Groupon继续增长和新产品发布，前端Ruby代码库也在变大。同时在一个代码库上开发的工程师变得非常多，甚至到了工程师想在本地运行应用都非常困难的地步。测试速度变慢和“诡异”的测试脚本也成了问题。而且因为是单个代码库，整个应用都需要一次性部署。如果因为线上问题需要回滚，每个工程师所做的修改都会被回滚掉，而不只是出问题的代码。简而言之，Groupon遇到了庞大的代码库带来的一切问题。

更糟的是，因为有美国和欧洲两套代码库，Groupon碰到的问题翻了一倍，对前端系统的彻底重构变得十分必要。

##### 完全重写
重构整个前端系统风险很大。需要多个角色花费大量时间投入，而且很有可能重构出来的新系统并不比旧系统好。更坏的可能是，花费的时间太长，中途而退，毫无建树。

但是Groupon过去对基础设施的部分重构非常成功。例如，Groupon对[移动站点](http://touch.groupon.com/)和[商家站点](https://www.grouponworks.com/merchant-resources/merchant-center)的重构都非常成功。这些经验为Groupon的整站重构开了好头，也为重构项目定下了清晰的目标。

*	目标1：前端统一

	在多个国家实现功能相同的多套系统会影响Groupon的速度。必须消除系统冗余。

*	目标2：mobile和web并驾齐驱

	Goupon在美国的业务有将近一半来自移动端。构建web和移动两个版本不可忍受。新的架构应该为web和移动客户端提供相同的API。

*	目标3：更快的网站

	为了满足站点的增长速度，Groupon的美国前端站点已经积累了不少阻碍网站优化工作的“技术负债”。Groupon需要精简请求代码的[简单解决方案](http://www.infoq.com/presentations/Simple-Made-Easy)。

*	目标4：去除团队之间的依赖

	Goupon刚上线时非常简单。但是现在Groupon在全球增加了许多新的产品线，这些产品线都有自己的支撑开发团队。通过单个代码库来去除这些产品团队之间的相互依赖，让各个产品开发团队能够快速独立构建和发布新功能。

**方法**
首先，Groupon将站点的主要功能拆分成了单独的web应用程序：

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch52.png)

Groupon使用Node.js创建了一套WEB应用框架，在里面集成了所有单个应用程序需要的通用功能，帮助简化了开发团队创建单个web应用时的任务量。

**为什么使用Node.js？**

在构建新前端层前，Groupon评估了几种不同的软件栈来决定那种方案最合适。

Groupon要解决的问题非常具体：有效处理大量传入的HTTP请求，为每个HTTP请求创建并行API服务，并将结果渲染成HTML。除此之外，还要有监控，部署和支持功能。

Groupon使用不同的软件栈写好了系统原型并进行测试。在本系列后面的文章里将会披露具体的细节。但是总体上来说，Groupon发现Node.js非常适合解决他们的问题。

**方法，继续**

接下来，Groupon在WEB应用框架上增加了一个路由层，根据用户正在访问的页面将请求转发到相应的应用程序。

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch6.png)

Groupon将这个路由层（Groupon Routing服务，简称Grout）实现为一个nginx模块，从而可以在不同服务器上对相同应用程序的不同实现进行A/B测试。

为了让这些独立的WEB程序无缝协作，Groupon还创建了页面结构、样式共享，通用配置维护，A/B测试效果管理等服务。更多关于这些服务的细节也会在以后披露。

前端层所有内容都放在API前面，并且不允许与数据库和后端服务直接对话。这样就创建了一个能够同时服务手机应用和WEB应用的联合API层。

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch7a.png)

Groupon目前正在统一后端系统，但是短期内还需要同时支持美国和欧洲的后端系统。因此，Groupon将前端软件栈设计成能够同时支持这两套后端系统。

![](https://engineering.groupon.com/wp-content/blogs.dir/3/files/2013/10/arch9b.png)

**结果**

Groupon刚刚结束将美国前端系统迁移到新的Node.js基础架构的工作。旧的庞大的前端应用被拆分成了大约20个分开的完全重写的web应用程序。Groupon服务器目前每分钟要处理50000个请求，并且预计在假日会增加几倍。如果完成48个国家的迁移后，这个数字还会滚上几番。

目前的收益有：
	*	页面加载全线变快——大约快了50%。部分因为技术变化，部分因为Groupon优化了页面大小。预计随着Groupon继续完成接下来的修改，还会有更加显著的优化。
	*	与旧系统栈相比，新系统栈服务相同流量使用的硬件资源更少。
	*	开发团队能够独立部署对应用的修改。
	*	整站功能、设计的修改更加快速。

总结起来，Groupon的这次迁移使得开发团队的页面发布更加迅速，依赖更少，移除了旧系统平台的性能限制。未来Groupon还会继续改进并将披露更多细节。

### 参考资料
<https://engineering.groupon.com/2013/misc/i-tier-dismantling-the-monoliths/>