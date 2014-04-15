制作滑动幻灯片
---
创建可滑动的幻灯片有两种通用技巧可供选择。一种是对滚动位置采用动画，另一种是使用`translate`来移动元素。两种方法的优缺点比较如下：

### 使用`translate`

使用`translate`移动幻灯片的优势在与硬件加速以及像素级的动画控制。但是在幻灯片开始移动的初始触摸事件时用户可能会感觉到小小的延迟，大概十几毫秒。这个现象并没有良好的文档依据，仅仅来自我的个人感觉。

### 使用`overflow scroll`

`overflow scroll`不会有延迟。不需要等待JavaScript事件监听器的响应，但是没有`translate`方法那样流畅。

### HTML代码

```html
<div class="slider-wrap">
    <slider id="slider">
        <div class="holder">
            <div class="slide-wrapper">
                <div class="slide">
                    <img class="slide-image" src="http://farm8.staticflickr.com/7374/87316667174"/>
                </div>
            </div>
            <div class="slide-wrapper>
                <div class="slide">
                    <img class="slide-image" src="http://farm8.staticflickr.com/7384/87306541264"/>
                </div>
            </div>
            <div class="slide-wrapper>
                <div class="slide">
                    <img class="slide-image" src="http://farm8.staticflickr.com/7382/87320446382"/>
                </div>
            </div>
        </div>
    </slider>
</div>
```

### CSS

```css
.animate { transition: transform 0.8s ease-out; }
```

IE10对`touch`事件的处理和移动版webkit浏览器（如chrome和safari）不同。在webkit中使用javascript来处理`touch`事件，在IE10中使用CSS。

```css
.ms-touch.slider {
    overflow-x: scroll;
    overflow-y: hidden;

    -ms-overflow-style: none;
    /* Hides the scrollbar. */

    -ms-scroll-chaining: none;
    /* Prevents Metro from swiping to the next tab or app. */

    -ms-scroll-snap-type: mandatory;
    /* Force a snap scroll behavior on you images. */

    -ms-scroll-snap-point-x: snapInterval(0%, 100%);
    /* Define the y and x intervals to when scrolling. */
}
```

关于以上css属性的具体解释如下：

`-ms-scroll-chaining`
surface平板在页面上滑动时会切换浏览器标签页并使得所有开发者注册的滑动事件失效。可以使用`-ms-scroll-chaining`属性来为指定元素覆盖掉这种默认行为。

`-ms-scroll-snap-type`
设置成`mandatory`会覆盖掉浏览器的默认滚动行为并且强制滚动元素快速滚动一段距离。

`-ms-scroll-snap-points-x`
这个属性用于设置滚动元素滚动的距离。该属性接受两个值，第一个为起点，第二个为滚动距离。本文示例中每张幻灯片将移动其父元素的宽度，即移动距离为100%--也就是元素将会移动100%，200%，300%这样的距离。

`-ms-overflow-style`
设置为`none`可以隐藏滚动条。

### JavaScript

首先要检测正在使用的触摸设备。IE10使用`pointer`而webkit有`touchstart`，
`touchmove`和`touchend`事件。因为IE10幻灯片（基本）完全使用CSS写的，需要检测并且在容器上加上一个类。

```javascript
if (navigator msMaxTouchPoints) {
    $('#slider') addClass('ms-touch');
}
```

为幻灯片加上平移的效果。

```javascript
if (navigator.msMaxTouchPoints) {
    $('#slider') addClass('ms-touch');

    // Listed for the scroll event and move the image with translate.
    $('#slider').on('scroll', function() {
        $('.slide-image').css('transform', 'translate3d(-' + (100 -
                    %(this).scrollLeft() / 6) + 'px, 0, 0)');
    });
}
```

上面是处理IE10的javascript代码。webkit代码如下：

```
var slider = {
    // The elements
    el: {
        slider: $('#slider'),
        holder: $('.holder'),
        imgSlide: $('.slide-image')
    },
    // The stuff that makes the slider work.
    slideWidth: $('#slider').width(),   // Calculate the slider width.
    // Define these as global variables so we can use them across the entire script
    touchstartx: undefined,
    touchmovex: undefined,
    movex: undefined,
    index: 0,
    longTouch: undefined,

    // initialization events
    init: function() {
        this.bindUIEvents();
    },

    bindUIEvents: function() {
        this.el.holder.on('touchstart', function(event) {
            slider.start(event);
        });
        this.el.holder.on('touchmove', function(event) {
            slider.move(event);
        });
        this.el.holder.on('touchend', function(event) {
            slider.end(event);
        });
    }
}
```

下面是滑动幻灯片时的绑定事件：

`touchstart`

在iphone上如果慢慢地稍微移动幻灯片，幻灯片会回到原来的位置。但是如果快速移动地话，会进入下一张幻灯片，这种快速移动动作被成为`flick`。没有原生测试`flick`的方法，因此需要用到hack。在`touchstart`时我们会初始化一个`setTimeout`函数并在一段时间后设置一个变量。

```javascript
this.longTouch = false;

setTimeout(function() {
    // Since the root of setTimeout is window we can't reference this. That's why this variable says window.slider in front of it.
    window.slider.longTouch = true;
}, 250);
```

还需要活动触摸的初始位置。javascript可以定义多点触摸事件，因此可以向触摸事件传递一个代表正在监测的手指数目的数字。本文示例只关心一个手指头的触摸事件，因此如下所示：

```javascript
// Get the original touch position.
this.touchstartx = event.originalEvent.touches[0].pageX;
```

获取触摸移动的轨迹：

```javascript
// Continuously return touch position.
this.touchmovex = event.originalEvent.touches[0].pageX;
```

计算最终位置和`touchmoe`位置来算出幻灯片的`translate`移动方式：

```javascript
// Calculate distance to translate holder.
this.movex = this.index + this.slideWidth + (this.touchstartx - this.touchmovex);
```

接着平移图片。

```javascript
// define the speed the images should move at
var panx = 100 - this.movex / 6;
```

加上一些处理边界情况的逻辑代码。在第一张幻灯片或者最后一张幻灯片时的逻辑为在向相反的方向移动时（即没有图片的方向）停止图片平移。

```javascript
if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
    this.el.holder.css('transform', 'translate3d(-' + this.movex + 'px, 0, 0');
}

if (panx < 100) {   // Corrects an edge-case problem where the background image moves without container moving.
    this.el.imgSlide.css('transform', 'translate3d(-' + panx + 'px, 0, 0)');
}
```

`touchend`

在`touchend`事件中计算用户移动幻灯片的距离，速度以及是否移动到下一张幻灯片。

首先需要查看滑动的距离。

```javascript
// Calculates the distance swiped.
var absMove = Math.abs(this.index + this.slideWidth - this.movex);
```

接下来计算幻灯片是否应该移动。

```javascript
// Calculate the index. All other calculations are based on the index.
if (absMove > this.slideWidth / 2 || this.longTouch === false) {
    if (this.movex > this.index*this.slideWidth && this.index < 2) {
        this.index++;
    } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
        this.index--;
    }
}
```
完整代码：[url](http://codepen.io/foleyatwork/pen/ylwoz)

### 英文资料
1.  [http://css-tricks.com/the-javascript-behind-touch-friendly-sliders/](http://css-tricks.com/the-javascript-behind-touch-friendly-sliders/)
