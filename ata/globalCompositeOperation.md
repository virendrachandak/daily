理解canvas的globalCompositeOperation
---
### 缘起

[在画布上刮一刮——无线刮刮卡技术分享](http://www.atatech.org/article/detail/12647/)

看完以后的一个疑问是，canvas的`globalCompositeOperation`到底是什么？各种属性值有什么不同。

---
上代码：


脚本代码

```javascript
var compositeTypes = [
    'source-over',  'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out', 'destination-atop',
    'lighter', 'darker', 'copy', 'xor'
];

function draw() {
    for (var i = 0; i < compositeTypes.length; i++) {
        var label = document.createTextNode(compositeTypes[i]);
        document.getElementById('lab' + i).appendChild(label);
        var ctx = document.getElementById('tut' + i).getContext('2d');

        // draw rectangle
        ctx.fillStyle = '#09F';
        ctx.fillRect(15, 15, 70, 70);

        // set composite property
        ctx.globalCompositeOperation = compositeTypes[i];

        // draw circle
        ctx.fillStyle = '#F30';
        ctx.beginPath();
        ctx.arc(75, 75, 35, 0, Math.PI * 2, true);
        ctx.fill();
    }
}
```

html页面代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>globalCompositeOperation Example</title>
    <style>
    .container {
        width: 680px;
        float: left;
    }

    .lab {
        border: 1px solid;
        float: left;
        width: 150px;
        height: 150px;
        display: inline-block;
        margin: 10px 10px 20px 0;
        text-align: center;
    }

    .tut {
        width: 100%;
        height: 100%;
    }

    pre {
        float: right;
        display: block;
        border:1px dotted solid;
    }
    </style>
</head>
<body>
    <h1>A Canvas <span>globalCompositeOperation</span> Example</h1>
    <hr>
    <div class="container">
        <div class="lab" id="lab0">
            <canvas class="tut" id="tut0"></canvas>
        </div>
        <div class="lab" id="lab1">
            <canvas class="tut" id="tut1"></canvas>
        </div>
        <div class="lab" id="lab2">
            <canvas class="tut" id="tut2"></canvas>
        </div>
        <div class="lab" id="lab3">
            <canvas class="tut" id="tut3"></canvas>
        </div>
        <div class="lab" id="lab4">
            <canvas class="tut" id="tut4"></canvas>
        </div>
        <div class="lab" id="lab5">
            <canvas class="tut" id="tut5"></canvas>
        </div>
        <div class="lab" id="lab6">
            <canvas class="tut" id="tut6"></canvas>
        </div>
        <div class="lab" id="lab7">
            <canvas class="tut" id="tut7"></canvas>
        </div>
        <div class="lab" id="lab8">
            <canvas class="tut" id="tut8"></canvas>
        </div>
        <div class="lab" id="lab9">
            <canvas class="tut" id="tut9"></canvas>
        </div>
        <div class="lab" id="lab10">
            <canvas class="tut" id="tut10"></canvas>
        </div>
        <div class="lab" id="lab11">
            <canvas class="tut" id="tut11"></canvas>
        </div>
    </div>
    <pre>
var compositeTypes = [
    'source-over',  'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out', 'destination-atop',
    'lighter', 'darker', 'copy', 'xor'
];

function draw() {
    for (var i = 0; i < compositeTypes.length; i++) {
        var label = document.createTextNode(compositeTypes[i]);
        document.getElementById('lab' + i).appendChild(label);
        var ctx = document.getElementById('tut' + i).getContext('2d');

        // draw rectangle
        ctx.fillStyle = '#09F';
        ctx.fillRect(15, 15, 70, 70);

        // set composite property
        ctx.globalCompositeOperation = compositeTypes[i];

        // draw circle
        ctx.fillStyle = '#F30';
        ctx.beginPath();
        ctx.arc(75, 75, 35, 0, Math.PI * 2, true);
        ctx.fill();
    }
}
    </pre>
    <script>
var compositeTypes = [
    'source-over',  'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out', 'destination-atop',
    'lighter', 'darker', 'copy', 'xor'
];

function draw() {
    for (var i = 0; i < compositeTypes.length; i++) {
        var label = document.createTextNode(compositeTypes[i]);
        document.getElementById('lab' + i).appendChild(label);
        var ctx = document.getElementById('tut' + i).getContext('2d');

        // draw rectangle
        ctx.fillStyle = '#09F';
        ctx.fillRect(15, 15, 70, 70);

        // set composite property
        ctx.globalCompositeOperation = compositeTypes[i];

        // draw circle
        ctx.fillStyle = '#F30';
        ctx.beginPath();
        ctx.arc(75, 75, 35, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

draw();
    </script>
</body>
</html>
```

图示结果：
![](http://gtms02.alicdn.com/tps/i2/T1lfCSFBVbXXaBAtPK-612-518.png)

一图胜千言，不用再说了吧。

### 参考资料
1.  [MDN](https://developer.mozilla.org/samples/canvas-tutorial/6_1_canvas_composite.html)
2.  [http://msdn.microsoft.com/en-us/library/ie/ff974909(v=vs.85).aspx](http://msdn.microsoft.com/en-us/library/ie/ff974909(v=vs.85).aspx)
