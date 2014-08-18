WEB安全基础知识
---
###  服务器
#### 隐藏apache版本信息
编辑httpd.conf文件，加入以下两行内容:

```javascript
ServerTokens ProductOnly
ServerSignature Off
```
> 关于**Servertokens**和**Serversignature**的更多信息，请参考[这里](http://www.virendrachandak.com/techtalk/how-to-hide-apache-information-with-servertokens-and-serversignature-directives/)

#### 隐藏nginx版本信息
在nginx.confg文件中加入一行内容

`server_tokens off;`
> [参考链接](http://www.virendrachandak.com/techtalk/how-to-hide-nginx-version-number-in-headers-and-errors-pages)
> [windows版本nginx的基础使用说明](http://nginx.org/en/docs/windows.html)

#### 隐藏php版本信息
> 即隐藏response header中的**x-powered-by**信息

修改php.ini中的**expose_php**值为**Off**

> [参考链接](http://www.virendrachandak.com/techtalk/how-to-hide-php-version-in-the-http-headers)

####  x-xss-protection头信息
适用于IE8+
> [http://wangye.org/blog/archives/596/](http://wangye.org/blog/archives/596/)

> [stackoverflow](http://stackoverflow.com/questions/9090577/what-is-the-http-header-x-xss-protection)
> [http://blog.likelikeslike.com/posts/2013-06-23/chrome-defeat-xss-link.html](http://blog.likelikeslike.com/posts/2013-06-23/chrome-defeat-xss-link.html)
> [http://infoheap.com/bypass-xss-protection-by-browsers/](http://infoheap.com/bypass-xss-protection-by-browsers/)
> [http://www.tuxz.net/blog/archives/2012/08/19/improving_website_security_with_http_headers/](http://www.tuxz.net/blog/archives/2012/08/19/improving_website_security_with_http_headers/)
> [XSS Filter of IE 8](http://blogs.msdn.com/b/ie/archive/2008/07/02/ie8-security-part-iv-the-xss-filter.aspx)

#### 跟多关于X头的信息
> [参考链接](https://www.golemtechnologies.com/articles/x-headers)
> [http headers](http://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
)

#### .htaccess访问控制
> [参考链接](http://www.virendrachandak.com/techtalk/htaccess-tips)
> [隐藏敏感文件](https://www.golemtechnologies.com/articles/sensitive-files)
> [List_of_useful_HTTP_headers](https://www.owasp.org/index.php/List_of_usefu)

### XSS

#### 参考资料
[https://github.com/leizongmin/js-xss](https://github.com/leizongmin/js-xssl_HTTP_headers)
[http://drops.wooyun.org/tips/689](http://drops.wooyun.org/tips/689)
[http://drops.wooyun.org/tips/879](http://drops.wooyun.org/tips/879)
[hackyou2014 CTF web关卡通关攻略](http://drops.wooyun.org/tips/870)
[attacking mognodb](http://drops.wooyun.org/papers/850)
[bypass xss过滤的测试方法](http://drops.wooyun.org/tips/845)
[腾讯XSS实例](http://www.wooyun.org/whitehats/%E5%BF%83%E4%BC%A4%E7%9A%84%E7%98%A6%E5%AD%90)
[关于XSS（跨站脚本攻击）和CSRF（跨站请求伪造）](http://cnodejs.org/topic/50463565329c5139760c34a1)

> 本地文件：localhost/test/security/CTF/

### 参考资料
1.  [隐藏Apache服务器版本信息](http://www.virendrachandak.com/techtalk/how-to-hide-apache-information-with-servertokens-and-serversignature-directives/)

1.	[x-xss-Protection](x-xss-Protection)
>	[http://wangye.org/blog/archives/596/](http://wangye.org/blog/archives/596/)
2.	[http://stackoverflow.com/questions/9090577/what-is-the-http-header-x-xss-protection](http://stackoverflow.com/questions/9090577/what-is-the-http-header-x-xss-protection)
3.	[https://www.owasp.org/index.php/List_of_useful_HTTP_headers](https://www.owasp.org/index.php/List_of_useful_HTTP_headers)
4.	[http://133.52.240.75/index.php?xss=%22onclick%3D%22window.onerror%3Dconfirm%3Bthrow%201&submit=%E6%90%9C%E7%B4%A2](http://133.52.240.75/index.php?xss=%22onclick%3D%22window.onerror%3Dconfirm%3Bthrow%201&submit=%E6%90%9C%E7%B4%A2)
5.	[http://www.freebuf.com/articles/web/20282.html](http://www.freebuf.com/articles/web/20282.html)
6.	[http://huaidan.org/archives/597.html](http://huaidan.org/archives/597.html)
7.	[https://www.google.com.hk/search?q=%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB%E6%9C%89%E6%95%88%E8%BD%BD%E8%8D%B7%E6%88%96%E8%B4%9F%E8%BD%BD&oq=%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB%E6%9C%89%E6%95%88%E8%BD%BD%E8%8D%B7%E6%88%96%E8%B4%9F%E8%BD%BD&aqs=chrome..69i57&sourceid=chrome&espv=210&es_sm=122&ie=UTF-8](https://www.google.com.hk/search?q=%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB%E6%9C%89%E6%95%88%E8%BD%BD%E8%8D%B7%E6%88%96%E8%B4%9F%E8%BD%BD&oq=%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB%E6%9C%89%E6%95%88%E8%BD%BD%E8%8D%B7%E6%88%96%E8%B4%9F%E8%BD%BD&aqs=chrome..69i57&sourceid=chrome&espv=210&es_sm=122&ie=UTF-8)
8.	[http://www.myhack58.com/Article/html/3/7/2014/41886.htm](http://www.myhack58.com/Article/html/3/7/2014/41886.htm)
>	xss payload
9.	[http://www.hackdig.com/?01/hack-8115.htm](http://www.hackdig.com/?01/hack-8115.htm)
10.	[http://www.hackdig.com/?tag=XSS](http://www.hackdig.com/?tag=XSS)
11.	[http://www.hackdig.com/](http://www.hackdig.com/)
12. [https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet)
13.	[https://www.google.com.hk/search?q=xss&oq=xss&aqs=chrome..69i57j69i65l2j0l3.818j0j7&sourceid=chrome&espv=210&es_sm=122&ie=UTF-8](https://www.google.com.hk/search?q=xss&oq=xss&aqs=chrome..69i57j69i65l2j0l3.818j0j7&sourceid=chrome&espv=210&es_sm=122&ie=UTF-8)
14.	[http://www.cnblogs.com/TankXiao/archive/2012/03/21/2337194.html](http://www.cnblogs.com/TankXiao/archive/2012/03/21/2337194.html)
