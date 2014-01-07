node学习笔记
---
#### 使用nodejs需要记住的几件事情：

[原文地址](http://stella.laurenzo.org/2011/03/bulletproof-node-js-coding/)

1.   一定要`return`；
例如如下代码：
<pre><code>function doSomething(response, callback) {
    doSomeSync('abc', 123, function(err, result) {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}
</code></pre>
上面这段代码的问题在于发生错误时，callback的第二个参数将会是`null`或者`undefined`，这与已经声明的API有冲突，会引发各种奇怪的错误。好的习惯就是架上`return`，代码如下：
<pre><code>function doSomething(response, callback) {
    doSomeSync('abc', 123, function(err, result) {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
}
</code></pre>

2.   将回调函数序列化；
3.   为复杂的逻辑写响应函数；
4.   将异常集中处理；
5.   遵循promise编码规范；
6.   区分系统接口和用户接口；
7.   仔细检查依赖关系；
8.   代码保持简单易懂；
9.   写好测试；

[node-fibers](https://github.com/laverdet/node-fibers)

[do-it-fast](http://howtonode.org/do-it-fast)

[web development with expressjs](http://pluralsight.com/training/Courses/TableOfContents/expressjs)

[http://pluralsight.com/training/Courses/TableOfContents/node-intro](http://pluralsight.com/training/Courses/TableOfContents/node-intro)

[https://www.codeschool.com/courses/real-time-web-with-nodejs](https://www.codeschool.com/courses/real-time-web-with-nodejs)