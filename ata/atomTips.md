初次使用`Github Atom`的5条建议
---

### 安装`package`

`Atom`是使用`JavaScript`编写的，因此任何了解`JavaScript`的人都可以构建一个符合自己确切需求的`package`来扩展`Atom`的功能。例如：解析HTML，Pythong调试器等等。这样，既能保持`Atom`安装时的轻量，也能保证其强大的功能。

按下`Command`(Windows下是`Ctr`键)和`,`键打开`Atom`的设置界面，如下图所示：

![](http://readwrite.com/files/Screen%20Shot%202014-05-20%20at%209.41.58%20AM.png)

要添加一个新的`package`，只要点击左侧的`packages`就可以搜索特定的
`package`并安装所需的功能了。

### `package`的使用

已经安装的`package`插件在`settings`窗口左侧下方可以看到，如下图所示：

![](http://readwrite.com/files/Screen%20Shot%202014-05-20%20at%209.50.03%20AM.png)

图中展示了`Color Picker`这个插件，可以为图形界面增加选择`hex`(16进制)颜色值选择的功能。而且可以看到这个插件的快捷键为`command+shift+c`。

可以通过打开一个正在编辑的`css`文件，然后使用上面提到的快捷键
`command+shift+c`打开`Color Picker`，会看到如下所示：

![](http://readwrite.com/files/Screen%20Shot%202014-05-20%20at%209.51.31%20AM.png)

这样就可以利用`Color Picker`来可视化地选择想要的颜色值了。

### 快捷键的记忆

同时按下`command`键和`.`（英文句号）两个键会激活`Key Binding Resolver`弹层，只要这个弹出层没有消失，用户按下任何按钮(包括组合键)，这个窗口也会提示相应的快捷方式和具体作用。要关闭这个快捷方式提醒窗口，再次按`command`和`.`（注意，是一起按，这篇文章提到的都是组合快捷键，都需要一起按下），就可以关闭该窗口了。

也可以通过`command+shift+p`这个组合键来查看当前`package`配置下`Atom`可以完成的事情。例如，如果要查看怎样`split window panes`，可以先按下`command+shift+p`的组合键，在输入`split`来查找`split`的解决方案。可以看到解决方案是先按`command+k`，再按向上的箭头键。

![](http://readwrite.com/files/Screen%20Shot%202014-05-20%20at%2010.20.02%20AM.png)

### 编码提示

默认情况下，`Atom`的提示隐藏在编辑器窗口中，只有关闭所有打开的窗口才会可见。这被成为[`subtle hints`](https://github.com/atom/background-tips)

但是，如果想查看显示提示的话，可以通过激活开发者工具（组合键`command+option+i`）实现。

>  这个命令和`Windows` `OS X`系统环境下`Chrome Developer Tools`的快捷键是一样的。记住：`Atom`是使用`JavaScript`写的！这个工具和`Chromium`用的是同一个工具，也就是在`Chrome`浏览器中用来调试WEB应用的同一个开发者工具。

如果需要更加具体的编码帮助，可以安装被称为`linters`或者`spell-check for code`的`package`实现。这个`package`可以在编码时标注出可能的错误(`error`)和问题(`issue`)。

推荐使用[`atom-lin`](https://atom.io/packages/atom-lint)，作者为
[`yujinakayama`](https://github.com/yujinakayama)。

>  tip:安装`package`的时候会发现`Atom`的下载提示有点糟糕，点了以后看不到进度，其实可以通过`command+option+i`打开开发者工具，然后切换到`network`来查看下载进度。
> 看到出错信息我们可以发现是因为`amazonaws`连接失败，显然是被X了，可以通过翻墙来解决。实在不行就直接访问[https://atom.io/packages](https://atom.io/packages)然后手动下载手动安装吧。
> 安装命令很简单，例如安装`vim-mode`为`apm install vim-mode`

### `Markdown`预览

`Atom`拥有支持[`GitHub Flavored Markdown`](https://help.github.com/articles/github-flavored-markdown)语法的预览功能。在`Atom`中，按下`command+shift+p`搜索`markdown`查找命令，或者直接按下`control+shift+m`来激活`markdown`预览窗口。可以在输入时实时看到`markdown`预览。如下所示：

![](http://readwrite.com/files/Screen%20Shot%202014-05-20%20at%2010.30.26%20AM.png)

### 参考资料
[英文原文:GitHub Atom: 5 Tips For Getting Started--A beginner's tutorial to the text editor for beginners](http://readwrite.com/2014/05/20/github-atom-5-tips-getting-started-tutorial-corey-johnson)
[atom doc](https://atom.io/docs/latest/)

### 后序

`Atom`是基于`node.js`完成的图形化编辑器，只要了解`JavaScript`我们也可以为它定制我们想要的功能，还可以熟悉`node.js`的使用。冲着一点，也值得试一试这款编辑器。当然，不要因此换上选择恐惧症，编辑器这种东西，用着顺手就好了。有时间再折腾下。
