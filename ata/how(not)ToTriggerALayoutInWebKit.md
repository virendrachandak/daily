如何触发（或者不触发）`WebKit`中的`layout`
---
大部分`Web`开发者都知道脚本的绝大部分执行时间不是花在执行脚本字节码本身上，而是因为`DOM`操作。其中一种成本较大的操作是`layout`（也被称为`reflow`--重流）——即从一个`DOM`树构建出一个渲染树的过程。`DOM`结构越庞大，越复杂，操作成本也越大。

一种保持页面“爽快”的重要技巧是将对`DOM`的操作从查询状态的操作中分离出来并批量进行处理。例如：

```
// 次优方案，会引发两次`layout`
var newWidth = aDiv.offsetWidth + 10; // 读
aDiv.style.width = newWidth + 'px'; // 写
var newHeight = aDiv.offsetHeight + 10; // 读
aDiv.style.height = newHeight + 'px'; // 写

// 更好的方案，只有一次`layout`
var newWidth = aDiv.offsetWidth + 10; // 读
var newHeight = aDiv.offsetHeight + 10; // 读
aDiv.style.width = newWidth + 'px'; // 写
aDiv.style.height = newHeight + 'px'; // 写
```

具体细节可以查看[Styoan Stefanov的这篇文章“tome on repaint and restyle”](http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/)。
