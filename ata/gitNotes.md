git学习笔记
---
### 序

本文是从完全不了解git到一步步深入理解git的学习笔记。

只要用过`git clone`命令，就算入门了！JUST Start from scratch！

### 起步

**Git基础**

Git和其他VCS的主要不同在于git对数据的处理。其他VCS都根据文件的改变来存储信息。文件随时间的状态变化如下图所示：

![](http://gtms01.alicdn.com/tps/i1/T1QEWDFDBbXXcFZffF-580-288.png)

Git将数据当成快照（snapshot）来看待。再git里每次提交或者保存修改都会保存一次所有文件在当时的快照，并且存储一份到该快照的引用。如果文件没有修改的话，Git就不会存储文件，而只是链接到前一份已经存储的相同文件。如下图所示：

![](http://gtms03.alicdn.com/tps/i3/T1wgWGFwXcXXaI6PMk-634-302.png)

**Git可以本地操作**

Git大部分操作只需要本地文件和资源，而不需要网络上其他电脑的信息。例如查看工程的历史，比较项目当前版本和历史版本之间的文件差异，都不需要连接网络。

**Git是完整的**

Git是完整的，Git在所有存储操作前都会进行校验，所有的存储都有一个有该校验和指向的引用。因此，git知道任何对文件和目录的修改。

Git使用的校验算法为SHA-1hash（哈希）算法，即一个由十六进制字符组成的40位字符串。该值由Git根据文件内容或者目录结构计算得出。

Git充分使用了这些SHA-1 hash值。例如，git不是按文件名而是按照内容的可寻址Git数据库hash值来存储文件。

**Git一般只增加数据**

Git的几乎所有操作都只会在Git数据库中增加数据。因此，Git很难出现丢失数据或者文件和目录状态混乱的情况。

**三种状态**

和自然界常见的“固态、液态、气态”类似，git资源库里的文件有三种主要状态：
commited(已提交)、modified(有修改)、staged(已存储)。具体含义为：

* commited--数据已经安全地保存到了本地数据库。
* modified--文件发生了修改但是还未提交到数据库。
* staged--标记了当前版本修改过并且将要提交到commit snapshot（提交快照）的内容。

因此，Git库也主要分为三大部分：Git目录，工作目录（working directory）以及staging area。


![](http://gtms02.alicdn.com/tps/i2/T1ryKFFxJeXXXFDrcC-540-482.png)

Git目录存储了项目的元数据（metadata）和对象数据库（object database）。这是Git最重要的部分。

工作目录是项目的一个版本。这些文件是从git的压缩数据库中pull出来供开发者使用和修改的。

staging area（存储区域）是一个简单的文件，通常包含在Git目录中，存储了下次提交的信息。有时候这些信息也被称为index(索引)，但是标准叫法是“staging area”。

基本的Git工作流为：

1.  在工作目录中修改文件；
2.  存储文件，将这些文件的快照添加到staging area；
3.  提交，将staging area中的文件和快照永久存储到Git目录。

**git安装**

windows下建议安装cygwin和msysgit，如果需要gui客户端，可以考虑sourcetree和
tortoisegit。

**初始设置**

使用`git config`命令来配置git。git配置信息主要有3个存放位置：

* `/etc/gitconfig`文件。包含系统所有用户及所有库的设置。在`git config`命令后加上`--system`选项可以配置这块的内容。
* `/.gitconfig`文件。用户的指定文件。可以通过使用`--global`选项配置Git读写该文件。
* git目录中的配置文件`.git/config`，用于当前使用的git库的配置。以上三级会分别覆盖掉前一级的配置，例如`.git/config`配置会覆盖`/etc/gitconfig`的配置。

windows系统中，git会在`$HOME`目录下查找`.gitconfig`文件。也会寻找相对于msys根目录下的`etc/gitconfig`配置文件。

> 在windows系统中需要注意对路径进行转义，可以参考下面我的配置文件

```
[user]
	name = 云翮
	email = xiaozheng.xz@alibaba-inc.com
[merge]
	tool = BCompare
[mergetool "BCompare"]
	path = \"d:/Program Files (x86)/Beyond Compare 3/BCompare.exe\"
[diff]
	guitool = BCompare
[difftool "kdiff3"]
	path = \"d:/Program Files (x86)/Beyond Compare 3/BCompare.exe\"
[core]
	editor = \"d:/Program Files (x86)/Vim/vim74/gvim.exe\"
	autocrlf = true
[credential]
	helper = !\\\"C:/Program Files (x86)/GitExtensions/GitCredentialWinStore/git-credential-winstore.exe\\\"
```

**用户身份**

安装好git后要做的第一件事情是设置用户名和电子邮箱地址。这非常重要，因为每次git commit都会使用这些信息，而且会永恒不变的存在于commit信息中。

```
$git config --global user.name "云翮"
$git config --global user.email xiaozheng.xz@alibaba-inc.com
```

如果希望为某个项目配置不同的用户名和邮箱地址，可以通过在项目文件夹中运行`git config`不加`--global`选项来完成。

**编辑器配置**

`git config --global core.editor vim`

**比较工具配置**

`git config --global merge.tool bcompare`

> beyondcompare，可以通过系统路径将它加到`path`中。

**检查设置**

`git config --list`

**密码缓存**

如果不希望每次和远程服务器交互都需要输入用户名和密码，可以使用下面的命令。

`git config --global credential.helper cache`

> 需要git1.7.10即以上才支持该设置。

**获取帮助**

`git help <verb>`或者`git <verb> --help`，或者`man git-<verb>`

### Git基础

**在已有目录中初始化一个库。**

使用命令`git init`，接着使用以下命令依次添加文件，提交。

```
$ git add *.c
$ git add README
$ git commit m 'initial project version'
```

**记录库的变化**
Git库中的文件可以有以下几种状态：

* untracked，未记录
* unmodified，未修改
* modified，已修改
* staged，已存储

**检查Git库状态**

使用命令`git status`

**记录新文件**

`git add xx`

**忽略文件**

`touch .gitignore`

`.gitignore`文件内容主要有：

* 使用`#`开头的行或者空白行会被忽略；
* 标准glob模式；
* 可以在某市后加上斜杠`/`指定文件夹；
* 可以使用`!`来取某个模式的反模式。

```
# a comment this is ignored
*.a # no .a files
!lib.a # but do track lib.a, even though you’re ignoring .a files above
/TODO # only ignore the root TODO file, not subdir/TODO
build/ # ignore all files in the build/ directory
doc/*.txt # ignore doc/notes.txt, but not doc/server/arch.txt
```

查看已经修改但是还未staged的文件，使用`git diff`命令

`git diff`命令会比较当前工作目录（working directory）和staging area（存储区域）的文件差别。

如果希望查看已经staged到下次提交的文件，可以使用命令`git diff --cached`（在git1.6及更新的版本中，也可以使用`git diff --staged`命令）。

值得注意的一点事，`git diff`命令不会展示从上次提交以来的所有修改，而只是展示尚未staged（存储）的修改。如果已经**staged**所有的修改，`git diff`命令将没有输出。

> 简单理解，就是修改文件后如果用`git add`命令将修改添加到staging area，用`git diff`命令就看不到输出，而用`git diff --cached`或者`git diff --staged`可以看到修改的具体内容。反过来，如果没有修改后没有运行`git add`命令将修改的内容添加到staging area，那`git diff`将可以看到修改的内容。

#### 提交修改(Commit changes)

提交需要记住的一点事，从上次提交起所做的所有修改，凡是没有使用`git add`添加到staging area的内容（包括新建的文件或者所做的修改）都不会被提交。

运行`git commit`命令提交，在运行该命令时会调用系统配置的默认编辑器，如果遇到特殊字符需要转义，转义方法可参考上文`git config`部分的内容。

如果希望在提交时保存更加详细的提交信息，可以在`git commit`命令后加上`-v`选项。

### 参考资料
1.  [windows下git core.editor配置--有墙](http://mkadlec99.blogspot.com/2011/07/setting-up-correct-git-config.html)