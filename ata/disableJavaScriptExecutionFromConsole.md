禁止从控制台执行JavaScript
---
大部分流行的浏览器都提供了开发者工具。例如Google Chrome在浏览器引擎中集成了
Chrome开发者工具，或者像Mozilla的Firefox浏览器一样提供了扩展机制。这些强大的调试工具促进了JavaScript的发展成熟。JavaScript开发者也终于可以使用如F8、F10、F11等一些从前只在其他语言集成开发环境（IDE）上能用的快捷键。一门编程语言要成熟到足够吸引广大的社区开发者，毫无争议地必须拥有一个强大的调试工具。

随着调试变得越来越流行，这种开放性（绑定在浏览器上而不是特定的IDE上）允许任何人使用控制台编写脚本，在宿主应用环境中（例如浏览器展示的当前页面）执行。显然这会造成安全威胁，因为用户有权执行任意脚本。例如，如果一个用户无权查看其他用户的账户，他/她就不能在控制台执行脚本，因为这样的权限是由后端服务器代码控制的。

在某些情况下，开发者可能因为业务需求希望禁止用户在WEB应用中执行任意脚本。而实际情况是，开发者无法配置用户的浏览器来禁止控制台，也不能让用户停止使用控制台。

在这种情况下，唯一实际的可能就是在WEB应用上加上禁止从控制台执行脚本的代码。那么，如何实现？能够实现吗？

当然可以，下面以Google Chrome的开发者工具为例来解释。

Chrome开发者工具接受控制台中用户敲击的内容作为输入并将这些内容传递到运算函数，在宿主应用环境中执行。在这样做之前，chrome的开发者工具会在控制台对象中创建一个`_commandLineAPI`属性，并执行以下代码内容：

```javascript
with((window&&window.console && window.console._commandLineAPI) || {}) {
//脚本内容
}
```

看到上面的代码，我们会很容易想到要阻止“执行控制台输入的代码”，唯一的方法就是在它执行之前抛出一个异常。

最简单的一个方法就是将控制台（console）对象存储为一个函数变量，并使用accessor/mutators(即get/set)来定义window对象的console属性。在get函数里，我们只需要检查是否存在由chrome开发者工具加上的console属性，在发现有该属性的情况下抛出异常（显然异常不会被处理，从而阻止代码继续执行）。

上述思路的完整代码如下所示：

```HTML
<script type="text/javascript">
(function() {

    var _z = console;
    Object.defineProperty( window, 'console', {
        get: function() {
            if (_z._commandLineAPI) {
                throw "Sorry, Can't execute scripts!";
            }
            return _z;
        },
        set: function(val) {
            _z = val;
        }
    });
})();
</script>
```

将上述代码加入WEB应用后，如果尝试打开控制台执行任何代码，都会输出以下所示信息。

![](http://kspace.in/blog/wp-content/uploads/2013/02/ChromeTools.png)

### 参考资料
1.  [原文](http://kspace.in/blog/2013/02/22/disable-javascript-execution-from-console/)
