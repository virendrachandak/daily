`iPad`上的`Web`内容开发准备
---

> 针对`iPad`上的`Safari`浏览器做`Web`内容开发需要考虑的事情。

** 介绍 **

`iPad`上的`Safari`浏览器可以提供桌面版`web`体验。（广告时间）`iPad`拥有9.7英寸大屏幕，快速的网络连接功能，与`OS X`系统上的`Safari`浏览器一样的`Webkit`布局引擎（`layout engine`）。开发者可以确保站点在`iPad`上的视觉和使用体验非常棒，并且为用户创造出新的能够触摸的`web`体验，只要考虑到`iPad`和其他平台的几点不同。

如果有`iPad`，请使用`iPad`测试您的站点。如果没有，可以使用`OS X`上的`Safari`浏览器测试您的站点，下面给出了这种情况下的指导。

**`iPad Safari`浏览器预备度检查列表**

> 即为`iPad`上的`Safari`浏览器制作站点需要做的准备和检查事项。

## 1.   在`iPad`上对站点进行测试，在需要时升级`user agent`检测

许多站点都会在服务器端对浏览器的`user agent`字符串进行检查，以确定是否提供站点的`mobile`版本。`iPad`上的`Safari`可以提供`桌面版web体验`，用户也期待和桌面一样的体验，因为`iPad`有大屏幕、快速的网络连接。那些为小屏幕移动设备优化过的站点不应该向`iPad`用户展示。

**列表1**：`iOS 7.0 SDK`上的`iPad版Safari`用户代理字符串(`user agent string`)

```javascript
Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10
```

请注意`iPad`的`user agent`字符串含有单词`Mobile`，但是不包含单词`iPhone`。

**用桌面版`Safari`模拟`iPad`上`Safari`的`HTTP`请求**

  在没有`iPad`和`iPhone`模拟器的情况下，可以使用桌面电脑来模拟`iPad`上`Safari`的`HTTP`请求。首先，使用`OS X`系统上的`Safari`浏览器打开网站，然后，在`Safari`的`Advanced Preference`设置中启用`Show Develop menun in menu bar`，如下图所示：

  <figure>
  <img src="https://developer.apple.com/library/safari/technotes/tn2010/tn2262/Art/tn2262_developmenu7_0_3.png"/>
  <figcaption>启用`Safari`开发菜单</figcaption>
  </figure>

  然后，通过从菜单中选择`Develop > User Agent > Other`，根据提示`User Agent`字符串，复制粘贴上面`iPad`的内容即可。

  点击`OK`后，可以通过`http`请求来验证目前发送的`User Agent`信息是否为修改后的内容。

  <figure>
  <img src="https://developer.apple.com/library/safari/technotes/tn2010/tn2262/Art/tn2262_headers7_0_3.png" />
  <figcaption></figcaption>
</figure>

## 2.  使用`W3C`标准的`web`技术而不是插件

  `iPad`上的`Safari`和`iOS`系统上的`Safari`都不支持插件。

  对于页面上展现的内容，要使用无需插件的代码来进行替换。例如，如果使用了插件来嵌入视频或者音频，可以使用`HTML5`的`<audio>`和`<video>`标签进行代替。

> 关于视频音频等流信息在`iPad Safari`上的支持和具体技术细节，例如`<audio> <video>`标签，`HTMLMediaElement，HTMLVideoELement`和`HTMLAudioElement`类可以分别参考：
> [HTTP Live Streaming Overview](https://developer.apple.com/library/safari/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008332)
> [Safari HTML5 Audio and Video Guide](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Introduction/Introduction.html#//apple_ref/doc/uid/TP40009523)
> [Safari DOM Additions Reference](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariJSRef/_index.html#//apple_ref/doc/uid/TP40001482)

  如果当前页面用到了插件来实现动画，可以使用`JavaScript`和`CSS3 transform, transition`和`CSS3 动画`来代替。具体资料可参考注释。
> [Safari CSS Reference](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Introduction.html#//apple_ref/doc/uid/TP40002050)
> [Safari CSS Visual Effects Guide](https://developer.apple.com/library/safari/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Introduction.html#//apple_ref/doc/uid/TP40008032)
> [Safari Dev Center--"Audio, Video & Visual Effects" sample code](http://developer.apple.com/safari)

  #### 使用桌面版`Safari`对无插件代码进行测试

  如图：

  <figure>
    <img src="https://developer.apple.com/library/safari/technotes/tn2010/tn2262/Art/tn2262_plugins7_0_3.png" />
    <figcaption>禁用桌面版`Safari`的插件</figcaption>
  </figure>

## 3.  检查`viewport`标签设置

  例如使用`device-width`属性值而不是硬编码的像素值来指定`viewport`的宽度。

  ```
  <meta name="viewport" content="width=device-width" />
  ```

## 4.  修改依赖`CSS fixed`定位的代码

  `CSS fixed`定位在`iPhone`和`iPad`上有效，但是可能和我们预期的不太一样。桌面版的`fixed`元素可以保持在屏幕上可见，然而`iPad`和`iPhone`上的元素却有可能在用户缩放(`zoom`)和移动(`pan`)网页时会看不到。

  > 关于手势的各种定义可以参考[Touch Gesture Reference Guide](http://www.lukew.com/ff/entry.asp?1071)

  原因？

  从定义看，使用了`CSS fixed`定位元素的页面父元素是`viewport`，即我们可见的视窗部分。这意味着设置`position:fixed; bottom: 20px; right: 20px;`会将元素放在视窗底部边缘往上20个像素，视窗右侧边缘往左20个像素的位置。具体代码为：

  ```
#fixed {
  position: fixed;
  right: 20px;
  bottom: 20px;
  height: 100px;
  width: 100px;
  background-color: purple;
}
  ```

  桌面版`Safari`的视窗等同于`window`，`window`尺寸的改变会同时改变
`Safari`视窗的大小。滚动时视窗也会滚动。因此，在`OS X`上的`Safari`，元素会在屏幕上固定位置显示。

`iPad`和`iPhone`上的`Safari`的`window`不能改变尺寸，而是被定为了屏幕的大小（确切说是减去`Safari`用户控制界面后的大小），也不能被用户改变。用户通过双击（`double tap`)或者缩放和拖动页面在页面上移动，改变了缩放和`viewport`的位置。用户的缩放和`viewport`位置的修改都是在固定尺寸的可视内容区域里做的(`window`)，这就意味着，`viewport`和`window`并没有一致的改变从而导致元素不出现在屏幕上。

## 5.  为触摸界面做准备

虽然`iPad`用户可以选择接入键盘来操作，但是最主要的操作和交互方式而是通过触摸。在表单填写等`<input type="text">`和`<textarea>`元素获得焦点，等待用户输入时，会出现软件键盘。除了这样的交互，用户不应该依赖软件键盘在页面内导航。

此外，`iOS`上`Safari`的主要交互是通过用户的手指而不是鼠标完成的，因此鼠标悬停等操作会生效，而且需要支持针对触屏界面的操作。

可以使用`touchstart`，`touchmove`，`touchend`和`touchcancel`等操作来完成与页面`DOM`节点的触摸操作，这些`DOM`事件统称为`touch events`。

> 更多[`touch events`的内容]()
> [Safari Web Content Guide--Handling Events](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/CreatingContentforSafarioniPhone/CreatingContentforSafarioniPhone.html#//apple_ref/doc/uid/TP40006482)
> [Safari DOM Addition Reference--TouchEvent, TouchList类](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariJSRef/_index.html#//apple_ref/doc/uid/TP40001482)
> [Safari Dev Center提供的`SlideMe`示例](http://developer.apple.com/safari/library/samplecode/SlideMe/index.html)

因为`ios`上`Safari`的`touching`和`holding`操作会调用`cut/copy/paste`对话框，可以选择在元素级的用户界面上进行禁用：`-webkit-user-select: none;`，注意，不要在全局禁用！

## 英文原文
[Preparing You Web Content for iPad](https://developer.apple.com/library/safari/technotes/tn2010/tn2262/_index.html)
