通过HTTP头进行SQL注入
---


英文原文：SQL Injection through HTTP Headers
参与翻译(1人)：缪斯的情人
译文链接：http://www.oschina.net/translate/sql-injection-through-http-headers

在漏洞评估和渗透测试中，确定目标应用程序的输入向量是第一步。这篇文章解释了别人是如何通过HTTP头部对你的数据库进行SQL注入攻击的，以及讨论下选择哪种漏洞扫描器测试SQL注入。
作者：Yasser Aboukir, InfoSec Institute
在漏洞评估和渗透测试中，确定目标应用程序的输入向量是第一步。有时，当做web应用程序测试时，SQL注入漏洞的测试用例通常局限于特殊的输入向量GET和POST变量。那么对于其他的HTTP头部参数呢？难道他们不是潜在的SQL注入攻击输入向量吗？我们如何测试这些HTTP参数呢，以及使用什么样的漏洞扫描器查找出这些应用的漏洞呢？

web应用扫描器里输入参数的覆盖范围
通过对60个商业和开源的黑盒web应用程序漏洞扫描器的比较，发表了这样一篇文章：“扫描军团：扫描精度评估&功能比较”。这个主要用于测试商业和开源软件的urls漏洞的标准，已经被安全研究人员Shay Chen在2011年发布了。
对于测试web应用程序的扫描器支持输入参数覆盖的情况，我们已经总结在下面的图表中了。这些主要的输入是：
HTTP 查询字符参数（GET）：输入参数通过URL发送
HTTP 正文参数（POST）：输入参数通过HTTP正文发送
HTTP Cookie参数：输入参数通过HTTP cookie发送
HTTP Headers：HTTP提交应用程序使用的头
enter image description here
这个图表中明显的显示出，有75%的web应用程序扫描器不能发现HTTP Headers参数的相关漏洞。此外，这些扫描器中的70%，也错误的检查了HTTP Cookies漏洞。这些比例完全说明了这些扫描器在扫描输入向量方面的能力，而不只是简单的解释。对GET和POST的评分是比较合理的，一些自动化测试工具可能导致，在处理HTTP headers作为一个SQL注入输入向量时，出现不令人满意的结果。
enter image description here
实际上，HTTP Headers和Cookie没有得到重视。因此，这两个向量应该在测试用例中被考虑到。还有，当我们使用的漏洞扫描器不支持这些特征时，我们应该考虑手工测试这些参数。

潜在的HTTP头SQL注入 
HTTP头字段
HTTP头字段是超文本传输协议（HTTP）中请求和响应的部分信息，它们定义了HTTP传输的操作参数。
例如: 请求的 HTTP
GET / HTTP/1.1
Connection: Keep-Alive
Keep-Alive: 300
Accept:/
Host: host
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US;
rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16 ( .NET CLR 3.5.30729; .NET4.0E)
Cookie: guest_id=v1%3A1328019064; pid=v1%3A1328839311134
当我们把会话标识保存在数据库时，首先应该把HTTP Cookies作为首要潜在的HTTP变量进行测试。在后面我们将会看到一个使用Cookie进行SQL注入的实例。也有其他和应用相关的HTTP头信息。
X-Forwarded-For
X-Forwarded-For是HTTP头的一个字段。它被认为是客户端通过HTTP代理或者负载均衡器连接到web服务端获取源ip地址的一个标准。

我们来看一个基于表单提交漏洞的例子。
$req = mysql_query("SELECT user,password FROM admins WHERE user='".sanitize($_POST['user'])."' AND password='".md5($_POST['password'])."' AND ip_adr='".ip_adr()."'");
sanitize() 方法控制着登录变量的正确性。
function sanitize($param){ if (is_numeric($param)) { return $param; } else { return mysql_real_escape_string($param); } }
让我们检查下变量ip，它通过ip_addr()方法来得到输出的值。
function ip_adr() { if
(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) { $ip_adr = $_SERVER['HTTP_X_FORWARDED_FOR']; } else { $ip_adr = $_SERVER["REMOTE_ADDR"]; } if (preg_match("#^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}#",$ip_addr)) { return $ip_adr; } else { return $_SERVER["REMOTE_ADDR"]; } }
显然，ip地址通过HTTP头X_FORWARDED_FOR 得到返回值。之后，通过preg_match方法来验证是否至少存在一个合法的ip地址。事实上，在使用SQL查询前HTTP_X_FORWARDED_FOR 环境变量没有充分的过滤，这也就导致了在SQL查询时，可以通过这个字段注入任意SQL代码。
这个头字段可以像下面这样简单地修改:
GET /index.php HTTP/1.1
Host: [host]
X_FORWARDED_FOR :127.0.0.1' or 1=1#
这样的修改将会导致绕过安全认证。
User-agent
用户代理（user agent）是记录软件程序的客户端信息的HTTP头字段，他可以用来统计目标和违规协议。在HTTP头中应该包含它，这个字段的第一个空格前面是软件的产品名称，后面有一个可选的斜杠和版本号。
并不是所有的应用程序都会被获取到user-agent信息，但是有些应用程序利用它存储一些信息（如：购物车）。在这种情况下，我们就有必要研究下user-agent头存在的问题了。
HTTP查询实例：
GET /index.php HTTP/1.1
Host: [host]
User-Agent: aaa' or 1/*
Referer
Referer是另外一个当应用程序没有过滤存储到数据库时，容易发生SQL注入的HTTP头。它是一个允许客户端指定的可选头部字段，通过它我们可以获取到提交请求URI的服务器情况。它允许服务器产生一系列的回退链接文档，像感兴趣的内容，日志等。它也允许跟踪那些坏链接以便维护。
例如：
GET /index.php HTTP/1.1
Host: [host]
User-Agent: aaa' or 1/*
Referer: http://www.yaboukir.com

攻击者目的?
众所周知，注入漏洞位列OWASP十大web应用安全风险之首。攻击者越来越多的寻找你的数据库读写权限，无论这个注入点是向量输入类型，GET，POST，Cookie或者其他的HTTP头；对于攻击者重要的是，找到至少一个能够让他们深入利用的注入点.
手动测试Cookie漏洞
在这部分，我们将介绍下检查HTTP Cookie变量的几种方法。
使用浏览器插件
Cookie Manager+ 允许查看，编辑和创建新的cookies，它也提供显示cookies的一些额外信息，支持同时修改多个cookies，而且我们可以备份/恢复这些cookies。
安装之后，在工具菜单中选择Cookies Manager+，选择一个和目标应用有关的Cookie 变量。
enter image description here
我们来编辑下language_id这个变量，为了判断是否存在SQL注入漏洞，我们在字段后面添加个“'”。
language_id内容如下：
enter image description here
然后刷新页面，或者点击这个应用程序内部的其他链接，提交编辑后的HTTP cookie请求，返回结果出现一个SQL错误:
enter image description here
这个数据库错误提醒我们存在一个易产生SQL注入的漏洞。
Cookies Manager+ 优势是他非常易用，我们可以直接对cookie操作并且保存之前修改的cookie。
下面我们将尝试使用另一个Firefox插件，来检测目标的列数。
Tamper Data:
Tamper Data 是火狐下的一个非常强大的插件，它可以显示和修改HTTP/HTTPS头，以及POST参数。
安装之后，在工具栏菜单选择Tamper Data，点击按钮Start Tamper开始修改HTTP请求。
enter image description here
当目标应用程序发送任何请求时，Tamper Data都会弹出一个对话框询问我们是否想要干预当前HTTP请求。
enter image description here
点击Tamper后，将弹出一个Tamper详细窗口:
enter image description here
我们按上图显示的那样：添加order by 4到HTTP cookie变量。从应用程序返回的响应是正常的。

我们继续增加: order by 5. 这次注入的响应如下:
enter image description here
所以，我们能够推断出列数为4。
现在，为了在更多查询里注入，我们尝试找出受影响的列。因此，我们需要把下面的查询添加到HTTP cookie变量language_id里:
-1+UNION+ALL+SELECT+1,2,3,4
这个手段可能需要利用到一些高级的SQL注入技术。

使用自动化渗透测试扫描工具
以Sqlmap为例
Sqlmap 是一个流行的开源的自动化渗透测试工具。这个程序可以测试和利用SQL注入缺陷，并且可以接管数据库服务。
Sqlmap 支持HTTP cookie功能，所以它可以通过两种方式使用:
当web应用程序需要时，基于cookies的安全验证。
头值中SQL注入的检测和利用。
Sqlmap默认测试所有的GET参数和POST参数。当-level参数值设置为2或者更大时，它将测试HTTP Cookie 头值。当这个值设置为3或者更大时，测试也包含HTTP User_Agent和HTTP Referer头值。你也可以将你想用sqlmap测试的参数，用逗号分隔开进行测试，这样就会绕过对-level的依赖。
Tested HTTP parameter Level in sqlmap
GET 1 (Default)
POST 1 (Default)
HTTP Cookie 2 ?
HTTP User-Agent 3 ?
HTTP Referer 3 ?
例如，测试GET参数id和HTTP User-agent，只需提供-p id,user-agent参数。
下面这个例子演示了DVWA (Damn Vulnerable Web Application)的HTTP cookie中名为security的测试。
./sqlmap.py -u 'http://127.0.0.1/vulnerabilities/sqli/?id=1&Submit=Submit#'
--cookie='PHPSESSID=0e4jfbrgd8190ig3uba7rvsip1; security=low'
--string='First name' --dbs --level 3 -p PHPSESSID
-string标志比较注入时有效页面和无效页面。另一方面，-dbs标示用来枚举数据库管理系统。最后，-p标示用来表示强制测试PHPSESSID变量。
enter image description here

测试SQL注入的工具：通过精度选择还是向量覆盖率选择?
为了回答这个问题，我们使用了sectoolmarket.com网站提供的标准测试结果，我们先假设候选的扫描程序的测试精度和向量覆盖率有相同的重要性。我们将GET。POST，HTTP Cookie和HTTP Headers作为应该被支持的输入向量。当所有的参数都被支持时，这个扫描器的覆盖范围的比率为100%（4/4）。
我们建议使用下面的算术方程式，也就是说对于漏洞扫描器的得分求一个平均值。
然后从得到的检测准确率的百分比中，我们列出前14名的扫描器：
Rank Vulnerability Scanner Vendor Detection Rate Input Vector Coverage Average Score
1 Arachni Tasos Laskos 100.00% 100% 100.00%
2 Sqlmap sqlmap developers 97.06% 100% 98,53%
3 IBM AppScan IBM Security Sys Division 93.38% 100% 96,69%
4 Acunetix WVS Acunetix 89.71% 100% 94,85%
5 NTOSpider NT OBJECTives 85.29% 100% 92,64%
6 Nessus Tenable Network Security 82.35% 100% 91,17%
7 WebInspect HP Apps Security Center 75.74% 100% 87,87%
8 Burp Suite Pro PortSwigger 72.06% 100% 86,03%
9 Cenzic Pro Cenzic 63.24% 100% 81,62%
10 SkipFish Michal Zalewski – Google 50.74% 100% 75,37%
11 Wapiti OWASP 100.00% 50% 75.00%
12 Netsparker Mavituna Security 98.00% 50% 74.00%
13 Paros Pro MileSCAN Technologies 93.38% 50% 71,69%
14 ZAP OWASP 77,21% 50% 63,60%
我们可以通过对扫描器的扫描漏洞的精度和向量覆盖率取到的平均值，做出下面一个图表。
enter image description here
接下来做啥?
对于开发者
开发者应当把cookies和其他保存的HTTP头像表单输入一样对待，能通过常规的验证。
对于测试者
HTTP头的操作请求信息（尤其是REFERE和USER-AGENT）对于确认应用程序是否存在SQL注入漏洞或者其他缺陷（XSS）是非常重要的，最好的方法是在使用应用程序时定义和描述好每一种操作情况。这些数据可能被存储，提取和处理，像cookie,HTTP-headers（像HTTP_USER_AGENT）,form-variables（显示和隐藏），Ajax- ，JQusery-，XML-requests.
Yasser Aboukir 是INFOSEC机构的一个安全研究员. InfoSec Institute 是个提供CEH 认证和CCNA training训练的机构.
参考文献
1 Penetration Testing with Improved Input Vector Identification, William G.J. Halfond, Shauvik Roy Choudhary, and Alessandro Orso College of Computing Georgia Institute of Technology
2 Security Tools Benchmarking – A blog dedicated to aiding pen-testers in choosing tools that make a difference. By Shay-Chen http://sectooladdict.blogspot.com/2011/08/commercial-web-application-scanner.html
3 https://en.wikipedia.org/wiki/X-Forwarded-For
4 http://www.techbrunch.fr/securite/blind-sql-injection-header-http/
5 http://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#user-agent
6 http://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#z14
7 https://addons.mozilla.org/en-US/firefox/addon/cookies-manager-plus/
8 https://addons.mozilla.org/en-US/firefox/addon/tamper-data/
9 http://sqlmap.sourceforge.net/doc/README.html
10 http://msdn.microsoft.com/en-us/library/ms161953.aspx


### 参考资料
1.  [英文原文](http://resources.infosecinstitute.com/sql-injection-http-headers/)
