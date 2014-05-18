OS X系统启动程序的管理
---
> 是否已经厌倦在启动Mac时自动加载一些应用？不希望运行大量背景应用导致系统速度变慢？可以将这些启动项目删除已禁止开机启动并且降低系统性能。这样做很轻松，只需要在系统配置中做一些简单的调整。

### 在系统配置中删除登陆项目(`login items`)

移除启动项目最简单的办法是通过`System Preferences > Users & Groups`，进入下图的配置窗口，点击你的用户名，然后点击`Login Items`标签页。

![](http://www.maclife.com/files/u12635/1_startup_items.png)

在打开的窗口中可以看到所有选择启动时打开的应用程序。要删除某个项目，只需要在列表中选中它，然后点击`减号(-)`按钮。也可以通过选中勾选框来让选中的应用在加载后隐藏。

> 这里面有个`itune helper`，除非你希望在连接`ipod`和`iphone`时自动打开`itune`，否则可以放心大胆地删掉它。

### 手动将启动项目(`startup items`)从所有账户删除

如果某个启动项目自动为所有账户加载，可以通过以下步骤来手动删除：

![](http://www.maclife.com/files/u12635/2_startup_items.png)

打开一个新的`Finder`窗口并且按下`Command + Shift + G`，接着输入一下目录路径地址：

`/Library/StartupItems`

将这里面的文件移动到其他地址（例如，桌面），然后重启Mac来应用修改。如果在删除某个启动项后有问题，可以将这些被移动的文件恢复到这个目录就可以了。

### 启动`daemons`和`agents`

从OS X 10.4 Tiger起，Apple允许开发者通过`[启动daemons和agents](https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)`来自动启动应用，这种机制是通过`[launched process](http://en.wikipedia.org/wiki/Launchd)`控制的。这个方法比登陆项目（`login items`）和启动项目(`startup items`)提供了更大的灵活性，但是对大部分用户来说属于"隐藏功能"。

#### 在Unix的帘幕后：

`launchd`不会直接打开应用(`apps`)，而会加载特定格式`.plist`文档，这种格式的文档指定了在什么环境(`circumstances`)下启动什么应用。有时候这些启动项目会在后台常驻运行，有时候会按照计划间隔运行，有时候会按需运行--例如，在响应文件中某个事件的变化时启动--然后会自动退出。

> 这个高级的功能估计一般用户是不会用到的。

`launchd`使用的`.plit`文件可以使用以下5个文件夹，这些文件夹决定了应用的加载时机以及权限(`privileges`)。

*   `/Library/LaunchDaemons/`和`/System/Library/LaunchDaemons`在Mac启动时加载，并以`root`用户身份运行。
*   `/Library/LaunchAgents`和`/System/Library/LaunchAgents/`在用户登陆时加载，以`root`身份运行。
*   `Users/用户名/Library/LaunchAgents`仅在特定用户登陆时加载，并且以该用户身份运行。

#### 不要动！

上述五个文件夹中位于`/System`文件夹下的两个`/System/Library/LaunchDaemons`和`/System/Library/LaunchAgents/`包含了OS X系统组件，最好或者切记删除或者修改这两个文件的内容--这两个文件夹对于Mac的正常运行**必不可少**！

#### 按需修改

其他文件夹可以根据需要修改。例如，可以修改应用运行的频率。但是在这样做之前，应该了解一些事情。

Mac启动或者用户登陆时，相关文件夹(即与系统注册了的)里的内容会被加载，除非这些内容被标记成了`Disabled`(禁用)。因此，即使用户将这些文件夹的内容删除（移到了`Trash`），他们仍然会执行，也就是需要重启才会生效。要查看Mac当前加载的启动项，打开`Terminal`(在`/Applications/Utilites`下可以找到)，然后输入`launchctl list`并回车。

如果希望不重启就停止某个启动项目运行，打开`Terminal`输出`launchctl unload`加上一个空格和这个启动项目的完整路径（一种省力的方法就是直接把这个项目拖到`Terminal`的窗口中）。例如，下面的代码：

`launchctl unload ~/Library/LaunchAgents/com.apple.FolderActions.enabled.plist`

这段代码会停止加载启用`AppleScript folder actions`的`agent`。如果需要恢复的话，只需要将上面代码中的`unload`改成`load`并回车执行就可以了。

因为大部分启动项都是按计划(`schedule`)运行或者按需运行，而且都可能被禁止，会出现这样的实际情况：在上面提到的5个文件夹中有的内容对应的管理进程不一定会正在运行。要查看当前运行的应用，打开`Activity Monitor`--但是请记住，在`Activity Monitor`中出现的指定进程的名字不一定和`.plist`文件的名字相同。

#### 启动时自动重新打开应用

注意：Mac OS X 10.7 Lion及后续版本会默认重启关机时打开的应用。只要在关机和重启时注意一下下面这个对话框就好了。

![](http://images.techhive.com/images/article/2013/08/resume-100052042-medium.png)

#### 进程

OS X还有如下几种进程：

*  **kernel extension(内核扩展)**：或者称为`kexts`，在
`/System/Library/Extensions`文件夹下，在启动时加载。提供了声音处理以及外设支持等低优先级功能。大部分`kexts`都是OS X的一部分。删除第三放`kexts`最安全的方法是运行开发者提供的卸载程序。

*   **`cron`任务**：`Crob`是OS X内置的Unix定时任务计划工具。不使用`Terminal`查看和编辑`cron任务`的方法是下载`Sven A. Schmidt`提供的免费工具`[Cronnix](https://code.google.com/p/cronnix/)`。

>  了解关于`Terminal`下`cron`的使用，可以参考[这个链接](http://www.cyberciti.biz/faq/linux-show-what-cron-jobs-are-setup/)和[这个链接](http://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/)。

*   **login script（登陆脚本）**：[login scripts](https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CustomLogin.html)，和启动项目(`startup items`)一样在较旧版本的OS X系统上使用，现在已经不推荐使用。

### 参考资料

[how_remove_startup_items_os_x](http://www.maclife.com/article/howtos/how_remove_startup_items_os_x)
[take-control-of-startup-and-login-items](http://www.macworld.com/article/2047747/take-control-of-startup-and-login-items.html)
