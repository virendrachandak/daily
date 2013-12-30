KISSY入门
---
Q：怎样让KISSY能像JQuery一样好用？

A:KISSY.use('node')，加载node模块就可以使用KISSY.all('someCssSelector')来想jQuery一样选择元素了。

<hr>
Q:为什么KISSY要use('node')才能像jQuery一样使用，是不是太麻烦了？

A:这正是KISSY的美妙之处，按模块加载所需要的功能。KISSY里所有需要的功能都可以使用use来加载，也可以使用add来自定义一个模块。除此之外，还有官方的component和社区的gallery可供选择。方便开发者根据应用需求的不同来随意定制某个页面或者应用需要加载的js文件。

<hr>
Q:KISSY和Seajs，requireJS有什么不同，和常见的backbone，angularJS有什么关系吗？

A: