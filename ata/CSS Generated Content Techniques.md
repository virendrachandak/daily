### [译]CSS生成内容技巧(CSS Generated Content Techniques)
> [原文链接](http://dev.opera.com/articles/view/css-generated-content-techniques/)

#### 简介
* CSS2.1为`:before`和`:after`这两个伪元素引入了`content`属性用于添加生成内容。目前，所有主要浏览器都支持这一特性。（具体包括Firefox1.5+，Safari3.5+，IE8+以及Opera9.2+和Chrome0.2+）。Opera9.5以上的版本不仅支持`:before`和`:after`这两个伪元素的`content`属性，也支持在其他所有元素使用`content`属性。
* [CSS3工作草案](http://www.w3.org/TR/css3-content/)中为`content`加入了更多功能。例如为文档加上尾注和脚注。
* 本文主要介绍了如何使用CSS来生成内容的基本知识和技巧。

#### 需要注意的几点
* 需要浏览器支持
* 只用于展示，不支持读屏软件

#### 生成内容--基础知识
* 用法如下：
<pre><code>h2:before {
  content: 'some text';
}
</code></pre>
  > 上面的代码将在每个`h2`元素前面加上**some text**
* 还可以使用`attr()`
<pre><code>a:after {
  content: attr(href);
}
</code></pre>

  > 上面的代码将在每个`a`元素后面加上**该元素的href值**
  > 请注意：使用`attr()`时属性名不需要加引号
* 使用`content`还可以生成动态数字或者插入图片（使用`url(path/to/file)`。请看如下实例：

#### 使用**counters**来为内容计数
* 假如你想在一系列元素前加上递增的值，例如："Question1","Question2","Question3"这样的内容。你可以使用**counter**来递增计数器的值并且使用**content**来进行展现。

<pre><code>ol {
  list-style-type: none;
  counter-reset: sectioncounter;  /*使用**counter-reset**将counter重置为1*/
}

li:before {
  content: "Chapter" counter(sectioncounter); /*content内容为ChapterX，其中X为递增的数值*/
  counter-increment: sectioncounter;  /*递增sectioncounter的值*/
}
</code></pre>

  > 请注意，设置css属性`display`为`none`时，将不会显示递增的内容。
  > 除此之外，请区分页面上装饰性的内容和有实际意义的内容。例如，“请参考ChapterX”这里的`ChapterX`就不适合使用CSS生成内容来实现。因为在不支持的浏览器上将不会显示，对页面内容有影响。

* [demo](http://devfiles.myopera.com/articles/1181/cssgendemo.html#counters)
* 更多关于使用content来自动计数的内容，请参考[这里](http://dev.opera.com/articles/view/automatic-numbering-with-css-counters/)

#### 为多语言内容插入正确的引号
* 不同语言使用的引号不同，英语使用的引号为**"**，例如：
<pre>“It’s only work if somebody makes you do it”</pre>
* 挪威语的引号如下所示：
<pre>«Hvis du forteller meg nok en vits, så skal jeg slå deg til jorden.»</pre>
* 不用将引号写死在HTML页面中，而可以采用`q`元素写成如下形式：
<pre><code>&lt;p lang="en"&gt;&lt;q&gt;It's only work if somebody makes you do it&lt;/q&gt;&lt;/p&gt;
&lt;p lang="no"&gt;&lt;q&gt;Hvis du forteller meg nok en vits, så skal jeg slå deg til jorden.&lt;/q&gt;&lt;/p&gt;
</code></pre>
* 相应的CSS内容为：
<pre><code>/*specify quotes for two languages*/
:lang(en) > q { quotes: '"'  '"' }
:lang(no) > q { quotes: "«" "»" }

/*Insert quotes before and after <q> element content*/
q:before { content: open-quote; }
q:after { content: close-quote; }
</code></pre>
  > 相关[demo](http://dev.opera.com/articles/view/css-generated-content-techniques/cssgendemo.html#quotes)

#### 使用图片代替文字
* 这里有[其他几种技巧](http://www.mezzoblue.com/tests/revised-image-replacement/)，使用`content`的方法为：
<pre><code>div.logo {
  content: url(logo.png);
}
</code></pre>
  > 这种做法的优点在于：能够使用图片替换掉文字而且不需要为图片设置高度和宽度，也不需要使用`padding`和`text-indent`来隐藏原始文字。
  > 缺点在于：
    1.  图片不能重复，也不能使用精灵图(image sprite)
    2.  只能在支持将`content`属性应用在所有元素上的浏览器上使用（Opera 9.5+，Safari 4+，Chrome）
    3.  不能使用`alt`文字，读屏器不能理解
* [demo地址](http://dev.opera.com/articles/view/css-generated-content-techniques/cssgendemo.html#imagereplacement)

#### 显示链接图标
* 使用属性选择器和`content`属性为链接显示相应的文件类型图标或者显示是否为外链
<pre><code>a[href $='.pdf']:after {
  content: ulr(icon-pdf.png);
}

a[rel="external"]:after { /* You can also use a[href^="http"]:after*/
  content: url(icon-external.png);
}
</code></pre>
  > CSS3选择器支持字符串匹配,`href $='.pdf'`的意思是匹配`href`属性值以`.pdf`结尾的所有链接。
  > CSS3选择器匹配支持正则表达式。`^`和`$`分别表示一个字符串的开始和结束。[CSS3属性子串匹配选择器](http://www.w3.org/TR/css3-selectors/#attribute-substrings)中的`[attribute^=value]`和`[attribute$=value]`分别匹配开头和结尾为制定值的属性值。而`[attribute*=value]`则匹配在属性值中任何位置出现了的元素。

#### 使用属性值作为生成内容
* `content: attr(val)`可以显示元素的某个属性值，这一点在实际中有很多用处，例如：
##### 在HTML的打印样式中显示URL和简写
* **A list Apart**上的[Going to Print](http://www.alistapart.com/articles/goingtoprint/)一文中提到了可以使用CSS生成内容来调整页面的打印样式。例如，下面的代码可以在打印页面上的链接后面跟上URL地址。
<pre><code>a:after {
  content: "(" attr(href) ")";
}
</code></pre>
* 还可以使用CSS生成内容来打印出`abbr`元素的全称。代码如下：
<pre><code>abbr:after {
  content: "(" attr(title) ")";
}
</code></pre>

#### CSS3中强大的`attr()`
* [CSS3 Values and Units--CSS3值和单位](http://www.w3.org/TR/css3-values/#attribute)(译者注：目前已经是推荐状态)扩展了`attr()`表达式的功能，除了返回字符串，还可以返回CSS颜色值，CSS整数，长度，角度，时间，频率和其他单位。
* 如何将CSS生成内容和定制data属性一起使用话，功能会非常强大，可以创建简单的图片、图片或者动画。例如，我们可以根据元素的属性值来设置背景颜色。这可以用于制作网页上的调色板。我们还可以根据定制data属性的值来指定元素的大小。例如，柱状图的高度可以使用代表该统计柱的元素属性来设置。
  > 具体实例可以参考这个[demo](http://operasoftware.github.io/devrel-misc/demos/dataset/)

#### 总结
* 译者注：原文写于2010年，当初的内容显得比较新奇，但是现在浏览器对于本文内容的支持已经差不多都实现了，可以用于除了IE8-之外的生产环境。

#### 参考资料
1.  [CSS content属性](http://www.w3school.com.cn/css/pr_gen_content.asp)
2.  [CSS :before伪元素](http://www.w3school.com.cn/css/pr_pseudo_before.asp)
3.  [CSS :after伪元素](http://www.w3school.com.cn/css/pr_pseudo_after.asp)
4.  [css3 content生成内容](http://www.w3cplus.com/solution/css3content/css3content.html)
5.  [Mozilla Developer Network-CSS Content](https://developer.mozilla.org/en-US/docs/Web/CSS/content)
6.  [CSS Tricks--CSS Content](http://css-tricks.com/css-content/)
7.  [Mozilla Developer Network-:after](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)
8.  [w3-css3 content](http://www.w3.org/TR/css3-content/)
9.  [automatic-numbering-with-css-counters](http://dev.opera.com/articles/view/automatic-numbering-with-css-counters/)
10. [Going to Print](http://www.alistapart.com/articles/goingtoprint/)
11. [CSS3 Values and units](http://www.w3.org/TR/css3-values/)
