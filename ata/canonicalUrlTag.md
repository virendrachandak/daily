`canonical` url标签
---

`canonical` `URL`标签，是从网站地图（`sitemap`）以来`SEO`最重要的进步。这个标签用于帮助网站管理员或者网站的拥有者消除索引中自我创建的重复内容。

### 如何操作？

用法如下所示：

```
<link rel="canonical" href="http://moz.com/blog" />
```

加上这个标签后，`Yahoo`，`live`和`google`会将页面当作`moz.com/blog`的拷贝对待，并且该页面上的所有链接和内容从技术上来说都应该链接回`href`指定的地址。如下图所示：

![](http://d1avok0lzls2w.cloudfront.net/img_uploads/canonical-url-tag.gif)

从`SEO`的角度看，`canonical` URL标签在很多方面类似于一个`301`重定向。本质上来说，这个标签是在告诉搜索引擎多个页面应该被当成一个页面来考虑（这是`301`所做的事情）。然而，两者的不同如下：

* 虽然`301`重定向会将所有流量重新定向（包括搜索机器人和人类访客），`canonical` url标签只用于搜索引擎，也就是说仍然可以把人类访客记录到唯一的`URL`版本。
* `301`信号比多个页面的单个`canonical`源要强。`canonical`有限制。内容分析和其他算法测量可以确保站点的拥有者没有错误地或者有意地使用这个标签，但是可以确定会看到对这个标签的误用，这样导致搜索引擎在他们的索引中会分开维护这些`URL`地址（即网站拥有者将会经历下面提到的问题）。
* `301`带有跨域功能，意味着可以从`domain1.com`重定向一个页面到
`domain2.com`并且带上这写搜索引擎度量值。而`canonical` URL标签**不会这样**，只能在单个根域下操作（可以跨越子文件夹和子域）。

### 何时、何地、怎样在`SEO`上使用这个标签？

过去，很多站点都遇到过多个版本相同内容在不同URL上的问题。这会导致三大麻烦：

1.  搜索引擎不知道应该在索引中包含和去除哪个版本。
2.  搜索引擎不知道是否将链接度量值（`trust`，`authority`，`anchor text`，`link juice`等等）导向一个页面，或者让它在多个不同版本之间保持分离。
3.  搜索引擎不知道用哪个版本（哪些版本）来为查询结果排序。

如果发生以上问题，站点拥有者会遭受排名降低和流量减少的损失，而搜索引擎结果的相关性也会降低。因此，为了修复这些问题，作为`SEO`和网站管理员，可以开始在如下场景中开始应用`canonical` URL标签：

![](http://d1avok0lzls2w.cloudfront.net/img_uploads/canonical-url-for-categorie.gif)

> 注释：目录`URL`系统创建了相同页面的多个版本。

![](http://d1avok0lzls2w.cloudfront.net/img_uploads/canonical-url-for-print.gif)

> 注释：仅用于打印的`URL`地址创建了相同页面的多个版本。

![](http://d1avok0lzls2w.cloudfront.net/img_uploads/canonical-url-for-sessionid.gif)

> 注释：会话ID的`URL`地址创建了相同页面的多个版本。

虽然以上示例代表了一些常见的应用，但是肯定还有其他，在大部分情况下特定于单个站点的应用。可以使用以上的`SEO`技巧来帮助确定是否需要使用`canonical`标签。

### 搜索引擎为`canonical` URL标签提供了什么信息？

实际上，提供了很多信息。可以查看[`Google`](http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html)的说明。

> `blogspot`地址，有墙。其实可以简单地通过google搜索关键词`google+canonical url tag`找到更多信息。

####  `rel="canonical"`是提示（`hint`）还是指令（`directive`）？

这是`google`搜索引擎非常看重的提示。`google`在计算与搜索内容相关性最高的结果页面时会考虑用户偏好以及其他信号。

#### 是否可以使用相对路径来指定`canonical`，例如`<link rel="canonical" href="product.php?item=swedish-fish">`？

可以，相对路径会被识别，`<link>`和`<base>`是允许的标签。此外，如果在文档中包含链接，相对路径会根据基础`URL`地址进行解析。

更多问题，可以参考`google`和`yahoo`的官方权威说明。

### 原文
[http://moz.com/blog/canonical-url-tag-the-most-important-advancement-in-seo-practices-since-sitemaps](http://moz.com/blog/canonical-url-tag-the-most-important-advancement-in-seo-practices-since-sitemaps)

### 更多内容

<a href="http://searchengineland.com/canonical-tag-16537">SELand</a>, <a href="http://www.searchenginejournal.com/top-3-search-engines-unite-on-canonical-url/8591/">SEJournal</a>, <a href="http://ysearchblog.com/2009/02/12/fighting-duplication-adding-more-arrows-to-your-quiver/">Yahoo!</a>, <a href="http://blogs.msdn.com/webmaster/archive/2009/02/12/partnering-to-help-solve-duplicate-content-issues.aspx">Live</a> &amp; <a href="http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html">Google</a>.

[http://www.mattcutts.com/blog/canonical-link-tag/](http://www.mattcutts.com/blog/canonical-link-tag/)
