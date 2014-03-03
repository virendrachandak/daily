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
    console.log('Initialized.');
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
    console.log('touchstart:');
    var el = document.getElementsByTagName('canvas')[0];
    var ctx = el.getContext('2d');
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        console.log('touchstart:'  + i + '...');
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        ctx.art(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);
        // a circle at the start.
        ctx.fillStyle = color;
        ctx.fill();
        console.log('touchstart:' + i + '.');
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
            console.log('continuing touch '  + idx);
            ctx.beginPath();
            console.log('ctx.moveTo(' + ongoingTouches[idx].pageX + ',' +
                        ongoingTouches[idx].pageY + ');');
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            console.log('ctx.lineTo(' + touches[i].pageX + ',' +
                        touches[i].pageY + ');');
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();

            // swap in the new touch record
            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
            console.log('.');
        } else {
            console.log("can't figure out which touch to continue");
        }
    }
}
```

该函数也会遍历改变了的触摸事件对象，但是会在缓存的触摸信息队列中先查找前一次触摸事件的信息，以决定

### 参考资料
1.  [MDN-Touch Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events)
2.  [http://jsfiddle.net/Darbicus/z3Xdx/10/](http://jsfiddle.net/Darbicus/z3Xdx/10/)
