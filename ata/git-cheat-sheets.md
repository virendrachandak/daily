`git`小抄
---

# 安装

`git clone <repo>`
> 复制`<repo>`库；类似于其他版本控制系统中的`checkout`。


为`~/.gitconfig`文件添加颜色:

```
[color]
  ui = auto
[color "branch"]
  current = yellow reverse
  local = yellow
  remote = green
[color "diff"]
  meta = yellow bold
  frag = magenta bold
  old = red bold
  new = green bold
[color "status"]
  added = yellow
  changed = green
  untracked = cyan
```

高亮`diff`中的空白：

```
[color]
  ui = true
[color "diff"]
  whitespace = red reverse
[core]
  whitespace = fix,-indent-width-non-tab,trailing-space,cr-at-eol
```

添加`aliases`：

```
[alias]
  st = status
  ci = commit
  br = branch
  df = diff
  dc = diff --cached
  lg = log -p
  lol = log --graph --decorate --pretty=oneline --abbrev-commit
  lola = log --graph --decorate --pretty=oneline --abbrev-commit --all
  ls = ls-files
  # Show files ignored by git:
  ign = ls-files -o -i --exclude-standard
```

# 配置：

`git config -e [--global]`

> 在编辑器中编辑`.git/config`或者`~/.gitconfig`(加了`--global`选项时)

`git config --global user.name 'John Doe'`
`git config --global user.emailjohndoe@example.com`

> 设置`commit`信息中的用户名和邮箱信息

`git config branch.autosetupmerge true`
让`git-branch`和`git-checkout`创建新分支，这样`git-pull`会和远程分支进行合并。推荐使用，如果没有配置的话，需要在`branch`命令上加上`--track`选项，或者手动使用`fetch`，并使用`merge`命令来合并正在跟踪的分支。

`git config core.autocrlf true`
该配置让`git`在`checkout`文件时将换行转换成系统的标准换行，在`commit`时将换行转换成`LF`格式。

`git config --list`
查看所有配置选项

`git config apply.whitespace nowarn`
忽略空白字符警告

以上所有选项如果加上`--global`可以让它们对所有`git`库生效（即写入`~/.gitconfig`）

# 信息
---

`git reflog`
用于恢复`*major\*引入的错误。其实基本上是最近几次活动的日志，也许可以帮助开发者找到因为复杂的合并而丢失的提交内容。

`git status`
显示添加到`staging area`（暂存区）的文件，修改过的文件，以及未加入库记录的文件。

`git log`
显示最近的提交记录，按照时间先后顺序从上往下显示。一些有用的选项为：
`--color`     使用颜色
`--graph`     在左侧使用ASCII-art提交图
`--decorate`  在合适的提交上带上分支和`tag`名称
`--stat`      文件状态（修改了的文件，插入和删除）
`-p`          显示完整的`diff`状态
`--author=foo`    只显示某个`author`的提交
`--after="MMMM DD YYYY"`  例如("Jun 20 2008")只显示某个日期后的提交
`--before="MMMM DD YYYY"`  只显示某个日期前的提交
`--merge`   只显示当前合并冲突中的提交

`git log <ref> .. <ref>`
显示指定范围的提交。查看远端修改非常有用：`git log HEAD..origin/master`

`git show <rev>`
显示使用`rev`指定的提交修改内容（diff），`rev`可以是一个`SHA1`的提交ID，分支明，或者`tag`（默认显示最近一次提交`HEAD`）名。
也可以显示某个特定版本文件的内容，使用`git show <rev>:<filename>`
类似于`cat`查看文件，但是语法更加简单。

`git show --name-only <rev>`
仅显示修改过的文件的名字，而不显示`diff`信息。

`git blame <file>`
显示`<file>`文件每行的`author`信息。

`git blame <file> <rev>`
显示`<rev>`版本的`<file>`文件的`author`信息（可以看到过去的`blame`信息）。

`git gui blame`
`git blame`的`GUI`界面。
有的系统命令行不包含`git gui`命令，这时可以参考[这个网址](http://stackoverflow.com/questions/11722830/git-gui-not-working-after-installing-mountain-lion)

> 在`OS X`下的做法是修改`~/.gitconfig`文件，假如下面的内容：
> ```
> [alias]
> gui = !sh -c '/usr/local/git/libexec/git-core/git-gui'
> ```

`git watchanged <file>`
仅显示最近一次影响`<file>`文件修改的提交。
例如：查看一个分支上某个文件的所有修改：
  ```
  git watchanged <branch> <file> | grep commit | \
    colrm 1 7 | xargs -I % git show % <file>
  ```
还可以和`git remote show <remote>`结合来查看所有分支上某个文件的所有修改。

`git diff <commit> head path/to/fubar`
显示当前分支和可能的其他分支上某个文的`diff`。

`git diff --cached [<file>]`
显示暂存区文件的`diff`（包括未提交的`git cherry-pic`文件）。

`git ls-files`
列出`index`和版本记录中的所有文件。

`git ls-remote <remote> [HEAD]`
显示远程库上的当前版本。可以通过与本地`head`修改比较来检查是否需要一个本地版本。

# 添加/删除
---

`git add <file1> <file2> ...`
添加文件`<file1>`，`<file2>`等等到项目。

`git add <dir>`
添加`<dir>`文件夹下的所有文件到项目，包括子项目。

`git add .`
添加当前文件夹下的所有文件到项目。

> 注意：包括未`track`的文件。

`git rm <file1> <file2> ...`
从项目中删除`<file1>`，`<file2>`等等文件。

`git rm $(git ls-files --deleted)`
删除项目中所有已经删除的文件。

`git rm --cached <file1> <file2> ...`
提交到项目，但是不包含`<file>`，`<file2>`等文件的内容。

# 忽略
---

## 选项1：

编辑`$GIT_DIR/.git/info/exclue`。`$GIT_DIR`是一个环境变量，下文有解释。

## 选项2：

在当前项目的根目录下添加一个`.gitignore`文件。在提交时会带上这个文件。
两种方式都需要添加`pattern`来指定排除的文件。

# `staging`暂存
---

`git add <file1> <file2> ...`
`git stage <file1> <file2> ...`
将`<file1>`，`<file2>`等文件的修改添加到`staging`区域（即下次将提交的内容）。

`git add -p`
`git stage -patch`
交互式地遍历当前的工作目录，并且确定将哪些修改添加到`staging area`（暂存区）。

`git add -i`
`git stage --interactive`
交互式地将文件和修改添加到`staging area`（暂存区）。一个稍简单的模式（没有菜单）是使用上面提到的`git add --path`命令。

# 取消暂存
---

`git reset HEAD <file1> <file2> ...`
下次提交不包含指定的文件`<file1>`，`<file2>`。

# 提交
---

`git commit <file1> <file2> ... [m <msg>]`
提交`<file1>`，`<file2>`等文件，可以选择加上提交信息`<msg>`，或者打开编辑器来输入提交信息。

`git commit -a`
提交从上次提交开始修改过的内容（不包括新`untracked`文件）。

`git commit -v`
提交时显示详细信息。即，在提交信息屏幕上包含提交内容的`diff`信息。

`git commit --amend`
编辑最近一次提交的提交信息。

`git commit --amend <file1> <file2> ...`
重做一次上次的提交，包含对`<file1>`，`<file2>`等文件的修改内容。

# 分支
---

`git branch`
列出所有本地分支

`git branch -r`
列出所有远程分支

`git branch -a`
理出所有本地和远程分支

`git branch <branch>`
创建一个名为`<branch>`的新分支，引用到和当前分支一样的历史记录点。

`git branch <branch> <start-point>`
创建一个名为`<branch>`的新分支，引用到`<start-point>`，也可以使用你喜欢的任何方式来指定，包括使用分支明或者`tag`名。

`git push <repo> <start-point>:refs/heads/<branch>`
常见一个名为`<branch>`的新分支，引用到远端的`<start-point>`。`<repo>`是远端库的名称。
例如：`git push origin origin:refs/heads/branch-1`
例如：`git push origin origin/branch-1:refs/heads/branch-2`
例如：`git push origin branch-1`这是一种简写形式。

`git branch --track <branch> <remote-branch>`
创建一个记录（`tracking`）分支。
例如：`git branch --track experimental origin/experimental`。

`git branch --set-upstream <branch> <remote-branch>`
让一个已有分支`track`一个远程分支。
例如：`git branch --set-upstream foo origin/foo`

`git branch -d <branch>`
删除`<branch>`分支。如果正在删除的分支指向了当前分支不可到达的提交，
该命令会失败并发出警告。

### 英文原文
[http://cheat.errtheblog.com/s/git](http://cheat.errtheblog.com/s/git)
