# 第1章

基础JavaScript
---
本章讲的是“基础JavaScript”，这是我定义的一个`JavaScript`子集，它力求精简，使大家在学习的时候更有效率。我建议在刚开始学习JavaScript的时候，先用它编程感受一段时间。在进阶前不用什么都学，那可能会令你感到困惑。

## 背景

本节会对JavaScript做一些简单的背景介绍，让你更清楚它的来龙去脉。

### JavaScript与ECMAScript

`ECMAScript`是JavaScript的官方命名。因为`Java`已经是一个商标（它的原始持有者是Sun，现在是Oracle），所以它不得不准备一个新的名字。如今，一些早前收到过授权的公司，如Mozilla，是允许使用JavaScript这个名字的。使用`JavaScript`这个名字通常需要遵循以下规则：

* `JavaScript`指的是一种编程语言。
* `ECMAScript`是这种语言规范的名字。因此，每当提到这种语言的版本时，就是指`ECMAScript`。JavaScript当前的版本是ECMAScript 5；ECMAScript 6还在发展之中。

### JavaScript的影响和本质

JavaScript的创造者Brendan Eich，当时除了自己快速地创造这种语言外没有别的选择（或者说，如果他不够快的话，Netscape公司将采用更糟糕的技术）。他借鉴了各种编程语言，如：Java（语法、原始值和对象），Scheme，AWK（第一类函数），Self（原型继承），Perl和Python（字符串、数组和正则表达式）。

直到ECMAScript 3之前，JavaScript都没有异常处理，这也是为什么它经常会自动转换值和静默失败的原因：它最初不能抛出异常。

一方面，JavaScript有些怪异和功能缺失（比如块作用域，模块，子类支持等等）。另一方面，它有许多强大的特性可以弥补这些问题。在其他的语言里，我们学的是语言特性，而在JavaScript中，我们常学的却是模式。

有鉴于此，JavaScript支持函数式编程（高阶函数、内置的map和reduce等等）和面向对象编程（对象、继承）的混合编程风格也就不足为奇了。

### 语法

本节将介绍JavaScript的基本语法原则。

#### 语法概述

一些语法的示例：

```
// 两个斜杠开始，表示单行的注释
var x; // 声明变量
x = 3 + y; // 为变量 `x` 赋值
foo(x, y); // 调用函数 `foo`， 传入参数 `x` 和 `y` 
obj.bar(3); // 调用对象 `obj` 的方法  `bar`

//条件语句
if (x === 0) { // `x` 是否等于零?
  x = 123; 
}

// 定义带有形参`a` 和 `b`的函数 `baz`
function baz(a, b) {
   return a + b;
}
```

注意等于号的两种不同用法：

* 一个单独的等于号（=），用于为变量赋值。
* 三个连续的等于号（===），用于比较两个值（参见[第14页的“等式运算符”](#)）

#### 语句和表达式

要理解JavaScript的语法，需要认识它的两大语法类别：语句和表达式：

* 语句“做事情”。程序其实就是一系列的语句。如这个语句的示例，它用来声明（或创建）一个变量`foo`：

  ```
  var foo;
  ```

* 表达式产生值。它们通常是函数的参数，或是赋值的右边部分等。比如：

  ```
  3 * 7
  ```
  
JavaScript中有两种方式来实现`if-then-else`，这可以很好的说明语句和表达式之间的区别。语句的方式：

```
var x;
if (y >= 0) {
  x = y;
} else {
  x = -y;
}
```

表达式的方式：

```
var x = y >= 0 ? y : -y;
```

后面这种方式可以用于函数的参数（而前者不行）：

```
myFunction(y >= 0 ? y : -y)
```

总之，在JavaScript中，表达式可以用在所有需要语句的地方。比如：

```
foo(7, 1);
```

整个这行就是一条语句（所谓的表达式语句），但这个函数调用`foo(7, 1)`也是一个表达式。

#### 分号

在JavaScript中，分号是可选的。然而，我推荐一直带上它，要不JavaScript会猜错语句的结束位置。详见[第59页“自动分号插入”](#)。

分号用于结束语句，而不是结束块。有一种情况你会看到分号出现在块之后：函数表达式作为一个表达式时。如果这样的表达式出现在语句的最后，它后面就会跟上一个分号：

```
// 模式: var _ = ___;
var x = 3 * 7;
var f = function () { }; // 函数表达式. 出现在变量声明内.
```

#### 注释

JavaScript有两种类型的注释：单行注释和多行注释。单行注释由两个斜杠 `//` 开始，行终止时结束：

```
x++; // 单行注释
```

多行注释限定在 `/*` 和 `*/`之间：

```
/* 这是
   一个多行
   注释.
*/
```

#### 变量和赋值

JavaScript里的变量在声明后使用：

```
var foo; //声明变量 `foo`
```

##### 赋值

变量声明和赋值可以同时进行：

```
var foo = 6;
```

也可以为一个已有变量进行赋值：

```
foo = 4; // 改变变量 `foo`
```

##### 复合赋值运算符

在JavaScript中还会有复合赋值运算符，如 `+=`。以下两种赋值实际上是相等的：

```
x += 1;
x = x + 1;
```

##### 标识符与变量名

标识符是JavaScript中各种语法的名称。比如，变量的名字就是一个标识符。标识符区分大小写。

大致来讲，标识符的第一个字符可以是任意Unicode字符、美元符（$），或者下划线（_）。后面的字符除此之外还可以为任意Unicode数字。因此，以下这些都是合法的标识符：

```
arg0
_tmp
$elem
n
```

以下标识符为保留字 —— 它们是语法的一部分，不能作为变量名使用（包括函数名和参数名）：

```
arguments 	break 		case 		catch
class 		const 		continue 	debugger
default 	delete 		do			else
enum 		export 		extends 	false
finally 	for 		function 	if
implements 	import 		in 			instanceof
interface 	let 		new 		null
package 	private 	protected 	public
return 		static 		super 		switch
this 		throw 		true 		try
typeof 		var 		void		while
```

以下三个标识符不是保留字，但同样需要视为保留字来对待：

```
Infinity
NaN
undefined
```

最后，对一些标准的全局变量名，同样需要避开（参见[第23章](#)）。虽然它们用作局部变量时不会破坏什么，但这还是会使你的代码变得令人困惑。


#### 值

JavaScript有很多值，都是我们预期的编程语言的值：布尔值，数字，字符串，数组等等。在JavaScript中所有的值都有属性。每一个属性都有一个`key`（或者是name）和一个`value`。可以认为，属性就像是一条记录的字段。通过点（.）操作符可以读取属性：

```
value.propKey
```

比如，字符串'abc'有`length`这个属性：

```
> var str = 'abc';
> str.length
3
```

这段代码也可以写为：

```
> 'abc'.length
3
```

`点操作符`同样可以用于给属性赋值：

```
> var obj = {}; // 空的对象
> obj.foo = 123; // 创建 `foo` 属性, 将它设置为 123
123
> obj.foo123
```

我们也可以通过`点操作符`来调用方法：

```
> 'hello'.toUpperCase()
'HELLO'
```

在上面的示例中，我们在值`hello`上调用了`toUpperCase()`方法。

##### 原始值和对象

JavaScript中，对值的区分有点自由：

* `原始值`包括：布尔值，数字，字符串，null和undefined。
* 其他的值都是`对象`。

这两者之间最主要的区别在于它们的比较方式；每个对象都有唯一的标识且只（严格地）等于自己：

```
> var obj1 = {}; // 一个空的对象
> var obj2 = {}; // 另一个空的对象 
> obj1 === obj2
false
> obj1 === obj1
true
```

相反，所有的原始值，只要编码值相同，则被认为相等：

```
> var prim1 = 123; 
> var prim2 = 123; 
> prim1 === prim2 
true
```

后面两节将更详细地介绍原始值和对象。


##### 原始值

以下即为所有的原始值（或简称为`primitives`）：

* 布尔值：true, false（参见[第12页"布尔值"](#)）
* 数字：20156, 1.351（参见[第14页“数字”](#)）
* 字符串：'dh', "abc"（参见[第15页“字符串”](#)）
* 两个“空值”：undefined, null（参见[第10页“undefined和null”](#)）

原始值具有以下特点：

`按值进行比较`

内容比较：
	
```
> 3 === 3
true
> 'abc' === 'abc'
true
```

`不可改变`

其属性不能被改变、添加或移除：
	
```
> str.length // ⇒ 没有效果
3		
> str.foo = 3; // 尝试添加 `foo` 属性
> str.foo // ⇒ 没有效果, 会被认为是未知属性 
undefined
```
	
（读取一个未知属性时，总会返回undefined）

##### 对象

所有的非原始值都是`对象`。最常见的对象有：

* `简单对象`，可以通过`对象字面量`来创建（参见[第25页“单一对象”](#)）：

```
{
  firstName: 'Jane',		
  lastName: 'Doe'	
}
```
	
上述对象有两个属性：属性`firstName`的值是`Jane`，属性`lastName`的值是`Doe`。

* `数组`，可以通过`数组字面量`来创建（参见[第28页“数组”](#)）：

	```
	[ 'apple', 'banana', 'cherry' ]
	```
	
	上面的数组有3个元素，可以通过数字索引来访问它们。比如，'apple'的索引是`0`.

* `正则表达式`，可以通过正则表达式字面量来创建（参见[第31页“正则表达式”](#)）：

	```
	/^a+b+$/
	```

对象具有以下特点：

`按引用进行比较`

比较身份标识；每个值都有各自的身份标识：

```
> {} === {}  // 两个不同的空对象
false

> var obj1 = {};
> var obj2 = obj1; 
> obj1 === obj2 
true
```

`默认可变`

对象属性可以很自由被改变、添加和移除（参见[第25页“单一对象”](#)）：

```
> var obj = {};
> obj.foo = 123; // 添加 `foo` 属性
> obj.foo
123
```

##### undefined 和 null

大多数编程语言都会有一些值去表示丢失的信息。JavaScript有两个类似的“空值”，undefined 和 null：

* undefined的意思是“没有值”。未被初始化的变量即为undefined：

	```
	> var foo; 
	> foo 
	undefined
	```
	
	丢失的参数也会是undefined：
	
	```
	> function f(x) { return x } 
	> f()	
        undefined
	```
	
	访问不存在的属性，也会得到undefined：
	
	```
	> var obj = {}; // 空的对象
	> obj.foo
        undefined
	```

* null的意思是“没有对象”。在用到对象的时候它表示空值（比如，参数，对象链中的最后一个元素等）。

> undefined 和 null 没有属性，甚至连`toString()`这种标准方法都没有。

###### 检查 undefined 或 null

通常，函数允许透过 undefined 或 null 来表示缺失的值。可以通过以下显式的检查来做到同样的事情：

```
if (x === undefined || x === null) {
   ...
}
```

也可以利用 undefined 和 null 都可被视为 false 这一事实来处理：

```
if(!x) {
   ...
}
```

> false, 0, NaN, 和 '' 都可被视为 false（参见[第13页“真值和假值”](#)）

##### 使用typeof和instanceof对值分类

有两种对值进行分类的操作符：typeof主要用于原始值，instanceof用于对象。

typeof用法形如：

```
typeof value
```

它的返回值会是一个表示这个值“类型”的字符串。如以下示例：

```
> typeof true'boolean'> typeof 'abc''string'
> typeof {} // 空对象字面量
'object'
> typeof [] // 空数组字面量
'object'
```

下表列出了typeof会得到的所有结果：

**操作数**|**结果**
-|-
undefined|'undefined'
null|object
布尔值|boolean
数字|number
字符串|string
函数|function
所有其他的常规值|object
引擎创建的值|JavaScript引擎可以被允许去创建一些值，且typeof的结果可以返回任意字符串（可以与上表中列出的结果都不一样）

`typeof nunll`返回`object`是一个不能去修正的bug，因为这会破坏现有的代码。但这并不表示`null`是一个对象。

instanceof用法形如：

```
value instanceof Constr
```

如果`value`是一个通过`Constr`构造器创建的对象，则返回`true`（参见第28页[“构造器：对象工厂”](#)）。如以下示例：

```
> var b = new Bar(); // 通过构造器 Bar 创建的对象
> b instanceof Bar
true
> {} instanceof Object
true
> [] instanceof Array
true
> [] instanceof Object  // 数组是对象的子构造器
true

> undefined instanceof Object
false
> null instanceof Object
false
```

#### 布尔值

原始布尔类型包含 `true` 和 `false` 两个值。以下运算符会产生布尔值：

* 二元逻辑运算符：&& （与）， || （或） 
* 前置逻辑运算符：! （非）
* 比较运算符：  
  * — 相等运算符：===，!==，==，!= 
  * — 排序运算符（针对字符串及数字）：>，>=，<，<=


##### 真值与假值

在JavaScript中，可以使用任意值来表示布尔值（如，作为if语句的条件）。它们都会被解释成 `true` 或 `false`。以下的值会被解释成`false`：

* undefined, null
* 布尔值：false
* 数字：-0, NaN
* 字符串：''

其他所有的值（包括所有的对象）都会被当成`true`。被解释为`false`的值可被称为`假值`，被解释为`true`的值可被称为`真值`。Boolean()作为函数调用时，会将传入的参数转换为一个布尔值。可以用它来测试看看一个值是如何被解释的：

```
> Boolean(undefined)
false> Boolean(0)
false
> Boolean(3)
true
> Boolean({}) // 空的对象
true
> Boolean([]) // 空的数组
true
```

##### 二元逻辑运算符

JavaScript中的二元逻辑运算符是`短路的`。因为如果第一个运算数就足以确定结果的话，则不会对第二个运算数做评估。比如，以下表达式，其中的`foo()`函数永远不会被调用：

```
false && foo() 
true || foo()
```

此外，二元逻辑运算符会返回运算数中的一个 —— 可能是一个布尔值，也可能不是。对真假的检查将用于确定返回哪一个：

与（&&）

如果第一个运算数是假值，返回它。否则，返回第二个运算数：

```
> NaN && 'abc'
NaN
> 123 && 'abc'
'abc'
```

或（||）

如果第一个运算数是真值，返回它。否则，返回第二个运算数：

```
> 'abc' || 123
'abc'
> '' || 123
123
```

##### 相等运算符

JavaScript有两种类型的相等：

* 常规的，或“宽容的”，相等（或不相等）：== 和 !=
* 严格的相等（或不相等）：=== 和 !==

常规相等，更多考虑值是否相等（详细解释参见[第84页“常规（宽容）相等（==，!=）”](#)），这种方式可以隐藏一些bug。因此，推荐使用严格相等。


#### 数字

JavaScript中所有的数字都是浮点数：

```
> 1 === 1.0
true
```

也包含一些特殊的数字：

NaN（"Not a number，不是数字"）

一个错误的值：

```
> Number('xyz')  // 'xyz' 不能转换成数字
NaN
```

Infinity

多数情况下也是一个错误的值：

```
> 3 / 0
Infinity
> Math.pow(2, 1024)  // 数字太大
Infinity
```

`Infinity`比任何一个数都要大（NaN除外）。同样的，`-Infinity`比任何一个数都要小（NaN除外）。这使得这两个数字常用来作为默认值（比如，当你需要一个最小值和最大值的时候）。

#### 运算符

JavaScript具有如下算术运算符（参见[第122页“算术运算符”](#)）:

* 加法：数字1 + 数字2
* 减法：数字1 - 数字2
* 乘法：数字1 * 数字2
* 除法：数字1 / 数字2
* 取模：数字1 % 数字2
* 增量：++变量，变量++
* 减量：--变量，变量--
* 负数：-值
* 转变成数字：+值

全局对象`Math`（参见[第31页“Math”](#)）还会以函数的方式提供更多算术运算。

JavaScript也有一些位运算符（如，位与，参见[第124页“位运算符”](#)）。

#### 字符串

字符串可以直接通过字符串字面量来创建。这些字面量限定在单引号或双引号之内。反斜杠（\）用于转义字符及产生一些控制字符。如以下示例：

```
'abc'
"abc"

'Did she say "Hello"?'
"Did she say \"Hello\"?"

'That\'s nice!'
"That's nice!"

'Line 1\nLine 2' // 会换新行
'反斜杠: \\'
```

可以通过方括号来访问字符串中的单个字符：

```
> var str = 'abc';
> str[1]
'b'
```

字符串的`length`属性可以对字符的个数进行计数：

```
> 'abc'.length
3
```

像所有的原始值一样，字符串是不可变的；如果要改变一个已有的字符串，必须创建一个新的才行。

##### 字符串运算符

字符串可以通过加号（+）进行连接，如果其中一个运算数是字符串的话，另一个运算数将被转换为字符串：

```
> var messageCount = 3;
> 'You have ' + messageCount + ' messages' 
'You have 3 messages'
```

要在多个步骤中连接字符串，可以使用 `+=` 运算符：

```
> var str = '';
> str += 'Multiple ';
> str += 'pieces ';
> str += 'are concatenated.';
> str
'Multiple pieces are concatenated.'
```

##### 字符串方法

字符串有一些常用的方法（参见[第139页“字符串原型方法”](#)）。如以下示例：

```
> 'abc'.slice(1)  // 复制一部分子串
'bc'
> 'abc'.slice(1, 2)'b'

> '\t xyz  '.trim()  // 移除头尾空格
'xyz'

> 'mjölnir'.toUpperCase()
'MJÖLNIR'

> 'abc'.indexOf('b')  // 字符串查找
1
> 'abc'.indexOf('x')
-1
```

#### 语句

JavaScript中的条件和循环语句将在接下来的小节介绍。

##### 条件语句

`if`语句有一个`then`从句以及一个可选的`else`从句，具体的执行取决于布尔条件：

```
if (myvar === 0) {
    // then
}
if (myvar === 0) {
    // then
} else {    
  // else
}
if (myvar === 0) {
    // then
} else if (myvar === 1) {
    // else-if
} else if (myvar === 2) {
    // else-if
} else {    
  // else
}
```

推荐始终使用大括号（它们表示零个或多个语句块）。不过如果从句仅有一个单独的语句时可以不必这么做（对`for`和`while`语句同样适用）：

```
if (x < 0) return -x;
```

以下是`switch`语句，`fruit`的值会决定要执行哪个case：

```
switch (fruit) { 
    case 'banana':       
      // ...       
      break;    
    case 'apple':
      // ...
      break;
    default: // 所有其他的case
      // ...
}
```

`case`之后跟的"运算数"可以是任意表达式；在`switch`里的参数会通过`===`来进行比较。

##### 循环语句

`for`循环有如下格式：

```
for ([«初始化»]; [«条件»]; [«后迭代»])
    «语句»
```

`初始化`会在循环开始前执行。`条件`会在每次循环迭代之前做检查，如果是`false`则终止循环。`后迭代`会在每次循环迭代后执行。


以下示例将在控制台打印出数组`arr`里的每个元素：

```
for (var i=0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

`while`循环语句在条件成立的时候会持续循环：

```
// 与上面的for循环一样:
var i = 0;while (i < arr.length) {     console.log(arr[i]);
  i++;
}
```

`do-while`循环语句在条件成立时会持续循环。由于条件跟在代码体之后，所以，这些代码体至少会执行一次：

```
do {
  // ...
} while (条件);
```

有两条语句适用于所有的循环方式：

* `break` 可以跳离循环
* `continue` 会开始一个新的循环迭代


#### 函数

可以通过`函数声明`的方式来定义函数：

```
function add(param1, param2) {
    return param1 + param2;
}
```

上面的代码定义了函数`add`，它有两个参数：`param1` 和 `param2`，返回值是这两个参数的和。可以这样去调用这个函数：

```
> add(6, 1)7
> add('a', 'b')
'ab'
```

除此之外，我们还可以通过给变量`add`赋值为`函数表达式`的方式来定义`add`函数：

```
var add = function (param1, param2) {
    return param1 + param2;
};
```

函数表达式会产生一个值，因此可以将函数作为参数直接传递给另外的函数：

```
someOtherFunction(function (p1, p2) { ... });
```

##### 函数声明的提升特性

函数声明具有提升特性 —— 它们的实体会被移动到所在作用域的开始处。这使得我们可以引用后面声明的函数。

```
function foo() {    
  bar(); // OK, bar 函数被提升了     
  function bar() {        ...
    }
}
```

注意，`var`声明也具有提升的特性（参见[第23页“变量的提升特性”](#)），但通过它们执行的赋值却不具备该特性：

```
function foo() {    
  bar(); // Not OK, bar 仍然是 undefined 
  var bar = function () {        
    // ...    
  };
}
```

##### 特殊的变量arguments

在JavaScript中，函数的所有参数都可以被自由调用，它会通过`arguments`变量来使所有参数可用。`arguments`看起来像个数组，但却不具备数组的方法：

```
> function f() { return arguments }
> var args = f('a', 'b', 'c');
> args.length
3
> args[0]  // 访问索引位置为0的元素
'a'
```

##### 参数太多或太少

我们可以通过以下函数来探知，在JavaScript中，函数参数太多或太少是如何处理的（`toArray()`函数会在[第21页“将arguments转换为数组”](#)中出现）：

```
function f(x, y) { 
    console.log(x, y);    
    return toArray(arguments);
}
```

额外的参数会被忽略（arguments除外）：

```
> f('a', 'b', 'c')
ab
[ 'a', 'b', 'c' ]
```

丢失的参数会得到undefined这个值：

```
> f('a')
a undefined
[ 'a' ]
> f()
undefined undefined 
[]
```

##### 可选参数

以下是一个给参数赋上默认值的通用模式：

```
function pair(x, y) {
  x = x || 0; // (1) 
  y = y || 0;
  return [ x, y ];
}
```

在标记了`(1)`的这行，`||`运算符会在`x`为真值的时候（非null、undefined等值）返回`x`，否则，会返回第二个运算数：

```
> pair()
[ 0, 0 ]
> pair(3)
[ 3, 0 ]
> pair(3, 5)
[ 3, 5 ]
```

##### 强制参数长度

如果想强制一个参数长度（指定的参数长度），可以通过`arguments.length`来检查：

```
function pair(x, y) {
  if (arguments.length !== 2) {        throw new Error('需要 2 个参数'); 
  }
  ... 
}
```


##### 将arguments转换为数组

`arguments`不是数组，它只是类似于数组（参见[第262页“类数组对象及通用方法”](#)）。它有`length`属性，可以通过方括号去访问它的元素。不能移除它的元素，也不能对它调用数组的方法。因此，有时候会需要将它转换成数组，方法如以下函数所示（在[第262页“类数组对象及通用方法”](#)中会有详细介绍）：

```
function toArray(arrayLikeObject) {    return Array.prototype.slice.call(arrayLikeObject);
}
```

#### 异常处理

JavaScript中最常用的异常处理方式（参见[第14章](#)）如下：

```
function getPerson(id) {
    if (id < 0) {
      throw new Error('ID 不能为负数: '+id);   
  }
  return { id: id }; // 合规: 从数据库中调取 
}
function getPersons(ids) {
    var result = [];
    ids.forEach(function (id) {             
      try {
        var person = getPerson(id);
        result.push(person); 
      } catch (exception) {
        console.log(exception);
      }
    });
    return result;
}
```

`try`从句包围关键代码，当`try`从句内部抛出异常时，`catch`从句被执行。使用以上代码测试：

```
> getPersons([2, -5, 137])
[Error: ID 不能为负数: -5]
[ { id: 2 }, { id: 137 } ]
```

#### 严格模式

严格模式（参见[第62页“严格模式”](#)）提供更多警告且使JavaScript变得更干净（非严格模式有时也被称为“松散模式”）。在JavaScript文件或`<script>`标签代码的第一行输入：

`'use strict'`;

即可开启严格模式，也可以为某个函数开启严格模式：

```
function functionInStrictMode() {
    'use strict';
}
```


#### 变量作用域及闭包

在JavaScript中，变量在使用之前要先通过`var`进行声明：

```
> var x;
> x = 3;
> y = 4;
ReferenceError: y is not defined
```

可以通过一个`var`对多个变量进行声明和初始化：

```
var x = 1, y = 2, z = 3;
```

我的建议是每个变量都使用一条声明语句（原因参见[第382页“语法”](#)里的解释）。因此，以上语句可以改写成这样：

```
var x = 1;
var y = 2;
var z = 3;
```

由于提升特性（参见[第23页“变量的提升特性”](#)），变量声明最好在函数的开头去做。

##### 变量的作用域为函数作用域

变量的作用域总是完整的函数（相当于当前区块）。比如：

```
function foo() { 
    var x = -512;
    if (x < 0) { // (1)
      var tmp = -x;        
      ...    
    }
    console.log(tmp); // 512
}
```

可以看到，变量`tmp`并没有限制在标记`(1)`的这行，它在这个函数结束前都一直存在。

##### 变量的提升特性















































































