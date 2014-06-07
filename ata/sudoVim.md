`MacVim`小技巧--`sudo`和使用`git`
---

> 本文有三部分主要内容：1.`macvim`的安装，主要解决从命令行启动`gui macvim`的
> 问题；2.`sudo`保存需要特殊权限的文件修改。3.在`macvim`下使用`git`。

# `macvim`的简单安装说明以及从`terminal`的启动

最简单的安装方法：

1.  安装`home brew`:

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

> 参考[brew官网](http://brew.sh)

2.  使用`brew install macvim`命令安装`macvim`。

这样就可以通过运行`mvim`来从命令行启动带图形界面的`macvim`了。

# `macvim`获取`sudo`权限

1.  `Su-write`（`sudo`写入）

有时候需要修改一些需要`root`权限的文件，例如`/etc`下面的文件。但是当我们修改完保存的时候，会得到`permission denied`错误。这时候可以按照下面的内容来获取临时的`root`权限保存修改内容。

> 谨慎使用！

## 建议1：

如果没有权限执行`:w`写入命令，使用下面的命令：

```
:w !sudo tee % > /dev/null
```

也可以创建一个命令来让`:W`调用`sudo`：

```
command W w !sudo tee % > /dev/null
```

或者，在事先了解了问题的情况下，可以使用命令：

`sudoedit path_to_file`或者`sudo -e path_to_file`

## 建议2：

下面的函数会将当前的文件保存到一个临时文件，然后复制新文件来替换原始文件。它会保存原始文件的模式，虽然文件已经被重写了。

```
function Suedit()
  let fname=tempname()
  exe 'w '.fname
  let owner=system('stat -c%U;%G '.expand("%"))
  let modes=system('stat -c%a '.expand("%"))
  exec '!sudo cp '.fname.' '.expand("%")
  exec '!sudo chmod '.modes.' '.expand("%")
  exec '!sudo chown '.owner.' '.expand("%")
endfunction
```

> 注意：这个函数没有检查软链接（`symlink`）。如果有`symlink`的话，会被它的`modes`，即`777`替换。

## 建议3：

下面的快捷键映射会将文件保存到`/tmp`然后覆盖掉正在编辑的文件：

```
nnoremap <leader>es :w! /tmp/sudoSave \| let $fileToSave=expand('%') \| let $fileToSaveBackup=expand('%').'~' \| !sudo cp $fileToSave $fileToSaveBackup && sudo cp /tmp/sudoSave $fileToSave<CR><ESC>:e!<CR> 
```

> 注意：这条命令会重新加载文件；编辑历史会丢失（即：`undo`将失效）
> 即使设置了`nobackup`，也会创建一份备份文件。

## 建议4：

使用`vim script`[sudo.vim](http://www.vim.org/scripts/script.php?script_id=729)或者[SudoEdit.vim](http://www.vim.org/scripts/script.php?script_id=2709)。

> 在使用`vundle`添加`sudo.vim`插件时，提示`^M`字符相关的错误，但是用`macvim`打开插件文件查看却没有。这时候需要使用如下步骤：
> 1.  `mvim -b ~/.vim/bundle/SudoEdit.vim/plugin/SudoEdit.vim`，以查看`binary`和`executable`文件的格式打开插件文件；
> 2.  `:set list`查看不可见字符；这时候我们就能看到这些有问题的`^M`字符了。
> 3.  `:%s/^M//g`替换掉所有`^M`字符。注意，`^M`是按住`Control+v`再加上`enter`键打出来的。

## 参考资料
[Su-write](http://vim.wikia.com/wiki/Su-write)

# 在`macvim`中使用`git`

首先，使用`vundle`安装`fugitive`插件，如果安装了[`vundle`](https://github.com/gmarik/vundle)，只需要在`$MYVIMRC`（即`vim`的配置文件，通常为`~/.vimrc`）中添加下面这行就可以了：

```
Bundle 'tpope/vim-fugitive'
```

> `vundle`的安装配置非常简单，参考我上面给出的链接的文档直接安装即可，这里不在赘述。

安装完成以后，如果我们当前打开了某个`git`仓库里的文件，只需要输入下面的命令就可以查看当前的`git`库状态：

```
:Gstatus
```

而要添加文件到`HEAD`区域，只需要运行：

`:git add .`就可以了。

然后提交`:Gcommit`。So Easy!这样就不用在`terminal`和`macvim`之间切来切去了。
