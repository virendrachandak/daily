Markdown语法[1/2]
---
> 原文地址:<http://daringfireball.net/projects/markdown/syntax>

#### TOC（文章目录，Table of Contents）
*	概述
	*	设计理念
	*	内联HTML
	*	特殊字符自动转义
*	块元素
	*	段落和换行
	*	标题
	*	引用
	*	列表
	*	代码
	*	水平线
*	span元素
	*	链接
	*	强调
	*	代码
	*	图片
*	其他
	*	反斜杠转义
	*	自动链接

---
### 概述
##### 设计理念
*	Markdown应易于读写并切实可用。
*	可读性最重要。使用Markdown格式化后发布的文档应该读起来和普通文本一样轻松，而不会看起来带上了太多格式化标签和内容。虽然Markdown的语法设计受到了许多已有文本HTML转换语法软件的影响，例如[Setext](http://docutils.sourceforge.net/mirror/setext.html)，[atx](http://www.aaronsw.com/2002/atx/)，[Textile](http://textism.com/tools/textile/)，[reStructuredText](http://docutils.sourceforge.net/rst.html)，[Grutatext](http://www.triptico.com/software/grutatxt.html)以及[EtText](http://ettext.taint.org/doc/)，但是Markdown语法参考最多的还是普通文本邮件的语法格式。
*	为了实现这一点，Markdown语法使用了经过仔细挑选、能够让人一看就明白他们所代表的意义的标点符号。例如：围绕文字的星号看起来像是*强调*。Markdown语法表示出来的列表看起来就是列表。甚至引用看起来也是对文字段落的引用，如果你曾经用过电子邮件的话。

##### 内联HTML
*	Markdown的语法设计只有一个目标：书写网页。
*	Markdown并不是为了替代HTML，也不能替代HTML。Markdown语法表示的意义相对于HTML标签表示的意义来说少了很多。Markdown的设计并不是为了减轻书写HTML标签的工作。在我看来，HTML标签的书写已经够简单了。Markdown的设计是为了使得读、写和编辑变得轻松。HTML是发布格式，而Markdown是书写格式。因此，Markdown语法只处理普通文本涉及的问题。
*	对于Markdown语法没有包含的标签，可以使用HTML来表示。不需要加上额外的前缀或者分隔符来表示Markdown到HTML的切换；完全可以直接使用HTML标签。
*	唯一的限制在于HTML中的块级元素，例如`<div>`，`<table>`，`<pre>`，`<p>`等在Markdown文件中必须使用空行分开，而且不要在这些块级元素的开始和结束标签上加上缩进或者空格。Markdown语法会“智能”地不在HTML块级元素标签上加上多余的`<p>`标签。
	>	译者注：[多余的P--from stackoverflow](http://stackoverflow.com/questions/10763780/putting-div-inside-p-is-adding-an-extra-p)。即，P标签里面只允许有Phrasing element（分局元素，如a，span，em等）或者普通的字符，而div并不属于这些被允许的内容。
	>	
	>	块级元素和inline元素:<http://dev.opera.com/articles/view/22-generic-containers-8212-the-div-and/>

*	例如：在Markdown里加入一个HTML表应该这样写：

	<pre><code>This is a regular paragraph.
	
	&lt;table&gt;
		&lt;tr&gt;
			&lt;td&gt;内容&lt;/td&gt;
		&lt;/tr&gt;
	&lt;/table&gt;
	
	This is a regular paragraph.
	</code></pre>


	>	译者注：请注意空行，而且**table**元素的开始和结束标签前面没有空格
*	请注意Markdown语法不能在HTML块级元素里使用。例如，不能在HTML块级元素里使用Markdown的强调语法<b style="color:red">\*强调\*</b>。

*	而span级元素，例如`<span>`，`<cite>`以及`<del>`，可以在markdown文件的任何地方使用，不能是markdown的段落、列表元素还是标题。甚至只要你愿意，你可以使用这些html元素而不是相应的markdown格式。例如，你可以使用html的`<a>`标签和`<img>`标签，而不使用相应的markdown语法格式。
*	与块级元素不同，markdown语法会处理span级元素的内容。
	>	译者注：按照理解，本文里所说的span级元素，就是不是块级元素的html元素。

##### 自动转义和特殊字符
*	HTML中`<`和`&`需要特殊处理。因为`<`表示HTML标签的开始，而`&`则用于表示HTML实体。在HTML中使用时必须将他们转换为相应的HTML实体。分别为`<`对应`&lt;`，而`&`对应`&amp;`。对于WEB写作者来说，这样的转义非常痛苦。例如`AT&T`必须写成`AT&ampg;T`。甚至连URL链接中的and符号也需要转义。例如，要想写这样的链接：
*	`http://images.google.com/images?num=30&q=larry+bird`
*	必须编码成：
*	`http://images.google.com/images?num=30&amp;q=larry+bird`
*	不用说，很容易忘记进行转义和编码处理，这是网站HTML语法验证不能通过最常见的错误之一。
*	而markdown让你可以很轻松自然地使用这些字符，并且在必要时进行转义。如果在HTML实体中使用and符号（`&`），它会显示成`&`，否则它会被显示成`&amp`。
*	因此，如果你想在markdown文件里加入一个版权符号，你可以写成：
*	`&copy`
*	markdown不会转义`&`，而如果你写的是：
*	`AT&T`
*	则markdown会自动转义成`AT&ampT`。
*	类似的，因为markdown支持内联html，如果你将尖括号作为HTML标签的分隔符使用，markdown会将他解析成HTML标签的一部分，而如果你写成：
*	`4 < 5`
*	markdown会自动将它在输出的HTML中转义成：
*	`４ &lt; 5`
*	在markdown里尖括号和and符号的转义都是自动的。这样你可以很轻松地写HTML代码。（和原生的HTML代码相比，因为你每次想写`<`或者`&`符号时都必须进行使用HTML实体来表示）。

### 块元素
##### 段落和换行
*	段落是由一个或多个换行符分隔开的一行或多行连续文字。（空行就是看起来是空的一行，没有任何内容，只有空白或者缩进）。普通段落不需要使用空格或者制表符（tab）来缩进。
*	“一到多行连续文字”意味着markdown支持“硬包裹”段落。这是markdown与大部分其他文字HTML转换器的显著不同（包括**Movable Type**的“转换换行符”选项，该功能会将所有段落的换行符转换成`<br>`标签）。
>	Movable Type:博客程序，具体可参考[Movable Type 是如何被 WordPress 超越的?](http://dbanotes.net/review/movable_type_wordpress_story.html)以及[Wordpress 和 Movable Type 的比较](http://www.ruanyifeng.com/blog/2007/04/wordpress_vs_movable_type.html)
*	而使用Markdown插入`<br>`标签，只需要在一行后面加上一个或者多个空格，然后回车就可以了。
*	确实，这样做比直接使用`<br>`要费力，但是简单的“使用`<br>`标签换行”规则并不适用于Markdown。Markdown的邮件风格[引用](http://daringfireball.net/projects/markdown/syntax#blockquote)和多行段落[列表项](http://daringfireball.net/projects/markdown/syntax#list)在硬换行下工作得更好，看起来也更美观。

### 头部
*	Markdown支持两种风格的头部:[Setext](http://docutils.sourceforge.net/mirror/setext.html)和[atx](http://www.aaronsw.com/2002/atx/)。
*	Setext风格的头部使用等号下划线的形式表示一级头部，短横线表示二级头部。例如：

```javascript
这是一级头部
===========
这是二级头部
-----------
```
*	`=`号和`-`号数目没有限制。

*	Atx风格头部是在每行开头使用1-6个井号（`#`）标明，分别对应1-6级头部。例如：

```
# 一级头部
## 二级头部
### 三级头部
```

*	可以根据自己的审美在行末加上或者不加相应的`#`号。行末`#`号的数目也不强制与行头的`#`号数目相同。（即行头的`#`号数目决定了这一行是几级头部）。例如：

```
# 一级头部 #
## 二级头部 ####
### 三级头部 ###
```

### 引用
*	Markdown使用邮件风格的`>`号字符表示引用的文字。熟悉在邮件中引用文字的读者应该知道怎样在markdown里创建引用。为了文字排版的美观最好在引用文字的每一行开头都加上`>`字符：

```
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing
```

*	markdown允许你偷懒，只在每一个硬换行的段落前加上`>`字符。例如：

```
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
```

*	引用支持嵌套（即在引用中使用引用），只要在加上一层`>`，例如：

```
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.
```

*	引用可以包含markdown元素，包括头部，列表和代码块，例如：

```
> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     return shell_exec("echo $input | $markdown_script");
```

*	所有好编辑器都支持邮件风格的引用。例如BBEdit支持为选中的文字增加“引用层级”。

### 参考资料
1.	[英文原文](http://daringfireball.net/projects/markdown/syntax)
2.	[block-level elements](https://developer.mozilla.org/en-US/docs/HTML/Block-level_elements)
3.	[inline elements](https://developer.mozilla.org/en-US/docs/HTML/Inline_elements)
4.	[content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)
5.	[difference between block&inline](http://www.impressivewebs.com/difference-block-inline-css/)
6.	[http://dev.opera.com/articles/view/22-generic-containers-8212-the-div-and/](http://dev.opera.com/articles/view/22-generic-containers-8212-the-div-and/)