【译】CSS3变换高级教程(A Primer on CSS3 Transforms)
---
### CSS3变换的基本语法
<pre><code>#element {
	transform: <i>function(a, b);</i>
}
</code></pre>
*	`transoform:`后面的斜体字为CSS3变换函数，可以接受一个到多个参数。
*	单个元素进行多次变换的CSS3变换写法如下所示：
<pre><code>#element {
	transform: function(a, b) function(a, b);
}
</code></pre>

### **translate**函数：CSS定位的又一选择
*	通常使用CSS定位的方法是利用`position`以及`top`,`bottom`,`left`,`right`属性。在CSS3的`transform`属性中利用`translate`函数可以实现同样的功能。例如下面的样式内容：
<pre><code>#element {
	transform: translate(25px, 50px);
}
</code></pre>
*	`translate`接受的两个参数分别代表了元素在X轴和Y轴上的移动方向。上面样式的意思是，元素在原位置上向右移动25像素（即水平移动），向下移动50像素（即竖直移动）。
*	如果只想在X轴上移动，可以使用`translateX`函数，同理，只在Y轴上移动，可以使用`translateY`函数。

### 更多`transform`函数
#### 元素缩放
*	`scale`函数也接受一到两个参数，分别代表将元素在X轴和Y轴上进行缩放。例如如下代码：
<pre><code>#element {
	width: 200px;
	height: 300px;
	transform: scale(3, 3);
}
</code></pre>
*	表示将`#element`元素分别在X轴和Y轴上放大3倍显示。**如果省略掉第二个参数，则默认与第一个参数相同**（**`translate`函数则默认省略掉的第二个参数为0**）。所以，`scale(3)`等同于`scale(3, 3)。
*	`scale(1)`表示保持元素的当前大小，`scale(0)`相当于`display:none`。
*	与`translate`相同的，如果只在X轴上缩放，可以使用`scaleX`，只在Y轴上缩放，可以使用`scaleY`。

#### 元素旋转
*	`rotate`函数可以让元素顺时针方向（参数为正数）或者逆时针（参数为负数）旋转。例如：
<pre><code>#element {
	width: 200px;
	height: 200px;
	background: #CCC;
	border: solid 2px black;
	transform: rotate(45deg);
}
</code></pre>
>	请注意`rotate`函数接受的参数单位为`deg`，表示旋转的角度。`translate`参数接受的参数单位为`px`，`scale`参数没有单位。以上函数参数都可以是小数。

#### 元素扭曲
*	`skew`函数将元素沿着X轴或者Y轴扭曲。例如：
<pre><code>#element {
	width: 200px;
	height: 200px;
	background: #CCC;
	border: 2px solid black;
	transform: skew(45deg, 30deg);
}
</code></pre>


### 参考资料
1.	[原文链接](http://www.sitepoint.com/a-primer-on-css3-transforms/)
2.	[http://www.impressivewebs.com/alternative-units-css3-rotate-transforms/](http://www.impressivewebs.com/alternative-units-css3-rotate-transforms/)
3.	[https://developer.mozilla.org/en-US/docs/Web/CSS/angle?redirectlocale=en-US&redirectslug=CSS%2Fangle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle?redirectlocale=en-US&redirectslug=CSS%2Fangle)
4.	[http://www.impressivewebs.com/mimic-onmouseout-css3-transitions/](http://www.impressivewebs.com/mimic-onmouseout-css3-transitions/)
5.	[http://www.impressivewebs.com/differences-between-css2-and-css3/](http://www.impressivewebs.com/differences-between-css2-and-css3/)
6.	[http://www.impressivewebs.com/understanding-css-shorthand/](http://www.impressivewebs.com/understanding-css-shorthand/)