浏览器XSS保护
---

> 本文起源于淘宝详情页一个接口的反射型XSS漏洞，目前已经被修复，因此扩展成了以下内容。
> 关于IE过滤器的内容比较老，最新的内容可以跟进下面提到的bug链接。

### IE8的XSS过滤器

IE8自带了跨站脚本攻击（Cross-site Scripting Attack）保护机制，被称为[XSS Filter（XSS过滤器）](http://blogs.msdn.com/b/ie/archive/2008/07/02/ie8-security-part-iv-the-xss-filter.aspx)。XSS过滤器默认在Internet、Trusted以及Restricted安全域（Security Zones）运行。Local Intranet（本地公司网络）也可以通过使用相同的请求头来选择开启保护：

`X-XSS-Protection: 1`

在检测到跨站点脚本攻击时，IE会尝试最小返回页面的修改，以阻止攻击行为。例如[这个例子](http://www.enhanceie.com/test/xss/)。大部分情况下，XSS过滤器会将返回页面中的一个或多个字符修改为井号（`#`），以阻止外发HTTP请求中可能反射的脚本执行。

> “反射”的具体意义如果不懂可以查看下文

那些通过服务器端逻辑对XSS进行了防范的页面可以使用如下的HTTP响应头来选择不启用浏览器的XSS保护：

`X-XSS-Protection: 0`

[2010年3月](http://www.microsoft.com/technet/security/bulletin/ms10-018.mspx)，IE8在`X-XSS-Protection`头中加入了一个新标记`mode=block`。

`X-XSS-Protection: 1; mode=block`

如果有这个标记，在检测到潜在的反射型XSS攻击时，IE会停止页面渲染。可以查看这个[示例](http://www.enhanceie.com/test/xss/BlockMode.asp)。在示例中，IE不会移除XSS攻击，而是会只选择出`#`字符。(这是被吐槽和abuse的点)

> [CVE-201001489](http://cve.scap.org.cn/CVE-2010-1489.html)

> 上面的两个例子在chrome和IE下都会被阻止，但是在firefox下会成功弹出alert窗口。那么，firefox难道没有xss保护吗？还有Chrome下的警告`The XSS Auditor refused to execute a script in 'http://webdbg.com/test/xss/Hello.asp?txtName=%3Cscript%3Ealert%28%22bang%21+script+injection%5Cn%22%2Bdocument.cookie%29%3B%3C%2Fscript%3E' because its source code was found within the request. The auditor was enabled as the server sent neither an 'X-XSS-Protection' nor 'Content-Security-Policy' header. `这是怎么回事呢？
> 可以留意下这个`XSS Auditor`。

### Firefox安全特性之XSS过滤器（XSS Filter）

Google一番找到了[这份文档](https://wiki.mozilla.org/Security/Features/XSS_Filter)。先看页面上的这块内容：

![](http://gtms02.alicdn.com/tps/i2/T1eu_aFK0dXXX0JePD-999-431.png)

可以看到状态为`In Progress`（进行中），`Status note`（状态笔记）为`Testing
feasibility`（测试可行性）

难怪上面的XSS测试在Firefox中能够执行了。

好吧，既然到了这个页面，就看看它的具体内容吧。

#### 阶段1：定义
1. 功能概述
本功能是提供对反射型XSS攻击的防护（反射型XSS攻击--通过在URL中插入脚本，有漏洞的页面会将URL的内容反射到另一个页面，在该页面上运行URL中插入的脚本内容）。因为插入的脚本运行在该页面所在域下，所以能够获取该域下的敏感信息（例如cookie）。过滤器就是要标记出从输入参数中（例如URL）生成的JS代码并且不允许这些内容在反射页面上执行。与其他过滤器不同的是，这个过滤器会考虑经过了任意变换的输入（使用子串近似匹配算法--approximate substring matching algorithm）以及插入已有脚本中的恶意代码。如下图所示：

![](http://gtms03.alicdn.com/tps/i3/T1PzzhFJdaXXbS.d6T-723-343.png)

上图展示了Firefox过滤器的工作方式。它紧密集成到Mozilla框架中，能够在调用JavaScript引擎时进行干预。调用JavaScript引擎的情况包括:

a. HTML引擎解析到了一个`<script>`节点，或者其他HTML结构；
b. JavaScript使用`eval`或者`setTimeout`等方法将字符串作为代码执行；
c. JavaScript使用DOM API来生成让解析器解析的新的HTML内容。

#### 不支持或者不会实现的目标（Non-goals）

*  不会阻止持久性（persistent）和注入型（injected）XSS攻击（只能防范反射型XSS）。
*  不能处理WEB应用采用的复杂字符串转换。这种情况下，Firefox的XSS过滤器将不能识别输入参数中的脚本并且会允许这些脚本运行。

####　其他

和其他浏览器XSS Filter的比较：

*   IE8:基于`regexps`，它实际上相当于一个代理（虽然存在于浏览器进程中），通过`mangle`的方式来阻止它认为恶意的脚本执行。这样的方式有可能影响页面剩余内容的解析。
>   `mangle`原意是“乱砍；轧布”，在这里应该是和`filter`相对的，形容IE8的XSS过滤器不太智能，有“一刀切”的倾向。
>   有兴趣了解`mangle`和`filter`区别的，可以参考[这篇文章](http://www.ibm.com/developerworks/cn/linux/network/s-netip/index.html)，即linux的iptables防火墙中`filter`和`mangle`等选项。

*   NoScript XSS过滤器：即火狐的[NoScript插件](http://noscript.net/)。但是Firefox的扩展接口不允许开发者操作脚本内容；因此，NoScript只能检测URL中可能为HTML或者JavaScript代码的恶意内容，而不能确认以及干掉页面上已有的恶意代码。

*   Chrome的XSS过滤器：webkit集成了一个被称为`XSSAuditor`的XSS过滤器。和IE8不同，这个过滤器真正紧密集成到了浏览器中，会干预JavaScript引擎的调用。这就能让Chrome轻松地清除恶意内容而且不用采取`mangling`的方式。过滤器也能更加准确地标记脚本内容。此外，Chrome的XSS Filter还能自动扩展对基于DOM的XSS攻击的保护。Firefox的过滤器就是基于这种设计。

#### 一些研究资料

*   Chrome XSS paper: Bates, D., Barth, A., & Jackson, C. (2010). Regular expressions considered harmful in client-side XSS filters. Proceedings of the 19th international conference on World wide web - WWW 2010 (p. 91). New York, New York, USA: ACM Press. doi: 10.1145/1772690.1772701.
*   BEEP (first solution to use JS interposition): Jim, T., Swamy, N., & Hicks, M. (2007). Defeating script injection attacks with browser-enforced embedded policies. of the 16th international conference on, 601. New York, New York, USA: ACM Press. doi: 10.1145/1242572.1242654.
*   Attack on IE8: Nava, E., & Lindsay, D. (2010). Abusing internet explorer 8's XSS filters. BlackHat Europe.
*   Implementation of the Approximate String Matching algorithm: Sekar, R. (2009). An efficient black-box technique for defeating web application attacks. NDSS 2010.

### 推荐！

[bug](https://bugzilla.mozilla.org/show_bug.cgi?id=528661)

>  一定要看一下！提到了IE8 XSS Filter引入的其他XSS漏洞（囧），XSS Auditor被hack，以及XSS Auditor的实现等，尤其注意里面给出的一些链接

### 懒人看这里

[XSS Auditor](http://www.collinjackson.com/research/xssauditor.pdf)
>  介绍Chrome使用的XSS Auditor原理设计的论文。原文题目《Regular Expressions Considered Harmful in
Client-Side XSS Filters》
>  分析了IE8，noXSS和NoScript。
>  IE8(通过utf-7编码内容注入来绕过)，因为IE8的XSS过滤器的正则表达式不会对这种编码的注入内容解码。
>  除此之外，这些过滤器还会给本来没有XSS漏洞的站点引入漏洞~~~~
>   这篇论文拿`openssl.org`来测试xss filter，现在看来，`heart bleeding...`

![http://gtms04.alicdn.com/tps/i4/T1kS6cFRpbXXb6UusF-860-418.png](http://gtms04.alicdn.com/tps/i4/T1kS6cFRpbXXb6UusF-860-418.png)

[xssed.com](http://xssed.com/)

### 结论

安全，任重道远！从好的编码习惯和代码风格做起

欢迎斧正！

#### XSS例子
[http://blog.securitee.org/?p=37](http://blog.securitee.org/?p=37)
[http://securitee.tk/files/chrome_xss.php?a=%3Cscript%3Evoid%28%27&b=%27%29;alert%281%29;%3C/script%3E](http://securitee.tk/files/chrome_xss.php?a=%3Cscript%3Evoid%28%27&b=%27%29;alert%281%29;%3C/script%3E)
[http://www.hackersonlineclub.com/cross-site-scripting-xss](http://www.hackersonlineclub.com/cross-site-scripting-xss)
[https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet)
[http://resources.infosecinstitute.com/using-x5s-with-fiddler-to-find-xss-vulnerabilities/](http://resources.infosecinstitute.com/using-x5s-with-fiddler-to-find-xss-vulnerabilities/)
[http://blog.securitee.org/?p=114](http://blog.securitee.org/?p=114)

[http://www.enhanceie.com/test/xss/](http://www.enhanceie.com/test/xss/)
[http://www.enhanceie.com/test/xss/BlockMode.asp](http://www.enhanceie.com/test/xss/BlockMode.asp)
[http://drops.wooyun.org/tips/956](http://drops.wooyun.org/tips/956)
