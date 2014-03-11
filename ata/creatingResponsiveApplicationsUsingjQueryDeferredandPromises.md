使用jQuery deferred和promises创建响应式应用
---
deferred通过创建`promises`提供了抽取非阻塞元素（例如ajax请求响应）的解决方案。`promise`对象是为了在未来某个点返回响应。如果还不了解`promises`，下文马上会进行详细讲解。

deferreds可以被看成一种需要花费较长时间才能完成的高成本操作。这是一种阻塞函数的异步替代方案，其主要思想是在等待请求完成时不阻塞应用，而是马上返回一个`deferred`对象并将回调函数绑定到`deferred`对象上，在请求实际完成时调用。

###　promises

本节主要讨论如何理解可以应用于几乎所有JavaScript框架，支持不同类型`deferreds`的`promises`工作原理。

最基本的`promise`形式是提供了`deferred`（或者未来）结果概念的软件工程解决方案。其主要思想是：不执行引发阻塞的调用，而是返回一个最终会满足未来值的`promise`对象。

考虑一个严重依赖于第三方API数据的web应用。常见的问题就是不知道API服务器在给定时间内的延迟，有可能应用的某些组件会在得到返回结果前阻塞。`deferred`提供了对这种问题更好的解决方案，不会有延迟，也可以完全解耦。

[`Promise/A`](http://wiki.commonjs.org/wiki/Promises/A)方案定义了一个`then`方法，用于注册`promise`的回调函数，并在可用时获取结果。处理返回`promise`对象的第三方API的伪代码如下所示：

```javascript
promise = callToAPI(arg1, arg2, ...);

promise.then(function(futureValue) {
    // 处理futureValue
});

promise.then(functin(futureValue) {
    //其他处理
});
```

除此之外，一个`promise`还有两种不同的结束状态：

1.  resolved：数据可用的状态
2.  rejected：出错，无数据可用的状态

所幸`then`方法接受两个参数：一个用于`promise`对象状态为`resolved`时，另一个用于`promise`状态为`rejected`。相应伪代码为：

```javascript
promise.then(function(futureValue) {
    //获得数据
}, function() {
    //出错
});
```

某些应用在继续前需要有多个返回值（例如，在屏幕上显示用户感兴趣、可以选择的动态选项集合）。这种情况下，可以使用`when`方法，该方法在`promise`完全完成时执行某些操作。

```javascript
when(
    promise1,
    promise2,
    ...
).then(function(futureValue1, futureValue2, ...) {
    /* 所有的promises都已经完成并且resolved */
});
```

一种好的场景示例就是有多个动画并发执行的情况。不记录完成时触发的回调函数，会难以记录所有动画运行完成。然而，使用`promise`和`then`方法会非常清楚。因为每个动画都会“在结束时有响应”。这样的合成结果意味着动画结束的当个回调函数

### 参考资料
1.  [Creating Responsive Applications Using jQuery Deferred and Promises](http://msdn.microsoft.com/zh-cn/magazine/gg723713(en-us).aspx)
