你可能不知道的5种CSS与JavaScript交互方式
---

## 使用JavaScript获取伪元素属性

通过`style`属性可以获取CSS属性值，但是伪元素的属性呢？

```javascript
// Get the color value of .element:before
var color = window.getComputedStyle(
    document.querySelector('.element'), ':before'
).getPropertyValue('color');

// Get the content value of .element:before
var content = window.getComputedStyle(
  document.querySelector('.element'), 'before'
).getPropertyValue('content');
```

## classList API

JavaScript库用到了`addClass`，`removeClass`以及`toggleClass`方法。为了支持较老的浏览器，所有库都会抓去元素的`className`（字符串）然后添加或者删除类，再更新`className`字符串。新的实现同样功能的API被称为[classList](http://davidwalsh.name/classlist)：

```javascript
myDiv.classList.add('myCssClass');  // Adds a class

myDiv.classList.remove('myCssClass');  // Removes a class

myDiv.classList.toggle('myCssClass');  // Toggle a class
```

> IE直到10+版本才支持该API

## 直接向样式表添加和删除规则

通过`element.style.propertyName`可以非常熟练地修改样式，[在新样式和已有样式上读写规则](http://davidwalsh.name/add-rules-stylesheets)的API如下：

```
function addCSSRule(sheet, selector, rules, index) {
  if (sheet.insertRule) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else {
    sheet.addRule(selector, rules, index);
  }
}

// Use it!
addCSSRule(document.styleSheets[0], "header", "float:left");
```

## 通过加载器加载CSS文件

使用curl.js[懒加载样式表](http://davidwalsh.name/curljs)：

```javascript
curl(
  [
    "namespace/MyWidget",
    "css!namespace/resources/MyWidget.css"
  ],
  function(MyWidget) {
    // Do something with MyWidget
    // The CSS reference isn't in the signature because we don't care about it;
    // we just care that it is now in the page
  }
);
```

## CSS `pointer-events`

[CSS pointer-events](http://davidwalsh.name/pointer-events)

```css
.disabled { pointer-events: none; }
```

`addEventListener`回调在这样的元素上不会执行。

[5 Ways that CSS and JavaScript Interact That You May Not Know About](http://davidwalsh.name/ways-css-javascript-interact)
