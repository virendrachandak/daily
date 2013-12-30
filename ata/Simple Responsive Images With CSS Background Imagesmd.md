使用CSS背景图片创建自适应图片的简单方法(Simple Responsive Images With CSS Background Images)
---
>	原文编辑注：除了本文提到的方法，还可以参考[How To Avoid Duplicate Downloads In Responsive Images](http://mobile.smashingmagazine.com/2013/05/10/how-to-avoid-duplicate-downloads-in-responsive-images/)以及[Choosing A Responsive Image Solution](http://mobile.smashingmagazine.com/2013/07/08/choosing-a-responsive-image-solution/)

*	目前基于HTML5标准中的`srcset`属性和`<picture>`元素，以及使用服务器端技术，例如[Responsive Web Design + Server Side Components(RESS)--自适应网站设计+服务器端组件](http://www.lukew.com/ff/entry.asp?1392)来解决网站图片自适应问题的众多演讲会让人误以为简单的静态服务器不能支持自适应图片。但是实际上，存在一种简单直接而且得到了目前所有浏览器支持的方法：CSS背景图片。
*	但是，这种方法存在限制，而且不一定有效。不过，如果您的需求不是特别复杂，而且愿意在图片可存取性上下功夫的话，CSS背景图片就能满足您的全部要求了。

*	**在本文中，我们将按如下步骤使用CSS背景图片：**

	1.	首先，回顾一下我们使用自适应图片的目标和要求；
	2.	其次，CSS媒体查询技术在帮助检测用户设备重要特性时的作用；
	3.	了解和探索如何使用CSS`background-image`属性来响应检测到的设备特征；
	4.	优化响应式设计中单张图片的策略；
	5.	本方法的不足之处以及相应的简单解决方法；
	6.	最后，我们将描述本方法不能解决的问题。
	>	本方法需要有对网站样式表以及HTML文件的控制权限。如果您的网站依赖于CMS（Content Management System，内容管理系统），那么可能不符合本文方法的要求。
### 自适应图片的需求
*	自适应图片是自适应网站设计（[Responsive Web Design--简称RWD](http://coding.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/)）的重要环节。自适应网站设计是[Ethan Marcotte](http://www.abookapart.com/products/responsive-web-design)开发的设计策略，应用于解决移动设备查看网页内容的问题。Ethan认为以前为每一种设备开发一个独立网站的方法并不是最佳实践，而且用户用于查看网页内容的设备种类非常繁多，这种“一对一”开发的方法很难解决问题。
*	RWD使用了一种完全不同的方法：只开发一个网站，但是让这个网站能够自动识别设备并且提供相应合适的内容展现。例如，为使用桌面浏览器访问网站的用户提供多列宽屏展现。而针对使用智能手机访问的用户，则重新调整内容，使他们能够在一列里展示出来。
*	很多情况下的自适应网站设计只实现了简单的网站布局和内容展现自适应。但这样其实还没有达到自适应设计的目标。
*	真正对用户设备的自适应需要在设计中考虑到用户体验的所有方面，而这些内容都包括图片。例如像[contfont.net](http://contfont.net/)这样一个真实的网站，包含了一张大图片和一套HTML页面、样式表、字体和javascript文件。

<table>
<tr>
	<td>资源</td>
	<td>类型</td>
	<td>压缩后的大小</td>
</tr>
<tr>
	<td>主页面</td>
	<td>HTML</td>
	<td>6KB</td>
</tr><tr>
	<td>样式表</td>
	<td>CSS</td>
	<td>10KB</td>
</tr><tr>
	<td>字体</td>
	<td>Web Font</td>
	<td>221KB</td>
</tr><tr>
	<td>脚本</td>
	<td>JavaScript</td>
	<td>21KB</td>
</tr><tr>
	<td>辅助图片</td>
	<td>图片</td>
	<td>48KB</td>
</tr><tr>
	<td>主站图片</td>
	<td>图片</td>
	<td>？？</td>
</tr>
</table>

*	这个网站在电脑上看起来很不错，因为它提供了一张高清像素（1940x1229）的大图片。而这张图片在压缩后的大小都有446KB。
*	当然，这个网站也可以像所有设备都提供这张图片，虽然这样做能够保持网站在所有设备上的视觉效果是一致的，但是对于移动设备来说，用户体验会变得非常差。
*	这里的问题在于，也许对于某种移动设备的手机来说，只需要290x183像素，18KB大小的图片，就能显示成和这张446KB的高清图片一样的效果。这也就意味着用户需要浪费429KB的流量来下载图片。除此之外，3G网络连接的速度和无线wifi或者有线网络连接比较都慢很多，这也就意味着手机用户需要花上更长的时间来等待图片下载完成。（译者注：译文有精简，详细对比和内容可参考原文）
*	响应式图片方法的主要目标就是：为用户提供合适的图片。

### 识别用户设备
*	CSS媒体查询可以解决两个关键问题：
	1.	用户显示屏幕的尺寸是多少？
	2.	用户的显示屏幕是否支持视网膜类型的图片？
*	CSS媒体查询（CSS Media Query）定义了一套只应用于特定设备的CSS样式属性并支持多种设备类型。例如：`braille`（braille触觉反馈设备），`speech`（语音合成器），`tty`（只支持等宽字体的设备，例如打字机）以及`tv`（像电视一样分辨率较低，没有滚动条的设备）。目前大部分浏览器支持的媒体类型是`print`（用于印刷）和`screen`（用于计算机屏幕）。
*	CSS3扩展了媒体查询的用途。例如，CSS3媒体查询支持指定设备属性。例如对于`screen`设备，CSS3允许制定与显示相关的属性，例如宽度，旋转方向，分辨率和像素值。这些信息可以帮助我们选择合适的响应式图片。
*	**CSS3媒体查询解决响应式图片的方法**：例如，一台15英寸的MacPro屏幕宽度为1440像素（先忽略视网膜显示）。要标注适用于这种尺寸（以及更大尺寸）屏幕的样式，我们可以使用一下样式：
<pre><code>@media only screen and (min-width: 1440px) {
	/* style for MacBook Pro-sized screens and larger */
}
</code></pre>
*	以上样式的内容只会应用在屏幕尺寸为1440像素的网页上。有一点需要注意的是，媒体查询的尺寸并不针对设备硬件，而是浏览器的视窗大小。视窗大小即浏览器窗口中显示页面内容的大小。
*	但是，除非用户使用全屏模式，否则浏览器视窗大小肯定会小于1440像素。因此更常见的是使用如下样式表：
<pre><code>@meida only screen and (min-width: 1200px) {
/* style for wide creen */
}
</code></pre>
*	媒体查询包括两部分：1.`only screen`，指定了样式应用的设备类型只是显示器（请注意`only`关键字）。第二部分是`min-width: 1200px`，指定了应用该样式的最小屏幕宽度。`and`表示只有这两部分条件都满足才会应用样式表里的内容。
*	同理，适用于智能机的样式为：
<pre><code>@media only screen and (max-width: 320px) {
	/* styles for narrow screens */
}
</code></pre>
*	`min-width`和`max-width`指定了样式表适用屏幕的最大和最小宽度。然而对于视网膜屏的显示器来说，问题并没有这么简单。首先，我们必须使用浏览器生产商的样式前缀，其次，Firefox的某些版本存在语法bug，对于Mozilla Firefox浏览器，我们必须同时使用fixed和broken语法。目前（20130722）推荐应用于视网膜屏幕的媒体查询样式写法如下所示：
<pre><code>@media
only screen and(-webkit-min-device-pixel-ratio: 2),
only screen and(min--moz-device-pixel-ratio: 2),
only screen and(-moz-min-device-pixel-ratio: 2),
only screen and(-o-min-device-pixel-ratio: 2),
only screen and(min-device-pixel-ratio: 2),
only screen and(min-resolution: 192dpi),
only screen and(min-resolution: 2dppx) {
  /* styles for Retina-type displays */
}

</code></pre>
*	浏览器最终都支持标准的`dppx(dots per pixel)`时，我们就可以不使用浏览器厂商前缀了。

### CSS背景图片属性
*	了解使用CSS媒体查询标注用户设备的方法后，我们可能会觉得自适应图片会很轻松。一种合理的方法就是在我们不想要下载的图片上加上`display: none`属性。以下是一种严格按照屏幕尺寸来支持自适应图片的方法：
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
	&lt;head&gt;
		&lt;meta charset="utf-8"&gt;
		&lt;title&gt;&lt;/title&gt;
		&lt;style&gt;
		img.smallscreen { display: none; }
		@media only screen and (max-width: 320px) {
			img { 
				display: none; 
			}
			img.smallscreen { 
				display: inline; 
			}
		}
		&lt;/style&gt;
	&lt;/head&gt;
	&lt;body&gt;
		&lt;img src="largeimage.jpg"&gt;
		&lt;img class="smallscreen" src="smallimage.jpg&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code></pre>
*	上面的代码会显示合适的图片，但是问题在于，`display: none`属性并不会阻止浏览器下载图片。智能手机上的浏览器仍然会下载大图片。
*	以上问题的原因在于浏览器会分开处理HTML代码和CSS代码。HTML标记文件中指明了请求两张图片，所以浏览器会尽忠职守地去下载两张图片。下载完毕后，浏览器才应用CSS样式，隐藏其中的大图片。
*	我们的媒体查询方法似乎只适用于CSs属性而不是HTML内容。虽然看上去不可能，但是一种狡猾的只为图片使用CSS的方法就是使用`background-image`属性。下面是我们的具体方法：
	1.	不在HTML标记文件中引用任何图片。而是使用`<div`>或者`<span`元素；
	2.	在空`<div>`和`<span`中设置`background-image`属性；
	3.	使用媒体查询来根据屏幕尺寸和像素替换图片。
*	将上面的代码按照我们刚才的具体做法修改后如下所示：
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
	&lt;head&gt;
		&lt;meta charset="utf-8"&gt;
		&lt;title&gt;&lt;/title&gt;
		&lt;style&gt;
		#image { 
			background-image: url(largeimage.jpg); 
		}
		@media only screen and (max-width: 320px) {
			#image { 
				background-image: url(smallimage.jpg); 
			}
		}
		&lt;/style&gt;
	&lt;/head&gt;
	&lt;body&gt;
		&lt;div id="image"&gt;&lt;/div&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code></pre>
*	上面的代码展示了使用CSS背景图片支持自适应图片的方法。在实际应用中，还需要更多的代码（例如，需要制定图片大小）。

### 制作响应式图片
*	略

### 克服使用背景图片方法的限制
*	为`<img>`标签加上`alt`属性
*	[一种自动拉伸图片的方法](http://heygrady.com/blog/2012/05/25/responsive-images-without-javascript/)
<pre><code>&lt;div style="width: 400px"&gt;
	&lt;span id="image"&gt;&lt;/span&gt;
&lt/div&gt;
</code></pre>
*	例如如上代码，要让图片自动适应div元素，可以用如下css代码：
<pre><code>#image {
	display: inline-block;
	width: 100%;
	font-size: 0;
	line-height: 0;
	vertical-align: middle;
	background-size: 100%;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	background-image: url(image.jpg);
}
</code></pre>
*	以上代码仍然没有指定span的高度，因此，因为span内容为空，其高度为0.
*	我们可以改写以上html代码：
<pre><code>&lt;div style="width:400px"&gt;
	&lt;span id="image"&gt;
		&lt;span id="image-inner"&gt;
	&lt;/span&gt;
&lt;/div&gt;
</pre></code>
*	对新加的span使用如下样式：
<pre><code>#image-inner {
	display: block;
	height: 0;
	padding-top: 63.3%;
}
</code></pre>
*	完整代码如下
*	html代码：
<pre><code>&lt;div class="hero"&gt;
	&lt;span id="cafe" role="img" aria-label="Coffee and croissant."&gt;
		&lt;span class="inner"&gt;
		&lt;/span&gt;
	&lt;/span&gt;
&lt;/div&gt;
</code></pre>
*	CSS样式代码
<pre><code>.hero #cafe {
	width: 100%;
	display: inline-block;
	vertical-align: middle;
	font: 0/0 serif;
	text-shadow: none;
	color: transparent;
	background-size: 100%;
	background-position: 50% 50%;
	background-repeat: no-repeat;
}
.hero #cafe .inner {
	padding-top: 63.35%; /* height/width of image */
	display: block;
	height: 0;
}
/* default screen, non-retina */
.hero #cafe { background-image: url("../img/candc970.jpg"); }

@media only screen and (max-width: 320px) {
    /* Small screen, non-retina */
    .hero #cafe { background-image: url("../img/candc290.jpg"); }
}
@media
only screen and (min-resolution: 2dppx) and (max-width: 320px) {
    /* Small screen, retina */
    .hero #cafe { background-image: url("../img/candc290@2x.jpg"); }
}
@media only screen and (min-width: 321px) and (max-width: 538px) {
    /* Medium screen, non-retina */
    .hero #cafe { background-image: url("../img/candc538.jpg"); }
}
@media
only screen and (min-resolution: 2dppx) and (min-width: 321px) and (max-width: 538px) {
    /* Medium screen, retina */
    .hero #cafe { background-image: url("../img/candc538@2x.jpg"); }
}
@media
only screen and (min-resolution: 2dppx) and (min-width: 539px) {
    /* Large screen, retina */
    .hero #cafe { background-image: url("../img/candc970@2x.jpg"); }
}
</code></pre>

### 潜在的问题
*	与语义化WEB（即将内容和表现分离）的现代网络标准相悖。
*	浏览器兼容性（例如IE8-）
*	检测用户设备存在问题，例如通过智能手机热点上网的笔记本

### 总结
*	译者总结，使用媒体查询，对特定尺寸的设备使用特定的元素背景图片来实现自适应图片。译者认为，对于本来就合适使用背景图片的页面来说，这并不相悖于内容与表现分离的网站设计。而且能够提升使用不同设备的用户访问网站的用户体验。适当使用，有益无害。

### 参考资料
1.	[原文](http://mobile.smashingmagazine.com/2013/07/22/simple-responsive-images-with-css-backgrounds/)
2.	[示例站点--contfont.com](http://contfont.net/)
3.	[示例站点的github源代码](https://github.com/sathomas/continental/tree/gh-pages)
4.	相关文章[1](http://coding.smashingmagazine.com/2013/06/02/clown-car-technique-solving-for-adaptive-images-in-responsive-web-design/)  [2](http://mobile.smashingmagazine.com/2013/01/09/bandwidth-media-queries-we-dont-need-em/)  [3](http://mobile.smashingmagazine.com/2013/07/08/choosing-a-responsive-image-solution/)
5.	[响应式站点设计使用的CSS流式图片技巧--CSS Fluid Image Techniques for Responsive Site Design](http://demosthenes.info/blog/586/CSS-Fluid-Image-Techniques-for-Responsive-Site-Design)
6.	[http://css-tricks.com/responsive-images-hard/](http://css-tricks.com/responsive-images-hard/)
7.	[http://css-tricks.com/which-responsive-images-solution-should-you-use/](http://css-tricks.com/which-responsive-images-solution-should-you-use/)
8.	[http://css-tricks.com/on-responsive-images/](http://css-tricks.com/on-responsive-images/)
9.	[http://www.hongkiat.com/blog/serving-responsive-images/](http://www.hongkiat.com/blog/serving-responsive-images/)

	>	使用calc css属性来自动计算图片尺寸

10.	[https://developer.mozilla.org/en-US/docs/Web/CSS/calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)
11.	[https://hacks.mozilla.org/2010/06/css3-calc/](https://hacks.mozilla.org/2010/06/css3-calc/)
12.	[http://www.qianduan.net/calc-at-at-at-page-intelligent-layout.html](http://www.qianduan.net/calc-at-at-at-page-intelligent-layout.html)

	>	创建不同大小的自适应图片

13.	[http://blog.cloudfour.com/sensible-jumps-in-responsive-image-file-sizes/](http://blog.cloudfour.com/sensible-jumps-in-responsive-image-file-sizes/)