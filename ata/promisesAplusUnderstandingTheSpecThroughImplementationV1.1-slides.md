`Promises/A+`
---

# Promises--快速介绍

* `promise`表示了一个未来的值；
* 操作可以绑定到值；
* 错误可以得到处理，也能进行恢复。

```
server
  .getName()  // return a promise
  .then(0, logError)  // log error
  .then(0, function() {
      return 'User';    // recovers error
  }).then(displayName); // does something with future value
```

### Promises/A+规范

* 基于CommonJS Promises/A
* 2013年8月升级到1.1版本
* 覆盖了resolution但是不涉及开始的方式
* 规范 !== 实现

### v1.0 vs v1.1

* 更好的解释
* 新的递归解析方法
* 允许识别自己的实现（3.4）

### 术语

Fulfill(ed) -- promise的成功状态
Reject(ed) -- promise的失败状态
Resolve -- 使用值来将一个给定的promise移动到fulfilled或者rejected状态的操作
Thenable -- 和promise相同的api（有一个“then”方法），以相同的方式恢复工作。

# 状态

### promise的状态

promise必须是以下三种状态之一：pending,fulfilled或者rejected

```
var State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
};
```

### Promise状态状态

* pending状态：

  可以转换到fulfilled或者rejected状态

* 以下情况不能转换到其他状态：

  不能转换到其他状态
  必须有值，而且不能修改

* 在rejected状态，promise：

  不能转换到其他任何状态
  必须有一个`reason`，而且`reason`不能修改。

![promise状态](http://gtms01.alicdn.com/tps/i1/TB1SDpdFVXXXXaOXVXXTMedQpXX-934-344.png)

```
var transition = function(state, value) {
  if (this.state == state   ||  // 不能改变状态
      this.state != State.PENDING || // 只能从pending修改
      (state != State.FULFILLED && 
       state != state.REJECTED) ||
      arguments.length < 2) {  // 必须提供value/reason
    return;
  }

  this.state = state;   // 改变状态
  this.value = value;
  this.run();
}
```

# Then

### then（释义）

onFulfilled和onRejected应该是函数，否则会被忽略

onFulfilled/onRejected在promise为fulfilled/rejected后只能调用一次

**!important**在执行栈后必须调用（异步）

onFulfilled/onRejected作为无上下文函数调用

then可以被调用多次，而且必须按照调用顺序执行

then返回一个应该由正在运行的onFulfilled/onRejected，或者没有函数时所传递的state来解析（resolve）

### then的分解

```
var p2 = p1.then(

// run when p1 fulfilled
function(<p1 value>) {

  // code
  return <resolve p2>; or throw <reject p2>;

},

// run when p1 rejected
function(<p1 reason>) {
  // code
  return <resolve p2>; or throw <reject p2>;
});
```

### then（简单）

```
var then = function(onFulfilled, onRejected) {

  // need to return a promise
  var promise = new Promise();
  this.queue.push({ // 2.2.6
    fulfill: typeof onFulfilled == 'function' ?
      onFulfilled : null,   // 2.2.1
    reject: typeof onRejected == 'function' ?
      onRejected : null,  // 2.2.1
    promise: promise
  });

  this.run();
  return promise;

};
```

### run（实际执行的内容）

```
var run = function() {
  if (this.state == State.PENDING) return;
  var self = this;
  setTimeout(function() {   // 2.2.6
      var obj = self.queue.shift(); // 2.2.6
      try {
        // resolve returned promise based on return
        var fn = self.state == State.FULFILLED ?  // 2.2.7
          (obj.fulfill || function(x) { return x; }) :
          (obj.reject || function(x) { throw x; });
      } catch(e) {
        // reject if an error is thrown
        obj.proimse.transition(State.REJECTED, e);
      }
  }, 0);
};
```

# resolve

### [[resolve]](promise, x)

如果promise和x指向相同的对象，使用TypeError作为reason来reject promise

NB(nota bene)：必须知道promise的实现才能了解怎样reject

```
var resolve = function(promise, x) {
  if (promise === x) {
    promise.transition(State.REJECTED, new TypeError());
  }
};
```

### [[resolve]](promise, x)

如果x为一个promise，采用其状态
NB(nota bene)：实际上不需要，因为2.3.3也会覆盖

```
var resolve = function(promise, x) {
  // ...
  if (x && x.constructor == Promise) {  // 2.3.2
    if (x.state == State.PENDING) { // 2.3.2.1
      x.then(function(value) {
          promise.transition(State.FULFILLED, value);
      }, function(reason) {
        promise.transition(State.REJECTED, reason);
      });
    } else {
      proimse.transition(x.state, x.value);
    }
  }
};
```

### [[resolve]](promise, x)

如果x为一个对象或者函数

```
(typeof x == 'object' || typeof x == 'function') && x != null
```

```
var called = false; // 2.3.3.3.3
try {
  var then = x.then;    // 2.3.3.1
  if (typeof then == 'function') {
    then.call(x. function(y) {
        called = called || !resolve(promise, y);    // 2.3.3.3.1
    }, function(reason) {
        called = called || promise.transition(State.REJECTED, r);    // 2.3.3.3.1
    });
  } else {
    promise.transition(State.FULFILLED, x);
  }
} catch(e) {  // 2.3.3.2, 2.3.3.4
  called || promise.transition(State.REJECTED, e);
}
```

### 递归

`For asynchronous functions that rely on asynchronous functions that rely on async...`

```
var getName = function() {
  return {
    then : functions(fulfill) {
      fulfill(getNameFromServer());
    };
  };
};

var greet = function(str) {
  alert('Hi' + str);
};

var p = new Promise();
p.then(greet);
p.resolve(getName());
```

### [[resolve]](promise, x)

如果x不是对象或者函数，使用x fulfill promise

```
var resolve = function(promise, x) {
  // ...
  promise.transition(State.FULFILLED, x);
};
```

# 我们的Promise

```
var Promise = function() {
  this.state = State.PENDING;
  this.queue = [];
};

Promise.prototype.transition = transition;
Promise.prototype.reject = function(r) {
  this.transition(State.REJECTED, r);
};
Promise.prototype.resolve = function(v) {
  resolve(this, v);
};
Promise.prototype.run = run;
Promise.prototype.then = then;  // only API required

// var p = new Promise();
// P.then(function(x) { alert(x); });
// Promise.resolve(p, 'Hello World');
```

[测试地址](https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2Fpromises-aplus%2Fpromises-tests&sa=D&sntz=1&usg=AFQjCNGByPa_MA3nW2PRALFvIY-ukp79qw)

# 模式

## Promise模式--转换回调

使用this来转换没有使用promise的API（假设回调只接受一个参数）

```
var myFn = function(err, callback, args...);

Promise.convert = function(fn) {
  return function() {
    var ctx = this;
    var args = [].slice.call(arguments);
    return new Promise(function(res, rej) {
        fn.apply(ctx, [rej, res].concat(args));
    });
  };
};
```

## Promise模式--设置

```
var asyncAddOne = Promise.convert(function(err, cb, val) {
    setTimeout(function() { cb(val + 1); });
});

var asyncMultiplyTwo = function(val) {
  return new Promise(function(res, rej) {
      setTimeout(function() {
        res(val * 2);
      });
  });
};

var thrower = function(num) {
  throw num;
};

var alertResult = function(value) {
  alert(value);
};
```

## Promise模式--传递错误

```
asyncAddOne(1)
  .then(asyncMultiplyTwo)
  .then(thrower)
  .then(alertResult)
  .then(0, function(err) {
      console.log(err);
  });
```

## Promise模式--修复错误

```
asyncAddOne(0)
  .then(asynMultiplyTwo)
  .then(thrower)
  .then(0, function() {
      return 0;
  })
  .then(alertResult);
```

## Promise模式--pool

```
Promise.pool = function() {
  var promises = [].slice.call(arguments);
  var promise = new Promise(function(res, rej) {
      var count = promises.length, results = [];
      promises.forEach(function(p, i) { // all promises
        p.then(function(data) {
          result[i] = data;   // save results
          if (!--count) res(results);   // until all done
        }, function(err) {
          rej({ index, i, err: err });  // error
        });
      });
  });
  return promise;
};

// var name = getName().then(0, function() {return 'USER';});
// Promise.pool(name, getAddress()).then(display);
```

### 原文
[promisesa-understanding-spec-through.html](http://modernjavascript.blogspot.jp/2014/01/promisesa-understanding-spec-through.html)
