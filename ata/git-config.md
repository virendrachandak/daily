强大的git config
---

> 俗话说得好，”有事找警察“，在*nix系统中，遇到编码等问题，首先想到的一定是配置文
> 件。万能的Git也不例外，在Git中有任何用得不爽的地方，就从`git config`着手去解决
> 吧。本文介绍最常见也最简单的一些Git配置。

### Git log中文乱码

Git log中文乱码有两种情况，一种是因为在`commit`时提交的日志消息编码不正确，一种
是因为git log输出的内容编码不正确。下面分别介绍：

1. 提交日志编码问题：

`git config --global i18n.commitEncoding utf-8`

2. 日志输出编码不正确：

`git config --global i18n.logOutputEncoding utf-8`

> 简单解释下：`git config`是调用`git`的`config`命令。`--global`选项表示进行全局
> 设置，即在`%HOME%`(*nix下的用户目录)中的`.gitconfig`文件中写入配置内容。通过以
> 上配置后假如的内容应该为：
> ```
> [i18n]
>       commitEncoding = utf-8
>       logOutputEncoding = utf-8
> ```
> `i18n`表示是`internationalization`的缩写，表示对国际化编码的支持。在这项大配置
> 项下有许多配置小项，例如`commitEncoding`和`logOutputEncoding`。
> 最后的`utf-8`就是这些具体配置项的值了。

### 总结

通过以上非常简答的例子，我们就知道怎么去”倒腾“git配置了，只要查找[git config文档](http://git-scm.com/docs/git-config)
就能搞定所有配置了。


>  稍微需要注意的一点是：git配置分为种：全局的、用户的和项目的。例如，刚才的`.gitconfig`文件中的配置就是针对某个用户做的全局配置。


### 参考资料

[git config](http://git-scm.com/docs/git-config)
