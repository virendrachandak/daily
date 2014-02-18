深入了解cookie
---
### 获取cookie值
` allCookies = document.cookie; `

allCookies是由分号分隔的cookie键值对列表组成的字符串。

### 设置cookie值
` document.cookie = updateCookie; `

updateCookie是一个`key=value`形式的字符串。

>   Note:一次只能设置和更新一个cookie值。

*   以下cookie属性值都可以选择性遵循键值对形式，指定设置/更新的cookie值，并在cookie值前面加上分号分隔符。
    *   `;path=path`，例如**`/`，`/dir`**，如果没有指定的话，会默认为当前文档地址（**location**）的路径；
    *   `;domain=domain`，例如**`example.com`，`subdomain.example.com`**。未指定情况下为当前文档地址的host值；
    *   `;max-age=max-age-inseconds`，单位为秒，例如一年为**60\*60\*24\*365**
    *   `;expires=date-in-GMTString-format`，未指定情况下为session的过期时间；
    >   参考[Date.toUTCString()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toUTCString)了解GMTString格式字符串值。
    *   `;secure`，设置cookie只能通过HTTPS安全协议传输。
*   可以使用[encodeURIComponent()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent)来编码cookie值，保证cookie字符串不包含逗号、分号或者空白字符串等不允许在cookie值里出现的值。

### 示例

1.  简单用法

	```javascript
	document.cookie = "name=oeschger";
	document.cookie = "favorite_food=tripe";
	console.log(document.cookie);
	// name=oeschger;favorite_food=tripe
	```

2.  获取名称为test2的cookie值

	```javascript
	document.cookie = 'test1=Hello';
	document.cookie = 'test2=World';
	
	var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	
	console.log(myCookie);
	//  World
	```

3.  只执行一次

	```
	function executeOnce() {
	  var argc = argumens.length , bImplGlob = typeof arguments[argc - 1] === 'string';
	  if (bImplGlob) { argc++; }
	  if (argc < 3) { throw new TypeError("executeOnce - not enough arguments"); }
	  var fExec = arguments[0], sKey = arguments[argc - 2];
	  if (typeof fExec !== 'function') { throw new TypeError("executeOnce - first argument must be a function");); }
	  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { throw new TypeError("executeOnce - invalid identifier"); }
	  if (unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) === "1") { return false; }
	  fExec.apply(argc > 3 ? arguments[1] : null, argc > 4 ? Array.prototype.slice.call(arguments, 2, argc - 2) : []);
	  document.cookie = escape(sKey) + "=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=" + ((bImplGlob ? false : arguments[argc - 1]) ? location.pathname : "/");
	  return true;
	}
	```

### 参考资料
1.  [document.cookie--mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/document.cookie)
2.  [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web_Development/HTTP_cookies)
3.  [Cookies](https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Cookies?redirectlocale=en-US&redirectslug=Code_snippets%2FCookies)
4.	[http cookie](http://en.wikipedia.org/wiki/HTTP_cookie)
5.	[aboutcookies](http://www.aboutcookies.org/)
6.	[jquery cookie](https://github.com/carhartl/jquery-cookie)
7.	[all about cookies](http://www.allaboutcookies.org/cookies/)
8.	[Web Giants Threaten End to Cookie Tracking](http://online.wsj.com/news/articles/SB10001424052702304682504579157780178992984)
9.	[nsa-uses-google-cookies-to-pinpoint-targets-for-hacking/](http://www.washingtonpost.com/blogs/the-switch/wp/2013/12/10/nsa-uses-google-cookies-to-pinpoint-targets-for-hacking/)
10.	[HTTP cookies explained](http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)
11.	[cookie and security](http://www.nczonline.net/blog/2009/05/12/cookies-and-security/)
12.	[HTTP Cookies-MSDN](http://msdn.microsoft.com/en-us/library/windows/desktop/aa384321.aspx)
13.	[HTTP State Management Mechanism](https://www.ietf.org/rfc/rfc2109.txt)