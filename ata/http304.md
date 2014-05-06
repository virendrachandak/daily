理解HTTP304
---

HTTP/304表示`Conditional Validataion`（有条件的验证），即客户端资源拷贝仍然有效，因为客户端缓存了请求资源的拷贝，因此资源`Not Modified`(没有发生修改)。`Conditional Validation`可以让客户端确保拿到了最新的资源，而不用服务器每次再发送所有的资源。

### 确认条件请求(`Conditional Requests`)

条件请求中客户端为服务器提供了`Last-Modified`日期信息，用到了
`If-Modified-Since`请求头，以及缓存资源的`ETag`(使用`If-None-Match`请求头)。

服务器会验证这三个头信息来确认客户端缓存的内容是否为最新，如果确认为最新，会返`回HTTP/304 Not Modified`请求头并且忽略请求body内容。客户端就可以从它的缓存中重用请求的资源。否则，会通过`HTTP/200 OK`来发送新的请求body内容。

客户端只有在缓存了资源并且该资源缓存包含了`Last-Modified`或者`ETag`响应头时才能发送条件验证请求（`Conditional Validataion Request`）。如果这两个头信息都没有，那么必须无条件请求资源，服务器也必须返回完整的资源内容。


### 为什么要发送条件请求

条件请求可以在用户再次访问一个页面时提升性能（因为服务器可以不用再次传输所有的响应`body`内容），但是条件请求的开销在于客户端必须为每个资源生成一个条件请求并且等待服务器返回一个HTTP/304响应。理想情况下，服务器会遵循最佳实践并且在请求中[指定`Cache Control`或者`Expires`指令](http://blogs.msdn.com/b/ie/archive/2010/07/14/caching-improvements-in-internet-explorer-9.aspx)，这样客户端就可以知道资源的有效时间，从而跳过验证步骤，直接立即使用缓存的资源。然而，如果服务器提供了这些信息，条件验证在下面两种情况下仍然可能发生：

* 服务器指定的过期时间过了
* 用户刷新了浏览器

例如，在上面的请求中，我们看到浏览器发出了`Pragma:no-cache`请求头，暗示用户点击了`F5`来刷新页面。另一方面，如果用户使用`CTRL-F5`（有使用也叫做`hard refresh`强制刷新），浏览器会[忽略所有的`If-Modified-Since`和`If-None-Math`请求头](http://blogs.msdn.com/b/ieinternals/archive/2010/07/08/technical-information-about-conditional-http-requests-and-the-refresh-button.aspx)，并且无条件地请求所有资源。


#### 避免条件请求

缓存可以提升网站的性能，但是开发时需要强制刷新以看到最新的资源。在fiddler中，怎样避免304而获得200响应呢？

最简单的办法就是在fiddler的`session list`（会话列表）中选取某个HTTP/304请求并且按下`u`键，这样fiddler就会`无条件重发--Unconditionally Reissue`选中的请求。如下图可以看到fiddler忽略了发出请求的条件请求头信息：

![](http://www.telerik.com/automated-testing-tools/libraries/metabloglib/windows-live-writer-understanding-http304-responses_7479-image_13.sflb)

如果希望完全防止304，可以清除浏览器的缓存，快捷键一般都是`Ctrl+shift+delete`。清除缓存后，选中fiddler菜单中的`Rules>Performance>Disable Caching`。这样fiddler会将所有条件验证（`conditional validation`）请求头从请求中删除，并且将所有的`cache directives`（缓存指令,`Cache-Control`和`Expires`）从响应头中删除。除此之外，还会加上`Pragma:no-cache`请求头以及`Cache-Control:no-cache`响应头来防止使用缓存。

### 参考资源
[Understanding HTTP/304](http://blogs.telerik.com/fiddler/posts/12-11-05/understanding-http-304-responses)
[Caching Improvements in Internet Explorer 9](http://blogs.msdn.com/b/ie/archive/2010/07/14/caching-improvements-in-internet-explorer-9.aspx)

> 不要和http 403（Forbidden，禁止访问）请求搞混~
> 还有http 401是未授权，就是说你的用户名和密码输错了，这种情况下还是有些搞头的，呵呵
