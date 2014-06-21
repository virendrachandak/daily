`bookmarklets`
---

浏览器是一个伟大的黑盒，提供了足够多的开放接口让我们任意调用，从而实现我们需要的功能，对web页面进行任意定制和修改。前端工程师可以看作是从服务器上派发脚本和样式文件调用这个黑盒的功能为用户提供服务。而`bookmarklet`和`greasemonkey`，`tampermonkey`，`stylelist`这类插件则是为用户提供了定制自己的浏览器，让自己的浏览器被自己操纵的功能。

其实归根到底原理都很简单，上面已经提到了，就是调用浏览器这个“黑盒”提供的开发接口。

`bookmarklet`全部以`javascript:`作为内容的开头。最简单的`bookmarklet`就是`javascript:alert(new Date())`。我们可以写下这样一个页面。

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
<a href="javascript:alert(new Date());">hello world,bookmarklet</a>
</body>
</html>
```

然后我们用浏览器打开它，把链接直接拖到浏览器的书签栏上就可以使用了。使用时非常简单，只要点击一下，就会弹出当前的时间。我们可以给它取一个高大上的名字“alarm clock bookmarklet”。

以下是一些有用的`bookmarklet`的实例：

list all links

```
javascript:
if(frames.length>1) {
  alert('Sorry, frames detected.');
} else{
  var wnd=open('','lnkswnd','width=400,height=500,top=0,left=0,scrollbars,resizable');
  
  var lnks=document.links;
  with(wnd.document){

    var s='<html><base target=_blank>';

    for(var i=0;i<lnks.length;i++){
      s+='<li><a href='+lnks[i].href+'><span onClick=window.close()>'+lnks[i].text+'</span></a></li>';
    }
    
    s+='</html>';
    writeln(s);
    void(close());
  }
}
```

change text color

```
javascript:
if(frames.length>1)
  alert('Sorry, frames detected.');
else{
  void(document.body.style.color=prompt('Change to which text color?','yellow'))
}
```

search google
```
javascript:
void(q=prompt('Search Google using these keywords:',''));
if(q)
  void(open('http://www.google.com/search?q='+escape(q),'','resizable,location,toolbar,scrollbars,status'));
```

一个方便创建`bookrmarklet`的[工具站点](http://subsimple.com/bookmarklets/jsbuilder.htm)

## `bookmarklet`守则

1.  `Frames`

`bookmarklet`在当前的浏览器`window`中执行。如果当前的`window`有几个`document`，即有`frameset`时，通常`bookmarklet`将不能运行。

> 即跨iframe的浏览器安全限制。

2.  返回值

如果一个函数或者赋值操作有返回值而且没有`catch`到，`bookmarklet`会重定向到显示该返回值的页面。一种解决方案是通过使用`void(...)`来封装相关的语句拦截返回值。

三种需要`void`语句的情况如下：

* 有获得返回值时，例如：

  `void(x=3);`

* 当从`document`元素读取变量时，例如：

  `void(links=document.links);`

* 修改了一个`DOM`元素时，例如：

  `void(document.links[0].href='http://www.baidu.com');`

实际上，也可以使用`var`来`catch`返回值（但是通常`void`一般更有用）：

  `var x = 3;`

不需要对`alert('hello')`这样的语句使用`void`。

如果将代码放在了一个函数内也没必要使用`void`和`var`。

##  字符数

`bookmarklet`可以包含的字符数有限制，但是不同的浏览器甚至不同版本的相同浏览器该限制也不同：

```
浏览器      最大字符数
Netscape    > 2000
Firefox     > 2000
Opera       > 2000
IE 4        2084
IE 5        2084
IE 6        508
IE 6 sp2    488
IE 6 beta2  2084
```

破解这种限制的方法是从一个分离的`JavaScript`文档引用`JavaScript`代码。参考后面的`tips`。

## 使用单引号

使用单引号是一种非官方的规范，如果需要使用双引号，可以使用`unescape(%22)，具体内容可以参考后面的`tips`内容。

## 观察变量

原则，不能让`bookmarklet`的变量影响页面上的原有变量。一种技巧是使用比较奇怪的名字来避免冲突（不推荐）。也可以通过`(function() {...})()`这样的匿名自引用函数来避免冲突。详情见后面的`tips`。


# `tips`


### 原文
[http://subsimple.com/bookmarklets/tips.php#Encapsulation](http://subsimple.com/bookmarklets/tips.php#Encapsulation)
[http://subsimple.com/bookmarklets/links.php#Articles](http://subsimple.com/bookmarklets/links.php#Articles)
