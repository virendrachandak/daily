`reflow` vs `repaint`
---

> 本文主要从`CSS`来叙述`reflow`和`repaint`对性能的影响。

性能优化实践者必须了解浏览器生产厂商给我们提供的黑盒（浏览器）中哪些内容与性能相关或无关。例如`Opera`之前曾经提供过一份列表，列出了造成`JavaScript`缓慢的三大原因中，`repaint`（重绘）和`reflow`（回流）分别占了两个席位：

> 原文给的链接已经找不到了，移到了[github这里](https://github.com/operasoftware/devopera-static-backup/blob/869f534aded1bade5d626af152c6aac36b4e8553/http/dev.opera.com/articles/view/efficient-javascript/index.html%3Fpage%3D3.html)

先了解下这两个概念：

`repaint`（重绘）：元素发生了可视的变化但不影响元素的布局（`layout`）。例如`outline`，`visibility`，`background-color`等样式的改变。根据`Opera`，`repaint`操作会比较费时，因为浏览器必须验证`DOM`树中所有其他节点的可见性。`reflow`对于性能更加关键，因为它包含了影响页面局部（或者整个页面）布局的修改。一个元素的`reflow`会引起它的所有子节点和祖先节点以及所有在`DOM`树中追随它的节点的一系列`reflow`。

例如：

```
<body>
  <div class="error">
    <h4>My Module</h4>
    <p>
      <strong>Error:</strong>
      Description of the error...
      <h5>Corrective action required:</h5>
      <ol>
        <li>Step1</li>
        <li>Step2</li>
      </ol>
    </p>
  </div>
</body>
```

在上面的`HTML`片段中，`<p>`的`reflow`会引发`<strong>`的`reflow`。因为`<strong>`元素是`<p>`元素的子节点。也会引起`<p>`元素的祖先元素的`reflow`（`div.error`和`body`，与浏览器有关）。此外，`h5`和`ol`元素也会回流，因为他们在`DOM`树中位于`p`元素后面。根据`Opera`的说明，大部分`reflow`都会引发页面被重新渲染：

```
Reflows are very expensive in terms of performance, and is one of the main causes of slow DOM scripts, especially on devices with low processing power, such as phones. In many cases, they are equivalent to laying out the entire page again.

回流对于性能影响非常大，也是`DOM`脚本缓慢的主要诱因之一，特别在处理能力弱的设备，例如手机上。许多情况下，他们相当于将整个页面重新布局。
```

### 那么，如果`repaint`和`reflow`是糟糕性能的主要原因，哪些情况会引起`reflow`呢？

有许多因素，其中一些与`CSS`有关的如下：

* `window resize`（窗口大小改变）；
* 字体改变；
* 添加或删除样式表；
* 内容改变，例如用户在输入框中输入文本；
* 激活`CSS`伪类，例如`:hover`（在`IE`浏览器上，启用兄弟节点的伪类）；
* 处理类的属性；
* 对`DOM`进行操作的脚本；
* 计算`offsetWidth`和`offsetHeight`；
* 设置样式属性。

[Mozilla之前的一篇文章介绍了`reflow`](http://www-archive.mozilla.org/newlayout/doc/reflow.html)

### 如何避免`reflow`或者至少最小化他们对性能的影响呢？

以下是与`CSS`相关的内容：

1.  修改希望改变样式元素的类（尽量在`DOM`树中靠后的位置修改）；
2.  避免设置多个内联样式；
3.  对`position`为`fixed`或者`absolute`的元素应用动画；
4.  用`流畅`（`smoothness`）来交换`速度`（`speed`）；
5.  避免使用`table`布局；
6.  避免在`CSS`中使用`JavaScript`表达式（仅限IE）。

### 尽量在`DOM`树中靠后的位置修改类

`reflow`可以是自顶向下，也可以是自底向上的，因为`reflow`信息会被传递到周围的所有节点。`reflow`是不可避免的，但是可以减少其影响。尽量在`DOM`树中较低的位置修改类从而限制`reflow`的范围到尽可能少的节点。例如，应该避免在包裹其他元素的元素上修改类，以避免影响其子节点的显示。面向对象的`CSS`通常尝试将类添加到他们所影响的对象（`DOM`节点或者节点），这样可以通过最小化`reflow`的影响来获得性能的提升。

### 避免设置多个内联样式

我们都知道与`DOM`的交互很慢。我们尝试将修改集合到一个可见的`DOM`树片段，然后再将整个修改应用到`DOM`树，从而只触发一次`reflow`。类似的，通过`style`属性设置样式会引发`reflow`。避免设置多个会引发`reflow`的内联样式，将这些样式组合到一个外部类可以在操作元素的类属性时只触发一次`reflow`。

### 对`position`为`fixed`和`absolute`的元素应用动画

对`position`为`fixed`和`absolute`的元素应用动画。他们不会影响到其他元素的布局，因此只会引发一次`repaint`而不是一次完全的`reflow`，这样的性能成本更低。

### 用“流畅”来交换“速度”

`Opera`还建议我们用“流畅”来交换“速度”。意思就是说你可能需要用动画一次移动一个像素，但是如果这个动画和随后的`reflow`会用到100%的CPU，那么动画看上去会有“跳帧”，因为浏览器需要很费力地更新页面流。如果一次将元素移动3个像素，动画的流畅度在非常快的机器上会降低一点点，但是不会在较慢的机器和移动设备上造成CPU超负荷。

### 避免使用`table`来布局（或者设置`table-layout`为`fixed`）

避免使用`table`来布局。`table`通常需要多轮才能完全确定布局。因为`table`中的元素是极少的可能会影响到`DOM`树中在它们之前出现元素显示的元素。想象在`table`底部的一个单元格有非常宽的内容，会引起这一列完全重新调整尺寸。这是为什么`table`在所有浏览器中都不是逐步渲染的原因，也是为什么`table`不适合用于布局的原因。`Mozilla`在[Notes on Reflow](http://www.mozilla.org/newlayout/doc/reflow.html)中也提到，即使小小的修改也会引发`table`中所有其他节点的`reflow`。

`YUI Data Table`组件的作者`Jenny Donnelly`推荐为`data tables`设置`fixed`布局，这样可以使得布局算法效率更高。为`table-layout`设置任何不为`auto`的值都会触发`fixed`布局，从而允许`table`逐行渲染表格（CSS 2.1规范）。`Quirksmode`也显示[`table-layout`属性的浏览器兼容性](http://www.quirksmode.org/css/tables.html#tablelayout)在所有主流浏览器上都很好。

[CSS2.1规范--`Fixed layout`](http://www.w3.org/TR/CSS21/tables.html#fixed-table-layout)

```
In this manner, the user agent can begin to lay out the table once the enrie first row has been received. Cells in subsequent rows do not affect column widths. Any cell that has content that overflows uses the 'overflow' property to determine whether to clip the overflow content.

这样，在收到第一个整行以后，用户代理就可以看是对`table`进行布局了。随后行的单元格不会影响列的宽度。有溢出内容的单元格会使用`overflow`来确定是否截断移除的内容。
```

[CSS2.1规范--`Automatic layout`]

```
This algorithm may be inefficient since it requires the user agent to have access to all the content in the table before determining the final layout and may be demand more than one pass.

这种算法可能效率不高，因为在确定最终的布局之前，用户代理需要读取表格中的所有内容，而且可能需要多次才能确定。
```

### 避免在`CSS`中使用`JavaScript`表达式

这是一条“老生常谈”但是仍然有用。表达式对性能影响大的原因在于它们在文档或者文档的局部`reflow`是都会重新计算。我们已经知道很多情况都会触发`reflow`，那么有可能会在一秒内触发上千次`reflow`。谨记！

### 更多的研究

`Yahoo!`卓越的性能团队跑了一个实验来确定引用外部样式表的最优方法。我们推荐在头部放链接，因为，虽然这种方法会慢一秒（6.3到7.3秒），其他所有方法都会阻塞逐步渲染。<p style="display: none;">虽然逐步渲染没什么可说的（用户讨厌看到空白的屏幕），但是我好奇的是渲染、重绘、回流以及相应的CPU负荷对于组件下载和总体相应事件的影响。如果我们可以减少加载时的`reflow`次数，我们也许可以找回丢失时间的十分之一（100ms）？如果能找回一半时间呢？</p>

在`Chrome`的`dev tools`中查看`repaint`的设置如下图所示：

![](http://gtms02.alicdn.com/tps/i2/TB1Ivk4FFXXXXXHaXXXkYSnGXXX-2872-1756.png)

### 查看`repaint`

> 自备小梯子

<ol>
<li><a href="http://www.youtube.com/watch?v=nJtBUHyNBxs">http://www.youtube.com/watch?v=nJtBUHyNBxs</a> </li>
<li><a href="http://www.youtube.com/watch?v=ZTnIxIA5KGw">http://www.youtube.com/watch?v=ZTnIxIA5KGw</a> </li>
<li><a href="http://www.youtube.com/watch?v=dndeRnzkJDU">http://www.youtube.com/watch?v=dndeRnzkJDU</a></li>
</ol>

### 疯狂的`reflow`

为了提升性能，浏览器厂商可能会尝试限制从相邻节点引发的`reflow`，或者将多次`reflow`组合成一个。这样做可以提升性能，但有时候也可能引起显示上的问题。可以在需要时使用我们学习到的`repaint`和`reflow`的只是来修改掉与之相关的显示问题。

例如，在[smush.it](http://smush.it)上切换标签页时，各个标签页之间的内容高度是不相同的。有时候切换时可能会有阴影，因为是当前内容上方的几个祖先节点被切换，但是它们的容器元素却没有`reflow`。如下图所示：

![](http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/smushit-reflow-problem/)

# 原文
[Reflows & Repaints: CSS Performance making your JavaScript slow? | Stubbornella](http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/)
[Efficient Javascript: Reflow | Opera](https://github.com/operasoftware/devopera-static-backup/blob/869f534aded1bade5d626af152c6aac36b4e8553/http/dev.opera.com/articles/view/efficient-javascript/index.html%3Fpage%3D3.html)
[Notes on HTML Reflow | Mozilla](http://www-archive.mozilla.org/newlayout/doc/reflow.html)
