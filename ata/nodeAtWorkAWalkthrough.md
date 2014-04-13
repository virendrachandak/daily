Node.js服务器交互和数据拟
---

使用Node.js可以跳过硬编码，生产出在设计阶段结束时可用于beta发布的客户端代码，不再需要计算需要的API、设计硬编码的模拟内容以及伪造服务器交互。

整个流程看起来像“[在浏览器中设计](http://alistapart.com/article/responsive-comping-obtaining-signoff-with-mockups)”，但是包含了更多的JavaScript和额外的层：

1.  设计布局和样式
2.  将标记语言转换成JavaScript模板
3.  创建一个初始函数
4.  创建一个简单的Node.js服务器
5.  在服务器上增加一个模拟数据对象
6.  添加服务器函数来提供静态页面和JSON数据

这么多步骤？是不是让人望而生畏？不用担心，第一步花费的时间比其他所有步骤多N倍。因此，如果你已经掌握了设计技能，那你将发现其他步骤更加可控。

在本篇逐步演示的文章里，我们将构建一个模拟艺术商店功能。可以参考[github上的代码](https://github.com/garann/coolartstore)，或者直接查看[在线demo](http://coolartstore.rs.af.cm/)。

### 创建模板

有了设计和相关的标记语言代码，就可以将它们转换成用于所有示例的模板，这样比为每个模板创建单独的标记语言效率更高。搞定这部分，难题也结束了；在创建模板时也已经考虑好了在设计中那些地方使用数据。有了以上想法，在你选择的模板语言中使用数据来标记HTML代码。

例如，要使用一个销售艺术印刷品的商品。下面是初始的标记代码：

```html
<h2>Two Acrobats with a Dog</h2>
<h3>Pablo Picasso</h3>
<img src="img/102.jpg" alt="Two Acrobats with a Dog" class="active" />
<ul class="info">
	<li>8" x 11"</li>
	<li>acid-free paper</li>
	<li>suitable for matting</li>
</ul>
<span class="price">$49.99</span>
```

将模板看成定义数据和客户端格式要求的地方。如果能够在客户端渲染中重用就太棒了--但是这可能与应用毫无关系。只要你有好的数据，从一种模板语言转换到另一种并不重要，因此不要在选择使用哪种模板引擎上太过纠结。

你需要一个能够在浏览器和Node.js上使用的模板引擎。如果不太确定，在
[github](http://github.com)上搜索模板引擎，然后验证是否有通过[`npm`](https://npmjs.org/)安装的指南，以及在客户端使用的压缩脚本。我倾向使用[`doT.js`](http://olado.github.io/doT/index.html)，下面是使用doT重写的模板：

```javascript
<h2>{{=it.title}}</h2>
<h3>{{=it.artist.name}}</h3>
<img src="img/{{=it.id}}.jpg" alt="{{=it.title}}" class="active" />
<ul class="info">
	{{~it.info :info_item}}
	<li>{{=info_item}}</li>
	{{~}}
</ul>
<span class="price">{{=it.price}}</span>
```

我喜欢把模板存在和JavaScript目录同层的目录，所以我把这个文件存到`tmpl/detail.dot`。

### 初始化客户端

我们要在Node和浏览器上使用模板，而且需要把他们存储到HTML之外并且在打开页面时加载和编译。首先，存储压缩后的模板文件并且在页面上加入一个引用的script标签。完成这步后，可以获取模板，编译，再接着继续主JavaScript文件上的其他初始化工作。在实例中使用了jQuery，代码如下：

```javascript
var detailTmpl;

$.when( 
	$.get( "tmpl/detail.dot", function( tmpl ) {
		detailTmpl = doT.template( tmpl );
	}, "text" ) 
).then( init );
```

这里的`init`函数时什么？这是添加静态模拟数据交互的地方。目前只有一处交互，因此`init`函数非常简单：

```javascript
function init() {
	$( "div.content" ).on( "click", "div.result", showDetail );
}
```

使用`Require.js`的文本插件代码会更加优雅，但是已经超出了本文的范围，不过强烈推荐在生产环境使用。

模板渲染在`showDetail()`函数中完成。不过，在完成这个函数前，我们还需要添加一台服务器和数据仓库，因为我们还没有用于渲染的数据。

### 创建一台服务器

如果现在重新加载页面并且打开浏览器控制台，会有JavaScript报错。因为现在是通过
文件系统页面上的XMLHttpRequest(XHR)来加载模板。除非服务器能正常提供页面，否则无法检查模板是否有问题。

要打造一台允许运行XHR对象的简单Node服务器，需要做以下事情：

*   将已有的资源文件移动到新的子文件夹`public`中。
*   打开工作目录的控制台或者命令行并且运行`npm install express`。
*   在工作目录下添加`server.js`文件。

我们当然可以从零开始写所有代码，但是如果只需要一台基础服务器的话，这样做太费力了。[`Express`](http://expressjs.com/)框架提供了一些服务器抽象以及应用概念。对于初始版本的服务器，我们所需要的仅仅是提供静态资源服务的能力。我们可以在`server.js`中加入四行代码：

```javascript
var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000);
```

在控制台或者命令行中输入`node server.js`启动服务器，通过`http://localhost:3000`来查看页面（可以根据需要添加文件名），与模板加载相关的错误应该就消失了。

### 添加服务器端数据

我们创建了一台Node服务器用于代表真正的服务器--真正的服务器会存储数据。虽然用Node服务器存储数据不难，但是创建一个大的`对象字面量`更加简单。对于数据模拟而言已经足够了。这里的目标之一就是定义一个用于支持我们的新设计的数据对象，因此这个对象的格式可以使用我们新增的模板来决定。本例的数据对象结构如下：

```javascript
var products = {
	"102": {
		id: 102,
		title: "Two Acrobats with a Dog",
		artist: {
			name: "Pablo Picasso"
		},
		price: "$49.99",
		info: [
			"8\" x 11\"",
			"acid-free paper",
			"suitable for matting"
		]
	}
};
```

注意`products`可以使用数组表示，但是我们希望通过ID能够快速查找产品--在假数据库中有多条数据后。除了这些小细节，这个数据和在内容中硬编码的初始HTML完全一样。如果希望添加更多数据，包括可能无法预料地破坏布局的内容，可以简单地复制数据结构并且替换。

### 从服务器返回数据

如果用过服务器端框架，创建XHR端点可能让人生畏，但是Express简化了这些内容。我们不需要特别设置来定义服务器作为异步请求的端点。我们所要做的就是在服务器上定义一个希望接受请求和回调的路径。回调函数会接受一个请求对象（用于获取传递数据）以及一个响应对象（用于定义从客户端返回的内容）。要返回产品对象数据，在`server.js`底部加入下面几行代码：

```javascript
app.get( "/detail/:id", function( req, res ) {
	res.send( products[ req.params.id ] );
});

app.listen( 3000 );
```

### 英文原文
[http://alistapart.com/article/node-at-work-a-walkthrough/](http://alistapart.com/article/node-at-work-a-walkthrough/)
