`Mac OS X Mavericks` `LAMP`应用栈安装配置
---

#  `apache`
----

自带，直接使用`apachectl`控制即可。需要`sudo`，常用命令为`start`，`restart`，`stop`以及`configtest`。

如果`start`后访问[`http://localhost`](http://localhost)不成功，极有可能是配置有问题，这时可以通过使用`sudo apachectl configtest`来找到原因。

#  `php`
----

编辑`/etc/apache2/httpd.conf`来编辑`apache2`服务器的配置。删除下面语句前的注释符号`#`即可启用`php`：

```
LoadModule php5_module libexec/apache2/libphp5.so
```

检测是否开启成功的方法，访问`/Library/WebServer/Documents/`目录，新建一个文件`index.php`（使用命令`sudo touch index.php`），在这个文件里写入如下内容：

```
<?php
phpinfo();
?>
```

然后访问[`http://localhost/index.php`](http://localhost/index.php)，如果能看到页面显示了`php`的相关信息，说明`php`启用成功。

### 总结下`OS X Maverciks`上服务器的最基本的配置情况

* 配置文件`/etc/apache2/httpd.conf`；
* 网站文件目录`/Library/WebServer/Documents/`；
* `apache2`服务器控制命令`apachectl`（注意：需要`sudo`权限）；
> 常用选项`start`，`restart`，`stop`和`configtest`。
* `apache2`常用配置选项：
> **todo**

#  数据库（`MySql`或者`mongodb`）
----

## `MySQL`

[`MySQL community server`下载地址](http://dev.mysql.com/downloads/mysql/)

## `mongodb`
