`Mac OS X`系统`LAMP`环境配置
---

> 本文讲解`Mac OS X`系统下`LAMP`(Linux + Apache + MySql + PhpMyadmin)环境的配置和常用操作。

### Apache

`OS X Mavericks`默认安装了`Apache`服务器，我们只需要使用`apachectl`（即`apache control`）控制即可。

运行`apachectl`命令可以看到帮助提示。

启动`apache`服务器的命令为：`sudo apachectl start`。

启动后我们可以通过`chrome dev tool`的`network`标签查看响应头中的`httpd`服务器信息：

![](http://gtms04.alicdn.com/tps/i4/T1S8vkFspfXXXUj06d-2872-1756.png)

或者通过命令`apachectl -v`或者`httpd -v`查看版本信息。

> 因为`apachectl`实际上相当于一个把命令转发给`httpd`服务器的快捷操作。

更多`apachectl`命令的详细用法，请参考[apple developer library](https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man8/apachectl.8.html)
> 注意：`apachectl`有两种模式，一种是作为`httpd`命令的简单前端管理工具，可以通过命令行参数对必须的环境变量进行简单设置。另一种模式是作为`SysV init`脚本，通过`start`，`restart`，`stop`等简单的单个单词参数来控制`httpd`服务。上面的链接只给出了第二种模式的帮助，第一种模式的帮助可以通过`man apachectl`查看。

我们可以通过上面的链接了解到查看`httpd`运行状态的方法：`apachectl status`，但是该功能必须开启了`httpd`的`mod_status`模块才能使用。

#### `mod_status`

`mod_status`是`Apache`的`httpd`服务自带的模块，用于获取服务器的状态信息，具体内容如下列表所示：

1.  当前的`worker`总数；
2.  空闲的`worker`总数；（即`idele`状态）
3.  查找每个`worker`的状态，`worker`执行的请求数以及`worker`服务的总字节数；
4.  总共服务的字节数；
5.  其他信息，例如`CPU`使用率，每秒请求数(`request per second`)，当前`hosts`以及正在处理的请求等。

`apache httpd`服务器在`OS X Mavericks`下的安装目录为`/etc/apache2`。对应的站点文件目录为`/Library/WebServer/Documents/`，注意到我上面的截图中打开`http://localhost`后显示的是`phpinfo()`的信息，因为我把站点文件目录下默认的`index.html`文件删除，并且添加了一个简单的`index.php`文件。该文件内容为：

```
<?php
  phpinfo();
?>
```

如果没有成功，那是因为没有启用安装的`php`，需要执行命令：`sudo vi
/etc/apache2/httpd.conf`，取消下面这行前面的注释`#`：

```
LoadModule php5_module libexec/apache2/libphp5.so
```

##### 配置用户级根目录

可以先编辑`/etc/hosts`文件配置一个可在本地使用的网址，如加入下面这样：

`127.0.0.1    yh.taobao.com`

这样就可以使用`yh.taobao.com`来访问本地的`apache`服务器了。

站点的系统级根目录为`/Library/WebServer/Documents/`。可以创建一个方便自己平常使用的站点目录。

`makdir ~/Sites-or-whatever-name-you-like`

其中`Sites-or-whatever-name-you-like`就是用户随意取的站点名字。为了方便，我们还是重命名为`Sites`好了。

`mv ~/Sites-or-whatever-name-you-like ~/Sites`

查看`/etc/apache2/users/`目录下的文件，创建一个当前用户使用的账号文件。

```
cd /etc/apache2/users/
sudo vi username.conf
```

其中`username`就是你当前使用的账户名称。

为该用户账户的站点地址配置访问权限，一般如下即可：

```
<Directory "/Users/leo/Sites/">
  Options Indexes MultiViews
  AllowOverride All
  Order allow, deny
  Allow from all
</Directory>
```

配置好以后，需要重启`httpd`服务器：`sudo apachectl restart`

可以通过`http://yh.taobao.com/leo`访问。

##### 启用重定向

编辑`httpd.conf`：`sudo vi /etc/apache2/httpd.conf`

在`<Directory "/Library/WebServer/Documents/">`这个段落里启用`AllowOverride all`。

##### 如何配置`mod_status`让`httpd`显示服务器状态？

打开`httpd.conf/apache2.conf`文件：

```
# vi httpd.conf
```

## 参考资料
[apache-server-status/](http://www.cyberciti.biz/faq/apache-server-status/)
[apple developer library](https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man8/apachectl.8.html)
[os-x-mavericks-and-apache/](http://brianflove.com/2013/10/23/os-x-mavericks-and-apache/)
[http://note.rpsh.net/posts/2013/11/27/osx-10-9-apache-server-php-mysql](http://note.rpsh.net/posts/2013/11/27/osx-10-9-apache-server-php-mysql)
[mysqladmin](http://dev.mysql.com/doc/refman/5.0/en/mysqladmin.html)
[mysql default user error 1045](http://forums.mysql.com/read.php?10,258593,258811)
