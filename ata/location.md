window.location详解
---
location对象在前端生产中发挥着许多奇妙的作用，例如页面跳转，OPOA动画实现，页面状态记录等等。本文详细介绍了location对象，有了解的部分，可以迅速跳过。

`window.location`返回的是一个包含当前页面文档地址信息的`[Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)`对象。

`window.location`实际上是一个只读的`Location`对象，但是，可以为它赋`DOMString`类型的值，即`window.location='http://www.example.com'`，但是实际上，这等同于`window.location.href='http://www.example.com'`。

### 语法

```javascript
oldLocation = window.location;
window.location = newLocation;
```

### 示例
#### 基本示例

```javascript
alert(window.location);     // alerts "https://developer.mozilla.org/en-us/docs/Web/API/window.location"
```

#### 示例#1：跳转到一个新页面

给location对象赋值会用URL地址加载一个文档对象，效果等同于调用了`window.location.assign()`方法并且传递了一个新的URL参数。值得注意的是在某些安全设置下，例如CORS（Cross Origin Resources Sharing，跨域资源共享）会阻止跳转生效。

```javascript
window.location.assign('http://www.mozilla.org');
window.location = 'http://www.mozilla.org'
```

#### 示例#2：强制从服务器重新加载当前页面

```javascript
window.location.reload(true);
```

#### 示例#3：

考虑以下示例，使用`replace()`方法在hash中插入`window.location.pathname`来重载页面。

```javascript
function reloadPageWithHash() {
    var initialPage= window.location.pathname;
    window.location.replace('http://example.com/#' + initialPage);
}
```

### 参考资料
1.  [MDN--window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window.location)
2.  [W3--CORS](http://www.w3.org/TR/cors/)
3.  [HTML5 Rocks--Using CORS](http://www.html5rocks.com/en/tutorials/cors/)
4.  [MDN--CORS](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS)
