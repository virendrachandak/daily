## 在对象中使用数组

可以用数组在对象中存储复杂数据。本书研究的许多数据结构都实现成了一个使用内置数组来存储数据的对象。

下面的示例展示了贯穿本书使用的许多技巧。在示例中创建了一个存储每周观察到的高温的对象。该对象有一个用于增加新温度和计算平均温度的方法。代码如下：

```
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

注意`add()`函数使用`push()`方法将新元素添加到`dataStore`数组，该方法命名为`add()`而不是`push()`。定义一个对象方法时，使用更直观的名称来为操作命名是很常见的技巧。不是每一个人都能理解“push一个数据元素”的意思，但每个人都能理解什么是“添加一个数据元素”。

## 练习

1. 创建一个`grades`存储学生成绩的对象。并提供一个添加成绩数据的方法，以及一个计算学生平均成绩的方法。
2. 用数组来存储一组单词，并按顺序、逆序输出。
3. 修改本章的`weeklyTemps`对象，用二维数组来存储一个月的数据值。创建一个显示月平均值、指定周平均值以及所有周平均值的方法。
4. 创建一个在数组中存储单个字母的对象，该对象有一个将字母作为单个单词显示的方法。

