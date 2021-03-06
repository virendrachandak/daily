成功的Git分支模型
---

![](http://nvie.com/img/2009/12/Screen-shot-2009-12-24-at-11.32.03.png)

# 为什么选择Git？

[参考1](http://whygitisbetterthanx.com/)和[参考2](http://git.or.cz/gitwiki/GitSvnComparsion)。

[svn参考](http://svnbook.red-bean.com/)

[Git参考资料](http://pragprog.com/titles/tsgit/pragmatic-version-control-using-git)

# 去中心化但是被中心化了

我们的库设置了一个中心“truth”仓库，可以很好地用于这个分支模型。注意：这个库只是被认为是中心的（因为Git是DVCS，即Distributed Version Control System（分布式版本控制系统），因此从技术角度来说没有中心库的概念）。我们将这个库称为`origin`，因为这是所有Git用户都熟悉的名称。

![](http://nvie.com/img/2010/01/centr-decentr.png)

所有开发者都向`origin`拉取和推送。但是除了中心化的拉取-推送关系，开发者也可以从其他端点拉取修改来形成子团队。例如，两个或多个开发者一起开发一个大的新功能时这样做会非常有用。他们可以将确定好的修改推送到`origin`。在上图中有`Alice`和`Bob`，`Alice`和`David`以及`Clair`和`David`分别组成的三个子团队。

从技术上来说，这意味着`Alice`定义了一个远程Git分支，名为`bob`，指向`Bob`的Git库。反之亦然。

# 主分支

这种开发模型的核心是从已有模型获得灵感的。中心库包含两个包含无限生命时间的主分支：

* master
* develop

开发者应该都熟悉的`origin`上的`master`分支，与其并列的另一个分支是`develop`分支。

`origin/master`被认为是主分支，它的`HEAD`代码总是可以用于生产环境的。

`origin/develop`主分支的`HEAD`源码总是下次要发布的最新的开发代码。也有人将这样的分支称为`integration branch`（集成分支）。这是构建自动`nightly`构建版本的分支。

`develop`分支的源码稳定且能够发布时，所有的修改都会被合并到`master`分支，而且会加上一个发布号码标签。稍后会讲到其中的细节。

因此，每次新的修改被合并回`master`分支时，从定义上来说都是一次新的生产发布。我们倾向于严格对待这样的操作，因此从理论上来说，我们可以使用Git钩子脚本，每次`master`有提交时都自动构建并发布软件到生产服务器。

# 支持分支

除了`master`和`develop`主分支，我们的开发模型还使用了一些支持分支来帮助团队成员之间的平行开发，简化特征版本的跟踪，为生产发布做准备，并帮助快速解决线上生产问题。和主分支不同，这些分支通常只有有限的生命时间，因为它们最终都会被删除。

我们可能使用的不同类型分支有：

* 特征分支（`Feature Branches`）
* 发布分支（`Release Branches`）
* 修补分支（`Hotfix Branches`）

这些分支都有特定目的，而且会有严格的规则来限定它们起始分支以及必须合并到哪些目标分支。我们马上详细讲解。

从技术上说这些分支没有任何“特殊性”。这些分支的类型是根据我们的用法来分类的。当然它们都是一般的旧Git分支。

# 特征分支（`Feature Branches`）

特征分支可以来自`develop`分支
必须合并到`develop`分支
分支命名规范：除了`master`，`develop`，`release-*`以及`hotfix-*`之外的任何名称。

特征分支（有时候也被称为话题分支——`Topic Branches`）被用于开发即将到来或者以后将发布的新特征。在开始一个特征的开发时，将集成该特征的目标发布版本可能仍然未知。特征版本的本质是，只要特征仍在开发，特征分支就存在，但是最终特征分支会被合并到`develop`分支（来明确地将新特征加入发布）或者丢弃掉（在实验结果让人失望时）。

![](http://nvie.com/img/2009/12/fb.png)

特征分支一般只在开发者库里，而不在`origin`分支上。

**创建一个特征分支**

在开始使用特征分支前，从`develop`分支分出一个新分支：

```
git checkout -b myfeature develop
切换到myfeature新分支。
```

**在`develop`分支上集成已完成的特征分支**

已完成的特征分支可以合并到`develop`分支并且添加到即将发布的分支：

```
$ git checkout develop
切换到develop分支
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557C
(修改简述)
$ git branch -d myfeature
删除myfeature分支（05e9557）
$ git push origin develop
```

`--no-ff`标记会使得合并时总创建新的提交对象，即使合并可以通过快速向前（`fast-forward`）执行。这样可以避免丢失特征分支的历史信息并将所有提交分组后添加到特征分支。比较：

![](http://nvie.com/img/2010/01/merge-without-ff.png)

上图所示的后一种情况，从Git历史看不出哪些提交对象实现了特征——需要手动阅读所有日志信息。恢复一个完整的特征（即一组提交），在后种情况下确实让人头痛，而如果用了`--no-ff`标记可以很轻松的做到。

是的，这样会创建更多（空）提交对象，但是收益比成本要大得多。

不幸的是，还没有找到办法将`--no-ff`变成`git merge`的默认行为，不过真的应该有。

# 发布分支

可以来自分支：`develop`
必须合并回`develop`和`master`分支
分支命名规范：`release-*`

发布分支为新的生产发布准备提供了支持。发布分支支持发布前的小bug修复，以及准备发布元数据（版本号、构建日期等）。在发布分支上做了这些工作，`develop`分支就可以“干净地”接受下一次大发布的特征了。

从`develop`分支分出新发布分支的关键时刻是`develop`（几乎）反映了新发布期望的状态。至少这个时候所有将要构建发布的所有目标特征都必须合并到`develop`分支。以后的特征可以不用——这些特征必须等到分出了发布分支。

**创建一个发布分支**

发布分支从`develop`分支创建。例如，假设1.1.5是当前的生产发布版本而且接下来会有重大的发布。`develop`分支的状态为“可以发布”而且我们决定了下一个发布版本会是版本1.2（而不是1.1.6或者2.0）。因此我们开出分支并且给发布分支取一个反映了新版本号的名字：

```
git checkout -b release-1.2 develop
切换到新分支release-1.2
./bump-version.sh 1.2
文件修改成功，版本号跳到1.2
git commit -a -m 'Bumped version number to 1.2'
[release-1.2 74d9424] Bumped version number to 1.2
1 files change, 1 insertions(+), 1 deletions(-)
```

创建并切换到新分支后，修改了版本号。这里的`bump-version.sh`是一个虚拟的shell脚本，用于修改工作目录中的文件来反映新版本。（当然这只是手动修改——要点在于有文件改变）然后，修改后的版本号会被提交。

新的分支可能会存在一段时间，直到确认可以发布。这段时间里bug修复可以被应用到该分支（而不是develop分支）。严禁此时添加大的新特征。大的新特征必须合并到develop分支，因此，必须等到下次大发布。

## 结束一个发布分支

当发布分支真的准备发布时，需要执行一些操作。首先，发布分支会被合并到master分支（因为master上的所有提交从定义上来说都是一次新发布，记住！）。接着，master上的提交必须加上标记，以供今后历史版本的轻松引用。最后，发布分支上所做的修改必须合并回develop分支，这样以后的发布也包含这些bug修复。

前两步在Git中如下所示：

```
git checkout master
切换到master分支
git merge --no-ff release-1.2
递归合并
（修改总结）
git tag -a 1.2
```

这样就完成了发布，并且为以后的引用加上了标签。

**编辑：**有可能希望使用`-s`或者`-u <key>`标记来对标签进行加密。

要在发布分支保留修改，需要将这些修改合并回`develop`分支。在Git中的操作如下：

```
git checkout develop
切换到develop分支
git merge --no-ff release-1.2
递归合并。
（修改的总结）
```

以上步骤有可能导致合并冲突（非常有可能，因为我们修改了版本号）。如果有合并冲突的话，修改冲突后再提交。

这样就真正完成了发布而且可以删除发布分支，因为不再需要了：

```
git branch -d release-1.2
删除分支release-1.2（ff452fe）
```

# 修补分支

可以来自：`develop`分支
必须合并回`develop`和`master`分支
分支命名规范：`hotfix-*`

修复分支和发布分支非常像，都已用于为新的生产发布做准备，虽然修补分支是不在计划之中的。修复分支来自对线上生产版本的非期待状态立即行动的需求。当生产版本有严重的bug必须马上修复时，可以从标记了生产版本的master分支上的相应标签开出一个修补分支。

![](http://nvie.com/img/2010/01/hotfix-branches1.png)

**创建修复分支**

修补分支从`master`分支创建。例如，假设1.2版本是当前在线运行的生产发布版本，而且因为一个严重的bug引发了问题。但是在`develop`上的修改还不稳定。那么我们可以开出一个修补分支并开始修复问题：

```
git checkout -b hotfix-1.2.1 master
切换到新版本hotfix-1.2.1
./bump-version.sh 1.2.1
文件修改成功，版本号修改为1.2.1
git commit -a -m 'Bumped version number to 1.2.1'
[hotfix-1.2.1 41e6abb] Bumped version number to 1.2.1
1 files changed, 1 insertion(+), 1 deletions(-)
```

不要忘记在开出分之后修改版本号。

然后，修改bug并且将修复提交到一个或多个分开的commit中。

```
git commit -m 'Fixed server production problem'
[hotfix-1.2.1 abbe5d56] Fixed sever production problem
5 files change, 32 insertions(+), 17 deletions(-)
```

**结束一个修补分支**

结束后，bug修复必须合并回`master`分支，但是也需要合并回`develop`分支，已保证在下次发布时也带上了bug修复。这和发布版本结束时完全类似。

首先，更新`master`然后标记发布：

```
git checkout master
切换到`master`分支
git merge --no-ff hotfix-1.2.1
递归合并。
（修改总结）
git tag -a 1.2.1
```

**编辑：**也可能希望使用`-s`或者`-u <key>`标记来加密标签。

接着，在`develop`中也包含bug修复：

```
git checkout develop
切换到develop分支
git merge --no-ff hotfix-1.2.1
递归合并。
（修改总结）
```

一种意外的规则是，在当前发布版本存在时，修补所做的修改必须合并到发布分支，而不是`develop`分支。将修补合并回发布分支会在发布分支完成时，会使得修复最终也被合并到`develop` 。（如果develop分支的工作马上需要这些修补而且不能等待下次发布完成，也可以安全地将修补合并到`develop`分支）

最后，删除临时分支：

```
git branch -d hotfix-1.2.1
从hotfix-1.2.1删除分支
```

# 总结

虽然这种分支模型没什么新的东西，本文开始的大部已经证实在项目中非常有用。它形成了优雅的模型，能够轻松的理解，并且允许团队成员能够同时理解开发共享和发布流程。

[高质量PDF](http://nvie.com/files/Git-branching-model.pdf)下载了解快速参考内容。

### 参考资料
<http://nvie.com/posts/a-successful-git-branching-model/>
