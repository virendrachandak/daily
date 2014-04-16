### iscroll swipeview
> 简介：最近参与了“我是公公”小游戏的开发，负责完成手机上常见的滑动帮助页面。项目给的时间很紧张，因此采用了“拿来主义”，直接修改别人已经做好的工具[iscroll swipeview地址](http://cubiq.org/swipeview)

* 因为手机浏览器内存和资源的限制，实现无限或者很长的走马灯会存在很多问题。常见的解决技巧是只使用3个供切换的主页面。具体原理如下图所示：
* [!http://static.cubiq.org/uploads/2011/10/swipeview-wf.png]()
* 其中**slider**是处理动画效果并且应用了硬件加速的DIV。页面元素位置通过
`transform:translate3d(x, 0, 0)`来移动。用户滑动时实际上是**slider**的在移动。
* 滑动动作结束（即`touchend`事件触发时），会重新组织滑动元素的位置。但是页面内容会在滑动动画结束后才开始加载。这样做的好处在于：
  1.  动画平滑，不会因为等待新内容加载而出现延迟的现象；
  2.  心急的用户可能滑动得非常快，在页面没有准备好时会出现**loading**的提示；
  3.  内容会按需加载。如果用户从第1页快速滑动到第10页，中间的页面会被忽略（即3-4-5-6-7-8页，而边界的第2页和第9页会被作为缓冲的内容；
  4.  不用在每次滑动时重新设置视窗的位置（不会产生闪烁）。
* 解决方案存在的问题：走马灯平移的大小有限制（不能超过134217726px）。
* 示例：
  1.  [幻灯片](http://cubiq.org/dropbox/SwipeView/demo/gallery/)
  2.  [阅读器](http://cubiq.org/dropbox/SwipeView/demo/ereader/)
  3.  [嵌入页面的走马灯](http://cubiq.org/dropbox/SwipeView/demo/inline/)
* [源代码--github地址](https://github.com/cubiq/SwipeView)
