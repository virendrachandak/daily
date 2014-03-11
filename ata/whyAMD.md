为什么需要AMD
---
> 本文主要讨论RequireJS中JavaScript模块AMD API的设计和使用。还可以参考一篇讨论更加通用WEB模块的[文章](http://requirejs.org/docs/why.html)。

### 为什么要有模块
什么是JavaScript模块？有什么用？
* 定义：将代码片段封装成有用单元，以及注册模块功能，导出模块值的方法。
* 依赖引用：引用其他代码片段的方法。

### 现代WEB开发

```javascript
(function() {
 var $ = this.jQuery;

 this.myExample = function() {};
}());
```

现在定义JavaScript代码片段的方式是怎样的？

* 通过立即执行的工厂函数来定义。
* 通过HTML script标签加载的全局变量来引用依赖。
* 依赖状态很弱，开发者需要了解正确的依赖顺序。例如，包含Backbone的文件不能在
jQuery标签前出现。
* 需要额外的工具来替换一系列script标签为一个单独的标签，方便部署优化。

在大型项目中这样做的话会给代码管理带来困难，尤其是在脚本依赖存在嵌入和重叠关系时。手写的script标签不适合扩展，也不能按需加载。

### CommonJS

```javascript
var $ = require('jquery');
exports.myExample = function() {};
```

[CommonJS(CJS)](http://groups.google.com/group/commonjs)最初的参与者决定做出一种能够在JavaScript语言上使用的模块格式，而且不一定依赖于浏览器js环境。他们希望能够在浏览器上有权宜之计，并希望能够影响浏览器制造厂商去创建在浏览器上原生支持这种模块格式的解决方案。他们的权宜之计为：

* 使用服务器解析CJS模块，能够在浏览器上使用。
* 或者使用XMLHttpRequest（XHR）来加载模块文本，并在浏览器端完成文本转换和解析。

CJS模块格式只允许一个文件里有一个模块，因此需要使用一种“传输格式”将多个模块集成到一个文件里进行优化和绑定。

通过这种方法，CommonJS做依赖引用、处理循环依赖，以及获取当前模块的某些属性。然而，CommonJS没有完全接受浏览器中一些虽然不能改变但是仍然会影响模块设计的内容：

* 网络加载
* 内在异步性

这也就意味着需要依靠WEB开发者来实现这些内容，而且上面提到的权宜之计意味着调试会非常困难，需要基于eval来调试，或者需要调试由多个文件合并而成的一个单独文件，这在实践上会有困难。虽然现代的浏览器工具可以帮助解决这些困难，但是最终的结果是，在最通用的JS环境--浏览器里使用CommonJS模块并不是最佳的方案。

### AMD

```javascript
define(['jquery'], function($) {
  return function() {};
});
```

AMD格式的想法是：一种比现在“写上一大堆有显示依赖关系并且需要手动调整顺序的script标签”的做法要好，而且能够轻松和直接地在浏览器中使用的模块格式。因此，开始出现了一些不需要服务器端工具而且便于调试的想法，这些想法来源于Dojo使用XHR+eval的实际经验。

这种做法比现在“全局变量加script标签”的改进在于：

* 使用CommonJS的ID字符串来表示依赖关系。可以清楚地声明依赖关系并避免使用全局变量。
* ID可以映射到不同路径，允许实现之间的交换。非常适合创建单元测试模拟。上面的代码示例中，只期待有实现了jQuery的内容，而不一定必须是jQuery。
* 对模块定义进行了封装。可以避免污染全局命名空间。
* 模块值的定义路径清晰。使用`return`或者CommonJS的`exports`都有利于循环依赖。

相对于CommonJS模块的改进为：

* 更适合浏览器，坑更少。其他的方法有调试，跨域/CDN使用，`file://`使用或者需要服务器端工具等问题。
* 定义了在一个文件里引用多个模块的方法。在CommonJS术语里被称为`传输格式`，而
CommonJS还没有就这个术语达成一致。
* 允许将函数设置为返回值。对于构造器函数来说非常有用。在CommonJS里，必须将它设为`exports`对象的属性才行。Node支持`module.exports=function(){}`，但这并不是CommonJS规范的内容。

### 模块定义

使用JavaScript函数进行封装在[module pattern模块模式](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)中有文档说明：

```javascript
(function() {
 this.myGlobal = function() {};
}();
```

这种类型的模块依赖于将属性添加到全局对象或者输出模块值，这样做也很难声明模块内的依赖关系。依赖关系在函数执行时就应该可以使用。这样会限制依赖关系的加载策略。

AMD通过以下方法解决这些问题：

* 通过调用并立即执行`define()`方法来注册工厂函数。
* 将依赖关系作为字符串数组传递，不需要全局变量。
* 所有依赖加载执行后工厂函数只执行一次。
* 将依赖模块作为工厂函数的参数传递。

```javascript
define(['dep1', 'dep2'], function(dep1, dep2) {
  // 通过返回值定义模块值
  return function() {};
});
```

### 命名模块

可以注意到上面的模块并没有声明模块名称。这样模块方便移植。开发者可以将模块放到不同的路径下，并且使用不同的ID或者名字。AMD加载器会基于其他脚本的引用情况给模块分配一个ID。

然而，在性能优化时需要使用工具将多个模块合并到一起，因此需要在优化后的文件中给每个模块命名。因此，AMD允许传递一个字符串参数到`define()`：

```javascript
define('moduleNamewhatever', ['dep1', 'dep2', function(dep1, dep2) {
    return function() {};
}]);
```

应该避免自己为模块命名，并且在开发时一个文件里只有一个模块。然而，为了考虑工具和性能，模块解决方案需要在编译好的资源里标志资源的方法。

### 语法糖

上面的AMD示例在所有浏览器中都可以使用。但是，存在依赖名称和命名函数参数不匹配的风险，而且如果模块依赖较多的话看起来会比较奇怪。

```javascript
define([ "require", "jquery", "blade/object", "blade/fn", "rdapi",
         "oauth", "blade/jig", "blade/url", "dispatch", "accounts",
         "storage", "services", "widgets/AccountPanel", "widgets/TabButton",
         "widgets/AddAccount", "less", "osTheme", "jquery-ui-1.8.7.min",
         "jquery.textOverflow"],
function (require,   $,        object,         fn,         rdapi,
          oauth,   jig,         url,         dispatch,   accounts,
          storage,   services,   AccountPanel,           TabButton,
          AddAccount,           less,   osTheme) {

});
```

CommonJS对以上写法的简化写法（简化的CommonJS包装，simplified CommonJS wrapping）为：

```javascript
define(function (require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function () {};
});
```

AMD加载器会通过使用`Function.prototype.toString()`来解析`require("")`调用，并在内部将上面的define调用转换成：

```javascript
define(['require', 'dependency1', 'dependency2'], function (require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function () {};
});
```

这样加载器就可以异步加载和执行dependency1和dependency2以及上面的函数。

并非所有浏览器都会给出可用的`Function.prototype.toString()`结果。截止到2011年11月，PS3和较老的Opera移动浏览器都不支持。这些浏览器很可能需要网络/设备限制优化过的编译版本，因此需要使用优化程序来讲这些文件转换成普通的数组依赖形式。这样的工具有[RequireJS optimizer](http://requirejs.org/docs/optimization.html)

因为不支持`toString()`扫描的浏览器数量非常少，可以安全地为所有模块使用这种语法糖形式的写法。尤其是如果你希望在代码里对齐模块值变量值时。

### CommonJS兼容性

虽然这种语法糖形式被称为"simplified CommonJS Wrapping"，但是和CommonJS模块并非100%兼容。然而，那些不支持语法糖的模块也不能再浏览器里使用，因为这些模块都会假设依赖同步加载。

大部分CJS模块（差不多95%，根据个人经验）都完美地兼容"simplified CommonJS
Wrapping"。

那些有问题的模块是会进行动态依赖计算的模块，以及在`require()`调用里不适用字符串常量，和不喜欢声明式`require()`调用的模块，例如：

```javascript
var mod = require(someCondition ? 'a' : 'b');

if (someCondition) {
  var a = require('a');
} else {
  var b = require('b');
}
```

这些情况可以使用[`callback-require`](https://github.com/amdjs/amdjs-api/wiki/require)处理。

AMD执行模型更符合ECMAScript Harmony模块规范。CommonJS模块在AMD包装器里不能使用，也不能作为Harmony模块使用。AMD的代码执行行为更加符合新的规范。

### 冗余度和有用度

对于AMD的批评之一，或者相对于CJS模块来说的批评之一，就是AMD需要一层缩进和函数包装。

但事实是：看上去多余的输入和缩进对于AMD来说无关紧要。写代码主要花费在两部分内容上：

* 思考问题
* 阅读代码

编码时花费的大部分时间是在思考而不是打字。虽然倾向于使用更少的代码，但是这样的收益也是有限的，而AMD所需要的多余的输入并没有超过这个限制。

大部分WEB开发者都会使用函数包装器，以避免污染页面全局变量。包装函数非常常见，不会增加阅读代码的成本。

CommonJS格式有以下隐藏的成本：

* 工具依赖成本
* 在跨域读取等情况下不适用于浏览器环境
* 调试麻烦，会增加时间成本

AMD模块需要的工具更少，不适用浏览器的情况更少，调试也更加方便。

更重要的是：能够和其他人分享代码。AMD是达成目标的最快路径。

AMD和相关API帮助未来的JS模块系统引入了下列特征：

* 将函数作为模块值返回
* 动态代码加载
* [加载器插件](http://requirejs.org/docs/plugins.html)
* 选择性映射模块从其他地址加载模块，方便测试时提供mock对象
* 每个模块最多一个IO
* “选择性加入”调用

### 参考资料
1.  [Why AMD?](http://requirejs.org/docs/whyamd.html)
2.  [Javascript Modules, AMD, and the road ahead](http://yahooeng.tumblr.com/post/62383009835/javascript-modules-amd-and-the-road-ahead)
3.  [http://addyosmani.com/writing-modular-js/](http://addyosmani.com/writing-modular-js/)
4.  [http://addyosmani.com/resources/essentialjsdesignpatterns/book/](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
5.  [http://unscriptable.com/2011/09/22/amd-module-patterns-singleton/](http://unscriptable.com/2011/09/22/amd-module-patterns-singleton/)
6.  [http://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/](http://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/)
7.  [http://docs.weejot.com/developer/reference/amd.html](http://docs.weejot.com/developer/reference/amd.html)
