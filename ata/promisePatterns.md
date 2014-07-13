Promise模式
---

Promise是编写异步代码而不用缩进的好方法，但如果只是这样使用的话就是[错误过Promise的要点](http://domenic.me/2012/10/14/youre-missing-the-point-of-promises/)了。Promise是简化事务的抽象层，它有两个方便使用的属性：

1.  单个Promise对象可以绑定多个回调；
2.  值和状态（错误）会被传递。

这些属性使得通过回调的通用异步模式变得轻松。下面是一些实例：

### 转换回调函数来返回Promise对象

```javascript
// take a callback function and change it to return a promise
Aplus.toPromise = function(fn) {
  return function() {
    
    // promise to return
    var promise = Aplus();

    // on error we want to reject the promise
    var errorFn = function(data) {
      promise.reject(data);
    };

    // fulfill on success
    var successFn = function(data) {
      promise.fulfill(data);
    };

    // run original function with the error and success functions
    // that will set the promise state when done
    fn.apply(this, [errorFn, successFn].concat([].slice.call(arguments, 0)));

    return promise;
  };
};
```

### 顺序调用

```javascript
var asyncAddOne = Aplus.toPromise(function(err, cb, val) {
    setTimeout(function() {
      cb(val + 1);
    });
});

var asyncMultiplyTwo = APlus.toPromise(function(err, cb, val) {
    setTimeout(function() {
      cb(val * 2);
    });
});

var asyncInverse = APlus.toPromise(function(err, cb, val) {
    setTimeout(function() {
      if (val === 0) {
        return err('value is zero');
      }
      cb(1 / val);
    });
});

var alertResult = function(value) {
  alert(value);
}

asyncAddOne(1)
  .then(asyncMultiplyTwo)
  .then(asyncInverse)
  .then(alertResult);
```

[Promise Patterns](http://modernjavascript.blogspot.jp/2013/09/promise-patterns.html)
