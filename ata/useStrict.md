`use strict`
---

> 起源：使用`MacVim`编写代码时发现`JSLint`报错`Use the function form of "use strict"`，出于“打破砂锅问到底的精神”，就有了下面这篇文章。
> update@20140525:写着写着，发现在`vim`下使用`syntastic`来检查javascript和css的语法对提高代码质量还是很有帮助的，下次找机会再介绍下`csslint`的使用。

[stackover flow上的问题和答案](http://stackoverflow.com/questions/4462478/jslint-is-suddenly-reporting-use-the-function-form-of-use-strict)

在包装函数的第一个声明使用`"use strict";`，这样`"use strict";`只会对该函数生效。这样可以防止在合并并非`strict`模式的代码时出错。示例代码：

```javascript
(function() {
  "use strict";
  // this function is strict...
}()

(function() {
  // but this function is sloppy...
}());
```

参考自`Douglas Crockford`的博客文章[`Strict Mode is Coming To Town`](http://www.yuiblog.com/blog/2010/12/14/strict-mode-is-coming-to-town/)。

## `Strict Mode`来了

`ECMAScript`标准第5版最重要的特征之一就是新的`Strict Mode`。`Strict Mode`是一个可选择的模式，用于修复或者删除JavaScript语言最容易产生问题的功能。

#### 指定`Strict Mode`

有两种方法来指定`Strict Mode`。第一种是在文件顶部或者编译单里使用：`"use strict";`这条指令。这条指令必须在其他所有声明之前使用，前面可以出现空格和注释。这条指令的语法形式其实是一条没有用的字符常量声明，因此，`ES3`系统会忽略它。这意味着在较老的浏览器上也可以编写`ES5/Strict`代码。`Strict Mode`代码也可以和`non-strict`或者`sloppy`代码交互，因此`strict`函数可以调用`sloppy`函数，而`sloppy`函数也可以调用`strict`函数。这样的相互兼容性使得`strict mode`代码的修改非常轻松。

文件或者编译单元中所有以`"use strict";`开头的代码都会以`Strict Mode`处理。然而，因为[性能问题](http://yuiblog.com/blog/2007/09/04/video-souders/)需要将文件合并，以防止累积的HTTP延迟引发性能问题。如果声明了`Strict Mode`的文件后面添加了`sloppy`代码，那么`sloppy`代码在`Strict Mode`下处理很有可能会出错。因此，有一条规则是，不要同一个文件里混合使用`Strict Mode`和`Sloppy`模式的代码。

另一种方法是在函数的第一条声明位置插入`"use strict";`。这样整个函数就会是`strict Mode`的（包括所有内嵌的函数也是）。`strict`的严格性遵从函数的作用域，因此可以在相同的文件里混合使用`strict`和`sloppy`的代码。这样的方法对于[模块模式--`Module Pattern`](http://yuiblog.com/blog/2007/06/12/module-pattern/)非常好用。

> 即我们上面见过的代码

```
(function() {
  "use strict";
  // this function is strict...
}()

(function() {
  // but this function is sloppy...
}());
```

###### JavaScript `Module` 模式
<pre>
 YAHOO.namespace('myProject');
 YAHOO.myProject.myModule = function() {
   // "private" variables:
   var myPrivateVar = "I can be accessed only from within YAHOO.myProject.myModule.";
   // "private" method:
   var myPrivateMethod = function() {
     YAHOOO.log("I can be accessed only from within YAHOO.myProject.myModule.");
   }
   
   return {
     myPublicProperty: "I'm accessible as YAHOO.myProject.myModule.myPublicProperty:",
     myPublicMethod: function() {
       YAHOO.log("I'm accessible as YAHOO.myProject.myModule.myPublicMethod.");
       
       // Within myProject, I can access "private" vars and methods;
       YAHOO.log(myPrivateVar);
       YAHOO.log(myPrivateMethod());

       // The native scope of myPublicMethod is myProject; we can
       // access public members using "this":
       YAHOO.log(this.myPublicProperty);
     }
   };
 }();    // the parens here cause the anonymous function to execute and return
</pre>

###### 使用`Module`模式的示例

<pre>
   //假设有如下列表，其中一些列表项是可以拖动的。可拖动的列表项的CSS类包含`draggable`值。 
 &lt;!--This script file includes all of the YUI utilities:--&gt;
 &lt;script type="text/javascript" src="http://yui.yahooapis.com/2.2.2/build/utilities/utilities.js"&gt;&lt;/script&gt;
 &lt;ul id="myList">
   &lt;li class="draggable"&gt;Item one.&lt;/li&gt;
   &lt;li>Item two.&lt;/li&gt;&lt;!--item two won't be draggable--&gt;
   &lt;li class="draggable"&gt;Item three.&lt;/li&gt;
 &lt;/ul&gt;

 &lt;script&gt;
 YAHOO.namespace("myProject");
 YAHOO.myProject.myModule = function() {
    // private shorthand references to YUI utilities:
    var yue = YAHOO.util.Event,
        yuid = YAHOO.util.Dom;

    // private method:
    var getListItems = function() {
      // note that we can use other private variables here, including 
      // our "yud" shorthand to YAHOO.util.Dom:
      var elList = yui.get('myList');
      var aListItems = yud.getElementByClassName("draggable", // get only items with class "draggable"
          "li", // only return list items
          elList  // restrict search to children of this element
      );
      return aListItems;
    };

    // the returned object here will become YAHOO.myProject.myModule:
    return {
      aDragObjects: [], // a publicly accessible place to store our DD objects
      init: function() {
        // we'll defer making list items draggable until the DOM is fully loaded.
        yue.onDOMReady(this.makeLIsDraggable, this, true);
      },
      makeLIsDraggable: function() {
        var aListItems = getListItems;  // these are the elements we'll make draggable
        for (var i = 0, j = aListItems.length; i < j; i++) {
          this.aDragObjects.push(new YAHOO.util.DD(aListItems[i]));
        }
      }
    };
 }(); // the parens here cause the anonymous function to execute and return;

// The above code has already executed, so we can access and return method immediately:
YAHOO.myProject.myModule.init();
 &lt;/script>
</pre>

#### 作用域

历史上，JavaScript的函数作用域经常被弄混。有时候它们会被认为是静态作用域，但是某些功能又让他们的行为像是动态作用域。这很容易让人混淆，也让程序难以阅读和理解。误解又会引发bug。而且还有性能问题。静态作用域允许变量绑定在编译时发生，而动态作用域要求绑定必须延迟到运行时发生，这也就会带来明显的性能损失。

`Strict Mode`要求所有的变量绑定是静态的。这意味着之前需要动态绑定的功能必须去除或者进行修改。具体来说，[`with声明`](http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/)会被去除，`eval`函数篡改其`caller`环境的能力也会受到严格的限制。

`Strict Mode`代码的好处之一在于更方便像[`YUI Compressor`](http://developer.yahoo.com/yui/compressor/)这样的工具的处理。 

#### 隐式全局变量

JavaScript拥有隐式全局变量。如果一个变量没有显示声明，会被隐式声明成一个全局变量。这让初学者的编码更加轻松，因为他们不用处理基本的`家务杂活`（译注：即变量作用域这样的小事）。但这也让大型程序更加难以管理，而且会显著降低代码的可靠性。因此在`Strict Mode`中，不会再创建隐式全局变量。应该显示声明所有变量。

#### 全局渗透

有几种情况会让`this`绑定到全局对象。例如，如果在调用构造函数时忘记提供[`new`](http://www.yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/)[前缀](http://www.yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/)，构造函数的`this`会被意外地绑定到全局对象，因此，不是初始化一个新对象，而会静默地修改掉了全局变量。在这些情况下，`Strict Mode`会将`this`绑定到`undefined`，这样构造函数会抛出一个异常，使得错误可以更快被检测到。

> JavaScript是一门原型语言，但是`new`操作符让它看起来有点项类语言。这容易迷惑开发者引发一些有问题的编码模式。
> 不要使用`new Object()`创建对象，而是使用对象常量`{}`。类似的，不要使用`new Array()`，而是使用数组常量`[]`。[更多](http://www.yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/)

![](http://gtms03.alicdn.com/tps/i3/T1qp6UFKhdXXaJLL7u-638-572.png)

#### `noisy`失败

JavaScript肯定会有一些只读属性，但是直到`ES5`的`Object.createProperty`函数我们将功能暴露出来，我们才能够自己创建这些只读属性。如果为一个只读属性赋值，会静默失败。赋值运算不会修改属性的值，但是你的程序在处理时会将它当成赋予的值。这是一个整体性的灾难，因为程序会变得不一致，在`Strict Mode`，尝试修改只读属性会抛出异常。

> 略去了关于8进制的小节，有兴趣请自己看原文`octal`一节。

#### 其他

在`ES5`中，`arguments`的行为会更像数组。在`Strict Mode`下，它会丢失`callee`和`caller`属性。这样就可以将`arguments`传给不可信的代码而不用泄漏保密的上下文信息。此外，函数的`arguments`属性也被去掉了。

在`Strict Mode`下，函数常量中的重复键为产生语法错误。一个函数不能有两个名字相同的参数。函数不能有与它的参数名相同的变量。函数不能`delete`它拥有的变量。

如果程序通过了[`JSLint`](http://www.jslint.com/)验证，基本上就可以在`Strict Mode`下运行了。

###### 世界仍不完美

还有一些`Strict Mode`没有解决的JavaScript语言的问题。例如，插入分好仍然会造成灾难，`0.1 + 0.2`仍然不等于`0.3`。这些问题的解决还需要在以后版本的标准中解决。

## `Strict Mode`的重要性

除了以上提到的程序可依赖性和可读性，`Strict Mode`也帮助解决了`Mashup`问题。我们希望在页面上引入第三方的代码来帮我们和我们的用户做一些有用的事情，但有不希望让这些代码代替接管浏览器，或者让它接管我们的代码来与用户和服务器交互。我们需要限制这些第三方代码。项[`Google Caja`](http://code.google.com/p/google-caja/)系统就做了这样的事情，但是付出了显著的性能和便利成本。`Crockford`的[`ADsafe`](http://www.adsafe.org/)系统也实现了同样的功能，但代价是去掉了JavaScript语言的`this`和`[]`，这使得修改复用变得困难。`Strict Mode`允许我们创建既有`ADsafe`的便利和性能，也有`Caja`的表达力的程序。随着网站变得越来越复杂，连通性越来越高，这会变得至关重要。

`Strict Mode`并没有解决XSS问题。XSS的解决方案依赖于[W3C采取一些积极的行动](http://ajax.sys-con.com/node/1544072)。

# 参考资料
[jslint-is-suddenly-reporting-use-the-function-form-of-use-strict](http://stackoverflow.com/questions/4462478/jslint-is-suddenly-reporting-use-the-function-form-of-use-strict)
[Strict Mode Is Coming To Town](http://www.yuiblog.com/blog/2010/12/14/strict-mode-is-coming-to-town/)
[Module Pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/)
[Global Domination](http://yuiblog.com/blog/2006/06/01/global-domination/)
[JavaScript, We Hardly new Ya](http://www.yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/)

> 感谢你看到这里，送上彩蛋一枚（请点个赞呗）

### 彩蛋--关于XSS和`W3C采取一些积极的行动`

WEB浏览器最严重的缺陷是`XSS`(`Cross Site Scripting`，跨站点脚本攻击).`XSS`使得攻击者可以在需要用户权限的页面上注入代码。攻击者可以获得与服务器交互的权限、从页面获取数据的权限、修改页面的权限、与用户对话（靠弹出对话框等手段）的权限、从世界上的任意其他服务器加载额外脚本的权限，以及将从服务器、页面或者用户那里获取的数据传输给世界上任何服务器的权限。然而，`XSS`这样的命名是有问题的。两个原因：

1.  并不一定需要第二个站点参与。能够反射用户生成内容的站点可以不用第二个站点就实现攻击。
2.  更重要的一点：`XSS`暗示跨站脚本是件坏事。但实际上，跨站脚本是非常有益的，因为它使得`mashup`成为可能。跨站脚本是的`Ajax`库、`analytics`（分析）代码和广告都成为可能。

问题在于浏览器的安全模型并不期待`mashup`。

`XSS`来源于两个基本问题。第一个就是站点的语言过于复杂。`HTML`可以切入到`HTTP`中，`HTML`可以嵌入`URL`，`CSS`和`JavaScript`中，而且`JavaScript`也可以嵌入到`URL`和`CSS`中。这些语言的编码、转移以及注释等规范都不相同。静态地确认一段文本插入`HTML`文档中有没有危害非常困难。攻击者有大量的手段和技巧来掩盖`payload`避开检测。一直有新的技巧被发现，通常攻击者会首先找到这些技巧。`WEB`并不是作为系统设计，而是草率地拼凑起来的，这种草率性恰恰帮助了攻击者。

第二个问题在于一个页面上的所有脚本都拥有相同的权限。浏览器的安全模型比桌面系统好的地方在于浏览器可以识别用户权限和程序权限（或者站点权限）。但是浏览器没有料到会有一些其他权限的脚本。因此，浏览器会把所有脚本平等地信任为对一个站点有权限的脚本，即使这个站点从其他站点加载了脚本。

`Netscape Navigator 2`的开发者们犯了这样的错没关系，因为他们不能预见浏览器的终极使用方式。但是让这样的错误在WEB标准中存在并且保持了超过15年是无法让人容忍的。必须修复这个问题。

`HTML5`并没有尝试修复`XSS`问题而且从以下3个方面恶化了`XSS`：

1.  `HTML5`涉及面很大很广，可能会引起更多的恶意脚本插入。
2.  `HTML5`添加了一些强大的新功能（例如`local database`和`cross-site networking`），攻击者也能充分利用这些功能。
3.  `HTML5`需要花费很大的努力。`XSS`的解决方案可能要等到`HTML5`完成才能有，而这可能要等上很多年时间。

[Discoverer of JSON Recommends Suspension of HTML5](http://ajax.sys-con.com/node/1544072)

> 综上，`Crockford`大牛在2010年，就是上面这篇文章的发表日期时，认为应该先解决安全问题再推动`HTML5`的其他新功能。现在看来，还是颇有些感想的～其实，有点感觉类似于`Node.js`，难道，这是互联网`唯快不破`的本质决定的？

### 更多参考资料

1. [It's time to start using JavaScript strict mode](http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/)

### 是时候使用`JavaScript` `Strict Mode`了by Nicolas C. Zakas

#### 概述

* 解决两类问题：细节（`subtle`）问题和明显的（`obvious`）问题
  * `subtle`问题可以参考Dmitry Soshnikov的`ECMA-262-5 in Detail`

* `Strict Mode`的目标：能够更快地调试出问题

#### 细节示例

注意：如果希望在浏览器的控制台中看到效果，请在外面加上一个函数来调用，否则`"use strict";`会被忽略掉。

例如：下面的例子，应该写成：
 
```javascript
function test() {
  "use strict";
  with (location) {
    alert(href);
  }
}
```


1.  消除了`with`，例如，下面的代码在`"use strict";`的代码中会报错。

  ```javascript
  with (location) {
    alert(href);
  }
  ```

2.  阻止意外的全局变量，例如下面的代码会在`strict mode`报错：

  ```javascript
  // Throws an error in strict mode
  (function() {
    someUndeclaredVar = "foo";
  })();
  ```

所有示例，看这张截图好了：

![]()

### 其他

在`vim`下面可以通过[`syntastic`](`github`上搜索`scrooloose/syntastic`)插件来方便的调用`jshint`插件对`js`文件进行`strict mode`的检查。同理，还可以使用`csslint`来对css文件进行检查，提高代码质量，避免意想不到的错误。

[http://www.jshint.com/](http://www.jshint.com/)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
