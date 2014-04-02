开发Chrome扩展入门
---

Chrome扩展开发可以让开发者为Chrome增加功能而无需深入了解原生代码。只需要使用WEB开发常用的核心技术：HTML、CSS以及JavaScript就能为Chrome创建新扩展。只要有过WEB页面开发经验，Chrome扩展开发也能很快上手。本文主要介绍如何创建一个简单的只需要点击就能获取小猫图片的扩展，。

我们将实现[`browser action`](http://developer.chrome.com/extensions/browserAction.html)UI元素，通过对`browser action`UI元素的实现，我们可以在Chrome的Omnibox上加入一个可点击的图片来方便访问。点击该图片将打开一个有可爱的小猫图片的弹出窗口，如下所示：

![](http://developer.chrome.com/static/images/gettingstarted-1.jpg)

下面建议在电脑上新建一个文件夹并且打开代码编辑器，让我们一起来开发一个Chrome扩展吧！

### 声明

我们要做的第一件事是创建一个`manifest`（声明）文件，命名为`manifest.json`。这个文件包含了扩展名、扩展描述、扩展版本号等属性信息。`manifest.json`文件也声明了扩展所完成的任务、需要的权限等信息。

为了显示小猫图片，需要在Chrome上创建一个浏览器图标，以及一个能够自由获取小猫图片的在线站点来源。声明文件内容类似如下所示：

```
{
  "manifest_version": 2,

  "name": "One-click Kittens",
  "description": "This extension demonstrates a browser action with kittens.",
  "version": "1.0",

  "permissions": [
    "https://secure.flickr.com/"
  ],
  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  }
}
```

将上面的内容存储到`manifest.json`文件。或者从[本链接](http://developer.chrome.com/extensions/examples/tutorials/getstarted/manifest.json)直接[下载](http://developer.chrome.com/extensions/examples/tutorials/getstarted/manifest.json)。


### 英文原文
1.  [http://developer.chrome.com/extensions/getstarted](http://developer.chrome.com/extensions/getstarted)
2.  【d:\wamp\www\test\chrome-extension\】
