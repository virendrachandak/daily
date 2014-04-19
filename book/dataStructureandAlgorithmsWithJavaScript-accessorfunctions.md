
# 访问器函数

JavaScript提供了一系列用于访问数组元素的方法。我们称这些方法为“访问器函数”，它们将目标数组以某种形式作为返回值返回。

## 搜索值

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

## 数组的字符串表示

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

## 从已有数组创建新数组

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

