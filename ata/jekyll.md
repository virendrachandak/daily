使用`jekyll`和`github page`搭建个人博客基础教程
---

> 本文在`OS X`系统环境下实际操作成功。`Window`及其他`*nix`发行版我会尽量涉及，如有遗漏或不全请自行`google`解决方案。

### 安装

使用如下命令安装`jekyll`。

> 注意：`OS X`和`*nix`系统下需要先确认安装了`ruby`和`gem`，并且需要加上`sudo`，否则会因`permission denied`（权限不足）这样的错误而失败。

```
~$ gem install jekyll
~$ jekyll new yourBlogName
~$ cd yourBlogName
~/yourblogname $ jekyll serve
```

这样，你就可以通过访问`http://localhost:4000`这个地址在本地看到通过`jekyll`运行的博客站点了。

> tip:众所周知的原因，`gem`的官方源被X了，可以选择替换成淘宝的`gem`地址，具体步骤参考[gem.taobao.org](http://ruby.taobao.org/)。

### 参考资料
[jekyll官网](http://jekyllrb.com/)
