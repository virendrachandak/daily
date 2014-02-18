HTTP Cookie详解
---
### [序]

作为一个程序员，面试时90%会被问到cookie和session的区别，但是我们到底有多了解
cookie呢。下面借助翻译nocolas c. zakas的[文章](http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)来一探究竟。

>   kissy的官方文档也推荐了这篇ncz的文章，但是没有找到相关的翻译文章，因此翻译一番。

我们常说的Cookie，其实指的就是HTTP Cookie。Cookie不好理解有两大原因，一类是误会，简单无知地因为Cookie的工作原理而将它当成间谍软件或者病毒；另一类原因是没有好的工具来对cookie进行操作。虽然对cookie的理解有很多误会，但是cookie仍然是web开发非常重要的组成部分，如果没有cookie的话，我们喜欢的许多网页应用都将无法使用。

##### Cookies的起源

WEB开发早期需要解决的一个大问题就是状态管理的问题。简而言之，就是服务器不知道两个请求是不是来自同一台浏览器。当时最简单的办法就是在请求页面上插入一个令牌（token）值，并且在返回的下一个请求里带上这个token。这种方法有两种实现，一是使用表单和隐藏域，在隐藏域里填好token值，另一种是将token拼接到请求URL的查询字符串里。这种方法非常耗费人力也容易出错。

[Lou Montulli](http://en.wikipedia.org/wiki/Lou_Montulli)，当时Netscape公司的员工，是将"[macigc cookies](http://en.wikipedia.org/wiki/Magic_cookie)"应用到WEB通讯上的功臣（1994年）。他当时要解决的问题是实现WEB上的第一辆“购物车”，这也是现在所有购物网站的重要功能。他当初的规范只提供了cookie工作方式的基本信息，这些内容在[RFC 2109](http://tools.ietf.org/html/rfc2109)(大部分浏览器实现都会参考这个规范)规范里被正式化并且最形成了[RFC 2965](http://tools.ietf.org/html/rfc2965)规范。Montulli因为cookie收货了一项美国专利。Netscape从它的第一个版本就支持cookie，现在所有web浏览器都支持。

>   这份最初的cookie标准标题为："Persistent Client State: HTTP Cookies"
>   [访问地址](http://curl.haxx.se/rfc/cookie_spec.html)

##### Cookies是什么？

非常简单，cookie是浏览器在用户机器上存储的一份小文本文件。Cookie的内容是纯文本，不包含可执行的代码。网页或者服务器发送指令存储cookie信息，并且根据一系列规则在后续请求里带上这些信息。WEB服务器可以使用这些信息来识别不同的用户。大部分需要登录的网站都会在用户身份得到确认后设置一个cookie值。这样，只要cookie值存在并且有效，用户就可以自动地浏览该站点。cookie只包含数据，不会对站点或者cookie自身有危害。

#####　cookie创建

web服务器通过HTTP请求头`Set-Cookie`指定要存储的cookie值。`Set-Cookie`请求头格式如下所示（方括号里的部分是可选的）：

```
Set-Cookie: value[; expires=data][; domain=domain][; path=path][; secure]
```

请求头的第一部分`value`为字符串，典型的内容格式为`name=value`。最初的规范也指定value要按照这样设置，但是浏览器对cookie值的验证并没有遵循这种格式。实际上，用户使用不带等号的字符串同样也能存储。不过，最普遍的用法是使用`name=value`来指定cookie指定（有的接口只支持这种形式）。

有cookie后，在可选值规则允许的情况下，cookie值会在后续请求中发送给服务器。cookie值存储在HTTP的`Cookie`头中，这个HTTP头信息只包含cookie值，不包含上述格式中的可选值部分。例如：

```
Cookie: value
```

使用`Set-Cookie`指定的选项只有浏览器能够使用并且在设置后不能撤销。cookie值就是使用`Set-Cookie`指定的字符串值，而且该值不会被编码或者编译。如果给定的请求有多个cookie，则使用分号和空格隔开，例如：

```
Cookie: value1; value2; name1=value1
```

服务器端框架一般都会提供解析cookie的功能函数，方便在程序中使用cookie值。

##### cookie编码

对于cookie值的编码存在一些概念混淆。通常认为cookie值必须使用URL编码值，虽然实际上浏览器实现都是这样做的，但这并不正确。初始规范之处只有3中字符必须编码：分号，逗号和空格。规范指出可以使用URL编码但是并非必须。RFC规范中并没有提到编码的事情。不过，几乎所有cookie实现都会对cookie值进行URL编码。例如`name=value`格式，`name`和`value`都会被编码。

##### 过期选项

cookie之后的选项使用分号加空格分开，这些选项指定了cookie传送回服务器时需要遵守的规则。第一个选项为`expires`，指明了cookie不再传回服务器，且浏览器应该删除cookie的时间。`expires`选项值的格式为日期格式(`Wdy,DD-Mon-YYYY HH:MM:SS GMT`)，例如：

```
Set-Cookie: name=Nicholas; expires=Sat, 02 May 2009 23:38:25 GMT
```

如果没有`expires`选项的话，则cookie过期时间为session过期时间。session在浏览器关闭时过期，因此session cookie仅在浏览器打开时存在。这也是为什么很多网站在登陆时都会提供“保持登陆”选项的单选框。该单选框被选中时，将会给登陆cookie加上一个`expires`值。如果`expires`选项被设为过去的日期，则cookie会被马上删除掉。

##### domain（域）选项

下一个选项为`domain`，指定了cookie将被发送到的域名。默认情况下，`domain`被设置为设置cookie页面的主机名，这样可以在向相同域名发送请求时传递cookie值。例如，[原文所在页面](http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)cookie的默认域名会被设为`www.nczonline.net`。`domain`选项用于扩大cookie值将会被发送到的域名数量。例如：

```
Set-Cookie: name=Nicholas; domain=nczonline.net
```

考虑下Yahoo！这样拥有许多`name.yahoo.com`等子域名的大型网站（例如
`my.yahoo.com`,`finance.yahoo.com`等等）。可以为所有这些站点设置一个cookie值，只需要将`domain`选项设置成`yahoo.com`。浏览器会从后往前检查请求发送的host值（主机名）和cookie的domain值，并在找到匹配时发送相应的`Cookie`头信息。

`domain`选项值必须是`Set-Cookie`头信息发送到的主机名的一部分。例如，在淘宝站点上不能设置cookie的domain为google.com，因为这样会引发安全问题。无效的domain选项会被忽略。

##### path（路径）选项

另一种控制`Cookie`头信息发送时间的方法是指定`path`选项。与domain选项类似，`path`选项指定了在发送`Cookie`头信息之前被请求资源中必须存在的URL路径信息。这种比较是通过从请求URL字符串开始一个字符一个字符与选项值进行对比完成的。如果字符串匹配的话，就会发送`Cookie`头信息。例如：

```
Set-Cookie: name=Nicholas; path=/blog
```

在上面的例子中，`path`选项会匹配到`/blog`，`/blogroll`这样的路径，所有以`/blog`开头的路径都是有效的。注意：这种比较匹配只会有一次，`domain`选项匹配生效即停止。`path`选项的默认值是发送`Set-Cookie`头信息的URL路径地址。

##### secure(安全)选项

最后一个选项是`secure`。与其他选项不同，这个选项是一个标记值，没有指定多余的值。有`secure`标记的cookie只能通过SSL和HTTPS协议传送。例如：

```
Set-Cookie: name=Nicholas; secure
```

实际中，机密或者敏感信息都不应该存储在cookie里或者使用cookie来传递，因为整个
cookie机制实际上是天生不安全的。默认情况下，通过HTTPS链接传输的cookie值都会被自动设为`secure`。

### Cookie维护和生命周期

一个cookie可以按任意顺序指定任意数量的选项值。例如：

```
Set-Cookie: name=Nichola; domain=nczonline.net; path=/blog
```

上面的cookie有四个标识特征：cookie名`name`，域名`domain`，路径`path`，以及安全`secure`标记。如果要修改这个cookie的值，需要使用相同的cookie名，域名和路径来传递`Set-cookie`头信息，例如：

```
Set-Cookie: name=Greg; domain=nczonline.net; path=/blog
```

这个头信息使用新值覆盖掉初始的cookie值。然而，如果修改掉其中任意一个选项的话，会产生一个完全不同的cookie，例如：

```
Set-Cookie: name=Nicholas; domain=nczonline.net; path=/
```

服务器返回上面的`Set-Cookie`头信息后，将会有两个名字为`name`的cookie。这是如果访问`www.nczonline.net/blog`上的页面的话，将会在请求中包含下面的头信息：

```
Cookie: name=Greg; name=Nicholas
```

头信息中有两个名为`name`的cookie，`path`更具体的cookie会被先一步返回。cookie字符串通常会按照`域名-路径-安全`(即`domain-path-secure`)从最详细到最不详细的顺序返回。假设我们在`www.nczonline.net/blog`目录，并且设置了以下使用默认设置的另一个cookie值：

```
Set-Cookie: name=Mike
```

返回的头信息将变成：

```
Cookie: name=Mike; name=Greg; name=Nicholas
```

因为值为`Mike`的cookie域（domain）为`www.nczonline.net`，路径为`/blog`，比其他cookie更加具体。

### 使用过期日期

如果cookie创建时加上了过期日期的话，与该cookie相关的过期日期会使用`名称(name)-域(domain)-路径(path)-安全标记(secure)`标识。要修改cookie的过期日期，必须指定完全一样的相同标识。在修改cookie值时，可以不必每次都设置过期日期，因为这不是标识cookie信息的一部分。例如：

```
Set-Cookie: name=Mike; expires=Sat, 03 May 2025 17:44:22 GMT
```

cookie的过期日期设置好后，下次想要修改cookie值时，只需要使用cookie名称就可以了：

```
Set-Cookie: name=Matt
```

这个cookie的过期日期还没有改变，因为cookie的标识信息没有改变。实际上，除非手动修改，否则过期日期不会改变。这意味着在相同的session里，session cookie可能会变成持久cookie（过期日期持续多个session），但是持久cookie不会变成session cookie。要将持久cookie修改为session cookie，必须通过将cookie的过期日期设置成过去的时间，然后再创建一个同名的session cookie。

请记住，过期日期是根据浏览器所在计算机的时间来确定的。没有拌饭来确认服务器时间和系统时间是否同步，因此如果系统时间和服务器时间存在差别的话会发生错误。

### cookie自动删除

浏览器自动删除cookie有几种原因：

    *   session cookie在session结束时（浏览器关闭时）自动删除；
    *   持久cookie会在过期日期自动删除；
    *   浏览器cookie限制达到时，cookie会被自动删除来为最近创建的cookie让出空间。更多详情，可以参考[cookie限制](http://www.nczonline.net/blog/2008/05/17/browser-cookie-restrictions/)

要避免以上cookie无意间被自动删除的情况，cookie管理非常重要。

### Cookie限制

对cookie的限制的是为了防止被滥用以及保护浏览器和服务器免受危害。有两种类型的限制：cookie数量和总的cookie大小。初始规范为每个域名下最多20个cookie，早期的浏览器以及IE7及以下都遵循这种规范。微软后来在某次升级时将IE7的cookie限制改为了每个域名50个cookie[详情](http://blogs.msdn.com/ie/archive/2007/08/29/update-to-internet-explorer-s-cookie-jar.aspx)。IE8每个域名也为50个cookie，firefox为50，Opera为30.Safari和Chrome对于每个域名下的cookie数量没有限制。

发送到服务器的所有cookie的最大值从初始规范至今都是4KB。超过4KB限制则会被裁切而不被发送到服务器。

### 子cookie

因为cookie数量的限制，开发者想到了使用子cookie来增加可以使用的cookie存储数量的方法。采用这种形式来创建cookie的劣势在于需要使用定制的解析方法来提取cookie值，而不能依赖更加简单的cookie格式。一些服务器端框架开始支持子cookie存储。[YUI Cookie](http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)(作者为NCZ本人)，支持使用JavaScript来读写子cookie。

>   子cookie最常见的格式为：
>   `name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5`

### JavaScript与Cookie

开发者可以使用`document.cookie`在JavaScript中创建、操作及删除cookie。cookie的赋值操作会写到`Set-Cooie`头信息中，而读操作则会被写到`Cookie`头信息中。在创建Cookie时，必须使用`Set-Cookie`所接受的相同格式：

```javascript
document.cookie = "name=Nicholas; domain=nczonline.net; path=/";
```

设置`document.cookie`值不会删除当前页面上存储的所有cookie，而只会创建或者修改字符串中指定的cookie。下一次发出到服务器的请求时，这些cookie也会和其他使用`Set-Cookie`头信息创建的cookie一起发送。这些cookie没有区别。

要使用JavaScript检索cookie值，只需要从`document.cookie`属性中读取就可以了。返回的字符串格式与`Cookie`头信息值相同，因此多个cookie会被分号和空格隔开。例如：

```
name1=Greg; name2=Nicholas
```

因此，需要开发者手动解析cookie字符串来提出实际的cookie数据。

>   可以参考"Professional JavaScript"(中文版译名为《JavaScript高级程序设计》)中的更详细内容。
>   可以使用[YUI Cookie untility](http://developer.yahoo.com/yui/cookie/)来操作cookie。
>   在我万能的淘宝，推荐使用万能的大KISSY库，它也提供了方便的cookie方法，[KISSY Cookie API链接](http://docs.kissyui.com/1.4/docs/html/api/cookie/index.html)

`document.cookie`返回的cookie值遵循从服务器端发送到浏览器的cookie所遵循的同样的规则。为了使用JavaScript来访问cookie，页面必须在相同的域，路径相同，而且cookie指定的安全级别也必须相同。

注意：使用JavaScript设置好cookie后不能看到它们的选项值，因此你不知道
`domain`,`path`,`expires`和`secure`的信息。

>   使用chrome开发者工具的resources可以查看到当前页面的所有cookie选项值。

### HTTP-Only cookie

微软在IE6 SP1版中为cookie引入了一个新的选项值：HTTP-Only cookie。HTTP-Only
cookie是为了禁止浏览器中的JavaScript代码通过`document.cookie`属性来访问cookie。这个功能是被设计成安全措施，来帮助防范跨站点脚本攻击（Cross-Site Scripting,简称XSS），这种攻击方法通过使用JavaScript盗取cookie来作恶。现在（2014年），所有浏览器都支持HTTP-only cooki。

要创建HTTP-only cookie，只需要在cookie中设置`HttpOnly`标记就可以了，如下所示：

`Set-Cookie: name=Nicholas; HttpOnly`

设置好`HttpOnly`标记后，就不能使用`document.cookie`来访问这个cookie值了。IE更进一步禁止`XMLHttpRequest`对象使用`getAllResponseHeaders()`和`getResponseHeader()`方法来访问cookie头信息。Firefox在3.0.6版本中修复了这个问题[详情](http://www.mozilla.org/security/announce/2009/mfsa2009-05.html)

不能使用JavaScript设置或者读取HTTP-only cookie。

### 总结

要有效使用cookie有许多知识需要了解。十四年（1999年）前创建的技术在今天仍然和当初实现时一样在得到使用确认非常令人惊讶。本文主要介绍了所有开发者需要了解的关于浏览器cookie的基础知识，内容并不全面。cookie是当今网络的重要组成，如果对cookie的管理不当的话，会引发从可怜的用户体验到安全漏洞等各种问题。
