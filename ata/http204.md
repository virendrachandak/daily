HTTP 204
---

>   打开fiddler，发现一个奇怪的请求响应状态码204，出于强烈的好奇心，搜索了解了下并整理成了下面的内容

### `HEAD`请求方法

在fiddler中查看到的一个典型的`HEAD`方法如下图所示：

![](http://www.telerik.com/automated-testing-tools/libraries/metabloglib/windows-live-writer-understanding-head-http204-and-http206_f0d4-image_20.sflb)

`HEAD`方法允许客户端从服务器端查询给定的资源，而不用实际下载。服务器返回的响应头信息和客户端使用`GET`方法发送请求收到的响应头信息相同，只是响应中省掉了body信息。

在上图中，我们可以看到，如果没有使用`HEAD`方法而是使用了`GET`方法的话，服务器会返回6623字节的响应信息。客户端也可以了解到这个URL对应的资源是`text/html`类型而且使用了`UTF-8`编码。客户端可以在决定如何处理某种类型的资源时使用`HEAD`请求来收集信息。例如，IE会为缺乏`type`参数的`object`元素发送`src`指定的`HEAD`请求。这样，IE就可以利用响应的`Content-Type`头信息来确定实例化哪种类型的`object`。

### HTTP/204响应

如图是一个HTTP/204响应示例:

![](http://blogs.telerik.com/images/default-source/teststudio-blog-posts/windows-live-writer-understanding-head-http204-and-http206_f0d4-image_9-png)

从图中可以看出响应的body为空（`Content-Length:0`），HTTP状态码的描述为`No
Content`。那么，为什么服务器不干脆返回body为0字节的HTTP/200响应呢？

在没有body返回的较多场景下，这样两个请求的响应状态码意义是相同的。但是存在
一种情况，如果用户正从一个浏览器窗口导航到一个`frame`或者`iframe`，那么HTTP/204的行为就完全不一样了。

* 如果跳转到一个返回0字节body，状态码为HTTP/200的URL地址，浏览器的`frame`会显示一个空白的文档。页面或者`frame`的URL会显示新的URL。

* 如果服务器返回HTTP/204，`frame`和`body`会保持不变--就像没有发生跳转一样。页面或者`frame`的URL地址也不会改变。

更加不常见的HTTP/205响应和HTTP/204做了同样的事情，唯一的不同是，205响应还会清除当前文档中的所有表单（`form`元素）已经填写的内容。

### HTTP/206响应

HTTP/206表示（`Partial Content`--部分内容）。发生的场景是在客户端只请求目标URL地址的部分资源时。例如客户端正在加载一个较大的二进制文件（例如加载视频或者PDF文件），从[不完整的下载](http://blogs.msdn.com/b/ieinternals/archive/2011/06/03/send-an-etag-to-enable-http-206-file-download-resume-without-restarting.aspx)中恢复。或者客户端尝试实现自己的[`bandwidth throttling`（带宽限制）](http://msdn.microsoft.com/en-us/library/windows/desktop/aa362708\(v=vs.85\).aspx)。

可以通过请求头中的`Range`来确定部分内容（`partial content`）请求。这个请求头的值指定了客户端需要请求body中的哪部分内容。

![](http://blogs.telerik.com/images/default-source/teststudio-blog-posts/windows-live-writer-understanding-head-http204-and-http206_f0d4-image_15-png)

例如上图表示客户端需要服务器端视频文件中172032到13325503字节之间的内容。

大部分情况下，客户端也需要发送一个用于标记服务器端期望使用的资源版本的请求头。在上图中为`ETag`，包含在`If-Match`头信息中。客户端还需要通过使用`If-Unmodified-Since`请求头来发送第一次请求的`Last-Modified`信息。

如果服务器发现客户端请求的资源版本和自己返回的资源版本不同，会返回HTTP/412响应（`Precondition Failed`）。如果客户端使用`If-Range`发送了`ETag`信息，而不是使用`If-Match`来发送的话，服务器在发现与客户端的`ETag`不匹配时会返回完整的请求body内容。使用`If-Range`请求头可以在客户端需要完整文件时节省一次网络请求。

服务器响应的`Content-Range`头部指明了发送的文件范围，而`Content-Length`头部指定了该范围所需文件的大小。例如：

![](http://blogs.telerik.com/images/default-source/teststudio-blog-posts/windows-live-writer-understanding-head-http204-and-http206_f0d4-image_18-png)

注意请求中的`Accept-Ranges`头表明客户端可以提前知道自己可以通过`Range`请求头来获取特定字节长度的内容。


### 参考资料
[Understanding HEAD HTTP/204 and HTTP/206](http://blogs.telerik.com/fiddler/posts/14-01-03/understanding-head-http-204-and-http-206)
[Download Resumption in Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/06/03/send-an-etag-to-enable-http-206-file-download-resume-without-restarting.aspx)

### `不完整的下载`

主要讲了IE的下载机制，它需要满足以下几点要求：

*   URL必须为HTTP或者HTTPS协议
*   服务器的响应头中没有`Accept-Ranges:none`
*   服务器请求中必须包含`StrongETAG`头信息
*   服务器必须接受在接下来的下载请求中包含`Range`头信息

下载恢复请求是通过发送包含了指定客户端当前拥有的资源版本的HTTP请求（通过`ETag`来标记）以及客户端需要服务器发送的文件的范围(`range`)来实现的。例如这样一个请求：

```
GET /BigFile.exe HTTP/1.1 
Accept: */* 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0) 
Host: 127.0.0.1 
**Range: bytes=700000- **
**If-Range: "StrongETAG" **
Connection: Keep-Alive
```

如果服务器允许恢复下载，会返回HTTP/206请求，并在头信息的`Accept-Ranges`中指定发送的文件范围。如果禁止或者不能恢复下载的话，会返回包含`Accept-Ranges:none`头信息的HTTP/200请求。在IE中，服务器还必须包含`strong Etag`。否则，IE下载管理器的暂停按钮会被禁用。除此之外，服务器还需要状态信息（例如Session Cookie或者HTTP验证--HTTP Authentication）来恢复下载，如果用户关闭浏览器再重新打开，丢失了这些状态信息的话，那么下载也不能恢复。

[About BITS](http://msdn.microsoft.com/en-us/library/windows/desktop/aa362708\(v=vs.85\).aspx)

### 关于BITS

BITS=Background Intelligent Transfer Service，直译过来就是`背景智能传输服务`(会意就好，不要穷扣翻译)用于客户端和服务器之间文件的异步传输。

有三种类型的传输任务（`transfer jobs`）。

* `download job`（下载文件到客户端的下载任务）
* `upload job`（上传文件到服务器的上传任务）
* `upload-reply job`（上传文件到服务器并且从服务器应用接受回复文件的上传回复任务）

BIT1.2及更早的版本不支持`Upload Job`和`Upload-reply Job`。

如果发起传输请求的用户仍然处于登陆状态而且网络连接没有断，那么BITS即使在应用退出后也会继续传输文件。BITS不会强制连接。

用户退出登陆或者网络连接断开时BITS会将传输挂起。BITS会在用户退出登陆、网络断开和计算机重启时仍然保持传输信息。

用户重新登陆后，BITS会恢复用户的传输任务。

BITS提供了一个前台和三个后台优先级。高优先级任务会抢占（preempt）低优先级任务。相同优先级的任务会共享传输时间（这样大文件传输不会堵塞传输队列中的小文件传输）。低优先级任务必须在高优先级任务完成或者出错时才会收到传输时间。
