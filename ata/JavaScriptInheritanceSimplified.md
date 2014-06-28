如何简单理解JavaScript继承
---

JavaScript中的代码重用机制是如何运行的？其实，只需要两部分内容：

1.  存取代码的方法；
2.  一条能够到达代码的路径（path）。

### 设置原型链（path）

```
var c = {};

var b = {
  '__proto__': c
};

var a = {
  '__proto__': b
};
```

JavaScript将它称为`[[prototype]]`属性，但是ES6将会很快标准化`__proto__`。目前的大部分浏览器都支持该属性，除了一些较老版本的IE。

### 属性存取

```
var c = {
  a : 1
};

var b = {
  '__proto__': c,
  a : 2,
  c : {
    a : 3
  }
};

var a = {
  '__proto__' : b
};
```

这样获取属性的方法就简单了，只需要使用点（`.`）或者字符串属性来存取就可以了。例如：

```
a.c.a;
```

存取器（`a`）的第一个成员将会获取作用于上的一个变量（将会验证作用域向上查找直到找到内容）。查找规则如下：

1.  对象上是否有该属性？是则返回；
2.  是否有`__proto__`？没有则返回`undefined`；
3.  到达`__proto__`并且从第1步继续。

### 设置属性

假设有如下代码：

```
var a = {
  a1: 1,
  a2: { a3: 1 }
};

var aa = {
  '__proto__': a
};

var ab = {
  '__proto__': a
};

// 设置原型链上的属性

aa.a1;  // 1
ab.a1;  // 1
aa.a1 = 2;
ab.a1;  // 1

// 设置原型链上一个对象的属性

aa.a2.a3; // 1
aa.a2.a3; // 1
aa.a2.a3 = 2;
ab.a2.a3;   // 2
```

### 函数呢？

在类继承中有方法，但是JavaScript没有。在对象里加一个函数可能会暗示将在对象中使用，但实际上并不一定。函数有上下文（`context`）。即函数在调用时会用`context`来替换当前所在作用域的`this`。通过获取属性相同的方法来检索一个函数，但是会将`context`设置成最近一次存取时的对象。

```
var a = {
  a : 1,
  getA = function() {
    return this.a;
  };
};

var b = {
  a: 2,
  __proto__: a
};

a.getA(); // 1
b.getA(); // 2
```

### 原文
[JavaScript Inheritance Simplified](http://modernjavascript.blogspot.jp/)
