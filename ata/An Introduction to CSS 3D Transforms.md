CSS3D变换介绍（An Introduction to CSS 3D Transforms）
---
>	译者序：在网页上实现3D效果有许多种方法，例如传统的[Flash](http://www.adobe.com/devnet/flash/3d_animation.html)，利用HTML5 Canvas元素的[Three.js](https://github.com/mrdoob/three.js/)**（译者注：原文写于2010年，当时three.js只支持Canvas，但其实现在已经支持`<canvas>`,`CSS`，`<svg>`和WebGL了，详情可访问[three.js官网](http://threejs.org/)）**以及M$的IE因为安全等原因还不支持的[WebGL](http://www.khronos.org/webgl/)。本文主要介绍使用CSS3来实现3D变换的方法。

###	基本原理

3D变换效果就像璀璨的宝石一样引人注目。但是在我们开始使用这些特效之前，我们需要了解一下用户能够从中收获什么。

不应该在整个应用上使用3D变换效果，因为CSS样式是用来美化页面，而不是用于生成引人入胜的3D界面的。例如从注册页面到注册表单的跳转使用3D效果并没有什么意义（虽然有人建议这样做）。除此之外，与应用界面交互使用3D变换来实现过渡效果的地方多得是。

例如iPhone上的天气应用有两个视图：详情视图和选项视图。两个视图之间的切换过渡用到了3D翻转效果。这样的3D特效告诉用户这个应用只有两个交互界面，3D翻转效果暗示了用户交互界面就像一张纸的两面一样，只有两面供翻转。

再比如幻灯片效果。处于最后一张幻灯片时，是什么向你暗示了幻灯片将重新从第一张开始放起？一种不错的实现就是使用3D变换，将幻灯片放在一个循环的3维走马灯里；这样，最后一张幻灯片放完时肯定就是第一张了。

### 浏览器支持
>	译者注：原文写于2010年，目前的支持情况可以参考[caniuse/transform3d](http://caniuse.com/transform3d)。原文作者说了一句很经典的话，“擎天柱：汽车人，出发！(The eternal Optimus Prime: Transform and roll out!)”一语双关(Transoform)。
>
>	现在我们可以看到，在移动浏览器上CSS3D变换已经得到了很好地支持。
>
>	现在，开始编码吧！

###	perspective（透视）

激活CSS3D，需要实现元素的透视效果。有两种方法，一种是使用CSS的`transform`属性和`perspective`函数。例如：

`-webkit-transform: perspective(600);`

或者只是使用`perspective`属性，例如：

`-webkit-perspective: 600;`

demo请看[这里](http://desandro.github.io/3dtransforms/examples/perspective-01.html)，效果如下所示：

![](http://media.24ways.org/2010/desandro/perspective01.png)

>	左侧的红色元素使用了`transform: perspective()`函数标注，右侧的蓝色元素使用了`perspective`属性。

这两种方法的区别在于，第一种使用`transform`属性加`perspective`函数的方法在单个元素上使用比较方便。但是并不适合排成一列的多个元素。如果在不同位置的多个元素上使用相同的`transform`，这些元素的消失位置会不一样。一种补偿方案就是在它们的父元素上使用`perspective`属性，让所有子元素共享相同的3D空间。

请参考[示例：Perspective2](http://desandro.github.com/3dtransforms/examples/perspective-02-children.html)，效果如下图：

![](http://media.24ways.org/2010/desandro/perspective-children01.png)

>	左侧容器内每个红色盒子的消失点都不一样，而右侧容器内的蓝色盒子都有一样的消失点。

`perspective`的值决定了3D效果的强弱。将它看成从观察者到目标的距离。值越大，距离越远，视觉上的3D效果越弱。`perspective: 2000;`生成的3D效果比较弱，就像我们是从远处查看对象一样。`perspective: 100;`产生的3D效果很强，就像一只小昆虫看到了庞然大物一样。

默认情况下3D空间的消失点位于其中心位置。通过`perspective-origin`属性可以改变消失点的位置。例如：`-webkit-perspective-origin: 25% 75%;`

请参考[示例：Perspective3](http://desandro.github.com/3dtransforms/examples/perspective-03.html)，如图所示：

![](http://media.24ways.org/2010/desandro/perspective02.png)

### 3D Transform函数

作为WEB设计师（译者注：国内应该主要是前端工程师），我们已经十分熟悉二维空间（X、Y）下的水平和垂直定位。通过`perspective`初始化3D空间，我们现在可以在所有空间维度里进行元素变换，包括Z维度，也就是深度空间。

3D变换使用的`transform`属性和2D变换一样。熟悉2D变换的读者会发现基本的**[3D transform函数](http://www.w3.org/TR/css3-3d-transforms/#transform-functions)**非常相似：

*	`rotateX(角度）`
*	`rotateY(角度）`
*	`rotateZ(角度）`
*	`translateZ(Z轴上的移动值)`
*	`scaleZ(Z轴上的缩放值)`

`translateX()`将元素沿着X轴移动，`translateZ()`将元素沿着Z轴移动，也就是讲元素在3D空间里前后移动。正数值会将元素移近观察者，负责会将元素远离观察者。

`rotate`函数将元素绕着对应的轴旋转。这可能不太好理解。例如，`rotateX`会让人理解成将一个元素对象从左到右旋转。但实际上，`rotateX(45deg)`会将元素绕着水平的X轴方向旋转，所以元素顶部会按照角度向后旋转（离观察者变远），而元素底部会更加靠近观察者。

参考[示例：Transform1](http://desandro.github.com/3dtransforms/examples/transforms-01-functions.html)，示例效果如图所示：

![](http://media.24ways.org/2010/desandro/transforms01.png)

>	3D`rotate()`和`translate()`函数沿各个轴的变换效果。

`transform`函数用法如下所示：

*	`translate3d(x轴移动值，y轴移动值,z轴移动值)`
*	`scale3d(x轴缩放值，y轴缩放至，z轴缩放值)`
*	`rotate3d(x轴旋转值,y轴旋转值,z轴旋转值,旋转角度)`

>	专业提示：以上3D transform函数在safari下可以激活硬件加速功能。感谢Dean Jackson（CSS 3D transform规范作者，webkit主要开发者之一），以及[Thomas Fuchs](http://mir.aculo.us/2010/08/05/html5-buzzwords-in-action/)

本质上，任何包含3D操作的变换都会激活硬件合成功能，即使实际变换是2D或者什么变换也没有做（例如：`translate3d(0,0,0);`。请注意这这是当前的行为，未来有可能会改变（因此我们并没有写入文档中也不推荐）。但是在某些情况下这样做非常有用，而且能够显著地增强重绘性能。

为了简单起见，demo只使用了基本的变换函数，但是如果你正在针对IOS或者safari写CSS的话，请使用上面提到的3D函数来实现最佳渲染性能。

### 卡片翻转

基于以上内容，我们可以创建3D对象了。我们先从简单的卡片翻转效果开始。

基本的页面结构如下所示：

<pre><code>&lt;section class="container"&gt;
	&lt;div id="card"&gt;
		&lt;figure class="front"&gt;1&lt;/figure&gt;
		&lt;figure class="back"&gt;2&lt;/figure&gt;
	&lt;/div&gt;
&lt;/section&gt;
</code></pre>

`.container`元素创建了一个3D空间。`#card`元素是3D对象容器。卡片的每一面都有一个单独的元素`.front`和`.back`。即使是对于这样的简单对象，我仍然建议使用和所有3D变换一样的模式。保持3D空间元素和对象的分离，这样的模式易于理解，也方便样式的维护。

```csss
.container {
	width: 200px;
	height: 260px;
	position: relative;
	-webkit-perspective: 800;
}
```

现在`#card`元素可以在其父元素的3D空间里变换了。我们组合使用了绝对定位和相对定位方法将3D对象从文档流中分离出来。通过加入`width:100%;`和`height:100%;`属性保证3D对象的`transform-origin`在`.container`的中心位置。关于`transform-origin`的更多详情稍后再说。

我们再加上CSS3变换来使transform生效。

```css
#card {
	width: 100%;
	height: 100%;
	position: absolute;
	-webkit-transform-style: preserve-3d;
	-webkit-transition: -webkit-transform 1s;
}
```

`.container`的`perspective`属性只会应用到它的直接子元素（即`#card`）上。为了让后继子孙元素能够继承父元素的`perspective`值并且出现在同一个3D空间里，父元素可以在使用`perspective`值后再加上`transform-style: preserver-3d;`。不加上这一条的话，卡片在其父元素里会变成平面效果，卡片背面的旋转效果也会失效。

要将卡片的两面放到3D空间里，我们需要使用`position:absolute;`重置它们的2D空间位置。要在卡片翻转时隐藏其背面，我们使用了`backface-visibility: hidden;`。

```css
#card figure {
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden;
}
```

使用`rotateY(180deg)`来翻转`.back`元素：

```css
#card .front {
	background: red;
}
#card .back {
	background: blue;
	-webkit-transform: rotateY(180deg);
}
```

处理好卡片两面元素的位置后，为`#card`元素增加翻转时的样式：

```css
#card.flipped {
	-webkit-transform: rotateY(180deg);
}
```

现在就有了可以工作的3D对象了。要翻转卡片，我们可以切换`flipped`类。添加了`.flipped`类时，`#card`元素会旋转180度，显示`.back`面。

请看[示例：Card1](http://desandro.github.com/3dtransforms/examples/card-01.html)。

![](http://media.24ways.org/2010/desandro/card-flip01.png)

>	卡片翻转3D效果

### 侧面翻转

再看看天气APP的3D变换，和上面demo展示的卡片翻转效果不太一样。页面翻转时边应该在容器里，而不是沿着水平中心旋转。我们只需要在上面的demo里修改几行CSS代码就能实现这样的效果。

旋转应该以卡片右边为轴。默认情况下，元素的`transform-origin`是水平和数值中心（即`50% 50%`或者`center center`）。我们可以修改成右边栏。

`#card { -webkit-transform-origin: right center; }

这样就需要使用`translateX`将元素在水平轴上移动。我们将旋转角度设为`-180deg`让旋转以右边栏为轴进行。

```css
#card.flipped {
	-webkit-transform: translateX(-100%) rotateY(-180deg);
}
```

参考[示例：Card2](http://desandro.github.com/3dtransforms/examples/card-02-slide-flip.html)

![](http://media.24ways.org/2010/desandro/card-flip02.png)

>	为卡片创建沿着右边栏翻转的效果

### 立方体

创建3D对象是学习3D变换的好方法。但是一旦掌握了3D变换，你会渴望更上一层楼，创建真正的3D对象：棱镜。我们从创建立方体开始。

立方体用到的HTML标签和卡片差不多，只是需要用6个子元素来表示立方体的6个面。
```html
<section class="container">
	<div id="cube">
		<figure class="front">1</figure>
		<figure class="back">2</figure>
		<figure class="right">3</figure>
		<figure class="left">4</figure>
		<figure class="top">5</figure>
		<figure class="bottom">6</figure>
	</div>
</section>
```

基本的位置和大小样式设置将六个面在容器里依次放置（一个面放在另一个面上依次放置）。

```css
.container {
	width: 200px;
	height: 200px;
	posiiton: relative;
	-webkit-perspective: 1000;
}

#cube {
	width: 100%;
	height: 100%;
	position: absolute;
	-webkit-transform-style: preserver-3d;
}

#cube figure {
	width: 196px;
	height: 196px;
	display: block;
	position: absolute;
	border: 2px solid black;
}
```

卡片只需要翻转`.back`元素（即背面）。在立方体里，我们需要翻转6个面中的5个面。按照1-6的编号六个面分别为：前、后、右、左、上、下。

```css
#cube .front { -webkit-transform: rotateY(0deg); }
#cube .back { -webkit-transform: roateX(180deg); }
#cube .right { -webkit-transform: rotateY(90deg); }
#cube .left { -webkit-transform: rotateY(-90deg); }
#cube .top { -webkit-transform: rotateX(90deg); }
#cube .bottom { -webkit-transform: rotateX(-90deg); }
```

第一行`.front`类元素的css样式代码可以去掉，写在这里可以保持代码的一致性。

现在所有面都被翻转，我们只能看到`.front`面。有四个面和观察者（即我们的视角）是垂直或者正交的，因此我们看不到。要让这些面可见，我们需要让他们沿着所在位置的中心移动。每一个面的宽度都是200像素。从每个面的中心移动一半的位置，那么移动距离为：`100px`。

```css
#cube .front { -webkit-transform: rotateY(0deg) translateZ(100px); }
#cube .back { -webkit-transform: roateX(180deg) translateZ(100px); }
#cube .right { -webkit-transform: rotateY(90deg) translateZ(100px); }
#cube .left { -webkit-transform: rotateY(-90deg) translateZ(100px); }
#cube .top { -webkit-transform: rotateX(90deg) translateZ(100px); }
#cube .bottom { -webkit-transform: rotateX(-90deg) translateZ(100px); }
```
请注意`translateZ`函数写在`rotate`函数后面。transform函数的顺序很重要。花点时间消化一下这些知识。首先，每个面沿着自己的位置旋转，然后沿着一个单独的向量向外移动。

我们已经创建了一个可以使用的立方体，但还有工作要做。

**返回Z轴origin**

从用户角度考虑，3D变换不应该扭曲平面。但是元素在沿着X轴变换时，平面肯定会扭曲。

为了保持3D变换效果，Safari会先生成元素再应用变换。这样文本会和应用变换前一样。转换到3D空间时，可能会发生严重的像素化现象。

[示例：Transform2](http://desandro.github.com/3dtransforms/examples/transforms-02-pixelation.html)

![](http://media.24ways.org/2010/desandro/pixelation01.png)

回过头去看看上面的[Perspective3示例](http://desandro.github.com/3dtransforms/examples/perspective-03.html)，可以注意到无论`perspective`的值，或者`transform-origin`如何变化，平面上的数字1仍然保持在它原来的位置上，不受任何3D变换影响。

要解决`#cube`元素遇到的扭曲问题并恢复像素的可视性，我们可以把3D对象往回推，这样`.front`面会被放回它在Z轴上的起始位置（origin）。

`#cube { -webkit-transform: translateZ(-100px); }`

参考[示例：Cube1](http://desandro.github.com/3dtransforms/examples/cube-01-steps.html)

![](http://media.24ways.org/2010/desandro/cube01.png)

>	将`.front`面恢复到它在Z轴上的起始位置。

**立方体旋转**

要显示立方体上的某个面，我们需要使用样式来旋转立方体。transform的值和相应立方体面所在的位置相反。通过切换`#box`的类名来应用合适的变换。

```css
#cube.show-front { -webkit-transform: translateZ(-100px) rotateY(0deg); }
#cube.show-back { -webkit-transform: translateZ(-100px) rotateX(-180deg); }
#cube.show-right { -webkit-transform: translateZ(-100px) rotateY(-90deg); }
#cube.show-left { -webkit-transform: translateZ(-100px) rotateY(90deg); }
#cube.show-top { -webkit-transform: translateZ(-100px) rotateX(-90deg); }
#cube.show-bottom { -webkit-transform: translateZ(-100px) rotateX(90deg); }
```

请注意transform函数顺序的倒置。我们先使用`translateZ`来将对象往回压（增加离视角的距离），再进行旋转。

最后，我们在旋转状态之间加上`transition`动画。

`#cube { -webkit-transition: -webkit-transform 1; }`

请参考[示例：Cube2](http://desandro.github.com/3dtransforms/examples/cube-02-show-sides.html)

![](http://media.24ways.org/2010/desandro/cube02.png)

>	使用CSS `transition`旋转元素

### 矩形菱柱

创建立方体很简单，我们只需要关心一种尺寸。但是怎样处理不规则的矩形菱柱呢？让我们来创建一个300像素宽，200像素高，100像素深的矩形菱柱。

HTML标记和`#cube`一样，但是我们把id改成了`#box`。容器的样式基本上差不多：
```css
.container {
	width: 300px;
	height: 200px;
	position: relative;
	-webkit-perspective: 1000;
}

#box {
	width: 100%;
	height: 100%;
	position: absolute;
	-webkit-transform-style: preserve-3d;
}
```

接下来处理面的位置。需要单独设置每个面的大小。较小的面（左、右、上、下）需要放在容器中心，以利于这些面的旋转和向外移动。较系的左面和右面位置为：`left: 100px`(计算方法：(300-100)/2)，较粗的上面和下面位置为：`top: 50px`（计算方法：((200-100)/2)。

```css
#box figure {
	display: block;
	position: absolute;
	border: 2px solid black;
}

#box .front, #box .back {
	width: 296px;
	height: 196px;
}

#box .right, #box .left {
	width: 96px;
	height: 196px;
	left: 100x;
}

#box .top, #box .bottom {
	width: 296px;
	height: 96px;
	top: 50px;
}
```

旋转值可以和立方体一样，不需要修改，但是矩形菱柱的`translate`（移动）值需要变化。前面和后面个需要移动50像素，因为`#box`的深度为100像素。左面和右面的移动值为150像素，因为他们的宽度为300像素。上面和下面的移动距离为100像素，因为他们的高度是200像素。

```css
#box .front { -webkit-transform: rotateY(0deg) translateZ(50px); }
#box .back { -webkit-transform: rotateX(180deg) translateZ(50px); }
#box .right { -webkit-transform: rotateY(90deg) translateZ(150px); }
#box .left { -webkit-transform: rotateY(-90deg) translateZ(150px); }
#box .top { -webkit-transform: rotateX(90deg) translateZ(100px); }
#box .bottom { -webkit-transform: rotateX(-90deg) translateZ(100px); }
```

参考[示例：Box1](http://desandro.github.com/3dtransforms/examples/box-01-steps.html)

![](http://media.24ways.org/2010/desandro/box01.png)

和立方体的示例一样，要显示某个面，`#box`需要有翻转该面transform的样式值。`translateZ`和`rotate`都是相应面的翻转值。

```css
#box.show-front { -webkit-transform: translateZ(-50px) rotateY(0deg); }
#box.show-back { -webkit-transform: translateZ(-50px) rotateX(-180deg); }
#box.show-right { -webkit-transform: translateZ(-150px) rotateY(-90deg); }
#box.show-left { -webkit-transform: translateZ(-150px) rotateY(90deg); }
#box.show-top { -webkit-transform: translateZ(-100px) rotateX(-90deg); }
#box.show-bottom { -webkit-transform: translateZ(-100px) rotateX(90deg); }
```

参考[示例：Box2](http://desandro.github.com/3dtransforms/examples/box-02-show-sides.html)

![](http://media.24ways.org/2010/desandro/box02.png)

>	使用CSS transition来旋转长方体盒子

### 转盘（Carousel，或者叫走马灯效果）

前端开发者有很多内容转盘可以选择。既然我们的浏览器支持3D，为什么不尝试创建一个真正的3D转盘呢？

HTML标记仍然和上面的demo差不多。我们可以为了趣味性来创建一个有9个面板的转盘。

```html
<div class="container">
   <div id="carousel">
     <figure>1</figure>
     <figure>2</figure>
     <figure>3</figure>
     <figure>4</figure>
     <figure>5</figure>
     <figure>6</figure>
     <figure>7</figure>
     <figure>8</figure>
     <figure>9</figure>
   </div>
 </div>
```

接着是页面结构的样式。为`#carousel`的每个面板留20像素的空隙，在这里使用样式`left:10px`和`top: 10px`。每个面板的有效宽度为210像素。

```css
.container {
  width: 210px;
  height: 140px;
  position: relative;
  -webkit-perspective: 1000;
}
#carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transform-style: preserve-3d;
}
#carousel figure {
  display: block;
  position: absolute;
  width: 186px;
  height: 116px;
  left: 10px;
  top: 10px;
  border: 2px solid black;
}
```

接着进行旋转。`#carousel`有九个面。平均分配的话，每个面板应该旋转（360/9=40deg）。

```css
#carousel figure:nth-child(1) { -webkit-transform: rotateY(0deg); }
#carousel figure:nth-child(2) { -webkit-transform: rotateY(40deg); }
#carousel figure:nth-child(3) { -webkit-transform: rotateY(80deg); }
#carousel figure:nth-child(4) { -webkit-transform: rotateY(120deg); }
#carousel figure:nth-child(5) { -webkit-transform: rotateY(160deg); }
#carousel figure:nth-child(6) { -webkit-transform: rotateY(200deg); }
#carousel figure:nth-child(7) { -webkit-transform: rotateY(240deg); }
#carousel figure:nth-child(8) { -webkit-transform: rotateY(280deg); }
#carousel figure:nth-child(9) { -webkit-transform: rotateY(320deg); }
```
现在我们需要计算移动值。在创建立方体和盒子的demo里，计算`translate`值非常简单，因为它等于3D对象宽度、高度或者深度的一半。对于转盘来说，我们需要按照下图所示的方法来计算移动距离。

![](http://media.24ways.org/2010/desandro/diagram.png)

画一个转盘图，我们看到已知两个变量：每个转盘面板的宽度为210像素，以及每个面板每次的转动角度。我们将其中一个转盘面板沿着它的中心线切开，会得到一个直角三角形，这样就非常适合使用三角形法来计算了。

我们可以使用一个基本的正切公式来计算图中**r**的长度：

![](http://media.24ways.org/2010/desandro/calc.png)

>	译者注：正切=对边/邻边

得出每个面板的移动距离为288像素。
```css
#carousel figure:nth-child(1) { -webkit-transform: rotateY(0deg) translateZ(288px); }
#carousel figure:nth-child(2) { -webkit-transform: rotateY(40deg) translateZ(288px); }
#carousel figure:nth-child(3) { -webkit-transform: rotateY(80deg) translateZ(288px); }
#carousel figure:nth-child(4) { -webkit-transform: rotateY(120deg) translateZ(288px); }
#carousel figure:nth-child(5) { -webkit-transform: rotateY(160deg) translateZ(288px); }
#carousel figure:nth-child(6) { -webkit-transform: rotateY(200deg) translateZ(288px); }
#carousel figure:nth-child(7) { -webkit-transform: rotateY(240deg) translateZ(288px); }
#carousel figure:nth-child(8) { -webkit-transform: rotateY(280deg) translateZ(288px); }
#carousel figure:nth-child(9) { -webkit-transform: rotateY(320deg) translateZ(288px); }
```
如果要修改面板的宽度或者数量，我们只需要在方程中修改这两个值就能得到合适的`translateZ`值。用javascript表示这个方程如下所示：

```javascript
var tz = Math.round((panelSize / 2) / Math.tan((( Math.PI * 2 ) / numberOfPanels ) /2 ));
// 或者简化为
var tz = Math.round((panelSize / 2) / Math.tan( Math.PI / numberOfPanels));
```

和上面的demo一样，要显示某个面板，我们只需要在转盘上应用相反的transform。例如第五个面板：

`-webkit-transform: translateZ(-288px) rotateY(-160deg);`

参考[示例：Carousel1](http://desandro.github.com/3dtransforms/examples/carousel-01.html)

![](http://media.24ways.org/2010/desandro/carousel01.png)

现在你可能会有两个想法：

1.	为每个面板重写transform样式看上去很繁琐；
2.	为什么需要高中数学知识呢？不应该自动帮我算好吗？

你的想法绝对是对的！3D对象的重复特性可以使用脚本来处理。我们可以把上面庞大的transform样式改写到动态脚本里。这样做比硬编码到样式里具有更大的灵活性。

请参考[示例：Carousel2](http://desandro.github.com/3dtransforms/examples/carousel-02-dynamic.html)

### 总结

>	这篇文章由浅入深详细介绍了CSS3中的3D transform。内容很丰富，如果时间紧张，可以先体验demo，相信你一定会有收获！

### 参考资料
1.	[英文原文](http://24ways.org/2010/intro-to-css-3d-transforms/)
2.	[caniuse css 3d transform](http://caniuse.com/transforms3d)
3.	[w3 css3-transforms](http://www.w3.org/TR/css3-transforms)
4.	[w3scholl.com.cn perspective](http://www.w3school.com.cn/cssref/pr_perspective.asp)
5.	[http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
6.	[http://www.alloyteam.com/2012/10/the-css3-transform-perspective-property/](http://www.alloyteam.com/2012/10/the-css3-transform-perspective-property/)
7.	[http://css-tricks.com/almanac/properties/p/perspective/](http://css-tricks.com/almanac/properties/p/perspective/)
8.	[http://desandro.github.io/3dtransforms/](http://desandro.github.io/3dtransforms/)
9.	[http://www.w3cplus.com/content/css3-transform](http://www.w3cplus.com/content/css3-transform)
10.	[维基百科--正切](http://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%87)