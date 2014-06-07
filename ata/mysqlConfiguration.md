`MySQL`配置
---

`MySQL Unix socket`的路径与`Mac OS X`的版本以及安装类型有关，主要有三种：

1.  安装类型：`MySQL`安装包（`dmg`包），`Socket`位置：`/tmp/mysql.sock`；
2.  安装类型：`MySQL`官网的`tarball`文件，`Socket`位置：`/tmp/mysql.sock`；
3.  安装类型：`Mac OS X服务器版`自带的`MySQL`，`Socket`位置：`/var/mysql/mysql.sock`；

为了避免问题，需要修改应用中用到的`socket`的配置（例如，修改`php.ini`），或者使用`MySQL`配置文件和[`socket`](http://dev.mysql.com/doc/refman/5.6/en/server-options.html#option_mysqld_socket)选项来配置`socket`的路径。详细内容可参考[服务器命令选项](http://dev.mysql.com/doc/refman/5.6/en/server-options.html)

需要为`MySQL`目录和数据创建指定的`mysql`用户。可以通过`Directory
Utility`实现，而且需要有`mysql`用户。对于单用户模式，系统的
`/etc/passwd`文件中应该有`_mysql`条目。

如果`MySQL`启动时报`Insecure startup item disabled`错误，使用下面的步骤。为系统设置合适的路径名：

  a.  使用命令修改`mysql.script`：

  ```
  sudo /Applications/TextEdit.app/Contents/MacOS/TextEdit /usr/local/mysql/support-files/mysql.server
  ```

### 参考资料
[`MySQL`官方文档](http://dev.mysql.com/doc/)
