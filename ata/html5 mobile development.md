### HTML5 移动开发(HTML5 Mobile Development)

#### 内容目录
* 基础：viewport
* 移动URL
* 高像素支持
* 触摸事件
* 离线支持及更多

#### 基础：viewport
*	&lt;meta name="viewport" content="{comma-separated options}"&gt;
*	最常见的用法为：
*	&lt;meta name="viewport" content="width=device-width" &gt;
*	viewport的选项列表：
	
<table>
<thead><td>选项</td><td>值</td></thead>
<tr><td>width</td><td>浏览器对我们站点使用的虚拟视窗宽度（单位为CSS像素值），或者常量<b>device-width</b></td></tr>
<tr><td>height</td><td>浏览器对我们站点使用的虚拟视窗高度（单位为CSS像素值），或者常量<b>device-height</b></td></tr>
<tr><td>user-scalable</td><td>no/yes</td></tr>
<tr><td>initial-scale</td><td>浮点值（1=不能缩放）</td></tr>
<tr><td>minimum-scale</td><td>浮点值</td></tr>
<tr><td>maximum-scale</td><td>浮点值</td></tr>
<tr><td>target-densitydpi</td><td>整数的DPI值（70到400）或者以下常量：<b>device-dpi,high-dpi,medium-dpi,low-dpi</b>。IOS上的safari不可用</td></tr>
</table>	