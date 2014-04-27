### 构造函数：对象工厂

到现在为止，你可能觉得JavaScript对象只是从字符串到值的映射，是由JavaScript对象常量提示的变量，和其他语言的图/词典常量相似。然而，JavaScript对象也支持真正的面向对象特征：继承。本届不会彻底解释JavaScript继承的原理，但是会向你展示一个简单的模式来帮助你起步。如果想知道更多请查看第17章。

除了是“真实”函数和方法，函数在JavaScript还有另一个作用：他们成为了构造函数--对象工厂--如果通过`new`操作符调用。因此构造函数也比较类似于其他语言中的类。根据约定，构造函数的名称以大写字母开头。例如：

```javascript
// Set up instance data
function Point(x, y) {
    this.x = x;
    this.y = y;
}
// Methods
Point.prototype.dist = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
```

我们可以看到构造函数有两部分。第一，Point函数设置距离数据。第二，`Point.prototype`属性包含一个带有方法的对象。前面的数据特定于每个势力，而后面的数据在所有实例间共享。

要使用Point，我们通过`new`操作符来调用：

```javascript
> var p = new Point(3, 5);
> p.x
3
> p.dist()
```

### 正则表达式

JavaScript内置支持正则表达式（第19章参考教程并详细解释了工作原理）。正则表达式通过斜杠分隔：

```javascript
/^abc$/
/[A-Za-z0-9]+/
```

`test()`方法，是否有匹配？

```javascript
> /^a+b+$/.test('aaab')
true
> /^a+b+$/.test('aaa')
false
```

`exec()`方法：匹配并捕获组

```javascript
> /a(b+)a/.exec('_abbba_aba_')
['abbba', 'bbb']
```

返回数组在索引0位置包含了完整匹配，在索引1位置包含了第一组捕获，等等。可以调用该方法重复获取所有匹配（305页“`RegExp.prototype.exec`捕获组”有讨论）。

**Math**

Math（参考第12章）是一个带有算术函数的对象。例如：

```javascript
Math.abs(-1)
Math.pow(3, 2)
Math.max(2, -1, 5)
Math.round(1.9)
Math.PI
Math.cos(Math.PI)
```

## JavaScript的本质

JavaScript的本质可以归纳如下：

1. 动态

许多事情都可以改变。例如，可以在对象创建后自由添加和删除属性。可以直接创建对象，而不用首先创建一个对象工厂（即，一个类）。

2. 动态类型

变量和对象属性可以为任意类型的值。

3. 函数和面向对象

JavaScript既支持函数编程（函数是一级类，闭包，部分应用通过`bind()`，内置数组的`map()`和`reduce()`等等）以及面向对象编程（可变状态，对象，继承等等）。

4. 失败无提示（沉默失败）

### 怪异模式和非正统的功能

其他语言学习语言特征，JavaScript中学习模式和变通方案（例如原型继承和对象属性）。

已知怪异的地方：

*   规范上JavaScript只有浮点数，但是内置的JavaScript引擎会尽量使用整数。
P40

### 表达式和声明（P54）

本节研究JavaScript中的重要语法区别：表达式和声明的区别。

#### 表达式

表达式会产生值并且可以在期望有值得地方编写--例如，函数调用的参数或者在赋值的右边。下面每一行都包含了一个表达式：

```javascript
myvar
3 + x
myfunc('a', 'b')
```

#### 声明

概括地说，声明会执行一个动作。循环和if声明都是声明的实例。一个程序基本上是一组声明的序列。

在JavaScript凡是用到声明的地方，也可以用表达式。这样的声明被称为表达式声明（expression statement）。反过来不成立：不能在JavaScript中使用表达式的所有地方使用声明。例如，if声明不能做为函数的参数。

*条件声明和条件表达式*

声明和表达式之前的去边在我们检查两类相似语法类型成员时变得清晰：if声明和条件操作符（表达式）。

下面是一个if声明的实例：

```javascript
var salutation;
if (male) {
    salutation = 'Mr.';
} else {
    salutation = 'Mrs.';
}
```

类似的表达式是条件操作符。前面的声明等同于下面的代码：

```javascript
var salutation = (male ? 'Mr.' : 'Mrs.');
```

*使用有歧义的表达式作为声明*

两种表达式看起来像声明--他们在语法类型上存在歧义：

* 对象常量（表达式）看起来像程序块（声明）：

```javascript
{
    foo: bar(3, 5)
}
```

前面的结构为对象常量或者由`foo:`标签紧跟的程序块，并紧跟函数调用`bar(3,5)`。

* 命名函数表达式看起来像函数声明（声明）：

```javascript
function foo() {}
```

这样的结构为命名函数表达式或者函数声明。前者会产生一个函数，后者会创建一个变量并且给他赋予一个函数。

为了防止解析时的二义性，JavaScript不允许使用对象常量和函数表达式作为声明。即，表达式声明不能以下面的内容开头：

*   花括号
*   `function`关键词

如果一个表达式以上面两个标记，就只能出现在表达式的上下文忠。可以通过例如，在表达式上加圆括号来满足要求。接下来，我们将了解以上示例的在哪些情况下是必须的。

*通过`eval()`来执行一个对象常量*

`eval`会在声明上下文中解析其参数。必须将对象常量放入圆括号中，如果希望`eval`返回一个对象的话：

```javascript
> eval('{ foo: 123 }')
123
> eval('({ foo: 123 })')
{ foo: 123 }
```

*立即调用的函数表达式*

#### 声明块后不需要加分号的情况

* 循环：for，while（do-while需要）
* 分支：if，switch和try
* 函数声明（函数表达式需要）

例如while和do-while：

```javascript
while (a > 0) {
    a--;
}

do {
    a--;
} while (a > 0);
```

函数声明和函数表达式：

```javascript
function foo() {
    // ...
}

var foo = function() {
    // ...
};
```

#### 自动插入分号

Automatic Semicolon Insertion（ASI）在以下情况会判定声明已结束：

*   行结束符（例如，换行符）后跟了一个非法的标记。
*   遇到了结束括号。
*   到了文件末尾。

*示例：通过非法标记来自动插入分号*

下面的代码包含一个后面跟了非法标记的行结束符：

```javascript
if (a < 0) a = 0
console.log(a)
```

`console`标记在0后是非法的，因此会触发ASI：

```
if (a < 0) a = 0;
console.log(a);
```

*示例：通过结束括号来ASI*

下面的代码中，花括号中的声明没有使用分号结束：

```javascript
function add(a, b) { return a + b }
```

ASI后的结果：


```javascript
function add(a, b) { return a + b; }
```

*陷阱：ASI可能会出乎意料地破坏声明*

ASI在关键词`return`后面有行结束符时也会触发。例如：

```javascript
// Don't do this
return
{
    name: 'John'
}
```

ASI会将上面的代码变成：

```javascript
return ;
{
    name: 'John'
}
```

*陷阱：ASI可能出乎意料地没有触发*

有时候新行会以这样的标记开头，这个标记可以作为前一个声明的继续。那么ASI将不被触发，即使看上去应该触发。例如：

```javascript
func()
['ul', 'ol'].foreach(function(t) { handleTag(t)})
```

第二行中的方括号会被解析成`func()`函数返回结果的索引。而方括号里的都好会被解析成`,`操作符（这种情况下会返回`ol`）。这样，上面的代码会变成：


```javascript
func()['ol'].foreach(function(t) { handleTag9t });
```

### 合法标识符P60

标识符的第一个字母可以是：

* 任何Unicode字母，包括拉丁字母（例如`D`），希腊字母（例如`λ`）以及西斯拉夫字符（例如`Д`）。
* 美元符（`$`）
* 下划线（`_`）

### strict mode（严格模式）

#### 变量必须声明

严格模式下的所有变量必须显示声明。

*严格模式下的函数必须在作用域顶级声明*

即：不能讲函数声明放在块作用域中。
