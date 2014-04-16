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

我们讲到了创建数组的集中技巧。至于哪个函数最好，大部分JavaScript专家推荐使用`[]`操作符，他们认为这样比调用`Array`构造函数效率更高（参考《JavaScript权威指南》[O'Reilly]以及《JavaScript语言精粹》[O'Reilly]）。


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

可以通过调用`split()`函数来创建数组。`split()`函数会使用一个公共分隔符来分割字符串，例如每个词中间一个空格，以及创建一个包含字符串各个单独部分的数组。

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
