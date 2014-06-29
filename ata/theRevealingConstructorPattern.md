Revealing Constructor模式
---

> 本文将[`promises`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)和[`streams`](https://github.com/whatwg/streams)这样的WEB平台规范统称为`revealing constructor`模式。

### `Promises`示例

```javascript
var p = new Promise(function(resolve, reject) {
    // Use `resolve` to resolve `p`
    // Use `reject` to reject `p`
});
```

`Promise`的构造函数接受一个单一的函数作为唯一的参数（称为`executor function`），并使用两个参数（`resolve`和`reject`）来调用。`resolve`和`reject`都可以修改新创建的`Promise`实例`p`的内部状态。

之所以称为`revealing constructor`模式是因为`Promise`的构造函数`revealing`了它的内部功能，但是只针对构造了`promise`对象的代码。但是`p`的内部状态没有开放给其他消费者。例如：

`doThingWith(p);`

## 原文

[the-revealing-constructor-pattern](http://domenic.me/2014/02/13/the-revealing-constructor-pattern/)
