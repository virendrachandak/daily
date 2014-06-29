获取AngularJS的当前`directive controller`
---

为`directive`传递信息和函数的方法有许多，其中一种是`controller`。大部分的`directive`会有一个相关联的`controller`来管理需要调用的逻辑，这种方法适合添加功能到`scope`。`directive`可以继承链路上更高级的`controller`，然而，也可能增大使用自定义`controller`的难度。例如：

```javascript
var aControl = function() {};
var bControl = function() {};

var a = function() {
  return {
    link: function() {
      // ctrl references aControl
    },
    controller: aControl
  };
};

var b = function() {
  return {
    require: '^a',
    link: function(scope, element, attrs, ctrl) {
      // ctrl references aControl
      // but how do I get a reference to bControl?
    },
    controller: bControl
  };
};
```

这样除非在AngularJS代码中定义`require`成可见，否则会传入`control`：

```javascript
directive.require = directive.require || (directive.controller && directive.name); 
```

因此，怎样获取当前`control`的`handle`呢？通过查看代码可以看到在一个元素上有`directive`时就可以添加`control`的`handle`。

```javascript
$element.data('$' + directive.name + 'Controller', controllerInstance);
```

因此，要获取当前的`controller`，只需要检查当前元素，如下所示：

```javascript
var b = function() {
  var myDirectiveName = 'b';

  return {
    require: '^a',
    link: function(scope, element, attrs, ctrl) {
      var myParentCtrl = ctrl;

      var myCurrentControl = element.data('$' + myDirectiveName + 'Controller');
    },
    controller: bControl
  };
};
```

[get-current-directive-controller-in](http://modernjavascript.blogspot.jp/2013/11/get-current-directive-controller-in.html)
