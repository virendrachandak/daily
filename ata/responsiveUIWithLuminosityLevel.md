移动端亮度API
---
> [CSS媒体查询4](http://dev.w3.org/csswg/mediaqueries4/#luminosity)加入了`luminosity`媒体功能（feature，或者叫特性也行）。手机根据环境自动调节亮度的功能相对于移动优先以及“响应式”在阳光等“极端”环境下反而显得更加重要。本文提前带您领略这些在普通WEB浏览器上还没有得到支持和实现的`luminosity`。

### 环境光事件API

HTML5[`设备API（Device API）`](http://www.w3.org/2009/dap/)中包括了[`环境光事件（Ambient Light Events）`](http://www.w3.org/TR/ambient-light/)。通过这个API可以使用简单的JavaScript访问光线/照片传感器。

我们可以使用这个API来模拟CSS4媒体查询创建对光的亮度响应的WEB内容。

### `Devicelight events`（设备亮度事件）

浏览器在光线传感器检测到光的亮度级别改变时会出发`DeviceLightEvent`事件。可以使用`devicelight`事件来捕捉。

```javascript
window.addEventListener('devicelight', function(event) {
    console.log(event.value + 'lux');
});
```

### 创建光响应式WEB内容

一个简单的demo：更具环境光线亮度来修改UI。

*	默认：黑色文字，浅灰色背景。
*	亮光：黑色文字，白色背景。
*	暗光：白色文字，暗色背景。

```javascript
window.addEventListener('devicelight', function(e) {
    var lux = e.value;

    if (lux < 50) {  // dim
        document.body.className = 'dim';
    }
    if (lux >= 50 && lux <= 1000) {
        document.body.className = 'normal';
    }
    if (lux > 1000) { // bright
        document.body.className = 'right';
    }
});
```

```css
body, body.normal {
    background-color: #ddd;
    color: #111;
}

body.dim {
    background-color: #444;
    color: #fff;
}

body.bright {
    background-color: #fff;
    color: #333;
}
```

[codepen上的源代码](http://codepen.io/girliemac/pen/pvmBs)

有两个条件需要补充一下：

目前这个API只有Firefox22+支持，而且需要配备光感应器。

### CSS4 媒体查询`luminosity`

目前（2014年1月12号）这份规范仍然处理`editor's draft`阶段，即仍然非常不稳定。可能需要很长时间才会在浏览器上支持和实现。

有了CSS4的`luminosity`属性后，上面的代码可以改成如下CSS代码：


```css
@media screen and (luminosity: normal) {
    body {background-color:#ddd; color:#111;}
}
@media screen and (luminosity: dim) {
    body {background-color: #444; color: #fff;}
}
@media screen and (luminosity: washed) {
    body {background-color: #fff; color: #333;}
}
```

### 后记

响应式，跨终端，互联网电视，传统WEB越来越有活力并开始渗透进我们生活的方方面面，就像以前大家只会轻视“脚本小子”，但是现在谁也不敢小瞧“WEB黑客”的杀伤力。前端工程师，任重道远。

### 参考资料
1.	[Responsive UI with Luminosity Level](http://girliemac.com/blog/2014/01/12/luminosity/)
