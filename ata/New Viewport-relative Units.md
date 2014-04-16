【译】自适应网页开发--新的viewport相对单位(New Viewport-relative Units)
---
> CSS3为响应式设计引入了新的单位，包括:`vw`,`vh`以及`vmin`等，得到了大部分浏览器的支持和实现。使用这些新的单位，可以省去将`px`转换成`em`或者`%`的麻烦。更重要的是，这些新引入的单位为开发者和设计师们提供了有效的屏幕自适应解决方案。如果您已经对`em`和`rem`这样的相对单位非常熟悉，相信这些新的相对单位会为您在未来的动态布局工作中发挥必不可少的重要作用。

>	译者注，关于em和rem：
>	
>	1.[CSS中强大的em(链接)](http://www.w3cplus.com/css/px-to-em)  
>	2.[CSS3的REM设置字体大小](http://www.w3cplus.com/css3/define-font-size-with-css3-rem)  
>	3.pt--常用于打印设置，用得不多，有兴趣了解可参考[这里](http://www.1z1b.com/one-blog-a-week/px-em-pt/)

### **vw**,**vh**和**vmin**的使用
*	这些单位的用法非常简单直观，只要把他们看做当前视窗大小的1%就行了。所以浏览器视窗大小变化时，`vw`,`vh`和`vmin`的值也会自动变化成相对于当前视窗大小的值。与当前类似的解决方案`em`和百分比的不同之处在于，`vw`,`vh`和`vimin`可以不依赖父元素而仅仅基于当前视窗大小。

### `vm`
*	`vw`单位（viewport width）等于当前视窗宽度的1%。例如下面的代码示例中，如果当前视窗宽度为1000px，则`h1`的字体大小为`40px`（译者注：即**1000x4% = 40**）。
	<pre><code>h1 {
		font-size: 4vw;
	}
	</code></pre>

### `vh`
*	与`vw`类似，`vh`（即viewport height)，等于当前视窗高度的1%。如下代码所示，假设当前视窗高度为700，那么图片的最大高度为**175px**（也就是**700x25% = 174**)
	<pre><code>img {
		max-height: 25vh;
	}
	</code></pre>

### `vmin`
*	`vmin`即当前视窗高度的1%和当前视窗宽度的1%中的较小值。例如，假设当前视窗大小是1000px宽，700px高，则100vmin等于700px（译者注：即1000px和700px中的较小值**700x100% = 700**px）。
*	`vw`,`vh`和`vmin`可以用于任何元素，并且特别适用于文字，标题和布局（layout）。例如，在多列布局中，这几个单位可以用于保持文字的可读性。例如，可以为文字阅读区域设置相对高度，以保证在视窗高度变化时用户无需滚动也可以阅读到内容。
	<pre><code>section {
		height: 60vh;
		width: 60vw;
		column-width: 20rem;
		column-gap: 2.4rem;
		overflow: scroll;
	}
	</code></pre>
*	通过`overflow: scroll`属性，我们将阅读区域变成了横向滚动。可以参考这个[demo--有墙](http://dl.dropbox.com/u/5703076/viewport-example-multi-column.html)(译者注，可以参考[这里--没有墙](https://github.com/leoshawn/daily/blob/master/css/viewport-relative-units.html))。这种实现方式不需要进行媒体查询，也不要利用javascript检测视窗大小。

### 浏览器支持
*	译者注：最新支持情况，可以参考[这里](http://caniuse.com/viewport-units)。对于不支持的浏览器，记得使用回滚方案，例如：
	<pre><code>img {
		max-height: 175px;
		max-height: 25vh;
	}
	</code></pre>


### 参考文献
1.	[http://www.impressivewebs.com/understanding-em-units-css/](http://www.impressivewebs.com/understanding-em-units-css/)