git简明指南
---
### 安装

[git OS X版](http://code.google.com/p/git-osx-installer/downloads/list?can=3)
[git window版](http://msysgit.github.io/)
[git linux版](http://book.git-scm.com/2_installing_git.html)

### 创建新仓库

`mkdir new-git-repository-name`
`git init`

### 检出仓库

`git clone /path/to/repository`
或者
`git clone username@host:/path/to/repository`

### 工作流

`git`会维护三棵树，一个是`working directory`（当前工作目录），存放当前实际项目
文件；一个是`staging area`（暂存区），保存改动内容；最后一个是`HEAD`，指向最后一次提交的结果。如下图：

![](http://rogerdudler.github.io/git-guide/img/trees.png)

### 添加和提交

`git add filename`
或者全部添加
`git add *`
这一步会修改`staging area`（暂存区）的内容。

#### 提交
`git commit -m 'commit comment'`
这回改动`HEAD`的内容，即将要推送到远程分支的修改内容。

### 推送修改

`git push origin branch-name`
默认的`branch-name`是`master`

如果当前文件夹还没有远程库，通过下面的命令添加：
`git remote add origin server`

### 分支

`master`是创建`git`库时的默认分支。分支开发如下图所示：
![](http://rogerdudler.github.io/git-guide/img/branches.png)

创建一个分支并立即切换到该分支的命令为：
`git checout -b feature_branch_name`

切换回主分支：
`git checkout master`

删除新分支：
`git branch -d feature_branch_name`

新分支创建后，必须执行过以下命令才会推送到服务器上的远端仓库：
`git push origin feature_branch_name`

### 更新与合并

更新本地仓库至服务器上远程仓库的最新改动，执行下面的命令：
`git pull`
`git pull`等于`git fetch`加上`git merge`

合并分支的命令为：
`git merge branch_name`

自动合并出现冲突（`conflict`）时，需要手动解决冲突，并将解决完冲突的文件加入到要提交的内容中，即:
`git add conflict_resolved_file_name`

在合并修改前，可以预览修改的内容：
`git diff source_branch target_branch`

### 标签

`git tag 1.0.0 1b2dasdf`
其中`1b2dasdf`是某次提交`HEAD`的`HASH`值，可以通过如下命令查看：
`git log`

### 恢复本地的修改

想恢复本地文件到`checkout`前或者`clone`下来的未修改状态，可以使用下面的命令：
`git checkout -- file_name`

这个命令会使用`HEAD`中的最新内容替换工作目录中指定的文件。已添加到暂存区的改动和新文件都不会受到影响。

如果想恢复本地的所有修改与提交，可以从服务器上获取最新的版本历史，并将本地主分支指向它：

```
git fetch origin
git reset --hard originmaster
```

### tips

* `git`自带的图形化`git`工具：`gitk`

* `git`输出增加颜色：
  `git config color.ui true`

* 修改提交日志的查看显示，每次记录只显示一行：
  `git config format.pretty oneline`

* 交互式添加修改过的文件到`staging area`：
  `git add -i`

### 其他资源

* gui
  
  <ul xmlns="http://www.w3.org/1999/xhtml">
      <li><a href="http://gitx.laullon.com/">GitX (L) (OSX, 开源软件)</a></li>
      <li><a href="http://www.git-tower.com/">Tower (OSX)</a></li>
      <li><a href="http://www.sourcetreeapp.com/">Source Tree (OSX, 免费)</a></li>
      <li><a href="http://mac.github.com/">GitHub for Mac (OSX, 免费)</a></li>
      <li><a href="https://itunes.apple.com/gb/app/gitbox/id403388357?mt=12">GitBox (OSX, App Store)</a></li>
  </ul>

* 参考资料 

  <ul xmlns="http://www.w3.org/1999/xhtml">
      <li><a href="http://book.git-scm.com/">Git 社区参考书</a></li>
      <li><a href="http://progit.org/book/">专业 Git</a></li>
      <li><a href="http://think-like-a-git.net/">像 git 那样思考</a></li>
      <li><a href="http://help.github.com/">GitHub 帮助</a></li>
      <li><a href="http://marklodato.github.io/visual-git-guide/index-zh-cn.html">图解 Git</a></li>
  </ul>
