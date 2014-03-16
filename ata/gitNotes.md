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

可以通过加上`-m`标志不打开编辑器进行提交。例如：

```
$ git commit -m "Story 182: Fix benchmarks for speed"
[master]: created 463dc4f: "Fix benchmarks for speed"
2 files changed, 3 insertions(+), 0 deletions(-)
create mode 100644 README
```

上面的信息包括`[master]`，提交到的分支（为master分支），本次提交的SHA-1校验和`463dc4f`，以及修改、增删等数据。

记住commit只提交在staging area里的内容，任何没有stage的内容仍然保持修改后的状态而没有提交。每次提交都会创建一个快照。

**跳过Staging Area**

`git commit`命令的选项`-a`可以直接跳过`git add`步骤，自动将当前所有在git库中有记录的文件添加到staging area。例如：

```
$ git status
# On branch master
#
# Changed but not updated:
#
# modified: benchmarks.rb
#
$ git commit -a -m ’added new benchmarks’
[master 83e38c7] added new benchmarks
1 files changed, 5 insertions(+), 0 deletions(-)
```

**删除文件**

要从git中删除一个文件，需要将它从记录文件（更确切的说是从staging area）中移除并且提交。相关命令为`git rm`。

如果没有用`git rm`命令而是直接删除git中的文件，文件会在`git status`下处于`changed but not updated`状态。例如：

```
$ rm grit.gemspec
$ git status
# On branch master
#
# Changed but not updated:
# (use "git add/rm <file>..." to update what will be committed)
#
# deleted: grit.gemspec
#
```

如果使用`git rm`命令删除文件，会如下所示：

```
$ git rm grit.gemspec
rm ’grit.gemspec’
$ git status
# On branch master
#
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# deleted: grit.gemspec
```

如果修改过文件并且将它添加到了目录下，必须使用`-f`选项来强制删除。这是为了避免意外删除在快照中没有记录、不能从git中删除的数据。

如果希望将文件保存在工作目录（working tree）而不是staging area（保存区域）中。也就是希望将文件保存在硬盘上，但是不再用git进行记录。这在忘记将某些文件添加到`.gitignore`文件里而不小心添加到git库中时特别有用。这样的情况下，可以使用`--cached`选项，例如：

`git rm --cached readme.txt`

`git rm`命令接受的参数可以使文件、目录或者匹配文件的正则表达式。例如可以这样：

`git rm log/\*.log`

注意`*`前必须使用反斜杠`\`。因为Git除了使用shell文件名扩展，还有自己的文件名扩展。上面的命令会删除`log/`目录下所有扩展名为`.log`的文件。或者，可以使用：`git rm \*~`命令来删除所有以`.`号结尾的文件。

**移动文件**

git的设计类似于linux系统，命令也相似，例如删除使用的是`git rm`，同样，移动和修改文件名也使用的是`git mv`命令。例如：

```
$ git mv README.txt README
$ git status
# On branch master
# Your branch is ahead of ’origin/master’ by 1 commit.
#
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# renamed: README.txt -> README
```

上面的命令等同于:

```
$ mv README.txt README
$ git rm README.txt
$ git add README
```

**查看提交历史**

使用`git log`命令

示例：

1.  `git clone git://github.com/schacon/simplegit-progit.git`
2. 使用如下命令： 
    ```
    $ git log
    commit ca82a6dff817ec66f44342007202690a93763949
    Author: Scott Chacon <schacon@gee-mail.com>
    Date: Mon Mar 17 21:52:11 2008 -0700
    changed the verison number
    commit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7
    Author: Scott Chacon <schacon@gee-mail.com>
    Date: Sat Mar 15 16:40:33 2008 -0700
    removed unnecessary test code
    commit a11bef06a3f659402fe7563abf99ad00de2209e6
    Author: Scott Chacon <schacon@gee-mail.com>
    Date: Sat Mar 15 10:31:28 2008 -0700
    first commit
    ```

未加任何选项参数的情况下，`git log`按照时间倒序排列（时间最近的提交最先）。

`git log`支持大量参数来参考各种log内容。下面介绍几个常用的：

`-p`会展示每次提交的修改。`-p -2`会仅显示最近两条记录。

`--stat`选项会显示每次提交的状态概述。例如：

```
$ git log --stat
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700
changed the verison number
Rakefile | 2 +-
1 files changed, 1 insertions(+), 1 deletions(-)
commit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 16:40:33 2008 -0700
removed unnecessary test code
lib/simplegit.rb | 5 -----
1 files changed, 0 insertions(+), 5 deletions(-)
commit a11bef06a3f659402fe7563abf99ad00de2209e6
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 10:31:28 2008 -0700
first commit
README | 6 ++++++
Rakefile | 23 +++++++++++++++++++++++
lib/simplegit.rb | 25 +++++++++++++++++++++++++
3 files changed, 54 insertions(+), 0 deletions(-)
```

`--pretty`选项可以修改log输出的格式。例如：

```
$ git log --pretty=oneline
ca82a6dff817ec66f44342007202690a93763949 changed the verison number
085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7 removed unnecessary test code
a11bef06a3f659402fe7563abf99ad00de2209e6 first commit
```

`format`可以定制log输出格式。如果希望输出供机器解析使用的日志，这个选项非常有用。例如：

```
$ git log --pretty=format:"%h - %an, %ar : %s"
ca82a6d - Scott Chacon, 11 months ago : changed the verison number
085bb3b - Scott Chacon, 11 months ago : removed unnecessary test code
a11bef0 - Scott Chacon, 11 months ago : first commit
```

注意`author`和`commiter`。author是文件的创建者，commiter是最近一次修改者。例如，假设你为某个项目提供了patch，该项目的核心成员应用了这个patch，则两个人都会被署名--你是author，该该项的核心成员是commiter。

format支持的格式如下所示：

```
Option    Description of Output
%H        Commit hash
%h        Abbreviated commit hash
%T        Tree hash
%t        Abbreviated tree hash
%P        Parent hashes
%p        Abbreviated parent hashes
%a        Author name
%a        Author e-mail
%a        Author date (format respects the date= option)
%a        Author date, relative
%c        Committer name
%c        Committer email
%c        Committer date
%c        Committer date, relative
%s        Subject
```
`oneline`和`format`选项对于`--graph`选项特别有用。该选项会添加一个现实分支和合并历史的图标。例如：

```
$ git log --pretty=format:"%h %s" --graph
* 2d3acf9 ignore errors from SIGCHLD on trap
* 5e3ee11 Merge branch ’master’ of git://github.com/dustin/grit
|\
| * 420eac9 Added a method for getting the current branch.
* | 30e367c timeout code and tests
* | 5a09431 add timeout protection to grit
* | e1193f8 support for heads with slashes in them
|/
* d6016bc require time for xmlschema
* 11d191e Merge branch ’defunkt’ into local
```

### 参考资料
1.  [windows下git core.editor配置--有墙](http://mkadlec99.blogspot.com/2011/07/setting-up-correct-git-config.html)
