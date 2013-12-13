### JavaScript Source Map介绍[译]
>   译者序：在我们的项目中越来越多使用grunt，coffee等工具，提高了生产效率的同时也造成了开发调试上的麻烦，如何调试线上压缩合并过的代码，快速发现解决问题，有很多办法，下面译文介绍的source map就是浏览器为我们考虑并且原生支持的解决方案。

1.  source map是什么
    *   在生产环境中，我们的javascript代码通常都会被合并和压缩，如果要调试线上代码会比较麻烦。source map就是为了解决这个问题出现的。它能够将生产环境的代码对应到相应的开发代码，甚至能够对应coffeescript和编译出来的javascript代码，方便我们的开发和调试。如果还不清楚source map的具体概念，可以参考以下链接给出的简单demo
        >   生产代码：即线上使用的合并压缩过的代码；开发代码：即未压缩未合并的原始代码或者没有经过编译的coffeescript和less，sass代码
    *   [source map demo](http://www.thecssninja.com/demo/source_mapping/)
    *   在上面的demo中，输入框里的内容是压缩合并后的jquery代码，我们只需要在输入框中点击鼠标右键，选中“Get original location”，就能查询到对应的jquery源代码的位置。
        >（注意，请使用`chrome`或者`firefox23+`打开demo并且开启console，chrome的快捷键是`ctr+shift+j`，firefox需要安装[firebug](http://getfirebug.com/)，快捷键为`F12`)。
        
    *   在控制台中我们可以看到输出了以下内容：<br>
        ![](http://gtms01.alicdn.com/tps/i1/T1t1UAFl4bXXaItlvt-252-90.png)
    *   这个输出就是source map的源代码信息，包括`source`源代码文件名称`jquery.js`，行数`line`，以及列数`column`等信息。
2.  浏览器支持和实际应用情况
    *   原文发表的时间是2012年3月，现在chrome浏览器（无需canary版）已经支持source map功能并且还提供了`Auto-reload generated css`功能，截图如下所示：
    >   ![](http://gtms01.alicdn.com/tps/i1/T1v5hkFrpcXXXCEKou-1393-334.png)
    *   firefox自带的开发者工具也支持source map功能，截图如下所示：
    >   ![](http://gtms01.alicdn.com/tps/i1/T17SLqFn0cXXb.XanD-1361-463.png)
    >   打开firefox自带开发者工具的快捷键为`ctr+shift+k`，切换到`调试器面板`点击右上角的设置，可以看到`显示原始来源`，就是source map功能。
    *   source map很酷，但是实际应用情况呢，可以看一个线上的实例[http://dev.fontdragr.com/](http://dev.fontdragr.com/)。这个站点引用的javascript都没有被压缩，但实际上它运行的代码都是压缩过的。调试该站点时的错误、日志和断点都会跳到开发代码里去。
3.  为什么要使用source map？
    *   原文提到了暂时只支持压缩合并代码和源码之间的source map，并说未来可能支持coffeescript的source map和css预处理器，例如SASS、LESS的source map。具体列表如下：
        *   CoffeeScript
        *   ECMAScript 6：[从ecma6到ecma3的source map demo](http://www.thecssninja.com/demo/source_mapping/ES6/)
        *   SASS/LESS
        *   任何能够编译成JavaScript的语言
    *   实际上这些在今天（2013年）都已经实现了。
4.  如何使用source map？
    *   通知浏览器支持source map的两种方式
        1.  在js文件末尾加上特殊的注释语句，格式为`//# sourceMappingURL=/path/to/file.js.map`。
        2.  为编译好的javascript文件使用配置如下http头信息：`X-SourceMap: /path/to/file.js.map`
            >   [nginx配置定制的头信息](http://www.cyberciti.biz/faq/nginx-send-custom-http-headers/)或者google关键词`http custom header`
    *   需要在浏览器设置中开启source map支持，并且上传源代码文件以供source map引用和显示。
5.  如何生成source map？
    1.  使用[google closure](http://dl.google.com/closure-compiler/compiler-latest.zip)压缩合并javascript文件并且生成source map文件。
        <pre><code>java -jar compiler.jar \ 
             --js script.js \
             --create_source_map ./script-min.js.map \
             --source_map_format=V3 \
             --js_output_file script-min.js
        </code></pre>
        >   注意：原文中给出的命令加上了`\`这样的符号，这是为了在页面上排版显示方便加的换行符，其实可以写成一行，写成一行将后面的`\`去掉就行了，如下所示：
        >   `java -jar compiler.jar --js script.js --create_source_map ./script-min.js.map --source_map_format=V3 --js_output_file script-min.js`
        >   重点是要使用`--create_source_map`和`--source_map_format`两个命令。
        *   我们可以使用[kissy](http://g.tbcdn.cn/kissy/k/1.4.1/seed.js?20131206)来做实验。命令为：
        `java -jar compiler.jar --js seed.js --create_source_map ./seed.js.map --source_map_format=V3 --js_output_file seed-min.js`
        >   假设我们生成的source map文件名为`see.js.map`，其内容如下：<br>
        >   ![](http://gtms01.alicdn.com/tps/i1/T1QOUjFbhcXXbZn9ES-1329-191.png)
        
        *   可以看出source map实际上是一个对象字面量，它包含了如下信息
            *   `version`:source map的版本
            *   `file`:生成的文件名，例如本次实验给的名称为`seed-min.js`
            *   `mappings`:Base64 VLQ编码值（详情可以浏览参考资料里的“从SourceMap到SPM埋点--Base65 VLQ编码的魔力”）
            *   `sources`:合并的文件
            *   `names`:源码中的变量名和方法名
            *   `lineCount`:合并后代码的行数
            >   更多内容，请浏览参考资料[Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&pli=1&pli=1#)

6.  Base64 VLQ
    *   第一版的source map规范生成的source map文件非常大，大约是压缩后的代码的10倍，第二版减少了大约50%，第三版再减少了50%。
    *   VLQ（Variable Length Quality）
    >   这部分内容与前端日常工作关系不大，有兴趣的同学可以自己去找原文了解了解。
    
7.  潜在的XSS问题
    *   source map v3上的原文是这样的：
    *   JSON over HTTP Transport
    *   XSSI attacks could potentially make source maps available to attackers by doing a direct script src to a source map after overriding the Array constructor. This can be effectively prevented by preprending a JavaScript syntax error to the start of the response.
    *   Thus when delivering source maps over HTTP, servers may prepend a line starting with the string “)]}'” to the sourcemap. If the response starts with this string clients must ignore the first line.
    *   简单来说，就是为了避免邪恶的代码被注入，故意在source map中插入`)]}`，然后再检查这几个字符并且处理处真正的source map内容。代码如下所示：
        <pre><code>if (response.slice(0, 3) === ")]}") {
        response = response.substring(response.indexOf('\n'));
    }
        </code></pre>

8.  Eval和匿名函数：sourceURL和显示名称
    *   处理eval和匿名函数时，下面两种方法可以让你的开发过程更加轻松。
        1.   使用`//# sourceMappingURL`，实例如下：<br>
            *   ![](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/source-url.png)
            *   注意`//# sourceURL=sqrt.coffee`
            *   [demo地址](http://www.thecssninja.com/demo/source_mapping/compile.html)
        2.  另一种方法是给`diaplayName`属性赋值，例如：
            <pre><code>btns[0].addEventListener("click", function(e) {
                var fn = function() {
                    console.log("You clicked button number: 1");
                };
                fn.displayName = "Anonymous function of button 1";
                return fn();
            }, false);
            </pre></code>
            *   [demo地址](http://www.thecssninja.com/demo/source_mapping/displayName.html)
            *   ![](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/display-name.png)
            >   注意，通过实验发现这里说的通过displayName给匿名函数显示名称的做法目前在chrome的稳定版本里还是不支持的。chromium开发者也已经关闭了这个[issue](https://code.google.com/p/chromium/issues/detail?id=116220)，不过在评论中有人提到了coffeescript是可以实现这个需求的。
      
9.  总结
    *   一些支持source map的[工具列表](https://github.com/ryanseddon/source-map/wiki/Source-maps%3A-languages,-tools-and-other-info)
    *   [支持sourcemap的uglifyjs fork](https://github.com/fitzgen/UglifyJS/tree/source-maps)
    *   [Paul Irish制作的source map demo](http://dl.dropbox.com/u/39519/sourcemapapp/index.html)(!小心有墙)
    *   [支持source map的gem](https://github.com/ConradIrwin/ruby-source_map)
    *   关于后面提到的eval和匿名函数，可以参考[eval naming](http://blog.getfirebug.com/2009/08/11/give-your-eval-a-name-with-sourceurl/)和[displayName属性](http://www.alertdebugging.com/2009/04/29/building-a-better-javascript-profiler-with-webkit/)  
    *   总之，source map可以让应用保持轻巧（文件的轻巧），并且能够保持开发的便利。对于开发新手来说，也可以了解和熟悉开发的结构而不用查看难以阅读的压缩文件。
    >   如果项目中使用了压缩合并工具，或者coffeescript和css预编译器，可以将source map用起来吧

#### 参考资料
1.  [英文原文](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
2.  [Javascript Source Map详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
3.  [从SourceMap到SPM埋点——Base64 VLQ编码的魔力 ](http://www.atatech.org/article/detail/5816/442)
3.  [source map revision 3 proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&pli=1&pli=1)
4.  [ES6 in the house](http://www.thecssninja.com/demo/source_mapping/ES6/)
5.  [source maps 101@nettus+](http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/)
6.  [npm source-map-support](https://npmjs.org/package/source-map-support)
7.  [coffeescript sourcemap.litcoffee](http://coffeescript.org/documentation/docs/sourcemap.html)
8.  [hacks.mozilla.org:compiling to javascript and debugging with source maps](https://hacks.mozilla.org/2013/05/compiling-to-javascript-and-debugging-with-source-maps/)
9.  [brunch:an ultra-fast HTML5 build tool](http://brunch.io/)
10.  [google closure compiler](https://code.google.com/p/closure-compiler/)
11.  [guides_sourcemaps](https://rollbar.com/docs/guides_sourcemaps/)