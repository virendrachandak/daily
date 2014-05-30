JavaScript Date对象详解
---

> 序：本文来源于使用`JavaScript` `Date`对象遇到的一个小问题。在利用后端返回的数据接口生成`Date`对象并进行时间判断时出现bug，通过阅读`Date`对象的`API`发现`new Object(milliseconds)`这里传入的毫秒数数值必须为数字，如果为字符串会创建失败。因此，在搞定bug后，决定完整阅读`Date`对象，彻底弄清和熟悉这个常用的`JavaScript`对象。

### 参考资料

1.  [IE Dev Center--Date Object(JavaScrirpt)](http://msdn.microsoft.com/en-us/library/ie/cd9w2te4(v=vs.94).aspx)
3.  [MDN--Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
3.  [KISSY中的Date方法](http://docs.kissyui.com/1.4/docs/html/api/date/index.html)
4.  [Compare Dates with JavaScript](http://stackoverflow.com/questions/492994/compare-dates-with-javascript)
