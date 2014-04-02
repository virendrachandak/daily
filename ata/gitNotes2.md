Git学习笔记（二）
---
> 接前面的内容，开始介绍Git的杀手级功能`branching model`（分支模型）。

几乎所有VCS系统都支持某种形式的分支功能。分支的意思是可以从开发的主线（或者主干）分叉开发而不影响主干上的代码内容。许多VCS的分支功能都影响用户体验，通常需要用户创建一份源代码目录的拷贝，对于大型工程来说，会花费大量时间。

Git的分支功能是的它从其他VCS工具中脱颖而出。Git的分支功能非常轻量，分支操作几乎是实时的，在不同分支之间的切换也非常迅速。与其他VCS工具不同，Git鼓励在工作流中使用分支和合并。

### 什么是分支（branch）

要真正理解Git的branch操作，我们需要先了解Git存储数据的方式。在前面的文章中已经说过，Git并不是将数据作为修改内容存储，而是以快照（snapshot）的方式存储。

在提交（commit）时，git会存储一个指向staged内容快照、author和信息元数据的指针以及0个或多个当前提交的直接父节点的提交。第一次提交没有父节点，一般的提交会有一个父节点，从两个或多个分支合并的提交会有多个父节点。

要形象地理解上面的内容，可以假设目前我们有一个包含3个文件的目录，这3个文件全都被stage进行提交。stage每个的检查和（SHA-1 hash值）会在Git库中存储该版本文件并将检查和（checksum）添加到staging area（存储区域）。

```
$ git add README test.rb LICENSE2
$ git commit -m ’initial commit of my project’
```

使用`git commit`命令创建commit(提交)时，Git会检验所有子目录并将这三个对象存储到Git库。Git会创建一个包含元数据（metadata）和指向根项目树的commit对象，这样Git就可以在需要时重新创建snapshot（快照）。

这样Git库就会包含5个对象，三个文件每一个都有一个blog（对象文件），列出当前文件夹内容的树，指定了文件名和blob对应关系的指针。以及一个带有指向根树和所有提交元数据的提交指针的commit对象。如下图所示：

![](http://gtms01.alicdn.com/tps/i1/T18BqeFzxgXXXUOHML-651-361.png)

如果修改了git内容并且进行了提交，下一次提交会存储一个指向提交的指针。两次提交后的历史记录如下图：

![](http://gtms04.alicdn.com/tps/i4/T1NhnqFsXdXXcE5KTF-577-256.png)

Git中的分支是一个指向其中一次提交的轻量可移动指针。Git默认的分支名为`master`。在刚开始提交时，会有一个指向最近一次提交的`master`分支。每次提交该指针都会自动移动。

创建新分支会发生什么呢？创建新分支时会创建一个可以移动的新指针。例如，新建一个名为`testing`的分支。使用如下git命令：

`git branch testing`

![](//TODO:figure 3.3)
![](//TODO:figure 3.4)

该操作会在当前所在提交上创建一个新的指针（参考图3.4）。

Git如何知道当前所在的分支呢？Git会维护一个名为`HEAD`的特殊指针。注意`HEAD`在Git中的概念和其他VCS系统不同。在Git中，`HEAD`指针指向当前所在的本地分支。在当前情况下，用户仍然处于`master`分支。git的`branche`命令只会创建一个新分支--而没有切换到该分支（查看图片3.5）。

![](//TODO:figure 3.5)

要切换到一个已有分支，需要运行`git checkout`命令。例如切换到新的`testing`分支的命令为：`git checkout testing`

该命令会将`HEAD`指向`testing`分支（查看图3.6）。

![](//TODO:figure 3.6)

如果再做一次提交：

```
$ vim test.rb
$ git commit -a -m ’made a change’
```

结果如图3.7所示：

![](//TODO:figure 3.7)

我们可以看到`testing`分支向前移动了，但是`master`分支仍然指向`git checkout`切换到的分支。可以切换回`master`分支。

`git checkout master`

结果如图3.8所示：

![](//TODO:figure 3.8)

上面的命令会做两件事，首先会将`HEAD`指针指回`master`分支，并将工作目录中的文件恢复到`master`所指向的快照。这意味着从一点开始所做的修改会和项目的老版本分离。本质上它会回退在`testing`分支所做的临时修改到另一个不同的方向。

```
$ vim test.rb
$ git commit -a -m ’made other changes’
```

这样项目历史就产生了分叉（如图3.9）。创建并且切换到了一个分支，做了一些修改，然后切换回主分支并且做其他修改。这些修改会在不同的分支里隔离，可以在分支之间切换并且在合适的时候进行合并。只需要使用`git branch`和`git checkout`命令就可以完成上述事情。

![](//TODO:figure 3.9)

因为Git中的分支只是一个包含了指向提交内容的40个字符SHA-1检查和值的简单文件，创建和销毁分支的成本都很低。创建一个新分支和向一个文件写入41个字符一样快速和简单（40个字符和一个换行符）。

这与其他大部分VCS工具的分支完全不同，其他工具需要将项目里的所有文件复制到一个新的目录，这样的操作会根据项目大小而花费数秒甚至数分钟时间，而在Git中，分支操作都是即时的。除此之外，因为在提交时记录了父节点，在合并时会自动查找一个合适的合并基点。

### 基本分支和合并

让我们浏览一个在现实中很可能经历的简单的分支合并工作流。其步骤为：

1.  在网站上修改。
2.  创建一个正在修改项目的的新分支。
3.  在该分支上修改。

在这一步，加入遇到一个紧急问题需要马上修复，应该遵循如下步骤：

1.  退回生产分支。
2.  创建一个分支来添加修复。
3.  测试完毕后，合并修复补丁分支并推送到生产分支。
4.  切换回初始点继续工作。

### 基本分支操作

首先，假设在当前工作项目有几次提交。

![](//TODO:figure 3.10)

这时候需要修复公司使用的bug记录系统中的53号bug。Git并未同任何bug记录系统绑定。但是因为53号bug是希望集中修复的任务，需要新建一个新分支。要同时创建并切换到一个新分支，可以使用`git checkout`命令加上`-b`选项：

```
$ git checkout -b iss53
Switched to a new branch "iss53"
```

上面的命令是下面命令的简写：

```
$ git branch iss53
$ git checkout iss53
```

结果如图3.11所示：

![](//TODO:figure 3.11)

可在当前站点工作并提交。因为已经迁出了`iss53`分支（即改变了`HEAD`的指向），可以移动到`iss53`分支。如图3.12所示：

```
$ vim index.html
$ git commit -a -m ’added a new footer [issue 53]’
```

![](//TODO:figure 3.12)

假设正在工作的站点有bug需要马上修复。使用Git不需要马上部署`iss53`修改。也不需要花费大量功夫来恢复已经修改的内容就可以将修改应用到生产系统。只需要切换回`master`分支就可以了。

然而，在这样做之前，需要注意工作目录和存储区域（staging area）有一些和当前工作分支冲突的未提交修改。Git不允许切换分支。在切换分支时最好工作目录比较清晰。有一些方法可以避开这些限制（即，stashing-暂存和提交修改--commit ammending），这些内容稍后讲解，我们先假设已经提交了所有修改，不需要切换回`master`分支：

```
$ git checkout master
Switched to branch "master"
```

这样，工作目录就和开始修复53号bug之前完全一样，可以集中精神开始修复紧急bug了。这点非常重要。Git会将工作目录重置成检出该分支时的提交内容快照一样。即自动增加、删除和修改文件使得工作目录和最后一次提交的分支一样。

接下来，需要应用紧急修复。创建一个紧急修复的工作分支直到修复完成（如图3.13）：

```
$ git checkout -b ’hotfix’
Switched to a new branch "hotfix"
$ vim index.html
$ git commit -a -m ’fixed the broken email address’
[hotfix]: created 3a0874c: "fixed the broken email address"
1 files changed, 0 insertions(+), 1 deletions(-)
```

![](//TODO: figure 3.13)

接着可以进行测试确保修复有效，再将修复代码合并回主干分支并部署到生产环境。使用`git merge`命令完成上述操作：

```
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast forward
README | 1 -
1 files changed, 0 insertions(+), 1 deletions(-)
```

注意合并信息中的`Fast forward`。因为提交所指向的合并分支是当前提交的直接上游，Git会将指针往前移动。另一种理解是，如果尝试将一次提交与一个可以通过首次提交历史直接到达的提交合并，Git会通过前移指针来简化操作，因为不需要分叉操作来进行合并--即所谓的“前移”。

现在所做的修改存在于`master`分支提交所指向的快照中，可以部署修改（如图3.14）。

部署完这个非常重要的修复后，可以切换回被中断的工作内容。然而，首先需要删除
`hotfix`分支，因为不再需要这个分支--`master`分支指向了相同的地方。可以使用`git branch`的`-d`选项来删除。

![](//TODO:figure 3.14)

```
$ git branch -d hotfix
Deleted branch hotfix (3a0874c).
```

现在就切换回了53号bug所在的工作分支。（如图3.15）：

```
$ git checkout iss53
Switched to branch "iss53"
$ vim index.html
$ git commit -a -m ’finished the new footer [issue 53]’
[iss53]: created ad82d7a: "finished the new footer [issue 53]"
1 files changed, 1 insertions(+), 0 deletions(-)
```

![](//TODO: figure 3.15)

值得注意的是在`hotfix`分支的工作内容不包含在`iss53`分支的文件中。如果需要拉下来（pull）这些文件，可以将`master`分支合并到`iss53`分支（运行命令`git merge master`），或者可以等到准备将`iss53`分支推送会`master`分支时再合并。

### 基本合并

假设已经完成了53号bug的修复工作准备合并到`master`分支。首先，需要合并`iss53`分支，就像之前需要合并`hotfix`分支一样。只需要检出(`check out`)希望合并到的分支然后运行`git merge`命令：

```
$ git checkout master
$ git merge iss53
Merge made by recursive.
README | 1 +
1 files changed, 1 insertions(+), 0 deletions(-)
```

这个过程看上去和合并`hotfix`的操作不太相同。在这个过程中，开发历史从一个较旧的点分支。因为所在分支的提交不是当前合并分支的直接祖先节点，git必须做一些其他的工作。在这种情况下，Git会做一个三向合并，使用branch提示所指向的两个快照以及这两个快照的共同祖先。图3.16高亮了Git在这种情况下用于合并的三个快照。

![](//TODO: figure 3.16)

值得指出的是Git会决定作为合并基点的最佳公共祖先节点，这与CVS和Subversion（1.5之前的版本）不同，使用CVS和Subversion开发者合并时必须自己计算最佳的合并基点。Git的合并比其他系统要轻松得多。

注意合并完后，不再需要`iss53`分支。可以删除并手动关闭记录。

![](//TODO:figure 3.17)

`git branch -d iss53`

#### 基本合并冲突

有时候合并过程并不那么顺利。如果对正在合并的两个分支上的相同文件的相同部分做了不同修改，Git将不能清晰地进行合并。如果53号bug的修复修改了`hotfix`补丁的相同部分，在合并时会看到下面类似的冲突信息：

```
$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

Git没能自动创建一个新的合并提交，而是暂停合并等待解决冲突。如果希望在合并冲突时查看任意点未合并的文件，可以运行`git status`命令：

```
[master*]$ git status
index.html: needs merge
# On branch master
# Changed but not updated:
# (use "git add <file>..." to update what will be committed)
# (use "git checkout -- <file>..." to discard changes in working directory)
#
# unmerged: index.html
#
```

所有合并冲突没有解决的内容都会列成`unmerged`状态。Git会给有冲突的文件加上标准冲突解决标志以方便手动打开和解决冲突。这时候文件会包含如下的内容：

```
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
```

这意味着在`HEAD`中的版本（`master`分支，因为这是在运行`merge`命令时检出的分支）内容在这节内容的顶部，而`iss53`分支版本的内容如底部所示。为了解决冲突，需要选择上面冲突的顶部或底部内容，或者手动对内容进行合并。例如，可以通过将上面的整块内容替换成如下内容来解决冲突：

```
<div id="footer">
please contact us at email.support@github.com
</div>
```

冲突解决内容包含了顶部和底部的内容并且完全去除了`<<<<<<`和`======`以及`>>>>>`。解决完文件中的所有冲突后，通过运行`git add`命令来标记“已解决冲突（resolved）”状态（存储文件并且在Git中标记为`resolved`状态）。如果希望使用图形化工具来解决这些问题，可以运行`git mergetool`命令来启动合适的图形化合并工具解决冲突。

```
$ git mergetool
merge tool candidates: kdiff3 tkdiff xxdiff meld gvimdiff opendiff emerge vimdiff
Merging the files: index.html
Normal merge conflict for ’index.html’:
{local}: modified
{remote}: modified
Hit return to start merge resolution tool (opendiff):
```

退出合并工具后，Git会询问合并是否成功。可以使用`git status`命令来确认所有的冲突都已解决：

```
$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified: index.html
#
```

在确认合并无误并且所有冲突解决都已经存储后，可以输入`git commit`命令来结束合并提交。默认提交信息如下所示：

```
Merge branch ’iss53’
Conflicts:
index.html
#
# It looks like you may be committing a MERGE.
# If this is not correct, please remove the file
# .git/MERGE_HEAD
# and try again.
#
```

可以修改合并解决冲突信息来为以后的开发者提供有用的信息。

#### 分支管理

我们已经完成了创建、合并以及删除分支操作，现在可以接着了解一些方便的分支管理工具。

`git branch`命令不止可以创建和删除分支。如果运行`git branch`命令且没有使用任何选项，会得到当前所有分支的简单列表。例如：

```
$ git branch
  iss53
* master
  testing
```

注意在`master`分支前的`*`号，表示当前的检出分支。即如果在当前位置提交，`master`分支将会带着新的修改往前移。要查看所有分支的最后一次提交，可以使用`git branch v`命令。例如：

```
$ git branch -v
iss53 93b412c fix javascript issue
* master 7a98805 Merge branch ’iss53’
testing 782fd34 add scott to the author list in the readmes
```

查看当前分支状态的另一个有用的方法就是通过是否已合并到当前分支来过滤。`--merged`和`--no-merged`选项可以完成上述任务（需要1.5.6以上的Git版本）。例如，要查看已经合并到当前分支的分支，可以使用命令`git branch merged`：

```
$ git branch --merged
iss53
* master
```

因为之前合并过`iss53`分支，可以看到在输出的列表中有`iss53`分支。输出列表中没有`*`号前缀的分支都可以使用`git branch -d`命令来删除；因为这些分支的内容已经集成到了其他的分支，删除掉后不会丢失内容。

要查看当前分支还没有合并的分支内容，可以运行`git branch --no-merged`命令：

```
$ git branch --no-merged
testing
```

该命令会列出其他分支，因为它包含了当前未合并的内容，如果尝试使用`git branch -d`删除该分支会失败：

```
$ git branch -d testing
error: The branch ’testing’ is not an ancestor of your current HEAD.
```

如果确认想要删除当前分支，可以使用`git branch -D testing`命令。`-D`选项会强制删除分支。

####  分支工作流

##### Long-Running分支

因为Git使用了简单的三向合并，从一个分支持续较长时间合并到其他分支一般都很轻松。这意味着可以有几个总是开放的分支，并且可以用于开发流程的不同阶段；可以定期从其中一些分支合并到其他分支。

许多Git开发者的工作流都包括这种方法，例如只将完全稳定的代码放在`master`分支--可能只是已经或者将要发布的代码。这个分支可能有并行的`develop`分支或者`next`分支用于开发或者测试稳定性--不一定必须稳定，但是代码稳定性有保证就可以合并到`master`分支。这些分支也可以用于拉入（pull in）一些话题性的分支（例如时间较短的分支，就像前面提到的`iss53`分支），在确保这些分支通过了所有测试且不会引入bug后。

![](//TODO: figure 3.18)

![](//TODO: figure 3.19)

#### 话题分支(Topic Branch)

话题分支是创建用于单个特定功能或者相关工作的短期分支。以前的VCS基本上不可能有类似的分支，因为在VCS中创建和合并分支的成本都太高。但是在Git中一天多次创建、修改、合并、删除分支却非常常见。

