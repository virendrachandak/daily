你不知道的chrome开发者工具
---
+   [原文1](https://developers.google.com/chrome-developer-tools/docs/shortcuts)
+   [原文2](https://developers.google.com/chrome-developer-tools/docs/javascript-debugging)
***
+   打开开发者工具：  <code>F12 或 ctr+shift+i</code>
+   打开元素检查工具：<code>ctr+shift+c</code>
+   打开开发者工具的控制台：<code>ctr+shift+j</code>
+   检查开发者工具：<code>在解锁开发者工具的情况下按 ctr+shift+j</code>
+   在源码面板中按<code>ctr+o</code>快速打开某个js文件
+   在源码面板中按<code>ctr+shift+o</code>快速定位到当前js文件中的某个函数
+   通过<code>console.trace</code>命令查看当前的javascript调用栈
+   使用<code>console.assert()</code>命令输出测试条件信息，测试条件不通过时输出错误信息
    >   例如：`console.assert(1!=1, 'test')`会输出<span style="color:red">`Assertion failed: test`</span>
+   source map(源码映射)
    +   合并压缩后的代码与未合并压缩的开发源码的对应关系
    +   需要合并压缩工具支持source map功能，目前`google closure`和`UglifyJS2.0`都支持。在合并压缩成功时会自动生成一个sourcemap文件。还有一些工具也支持`coffeescript`和`sass`的source map压缩合并。
    >   在sourcemap了的js文件的最后一行，会有类似这样的内容
    >   `//@ sourceMappingURL=/path/to/file.js.map`
    >   
    >   这行代码提示chrome开发者工具压缩的代码有source map。
    >
    >   如果处于代码洁癖不希望有这样一行看上去比较奇怪的注释代码，可以为你的javascript文件设置这样一个文件响应头
    >
    >   X-SourceMap:/path/to/file.js.map
    >
    >   这样的设置还可以避免源文件不支持单行注释的情况。
    
    source map示例：
    +   [font dragr tool](http://dev.fontdragr.com/)
    
    @sourceURL和显示名称
    +   虽然不是source map规范的内容，但是下面的约定可以让你在使用eval开发时轻松许多。
    +   这条帮助指令看上去类似于`//@ sourceMappingURL`，实际上它在source map第3版规范中做了说明。通过将下面的注释代码放进将会被eval执行的代码中，开发者工具会在代码中显示出更利于逻辑理解的名字。
    +   `//@ sourceURL=someSourceName`
    +   [demo](http://www.thecssninja.com/demo/source_mapping/compile.html)
        1.    使用chrome打开[demo](http://www.thecssninja.com/demo/source_mapping/compile.html)页面;
        2.    打开chrome开发者工具（快捷键`ctr+shift+j`）并切换到source面板;
        3.    在`Name your code`输入框中输入一个文件名，例如输入abcd；
        4.    鼠标点击`compile`按钮；
        5.    弹出内容为coffeescript代码执行结果的警告框；
        6.    在chrome开发者工具的source面板中将会看到生成的一个名字为abcd的js文件，注意在这个文件的最后两行的内容为：
            >   //@ sourceURL=abcd<br>
            >   //# sourceURL=abcd
            *   注意：不是说`//@ sourceURL=xxx`这样的格式吗？为什么还有一句`//# sourceURL=xxxx`呢？这是为了兼容ie。详细的原理可以阅读[这篇文章](http://updates.html5rocks.com/2013/06/sourceMappingURL-and-sourceURL-syntax-changed)。
    + [更多关于source map的内容](http://updates.html5rocks.com/2013/06/sourceMappingURL-and-sourceURL-syntax-changed)

+   console
    +   console.log接受特定格式的输出
        <pre>
        %s       | 输出字符串
        %d 或 %i | 输出数字
        %f       | 输出浮点数
        %o       | 输出DOM元素
        %O       | 输出JavaScript对象
        %c       | 为输出对象应用第二个参数所规定的CSS样式
        </pre>
    +   示例：
        <pre><code>console.log("%s has %d points", "Sam", "100");  // output: Sam has NaN points.
        console.log("%s has %d points", "Sam", "100");  // output: Sam has 100 points.
        console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());

        //注意，console.dir 和 <b style="color:red;">%O</b> 的输出结果一样
        console.dir(document.body.firstElementChild);
        console.log("%O", document.body.firstElementChild);

        console.log("%c This will be formatted with large, blue text", "color: blue; font-size: x-large");
        </code></pre>
    +   console的内置函数
        +   $() 相当于 document.querySelector()
        +   $$() 相当于 document.querySelectorAll()
        +   $x() 接收一个XPath参数并返回改参数匹配的所有元素，例如：
            `$x('/html/body/script')`
            返回`body`标签内的所有`script`元素   
        +   $_ 表示在console中最近一次执行代码的结果
        +   inspect() 函数会在相应的chrome开发者工具面板中检查相应的参数内容
        +   chrome开发者工具控制台使用$0,$1,$2,$3,$4记住最近选择的5个元素内容或者堆对象
        +   monitorEvents() 函数负责监测指定对象上一个或多个指定事件，例如：
            `monitorEvents(window, 'resize')`
            
            monitorEvents也可以同时监测多个事件，例如：
            `monitorEvents(window, ['mousedown', 'mouseup'])`
            
            停止监测事件的命令为：
            `unmonitorEvents(window)`
        +   console.count 函数可以记录某个函数执行的次数，例如：
            <pre><code>function login(user) {
                console.count('Login called');
                // login() code ...
            }
            </code></pre>
            输出为（假设Login执行了三次）：
            <pre>
            Login called: 1
            Login called: 2
            Login called: 3
            </pre>
            
        +   getEventListeners函数可以获取某个元素上绑定的所有事件
        +   keys函数返回一个对象上的所有属性名称组成的数组列表
        +   monitorEvents接收的事件
            <pre><code>Event type | Corresponding mapped events
            mouse      | "mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
            key        | "keydown", "keyup", "keypress", "textInput"
            touch      | "touchstart", "touchmove", "touchend", "touchcancel"
            control    | "resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"
            </code></pre>
        +   values函数返回一个对象上的所有属性值组成的数组列表
        +   console.table函数
            <pre><code>console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
            console.table([[1,2,3], [2,3,4]]);
            </code></pre>
            console.table还可以接收第二个参数，用来表示每一列的名称，例如：
            <pre><code>function Person(firstName, lastName, age) {
              this.firstName = firstName;
              this.lastName = lastName;
              this.age = age;
            }
            
            var family = {};
            family.mother = new Person("Susan", "Doyle", 32);
            family.father = new Person("John", "Doyle", 33);
            family.daughter = new Person("Lily", "Doyle", 5);
            family.son = new Person("Mike", "Doyle", 8);
            
            console.table(family, ["firstName", "lastName", "age"]);
            </code></pre>
            如果只想输出前两列的内容，可以使用如下命令：
            `console.table(family, ["firstName", "lastName"])`