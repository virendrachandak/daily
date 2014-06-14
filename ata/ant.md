`apache ant`简介
---

# 介绍

`Apache Ant`是一个基于`Java`的构建工具，类似于`make`，但是没有`make`那么多皱纹（即：要新一些）。

**为什么？**

为什么已经有了`make`，`gnumake`，`nmake`，`jam`等其他构建工具还需要`ant`呢？因为这些工具都有限制，`Ant`最初的作者无法忍受跨平台开发软件受到这些工具的限制。`make`一类的工具本质上都是基于`shell`的：他们会对一些列依赖进行评估，然后再和在`shell`中执行命令一样执行命令。这意味着可以通过使用或者为正在使用的系统编写程序来轻松地扩展这些工具；然而，这也意味着收到了操作系统的限制，或者至少受到了操作系统类型的限制，例如`Unix`。

`makefiles`本质上也很`evil`。所有用过`makefile`的人都会遇到一个可怕的`tab`问题：“我的命令没有执行，是不是因为在`tab`前多加了一个空格？”`ant`的作者这样说过很多次。`Jam`这样的工具尽力解决这些问题，但是需要用户去记住另外一种用法格式。

`Ant`不同。`Ant`使用`Java`类进行扩展，而不是基于`shell`的命令模型。配置文件不是编写`shell`命令，而是基于`XML`调用执行不同任务的任务树。每个任务都有一个实现了特定任务接口的对象来运行。

需要承认的是，这样的做法不如通过`shell`执行命令那么直观，例如`find . -name foo -exec rm {}`，但是用户可以随时随地跨平台工作。而且，如果需要执行`shell`命令的话，`Ant`有一个`<exec>`任务可以允许基于当前执行任务的系统来执行不同的命令。

# 安装

## 获取`Apache Ant`

**简而言之**

要快速设置和执行二进制版本的`Ant`，遵循以下步骤：

1.  确认已经安装了`Java`环境，详情可以参考[系统要求] 。
2.  下载`Ant`。详情参考[`二进制版本`] 。
3.  解压下载的文件到一个目录。
4.  设置`Java`环境的`JAVA_HOME`环境变量。设置`ANT_HOME`为`Ant`解压的目录。将`${ANT_HOME}/bin`（Unix下）和`%ANT_HOME%/bin`（windows下）添加到`PATH`环境变量。详情参考[设置]。
5.  可以选择从`ANT_HOME`目录运行`ant -f fetch.xml -Ddest=system`来获取大部分`Ant`任务需要的依赖库。如果不这样做，许多依赖的`Ant`任务将不能使用。参考[可选任务]了解详情以及`-Ddest`参数的其他选项。
6.  可选，添加其他需要的`Antlibs`。列表参考[`Ant`库]。

注意上面的链接给出了每一步需要的详情。或者可以直接阅读本文档的接下来的内容。

使用`Ant`源码的主要步骤（在使用二进制版时不需要）：

1.  获取源码。参考[源码版本]了解详情。
2.  `build Ant`，参考[构建`Ant`]了解详情。

完整的内容，请继续阅读。

**二进制版**

最新的稳定版`Ant`可以从[http://ant.apache.org](http://ant.apache.org)获取。

`Ant`的二进制版本有3种不同的压缩格式：

1.  `.zip`--建议`Window`使用，也可以用于其他平台。许多程序都支持，有些操作系统原生支持这种格式。
2.  `.tar.gz`--使用`tar`合并文件，使用`gzip`压缩和解压。
3.  `.tar.bz2`--使用`tart`程序来合并，`bzip2`压缩和解压。

选择最适合系统的格式。

**作为RPM包的二进制版**

查看下面的`jpackage`小节。

**和`IDE`绑定**

所有主流`IDE`都带有`Ant`，例如`Eclipse`，`NetBeans`以及`IntelliJ IDEA`。通过这种方式安装的`Ant`通常为最新发行版。

**开源`Java`运行时**

`Ant`团队强烈支持用户在`OpenJDK`和其他开源`Java`运行时上运行`Ant`。

## 安装`Ant`

二进制版`Ant`有一些目录结构组成：

```
ant
  +---  README, LICENSE, fetch.xml, 其他文本文件//基本信息
  +---  bin //包含了启动脚本
  |
  +---  lib //包含了`Ant jars`和一些必须的依赖
  |
  +---  docs  //包含了文档
  |       |
  |       +---  images  //html文档的logo
  |       |
  |       +---  mannual //ant文档（必读;-）
  |
  +---  etc //包含xsl:
            //  -从不同任务的xml输出创建增强版的报告。
            //  -从build文件迁移并且去除'deprecated'警告等等。
            //  更多。
```

## 设置

除非使用`jpackage.org`的`RPM`版安装，需要做一些设置才能使用`ant`：

* 添加`bin`目录到`PATH`。
* 将`ANT_HOME`环境变量设置成安装`Ant`的目录。在一些操作系统中，`Ant`的启动脚本可以才出`ANT_HOME`（Unix和Windows NT/2000系统），但是最好不要依赖这种“猜”的行为。
* 可选：设置`JAVA_HOME`环境变量（参考下面的[高级]一节）。`JAVA_HOME`环境变量应该为`JDK`的安装目录。

> 注意：不要将`Ant`的`ant.jar`文件添加到`JDK/JRE`的`lib/ext`目录。

# `Linux/Unix`（bash）设置

假设我们把解压后的二进制文件复制到了`/usr/local/ant`目录，通过下面的命令来设置环境：

```
export ANT_HOME=/usr/local/ant
export PATH=${PATH}:$({ANT_HOME}/bin
```

> 注意：`JAVA_HOME`在`MAC OS X`下使用安装包配置后会自动设置。如果没有可以通过执行命令`export JAVA_HOME=/xxxx`来设置。

设置好以后，我们只需要输入`ant`，如果有下面的输出内容，就说明`ant`已经配置好了。

```
BuildFile: build.xml does not exist!
Build failed
```

还可以通过`anti -version`来查看配置好的`ant`版本。

# 原文
[http://ant.apache.org/manual/index.html](http://ant.apache.org/manual/index.html)
