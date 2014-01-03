CSS3D变换介绍（An Introduction to CSS 3D Transforms）
---
>	译者序：在网页上实现3D效果有许多种方法，例如传统的[Flash](http://www.adobe.com/devnet/flash/3d_animation.html)，利用HTML5 Canvas元素的[Three.js](https://github.com/mrdoob/three.js/)**（译者注：原文写于2010年，当时three.js只支持Canvas，但其实现在已经支持`<canvas>`,`CSS`，`<svg>`和WebGL了，详情可访问[three.js官网](http://threejs.org/)）**以及M$的IE因为安全等原因还不支持的[WebGL](http://www.khronos.org/webgl/)。本文主要介绍使用CSS3来实现3D变换的方法。

###	基本原理
*	3D变换效果就像璀璨的宝石一样引人注目。但是在我们开始使用这些特效之前，我们需要了解一下用户能够从中收获什么。
*	不应该在整个应用上使用3D变换效果，因为CSS样式是用来美化页面，而不是用于生成引人入胜的3D界面的。例如从注册页面到注册表单的跳转使用3D效果并没有什么意义（虽然有人建议这样做）。除此之外，与应用界面交互使用3D变换来实现过渡效果的地方多得是。
*	例如iPhone上的天气应用有两个视图：详情视图和选项视图。两个视图之间的切换过渡用到了3D翻转效果。这样的3D特效告诉用户这个应用只有两个交互界面，3D翻转效果暗示了用户交互界面就像一张纸的两面一样，只有两面供翻转。
*	再比如幻灯片效果。处于最后一张幻灯片时，是什么向你暗示了幻灯片将重新从第一张开始放起？一种不错的实现就是使用3D变换，将幻灯片放在一个循环的3维走马灯里；这样，最后一张幻灯片放完时肯定就是第一张了。

### 浏览器支持
*	译者注：原文写于2010年，目前的支持情况可以参考[caniuse/transform3d](http://caniuse.com/transform3d)。原文作者说了一句很经典的话，“擎天柱：汽车人，出发！(The eternal Optimus Prime: Transform and roll out!)”一语双关(Transoform)。
*	现在我们可以看到，在移动浏览器上CSS3D变换已经得到了很好地支持。
*	现在，开始编码吧！

###	perspective（透视）
*	激活CSS3D，需要实现元素的透视效果。有两种方法，一种是使用CSS的`transform`属性和`perspective`函数。例如：
*	`-webkit-transform: perspective(600);`
*	或者只是使用`perspective`属性，例如：
*	`-webkit-perspective: 600;`
*	demo请看[这里](http://desandro.github.io/3dtransforms/examples/perspective-01.html)，效果如下所示：
*	![](http://media.24ways.org/2010/desandro/perspective01.png)
*	这两种方法的区别在于，第一种使用`transform`属性加`perspective`函数的方法在单个元素上使用比较方便。但是对于多个元素并不适合。


### 参考资料
1.	[英文原文](http://24ways.org/2010/intro-to-css-3d-transforms/)
2.	[caniuse css 3d transform](http://caniuse.com/transforms3d)
3.	[w3 css3-transforms](http://www.w3.org/TR/css3-transforms)
4.	[w3scholl.com.cn perspective](http://www.w3school.com.cn/cssref/pr_perspective.asp)
5.	[http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
6.	[http://www.alloyteam.com/2012/10/the-css3-transform-perspective-property/](http://www.alloyteam.com/2012/10/the-css3-transform-perspective-property/)
7.	[http://css-tricks.com/almanac/properties/p/perspective/](http://css-tricks.com/almanac/properties/p/perspective/)
8.	[http://desandro.github.io/3dtransforms/](http://desandro.github.io/3dtransforms/)