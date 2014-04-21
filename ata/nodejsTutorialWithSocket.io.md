Node.js Socket.io入门教程
---
> 初学者肯定会遇到很多小问题，本文记述第一次使用Node.js的socket.io遇到的问题。

### 准备工作

`nodejs`，`npm`或者`cnpm`或者`tnpm`(仅限内网使用)并安装socket.io（通过运行`cnpm install socket.io`命令，当然，也可以加上`-g`选项安装到全局）。

### 基础服务器和路由

>   传统的三行代码实现一个服务器（参考nodejs的[官方示例](http://nodejs.org/)）以及网上非常多的实现路由功能的node.js代码，因此这里直接给出代码。

```javascript
var http = require('http');
var url = require('url');
var fs = require('fs');
var server;

server = http.createServer(function(req, res){
    // your normal server code
    var path = url.parse(req.url).pathname;
    switch (path){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
            res.end();
            break;
        case '/test.html':
            fs.readFile(__dirname + path, function(err, data){
                if (err){ 
                    return send404(res);
                }
                res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
                res.write(data, 'utf8');
                res.end();
            });
        break;
        default: send404(res);
    }
}),

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8001);

// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        socket.emit('data', {'date': new Date()});
    }, 1000);

    //recieve client data
    socket.on('client_data', function(data){
        process.stdout.write(data.letter);
    });
});
```

以上是服务端，保存为`server.js`文件。重点关心下socke.io相关的部分。其中`on`函数和`emit`值得关注，分别为接受请求和发送请求的函数。`io.sockets.on`是广播事件。socket.io的请求方式详情可以看这里的[官方说明](https://github.com/LearnBoost/socket.io/wiki/How-do-I-send-a-response-to-all-clients-except-sender%3F)。

服务器端会向所有通过socket连接的客户端每隔一秒发送一次数据，并在`client_data`事件时触发自己的回调函数。

通过运行`nodemon server.js`来启动nodejs服务器。通过url`http://localhost:8001/`可以访问。

接下来完成客户端代码，示例代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Socket.io Example</title>
    <script src="./socket.io/socket.io.js"></script>
</head>
<body>
    <script>
var socket = io.connect();

socket.on('data', function(data) {
    document.getElementById('date').innerText = data.date;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('text').addEventListener('keypress', function(e) {
        socket.emit('client_data', {'letter' : String.fromCharCode(e.charCode)});
    });
});
    </script>
    <div id="date"></div>
    <textarea id="text" name="" cols="30" rows="10"></textarea>
</body>
</html>
```

关注下几个地方，第一个是引入的script脚本，它的src为`./socket.io/socket.io.js`，按照传统思维以为需要引入外部脚本。结果下载[这个脚本](https://raw.githubusercontent.com/LearnBoost/socket.io-client/master/socket.io.js)或者这个[cdn脚本](http://cdn.socket.io/stable/socket.io.js)放到对应位置页面会报错。百思不得其解。后来找到socket.io的官方github，从[这里](https://github.com/LearnBoost/Socket.IO/wiki/How-do-I-serve-the-client)找到了答案。原来，socket.io会自动响应`http://localhost:8001/socket.io/socket.io.js`返回页面上需要引入的脚本内容。页面上的`io`变量也是这个脚本生成的。

然后，通过`io.connect()`来连接到服务器。这里的`on`事件名称必须和`server.js`中的名称一致才能匹配。

[完整代码示例](http://yunpan.taobao.com/share/link/VfDrcaQZy)

要查看客户端发送到服务端的数据，在输入框中输入，查看`nodemon server.js`的命令行端口，会看到在网页上每次按下键盘输入的内容。

### 参考资料
<del>
1. [英文原文](http://danielnill.com/nodejs-tutorial-with-socketio/)
2. [dead horse](http://deadhorse.me/nodejs/2011/12/29/socket.io_induction.html)
3. [Socket.IO入门](http://raytaylorlin.com/Tech/web/Nodejs/socket-io-tutorial/)
</del>
> deprecated above links

[http://code.tutsplus.com/tutorials/real-time-chat-with-nodejs-socketio-and-expressjs--net-31708](http://code.tutsplus.com/tutorials/real-time-chat-with-nodejs-socketio-and-expressjs--net-31708)
[http://code.tutsplus.com/tutorials/using-nodejs-and-websockets-to-build-a-chat-service--net-34482](http://code.tutsplus.com/tutorials/using-nodejs-and-websockets-to-build-a-chat-service--net-34482)
[http://blog.fens.me/nodejs-socketio-chat/](http://blog.fens.me/nodejs-socketio-chat/)

[http://stackoverflow.com/questions/4094350/good-beginners-tutorial-to-socket-io](http://stackoverflow.com/questions/4094350/good-beginners-tutorial-to-socket-io)
[https://github.com/LearnBoost/socket.io/wiki](https://github.com/LearnBoost/socket.io/wiki)
