MutationObserver对象
---
`MutationObserver`对象可以观察任何DOM元素的变化。Windows8.1上的IE11和最新版Chrome和Firefox都支持这个对象。

在MutationObserver之前有一些监测事件：

*   DOMNodeInserted
*   DOMNodeRemoved
*   DOMSubtreeModified
*   DOMAttrModified
*   DOMCharacterDataModified

IE11中用MutationObserver取代了上面所有这些事件，因为它们有如下不足：

*   这些事件都是标准的JS事件，会在整个DOM树上冒泡：性能差；
*   不能批量发生，大量事件会变成垃圾信息：性能差；
*   同步，阻塞执行：性能差。

MutationObserver解决了上面的问题而且使用非常轻松：

1.  创建mutation observer时接受回调函数作为参数；
2.  可以在观察一个DOM元素时指定需要观察的内容；
3.  支持回调。

创建一个mutation observer和实例化一个对象一样轻松。回调函数支持两个参数：第一个是描述变化的对象，第二个是MutationObserver。

```javascript
function mutationObserverCallBack(changes, mutationObserver) {
    //some logic
}
//创建observer
var observer = new MutationObserver(mutationobservercallback);
```

接下来就可以通过调用observer上的**observer**函数来观察任意HTML元素。observer函数接受的第二个参数是一个指定了“监测”选项的json对象。例如，可以只监测元素子元素的添加和删除或者所有**"class"**的改变。

```javascript
var observer = new MutationObserver(mutationObserverCallBack);
observer.observe(element, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true
});
```
完整的配置选项列表可以参考[MSDN上的页面](http://msdn.microsoft.com/en-us/library/ie/dn254987(v=vs.85).aspx)

在回调函数中，可以以列表形式看到所有变化。每一个变化都有一个类型域和其他属性（增加的内容，旧值等等）来告诉开发者有哪些变化。

```javascript
function mutationObserverCallBack(changes, mutationObserver) {
    changes.forEach(function(mutationRecord) {
        console.log('Type of mutation:' + mutationRecord.type);
        if("attributes" === mutationRecord.type) {
            console.log('Old attribute value:' + mutationRecord.oldValue);
        }
    });
}
```
更多关于IE11下MutationObserver的信息，可以参考本文结尾参考资料里列出的MSDN相关链接。

### 参考资料
1.  [WinJS 2.0 / IE 11: The New and Shiny MutationObserver Object](http://dotnet.dzone.com/articles/winjs-20-ie-11-new-and-shiny)
2.  [MSDN: Mutation observers](http://msdn.microsoft.com/en-us/library/ie/dn265034(v=vs.85).aspx)
3.  [MSDN : the observe method](http://msdn.microsoft.com/en-us/library/ie/dn254987(v=vs.85).aspx)
4.  [MSDN : Migrating mutation and property change events to mutation observers](http://msdn.microsoft.com/en-us/library/ie/dn265032(v=vs.85).aspx)
