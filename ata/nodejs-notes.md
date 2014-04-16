nodejs学习笔记
---
1.  javascript所缺少的，和nodejs所补充的
    *   javascript没有模块系统，没有原生的支持密闭作用域或依赖管理。
    *   javascript没有标准库，除了核心库，没有文件系统的API，没有IO流API等。
    *   javascript没有标准接口，没有和Web Server或者数据库的统一接口。
    *   javascript没有包管理系统，不能自动加载和安装依赖。
    >   commonjs的出现就是为了构建javascript在包括web server，桌面，命令行工具以及浏览器方面的生态系统。Commonjs制定了解决问题的规范，Nodejs则实现了这些规范。
    >   Nodjes实现了require方法来引入模块，NPM基于Commonjs的包规范实现了依赖管理和模块自动安装等功能。
2.  Nodejs的简单模块定义和使用
    *   例如定义一个`node-circle-module.js`模块，其内容为：
        <pre><code>var PI = Math.PI;
        <b style="color:red;">exports</b>.area = function(r) {
          return PI * r * r;
        };
        <b style="color:red;">exports</b>.circumference = function(r) {
          return 2 * PI * r;
        };
        </code></pre>
    *   再定义一个app主程序，其内容为：
        <pre><code>var circle = <b style="color:red;">require</b>('./node-circle-modle.js');
        console.log(' The area of a circle of radius 4 is ' + circle.area(4));
        console.log(' The circle of a circle of radius 4 is ' + circle.circumference(4));
        </code></pre>
    *   请注意红色加粗的关键字`exports`和`require`。
3.  Nodejs模块载入策略
    *   nodejs的模块分为两类，一类为原生（核心）模块，一类为文件模块。原生模块在Nodejs源码编译时编译进了二进制执行文件，加载速度最快。而文件模块是动态加载的，加载速度慢于原生模块。但是Nodejs对原生模块和文件模块都进行了缓存，因此不会在require时产生额外的重复开销。原生模块定义在lib目录下。
    *   文件模块的加载主要是由原生模块module来实现和完成。nodejs在启动时会默认加载module模块，进程直接调用到runMain静态方法。
    *   <pre><code>// bootstrap main module.
        Module.runMain = function () {
            // Load the main module -- the command line argument.
            Module._load(process.argv[1], null, true);
        };
        </code></pre>
    *   _load静态方法在分析文件名之后执行
    *   `var module = new Module(id, parent);`
    *   并根据文件路径缓存当前模块对象，改模块示例对象则根据文件名加载。
    *   `module.load(filename);`
    *   其实文件模块还分为3类模块，根据后缀名来区分，nodejs会根据后缀名来决定加载方法：
        *   .js。通过fs模块同步读取js文件并编译执行。
        *   .node。通过c/c++进行编写的addon，通过dlopen方法来加载。
        *   .json。读取文件，通过调用JSON.parse解析加载。
    *   例如以.js后缀名的文件模块的编译过程。nodejs在编译js文件过程中会对js文件内容进行头尾包装。例如我们上面完成的app.js文件，经过包装之后会变成如下形式：
        <pre><code>(function (exports, require, module, __filename, __dirname) {
            var circl = require('./node-circle-module.js');
            console.log('The area of a circle of radius 4 is ' + circle.area(4));
        }
        </code></pre>
    *   这段代码会通过vm（nodejs）原生模块的runInThisContext方法执行（类似eval，只是具有明确上下文，不污染全局），并返回一个具体的function对象。最后传入module对象的exports，require方法，module模块，文件名和目录名作为实参并执行。
    *   其中，`__filename`和`__dirname`是在查找文件路径的过程中分析得到的，module变量就是这个模块对象本身，exports是在module的构造函数中初始化后的一个空对象（{}，而不是null）。
    *   在这个主文件中，可以通过require方法来引入其余的模块，其实require方法调用的就是load方法。以上模块载入机制的定义在lib/module.js中。
    *   Nodejs模块加载的优先级从高到低依次为：文件模块缓存，原生模块，文件。
    *   例如，你想在app.js中加载一个`http.js`或者`http.json`，或者`http.node`这样的文件，但是实际上require('http')会从原生模块中加载http模块而不是加载本地的文件。
    *   require方法接受的参数类型包括：
        1.  http,fs,path等原生模块；
        2.  ./mode或../mod等相对路径上的文件模块；
        3.  /pathtomodule/mod,绝对路径上的文件模块；
        4.  mod，非原生模块的文件模块。 
    *   nodejs中的`module path`概念 ：每一个被加载的文件模块，在创建这个模块对象的时候，该模块都会有一个paths属性，它的值是根据当前文件的路径计算得到的。例如，创建`modulepath.js`这样一个文件，其内容为：
        `console.log(module.paths);` 
    * module path的生成规则为：从当前文件目录开始查找node_modules目录，依次进入父目录查找父目录下的node_modules目录，如此循环，知道根目录。
    * 除此之外还有一个全局module path，是当前node执行文件的相对目录
    * require方法中的文件查找策略如下图所示：
    * ![](http://gtms01.alicdn.com/tps/i1/T10Rk6Fn0bXXXn_cz2-589-674.png)
    * 更多npm使用技巧，请参考[这里](http://www.infoq.com/cn/articles/msh-using-npm-manage-node.js-dependence)

4.	包结构
	*	Npm基于CommonJS规范解决node包管理的问题。CommonJS规范规定的包结构如下所示：
		*	顶级目录下有一个package.json文件；
		*	bin目录下存放二进制文件；
		*	lib目录下存放javascript代码；
		*	doc目录下存放文档；
		*	test目录下存放单元测试；
	*	一个package.json文件会包含以下内容：
		*	main：即require的内容；
		*	description：包的描述；
		*	version：一个语义化的版本号（[http://semver.org](http://semver.org))
			>	通常为x.y.z（分别为主版本号，副版本好和补丁版本号）
		*	keywords：用于npm搜索时的关键字。
		*	maintainers：包维护者的数组。该数组元素是通常包含name,email,web三个属性的json对象。
		*	contributors:贡献者数组，第一个为包作者本人。
		*	bugs：提交bug的URL地址或邮箱地址；
		*	license：包使用的许可证。
		*	repositories：托管源代码的地址数组。
		*	dependencies：当前包需要的依赖。
		*	scripts：在进行制定操作时的命令。
			>	NPM包基于commonJS包规范，你可以通过如下命令来发布符合规范的node包
			`npm publish folder`
5.	node.js模块与前端模块的异同
	*	前端代码通过script标签载入，nodejs在载入后进行了包装，保证不会污染全局变量。类库开发者需要将类库代码包装在一个闭包内。例如underscore库的定义方式。
	<pre><code>
	(function() {
		// Establish the root object, 'window' in the browser, or 'global' on the server.
		var root = this;
		var _ = function (obj) {
			return new wrapper(obj);
		};
		if (typeof exports !== 'undefined') {
			if (typeof module !== 'undefined' && module.exports) {
				exports = moudle.exports = _;
			}
			exports._ = _;
		} else if ( typeof define === 'function' && define.amd) {
			// Register as a named module with AMD.
			define('underscore', function() {
				return _;
			});
		} else {
			root._ = _;
		}
	}).call(this);
	</code></pre>
6.	Node.js的事件机制
	*	NOdejs:Evented I/O for V8 JavaScript（基于V8引擎实现的事件驱动IO）。
	*	Node.js改变了两个状况：
		1.	统一了前后端JavaScript的编程模型；
		2.	利用事件机制充分利用一步IO突破单线程编程模型的性能瓶颈。
		>	[对nodejs作者的采访](http://bostinno.streetwise.co/2011/01/31/node-js-interview-4-questions-with-creator-ryan-dahl/)
	*	事件机制的实现：
		*	nodejs中的大部分模块都继承自[Event模块](http://bostinno.streetwise.co/2011/01/31/node-js-interview-4-questions-with-creator-ryan-dahl/)。
		*	Event模块是一个简单的时间监听器模式的实现。具有addListener/on,once,removeListener,removeAllListeners,emit等基本事件监听模式的方法实现。与前端DOM树上的时间不同，它没有冒泡、逐层捕获等DOM事件，也没有preventDefault(),stopPropagation(),stopImmediatPropagation()等处理时间传递的方法。
		*	事件侦听器模式也是一种时间钩子（hook）的机制。利用事件钩子导出内部数据或状态给外部调用者。
	*	例如如下代码：
		<pre><code>var options = {
			host: 'www.google.com',
			port: 80,
			path: '/upload',
			method: 'POST'
		};
		var req = http.request(options, function (res) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS:' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('Body:' + chunk);
			});
		});
		req.on('error', function (e) {
			console.log('Problem with request:' + e.message);
		});
		// Write data to request body
		req.write('data\n');
		req.write('data\n');
		req.end();
		</code></pre>
	*	其中on('error')就是事件侦听器。但是，如果nodejs中的代码对一个事件添加了超过10个侦听器，就会收到一条警告。因为nodejs是单线程运行，如果侦听器太多，可能导致内存泄露。可以通过以下代码来修改限制：
		`emitter.setMaxListener(0);`
	*	事件机制进阶：
	*	继承event.EventEmitter，例如，如下代码：
		<pre><code>function Stream() {
			events.EventEmitter.call(this);
		}
		// util是nodejs中封装的工具模块。
		util.inherits(Stream, events.EventEmitter);
		</code></pre>
	*	多个事件之间的协作：
	*	例如在渲染一张页面时从多个数据源拉取数据，并最终渲染至客户端。
		<pre><code>api.getUser('username', function (profile) {
			// Got the profile
		});
		api.getTimeline('username', function (timeline) {
			// Got the timeline
		});
		api.getSkin('username', function (skin) {
			// Got the skin
		});
		</code></pre>
	*	如果写成低效的串行(深度嵌套)方式则如下所示：
		<pre><code>api.getUser('username', function (profile) {
			// Got the profile
			api.getTimeline('username', function (timeline) {
				// Got the timeline
				api.getSkin('username', function (skin) {
					// Got the skin
				});
			});
		});
		</code></pre>
	*	[EventProxy](https://github.com/JacksonTian/eventproxy)实现了多事件协作。如上代码采用eventproxy的写法如下所示：
		<pre><code>var proxy = new EventProxy();
		proxy.all('profile', 'timeline', 'skin', function (profile, timeline, skin) {
			// TODO
		});
		api.getUser("username", function (profile) {
			proxy.emit('profile', profile);
		});
		api.getUser("username", function (profile) {
			proxy.emit('timeline', timeline);
		});
		api.getUser("username", function (profile) {
			proxy.emit('skin', skin);
		});
		</code></pre>
	*	利用事件队列解决雪崩问题
	*	雪崩问题：在缓存失效的情况下，大并发搞访问量同时涌入数据库中查询，超过数据库能承担的请求响应，从而造成网站响应缓慢。例如：
		<pre><code>var select = function (callback) {
			db.select('SQL', function (results) {
				callback(results);
			});
		};
		</code></pre>
		第一种改进，加入事件锁：
		<pre><code>var  status = 'ready';
		var select = function (callback) {
			if (status === 'ready') {
				status = 'pending';
				db.select('SQL', function (results) {
					callback(results);
					status = 'ready';
				});
			}
		};
		</code></pre>
	*	但是如果连续多次调用select，将只有第一次调用生效，后续select没有数据服务。因此，需哟啊引入事件队列。
		<pre><code>var proxy = new EventProxy();
		var status = 'ready';
		var select = function (callback) {
			proxy.once('selected', callback);
			if (status === 'ready') {
				status = 'pending';
				db.select('SQL', function (results) {
					proxy.emit('selected', results);
					status = 'ready';
				});
			}
		};
		</code></pre>

7.	nodejs的异步I/O实现
	<pre><code>fs.open = function (path, flags, mode, callback)  {
		callback = arguments[arguments.length - 1];
		if (typeof(callback) !== 'function') {
			callback = noop;
		}

		mode = modeNum(mode, 438 /* =066 */);
		
		binding.open(pathModule._makeLong(path),
			stringToFlags(flags),
			mode,
			callback);
	};
	</code></pre>
8.	connect模块解析
	*	connect模块是nodejs的中间件框架，也是nodejs下最为流行的web框架，它具有如下几个特点：
		1.	模型简单
		2.	中间件易于组合和插拔
		3.	中间件易于定制和优化
		4.	丰富的中间件
	*	nodejs中一个最简单的web服务是是这样的：
		<pre><code>var http = require('http');
		http.createServer(function (req, res) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Hello world\n');
		}).listen(1337, '127.0.0.1');
		</code></pre>
	*	http模块基于事件处理网络访问主要有两个因素，请求和响应。connet的中间件主要也是处理请求，让后响应客户端或是下一个中间件继续处理。例如一个最简单的中间件原型如下所示：
		<pre><code>function (req, res, next) { /* 中间件 */ }
		</code></pre>
		>	三个参数分别对应请求对象、响应对象和下一个中间件。
	*	流式处理
		<pre><code>var app = connect();
		// middleware
		app.use(connect.staticCache());
		app.use(connect.static(__dirname + '/public'));
		app.use(connect.cookieParser());
		app.use(connect.session());
		app.use(connect.query());
		app.use(connect.bodyParser());
		app.use(connect.csrf());
		app.use(function (req, res, next) { /* 中间件的代码 */ });
		app.listen(3001);
		</code></pre>
	*	connect提供use方法用于注册中间件到一个connect对象的队列中，我们称该队列为中间件队列。connect的部分核心代码如下：
		<pre><code>app.stack = [];
		app.use = function (route, fn) {
			// ...
			
			// add the middleware
			debug('use %s %s', route || '/', fn.name || 'anonymous');
			this.stack.push({route: route, handle: fn});
			return this;
		};
		</code></pre>
	*	流式处理的好处在于：每个中间件的职责都是单一的。开发者可以这样来将复杂的业务逻辑进行分解。
8.	路由
	*	每一个完整的中间件，都包含路由信息和中间件函数。路由信息的作用是过滤不匹配的URL。请求在路由信息不匹配时，将直接传递给下一个中间件处理。
9.	静态文件中间件
	*	connect的static中间件提供了MIME，缓存控制，传输压缩，安全，欢迎页，断点续传等所有功能。代码如下所示：
	<pre><code> var connect = require('connect');
	var app = connect();
	app.use(connect.static(__dirname + '/public'));
	</code></pre>
	*	动静分离。静态文件中间件可以在动静混杂的场景下调用fs.stat来监测文件系统是否存在静态文件，这回造成不必要的系统调用和性能降低。解决影响性能的方法就是动静分离，利用路由监测，避免不必要的系统调用，可以有效降低对动态请求的性能影响。
	<pre><code>app.use('/public', connect.static(__dirname + '/public'));
	</code></pre>
	>	大型cdn会直接在域名上动静请求分开，小型应用中，适当地进行动静分离可避免不必要的性能损耗。
	*	缓存策略
	*	缓存策略包括客户端和服务端两部分：
		1.	客户端缓存主要利用HTTP响应头cache-control和expires制定相应的过期策略。默认情况下的静态中间件最大缓存设置为0，即浏览器关闭后缓存会被清除。生产环境可以设置缓存有效节省网络带宽。
		`app.use('/public', connect.static(__dirname + '/public'), {maxAge: 86500000});`
		>	maxAge选项的单位为毫秒
		>	为浏览器请求url添加自动变化的MD5值可以有效清除缓存。
		2.	staticCache可以解决静态服务器重复读取磁盘造成的压力。
		`app.use(connect.staticCache());`
		`app.use('/public', connect.static(__dirname + '/public'), {maxAge: 86400000});`
		>	这是一个提供上层缓存功能的中间件，能够将磁盘中的文件缓存到内存中，以提高响应速度和提高性能。