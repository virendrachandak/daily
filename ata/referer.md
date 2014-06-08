`HTTP Referer`详解
---

> `HTTP Referer`是互联网上用于监控用户行为的重要工具之一，本文将从前端的角度尽量讲解它的原理和用法。本文想要解决这个问题：如何隐藏、删除或者伪造（`spoof`）请求中的`referer`信息。

### 什么是`HTTP Referer`？ 

`Referer`其实是一个拼写错误的单词，正确写法是`Referrer`，在`Document Object Model`中是正确的`Referrer`。它是`HTTP header field`的一个值，用于标记正在访问页面链接到的页面地址。通常，用户在点击页面上的链接时，会发送一个请求到服务器，这个请求头中包含了`referer` field`，即用户在访问当前页面之前的上一个页面地址。

`Refer`记录可以用于记录用户从哪些网址跳转到了当前页面，并用于促销和统计。

[`RFC 1945`](http://tools.ietf.org/html/rfc1945)中确定了`referer`的定义，但是因为当时的`Unix`拼写检查器没有检查出`referer`的拼写错误，因此也被计入了规范当中并且知道现在都在广泛使用。不过，在[`Document Object Model--文档对象模型`](http://en.wikipedia.org/wiki/Document_Object_Model)这样的规范中使用的是正确的拼写`referrer`。

### 用途

访问一个页面时，当前引用页面的`referer`是跳转到当前页面的上一个页面的`URL`地址。即，`referer`是本次请求的前一项请求的`URL`地址。例如，一张图片的`referer`通常是它所展示的`HTML`页面。`referer`是一个可选的`HTTP`请求域。

许多网站使用`referer`来追踪用户。大部分网站日志分析软件可以处理`referer`信息。因为对隐私的暴露，一些浏览器允许用户禁用或者不发送`referer`信息。[例如：`firefox`的设置](http://kb.mozillazine.org/Network.http.sendRefererHeader)一些防火墙和代理软件也会过滤掉`referer`信息以防泄露不公开的站点地址。但是，这样会引发一些问题。因为有些WEB服务器会在浏览器没有发送正确的`referer`信息时对内容进行屏蔽，以防止图片盗链（即[`bandwidth theft`](http://en.wikipedia.org/wiki/Bandwidth_theft)）或者[`deep linking`](http://en.wikipedia.org/wiki/Deep_linking)。一些代理软件可以自动将目标站点的顶级域名作为`referer`的值，这样通常可以避免以上的问题，也不会让用户从上次访问的站点分开。

> 所谓`deep linking`指的是不指向网站首页，而是指向网站具体内容的链接。`deep linking`可能会让用户跳过广告，损害网站的利益。[wikipedia](http://en.wikipedia.org/wiki/Deep_linking)

现在许多博客站点也开始发布`referer`信息以链接回与他们相连的用户，这种做法会导致[`referer spam`](http://en.wikipedia.org/wiki/Referer_spam)，即通过伪造`referer`信息来让自己的站点更受欢迎。有兴趣可以了解下[`refere spoofing`](http://en.wikipedia.org/wiki/Referer_spoofing)。

在`JavaScript`中通过`document.referrer`可以访问到`referer`信息。这可以用于对单个用户的搜索引擎查询进行个性化展示。然而，`referer`通常不包含查询内容，例如`Google的HTTPS搜索时`。

> [其他语言获取`referer`的方法](http://zh.wikipedia.org/zh-cn/HTTP%E5%8F%82%E7%85%A7%E4%BD%8D%E5%9D%80)

### `referer`隐藏

原理：通过代理服务器修改`HTTP`请求，将`referer`域用空白内容替换或者不准确的数据替换。

大部分浏览器在使用`refresh`域重定向时不会发送`referer`域信息。这是`W3C`的推荐做法，然而`Opera`的一些版本和许多移动浏览器都没有遵循。

如果一个站点是通过`HTTPS`协议访问的，那么这个站点的所有指向非`HTTPS`地址的链接都不会发送`referer`信息。也就是说，如果一个链接是`HTTPS`的，那它只会向也是`HTTPS`的链接发送`referer`信息。

> 规范中的原文:
> ```
>  Clients SHOULD NOT include a Referer header field in a (non-secure) HTTP request if the referring page was transferred with a secure protocol. 
>
> Authors of services which use the HTTP protocol SHOULD NOT use GET based forms for the submission of sensitive data, because this will cause this data to be encoded in the Request-URI. Many existing servers, proxies, and user agents will log the request URI in some place where it might be visible to third parties. Servers can use POST-based form submission instead 
> ```
> 第一句规定了不能在`HTTPS`到`HTTP`的连接中包含`referer`信息，后面一句解释了为什么表单提交必须用`POST`而不是`GET`方法。原因都相同，因为会在请求或者服务器的日志中暴露敏感信息。

`HTML5`规范支持`rel="noreferer"`属性值，以指示浏览器不要发送`referer`信息。

另外一种隐藏`referer`信息的方法是通过将原始链接的`URL`地址转换成基于[`Data URI`](http://en.wikipedia.org/wiki/Data_URI_scheme)的URL地址，并包含一个小的`HTML`页面，使用`meta refresh`来指向原始链接地址。用户在从`data:`页面被重定向时，原始的`referer`会被隐藏。

### 参考资料
[http://en.wikipedia.org/wiki/HTTP_referer](http://en.wikipedia.org/wiki/HTTP_referer)
[what is http referer](http://webdesign.about.com/od/loganalysis/a/aa100305.htm)
[防盗链设置中的空`referer`](http://kb.qiniu.com/52pw6cde)
[HTTP Referer二三事](http://www.fwolf.com/blog/post/320)
[RFC2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)
[will 302 redirect maitain referer?](http://stackoverflow.com/questions/2158283/will-a-302-redirect-maintain-the-referer-string)
[Using_referer_field_for_authentication_or_authorization](https://www.owasp.org/index.php/Using_referer_field_for_authentication_or_authorization)
<pre style="display:none">
[json hijack如何丢掉referer](http://zone.wooyun.org/content/744)
[新浪微博蠕虫](http://www.wooyun.org/bugs/wooyun-2013-019597)
[小米TOKEN劫持](http://www.wooyun.org/bugs/wooyun-2012-09986)
</pre>
