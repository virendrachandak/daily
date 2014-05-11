JavaScript实现排序算法
---
> 本文主要介绍用JavaScript实现的一些基本排序算法和几个高级排序算法。

### 测试

为了更好地理解代码和排序算法，“测试”代码非常重要。这一节介绍在下面排序算法中将使用的测试类。

```javascript
/**
 *@description: 测试类
 */
function CArray(numElements) {
    var dataStore     = [];
    var pos = 0;

    for (var i = 0; i < numElements; ++i) {
        dataStore[i] = i;
    }
    return {
        pos : pos,
        dataStore: dataStore,
        numElements: numElements,
        setData: function() {
            for (var i = 0; i < this.numElements; ++i) {
                this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
            }
        },
        clear: function () {
            for (var i = 0; i < this.dataStore.length; i++) {
                this.dataStore[i] = 0;
            }
        },
        insert: function(element) {
            this.dataStore[this.pos++] = element;
        },
        swap: function(arr, index1, index2) {
            var temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
        },
        /**
        *@description: bubbleSort
        */
        bubbleSort: function(verbose) {
            var numElements = this.dataStore.length;
            var temp;
            for (var outer = numElements; outer >= 2; --outer) {
                for (var inner = 0; inner <= outer - 1; ++inner) {
                    if (this.dataStore[inner] > this.dataStore[inner + 1]) {
                        this.swap(this.dataStore, inner, inner + 1);
                    }
                }
                if (verbose)
                console.log(this.dataStore);
            }
        },
        selectionSort: function(verbose) {
            var min, temp;
            for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {
                min = outer;
                for (var inner = outer + 1; inner <= this.dataStore.length - 1; ++inner) {
                    if (this.dataStore[inner] < this.dataStore[min]) {
                        min = inner;
                    }
                }
                this.swap(this.dataStore, outer, min);
                if (verbose)
                console.log(this.dataStore);
            }
        }
    };
}
```

使用`CArray`类的简单示例：

```javascript
var numElements = 100;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.dataStore);
```

好了，有了这个基本的测试类，我们接下来使用JavaScript了解并且编写排序算法。

### 基本排序

#### 冒泡排序（bubble sort）

使用冒泡排序进行排序过程的gif示意图:

![](http://upload.wikimedia.org/wikipedia/commons/3/37/Bubble_sort_animation.gif)

为`CArray`类添加一个处理冒泡排序的`bubbleSort`成员函数：

```javascript
/**
*@description: bubbleSort
*/
bubbleSort: function() {
    var numElements = this.dataStore.length;
    var temp;
    for (var outer = numElements; outer >= 2; --outer) {
        for (var inner = 0; inner <= outer - 1; ++inner) {
            if (this.dataStore[inner] > this.dataStore[inner + 1]) {
                this.swap(this.dataStore, inner, inner + 1);
            }
        }
        console.log(this.dataStore);
    }
}
```

冒泡排序算法的测试程序：

```javascript
var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.dataStore);
mynums.bubbleSort(true); //通过传递verbose为true值来查看排序的详细过程
console.log(mynums.dataStore);
```

可以通过将的`numElements`修改为100甚至1000来查看冒泡排序每一步的结果。

显然，冒泡排序的算法复杂度为`O(n的平方)`

#### 选择排序（selection sort）

使用选择排序的gif示意图：

![](http://upload.wikimedia.org/wikipedia/commons/b/b0/Selection_sort_animation.gif)

同上，为`CArray`类添加一个`selectionSort`方法，内容如下：

```javascript
selectionSort: function() {
    var min, temp;
    for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {
        min = outer;
        for (var inner = outer + 1; inner <= this.dataStore.length - 1; ++inner) {
            if (this.dataStore[inner] < this.dataStore[min]) {
                min = inner;
            }
        }
        this.swap(this.dataStore, outer, min);
    }
}
```

选择排序算法的测试程序：

```javascript
var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.dataStore);
mynums.selectionSort(true);
console.log(mynums.dataStore);
```

该算法的时间复杂度也为`O(n的平方)`，但是选择排序算法相对于冒泡排序算法的有点在于，如果某个元素已经处于正确的位置上，则可以节省一些开支。

#### 插入排序（insertion sort）

插入排序的过程如下git所示：

![](http://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

代码如下：

```javascript
insertionSort: function() {
    var temp, inner;
    for (var outer = 1; outer <= this.dataStore.length - 1; ++outer) {
        temp = this.dataStore[outer];
        inner = outer;
        while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
            this.dataStore[inner] = this.dataStore[inner - 1];
            --inner;
        }
        this.dataStore[inner] = temp;
    }
}
```

插入排序的平均时间复杂度也是`O(n的平方)`。

#### 基本排序算法的执行时间比较

通过JavaScript `Date`对象的`getTime()`函数可以轻松取到时间：

```javascript
var start = new Date().getTime();
// do something here
var stop = new Date().getTime();
var elapsedTime = stop - start;
console.log('Elapsed time is:' + elapsedTime + ' milliseconds.');
```

### 高级排序算法

高级算法处理大型数据集合（上百万数据，而不仅仅只有几百或者几千条）执行效率更高。本文主要介绍了快速排序（quick sort），希尔排序（shell sort），归并排序（merge sort）以及堆排序（heap sort）的JavaScript实现。

#### 希尔排序（Shellsort）

先通过gif图了解下希尔排序：

![](http://upload.wikimedia.org/wikipedia/commons/d/d8/Sorting_shellsort_anim.gif)

希尔排序实质是分组插入排序，也成为“缩小增量排序”。因为其创建者DL.Shell而得名。


### 参考资料
1. [Bubble_sort -- wikipedia](http://en.wikipedia.org/wiki/Bubble_sort)
2. [Selection_sort -- wikipedia](http://en.wikipedia.org/wiki/Selection_sort)
3. [Insertion_sort -- wikipedia](http://en.wikipedia.org/wiki/Insertion_sort)
4. [可视化排序过程](http://jsrun.it/norahiko/oxIy)
5. [可视化的数据结构和算法](http://coolshell.cn/articles/4671.html)
6. [Sorting Algorithm -- wikipedia](http://en.wikipedia.org/wiki/Sorting_algorithm)
7. [Sorting algorithms](http://www.sorting-algorithms.com/)
8. [Shell Sort](http://en.wikipedia.org/wiki/Shellsort)
