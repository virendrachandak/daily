`Git detached HEAD`详解
---
`git status`有一种状态是`HEAD detached at`，在该状态下无法`commit`，如何你也和我一样对这充满疑问，可以通过本文了解一下详情。

### 类比

首先，暂时忘记`Git`，想起数据结构里常见的单链表结构。在单链表中添加一个新节点的伪代码为：

```
// 在'list_top'中插入一个新的节点
temp = malloc(...);   //为该结构划分内存
temp.body = ...;    //填充节点信息
temp.parent = list_top; //填充上一节点（即父节点）的信息
list_top = temp;    //将表头移动到新节点
```

假设所有的列表操作都通过使用临时变量完成（即，不直接使用`list_top`）。

现在假设要移动到当前`list_top`节点的父节点做点事情（例如检查节点、打印节点等等）。

```
temp = list_top;
temp = temp.parent;   // list_top的父节点
temp = temp.parent;   // 祖父节点
```

### 英文原文
[http://gitolite.com/detached-head.html](http://gitolite.com/detached-head.html)
