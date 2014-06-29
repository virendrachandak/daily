AngularJS灵活的`directive`名
---

AngularJS是一个HTML编译器。因此，AngularJS最强大的组件就是`directive`。

在Angular中使用`directive`时注意到的第一件事是`directive`对应用可用是如何做到的？要使用一个`directive`，必须对它命名并且将它加到一个`module`中。然后可以使用这个名称来调用`directive`。在使用`directive`时通常要传入将要使用的一些信息。可以通过将`directive`名称设置成元素的属性然后传递一个表达式来实现。这意味着会有如下代码：

```html
<div my-directive="myExpression" />
```

因此需要解析表达式然后获得信息。`directive`代码会编程如下：

```Javascript
var myDirective = function($parse) {
  return {
    link: function(scope, element, attrs) {
      var myInfo = $parse(attrs['myDirective'])(scope);
    }
  };
};
```

上面的代码硬编码了`myDirective`。如果希望使用其他名字呢？最简单的方法就是将`directive`绑定到一个`module`，然后像下面这样强制`directive`的名称：

```javascript
var myDirectiveModule = angular.module('myDirectiveModule', [])
      .directive('myDirective', myDirective);
```

这样用户只需要将`module`作为依赖拉入，`directive`就会被作为`myDirective`被保存下来。

但是如果希望由用户来定义`directive`的调用内容呢？

看angular.js的源代码：

```javascript
/**
 * @ngdoc function
 * @name ng.$compileProvider#directive
 * @methodOf ng.$compileProvider
 * @function
 *  
 * @description
 * Register a new directive with the compiler.
 *
 * @param {String|Object} name Name of the directive in camle-case (i.e. ngBind which)
 *    will match as ng-bind), or an object map of directives where the keys are the
 *    names and the values are the factories.
 * @param {function|Array} directiveFactory An injectable directive factory function.
 *    {@link guide/directive} for more info.
 *  @returns {ng.$compileProvider} Self for chaining.
 */
  this.directive = function registerDirective(name, directiveFactory) {
    assertNotHasOwnProperty(name, 'directive');
    if (isString(name)) {
      assertArg(directiveFactory, 'directiveFactory');
      if (!hasDirectives.hasOwnProperty(name)) {
        hasDirectives[name] = [];
        $provide.factory(name + Suffix, ['$injector', '$exceptionHandler', function($injector, $exceptionHandler) { 
            var directives = [];
            forEach(hashDirectives[name], function(directiveFactory, index) {

              try {
                var directive = $injector.invoke(directiveFactory);
                if (isFunction(directive)) {
                  directive = { compile: valueFn(directiveFactory)};
                } else if (!directive.compile && directive.link) {
                  directive.compile = valueFn(directive.link);
                }
                directive.priority = directive.priority || 0;
                directive.index = index;
                directive.name = directive.name || name;
                directive.require = directive.require || (directive.controller && directive.name);
                directive.restrict = directive.restrict || 'A';
                directives.push(directive);
              } catch(e) {
                $exceptionHandler(e);
              }
            });
            return directives;
        }]);
      }
      hasDirective[name].push(directiveFactory);
    } else {
      forEach(name, reverseParams(registerDirective));
    }
    return this;
  };
```

这是注册`directive`的方式以及传入`name`的代码。也可以看这行：

`directive.name = diretive.name || name;`

其实说的就是如果`directive`对象没有提供`name`的话，那么将其设置成它所注册到的`name`。这意味着如果我们保持一个对该对象的引用，那么就可以像这样使用`name`变量：

```javascript
var myDirective = function($parse) {
  var directiveObj = {
    link: function(scope, element, attrs) {
      var myInfo = $parse(attrs[directiveObj.name])(scope);
    }
  };

  return directiveObj;
};
```

[flexible-directive-names-in-angularjs](http://modernjavascript.blogspot.jp/2013/11/flexible-directive-names-in-angularjs.html)
