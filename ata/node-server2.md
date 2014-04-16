node服务器--静态文件服务器
---
1.	最基本的nodejs服务器代码
<pre><code>
var PORT = 8000;
var http = require('http');

var server = http.createServer(function (request, response) {
  var pathname = url.parse(request,url).pathname;
  response.write(pathname);
  response.end();

});

server.listen(PORT);
console.log('Server running at PORT:' + PORT + '.');
</code></pre>

	将该文件存储为app.js文件。

2.	读取静态文件
	*	使用fs模块处理文件读取，path模块处理路径。
	*	假设用户只能读取assets目录下的文件，服务器会将路径信息映射到assets目录。
	*	通过fs.exists方法判断静态文件是否在磁盘上。不存在则返回404错误。
	*	