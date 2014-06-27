通过实现来理解`Promise/A+`规范
---

> 本文讲解的`Promise/A+ v1`规范已经升级到v1.1了。然而下面的内容仍然是很好的入门材料。
> [关于v1.1实现的PPT](http://modernjavascript.blogspot.com/2014/01/promisesa-understanding-spec-through.html)

本文将实现[http://promises-aplus.github.io/promises-spec/](http://promises-aplus.github.io/promises-spec/)规范。通过这样做希望可以更深入了解`promises`的工作原理。本文的实现方式被称为`Aplus`，[github地址](https://github.com/rhysbrettbowen/Aplus)

首先看一下样板文件（boilerplate）。先将`Aplus`创建为一个对象：

```
Aplus = {};
```

### Promise状态

[规范](http://promises-aplus.github.io/promises-spec/#promise_states)中提到了三种状态：`pending`（挂起），`fulfilled`（完成）和`rejected`（拒绝）。但是规范并没有声明这三种状态的值，可以枚举出来：

```
var State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
};

var Aplus = {
  state: State.PENDING
};
```

将`promise`的默认状态设置成了`pending`。

现在需要在状态之间转换。转换有几条规则——大部分是什么时候从`pending`转换到其他不能再转换的状态。也有关于什么时候转换到`fulfilled`状态需要`value`，以及`rejected`的`reason`。

根据[术语](http://promises-aplus.github.io/promises-spec/#terminology)说明，`value`可以是包括`undefined`在内的任意值，而`reason`是指示`promise`被拒绝（rejected）的任何值。最后一个定义有点模糊——`undefined`是否能够指示被`rejected`的原因？不能！只有`non-null`的值可以。如果任何事情不能工作则会抛出错误。那么让我们来创建一个处理这些检查的`changeState`方法：

```
var State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
};

var Aplus = {
  state: State.PENDING,
  changeState: function(state, value) {

    // catch changing to same state (perhaps trying to change the value)
    if (this.state == state) {
      throw new Error("can't transition to same state: " + state);
    }

    // trying to change out of fullfilled or rejected
    if (this.state == State.FULFILLED || this.state == State.REJECTED) {
      throw new Error("can't transition from current state: " + state);
    }

    // if second argument isn't given at all (passing undefined allowed)
    if (state == State.FULLFILLED && arguments.length <2) {
      throw new Error("transition to fullfilled must have a non null value");
    }

    // if a null reason is passed in
    if (state == State.REJECTED && value == null) {
      throw new Error("transition to rejected must have a non null reason");
    }

    // change state
    this.state = state;
    this.value = value;
    return this.state;
  }
};
```

### Then

[Then方法](http://promises-aplus.github.io/promises-spec/#the__method)

这是`promise`的主要作用。这个方法处理了所有的链式方法，也是将新函数添加到列表的途径。首先需要有一个基本的`then`函数，该函数会检查`fullfilled`和`rejected`是否为函数，然后将它们保存到一个数组中。这很重要，因为3.2.4小节提到它必须在调用函数前返回，因此必须将它们存储起来稍后执行。此外还需要返回一个`promise`。因此创建一个`promise`并且将它和函数存储到一个数组中：

```
then : function( onFullfilled, onRejected ) {
  // initialize array
  this.cache = this.cache || [];

  var promise = Object.create(Aplus);

  this.cache.push({
    fulfill: onFulfilled,
    reject: onRejected,
    promise: promise
  });

  return promise;
}
```

### 解析(Resolving)

接下来要聚焦到在实际解析`promise`时发生的事情。再次尝试使用简单的例子并添加其他的逻辑。首先可以基于`promise`状态运行`onFullfilled`或者`onRejected`，顺序不能变。然后基于他们的返回值修改他们所关联的`promise`的状态。还需要传入状态改变时得到的值。下面是第一轮循环：

```
resolve: function() {
  // 检查是否为pending
  if (this.state == State.PENDING) {
    return false;
  }

  // for each 'then'
  while (this.cache && this.cache.length) {
    var obj = this.cache.shift();

    // 基于状态获取函数
    var fn = this.state == State.FULLFILLED ? obj.fullfill : obj.reject;
    if (typeof fn != 'function') {
      fn = function() {};
    }

    // 使用值实现（fulfill）`promise`或者使用错误拒绝(reject)
    try {
      obj.promise.changeState( State.FULFILLED, fn(this.value) );
    } catch(error) {
      obj.promise.changeState( State.REJECTED, error );
    }
  }
}
```

这个循环处理了普通函数的“坏情况”（bad case）。还有其他两种需要处理的
情况：缺少函数（目前使用了一个空函数，但是实际上需要传递值或者正确状态的`reason`）和返回一个`promise`对象。首先处理在缺少函数时传递了一个错误或者值的问题：

```
resolve: function() {
  // check if pending
  if (this.state == State.PENDING) {
    return false;
  }

  // for each 'then'
  while (this.cache && this.cache.length) {
    var obj = this.cache.shift();

    var fn = this.state == State.FULLFILLED ? obj.fulfill : obj.reject;

    if (typeof fn != 'function') {
      obj.promise.changeState(this.state, this.value);
    } else {
      // 使用值实现（fulfill）`promise`或者使用错误拒绝(reject)
      try {
        obj.promise.changeState(State.FULFILLED, fn(this.value));
      } catch(error) {
        obj.promise.changeState(State.REJECTED, error);
      }
    }
  }
}
```

如果函数不存在，实际上只是传递了状态和值。读到这里偶然发现如果使用的是`onRejected`函数而且想要将错误状态传递给下一个`promise`，需要抛出另一个错误，否则`promise`会使用返回值来解析。这是一件好事，因为实际上可以通过返回默认值这样的方式来使用`onRejected`“修复”错误。

解析只剩下一件事，即处理`promise`返回时发生的事情。规范给出了[一种实现示例](http://promises-aplus.github.io/promises-spec/#point-65)：

```
resolve: function() {
  // check if pending
  if (this.state == State.PENDING) {
    return false;
  }

  // for each 'then'
  while (this.cache && this.cache.length) {
    var obj = this.cache.shift();

    var fn = this.state == State.FULLFILLED ? obj.fulfill : obj.reject;

    if (typeof fn != 'function') {

      obj.promise.changeState(this.state, this.value);

    } else {
      // 使用值实现（fulfill）`promise`或者使用错误拒绝(reject)
      try {

        var value = fn(this.value);

        // 处理返回的`promise`
        if (value && typeof value.then == 'function') {

          value.then(function(value) {
              obj.promise.changeState(State.FULFILLED, value)
          }, function(reason)) {
              obj.promise.changeState(State.REJECTED, value)
          });

          //处理其他返回值
        } else {

          obj.promise.changeState(State.FULFILLED, fn(this.value));

        }

        // 处理抛出的错误
      } catch(error) {
        obj.promise.changeState(State.REJECTED, error);
      }
    }
  }
}
```

### 异步

目前为止还不错，但是有两点没有处理。首先是`onFulfilled`和`onRejected`函数不应该在同一轮事件循环中调用。修复这点应该只在事件循环后再将`then`函数添加到数组。可以通过`setTimeout`或者`process.nextTick`来完成。为了让事情更加轻松，加上一个方法，该方法将异步执行一个给定的函数，这样就可以使用任何实现来重载。目前使用了`setTimeout`，当然也可以使用`nextTick`或者`requestAnimationFrame`。

```
async: function(fn) {
  setTimeout(fn, 5);
}
```

最后一步是添加`resolve`的时机。有两种需要检查的情况，第一种是在状态已经设置好后添加`then`函数。这种情况的代码如下：

```
then: function(onFulfilled, onRejected) {

  // 初始化数组
  this.cache = this.cache || [];

  var promise = Object.create(Aplus);
  var that = this;
  this.async(function() {
      that.cache.push({
        fulfill: onFulfilled,
        reject: onRejected,
        promise: promise
      });
      that.resolve();
  });

  return promise;
}
```

第二种情况是在`state`修改时，在`changeState`函数结束处添加一个`resolve`。将它们全都包装在一个使用`Object.create`来获取`promise`的函数中，最终代码如下：

```
var Aplus = function() {

  var Sate = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
  };

  var Aplus = {
    state: State.PENDING,
    changeStatus: function(state, value) {

      // 将修改缓存到相同的state（可能尝试修改值）
      if (this.state == state) {
        throw new Error("can't transition to same state: " + state);
      }

      // 尝试从fulfilled和rejected修改
      if (this.state == Stated.FULFILLED || this.state == State.REJECTED) {
        throw new Error("can't transition from current state: " + state);
      }

      // 如果完全没有给出第二个参数（允许传递`undefined`）
      if (state == State.FULFILLED && arguments.length < 2) {
        throw new Error("transition to fulfilled must have a non null value");
      }

      // 如果传递了一个null reason
      if (state == State.REJECTED && value == null) {
        throw new Error("transition to rejected must have a non null reason");
      }

      // 修改state
      this.state = state;
      this.value = value;
      this.resolve();
      return this.state;
    },
    fulfill: function(value) {
        this.changeState(State.FULFILLED, value);
    },
    reject: function(reason) {
        this.changeState(State.REJECTED, reason);
    },
    then: function(onFulfilled, onRejected) {

        // 初始化数组
        this.cache = this.cache || [];

        var promise = Object.create(Aplus);

        var that = this;

        this.async(function() {
            that.cache.push({
              fulfill: onFulfilled,
              reject: onRejected,
              promise: promise
            });
            that.resolve();
        });

        return promise;
    }, 
    resolve: function() {
      // check if pending
      if ( this.state == State.PENDING ) {
        return false;
      }

      // for each 'then'
      while ( this.cache && this.cache.length ) {
        var obj = this.cache.shift();

        var fn = this.state == State.FULFILLED ?
        obj.fulfill :
        obj.reject;


        if ( typeof fn != 'function' ) {

        obj.promise.changeState( this.state, this.value );

        } else {

        // fulfill promise with value or reject with error
        try {

          var value = fn( this.value );

          // deal with promise returned
          if ( value && typeof value.then == 'function' ) {
          value.then( function( value ) {
            obj.promise.changeState( State.FULFILLED, value );
          }, function( error ) {
            obj.promise.changeState( State.REJECTED, error );
          });
          // deal with other value returned
          } else {
          obj.promise.changeState( State.FULFILLED, value );
          }
        // deal with error thrown
        } catch (error) {
          obj.promise.changeState( State.REJECTED, error );
        }
      }
    },
    async: function(fn) {
      setTimeout(fn, 5);
    }
  };

  return Object.create(Aplus);
}
```

### 英文原文
[blogspot原文--有墙！](http://modernjavascript.blogspot.jp/2013/08/promisesa-understanding-by-doing.html)
