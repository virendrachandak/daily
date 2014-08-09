Git分支模型
---

![](http://nvie.com/img/2009/12/Screen-shot-2009-12-24-at-11.32.03.png)

# 为什么选择Git？

[参考1](http://whygitisbetterthanx.com/)和[参考2](http://git.or.cz/gitwiki/GitSvnComparsion)。

[svn参考](http://svnbook.red-bean.com/)

[Git参考资料](http://pragprog.com/titles/tsgit/pragmatic-version-control-using-git)

# 去中心化但是中心化了

我们使用的用于分支模型的库设置是一个中心“truth”库。注意：这个库只是被认为是中心的（因为Git是DVCS，即Distributed Version Control System（分布式版本控制系统），因此从技术角度来说没有中心库的概念）。我们将这个库称为`origin`，因为所有Git用户都熟悉该名称。

![](http://nvie.com/img/2010/01/centr-decentr.png)

开发者拉取和推送到`origin`。但是除了中心化的拉取-推送关系，开发者也可以从其他端点拉取修改来形成子团队。例如，两个或多个开发者一起开发一个大的新功能时非常有用，这样他们就可以在工作稳定之后再推送修改。上图中有`Alice`和`Bob`，`Alice`和`David`以及`Clair`和`David`分别组成的三个子团队。

从技术上来说，这意味着`Alice`定义了一个远程Git分支，名为`bob`，指向了`Bob`的Git库。反之亦然。

# 主分支

从核心上看，这样的开发模型是从已有的模型获得灵感的。中心库包含两个包含无线生命时间的主分支：

* master
* develop

和开发者熟悉的`origin`上的`master`分支并列的是另一个被称为`develop`的分支。

`origin/master`被认为是主分支，其中的`HEAD`代码总是可以用于生产环境的。

`origin/develop`主分支的`HEAD`源码总是下次要发布的最新的开发代码。有人也将这样的分支称为`integration branch`（集成分支）。这是构建自动`nightly`构建版本的源码分支。

`develop`分支的源码稳定了并且能够发布时，所有的修改都会被合并到`master`分支，然后加上一个发布数字的标签。稍后会讲述这里的细节。

因此，每次有新的修改合并回`master`分支时，从定义上来说都是新的生产发布版。这样的操作一定要严格，因为从理论上来说，通过使用Git钩子脚，每次`master`分支上有新的提交时，都会自动构建源码并发布到生产服务器。

# 支持分支

除了`master`和`develop`主分支，我们的开发模型还使用了一些支持分支来帮助团队成员之间的平行开发，减轻跟踪特征版本的负担，并且为了生产发布做好准备，也能够帮助快速解决线上生产问题。和主分支不同，这些分支通常只有有限的生命时间，因为它们最终都会被删除。

我们可能使用的不同类型分支有：

* 特征分支（`Feature Branches`）
* 发布分支（`Release Branches`）
* 修补分支（`Hotfix Branches`）

这些分支都有一个特定的目标，而且没有严格规则限定它们来自那些分支，或者必须合并到哪些分支。马上来详细讲解。

从技术上说这些分支没有任何“特殊性”。这些分支的类型是根据我们的用法来分类的。当然它们都是一般的旧Git分支。

# 特征分支（`Feature Branches`）

许多特征分支来自`develop`分支，而且必须合并会`develop`分支。分支命名规范：除了`master`，`develop`，`release-*`以及`hotfix-*`之外的任何名称。

特征分支（有时候也被称为话题分支——`Topic Branches`）被用于开发即将到来或者以后将发布的新特征。在开始特征开发时，该特征的目标发布版本可能仍然还不知道。本质上，只要特征仍在开发，特征分支就一直存在，但是最终特征分支会被合并会`develop`分支（确定将新特征加入即将发布的版本）或者丢弃掉（实验结果让人失望时）。

![](http://nvie.com/img/2009/12/fb.png)

一般的特征分支只存在开发者库中，而不在`origin`上。

## 创建一个特征分支

在开始使用特征分支前，从`develop`分支分出一个新分支：

`git checkout -b myfeature develop`

上面的命令会切换到新的`myfeature`分支。

## 在`develop`分支上集成一个完成的特征分支

完成的特征分支可以合并到`develop`分支并且添加到即将发布的版本中：

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

`--no-ff`标记会让合并创建一个新的提交对象，即使合并可以通过快速向前（`fast-forward`）执行。这样可以避免丢失特征分支的历史信息并且将所有添加到特征分支的提交组合起来。比较：

![](http://nvie.com/img/2010/01/merge-without-ff.png)

上图所示的后面一种情况，从Git历史看不出哪些提交对象实现了特征——需要手动阅读所有的日志信息。恢复一个完整的特征（即一组提交），在后面的情况下也很让人头痛，而如果使用了`--no-ff`标记的话会很容易完成。

是的，这样会创建更多的（空）提交对象，但是收益比成本要大得多。

不幸的是，还没有办法将`--no-ff`变成`git merge`的默认行为，不过真的应该有。

# 发布分支

可能来自的分支：`develop`。
必须合并回`develop`和`master`分支。
分支命名规范：`release-*`。

发布分支为新的生产发布准备提供了支持。

### 参考资料
<http://nvie.com/posts/a-successful-git-branching-model/>
