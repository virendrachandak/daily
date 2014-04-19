### 二维和多维数组

JavaScript数组是一维的，但是可以通过创建元素为数组的数组来创建多维数组。本届将描述JavaScript创建二维数组的方法。

### 创建二维数组

二维数组的结构类似于拥有行和列的表格。要在JavaScript创建一个二维数组，需要先创建一个数组，再在该数组中添加数组作为元素。至少需要了解数组包含的行数。有这些信息，就可以创建一个一列n行的二维数组。

```javascript
var twod = [];
var rows = 5;
for (var i = 0; i < rows; ++i) {
    twod[i] = [];
}
```

这种方法的问题在于数组中的每个元素都会被设为`undefined`。一种更好的创建一个二维数组的方法是按照《JavaScript语言精粹》（O'Reilly，64页）中Crockford的方法，使用一个函数继承JavaScript的数组对象来设置行数和列数，这个函数需要接受行数和列数值作为参数。定义如下：

```javascript
Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
};
```

下面是测试这个定义函数的代码：

```javascript
var nums = Array.matrix(5, 5, 0);
print(nums[1][1]);  //显示0
var names = Array.matrix(3, 3, "");
name[1][2] = 'Joe';
print(names[1][2]);     //显示'Joe'
```

也可以创建一个二维数组并用设置它的值。

```javascript
var grades = [[89, 77, 78], [76, 82, 81], [91, 94, 89]];
print(grades[2][2]);    //显示89
```

对于小数据集，这样创建二维数组最简单。

### 处理二维数组元素

处理二维数组元素有两种基本模式。一种模式强调通过列来访问数组元素，另一种模式强调通过行来访问数组元素。我们将使用上面代码中创建的`grades`数组来展示这两种模式。

两种模式都使用了`for`循环。对于按照列的处理，外围循环遍历行，内层循环遍历列。可以将`grades`数组中的每一行看成一个学生成绩的集合。可以通过计算每一行所有成绩的总和，并除以成绩的数目来计算每个学生的平均成绩。下面的代码展示计算平均成绩的过程：

```javascript
var grades = [[89, 77, 78], [76, 82, 81], [91, 94, 89]];
var total = 0;
var average = 0.0;
for (var row = 0; row < grades.length; ++row) {
    for (var col = 0; col < grades[row].length; ++col) {
        total += grades[row][col];
    }
    average = total / grades[row].length;
    print('Student' + parseInt(row + 1) + ' average: ' + average.toFixed(2));
    total = 0;
    average = 0.0;
}
```

内层的循环通过下面的表达式控制：

```javascript
col < grades[row].length
```

上面的代码能够运行，因为每行都包含一个数组，而且这些数组都有`length`属性可用于计算每行的列数。

每个学生的平均成绩使用`toFixed(n)`函数四舍五入到小数点后两位。

下面是该代码快的输出：

```javascript
Student 1 average: 81.33
Student 2 average: 79.67
Student 3 average: 91.33
```

要执行按行计算，只需要将外层控制列和内层控制行的循环互换即可。下面是所有测试代码的计算：

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

上面代码的输出如下：

```javascript
Test 1 average: 85.33
Test 2 average: 84.33
Test 3 average: 82.67
```
