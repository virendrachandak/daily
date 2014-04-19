第二章  数组
---

数组是计算机编程中最常见的数据结构。每种编程语言都有某些格式的数组。因为数组内建于编程语言中，效率高，通常会被认为适用于数据存储任务。本章我们将探索JavaScript中数组的工作方式以及使用时机。

### JavaScript数组定义

数组的标准定义为可以通过索引（通常为用于计算偏移值的整数）来访问的元素的线性集合。大部分计算机编程语言都有这种类型的数组。但是JavaScript的数组类型却完全不一样。

JavaScript数组实际上是一个特殊类型的JavaScript对象，而用于代表偏移值的整数索引其实是属性名称。这些整数索引值在用于索引时会被内部转换成字符串以遵循JavaScript对象的要求。因为JavaScript数组是对象，效率并没有其他编程语言的数组那么高。

而且严格说来，JavaScript数组实际上是JavaScript对象，是内部标示为数组的特殊对象。数组是JavaScript最受认可的对象类型之一，因此和对象一样有一组可用属性和函数。

### 使用数组

JavaScript数组非常灵活。有多种不同方法可以创建数组、访问数组元素以及对数组中的元素执行搜索和排序任务。JavaScript1.5也包含了允许程序员使用函数编程技巧来操作数组的数组函数。在下面一节展示了所有这些技巧。


### 创建数组

创建数组最简单的方法是使用`[]`（方括号）操作符来声明一个数组变量：

```javascript
var numbers = [];
```

使用这种方式创建的数组长度为0.可以通过内建的`length`属性来验证：

`print(numbers.length);     //显示0`

另一种创建数组的方式是使用`[]`操作符和一组元素：

```javascript
var numbers = [1,2,3,4,5];
```

可以通过调用`Array`构造函数来创建数组：

```javascript
var numbers = new Array();
print(numbers.length);  //显示0
```

可以在调用`Array`构造函数时传递一组元素：

```javascript
var numbers = new Array(1,2,3,4,5);
print(numbers.length);  // 显示5
```

最后，可以通过调用`Array`构造函数和一个单独的参数来指定数组长度：

```javascript
var numbers = new Array(10);
print(numbers.length);  //显示10
```

不像许多其他编程语言，但是在大部分脚本语言中常见的是，JavaScript数组元素的数据类型可以不相同：

```javascript
var objects = [1, 'Joe', true, null);
```

可以通过调用`Array.isArray()`函数来验证某个对象是否为数组，例如：

```javascript
var numbers  = 3;
var arr = [7, 4, 1776];
print(Array.isArray(number));   //显示false
print(Array.isArray(arr));  //显示true
```

我们讲到了创建数组的几种技巧。至于哪个函数最好，大部分JavaScript专家推荐使用`[]`操作符，他们认为这样比调用`Array`构造函数效率更高（参考《JavaScript权威指南》[O'Reilly]以及《JavaScript语言精粹》[O'Reilly]）。


### 访问和写数组元素

通过在赋值语句中使用`[]`操作符来为数据元素赋予数据值。例如，下面的循环为一个数组赋予1到100的数值：

```javascript
var nums = [];
for (var i = 0; i < 100; ++i) {
    nums[i] = i + 1;
}
```

也可以使用`[]`操作符来访问数组元素。例如：

```javascript
var numbers = [1,2,3,4,5];
var sum = numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4];
print(sum);     //显示15
```

当然，使用`for`循环顺序访问一个数组中的所有元素更加容易：

```javascript
var numbers  = [1,2,3,5,8,13,21];
var sum = 0;
for (var i = 0; i < numbers.length; ++i) {
    sum += numbers[i];
}
print(sum);     //显示52
```

注意`for`循环使用`length`属性而不是整数常量来控制。因为JavaScript数组是对象，数组大小可以大于创建时指定的大小。通过使用`length`属性（返回当前数组元素的数量），可以保证循环可以处理所有的数组元素。

### 从字符串创建数组

可以通过调用字符串的`split()`函数来创建数组。`split()`函数会使用一个公共分隔符来分割字符串，例如每个词中间一个空格，以及创建一个包含字符串各个单独部分的数组。

下面的短程序演示了`split()`函数在一个简单字符串上的工作方式：

```javascript
var sentence = "the quick brown fox jumped over the lazy dog";
var words = sentence.split("");
for (var i = 0; i < words.length; ++i) {
    print("word" + i + ":" + words[i]);
}
```

程序的输出为：

```javascript
word 0: the
word 1: quick
word 2: brown
word 3: fox
word 4: jumped
word 5: over
word 6: the
word 7: lazy
word 8: dog
```

### 数组集合操作

数组有几种集合操作。首先，可以将一个数组赋值给另一个数组：

```javascript
var nums = [];
for (var i = 0; i < 10; ++i) {
    nums[i] = i + 1;
}
var samenums = nums;
```

然而，在将一个数组赋值给另一个数组时，实际上是将一个引用赋予了被赋值数组。对原始数组所做的修改将反映到另一个数组上。下面的代码片段演示了这样的赋值：

```javascript
var nums = [];
for (var i = 0; i < 100; ++i) {
    nums[i] = i + 1;
}
var samenums = nums;
nums[0] = 400;
print(samenums[0]);     //显示400
```

这样的操作被称为浅拷贝（shallow copy）。新数组简单地指向了原始数组元素。一种更好的替代方法是做一次深拷贝（deep copy），这样原始数组的元素实际上被拷贝到了新数组元素中。一种有效的深拷贝方法是创建一个用于执行这种任务的函数：

```javascript
function copy(arr1, arr2) {
    for (var i = 0; i < arr1.length; ++i) {
        arr2[i] = arr1[i];
    }
}
```

这样下面的代码片段会生成期待的结果：

```javascript
var nums = [];
for (var i = 0; i < 100; ++i) {
nums[i] = i+1;
}
var samenums = [];
copy(nums, samenums);
nums[0] = 400;
print(samenums[0]);     //显示1
```

另一种数组上的集合操作是使用`print()`等类似函数来显示数组的内容。例如：

```javascript
var nums = [1,2,3,4,5];
print(nums);
```

会输出下面的内容：

```
1,2,3,4,5
```

这样的输出不是特别有用，但是可以在只需要简单列表时显示数组内容。



### 访问器函数

JavaScript提供了一系列用于访问数组元素的方法。我们称这些方法为“访问器函数”，它们将目标数组以某种形式作为返回值返回。

#### 搜索值

一个最常用的存取函数是`indexOf`方法，它用于判断传入的参数是否在数组中。如果参数是数组项，则函数返回该项的位置索引。如果参数不在数组中，则函数返回-1。示例如下：

```
var names = ["David", "Cynthia", "Raymond", "Clayton", "Jennifer"]; 
putstr("Enter a name to search for: ");
var name = readline();
var position = names.indexOf(name);
if (position >= 0) {
	print("Found " + name + " at position " + position);
} else {
	print(name + " not found in array.");
}
```

如果你运行以上的代码，并输入`Cynthia`，程序会输出如下结果：

```
Found Cynthia at position 1
```

如果你输入`Joe`，则结果如下：

```
Joe not found in array.
```

如果在数组中存在多个相同的值，`indexOf()`方法总是返回第一个匹配项的位置信息。一个类似的方法是`lastIndexOf()`，它会返回最后一个匹配项的位置信息，若没有匹配项，则会返回-1。示例如下：

```
var names = ["David", "Mike", "Cynthia", "Raymond", "Clayton", "Mike", "Jennifer"];
var name = "Mike";
var firstPos = names.indexOf(name);
print("First found " + name + " at position " + firstPos); 
var lastPos = names.lastIndexOf(name);
print("Last found " + name + " at position " + lastPos);
```

以上程序的输出内容为：

```
First found Mike at position 1
Last found Mike at position 5
```

#### 数组的字符串表示

有两个函数方法可以将数组对象转换为字符串：`join()`和`toString()`。这两个函数都返回一个使用逗号分隔符将数组所有数据项拼接而成的字符串。示例如下：

```
var names = ["David", "Cynthia", "Raymond", "Clayton", "Mike", "Jennifer"]; 
var namestr = names.join();
print(namestr); // David,Cynthia,Raymond,Clayton,Mike,Jennifer
namestr = names.toString();
print(namestr); // David,Cynthia,Raymond,Clayton,Mike,Jennifer
```

在传递数组对象到`print()`方法时，函数会自动调用`toString()`函数来处理这个数组对象：

```
print(names); // David,Cynthia,Raymond,Clayton,Mike,Jennifer
```

#### 从已有数组创建新数组

有两个访问器函数可以从已有数组创建新数组：`concat()`和`splice()`。`concat()`函数用于合并两个或更多数组到一个新数组，`splice`函数则可以从现有数组的子集创建一个新数组。

了解一下`concat()`函数的工作方式。从已有数组调用该方法，参数是另一个已有数组。这个参数数组会通过调用`concat()`方法合并到的数组的末尾。下面的代码演示了`concat()`的工作方式：

```
var cisDept = ["Mike", "Clayton", "Terrill", "Danny", "Jennifer"]; 
var dmpDept = ["Raymond", "Cynthia", "Bryan"];
var itDiv = cis.concat(dmp);
print(itDiv);
itDiv = dmp.concat(cisDept);
print(itDiv);
```
程序最终输出如下内容：

```
Mike,Clayton,Terrill,Danny,Jennifer,Raymond,Cynthia,Bryan
Raymond,Cynthia,Bryan,Mike,Clayton,Terrill,Danny,Jennifer
```

第一行输出先展示了`cis`数组中的数据，而第二行输出先展示了`dmp`数组的数据。

`splice()`函数也会从已有数组创建一个新的数组。该函数的参数分别为截取操作的起始索引和要截取的数组项数量。下面的代码展示了该方法的工作方式：

```
var itDiv = ["Mike","Clayton","Terrill","Raymond","Cynthia","Danny","Jennifer"]; 
var dmpDept = itDiv.splice(3,3);
var cisDept = itDiv;
print(dmpDept); // Raymond,Cynthia,Danny
print(cisDept); // Mike,Clayton,Terrill,Jennifer
```

`splice()`方法还有其他的用处，比如为数组添加或删除数组项。具体可以查看[Mozilla Developer Network website][]



[Mozilla Developer Network website]:https://developer.mozilla.org/

### 赋值函数

JavaScript 拥有一套 赋值（Mutator） 函数，允许你去修改一个数组的内容而不引用个别元素。这些函数常常使得艰难的操作变的容易起来，就像你下面看到的。

### 添加元素到数组中

将元素添加到数组有两个赋值函数：`push()`以及`unshift()`。`push()`方法会将元素添加到数组末尾:

```javascript
var nums = [1,2,3,4,5];
print(nums ); // 1,2,3,4,5
nums.push (6);
print(nums ); // 1,2,3,4,5,6
```

使用`push()`方法扩展数组比使用`length`属性更直观：

```javascript
var nums = [1,2,3,4,5];
print(nums ); // 1,2,3,4,5
nums[nums .length] = 6;
print(nums ); // 1,2,3,4,5,6
```

将数据添加到数组开头比添加到数组末尾困难得多。这样做而不使用赋值函数，需要将数组中的每一个已有元素前移一位才能添加新数据。一段代码可以描述这种场景：

```javascript
var nums = [2 ,3 ,4 ,5 ];
var newnum = 1;
var N = nums. length;
for (var i = N ; i >= 0; --i ) {
    nums[i ] = nums[ i-1 ];
}
nums[0 ] = newnum;
print(nums ); // 1,2,3,4,5
```

数组存储的元素越多，这段代码越低效。

将元素添加到数组开始位置的赋值函数是`unshift()`。下面是这个函数使用方法：

```javascript
var nums = [2 ,3 ,4 ,5 ];
print(nums ); // 2,3,4,5
var newnum = 1;
nums.unshift (newnum );
print(nums ); // 1,2,3,4,5
nums = [3,4,5];
nums.unshift (newnum ,1 ,2 );
print(nums ); // 1,2,3,4,5
```

`unshift()`的第二次调用展示了可以只调用一次函数来为数组添加多个元素。

### 从数组中删除元素

使用`pop()`赋值函数可以轻松地从数组末尾删除元素：

```javascript
var nums = [1 ,2 ,3 ,4 ,5 ,9 ];
nums.pop ();
print(nums ); // 1,2,3,4,5
```

不使用赋值函数从数组开头删除元素需要将数组中的元素朝着数组开头移动，
这和将元素添加到数据开头操作一样低效：

```javascript
var nums = [9 ,1 ,2 ,3 ,4 ,5 ];
print(nums );
for (var i = 0 ; i < nums.length; ++i ) {
    nums[i ] = nums[ i+1 ];
}
print(nums ); // 1,2,3,4,5,
```

除了需要向后移动元素，还会多一个额外的元素。我们知道这件事是因为我们查看数组内容的时候看到了一个额外的逗号。

从数组开始位置删除元素需要使用赋值函数`shift()`。下面是这个函数的使用：

```javascript
var nums = [9 ,1 ,2 ,3 ,4 ,5 ];
nums.shift ();
print(nums ); // 1,2,3,4,5
```

你会注意到在数组末尾没有多余的元素。`pop()`和`shift()`会返回删除的值，所以可以将这些数值收集到一个变量中：

```javascript
var nums = [6 ,1 ,2 ,3 ,4 ,5 ];
var first = nums. shift(); // first gets the value 9
nums.push(first );
print(nums ); // 1,2,3,4,5,6
```

#### 从数组中间添加或删除元素

从数组末尾添加或删除元素会引发从数组开头添加或删除元素同样的问题--这两种操作都需要移动数据元素的位置，不论是向数组开头移动，还是向数组末尾移动。不过，有一个赋值函数可以完成上面两种操作--`splice()`。

使用`splice()`添加元素到数组中必须提供以下参数：

* 开始的索引 (添加元素的位置)
* 想要删除的元素个数(添加元素时用0 )
* 要添加到数组中的元素

让我们来看一个简单的例子，下面的程序将添加元素到数组的中间：

```javascript
var nums = [1 ,2 ,3 ,7 ,8 ,9 ];
var newElements = [4 ,5 ,6 ];
nums.splice (3 ,0 ,newElements );
print(nums ); // 1,2,3,4,5,6,7,8,9
```

拼接到数组的元素可以是传给函数的任何项目列表，而不一定要是命名项目列表。例如：

```javascript
var nums = [1 ,2 ,3 ,7 ,8 ,9 ];
nums.splice (3 ,0 ,4 ,5 ,6 );
print(nums );
```

上例中参数4、5、6代表插入`nums`中的元素列表。

一个使用`splice()`方法移除数组中元素的例子：

```javascript
var nums = [1 ,2 ,3 ,100 ,200 ,300 ,400 ,4 ,5 ];
nums.splice (3 ,4 );
print(nums ); // 1,2,3,4,5
```

#### 数组元素按序排列

最后两个赋值函数用于将数组元素按序排列。第一个为`reverse()`，用于反转数组元素的顺序。下面是一个用法示例：

```javascript
var nums = [1 ,2 ,3 ,4 ,5 ];
nums.reverse();
print(nums); // 5,4,3,2,1
```

经常需要对数组排序。赋值函数`sort()`用于完成该任务，并且特别适用于字符串：

```javascript
var names = ["David" ,"Mike" ,"Cynthia" ,"Clayton" ,"Bryan" ,"Raymond" ];
nums.sort();
print(nums); // Bryan,Clayton,Cynthia,David,Mike,Raymond
```

但是`sort()`不太适合处理数字:

```javascript
var nums = [3 ,1 ,2 ,100 ,4 ,200 ];
nums.sort();
print(nums); // 1,100,2,200,3,4
```

`sort()`函数按照字典顺序将数据排序，假设数据元素是字符串，即使在之前的例子中元素都是数字类型。我们也可以通过传递一个排序函数作为赋值函数的第一个参数让`sort()`函数正常运行，`sort()`方法会使用传递进来的函数排序数组。在比较数组元素排序时会使用该函数。

对于数字，排序函数会简单将一个数字和另一额数字相减。如果返回的数字是负数，左边的操作数小于右边的操作数；如果数字返回等于零，那么左边的操作数等于右边的操作数；如果返回的结果是正数，左边的操作数大于右边的操作数。按照这个思路，我们排序方法重新运行刚刚的小程序：

```javascript
function compare(num1, num2) {
    return num1 - num2;
}
var nums = [3 ,1 ,2 ,100 ,4 ,200 ];
nums.sort (compare );
print(nums ); // 1,2,3,4,100,200
```

`sort()`函数使用`compare()`函数来按照数值大小而不是字母顺序对元素排序。


### 迭代函数

最后讨论的数组函数是迭代函数。这类函数会对数组中的每一个元素进行处理，并在处理完成后返回值一个值、一个值的集合或者一个新的数组。

#### 不生成新数组的迭代函数

我们讨论的第一组迭代函数不会生成新数组；而是会针对数组中的每个元素执行操作或者从整个数组产生一个单独的值。

首先讨论的是`forEach()`方法，`forEach()`方法接受一个函数作为参数并将该调用函数应用到数组中的每个元素。例如：

```javascript
function square(num) {
    print(num, num * num);
}
var nums = [1,2,3,4,5,6,7,8,9,10];
nums.forEach(square);
```

这段程序的输出为：

```
    1 1
    2 4
    3 9
    4 16
    5 25
    6 36
    7 49
    8 64
    9 81
    10 100
```

另一个迭代函数是`every()`。该方法会在数组上应用一个布尔函数并在每个元素的返回值都为true时返回true。例如：

```javascript
function isEven(num) {
    return num % 2 == 0;
}
var nums = [2,4,6,8,10];
var even = nums.every(isEven);
if (even) {
    print("all numbers are even");
}
else {
    print("not all numbers are even");
}
```

这段程序的输出为：

```javascript
all numbers are even
```

如果我们把数组变为：

```javascript
var nums = [2,4,6,7,8,10];
```

这段程序会显示：

```javascript
not all numbers are even
```

`some()`方法的参数也是一个布尔函数，只要数组内至少一个元素满足了该布尔函数的要求返回true，则`some()`方法会返回true。例如：


```javascript
function isEven(num) {
    return num % 2 == 0;
}
var nums = [1,2,3,4,5,6,7,8,9,10];
var someEven = nums.some(isEven);
if (someEven) {
    print("some numbers are even");
}
else {
    print("no numbers are even");
}
nums = [1,3,5,7,9];
someEven = nums.some(isEven);
if (someEven) {
    print("some numbers are even");
}
else {
    print("no numbers are even");
}
```

这段程序的输出为：

```javascript
some numbers are even
no numbers are even
```

`reduce()`方法将函数应用于对数组内从头到尾所有连续元素的累加运算，并生成一个值。下面是一个使用`reduce()`方法计算一个数组所有元素之和的例子：

```javascript
function add(runningTotal, currentValue) {
    return runningTotal + currentValue;
}
var nums = [1,2,3,4,5,6,7,8,9,10];
var sum = nums.reduce(add);
print(sum); // displays 55
```

`reduce()`方法结合`add()`函数从左到右计算数组元素的总和，例如：

```javascript
add(1,2) -> 3
add(3,3) -> 6
add(6,4) -> 10
add(10,5) -> 15
add(15,6) -> 21
add(21,7) -> 28
add(28,8) -> 36
add(36,9) -> 45
add(45,10) -> 55
```

也可以使用`reduce()`方法连接字符串：

```javascript
function concat(accumulatedString, item) {
    return accumulatedString + item;
}
var words = ["the ", "quick ","brown ", "fox "];
var sentence = words.reduce(concat);
print(sentence); // displays "the quick brown fox"
```

Javascript还提供了类似于`reduce()`方法的`reduceRight()`方法，只是会从右到左而不是从左到右处理数组元素。下面代码使用`reduceRight()`方法对数组进行了倒序排列：

```javascript
function concat(accumulatedString, item) {
    return accumulatedString + item;
}
var words = ["the ", "quick ","brown ", "fox "];
var sentence = words.reduceRight(concat); 
print(sentence); // displays "fox brown quick the"
```

#### 返回新数组的迭代函数

有2种返回新数组的迭代函数：`map()`方法和`filter()`方法。`map()`方法类似于`forEach()`方法，会数组中的每个元素进行处理。两者的不同在于`map()`方法会返回一个应用参数函数后的新数组。例如：

```javascript
function curve(grade) {
    return grade += 5;
}
var grades = [77, 65, 81, 92, 83];
var newgrades = grades.map(curve);
print(newgrades); // 82, 70, 86, 97, 88
```
使用字符串的示例：

```
function first(word) {
    return word[0];
}
var words = ["for","your","information"];
var acronym = words.map(first);
print(acronym.join("")); // 显示 "fyi"
```

上面这个例子中，`acronym`数组存储了`words`数组中每个单词的首字母。然而，如果将数组元素显示成真正的缩写，需要去除使用隐式`toString()`函数显示数组元素出现的逗号。可以通过使用空字符串调用`join()`来完成。

`filter()`方法类似于`every()`方法，但是不同于`every()`方法在数组内所有元素都满足布尔函数的情况下返回true，`filter()`方法会返回一个由数组中满足布尔函数的元素组成的新数组。例如：

```javascript
function isEven(num) {
    return num % 2 == 0;
}
function isOdd(num) {
    return num % 2 != 0;
}
var nums = [];
for (var i = 0; i < 20; ++i) {
    nums[i] = i+1;
}
var evens = nums.filter(isEven);
print("Even numbers: ");
print(evens);
var odds = nums.filter(isOdd);
print("Odd numbers: ");
print(odds);
```

这段程序的输出为：

```javascript
Even numbers:
2,4,6,8,10,12,14,16,18,20
Odd numbers:
1,3,5,7,9,11,13,15,17,19
```

`filter()`另一种有趣的用法：

```javascript
function passing(num) {
    return num >= 60;
}
var grades = [];
for (var i = 0; i < 20; ++i) {
    grades[i] = Math.floor(Math.random() * 101);
}
var passGrades = grades.filter(passing);
print("All grades: );
print(grades);
print("Passing grades: ");
print(passGrades);
```

这段程序的输出为：

```
All grades:
39,43,89,19,46,54,48,5,13,31,27,95,62,64,35,75,79,88,73,74
Passing grades:
89,95,62,64,75,79,88,73,74
```

当然，可以在字符串上使用`filter()`。下面是一个应用“字母i在字母e前面但是不在字母c之后”的拼写规则过滤字符串的例子。

```javascript
function afterc(str) {
if (str.indexOf("cie") > -1) {
    return true;
}
    return false;
}
var words = ["recieve","deceive","percieve","deceit","concieve"];
var misspelled = words.filter(afterc);
print(misspelled); // displays recieve,percieve,concieve
```

### 二维和多维数组

Javascript数组只是一维的，不过我们可以通过创建内容是数组的数组来创建多维数组。在这一节中，我们将介绍如何在Javascript中创建二维数组。

#### 创建二维数组

二维数组的结构类似一个由行和列组成的电子表格。要在Javascript中创建一个二维数组，我们首先需要创建一个普通数组，然后将这个数组的每个元素也作为数组。因此我们要知道这个数组的行数，根据这个信息，我们就能创建一个n行1列的二维数组：

```javascript
var twod = [];
var rows = 5;
for(vari = 0; i < rows; ++i) {
    twod[i] = [];
}
```

这个方法的弊端在于数组的每个元素都被设成了undefined。更好的办法是遵循《Javascript语言精粹》(O’Reilly, p. 64)中的例子来创建二维数组。Crockford扩展了Javascript内置的数组对象，增加了一个方法使其可以设置行数和列数，并且将每个值都设成该方法传入的一个默认值。这是他的定义：

```javascript
Array.matrix = function(numrows, numcols, initial) { 
    var arr = [];
    for(var i = 0; i < numrows; ++i) {
        var columns = []; 
        for(var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr; 
}
```

下面是该方法的一些测试例子：

```javascript
var nums = Array.matrix(5,5,0);
print(nums[1][1]); // 显示 0
var names = Array.matrix(3,3,"");
names[1][2] = "Joe";
print(names[1][2]); // 显示 "Joe"
```
	
我们还可以这样创建一个二维数组，通过一组值在单行内对它进行初始化：

```javascript
var grades = [[89, 77, 78],[76, 82, 81],[91, 94, 89]];
print(grades[2][2]); // 显示 89
```
	
对于比较小的数据集合，这是创建二维数组最简单的方法了。

#### 处理二维数组元素

处理二维数组的元素有两个基本的模式。一个是按列优先访问数组元素，另一个是按行优先。我们将使用在上面的代码片段中创建的成绩数组来说明这些模式是如何运作的。

对于这两种模式，我们都会使用一组嵌套的for循环。首先是列优先处理模式，外层的循环改变行号，内层的循环处理该列。对于成绩数组，假设每一行是一个学生的的一组成绩。我们可以通过把该行的所有成绩相加，然后除以这一行成绩的个数，得到该学生的平均成绩。下面是这个方法的代码：

```javascript
var grades = [[89, 77, 78],[76, 82, 81],[91, 94, 89]];
var total = 0;
var average = 0.0;
for (var row = 0; row < grades.length; ++row) {
    for (var col = 0; col < grades[row].length; ++col) { 
        total += grades[row][col];
    }
    average = total / grades[row].length;
    print("Student " + parseInt(row+1) + " average: " +
        average.toFixed(2));
    total = 0;
    average = 0.0;
}
```

内层的循环由下面这个表达式控制：

```javascript
col < grades[row].length
```

这段代码能够运行是因为每行都包含一个数组，而且数组都有可以用于判断当前行包含列数的length属性。

每个学生的平均成绩通过toFixed(n)方法保留到小数点后两位。

下面是这个程序的输出结果：

```javascript
Student 1 average: 81.33
Student 2 average: 79.67
Student 3 average: 91.33
```

要执行行优先模式，我们只需翻转一下for循环，使得外层的循环控制列，内层的循环控制行。下面是每门测试平均成绩的计算：

```javascript
var grades = [[89, 77, 78],[76, 82, 81],[91, 94, 89]];
var total = 0;
var average = 0.0;
for (var col = 0; col < grades.length; ++col) {
    for (var row = 0; row < grades[col].length; ++row) {
        total += grades[row][col];
    }

    average = total / grades[col].length;
    print("Test " + parseInt(col+1) + " average: " +
        average.toFixed(2));
    total = 0;
    average = 0.0;
}
```

程序输出结果如下：

```javascript
Test 1 average: 85.33
Test 2 average: 84.33
Test 3 average: 82.67
```

#### 交错数组

交错数组是指数组中的每行可能有数量不同的元素。其中一行可能有3个元素，而另一行可能有5个元素，还有一行可能只有1个元素。许多编程语言在处理交错数组的时候都有些困难，但是Javascript没有这个问题，因为我们可以计算任意一行的长度。

还是拿成绩数组举个例子，每个学生有数量不等的成绩记录，我们完全不用改之前的代码，就可以计算每个学生的平均成绩：

```javascript
var grades = [[89, 77],[76, 82, 81],[91, 94, 89, 99]];
var total = 0;
var average = 0.0;
for (var row = 0; row < grades.length; ++row) {
    for (var col = 0; col < grades[row].length; ++col) { 
        total += grades[row][col];
    }
    average = total / grades[row].length;
    print("Student " + parseInt(row+1) + " average: " +
        average.toFixed(2));
    total = 0;
    average = 0.0;
}
```

请注意第一个学生只有两门成绩，第二个有三门成绩，第三个有四门成绩。由于程序在内层循环里会计算每一行的长度，因此这个交错性不会造成任何问题。程序输出结果如下：

```javascript
Student 1 average: 83.00
Student 2 average: 79.67
Student 3 average: 93.25
```

#### 对象数组

这一章中的所有例子都是由基本数据类型，如数字和字符串，组成的数组，数组还可以由对象组成，所有数组的方法和属性都是一样的。

举个例子：

```javascript
function Point(x,y) {
    this.x = x;
    this.y = y;
}

function displayPts(arr) {
    for (var i = 0; i < arr.length; ++i) {
        print(arr[i].x + ", " + arr[i].y);
    }
}

var p1 = new Point(1,2);
var p2 = new Point(3,5);
var p3 = new Point(2,8);
var p4 = new Point(4,4);
var points = [p1,p2,p3,p4];
for (var i = 0; i < points.length; ++i) {
    print("Point " + parseInt(i+1) + ": " + points[i].x + ", " +
        points[i].y);
}
var p5 = new Point(12,-3); 
points.push(p5);
print("After push: ");
displayPts(points);
points.shift();
print("After shift: ");
displayPts(points);
```

程序输出结果如下：

```javascript
Point 1: 1, 2 
Point 2: 3, 5 
Point 3: 2, 8 
Point 4: 4, 4 
After push: 
1, 2
3, 5
2, 8
4, 4
12, -3 
After shift: 
3, 5
2, 8 
4, 4
12, -3
```

点(12, -3)通过push()方法添加到数组，点(1, 2)通过shift()方法从数组删除。


### 在对象中使用数组

可以用数组在对象中存储复杂的数据。本书研究的许多数据结构都是通过在对象类中使用内置数组存储数据实现的。

下面的示例演示了贯穿本书用到许多技术。在示例中，我们创建了一个用来存储每周观察到的高温的对象。这个对象有一个增加新的高温以及计算对象中存储的平均高温的方法。代码如下：

```javascript
function weekTemps() { 
	this.dataStore = []; 
	this.add = add;
	this.average = average;
}


function add(temp){ 
	this.dataStore.push(temp);
}

function average() {
	var total = 0;
	for (var i = 0; i < this.dataStore.length; ++i) {
		total += this.dataStore[i]; 
	}
	return total / this.dataStore.length; 
}

var thisWeek = new weekTemps(); 
thisWeek.add(52);
thisWeek.add(55);
thisWeek.add(61);
thisWeek.add(65);
thisWeek.add(55);
thisWeek.add(50);
thisWeek.add(52);
thisWeek.add(49);
print(thisWeek.average()); // displays 54.875
```

你会注意到`add()`方法使用`push()`函数来添加新元素到`dataStore`数组中，该方法命名为`add()`而不是`push()`。在定义函数时为一个操作使用一个更直观的名称是很常见的技巧。不是每一个人都能理解“push一个数据元素”，但每个人都能理解什么是“添加一个数据”。

## 练习

1. 创建一个存储学生成绩集合的成绩对象。提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。
2. 在数组中存储一些单词，并按顺序和逆序输出这些内容。
3. 修改本章的`weeklyTemps`对象，让它以二维数组存储每个月的数据值。创建显示月平均值、指定周平均值和所有周平均值的方法。
4. 创建一个在数组中存储单个字母的对象，该对象有一个将单个字母作为单词显示的方法。

