`mac os x`安装`maven`
---

1.  下载`maven`的压缩包；
2.  解压，将`maven`解压后的文件夹移动到`/usr/local`文件夹；
3.  配置环境变量；

编辑`~/.bash_profile`或者`~/.zshrc`，加入下面的内容：

```
export M2_HOME=/usr/local/apache-maven-3.0.5
export PATH=${PATH}:${M2_HOME}/bin``
```
