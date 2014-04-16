使用nodejs实现web服务器--入门（1/3)
---
> 本文是学习[node beginner book--中文版](http://www.nodebeginner.org/index-zh-cn.html)以及@朴灵的[《用Node.js打造你的静态文件服务器》](http://cnodejs.org/blog/?p=3904)和[《用Node.js构建动态服务器基础》](http://cnodejs.org/blog/?p=4520)的学习笔记和心得。<br><br>
> 主要内容是具体的代码和示例实现过程。<br>
> 文章中给出的github地址是我参考文章完成的代码实现。<br>
> 本系列总共有3篇文章，第一篇是[node beginner book](http://www.nodebeginner.org)里的内容，后面两篇分别是静态文件服务器和动态文件服务器的代码实现。<br><br>
> 非常感谢node beginner的作者<a href="http://twitter.com/manuelkiessling">Manuel Kiessling</a>，以及中文版的翻译： <a href="http://weibo.com/goddyzhao">goddyzhao</a> &amp; <a href="http://www.otakustay.com">GrayZhang</a> &amp;<a href="http://weibo.com/cmonday">MondayChen</a>以及后两篇参考文章的作者[@朴灵 || @JacksonTian](http://github.com/jacksontian)
***
### Node Beginner Book
*	[英文版地址](http://www.nodebeginner.org/)
*	[中文版地址](www.nodebeginner.org/index-zh-cn.html)
*	示例代码需要实现以下功能：
	1.	一个HTTP服务器；
	2.	将URL地址映射到相应request handlers（请求处理器）的router（路由器）；
	3.	完成不同请求实际处理工作的request handlers（请求处理器）；
	4.	处理路由POST表单请求数据的request data handling（请求数据处理）；
	5.	展示请求地址URL包含内容的view logic（展示逻辑）；
	6.	用于处理上传图片的upload handling（上传处理）；
	>	可以使用nodemon来运行nodejs程序，详情可以参考[here](http://www.atatech.org/article/detail/12347/)
***
*	代码实现：
1.	<b>HTTP服务器（server.js）</b>
	<pre><code>// 引入node http模块
	// 更多关于http模块的内容，可参考http://nodejs.org/api/http.html
	var http = require('http');
	// 直接调用http模块创建服务器
	/**
	 * @param request 请求对象
	 * @param response 响应对象
	 */
	http.createServer( function( request, response) {
		// 响应状态200，文件类型tex/plain
		response.writeHead(200, {'Content-Type': 'text/plain'});
		// 响应具体内容
		response.write('Hello world');
		response.end();
	}).listen(8888);	// 服务器运行在8888端口
	</code></pre>
	javascript直接传递函数作为函数的参数，例如：
	<pre><code>function say(word) {
		console.log(word);
	}
	function execute(someFunction, value) {
		someFunction(value);
	}
	execute(say, "Hello");	// 输出为: Hello
	</code></pre>
	因此上面的http服务器代码也可以改为：
	<pre><code>var http = require('http');
	function onRequest(request, response) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Hello world");
		response.end();
	}
	http.creatServer(onRequest).listen(8888);
	</code></pre>
	为什么要这样做呢？
	<b>Event Driven Asynchronous Callbacks（事件驱动的异步回调）</b>
	PHP会为每个请求启动一个PHP进程，如果某个请求包含一个非常耗时的操作，该请求会等待这个耗时操作完成再执行下面的函数。造成的结果是发出这个请求的用户会感觉页面加载缓慢。
	Node.js不同之处在于，它只有一个进程，如果遇上了耗时的数据库查询等操作，会影响所有使用该nodejs程序的用户，所有用户都会明显感觉到系统响应缓慢。为了解决这个问题，Node.js引入了事件驱动(event driven)、异步回调(asynchronous callback)以及事件轮询(event loop)的概念。
	这是nodejs的一个重要概念，可以参考阅读这篇文章[Understanding Node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)
	我们可以改写server.js的代码如下：
	<pre><code>var http = require('http');
	function onRequest(request, response) {
		<b style="color:red;">console.log('Request Received at:' + new Date());</b>
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Hello world");
		response.end();
	}
	http.creatServer(onRequest).listen(8888);
	<b style="color:red">console.log('Server started on port 8888 at:' + new Date());</b>
	</code></pre>
	*	使用命令`nodemon server.js`来查看输出结果。可以看到我们所完成的http服务器启动的具体时间以及在访问localhost:8888时服务器返回了"Hello world"和命令行里输出的请求接收时间。
	*	nodejs实现了CommonJs规范，通过exports关键字，我们可以将一个js文件输出为nodejs的自定义模块（也就是可以直接通过require来在别的文件里引用）。
	我们将刚刚写好的server.js的内容改成一个自定义的nodejs模块。改写如下：
	<pre><code>var http = require('http');
	function start() {
	    function onRequest(request, response) {
			console.log('Request Received at:' + new Date());
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write("Hello world");
			response.end();
	    }
	    http.createServer(onRequest).listen(8888);
	    console.log('Server started on port 8888 at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	<b style="color:red">exports.start = start;</b>
	</code></pre>
	*	然后我们可以写index.js，通过它来引用我们定义的server模块。index.js内容如下：
	<pre><code>// require接受了一个相对路径作为参数
	// 这个相对路径指向的是当前路径下的server.js文件。
	var server = require('./server');	
	server.start();	// 这是刚刚在server.js中通过exports暴露出来的方法。
	</code></pre>
	*	通过`nodemon index.js`来运行我们已经写好的server。

2.	<b>router（路由）</b>
	*	处理request所接受的url地址，我们还需要抽取出一个URL地址的不同部分（例如，请求路径和请求参数）。例如，一个URL请求地址为：`http://localhost:8888/start?foo=bar&hello=world`。可以分解为：
		*	`start` -- `url.parse(string).pathname`
		*	`bar` -- `querystring(string)['foo']`
		*	`world` -- `querystring(string)['hello']`
		*	`foo=bar&hello=world` -- `url.parse(string).query`
	*	加入URL解析后的server.js内容如下：
	<pre><code>var http = require('http');
	// 需要引入nodejs的url模块来解析url地址
	<b style="color:red">var url = require('url');</b>
	function start() {
	    function onRequest(request, response) {
		<b style="color:red">var pathname = url.parse(request.url).pathname;</b>
		console.log('pathname is '+ pathname);
		console.log('Request Received at:' + new Date());
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Hello world");
		response.end();
	    }
	    http.createServer(onRequest).listen(8888);
	    console.log('Server started on port 8888 at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	完成以后，我们先使用`nodemon index.js`运行nodejs程序时，再通过浏览器地址localhost:8888访问，会输出如下内容：
	![](http://gtms01.alicdn.com/tps/i1/T1UpEDFXBcXXaoxZsu-638-126.png)
	可以看到pathname为`/`，还默认访问了网站的`/favicon.ico`。
	现在我们的http服务器能够识别url，返回请求，接下来需要对不同的URL地址进行不同的处理。
	新建router.js，其内容为：
	<pre><code>// router模块提供的route函数
	function route(pathname) {
		console.log("About to route a request for " + pathname);
	}
	// 记得exports本模块的内容
	exports.route = route;
	</code></pre>
	以上是router的基本结构，虽然还没有实现具体的功能。
	服务器需要和router联系，通过松耦合服务器和路由之间的依赖（或者叫做[Dependency Injection](http://martinfowler.com/articles/injection.html)--依赖注入)来获得更大的灵活性和扩展性。我们先改写server.js中的start函数，修改后的server.js如下所示：
	<pre><code>var http = require('http');
	var url = require('url');
	<b style="color:red">var router = require('./router');</b>  // 引入router模块
	var PORT = 8888;
	
	// 使用route
	function start(router) {
	  function onRequest(request, response) {
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    <b style="color:red">router.route(pathname);</b>
	
	    response.writeHead(200, {'Content-Type': 'text/plain'});
	    response.write("Hello world");
	    response.end();
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	还可以修改服务器和路由之间的依赖，修改index.js如下所示：
	<pre><code>var server = require('./server');
	<b style="color:red">var router = require('./router');</b>	// 在index.js中引用router模块
	
	// 将router.route函数传递给服务器的start函数
	server.start(router.route);
	</code></pre>
	server.js改写如下：
	<pre><code>var http = require('http');
	var url = require('url');
	/* <del style="color:red">var router = require('./router');</del> */
	var PORT = 8888;
	
	// 使用route
	function start(route) {
	  function onRequest(request, response) {
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    /* <del style="color:red">router.route(pathname)</del> */
		route(pathname);
	
	    response.writeHead(200, {'Content-Type': 'text/plain'});
	    response.write("Hello world");
	    response.end();
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	router所做的就是接受请求，并且完成某个动作，我们可以参考[Execution in the Kingdom of Nouns,有墙!](http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html)来设计我们的router模块。
	现在的router模块完成了URL的解析任务，但是没有进行任何实际的操作。我们仍然需要将“业务逻辑”通过router制定到相应的请求处理器(request handlers)去完成。
3.	Request Handlers(真正的业务逻辑处理模块）
	
	我们再次通过依赖注入的方法来将request handler加入我们的应用程序中。编写requestHandlers.js，其大概结构为：
	<pre><code>function start() {
		console.log("Request handler for 'start' was called at:" + new Date()); 
	}

	function upload() {
		console.log("Request handler for 'upload' was called at:" + new Date());
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	修改index.js如下：
	<pre><code>var server = require('./server');
	var router = require('./router');
	<b style="color:red">var requestHandlers = require('./requestHandlers');</b>
	
	// 通过javascript对象来处理不同URL路径请求
	// 参考：<a title="Create Advanced Web Applications With Object-Oriented Techniques" href="http://msdn.microsoft.com/en-us/magazine/cc163419.aspx">Create Advanced Web Applications With Object-Oriented Techniques</a>
	var handle = {};
	handle["/"] = requestHandlers.start;
	handle["/start"] = requestHandlers.start;
	handle["/upload"] = requestHandlers.upload;
	
	server.start(router.route, handle);
	</code></pre>
	相应地修改server.js如下：
	<pre><code>var http = require('http');
	var url = require('url');
	var PORT = 8888;
	
	// 使用route
	function start(route, <b style="color:red">handle</b>) {
	  function onRequest(request, response) {
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    route(pathname, <b style="color:red">handle</b>);
	
	    response.writeHead(200, {'Content-Type': 'text/plain'});
	    response.write("Hello world");
	    response.end();
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	对router.js修改如下：
	<pre><code>function route(pathname, <b style="color:red">handle</b>) {
	  console.log('About to route a request for ' + pathname);
	  <b style="color:red">
	  if (typeof handle[pathname] === 'function') {
	    handle[pathname]();
	  } else {
	    console.log('No request handler found for ' + pathname);
	  }</b>
	}
	
	exports.route = route;
	</code></pre>
	但是现在所有的请求都仍然是通过onrequest来完成的。我们将已有的代码全部改下如下：
	**index.js**
	<pre><code>var server = require('./server');
	var router = require('./router');
	var requestHandlers = require('./requestHandlers');
	
	// 通过javascript对象来处理不同URL路径请求
	var handle = {};
	handle["/"] = requestHandlers.start;
	handle["/start"] = requestHandlers.start;
	handle["/upload"] = requestHandlers.upload;
	
	server.start(router.route, handle);
	</code></pre>
	**server.js**
	<pre><code>var http = require('http');
	var url = require('url');
	var PORT = 8888;
	
	// 使用route
	function start(route, handle) {
	  function onRequest(request, response) {
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    var content = route(pathname, handle);
	
	    response.writeHead(200, {'Content-Type': 'text/plain'});
	    response.write(content);
	    response.end();
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	**router.js**
	<pre><code>function route(pathname, handle) {
	  console.log('About to route a request for ' + pathname);
	  if (typeof handle[pathname] === 'function') {
	    return handle[pathname]();
	  } else {
	    console.log('No request handler found for ' + pathname);
	    return "404 Not Found";
	  }
	}
	
	exports.route = route;
	</code></pre>
	**requestHandlers.js**
	<pre><code>function start() {
	  console.log('Request for START handler received at:' + new Date());
	  return "Request for START";
	}
	
	function upload() {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  return "Request for UPLOAD";
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	但是还没有大功告成，目前的程序还有一个很严重的问题。就是上文提到过的，如果遇到某个操作非常耗时的时候，将会阻塞整个nodejs程序，造成服务器对所有用户的响应都非常缓慢。
	解决方案之一就是event loop（事件轮询），详情可参考[这里](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/)<br>
	我们将requestHandlers.js改成如下：
	<pre><code><b style="color:red">var exec = require('child_process').exec;</b>
	
	function start() {
	  console.log('Request for START handler received at:' + new Date());
	  var content = 'empty';
	 <b style="color:red">
	  exec("ls -alih /", function (error, stdout, stderr) {
	    content = stdout;
	  });
	
	  return content;
		</b>
	}
	
	function upload() {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  return "Request for UPLOAD";
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	主要修改在红色加粗部分，加入了一个非阻塞且耗时的操作`ls -alih /`（即列出根目录下的所有文件）。我们访问`localhost:8888`，web服务器会响应start请求，但是返回结果为`empty`而不是`ls -alih /`的结果。<br>
	其中，`child_process`模块实现了非阻塞操作`exec()`。<br>
	我们可以将上面的代码修改成回调的形式，以实现既非阻塞并且能够得到我们想要的结果。原理是将服务器、路由和路由处理器之间传递值的方式修改为将服务器“传递”给内容的方式。修改server.js代码如下所示：
	<pre><code>var http = require('http');
	var url = require('url');
	var PORT = 8888;
	
	// 使用route
	function start(route, handle) {
	  function onRequest(request, response) {
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    // 将response传递给路由
	    route(pathname, handle, <b style="color:red">response</b>);
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	router.js修改如下：
	<pre><code>function route(pathname, handle, response) {
	  console.log('About to route a request for ' + pathname);
	  if (typeof handle[pathname] === 'function') {
	    return handle[pathname](<b style="color:red">response</b>);
	  } else {
	    // 改为在router里处理response的404响应
	    <b style="color:red">console.log('No request handler found for ' + pathname);
	    response.writeHead(404, {"Content-type": "text/plain"});
	    response.write( "404 Not Found");
	    response.end();</b>
	  }
	}
	
	exports.route = route;
	</code></pre>
	接着把我们的requestHandlers.js修改如下：
	<pre><code>var exec = require('child_process').exec;
	
	function start(<b style="color:red">response</b>) {
	  console.log('Request for START handler received at:' + new Date());
	
	  exec("find /", function (error, stdout, stderr) {
	    <b style="color:red">response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write(stdout);
	    response.end();</b>
	  });
	}
	
	function upload(response) {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  <b style="color:red">response.writeHead(200, {"Content-Type": "text/plain"});
	  response.write("Hello Upload");
	  response.end();</b>
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	如果执行速度很快感觉不到非阻塞优势的话，可以把exec里的命令换成`find /`。另一种方法是为exec添加一个参数：`{timeout: 10000, maxBuffer: 20000*1024}`，修改后的requeshtHandler.js如下所示：
	<pre><code>var exec = require('child_process').exec;
	
	function start(response) {
	  console.log('Request for START handler received at:' + new Date());
	
	  exec("find /", <b style="color:red">{ timeout: 10000, maxBuffer: 20000*1024 }</b>, function (error, stdout, stderr) {
	    response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write(stdout);
	    console.log('Requet for START handler completed at:' + new Date());
	    response.end();
	  });
	}
	
	function upload(response) {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  response.writeHead(200, {"Content-Type": "text/plain"});
	  response.write("Hello Upload");
	  console.log('Requet for UPLOAD handler complete at:' + new Date());
	  response.end();
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	实现一个真正的功能，用户上传图片，在浏览器上显示出来。步骤包括：
	1.	处理POST请求；
	2.	处理文件上传（使用multipart POST请求或者使用外部模块）。
	**处理POST请求**
	修改`/start`路径请求，用于生成带文本输入的表单。修改requestHandlers.js如下：
	<pre><code>var exec = require('child_process').exec;
	
	function start(response) {
	  console.log('Request for START handler received at:' + new Date());
		
	  <b style="color:red">var body = '&lt;html&gt;' +
	            '&lt;head&gt;' + 
	            '&lt;meta charset="utf8"&gt;' +
	            '&lt;/head&gt;' + 
	            '&lt;body&gt;&lt;form action="/upload" method="post"&gt;' +
	            '&lt;textarea id="" name="text" cols="30" rows="10"&gt;&lt;/textarea&gt;&lt;br&gt;' +
	            '&lt;input type="submit" value="提交"/&gt;' +
	            '&lt;/form&gt;&lt;/body&gt;';

	  // 注意，这里的文件类型为text/html
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(body);</b>
	  console.log('Requet for START handler completed at:' + new Date());
	  response.end();
	}
	
	function upload(response) {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  response.writeHead(200, {"Content-Type": "text/plain"});
	  response.write("Hello Upload");
	  console.log('Requet for UPLOAD handler complete at:' + new Date());
	  response.end();
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	上面的requestHandlers.js中将start请求处理内容修改成了输出一个带文本输入框的表单，POST的action指向`/upload`路径。也就是在表单提交时服务器会使用requestHandlers.js中的`uplaod`函数来进行处理。接下来需要在upload函数中对post过来的数据进行处理。由上文可知，post请求有可能会涉及比较大的数据量，因此采用非阻塞方式进行处理是明智和合理的。<br>
	在这里，可以采用nodejs的时间触发来实现。通过在request对象上注册监听器（listener）。request对象会在每次收到HTTP请求时触发该函数。逻辑代码如下：
	<pre><code>request.addListener('data', function(chunk) {
		// 接收到新数据时触发
	}
	request.addListener('end', function() {
		// 所有数据都已接收时触发
	}
	</code></pre>
	实现思路：将data和end时间的回调放在服务器中，在data事件回调中收集所有的POST数据，并在接收到所有数据时触发end事件，其回调函数调用请求路由并传递数据，在由路由转发给路由请求处理函数。修改后的server.js如下所示：
	<pre><code>var http = require('http');
	var url = require('url');
	var PORT = 8888;
	
	// 使用route
	function start(route, handle) {
	  function onRequest(request, response) {
    	var postData = "";
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    // 为request设置编码
	    request.setEncoding('utf8');
	
	    // 接收到数据时触发
	    request.addListener('data', function(postDataChunk) {
	      <b style="color: red">postData += postDataChunk;</b>
	      console.log('Received POST data chunk "' + postDataChunk + '".');
	    });
	
	    // 接收完一次请求的所有数据时触发
	    request.addListener('end', function() {
	      route(pathname, handle, response, <b style="color: red">postData</b>);
	    });
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	接下来，我们修改router.js，将postData的内容传递给具体的处理函数。修改结果如下所示：
	<pre><code>function route(pathname, handle, response, <b style="color:red">postData</b>) {
	  console.log('About to route a request for ' + pathname);
	  if (typeof handle[pathname] === 'function') {
	    return handle[pathname](response, <b style="color:red">postData</b>);
	  } else {
	    console.log('No request handler found for ' + pathname);
	    response.writeHead(404, {"Content-type": "text/plain"});
	    response.write( "404 Not Found");
	    response.end();
	  }
	}
	
	exports.route = route;
	</code></pre>
	接着修改requestHandlers.js，让它处理postData数据。修改结果如下所示：
	<pre><code>var exec = require('child_process').exec;
	
	function start(response, <b style="color:red">postData</b>) {
	  console.log('Request for START handler received at:' + new Date());
	
	  var body = '&lt;html&gt;' +
	            '&lt;head&gt;' + 
	            '&lt;meta charset="utf8"&gt;' +
	            '&lt;/head&gt;' + 
	            '&lt;body&gt;&lt;form action="/upload" method="post"&gt;' +
	            '&lt;textarea id="" name="text" cols="30" rows="10"&gt;&lt;/textarea&gt;&lt;br&gt;' +
	            '&lt;input type="submit" value="提交"/&gt;' +
	            '&lt;/form&gt;&lt;/body&gt;';
	
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(body);
	  console.log('Requet for START handler completed at:' + new Date());
	  response.end();
	
	  // non-blocking request demo part
	  /*
	  exec("find /", { timeout: 10000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
	    response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write(stdout);
	    console.log('Requet for START handler completed at:' + new Date());
	    response.end();
	  });
	  */
	}
	
	function upload(response, <b style="color:red">postData</b>) {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  response.writeHead(200, {"Content-Type": "text/plain"});
	  <b style="color:red">response.write('You have POST:' + postData);</b>
	  console.log('Requet for UPLOAD handler complete at:' + new Date());
	  response.end();
	}
	
	exports.start = start;
	exports.upload = upload;
	</code></pre>
	如果从postData中抽取出有意义的部分，需要用到nodejs的`querystring`模块。修改requestHandlers.js，<br>
	先引入querystring模块：`var querystring = require('querystring');`<br>
	再对postData进行解析`querystring.parse(postData).text`
	例如我们访问localhost:8888并且在文本输入框中输入"HELLO WORLD"，再点击“提交”按钮，可以看到页面输出结果为：`HELLO WORLD`。<br>
	接下来，还需要实现图片上传和显示功能。可以直接使用node-formidable模块。需要先在本机上安装。全局或本地安装都可以。命令为`npm install formidable`。一个简单的formidable示例如下所示：
	<pre><code>var formidable = require('formidable');
	var http       = require('http');
	var sys        = require('sys');
	
	http.createServer(function(req, res) {
	  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
	    // parse a file upload
	    var form = new formidable.IncomingForm();
	    form.parse(req, function(err, fields, files) {
	      res.writeHead(200, {"Content-Type": "text/plain"});
	      res.write("Uploaded Data:\n\n");
	      res.end(sys.inspect({fields: fields, files: files}));
	    });
	    return;
	  }
	
	  // show a file upload form
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.end(
	    '&lt;form action="/upload" enctype="multipart/form-data" method="post"&gt;' +
	      '&lt;input type="text" name="title"&gt;' +
	      '&lt;br&gt;' +
	      '&lt;input type="file" name="upload" multiple="multiple"&gt;' +
	      '&lt;br&gt;' +
	      '&lt;input type="submit" value="upload"&gt;' +
	    '&lt;/form&gt;'
	    );
	}).listen(8889);	//改个端口号，以免和现在开启的index.js冲突
	</code></pre>
	保存为formidable-server.js并使用命令`nodemon formidable-server.js`运行。可以查看到页面上输出的值为文本框输入的内容以及选择上传的文件的内容。<br>
	了解了formidable的使用，我们需要解决文件上传并保存到服务器以及浏览器端显示的问题。我们使用nodejs中的fs模块来完成文件读取到服务器的任务。将requestHandlers.js修改如下：
	<pre><code>//var exec = require('child_process').exec;
	var querystring = require('querystring');
	var fs          = require('fs');
	
	/**
	 * @description: default request handler for '/start' and '/'
	 */
	function start(response, postData) {
	  console.log('Request for START handler received at:' + new Date());
	
	 var body = '&lt;html&gt;' +
	            '&lt;head&gt;' + 
	            '&lt;meta charset="utf8"&gt;' +
	            '&lt;/head&gt;' + 
	            '&lt;body&gt;&lt;form action="/upload" method="post"&gt;' +
	            '&lt;textarea id="" name="text" cols="30" rows="10"&gt;&lt;/textarea&gt;&lt;br&gt;' +
	            '&lt;input type="submit" value="提交"/&gt;' +
	            '&lt;/form&gt;&lt;/body&gt;';
	
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(body);
	  console.log('Requet for START handler completed at:' + new Date());
	  response.end();
	
	  // non-blocking request demo part
	  /*
	  exec("find /", { timeout: 10000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
	    response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write(stdout);
	    console.log('Requet for START handler completed at:' + new Date());
	    response.end();
	  });
	  */
	}
	
	function upload(response, postData) {
	  console.log('Request for UPLOAD handler received at:' + new Date());
	  response.writeHead(200, {"Content-Type": "text/plain"});
	  response.write('You have POST:' + querystring.parse(postData).text);
	  console.log('Requet for UPLOAD handler complete at:' + new Date());
	  response.end();
	}
	
	<b style="color:red">
	function show(response, postData) {
	  console.log("Request for SHOW handler received at:" + new Date());
	  fs.readFile("/tmp/test.png", "binary", function(error, file) {
	    if (error) {
	      response.writeHead(500, {'Content-Type': 'text/plain'});
	      response.write(error + "\n");
	      response.end();
	    } else {
	      response.writeHead(200, {'Content-Type': 'image/png'});
	      response.write(file, "binary");
	      response.end();
	    }
	  });
	}</b>
	
	exports.start = start;
	exports.upload = upload;
	<b style="color:red">exports.show = show;</b>

	</code></pre>
	将新的show处理器加入到index.js的路由处理映射中。添加下面一行即可。（ps：这就是依赖注入的灵活之处）<br>
	`handle['/show'] = requestHandlers.show;`<br>
	接着，修改requestHandler.js的内容，修改body内容，在form元素上添加`enctype="multipart/formdata"`属性。删除之前的文本输入框。<br>
	然后将在upload处理程序中对上传的文件进行处理，将request对象传递给node-formidable的form.parse函数。<br>
	修改server.js如下：
	<pre><code>var http = require('http');
	var url = require('url');
	var PORT = 8888;
	
	// 使用route
	function start(route, handle) {
	  function onRequest(request, response) {
	    //var postData = "";
	    var pathname = url.parse(request.url).pathname;
	    console.log('Request for ' + pathname + ' received at:' + new Date());
	
	    // 为request设置编码
	    //request.setEncoding('utf8');
	
	    // 接收到数据时触发
	    //request.addListener('data', function(postDataChunk) {
	    //  postData += postDataChunk;
	    //  console.log('Received POST data chunk "' + postDataChunk + '".');
	    //});
	
	    // 接收完一次请求的所有数据时触发
	    //request.addListener('end', function() {
	    route(pathname, handle, response, <b style="color:red">request,</b> /*postData*/);
	    //});
	  }
	
	  http.createServer(onRequest).listen(PORT);
	  console.log('Server started on port ' + PORT + ' at:' + new Date());
	}
	// 使用exports关键字将本文件作为nodejs的自定义模块
	exports.start = start;
	</code></pre>
	注意注释掉的内容。然后修改router.js。
	<pre><code>function route(pathname, handle, response, <b style="color:red">request</b>/*, postData*/) {
	  console.log('About to route a request for ' + pathname);
	  if (typeof handle[pathname] === 'function') {
	    return handle[pathname](response, <b style="color:red">request</b>/*, postData*/);
	  } else {
	    console.log('No request handler found for ' + pathname);
	    response.writeHead(404, {"Content-type": "text/plain"});
	    response.write( "404 Not Found");
	    response.end();
	  }
	}
	
	exports.route = route;
	</code></pre>
	简而言之，上面的修改都是去除了文件中对postData的使用改成传递request对象。在requestHandlers.js中，我们处理文件上传以及文件重命名操作。
	完整的node-beginner例子请查看我的[github](https://github.com/leoshawn/node-test)。
	> 注意：里面有个小坑，windows系统不允许nodejs的fs模块跨盘符读取文件，因此需要加上
	> `form.uploadDir = './';`
	> 除此之外，form的ecntype也非常重要，对于文件来说，必须是`multipart/fomr-data`。
	> 文件上传空间必须指定name值。
	> 
	> 这个例子非常简单，只支持单个文件的上传和显示。