给Nodejs新手的7条建议(7 tips for a node.js padawan)
---
>   译者序：javascript所缺少的，正式nodejs所补充的，正因为如此，nodejs才会如此受欢迎，本文向和译者一样的nodejs新人介绍了开始学习nodejs时的7个有用的建议，相信会对nodejs新人会有帮助的。so， come on，newbies！

### 建议1：开发时使用nodemon，生产环境使用pm2
*  还记得nodejs的hello world程序吗？你兴致勃勃的写下了这样一行代码：
*    `console.log("hello world");`

*   将它保存成了helloNode.js文件，然后打开命令行，cd到保存的目录，运行`node helloNode.js`命令，然后看到命令行上出现了"hello world"。
*   仅仅第一次这样也许会感觉到新鲜激动，但是如果以后每次开发，修改了源码后都需要`ctr+c`结束node进程，再重新运行`node xxx.js`命令，肯定会很麻烦。解决方案就是<b style="color:red">[nodemon](https://github.com/remy/nodemon)</b>模块。
*   安装命令为：`node install -g nodemon`
*   使用方法：`nodemon xxx.js`。nodemon将会监测`xxx.js`的修改，并在文件内容改变时自动重启。(译者注：不一定要修改了文件内容才会重启，在nodemon运行的命令行里按下`r+s`然后回车也可以手动重启nodemon；或者在源代码文件编辑器里执行保存文件的命令，nodemon也会监测到并且重启)
*   非常省事吧?在生产环境下具有同样功能的对应模块为[pm2](https://github.com/Unitech/pm2)。PM2会自动监测node程序的变化并自动重新部署。与Nodemon不同的是，PM2在Node程序挂掉时会马上自动重启node程序。
*   除此之外，PM2的优势还体现在能够为nodejs程序提供多核支持。PM2内置了“负载均衡器（Load Balancer），可以指定运行的nodejs程序的实例数。命令如下所示：
*   `pm2 start app.js -i max`
*   其中`-i`参数制定了运行的实例数，上面的命令使用了pm2内置的常量`max`。也就是让pm2自动协调nodejs程序，尽可能利用计算机的性能。
>   译者注：pm2安装依赖[node-gyp](https://github.com/TooTallNate/node-gyp)模块，而node-gyp模块只支持python2.x。

### 建议2：使用Async或者Q
*   使用nodejs会遇到很多回调的情况，因此，很容易写出下面这样的“回调地狱（callback hell）”代码（注释是译者按照自己的理解加的）：
    <pre><code>// 用户注册
    function register(name, password, cb){
      // 检查用户名是否存在
      checkIfNameExists(name, function(err, result){
        if(err){
          return cb(“error”);   //出错，返回错误信息
        }
        // 没有错误，就检查密码是否符合要求
        checkIfPasswordGood(password, function(err, result){
          if(err){
            return cb(“error”); //出错，返回错误信息
          }
            
          // 用户名不存在，密码符合要求，开始创建用户
          createAccount(name,password, function(err,result){
            if(err){
              return cb(“error”); //出错，返回错误信息
            }
            //  用户名不存在，密码符合要求，创建用户成功，开始创建博客
            createBlog(name, function(err, result){
              // 发送邮件
              sendEmail(name, function(err, result){
                callback(result);
              });
            });
          });
        });
      });
    }
    </code></pre>
*   写出这样的代码很自然吧？但是这样层层嵌套的代码也太<b style="color:brown">恶心</b>了。如何避免呢？一种方法是使用事件。但是如果使用事件来调用私有函数内部嵌套的私有函数（尤其是多层嵌套的），不是好的做法。
*   解决方案？使用[async.js](https://github.com/caolan/async)或者[Q](https://github.com/kriskowal/q]%28https://github.com/kriskowal/q%29)。
##### async
*   使用<b>async</b>可以很轻松地写出线型和并行的程序，而且不用写成层层嵌套的代码。例如下面列出的代码（来自Async的readme文件，async还支持其他许多模式，详情请查看async gihub库上的[列表](https://github.com/caolan/async#control-flow)）。
    <pre><code>async.map(['file1', 'file2', 'file3'], fs.stat, function(err, results) {
        // results is now an array of stats for each file
    });
    
    async.filter(['file1', 'file2', 'file3']. fs.exists, function(results) {
        // results now equals an array of the existing files
    });
    
    async.parallel([
        function() { // somecode },
        function() { // somecode }
    ], callback);

    async.series([
        function() { // somecode },
        function() { // somecode }
    ]);

    async.waterfall([
        function(callback) {
            callback(null, 'one', 'two');
        },
        function(arg1, arg2, callback) {
            callback(null, 'three');
        },
        function(arg1, callback) {
            // arg1 now equals 'three'
        }
    ], function(err, result) {
        // result now equals 'done'
    });
    </code></pre>
    >   译者注：其实没看懂原文作者这段代码的意思。找了一个简单的例子，如下所示：
    >   ps:记得先安装`async`模块，命令为：`npm install -g async`
    <pre><code>var async = require('async');
    
    async.series({
      one: function(callback) {
        setTimeout(function() {
          callback(null, 1);
        }, 2000);
      },
      two: function(callback) {
        setTimeout(function() {
          callback(null, 2);
        }, 100);
      }
    }, function(err, results) {
      console.log(results);
    });
    </code></pre>
    *   输出为：`{ one: 1, two: 2 }`,还不理解，可以修改代码成如下形式：
    <pre><code>var async = require('async');
    
    async.series({
      one: function(callback) {
        console.log('one()' + new Date());
        setTimeout(function() {
          console.log('one setTimeout' + new Date());
          callback(null, 1);
        }, 2000);
      },
      two: function(callback) {
        console.log('two()' + new Date());
        setTimeout(function() {
          console.log('two setTimeout' + new Date());
          callback(null, 2);
        }, 100);
      }
    }, function(err, results) {
      console.log(results);
    });
    </code></pre>
    *   输出为：![](http://gtms01.alicdn.com/tps/i1/T1tdy_FXVfXXcoyNUL-544-102.png)
        >   async还有很多其他强大的功能，有兴趣可以戳一下这个[链接](http://www.csser.com/board/4f4e935aeb0defac57000134 "用 Async.js 简化异步编程--from csser.com")
##### Q
*   Q([github库](https://github.com/kriskowal/q))，实现了promises规范。所谓的promise其实就是从一个方法返回的对象，这个对象promise会提供一个返回值。这与javascript和nodejs的异步特性非常切合。
*   例如Q在github库上提供的代码示例：
    <pre><code>promiseMeSomething()
    .then(
        // value就是promiseMeSomething执行完的返回值
        function (value) {
            // 利用promise返回的值来做xxx的代码
        }, 
        // 没有返回promise的值时执行的函数
        function (reason) {
            // 可以把reason打印出来
        }
    );
    </code></pre>
*   使用q来改写我们上文提到的用户注册函数如下所示：
    <pre><code>Q.fcall(checkIfNameExists)
    .then(checkIfPasswordIsGood)
    .then(createAccount)
    .then(createBlog)
    .then(function (result) {
        // 处理成功的结果
    })
    .catch( function (error) {
        // 统一处理上面步骤中出现的异常
    })
    .done()
    </code></pre>
    > 原文作者推荐的最佳实践是不将每一步调用的函数方法名传入q中，而是直接写成匿名函数。
    > 
    > 译者注：其实都可以，传方法名可能在debug时更加方便，但是用匿名函数可能代码更好看。

    >   原文作者说：<b>My personal fav? Q all the way!</b>
### 建议3：nodejs调试技巧
*   使用[node-inspector](https://github.com/node-inspector/node-inspector)来调试，比`console.log`更方便。
*   安装起来会比较麻烦，可以参考[这里](https://github.com/node-inspector/node-inspector)

### 建议4：nodefly
*   使用nodefly来监测nodejs程序的性能，内存泄露，以及做性能评估（profile）。
*   除此之外，nodefly还可以做redis，mongo的查询时间测量等很酷的事情。

### 建议5：使用NPM来管理node模块
*   `npm install`命令会自动安装当前目录下package.json的dependencies域里指定的模块内容。
*   `npm update -g`会自动更新当前系统安装的全局nodejs模块。
>   译者注：更多npm的用法请参考[这里](http://blog.nodejitsu.com/npm-cheatsheet "npm-cheatsheet（英文）")，还有[这里](https://gist.github.com/AvnerCohen/4051934 "少为人知的NPM命令--List of less common(however useful) NPM commands")

### 建议6：不要在svn或者git上提交node_modules文件夹
*   最大的原因是根本没有必要去提交，用户只需要运行`npm install`就会自动下载安装和生成这个文件夹了。其他的原因还包括协作开发者使用的操作系统不同，而其中依赖的某个包有可能是与系统有关的工具编译生成的。
*   在git下面避免提交node_modules文件夹的方法是在`.gitignore`文件中加入下面这行内容：
    `//.gitignore node_module/*`
>   译者注：github上好多提交了node_modules文件夹的项目，o(╯□╰)o
>   
>   感觉这事儿跟约定代码书写规范一样，大家都来熟悉并遵守和执行约定，才会你好，我好，大家好！

### 建议7：别忘了<b style="color:red">return</b>
*   记得在回调函数中return（译者注：这是一个promise）。记得这条可以避免遇到一些奇怪的坑，例如下面所示的代码：
    <pre><code>function do(err, result, callback) {
        if (err) {
            callback("error");
        }
        callback("good");
    }
    </code></pre>
*   这段代码的问题是什么？
*   它的逻辑是这样的，如果有错误，在`callback`中传递`error`（错误），如果没有，就`callback("good")`。但是在`callback("error")`之后，函数不会停止执行，还是会继续`callback("good")`。
*   蛋疼了吧~记得改成这样：
    <pre><code>function do(err, result, callback) {
        if (err) {
            callback("error");
            return;
        }
        callback("good");
        return;
    }
    </code></pre>

### 结语
*   nodejs很棒，请记住上面给出与nodejs开发，调试以及部署相关的建议，它们将帮你节省时间，提高效率。
>   为了表示对作者的感谢和尊敬，贴出原文中作者打的广告：[nodejs咨询](http://www.dynamatik.com/)
>   
>   Thanks！

### 参考资料
1.  [英文原文](https://medium.com/tech-talk/e7c0b0e5ce3c)
1.  [告别node-forever，拥抱pm2](http://cnodejs.org/topic/51f8c15144e76d216a588fcc)
2.  [node-gyp](https://github.com/TooTallNate/node-gyp)