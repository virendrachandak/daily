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

**限制日志输出**

`-n`其中`n`指定了输出的日志数。还可以根据时间来输出日志，使用`--since`和`--until`选项。例如，查看最近两周的提交列表：

`git log --since=2.weeks`

限制日志输出的选项如下表所示：

```
Option            Description
-p                Show the patch introduced with each commit.
--stat            Show statistics for files modified in each commit.
--shortstat       Display only the changed/insertions/deletions line from the –stat command.
--name-only       Show the list of files modified after the commit information
--name-status     Show the list of files affected with added/modified/deleted information as well.
--abbrev-commit   Show only the first few characters of the SHA-1 checksum
instead of all 40.
--relative-date   Display the date in a relative format (for example, “2 weeks ago”) instead of using the full date format.
--graph           Display an ASCII graph of the branch and merge history
beside the log output.
--pretty          Show commits in an alternate format. Options include oneline, short, full, fuller, and format (where you specify your own format).
```

`--author`选项可以搜索指定的author，`--grep`选项可以搜索commit信息中的关键词。

> 注意，如果同时指定`--author`和`--grep`的话，需要在命令后面加上`--all-match`选项。

还可以在`git log`命令后面加上一个文件路径作为过滤器。如果指定文件夹或者文件名，可以限制只输出在这些文件里引入的提交。通常这个选项需要放在最后面，而且需要加上`--`来与其他选项分开。

常用的引用选项如下所示：

```
Option                Description
-(n)                  Show only the last n commits
--since, --after      Limit the commits to those made after the specified date.
--until, --before     Limit the commits to those made before the specified date.
--author              Only show commits in which the author entry matches the specified string.
--committer           Only show commits in which the committer entry matches
the specified string.
```

例如，如果想查看Junio Hamano在2008年10月提交，而且没有合并的代码，可以使用这样的命令：

```
$ git log --pretty="%h:%s" --author=gitster --since="2008-10-01" \
--before="2008-11-01" --no-merges -- t/
5610e3b - Fix testcase failure when extended attribute
acd3b9e - Enhance hold_lock_file_for_{update,append}()
f563754 - demonstrate breakage of detached checkout wi
d1a43f2 - reset --hard/read-tree --reset -u: remove un
51a94af - Fix "checkout --track -b newbranch" on detac
b0ad11e - pull: allow "git pull origin $something:$cur
```

**图形化查看工具**

推荐使用msysgit自带的gitk或者使用单独的应用sourcetree。

**修改最近一次提交**

`git commit --amend`可以覆盖掉上次的提交信息。即：

```
$ git commit -m ’initial commit’
$ git add forgotten_file
$ git commit --amend
```

上面的三条命令只会输出一条commit记录。

**unstage已经放在staging area的文件**

例如，不小心使用`git add *`将所有文件加入了staging area，希望将其中某些文件移出来。可以使用`git reset`命令完成以上任务。

例如：

```
$ git add .
$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified: README.txt
# modified: benchmarks.rb
```

如果希望将benchmarks.rb从staging area中移出来(即不在本次修改中提交)，可以使用如下命令：

```
$ git reset HEAD benchmarks.rb
benchmarks.rb: locally modified
$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified: README.txt
#
# Changed but not updated:
# (use "git add <file>..." to update what will be committed)
# (use "git checkout -- <file>..." to discard changes in working directory)
#
# modified: benchmarks.rb
```

**撤销对某个文件的修改**

如果希望将某个文件恢复到上次提交时的状态（或者刚开始clone下来的状态）。可以使用`git checkout`命令。

修改后的文件使用`git status`查看如下所示：


```
# Changed but not updated:
# (use "git add <file>..." to update what will be committed)
# (use "git checkout -- <file>..." to discard changes in working directory)
#
# modified: benchmarks.rb
```

如果希望丢弃掉所做的修改，可以使用下面的命令：

```
$ git checkout -- benchmarks.rb
$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified: README.txt
```

该命令实际上复制前一次提交的文件内容覆盖掉当前正在修改的文件内容。因此，除非非常确认，请谨慎操作。记住，Git几乎可以恢复所有操作，例如使用`--amend`覆盖掉的commit信息，分支上所做的删除。但是，如果文件没有提交过的话将不能恢复。

**remote操作**

如何管理remote库（远程库）？远程库即放在网络上的git库。远程库管理包括pull和push数据，添加或删除remote等操作。

**查看当前remote**

使用`git remote`命令。查看较详细的信息，加上`-v`选项。即`git remote -v`。

**添加remote地址**

命令格式为：

`git remote add [shortname] [url]`

**fetch和pull remote库**

命令`git fetch [remote-name]`

如果已经设置了某个分支记录远程分支，可以直接使用`git pull`命令来自动fetch数据。`git pull`命令会自动合并，而`git fetch`不会。

`git clone`命令会自动将远程库（remote）添加到origin对应的remote库下。即clone命令默认的远程分支名为`origin`，默认本地分支名为`master`。

**推送到远程分支**

命令格式为`git push [remote-name] [branch-name]`

**检查远程分支**

`git remote show [remote-name]`。例如：`git remote show origin`。

```
$ git remote show origin
* remote origin
URL: git://github.com/schacon/ticgit.git
Remote branch merged with ’git pull’ while on branch master
master
Tracked remote branches
master
ticgit
```

该命令会显示远程库的URL地址以及正在追踪的分支信息。通过该命令可以看到是否在
远程库的`master`分支上，如果运行`git pull`命令，git会自动从远程库的`master`分支获取（fetch）所有的远程引用并且进行合并。该命令也会列出git拉下来（pull down）的所有远程引用。

这是一种比较简单的情况，如果使用Git较多的话，有可能从`git remote show`命令看到下面的信息：

```
$ git remote show origin
* remote origin
  URL: git@github.com:defunkt/github.git
  Remote branch merged with ’git pull’ while on branch issues
    issues
  Remote branch merged with ’git pull’ while on branch master
    master
  New remote branches (next fetch will store in remotes/origin)
    caching
  Stale tracking branches (use ’git remote prune’)
    libwalker
    walker2
  Tracked remote branches
    acl
    apiv2
    dashboard2
    issues
    master
    postgres
  Local branch pushed with ’git push’
    master:master
```

该命令会显示在某些分支上运行`git push`时自动推送到哪一个分支。通过该命令也可查看目前服务器上的哪个分支不在本地，以及本地有哪些已经从服务器上移除的分支，以及运行`git pull`命令时自动合并的分支信息。

**删除和重命名远程库**

如果希望重命名一个引用，在较新版本的Git中，可以运行`git remote rename`命令来修改远程库的简称（shortname）。例如，如果希望将`pb`重命名为`paul`，可以运行命令`git remote rename`如下所示：

```
$ git remote rename pb paul
$ git remote
origin
paul
```

需要注意的是，重命名本地分支会重命名远程分支。过去引用到`pb/master`的分支会指向`paul/master`分支。

如果希望删除某个分支引用，例如已经从服务器上删除了该分支并且不在希望使用某个镜像，或者某个贡献者不再贡献代码--可以使用`git remote rm`命令：

```
$ git remote rm paul
$ git remote
origin
```

**打标**

类似于大部分VCS系统，Git也可以将历史中的某个点标记为重要点。一般来说，可以使用该功能来标记发布点（1.0版本等等）。

**列出tag**

列出当前git库的所有tag标记命令为：

```
$ git tag
v0.1
v1.3
```

`git tag`命令会按照字母顺序列出所有标记。

也可以使用某种模式来搜索标记（tag）。例如Git源码库包含了240多个tag，如果对于
1.4.2版本序列有兴趣，可以通过下面的命令来查看：

```
$ git tag -l ’v1.4.2.*’
v1.4.2.1
v1.4.2.2
v1.4.2.3
v1.4.2.4
```

**创建tag**

Git使用两种类型的tag：轻量tag（lightweight）和标注tag（annotated）。lightweight tag类似于没有修改的分支--只是指向某个特定提交（commit）的指针。而annotated tag是存储在Git数据库中的完整对象。这样的tag有检查和值，包含了标记器名称、电子邮箱地址、日期信息，以及标记信息，可以使用GNU Privacy Guard（GPG）进行签名和验证。通常推荐创建标记tag以保存所有信息。但是如果因为某些原因只希望保存临时tag而不保存其他信息，可以使用lightweight tag。

**annotated tag**

创建标记tag非常简单，就是在运行`tag`命令时加上`-a`选项。

```
$ git tag -a v1.4 -m ’my version 1.4’
$ git tag
v0.1
v1.3
v1.4
```

`-m`选项用于指定和tag一起存储的标记信息。如果没有为annotated tag指定信息，Git会启动编辑器便于用户输入标记信息。

可以使用`git show`命令查看已经标记的tag数据和提交内容（commit）。

```
$ git show v1.4
tag v1.4
Tagger: Scott Chacon <schacon@gee-mail.com>
Date: Mon Feb 9 14:45:11 2009 -0800
my version 1.4
commit 15027957951b64cf874c3557a0f3547bd83b3ff6
Merge: 4a447f7... a6b4c97...
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sun Feb 8 19:02:46 2009 -0800
Merge branch ’experiment’
```

**签名tag（signed tag）**

如果有私钥的话，可以使用GPG来为tag签名。只需要使用`-s`选项而不是`-a`选项。

```
$ git tag -s v1.5 -m ’my signed 1.5 tag’
You need a passphrase to unlock the secret key for
user: "Scott Chacon <schacon@gee-mail.com>"
1024-bit DSA key, ID F721C45A, created 2009-02-09
```

在该tag上运行`git show`命令可以查看链接的GPG签名：

```
$ git show v1.5
tag v1.5
Tagger: Scott Chacon <schacon@gee-mail.com>
Date: Mon Feb 9 15:22:20 2009 -0800
my signed 1.5 tag
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.8 (Darwin)
iEYEABECAAYFAkmQurIACgkQON3DxfchxFr5cACeIMN+ZxLKggJQf0QYiQBwgySN
Ki0An2JeAVUCAiJ7Ox6ZEtK+NvZAj82/
=WryJ
-----END PGP SIGNATURE-----
commit 15027957951b64cf874c3557a0f3547bd83b3ff6
Merge: 4a447f7... a6b4c97...
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sun Feb 8 19:02:46 2009 -0800
Merge branch ’experiment’
```

**轻量tag（lightweight tag）**

另一种标记提交的方法是使用轻量tag（lightweight tag）。这种tag只会在文件里存储提交检查和（commit checksum）而不会保存其他信息。要创建轻量tag，只需要不指定`-a`,`-s`和`-m`选项即可：

```
$ git tag v1.4-lw
$ git tag
v0.1
v1.3
v1.4
v1.4-lw
v1.5
```

这种情况下在该tag上运行`git show`命令将只会看到commit内容而没有其他标记信息。

```
$ git show v1.4-lw
commit 15027957951b64cf874c3557a0f3547bd83b3ff6
Merge: 4a447f7... a6b4c97...
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sun Feb 8 19:02:46 2009 -0800
Merge branch ’experiment’
```

**验证tag**

验证某个已签名的tag，可以使用`git tag -v [tag-name]`命令。该命令会使用GPG来验证签名。需要有签名者的公钥才能正常运行：

```
$ git tag -v v1.4.2.1
object 883653babd8ee7ea23e6a5c392bb739348b1eb61
type commit
tag v1.4.2.1
tagger Junio C Hamano <junkio@cox.net> 1158138501 -0700
GIT 1.4.2.1
Minor fixes since 1.4.2, including git-mv and git-http with alternates.
gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
gpg: Good signature from "Junio C Hamano <junkio@cox.net>"
gpg: aka "[jpeg image of size 1513]"
Primary key fingerprint: 3565 2A26 2040 E066 C9A7 4A7D C0C6 D9A4 F311 9B9A
```

如果没有签名者的公钥，会得到以下类似信息：

```
gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
gpg: Can’t check signature: public key not found
error: could not verify the tag ’v1.4.2.1’
```

**延后标记（tagging later）**

也可以在已经提交过的内容上加tag。假设提交历史如下所示：

```
$ git log --pretty=oneline
15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch ’experiment’
a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch ’experiment’
0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
4682c3261057305bdd616e23b64b0857d832627b added a todo file
166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
```

假设我们现在希望忘记项目v1.2的tag标记（即`updated rakefile`提交）。可以在改提交内容后。要标记该次提交，可以在命令后制定提交的检查和值（或者部分检查和值）。

`git tag -a v1.2 9fceb02`

也可以查看已经标记的提交（commit）：

```
$ git tag
v0.1
v1.2
v1.3
v1.4
v1.4-lw
v1.5
$ git show v1.2
tag v1.2
Tagger: Scott Chacon <schacon@gee-mail.com>
Date: Mon Feb 9 15:32:16 2009 -0800
version 1.2
commit 9fceb02d0ae598e95dc970b74767f19372d61af8
Author: Magnus Chacon <mchacon@gee-mail.com>
Date: Sun Apr 27 20:43:35 2008 -0700
updated rakefile
...
```

**分享tag**

默认情况`git push`命令不会将tag信息传输到远程服务器。需要在创建tag后显示将tag推送（push）到共享服务器。该过程类似于共享远程分支，可以使用`git push origin [tagname]`命令。

```
$ git push origin v1.5
Counting objects: 50, done.
Compressing objects: 100% (38/38), done.
Writing objects: 100% (44/44), 4.56 KiB, done.
Total 44 (delta 18), reused 8 (delta 1)
To git@github.com:schacon/simplegit.git
* [new tag] v1.5 -> v1.5
```

如果有许多tag希望一次推送到服务器，可以在`git push`命令后使用`-tags`选项。这样可以将所有已存的tag推送到远程服务器。

```
$ git push origin --tags
Counting objects: 50, done.
Compressing objects: 100% (38/38), done.
Writing objects: 100% (44/44), 4.56 KiB, done.
Total 44 (delta 18), reused 8 (delta 1)
To git@github.com:schacon/simplegit.git
* [new tag] v0.1 -> v0.1
* [new tag] v1.2 -> v1.2
* [new tag] v1.4 -> v1.4
* [new tag] v1.4-lw -> v1.4-lw
* [new tag] v1.5 -> v1.5
```

这样，其他人从git库clone或者pull内容时也可以获取所有的tag。

**git tag建议和技巧**

**自动补全**

如果使用bash shell，可以使用其自带的自动补全脚本。下载Git源代码，查看`contrib/completion`目录，在该目录下应该有一个名为`git-completion.bash`的文件。将该文件复制到home目录下并将其添加到`.bashrc`文件：

`source ~/.git-completion.bash`

如果希望在安装git时自动为所有用户设置bash shell自动补全，在mac系统下可以将该脚本复制到`/opt/local/etc/bash_completion`目录；在linux系统下，复制到`/etc/bash_completion.d/`目录。bash在启动时会自动加载这些目录下的脚本。

如果使用windows和Git Bash，即安装msysGit的默认git bash，已经预先配置了自动完成功能。

在输入Git命令时按tag键会返回一系列可以选择的建议：

```
git co<tab><tab>
commit config
```

自动补全也可用于选项。例如：

```
$ git log --s<tab>
--shortstat --since= --src-prefix= --stat --summary
```

**git别名(aliases)**

如果只输入部分命令的话，Git不会自动解析。如果不希望在每次输入Git命令时输入完整的命令，可以使用`git config`为每条命令分别设置对应的别名(alias)。例如下面的示例：

```
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

alias配置类似于bash的别名，可以减轻很多输入工作，例如配置:

```
git config --global alias.unstage 'reset HEAD --'
```

> 注意：需要使用单引号`'`而不是短音符`\``。

这样下面的两个命令是相等的。

```
git unstage fileA
git reset HEAD fileA
```

也可以配置查看最近一条log记录的alias：

```
git config --global alias.last 'log -1 HEAD'
```

可以看出alias配置会在运行git命令时使用alias单引号里的内容替代alias的内容。除此之外，`git alias`也可以用于配置运行外部命令的短命令。例如，gitk命令（msysGit自带的默认图形查看器）。

```
git config --global alias.visual '!gitk'
```

通过上面的配置，运行`git visual`命令相当于运行了`gitk`命令。

> 别忘了，查看当前所有配置，可以使用命令`git config --global -l`命令。

### 参考资料
1.  [windows下git core.editor配置--有墙](http://mkadlec99.blogspot.com/2011/07/setting-up-correct-git-config.html)
