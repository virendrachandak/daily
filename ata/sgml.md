SGML
---
# `W3.org`--`On SGML and HTML`（SGML和HTML）

## `SGML`介绍

`SGML`是一套用于定义标记语言的系统。作者通过表示结构化、表现化和语义化的信息及内容来标记他们的文档。`HTML`是标记语言的一个例子。下面是一个`HTML`文档的示例：

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<HTML>
<HEAD>
  <TITLE>My first HTML document</TITLE>
</HEAD>
<BODY>
  <p>Hello world!</p>
</BODY>
</HTML>
```

`HTML`文档被拆分成`head`（`<HEAD>`和`</HEAD>`标签对之间的内容）和`body`（`<BODY>`和`</BODY>`之间的内容）。文档的标题出现的`head`（以及其他与文档相关的信息），文档的内容在`body`内。示例的`body`值包含一个段落，使用了`<p>`标签。

`SGML`中定义的标记语言被成为一个`SGML`应用（`SGML application`）。一个`SGML`应用通常有以下特征：

1.  [`SGML声明`](http://www.w3.org/TR/REC-html40/sgml/sgmldecl.html)。`SGML`声明指定了应用中可以出现的字符和分隔符。
2.  [文档类型定义--`Document Type Definition`，简称`DTD`](http://www.w3.org/TR/REC-html40/sgml/dtd.html)。`DTD`定义了标记结构的语法。`DTD`可能包含额外的定义，例如[`字符实体引用`（`Character Entity References`）](http://www.w3.org/TR/REC-html40/intro/sgmltut.html#character-entities)。
3.   一套描述了归因到标记的语义规范。该规范会强制引用无法在`DTD`内表达的语法限制。
4.  包含数据(内容)的文档实例。每个实例都包含一个到其解析`DTD`的引用。

这套规范还包括一个[`SGML`声明](http://www.w3.org/TR/REC-html40/sgml/sgmldecl.html)，三中文档类型定义（参考[`HTML`版本信息](http://www.w3.org/TR/REC-html40/struct/global.html)小节了解这三中类型的描述），以及一个[字符串引用资料](http://www.w3.org/TR/REC-html40/intro/sgmltut.html#character-entities)列表。

## `HTML`中用到的`SGML`结构

下面一节介绍了在`HTML`中使用的`SGML`结构。

附录列举了没有得到`HTML`工具和用户代理广泛支持而应该避免使用的[`SGML`功能](http://www.w3.org/TR/REC-html40/appendix/notes.html#sgmlfeatures)。

### 元素

`SGML`[文档类型定义--`document type definition`，简称`DTD`](http://www.w3.org/TR/REC-html40/sgml/dtd.html)声明了用于表示结构或者需要的行为的元素类型。`HTML`包含了表示段落、超链接、列表、表格、图片等内容的元素类型。

每种元素类型一般都描述了三个部分：一个起始标签，内容和一个结束标签。

元素的名称出现在起始标签（写成`<element-name>`）和结束标签中（写成`</element-name>`）；注意在结束标签中元素名称前的斜杆。例如，[`ul`](http://www.w3.org/TR/REC-html40/struct/lists.html#edef-UL)元素类型的起始和结束标签分隔了列表中的项目：

```
<UL>
<LI><P>...list item 1...
<LI><P>...list item 2...
</UL>
```

某些`HTML`元素类型允许作者省略结束标签（例如，[`p`](http://www.w3.org/TR/REC-html40/struct/text.html#edef-P)和[`li`]()http://www.w3.org/TR/REC-html40/struct/lists.html#edef-LI元素）。一些元素类型允许其实标签被省略；例如：[`HEAD`]()http://www.w3.org/TR/REC-html40/struct/global.html#edef-HEAD和[`BODY`](http://www.w3.org/TR/REC-html40/struct/global.html#edef-BODY)元素。`HTML`的`DTD`指出了是否需要起始和结束标签。

某些`HTML`元素没有内容。例如，换行元素[`BR`](http://www.w3.org/TR/REC-html40/struct/text.html#edef-BR)没有内容；它唯一的作用就是结束一行文字。这样的空元素从来都不会有结束标签。[`文档类型定义`](http://www.w3.org/TR/REC-html40/sgml/dtd.html)和规范文字指定了元素是否为空（没有内容），或者，如果有内容的话，什么才是合法的内容？

元素名通常是不区分大小写的。

请查询`SGML`标准了解与元素有关的信息。

例如，下面的段落：

```
<p>This is the first paragraph</p>
...a block element...
```

也可以不用结束标签重写：

```
<p>This is the first paragraph
...a block element...
```

开始标签`<p>`被随后的块元素关闭。类似的，如果一个段落被一个块元素关闭的话，例如：

```
<div>
  <p>This is the paragraph.
</div>
```

闭合元素的结束标签（这里是`</div>`）暗示了开始标签`<p>`的结束标签。

> 元素不是标签。有些人将元素成为标签（例如，“`P`标签”）。记住元素和标签是两回事。例如，`HEAD`元素通常是存在的，然而在标记文本中可能开始标签和结束标签都没有。

通过[`元素目录`](http://www.w3.org/TR/REC-html40/index/elements.html)可以查看所有规范列出的元素类型。

### 属性

元素可能有关联属性，被称为`attribute`，可能有值（默认由作者或者脚本设置）。属性/值对出现在一个元素的开始标签最后的`>`字符之前。元素的其实标签里可以出现任意数量（合法）的属性值对，用空格分开。顺序任意。

例如，为[`h1`](http://www.w3.org/TR/REC-html40/struct/global.html#edef-H1)元素设置[`id`](http://www.w3.org/TR/REC-html40/struct/global.html#adef-id)属性：

```
<H1 id="section1">
This is an identified heading thanks to the id attribute
</H1> 
```

默认情况下，`SGML`要求所有的属性值使用双引号（ASCII十进制值为34的字符）或者单引号（ASCII十进制值39的字符）分隔。使用双引号分隔值时，可以在属性值中使用单引号，相反也是一样。作者也可以使用[`数字字符引用资料`--`numeric character references`](http://www.w3.org/TR/REC-html40/intro/sgmltut.html#character-entities)来表示双引号（`&#34;`）和单引号（`&#39;`）。对于双引号，作者也可以使用[字符实体引用资料--`character entity reference`](http://www.w3.org/TR/REC-html40/intro/sgmltut.html#character-entities)`&quot;`。

在某些情况下，作者可以不使用任何引号指定属性值。属性值必须只包含字母（`a-z`和`A-Z`）、数字（`0-9`）、连字号（ASCII十进制值45）、逗号（ASCII十进制值46）、下划线（ASCII十进制值95）和冒号（ASCII十进制值58）。我们推荐使用引号，即使能够去除它们。

属性明通常是不区分大小写的。

属性值一般是区分大小写的。参考手册中每个属性的定义指出了其值是否区分大小写。

所有本规范定义的属性值都在[属性目录--`attribute index`](http://www.w3.org/TR/REC-html40/index/attributes.html)中列出。

### 字符引用

字符引用指的是可以在`HTML`文档中包含的字符的数值或者符号名。它们对于引用很少使用的字符或者那些编辑工具难以输入或者无法输入的字符有用。你将看到这篇文档贯穿使用了字符引用；他们以`&`符号开头，以`;`结尾。一些常见的实例包括：

* `&lt;`表示`<`；
* `&gt;`表示`>`；
* `&quot;`表示`"`；
* `&#229;`（十进制）表示一个上方有小圆圈的字母`a`；
* `&#1048;`（十进制）表示斯拉夫语中的大写字母`I`；
* `&#x6C34;`（十六进制）表示水的中文字符；

> 查看效果，把下面的代码保存成`test.html`然后直接打开：

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
&lt;
<br>
&gt;
<br>
&quot;
<br>
&#229;
<br>
&#1048;
<br>
&#x6C34;
</body>
</html>
```

在[`HTML文档字符集`](http://www.w3.org/TR/REC-html40/charset.html)有更多[`HTML字符引用`](http://www.w3.org/TR/REC-html40/charset.html#entities)的详情。该规范还包括了可能在`HTML4`文档中出现的[`字符引用的列表`](http://www.w3.org/TR/REC-html40/sgml/entities.html)。

### 注释

//TODO

# 英文原文
[On SGML and HTML](http://www.w3.org/TR/REC-html40/intro/sgmltut.html)
[HTML 4.01 Specification](http://www.w3.org/TR/REC-html40/cover.html#minitoc)
[HTML 5 -- editor's draft](http://www.w3.org/html/wg/drafts/html/CR/)
[HTML 5 Reference -- editor's draft](http://dev.w3.org/html5/html-author/)
[HTML 5.1 Nightly -- editor's draft](http://www.w3.org/html/wg/drafts/html/master/single-page.html)
[HTML 5 -- working draft](http://www.w3.org/TR/html5/)

# ISGMLUG

`SGML`和`XML`都是元语言（`metalanauge`）——用于描述其他语言的语言——用户可以为无限类型的文档自己设计自己定制的标记语言。

`SGML`强大、复杂、内容多。已经在重工业和商业上使用了超过十年，有大量的专业知识和工具。`XML`是`SGML`的轻量缩减版，只保留了有用的功能，去除了`SGML`中提供的可选、但是对于`WEB`环境编程过于复杂的功能。

`HTML`只是`SGML`或者`XML`的一种应用，并且在`WEB`上使用得最为频繁。

`WEB`正变得远远不至是一个静态的文库。越来越多的用户通过访问`WEB`来获取一些实际上在书架上没有的`Web页面`。而页面是从信息动态生成供`WEB`服务器使用的。这些信息来自于`WEB`服务器上的数据库，或者网站拥有者的企业数据库，甚至其他网站。

这些动态信息并没有以原生的格式提供，而且可以用于分析、抽取、排序、设计或者定制来为终端用户提供个性化的`WEB`体验。用一句话来说就是：`Web`页面正进化成`web`服务。

对这些功能和灵活性的需求，让人选择了`XML`这门标记语言。通过比较`XML`和`HTML`可以了解到其中的原因。这两种标记语言都基于`SGML`——但区别很明显，可以轻松地看出来：

`HTML`：

```
  <p>
  Apple Titanium Notebook
  <br>Local Computer Store
  <br>$1438
  </p>
```

`XML`：
```
  <product>
  <model>Apple Titanium Notebook</model>
  <dealer>Local Computer Store</dealer>
  <price>$1438</price>
  </product>
```

两种语言在浏览器上看起来可能相同，但是`XML`数据是智能数据。`HTML`指定了数据的表现，但是`XML`却告诉了用户这些数据的意思。使用`XML`，浏览器知道这里有一个产品，知道它的型号、销售商以及价格。通过这样一组信息，`XML`向用户展示了最便宜的产品或者最近的销售商而不用再返回服务器。

与`HTML`不同，使用`XML`可以创建自定义标签，这样就可以准确地描述用户需要了解的信息。因此，客户端应用可以用任何格式访问`WEB`上任何地方的数据资源。新的“中间层”（`middle-tier`）服务器位于数据源和客户端之间，将所有内容转换成定制的与任务相关的特定`XML`。

但是`XML`数据并非只是智能数据，还是智能文档。这意味着在显示信息时，模型名称字体可以和销售商名称字体不同，最低的价格可以用绿色高亮。不像`HTML`，`HTML`的文本只是统一渲染的文本，而`XML`文本是智能的，因此它可以控制渲染。

而且你也无需决定信息是数据还是文档；用`XML`，信息既是数据又是文档。你可以做数据处理或者文档处理或者同时进行。有了这样的灵活性，就不奇怪我们正开始看到一个新的智能、信息结构化的`WEB`。这是一种“语义化Web`，计算机可以理解他们所分享的数据的意义。

`DTD`是`XML声明语法`用于特定类型文档的正式描述。它对不同类型元素的名称，出现的地方以及组合方式进行了设置。

`XML`规范符合`ISO 10646`国际标准，该国际标准的31位字符库覆盖了大部分人类（和一些非人类）语言，而且目前与`Unicode`标准一致，并且计划成为`Unicode`的超集。

## 身份系统——分布式验证和授权

所有自动化的身份系统都需要某些方式来创建和分配授权和验证的断言程序。最有名的当然是`Kerberos`，它有自己的处理必要条件的方法。然而许多电子系统现在都开始使用`SAML`——`Security Assertion Markup Language`——并且正在变成现在实际的安全凭证标准。

`SAML`使用了`XML`作为标准来表示安全凭证。它定义了一个协议用于从授权服务（基于`SAML`的）请求和接收凭证数据。`SAML`的关键好处在于使用非常直观，光这一点就显著增加了它的使用率。授权方再反过来对特定安全领域的目标身份进行声明断定。例如——目标可能通过与其起始`DNS`域相连接的邮箱地址来标识，当然，这只是一个简单的例子。

那么，到底什么是`SAML`授权呢？其实这只是一种响应`SAML`请求的非常简单的服务（通常在线）。这些`SAML`请求被称为断言声明（`assertion`）。有三种类型的可以被查询到的`SAML`授权——验证授权（`authentication authorities`）、属性授权（`attribute authorities`）和政策决策点（`policy decision points`，简称`PDP`）。这些授权都会返回显著的断言声明类型——

```
>>  `SAML`验证断言声明（`SAML authentication assertions`）
>>  `SAML`属性断言声明（`SAML attribute assertions`）
>>  `SAML`授权断言声明（`SAML authorization assertions`）
```

虽然有三种不同的定义，实际上大部分授权都会被配置成生产每种类型的断言声明。有时候在特定的应用中可以找到被设计成只生产特定子集但是非常稀少，尤其在在线应用中特别少的授权——虽然有时候他们会被作为代理授权——参考[这里](http://www.theninjaproxy.org/tv/how-to-use-a-bbc-iplayer-proxy/)。然而所有的授权都包含了某种元素，像用于发行人、时间戳、断言声明`ID`，目标等包含安全域和名称的`ID`。

每个`SAML`属性请求都会使用标准语法`<sampl:Request...>`，然后在内容中引用请求的特定部分。内容基本上可以是任何事情，但实际上通常是直观的事情，例如询问一个邮箱与哪个部门或者域相关联。

### 英文原文

> [site url](http://www.isgmlug.org)

# 使用`XML`加密的隐密性

与线上所有其他类型的通讯方法相同，可以使用加密来保护`XML`文档。实际上如果可以的话，推荐所有重要的`XML`文档都先加密再通过网络传输。文档到达正确的目的地后会被使用合适的密钥进行解密。

然而这样是有问题的，在加密时会对整条信息进行混淆。这意味着`XML`信息的某些部分将需要使用明文发送。例如`SOAP`信息，这是一种计算机用来在互联网上交换`rpc`（`Remote Procedure Call`——远程过程调用）的格式。虽然可以对`SOAP`信息的某些部分加密，但是至少头部必须为明文，否则相邻的设备将不能查看路由和其他重要信息。

一种[替代方法](http://www.iplayerabroad.com/bbc-iplayer-ireland/)就是对频道本身进行加密，通常是使用`SSL`和`SSH`之类的方法。这样确保了通过将整个频道加密来保护传输的信息。然而这样的另一个问题是，频道加密只会保护两个终端，信息还是会以明文显示。这些问题是`XML`开发者需要对抗的实际问题——因此研制了`XML`加密标准。

该标准的首要目标就是允许任何`XML`文档的部分加密和安全加密。这份加密标准，与`XML`的其他标准，例如签名协议，有许多不同。这样使得标准可以处理所有不同情境，而且核心函数非常简单且可以轻松的遵守。

`XML`文档中的加密元素使用下面的元素`-`来标识，该元素由两个不同的部分组成：

* 表示信息的可选元素。该元素实际上和`XML`签名规范中定义的元素相同。
* 包含了加密的实际数据的元素，或者包含了封装的加密数据引用的元素。

例如`XML`加密可以用于在线支付系统来通过`XML`文档发送命令。命令文档可能包含该命令的所有信息，包括像支付详情、信用卡卡号等敏感信息都被包含在一个元素中。爱这种示例场景下，大部分命令是明文以方便快速处理，但是支付信息应该被加密，而且尽在支付实际处理时才解密。`XML`加密确保文档某些部分——即支付信息进行了特定加密来实现。
