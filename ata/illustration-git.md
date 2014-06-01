图解`Git`
---
### 目录
1.  基本用法
2.  约定
3.  命令详情
  a.  diff
  b.  commit
  c.  checkout
  d.  detached HEAD（匿名分支提交）
  e.  reset
  f.  merge
  g.  cherry pick
  h.  rebase
4.  技术说明

### 基本用法

![](http://marklodato.github.io/visual-git-guide/basic-usage.svg.png)

上述四条命令会在`working directory`（工作目录）、`stage(index)`（暂存区）和`history`仓库位置之间复制文件。

* `git add files`把文件放入暂存区域。
* `git commit`给暂存区生成快照并提交。
* `git reset -- files`用于撤销最后一次`git add files`，也可以用`git reset`撤销所有暂存区域文件。
* `git checkout -- files`把文件从暂存区域复制到工作目录，用于丢弃本地修改。

也可以用`git reset -p`和`git checkout -p`或者`git add -p`进入交互模式。

也可以跳过暂存区域直接从仓库取文件或者直接提交代码。

![](http://marklodato.github.io/visual-git-guide/basic-usage-2.svg)

* `git commit -a`相当于运行`git add`把所有当前目录下的文件加入暂存区域再运行`git commit`。
* `git commit files`相当于包含最后一次提交加上工作目录中文件快照的提交。并且将文件添加到暂存区域。
* `git checkout HEAD -- files`回滚到最后一次提交。

### 约定

约定如下：

![](http://marklodato.github.io/visual-git-guide/conventions.svg)

绿色的5位字符表示提交的ID，分别指向父节点。分支用橘色显示，分别指向特定的提交。当前分支由附在其上的HEAD标识。 这张图片里显示最后5次提交，ed489是最新提交。 master分支指向此次提交，另一个maint分支指向祖父提交节点。

> 从上图中可以看到`Stage(index)`是当前要提交文件的文件夹，`Working Directory`是当前看到的文件夹。

### 命令详解

#### `Diff`

查看两次提交之间的变动的方法有许多，一些示例如下：

![](http://marklodato.github.io/visual-git-guide/diff.svg)

> 可以看到，要和某个分支（如`maint`分支）对比，可以使用命令`git diff maint`。
> 要查看当前准备提交的修改（即`Stage(index)`中的内容）和当前`master`分支的对比，可以使用命令`git diff --cached`。
> 要查看当前工作目录（`Working Directory`）修改的内容（即修改而且没有没有假如提交区域的内容，应使用命令`git diff`。
> 查看当前工作目录和主干分支（`master`）的对比，应使用命令`git diff HEAD`。

#### `Commit`


提交时，git用暂存区域的文件创建一个新的提交，并把此时的节点设为父节点。然后把当前分支指向新的提交节点。下图中，当前分支是master。 在运行命令之前，master指向ed489，提交后，master指向新的节点f0cec并以ed489作为父节点。

![](http://marklodato.github.io/visual-git-guide/commit-master.svg)

即便当前分支是某次提交的祖父节点，git会同样操作。下图中，在master分支的祖父节点maint分支进行一次提交，生成了1800b。 这样，maint分支就不再是master分支的祖父节点。此时，[合并](http://marklodato.github.io/visual-git-guide/index-zh-cn.html#merge) (或者[衍合](http://marklodato.github.io/visual-git-guide/index-zh-cn.html#rebase)) 是必须的。

![](http://marklodato.github.io/visual-git-guide/commit-maint.svg)

如果想更改一次提交，使用 git commit --amend。git会使用与当前提交相同的父节点进行一次新提交，旧的提交会被取消。

![](http://marklodato.github.io/visual-git-guide/commit-amend.svg)

另一个例子是[分离HEAD提交](http://marklodato.github.io/visual-git-guide/index-zh-cn.html#detached),后文讲。

#### Checkout

checkout命令用于从历史提交（或者暂存区域）中拷贝文件到工作目录，也可用于切换分支。

当给定某个文件名（或者打开-p选项，或者文件名和-p选项同时打开）时，git会从指定的提交中拷贝文件到暂存区域和工作目录。比如，git checkout HEAD~ foo.c会将提交节点HEAD~(即当前提交节点的父节点)中的foo.c复制到工作目录并且加到暂存区域中。（如果命令中没有指定提交节点，则会从暂存区域中拷贝内容。）注意当前分支不会发生变化。

当不指定文件名，而是给出一个（本地）分支时，那么HEAD标识会移动到那个分支（也就是说，我们“切换”到那个分支了），然后暂存区域和工作目录中的内容会和HEAD对应的提交节点一致。新提交节点（下图中的a47c3）中的所有文件都会被复制（到暂存区域和工作目录中）；只存在于老的提交节点（ed489）中的文件会被删除；不属于上述两者的文件会被忽略，不受影响。



### 原文
[http://marklodato.github.io/visual-git-guide/index-zh-cn.html](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)
