作为程序员是离不开命令行和终端的。但是苦逼的windows用户一直没有一款顺手的终端软件，直到我们遇见[cmder](bliker.github.io/cmder/)。可是坑爹的是，这家伙竟然不支持中文。

如果为了便捷考虑，可以直接下载自带msysgit的cmder full版。在这个版本下直接输入`ls`命令会发现中文文件名是乱码的。解决方案其实很简单（了解以后很简单，不了解真让人抓狂），来自[v2ex](http://www.v2ex.com/t/92096)。具体描述如下：


修改cmder目录下的`config/aliases`文件，加入下面四行内容：

```
l=ls --show-control-chars
la=ls -aF --show-control-chars
ll=ls -alF --show-control-chars
ls=ls --show-control-chars -F
```

其原理就是让cmder里自带的ls命令能够正确显示出中文。

好了，这样我们就可以放心地在cmder下使用它强大的功能了。还有一个强大的功能值得推荐一下，那就是cmder与资源管理器的集成。

修改设置的地方如图所示:

![](http://gtms04.alicdn.com/tps/i4/T141eyFqXaXXcJu8bx-678-529.png)

只要点两下register就可以了。
需要注意的是，要打开这个设置窗口，需要在cmder命令行的**左下角**点击右键，然后选中`settings`。

集成后的效果如下所示：

![](http://gtms02.alicdn.com/tps/i2/T1WNmxFAJaXXajTdbP-1366-768.png)

update:如何让cmder启动时进入指定目录？

修改`vendor/init.bat`下的这一行：

`@set HOME=%USERPROFILE%`

改成如下格式：

`@cd /d "d:/wamp/www/"`


update:如何从源码编译生成cmder，enjoy最新的代码

首先，从github上clone下来所有代码：

`git clone https://github.com/bliker/cmder.git`

接着运行`ruby build.rb`。

这时可能会提示需要`msbuild.exe`。这时坑爹的windows需要安装.net framework开发包的原因。解决方案，参考[这里](http://stackoverflow.com/questions/2567018/installing-msbuild-4-0-without-visual-studio-2010)

到这个[地址]下载

--EOF--
