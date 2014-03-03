touch事件入门
---
touch事件为触屏用户提供了高质量的支持，提供了解析手指在触屏或者触摸板上活动的能力。

### 定义

**触摸面**

触屏表面。可能为触摸屏幕或者触摸板。

**触摸点**

与触摸面接触的点。有可能是手指（或者手肘，耳朵，鼻子等等，但最有可能是手指）或者触摸笔。

### 接口

**TouchEvent**

与触摸面的接触状态改变时发生的事件。

**Touch**

用户和触摸屏之间的单点接触。

**TouchList**

触摸事件列表；例如用户同时使用多个手指触摸触摸面时。

# 示例

下面的例子跟踪了一次发生的多个触摸事件，允许用户在`<canvas>`上同时用多个手指绘画。仅适用于支持触摸事件的浏览器。

### 创建canvas

```html
<canvas id="canvas" width="600" height="600" style="border:1px solid black">
Your browser does not support canvas element.
<br>
Log:<pre id="log" style="1px solid #CCC;"></pre>
</canvas>
```

### 创建事件处理器

将下面的事件绑定到页面加载时`<body>`元素的`onload`属性上。

```javascript
window.onload = function() {
    var el = document.getElementsByTagName('canvas')[0];
    el.addEventListener('touchstart', handleStart, false);
    el.addEventListener('touchend', handleEnd, false);
    el.addEventListener('touchcancel', handleCancel, false);
    el.addEventListener('touchmove', handleMove, false);
    el.addEventListener('touchleave', handleEnd, false);
    log('Initialized.');
}
```

上面的代码会在我们的`<canvas>`元素上绑定触摸事件。

### 监测新的触摸事件

我们还需要跟踪正在发生的触摸事件。

```javascript
var ongoingTouches = new Array;
```

`touchstart`事件发生时，也就是发生了一次与触摸面的接触，将会调用`handleStart()`函数。

```javascript
function handleStart(evt) {
    evt.preventDefault();
    log('touchstart:');
    var el = document.getElementsByTagName('canvas')[0];
    var ctx = el.getContext('2d');
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        log('touchstart:'  + i + '...');
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        ctx.art(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);
        // a circle at the start.
        ctx.fillStyle = color;
        ctx.fill();
        log('touchstart:' + i + '.');
    }
}
```

这个函数调用[`event.preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault)来禁止浏览器继续处理触摸事件（也会禁止分发鼠标事件）。然后获取`context`并将改变的点从事件的[`TouchEvent.changeTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent.changedTouches)属性中取出来。

然后，遍历该列表中的[`Touch`](https://developer.mozilla.org/en-US/docs/Web/API/Touch)对象，将这些对象压入活动触摸点列表中，并且开始画一个小圆的起始点。使用4像素宽的线条，我们可以画出一个4弧度为4个像素的圆。

### 在触摸移动时画图

每次一个或多个手指移动时，都会发布一个`touchmove`事件，从而调用`handleMove()`事件。本例中这个函数的职责是更新缓存的触摸信息并且从当前触摸点的上一个位置画一条线。

```javascript
function handleMove(evt) {
    evt.preventDefault();
    var el = document.getElementsByTagname('canvas')[0];
    var ctx = el.getContext('2d');
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].indentifier);

        if (idx >= 0) {
            log('continuing touch '  + idx);
            ctx.beginPath();
            log('ctx.moveTo(' + ongoingTouches[idx].pageX + ',' +
                        ongoingTouches[idx].pageY + ');');
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            log('ctx.lineTo(' + touches[i].pageX + ',' +
                        touches[i].pageY + ');');
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();

            // swap in the new touch record
            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
            log('.');
        } else {
            log("can't figure out which touch to continue");
        }
    }
}
```

该函数也会遍历改变了的触摸事件对象，但是会在缓存的触摸信息队列中先查找前一次触摸事件的信息，以决定每条子线段的绘画起点，这是通过查看每次点击事件的`Touch.identifier`属性实现的。该属性是一个与每次点击相关的唯一整数，并且在手指与平面接触期间的每次事件里保持一致。

这样我们就可以获取每次点击时的前一位置坐标，并使用合适的上下文方法来画一条连接两个位置的线段。

画完线后，我们调用`Array.splice()`使用`ongoingTouches`数组中的当前信息来替换掉触摸点的上一次位置信息。

### 触摸事件结束的处理

用户手指离开表面后会触发一个`touchend`事件。类似地，如果手指离开了我们的
`canvas`元素，我们会得到一个`touchleave`事件。我们使用下面的`handleEnd`函数来对这两个事件做相同的处理。这个函数的任务是在每次触摸事件结束时画出最后一条线段并且将触摸点从正在进行的触摸列表中删除。

```javascript
function handleEnd(evt) {
    evt.preventDefault();
    log('touchend/touchleave');
    var el = document.getElementsByTagName('canvas')[0];
    var ctx = el.getContext('2d');
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            //在结束时加上一个正方形
            ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);
            ongoingTouches.splice(idx, 1);  //删除，结束
        } else {
            log("Cant't figure out which touch to end");
        }
    }
}
```

这与前一个函数类似；唯一的区别在于我们在结束时花了一个正方形并且调用了
`Array.splice()`方法讲旧的入口从正在进行的触摸事件列表中删除，而不更新信息。这样我们就可以不再监测这个触摸点。

### 处理touch取消事件

如果用户端的手指滑倒了浏览器界面上，或者需要取消touch事件，会触发`touchcancel`事件，我们会调用下面的`handleCancel()`函数。

```javascript
function handleCancel(evt) {
    evt.preventDefault();
    log('touchcancel.');
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++ ) {
        ongoingTouches.splice(i, 1);
    }
}
```

因为我们的想法是迅速中止touch事件，因此简单地将触摸点从正在进行的触摸事件列表中删除就可以了，不用再绘画最后的线段。

### 功能函数(Convenience functions)

本示例使用了两个功能函数，来帮助让我们的代码更加清晰。

### 为每次touch选择一个颜色

为了让每次touch看起来不一样，`colorForTouch`函数被用于基于每次touch事件的唯一`identifier（标识）`选择一个颜色。这个标识不太容易理解，但是开发者可以依靠它来区分当前正在活动的触摸事件。

```javascript
function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16);     //转换成16进制数字
    g = g.toString(16);     //转换成16进制数字
    b = b.toString(16);     //转换成16进制数字
    var color =  '#' + r + g + b;
    log('color for touch with identifier ' + touch.identifier + '='  + color);
    return color;
}
```

上面的函数会返回一个在调用`<canvas>`函数时用来设置颜色的字符串。liru，对于一个值为10的`Touch.identifier`,上面函数的返回结果为`#aaa`。

### 赋值touch对象

一些浏览器(例如移动版safari)会在事件里重用touch对象，因此最好复制这些你关心的对象，而不是整个引用。

```javascript
function copyTouch(touch) {
    return {identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY};
}
```

### 查找正在进行的touch事件

下面的`ongoingTouchIndexById()`函数会扫描`ongoingTouches`数组来查找与给定
`identifier`（标识）匹配的touch对象，并将该touch对象的`index`返回数组中。

```javascript
function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id === idToFind) {
            return i;
        }

    }

    return -1;      // 未找到
}
```

显示正在发生的事件

```javascript
function log(msg) {
    var p = document.getElementById('log');
    p.innerHTML = msg + '\n' + p.innerHTML;
}
```

[查看实际效果](https://mdn.mozillademos.org/en-US/docs/Web/Guide/API/DOM/Events/Touch_events$samples/Example?revision=493243)
[jsFiddle示例地址](http://jsfiddle.net/Darbicus/z3Xdx/10/)

### 补充提示

本节补充了一些处理WEB应用中的touch事件的建议。

### 处理click

因为在`touchstart`或者一系列`touchmove`事件里的第一个`touchmove`事件时调用`preventDefault()`会阻止相应的鼠标事件触发，通常会在`touchmove`而不是`touchstart`里调用`preventDefault()`。这样，仍然可以触发鼠标事件而且链接也不会失效。某些框架会用其他的方法，比如重新触发touch事件来实现同样的目的。（本示例过于简单，有可能会引发奇怪的行为。仅作为指南）。

```javascript
function onTouch(evt) {
    evt.preventDefault();
    if (evt.touches.length > 1 || (evt.type === 'touchend' && evt.touches.length > 0))
        return;

    var newEvt  = document.createElement('MouseEvents');
    var type = null;
    var touch = null;
    switch (evt.type) {
        case "touchstart":  type = 'mousedown'; touch =evt.changedTouches[0]; break;
        case "touchmove":  type = 'mousemove'; touch =evt.changedTouches[0]; break;
        case "touchend":  type = 'mouseup'; touch =evt.changedTouches[0]; break;
    }
    newEvt.initMouseEvent(type, true, true,
            evt.originalTarget.ownerDocument.defaultView, 0,
            touch.screenX, touch.screenY, touch.clientX, touch.clientY,
            evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null
            );
    evt.originalTarget.dispatchEvent(newEvt);
}
```

### 尽在第二次touch事件是调用`preventDefault()`

防止在页面上触发`pinchZoom`这样事件的一种技巧就是在一系列touch事件的第二次touch时调用`preventdefault()`。这样的行为在touch事件规范里并没有得到很好的定义，因此在不同浏览器里会有不同的表现（例如，ios会阻止缩放但是允许两个手指的移动；而android允许缩放但是不允许手指平移。opera和firefox目前会禁止缩放和平移）。目前并不推荐依赖这种情况下的某种行为，而是推荐使用`meta`标签的`viewport`属性来禁止缩放。

### 浏览器兼容性

桌面版：
*   功能        Chrome  Firefox(Gecko)          IE      Opera       Safari
*   基本支持    22.0    18.0(18.0)24里禁止[bug 888304](https://bugzilla.mozilla.org/show_bug.cgi?id=888304)     不支持      不支持      不支持

**注意**：在桌面版firefox Gecko24中禁止了从Gecko18版本引入的touch事件支持。要强制开启，可以通过`about:config`设置`dom.w3c_touch_events.enabled`为2。

### 参考资料
1.  [MDN-Touch Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events)
2.  [http://jsfiddle.net/Darbicus/z3Xdx/10/](http://jsfiddle.net/Darbicus/z3Xdx/10/)
