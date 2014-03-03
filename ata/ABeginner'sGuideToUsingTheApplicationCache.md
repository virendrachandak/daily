应用缓存新手指南
---
### 序

本周做了H5的性能优化工作，发现在3G网络下要下载一大堆assets文件会严重影响用户体验，如果能够将一些常用的资源缓存到用户手机，可以极大提升页面加载速度和增强用户体验，因此查阅并翻译了下面这篇文章。

### 介绍

离线可访问性对于基于WEB的应用来说变得越来越重要。的确，所有的浏览器都能够接收指令长期缓存页面和资源文件，但是浏览器也有可能随时清除缓存中的单个项目来为其他资源让出空间。HTML5使用了[应用缓存ApplicationCache](http://www.whatwg.org/specs/web-apps/current-work/#applicationcache)接口来处理离线问题。

使用应用缓存可以让应用拥有以下三大优势：

1.  离线浏览--用户离线时也可以浏览全站；
2.  速度--不用经过网络，直接从硬盘读取数据；
3.  弹性--即使站点因为“维护”原因挂掉（例如，有人不小心损坏了某些内容），用户仍然可以获得离线体验。

应用程序缓存（Application Cache，或者简称AppCache）允许开发者指定浏览器需要缓存且提供给离线用户使用的文件。即使用户在离线时点击了刷新按钮APP也能够正常地加载和使用。

### 缓存声明文件

缓存声明文件是一个列出了浏览器需要缓存供离线存取的资源列表的普通文本文件。

### 引用声明文件

要开启APP的应用程序缓存，需要在文档的`html`标签属性中加上`manifest`属性。例如：

```html
<html manifest="example.com">
<!--some content-->
</html>
```

每一个需要被缓存的WEB应用页面都需要加上`manifest`属性。如果页面不包含`manifest`属性的话浏览器不会进行缓存（除非在`manifest`文件中列了出来进行显示声明，这也意味着用户访问的任何页面，如果包含`manifest`属性就会被添加到应用缓存中）。因此，不必在`manifest`中列出所有页面，只要页面指向了`manifest`文件，就不能阻止该页面被缓存下来。

**注意**："/page-url"，"/page-url/?something"，"/page-url/?something-else"会被视为不同的页面。如果这些页面都链接到了manifest文件，都会分别被隐式地缓存下来。因为这点以及其他[原因](http://alistapart.com/article/application-cache-is-a-douchebag)，AppCache最好用于只有一个URL地址的app。

在Chrome里可以通过访问`chrome://appcache-internals/`来查看应用缓存的URL列表。也可以在这个标签页里清除缓存或者查看目录。Firefox里有[类似的开发者工具](http://flailingmonkey.com/application-cache-not-a-douchebag)。

`manifest`属性既可以指向URL绝对地址，也可以指向相对路径。但是URL绝对地址必须和WEB应用在同一个域下。manifest文件扩展名可任取，但是`mime-type`类型必须正确，请看下面的内容。

```html
<html manifest="http://www.example.com/example.mf">
</html>
```

>   `mime-type`--Multipurpose Internet Mail Extensions，详情请戳[这里](http://zh.wikipedia.org/wiki/%E5%A4%9A%E7%94%A8%E9%80%94%E4%BA%92%E8%81%AF%E7%B6%B2%E9%83%B5%E4%BB%B6%E6%93%B4%E5%B1%95)

manifest文件必须使用`text/cache-manifest`mime类型。开发者可能需要在WEB服务器上加入定制文件类型或者配置`.htaccess`文件内容。

例如，要让Apache服务器支持这种mime类型，需要在config配置文件中加入下面这行内容：

```
AddType text/cache-manifest .appcache
```

或者，在Google App Engine的`app.yaml`文件里添加如下内容：

```
- url: /mystaticdir/(.*\.appcache)
    static_files: mystaticdir/\l
    mime_type: text/cache-manifest
    upload: mystaticdir/(.*\.appcache)
```

对mime类型的要求来自于较早的规范，在最新版本的Chrome，Safari以及Firefox中都不再有此限制。但是如果需要支持较老版本的浏览器以及IE11的话，仍然需要mime类型。

### manifest文件结构

manifest文件是通过`manifest`属性链接到`html`元素上的独立文件。一个简单manifest文件如下所示：

```
CACHE MANIFEST
index.html
stylesheet.css
images/logo.png
scripts/main.js
http://cdn.example.com/scripts/main.js
```

上面的manifest示例会在所有指定了这个manifest文件的页面上缓存4个文件。

需要注意以下事情：

*   第一行必须为`CACHE MANIFEST`
*   文件可以来自不同域
*   有的浏览器会限制app可以使用的存储大小。例如Chrome浏览器的AppCache使用了与其他离线API共享的临时存储[共享池shared pool](https://developers.google.com/chrome/whitepapers/storage#table)。如果要写一款[Chrome Web Store](http://code.google.com/chrome/apps/docs/developers_guide.html)应用，可以使用`unlimitedStorage`来去除这个限制。
*   如果请求manifest文件返回404或者401响应，缓存内容会被删除。
*   如果下载manifest文件或者manifest指定的资源文件失败，整个缓存更新进程都会失败。浏览器在失败时会继续使用旧的应用缓存。

一起看看下面较复杂的例子：

```html
CACHE MANIFEST
# 2010-06-18:v2

# 显示缓存的'主目录'.
CACHE:
/favicon.ico
index.html
stylesheet.css
images/logo.png
scripts/main.js

# 需要用户在线的资源。
NETWORK:
*

# main.py无法读取时将会返回static.html
# 请求images/large/目录里的所有内容都会返回offline.jpg 
FALLBACK:
/main.py /static.html
images/large/ images/offline.jpg
```

以`#`开头的是注释行，不过也可以有其他意义。应用缓存只会在manifest文件改变时更新。因此，例如修改了图片文件，或者修改了JavaScript函数，这些改变都不会被重新缓存。<b style="color:red;font-weight:bold;">必须修改manifest文件通知浏览器刷新被缓存的文件。</b>

避免每次都使用持续更新的时间戳或者随机字符串来强制更新。更新时会检查manifest文件两次，即被缓存的文件更新开始和结束时各一次。如果manifest文件在更新时又发生了修改，浏览器可能会获取某些文件的一个版本，并获取另外一些文件的其他版本。这样会使得缓存内容和manifest不一致而重新尝试缓存。

虽然缓存更新了，浏览器只会在页面刷新完成时才使用缓存内容，因为更新发生在页面从当前版本的缓存中加载完成以后。

manifest文件有以下三节主要内容：`CACHE`，`NETWORK`，`FALLBACK`。

`CACHE`:
    目录的默认节。在该标题下列出的（或者`CACHE MANIFEST`后紧跟的）文件会在第一次下载完成后被显示地缓存起来。

`NETWORK`:
    这一节列出的文件如果存在缓存中，则即使用户在线也不会从网络获取，反之则会通过网络获取。可以在这里指定URL白名单，或者简单地通过`*`来允许所有URL地址。大部分站点都需要使用`*`。

`FALLBACK`:
    这一节是可选的，用于指定资源不可存取时的备用页面。第一个URI为资源，第二个URI是在请求失败或者出错时使用的备用页面。这两个URI必须和manifest文件来自同一个源。可以捕获特定URL或者URL前缀。例如`images/larg/`会捕获从`images/large/whatever/img.jpg`URL的请求失败。

**注意**：这些分节不分顺序，在一个manifest文件里每节都可以出现多次。

下面的manifest文件定义了一个在用户尝试离线访问站点根路径时显示的`catch-all`（捕获所有）页面（offline.html），并声明所有其他资源（例如远程站点上的资源）都需要有网络连接。

```
CACHE  MANIFEST
# 2010-06-18:v3

# 显示缓存目录
index.html
css/style.css

# 用户离线时显示的offline.html
FALLBACK:
/ /offline.html

# 所有其他资源都需要用户连接到网络
NETWORK:
*

# 需要缓存的其他资源
CACHE:
images/logo1.png
images/logo2.png
images/logo3.png
```

**注意**：引用了manifest的HTML文件会被自动缓存。虽然不必在manifest中加入这个HTML文件，但是建议最好这样做。

**注意**：通过SSL协议设置的HTTP缓存头以及页面缓存限制会被缓存声明（cache
manifest）覆盖。因此，通过HTTPS传输的页面可以离线使用。

### 更新缓存

应用在离线时会保持缓存状态直到以下两种情况：

1.  用户清除了站点的浏览器存储数据。
2.  manifest文件被修改。注意：更新manifest里列出的文件的内容并不意味着浏览器会重新缓存该资源。必须修改manifest文件。

### 缓存状态

`window.applicationCache`对象是访问浏览器应用缓存的编程接口。这个对象的`status`属性对于检查cache的当前状态非常有用。

```javascript
var appCache = window.applicationCache;

switch (appCache.status) {
    case appCache.UNCACHED: // UNCACHED == 0
        return 'UNCACHED';
        break;
    case appCache.IDLE: // IDLE == 1
        return 'IDLE';
        break;
    case appCache.CHECKING: // CHECKING == 2
        return 'CHECKING';
        break;
    case appCache.DOWNLOADING: // DOWNLOADING == 2
        return 'DOWNLOADING';
        break;
    case appCache.UPDATEREADY: // UPDATEREADY == 2
        return 'UPDATEREADY';
        break;
    case appCache.OBSOLETE: // OBSOLETE == 2
        return 'OBSOLETE';
        break;
    default:
        return 'UNKNOWN CACHESTATUS';
        break;
}
```

要通过编程的方法检查manifest文件的更新，先调用`applicationCache.update()`方法来尝试更新用户的缓存（需要修改过manifest文件）。最后，在`applicationCache.status`处于`UPDATEREADY`状态时，调用`applicationCache.swapCache()`方法来使用新的缓存交换旧的缓存。

```javascript
var appCache = window.applicationCache;
appCache.update();  // 尝试更新用户缓存。

if (appCache.status == window.applicationCache.UPDATEREADY) {
    appCache.swapCache();   // 获取成功，交换新缓存
}
```
**注意**：这样使用`update()`和`swapCache()`意味着在接下来的下载中会使用新缓存，但是用户这时可能已经下载了页面以及所有的资源，这些文件不会被自动重新加载。需要刷新页面来获取页面和资源的最新版本，而且不需要调用`swapCache()`方法。

好消息是这个过程可以自动化。要让用户更新到站点的最新版本，需要在页面加载时设置一个监听器监听`updateready`事件。

```javascript
// 在页面加载时检查是否有新缓存
window.addEventListener('load', function(e) {

        window.applicationCache.addEventListener('updateready', function(e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                // 浏览器下载了新的app缓存
                if (confirm('A new version of this site is available. Load it?')) {
                    window.location.reload();
                }
            } else {
                // manifest没有修改，服务器不更新
            }
        }, false);

}, false);
```

### AppCache事件

还有一些事件可以监听缓存状态。浏览器在下载，app缓存更新以及错误等情况下都会触发事件。下面的代码片段设置了所有缓存事件监听器：

```javascript
function handleCacheEvent(e) {
  //...
}

function handleCacheError(e) {
  alert('Error: Cache failed to update!');
};

// Fired after the first cache of the manifest.
appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
appCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener('progress', handleCacheEvent, false);

// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener('updateready', handleCacheEvent, false);
```

如果manifest文件或者指定的文件没有下载成功，整个更新都会失败。浏览器在失败时会继续使用旧的缓存。

### 参考资料
1.  [英文原文](http://www.html5rocks.com/en/tutorials/appcache/beginner/)
2.  [whatwg--application appcache](http://www.whatwg.org/specs/web-apps/current-work/#applicationcache)
3.  [application cache is a douchebag](http://alistapart.com/article/application-cache-is-a-douchebag)
４. [ApplicationCache API规范](http://www.whatwg.org/specs/web-apps/current-work/#applicationcache)
