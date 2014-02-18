使用vim技巧
---
1.  在vim出问题时启动没有加载插件的vim

```shell
gvim -u NONE -N
```

> `-u NONE`标志在vim启动时不读写或加载`vimrc`文件。
> `-N`用于补充上一步，因为上一步vim启动后会进入`compatible mode`（兼容模式），而
> 兼容模式下vim会有很多有用的功能不能用，因此加上`-N`选项让vim进行
> `noncompatible`模式。

要激活vim内置的脚本，需要用到以下最简单的配置脚本(假设保存到文件`essential.vim`)，或者称为`factory settings(出厂设置)`：

```shell
set noncompatible
filetype plugin on
```

在启动vim时，可以通过下面的命令只加上上面提到的最简单配置脚本：

```shell
gvim -u path/to/essential.vim
```
