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

<hr>

### Part 2

### 列表

*	markdown支持有序列表和无需列表。
*	无序列表使用星号（`*`）、加号（`+`）和短横线（`-`）表示，这三种符号可以互换。例如：

```javascript
* Red
* Green
* Blue
```

*	等同于：

```javascript
+ Red
+ Green
+ Blue
```

*	也等同于：

```javascript
- Red
- Green
- Blue
```

* markdown的有序列表使用数字加逗号表示，如下：

```javascript
1.	Bird
2.	McHale
3.	Parish
```

*	<b style="color:red;font-weight:1.1em;">重要：</b>请注意markdown中表示有序列表的数字大小对markdown实际输出的HTML没有影响。上面示例markdown输出的HTML内容为：

```html
<ol>
<li>Bird</li>
<li>McHale</li>
<li>Parish</li>
</ol>

```

*	因此，上面的markdown也可以写成：

```
1.	Bird
1.	McHale
1.	Parish
```

*	或者：

```
3.	Bird
1.	McHale
8.	Parish
```

*	上面的markdown都会输出完全相同的HTML内容。重点是，你可以使用有序的数字来输出有序markdown列表，这样输出的HTML列表数字也会是有序的。如果你想偷懒的话，也可以不适用有序的数字。
*	不过，如果想要偷懒的话，请记住第一个数字仍然需要从1开始。markdown未来或许会支持从任意数字开始列表。
*	列表标记通常从左边开始，可以使用最多3个空格缩进。列表标记后必须跟一个或多个空格，或者一个制表符。
*	要使得列表美观，可以使用悬挂缩进来包裹列表项，例如：

```javascript
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
```

*	当然，也可以偷懒写成：

```javascript
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
```

*	如果列表项采用了空行进行分隔的话，markdown会在HTML输出中加上`<p>`标签。例如：

```javascript
* Bird
* Magic
```

*	会输出成：

```html
<ul>
<li>Bird</li>
<li>Magic</li>
</ul>

```

*	而下面的markdown

```markdown
* Bird

* Magic
```

*	则会输出为：

```html
<ul>
<li><p>Bird</p></li>
<li><p>Magic</p></li>
</ul>

```

*	列表项可以有多个段落组成。列表相中的每个连续段落必须使用4个空格或者一个制表符来缩进。例如：

```markdown
1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.

```

*	可以缩进每行来保持美观，同样的，也可以偷懒，写成：

```markdown
*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.
```

*	要在列表项里加上引用的话，需要在引用的`>`分隔符前加上缩进，例如：

```markdown
*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.
```

*	要在列表项里加上代码块的话，需要对代码块使用两倍缩进--8个空格或者两个制表符：

```markdown
*   A list item with a code block:

        <code goes here>
```

*	值得指出的有可能会意外地触发有序列表输出，例如写成下面这样：

```markdown
1986. What a grea season.
```

*	换句话说，在行头的数字句号空格序列会被markdown输出成有序列表。可以使用反斜杠`\\`转义来避免这种情况：

```
1986\. What a great season.
```

### 代码块

*	预格式化的代码块用于书写编程语言或者标记语言源代码。代码块不会被格式化成普通段落，还是会被正常的解析。markdown使用`<pre>`和`<code>`标签来包裹代码块。

```markdown
This is a normal paragraph:
	
    This is a code block.
```

*	markdown会生成以下内容：

```html
<p>This is a normal paragraph:</p>

<pre><code>This is a code block.
</code></pre>
```

*	代码块的每一行都会减少一个缩进，例如下面的markdown内容：

```markdown
Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell
```

*	会输出为：

```html
<p>Here is an example of AppleScript:</p>

<pre><code>tell application "Foo"
    beep
end tell
</code></pre>
```

*	代码块会在没有缩进的那一行或者文章结束处终止

*	代码块里的`&`符号以及尖角括号`<`和`>`会被自动转换成html实体。这样可以轻松的使用markdown包含html源代码--只需要粘贴并且缩进就可以了，markdown会处理`&`和尖括号的自动转义过程。例如下面的html代码：

```html
<div class="footer">
	&copy; 2004 Foo Corporation
</div>
```

*	会变为：
```html
<pre><code>&lt;div class="footer"&gt;
    &amp;copy; 2004 Foo Corporation
&lt;/div&gt;
</code></pre>
```

*	代码块不会处理常规的markdown语法。例如，代码块里的星号只是星号。因此，也可以使用代码块来轻松地展示和书写markdown自己的语法。

### 水平标尺

*	可以使用3个或以上短斜杠，星号或者下划线来输出水平标尺标签`<hr>`。只要你愿意，可以在这些符号中加上空格。例如以下markdown：

```markdown
* * *
***
*****
- - -
_________________________
```

### span元素
##### 链接

*	markdown支持两种风格的链接：内联和引用。

*	两种风格的链接都需要使用方括号`[]`。

*	要创建一个内联链接，需要在链接文字的方括号后面加上一对括号`()`。在括号里是链接指向的URL地址，以及可选的链接title值，title值用引号包围。例如：

```markdown
This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.
```

*	会输出成：

```html
<p>This is <a href="http://example.com/" title="Title">
an example</a> inline link.</p>

<p><a href="http://example.net/">This link</a> has no
title attribute.</p>
```

*	如果需要引用相同服务器上的本地资源，可以使用相对路径：

```markdown
See my [About](/about/) page for details.  
```

*	引用型的链接会加上一组方括号，在方括号里放上用于标识链接的标记内容：

```markdown
This is [an example][id] reference-style link.
```

*	两组方括号之间可以选择性地加上一个空格：

```markdown
This is [an example] [id] reference-style link.
```

*	然后，可以在文档里的任何地方加上表示的内容，例如：

```markdown
[id]:http://www.example.com/ "Optional title here"
```

*	也就是：

	*	包含链接标识符的方括号（可以选择性地在左边加上最多三个空格来缩进）；
    *	加上一个冒号；
    *	一个活多个空格（或者制表符）；
    *	链接的URL地址；
    *	可以选择加上链接的title属性，使用双引号或者单引号，或者使用括号包围。
   
*	以下三个链接的定义是相同的：

```markdown
[foo]: http://example.com/  "Optional Title Here"
[foo]: http://example.com/  'Optional Title Here'
[foo]: http://example.com/  (Optional Title Here)
```

*	<b style="color:red; font-weight: bold; font-size: 1.1em">注意：</b>Markdown.p. 1.0.1有一个bug，不会解析使用单引号括起来的title值。

*	链接的URL值也可以使用尖括号包围，例如：

```markdown
[id]: <http://example.com/>  "Optional Title Here"
```

*	还可以将title属性写在新的一行并且使用多余的空格或者制表符来填满，这样在链接比较长时会比较好看，例如：

```markdown
[id]: http://example.com/longish/path/to/resource/here
    "Optional Title Here"
```

*	链接的定义只在markdown处理时使用，输出的HTML内容中不会包含链接定义。

*	链接定义名称可以包含字母，数字，空格和标点符号--但是不区分大小写。例如，下面的链接是相同的：

```markdown
[link text][a]
[link text][A]
```

*	隐性链接名称快捷方式可以允许用户省略掉链接名称，这种情况下链接会使用链接文字作为链接名称。使用空的方括号--例如，要将"google"连接到google.com，可以写成这样：

```markdown
[google][]
```

*	然后加上链接定义：

```markdown
[google]: http://www.google.com/ncr
```

*	因为链接名支持空格，因此，对于包含多个词的链接文字来说也同样适用，例如：

```markdown
Visit [Daring Fireball][] for more information.
```

*	链接定义为：

```markdown
[Daring Fireball]: http://daringfireball.net/
```

*	链接定义可以放在markdown文件的任何地方。例如：

```markdown
I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"
```

*	适用隐式链接名可以写成：

```markdown
I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"
```

*	以上markdown会输出相同的HTML内容：

```html
<p>I get 10 times more traffic from <a href="http://google.com/"
title="Google">Google</a> than from
<a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a>
or <a href="http://search.msn.com/" title="MSN Search">MSN</a>.</p>
```

*	而相应的使用markdown内联链接的写法为：

```markdown
I get 10 times more traffic from [Google](http://google.com/ "Google")
than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or
[MSN](http://search.msn.com/ "MSN Search").
```

*	引用型链接的优点不在于容易书写，而是更加可读。例如上面的例子，使用引用型链接段落只有81个字符；而使用内联型链接有176个字符。

*	引用型链接更加接近浏览器的输出。通过将与标记语言相关的元数据从段落中移出来，可以在文章里轻松地加上不影响阅读的链接内容。

### 强调




### 参考资料
1.	[英文原文](http://daringfireball.net/projects/markdown/syntax)
2.	[block-level elements](https://developer.mozilla.org/en-US/docs/HTML/Block-level_elements)
3.	[inline elements](https://developer.mozilla.org/en-US/docs/HTML/Inline_elements)
4.	[content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)
5.	[difference between block&inline](http://www.impressivewebs.com/difference-block-inline-css/)
6.	[http://dev.opera.com/articles/view/22-generic-containers-8212-the-div-and/](http://dev.opera.com/articles/view/22-generic-containers-8212-the-div-and/)