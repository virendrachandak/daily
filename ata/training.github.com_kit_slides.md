`Git`小抄
---

# 基础

> Git日常命令行以及Github工作流的核心技能。

## Version Control

![Distributed Version Control](http://gtms04.alicdn.com/tps/i4/TB1T8dfFVXXXXcqXFXXsmZG2VXX-1080-684.png)

# 中级

> 重要的命令行技巧以及解决问题的流程。

## 配置

### 基础配置

```
git config user.name "[name]"
git config user.email "octocat@github.com"
```

## 起步

### 下载

```
git clone [url]
git clone [url] [folder name]
```

### 检查文件

```
git status
```

### 版本内容修改

```
git commit -m "[message]"
```

### 理解Commit

三种状态：working, staging, history

```
working (add)-> staging
staging (commit)-> history
```

### publish修改

```
git push
```

### retrieve修改

```
git pull
```

### 同步的过程

```
local (push)-> upstream
upstream (pull)-> remotes
remotes (merge)-> local
upstream (fetch)-> remotes
```

### git init

```
# New project & repo
$ git init [project]

# Existing project
$ cd [project]
$ git init
```

### git remote

```
git remote add origin [repo-url]
git remote set-url origin [repo-url]
git remote -v
```

## review修改

### 比较和编辑

```
$ git diff

$ git diff --staged

$ git diff [branch-one] [branch-two]
```

### 检查历史

```
$ git log

$ git log --oneline

$ git log --patch

$ git log --stat
```

## 工具功能

### 别名

```
git config alias.s "status -su"
git config alias.lol 'log --graph --all --oneline --decorate'
```

### 存储登陆证书

```
git credential.helper cache
git credential-cache exit
```

## Workflow

`fork -> pull request -> merge`

## 分开修改

```
git branch [name]
```

## 修改context

```
git checkout [branch]
```

## publish本地修改

```
# Upstream specified
git push origin [branch]

# Upstream setup for tracking
git push -u origin [branch]
```

### 添加upstream

```
# Create new upstream bookmark
git remote add origin [repo-url]

# List remotes and URLs
git remote -v
```

### 本地集成

```
git checkout [target]
git merge [feature]
```

## 撤销修改

### 丢弃修改内容

```
git checkout -- [path]
```

### 通过commit来恢复

```
git revert [commit-ref]
```

### 丢弃历史

```
git reset [commit-ref]
```

## 文件状态

```
untracked + tracking

tracking = ['unmodified', 'modified', 'staged'];

untracked (add)-> staged
staged (commit)-> unmodified
unmodified (edit)-> modified
modified (add)-> staged
unmodified (remove)-> untracked
```

### 删除内容

```
git rm [path]

rm [path]
git add -u .
```

### 修改path

```
git mv [path] [new-path]
```

# 高级

> 深入的命令行功能以及解决问题的技巧，还有Github高效使用技巧。

## Bisect

### 模式

* 手动搜索模式
* 自动化搜索模式

### 标记bad commit

```
# Begin process
git bisect start

# Denote known bad commit
git bisect bad <rev>

# Flag good commit
git bisect good <rev>

# Open GitK for commit range remaining
git bisect visualize

# Or review as a text list
git bisect log
```

### 已有进程

```
# Upon completion, restore to HEAD
git bisect reset
```

## Bundle

### 使用bundle来存档（整合comit和对象）

```
git bundle <filename> <rev>
```

给最近打包快照打标签

```
git tag --force LAST_ARCHIVE <rev>
```

```
git bundle create <file> <git-rev-list-args>
git bundle verify <file>
git bundle list-heads <file> [<rev>]
git bundl unbundle <file> [<rev>]
```

### 从archive文件创建新的库

```
git clone -b <main-branch> <archive-path> <repo-name>
```

验证配置的remote archive路径

```
git remote -v
```

### archive修改的内容

### 参考资源汇总

* 从主库更新archive和其他修改

```
git bundle create <filename> LAST_ARCHIVE..<repo-name>
```

### retrieve渐进增强的archive

* retrieve分支和新的渐进增强的bundle修改

```
git fetch <filename>
```

## Cherry-Pick

### Bundle Commit

* 集中指定的commit
* 从working状态的内容中选择使用commit

### 通过ref选择

```
# Create a new commit at HEAD from specified repo
git cherry-pick <ref-from-other-branch>
```

### 通过path来验证

```
# List commits cherry-picked, based on path-id comparison
git cherry <branch>
```

## 协作

### 团队协作（Teamwork）

Github为支持团队协作提供的功能：

* Issue讨论
* Wiki页面
* 协作者控制
* 管理群组
* 团队访问

### 自定义

remote跟踪：仅push当前HEAD内容到upstream

```
git config <scope> push.default simple
```

push所有的内容（ref）到配置好的upstream

```
git config <scope> push.default matching
```

remote tracking配置

```
git branch --set-upstream-to <remote>/<branch-name>

git branch --unset-upstream <branch-name>
```

### 推送到分支

将所有refs/heads推送到remote

```
git push --all origin
```

强制remote匹配local/refs/heads

```
git push --mirror origin
```

访问remote

```
git ls-remote

git branch -vv
```

rebase配置

```
# Always rebase HEAD

git config pull.rebase true
```

## filter-branch

通过文件系统命令来过滤分支

```
git filter-branch --tree-filter 'rm -f <filenamepattern>' <branch>
```

通过仓库的内容来过滤分支

```
git filter-branch --index-filter 'git rm --cached --ignore-unmatch <filename>' <branch>
```

通过目录结构来过滤分支

```
git filter-branch --subdirectory-filter <dir-name> -- --all
```

## GitAttributes

### 使用的原因

* 建立针对路径的设置
* 库跟踪
* 保证某些配置

### 存储的位置

* 传统位置：根目录下的`.gitattributes`
* 可选位置：
  * 每个库下面的`.git/info/attributes`
  * 外部配置文件

### 模式示例

* 强制所有checkout转换成CRLF换行

```
  <path-pattern> crlf
```

* 确保没有发生转换，没有diff输出（例如，二进制对象）

```
  <path-pattern> -crlf -diff
```

* 赋予指定的diff driver

```
  <pattern> diff=<diff-in-config>
```

## Github方式（The Github Way）

### master分支是可部署的分支，绝对不能直接commit到master

### Topic Branches（团队协作的分支）

### Code Review（通常merge从topic分支或者forked库的pull request）

## Hot Tips（有用的建议）

### 分支的shortcuts

```
# Branches Merged with HEAD
git branch --merged

# Branches Not Merged with HEAD
git branch --no-merge

# Branch Containing a Commit
git branch --contains <ref>

# Branch Rename
git branch -m <oldbranch> <newbranch>
```

### 合并冲突解决

```
# Use HEAD as conflict resolution reference
# (local file)
git checkout --ours <file>`

# Use upstream as conflict resolution reference
# (incoming file)
git checkout --theirs <file>`
```

## 标志commit

```
# List "friendly name" for commit
git name-rev <ref>

# List commit for "friendly name"
git rev-parse <refname>
```

### 检查commit

```
# List commits only reachable by downstream
git log <rev1>..<rev2>

# List commits of both, not upstream of each
git log <rev1>...<rev2>
```

## Git Internals

* BLOB, commit和tree
* commit->tree->blob图
* ls-tree
  * git -ls-tree master .
* cat-file
* ls-files
* zlib inflate, deflate
* `git rev-parse <branch/tag> ref`
* `git name-reve <rev>`

## Notes

### 使用Notes的原因

* 不会影响commit历史
* 默认会在本地保持
* 支持命名空间

### authoring notes

```
# Author a note with default editor
git notes add <ref>

# Edit existing note
git notes edit <ref>

# Delete a note
git notes remove <ref>
```

### namespacing notes

```
# Namespacing (multiple notes per "ref")
git notes --ref=<namespace> add <ref>

# Edit a namespace note
git notes --ref=<namespace> edit <ref>

# Showing namespaced or all notes
git log --show-notes="[<namespace>][*]"
```

### 分享notes

```
# Push with a One-Time Refspec
git push <remote> refs/notes/<[namespace][*]>

# Configure Remote with Refspec
push = refs/notes/*:refs/notes/*

# Retrieving with a One-Time Refspec
git fetch <remote> refs/notes/*:refs/notes/*

# Configure Remote with Refspec
fetch = +refs/notes/*:refs/notes/*
```

> Githun会显示commit的notes

### Refspec

`+<source>:<destination>`

## 定制remote

###  自定义fetch和push

```
# Name Spacing Branches for Fetch
git config --add remote.<remote-name>.fetch
  '+refs/heads/<name-space>/*:
    refs/remotes/<remote-name>/<name-space>/*'

# Name Spacing Branches for Push
git config --add remote.origin.push
  '+refs/heads/<branch-name>:
    refs/heads/<name-space>/<branch-name>'
```

### Fetch Pull请求

```
# Retrieve Pull Requests
# Using `git config`
git config --add remote.origin.fetch
  '+refs/pull/*/head:refs/remotes/origin/pull/*'

# Editing .git/config with editor
fetch = +refs/pull/*/head:refs/remotes/<remote->/pull/*
```

### clean up remote

```
# Review remote tracking
git remote show <remotename>

# Tidy remote (local) tracking branches
git remote prune
git fetch --prune

# Delete remote branches not local
git push --prune
```

## ReReRe

```
# Minimizing Repetitive Conflict Resolution
git config <scope> rerere.enabled true
```

## Searching

### 仓库中的搜索

```
git blame <filename>
git log -S<string-in-code-patch>
git log --grep=<string-inmessage>
git log -F<fixed-string-no-regex-in-code>
```

## Submodule

### submodules

* Super Repo Tracking Subordinate Repo
* 版本控制提交点
* 将依赖组件化

### 添加Submodule

`git submodule add <url>`

## 参考链接

[基础--Foundations](http://training.github.com/kit/slides/github-foundations.html)
[中级--Intermediate](http://training.github.com/kit/slides/github-intermediate.html)
[高级--Advanced](http://training.github.com/kit/slides/github-advanced.html)

### skills

* 查看某个文件的commit历史

`git log --stat -- somefilepath`

> 这条命令只能看到部分内容，需要修改成如下命令：

`git log --stat -M --follow -- somefilepath`

* 相似度指数（similarity index）
