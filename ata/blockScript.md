使用插件或者扩展禁止单个`JavaScript`文件加载
---

使用[`webRequest` API](https://developer.chrome.com/extensions/webRequest)。

创建一个`Chrome`插件，按照下列步骤：

1.  创建一个新的目录；
2.  创建下面的文件；
3.  通过`chrome://extensions/`链接并选择`Developer mode`来加载未打包的插件。

### `background.ja`

```javascript
chrome.webRequest.onBeforeRequest.addListener(function() {
      return {cancel: true};
  }, {
    urls: ["<all_urls>"], // change this to a more specific pattern
    types: ["script"]
  },
  ["blocking"]
);
```

## 参考资料
1.  [stackoverflow](http://stackoverflow.com/questions/9698059/disable-single-javascript-file-with-addon-or-extension)
2.  [https://developer.chrome.com/extensions/webRequest](https://developer.chrome.com/extensions/webRequest)
3.  [https://developer.chrome.com/extensions/match_patterns.html](https://developer.chrome.com/extensions/match_patterns.html)
4.  [https://developer.chrome.com/extensions/webRequest.html#event-onBeforeRequest](https://developer.chrome.com/extensions/webRequest.html#event-onBeforeRequest)
