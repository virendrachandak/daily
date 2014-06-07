`Ubuntu`上的`LAMP`应用栈安装配置
---
1.  基础介绍

* 什么是`LAMP`？

`LAMP`其实是一套应用软件组合的简称，即`Linux`（操作系统）+`Apache`（WEB服务器）+`MySql`（数据库服务器）+`PHP`（编程语言）。这是目前互联网上最常见的应用软件栈之一。我们访问到的大部分网站也是基于这样的应用软件组合（通常称为应用软件栈，或者`Application Stack`）。其中每种软件都不是唯一的，例如`Linux`系统可能是各种发行版，也可能是`Unix`系统的发行版，所以，准确地说其中的`L`更应该是各种`*nix`系统。同理，`Apache`服务器也可能被`nginx`等代替。

本文介绍`ubuntu`环境下`lamp`的安全和配置，适用于`ubuntu`的各个版本。

2.  安装

一次性安装，使用如下命令：

```
$sudo apt-get update
$sudo apt-get install lamp-server^
```

> 如何删除？

```
sudo apt-get remove apache2 apache2-mpm-prefork apache2-utils apache2.2-common libapache2-mod-php5 libapr1 libaprutil1 libdbd-mysql-perl libdbi-perl libnet-daemon-perl libplrpc-perl libpq5 mysql-client-5.5 mysql-common mysql-server mysql-server-5.5 php5-common php5-mysql
```

要删除`debconf`数据，在删除时加上`purge`选项。要清除`apache`的配置，在删除包后再手动删除`/etc/apache2/`文件夹。

可能还需要手动过滤下面的包：

```
mysql-client-core-5.5 mysql-server-core-5.5
```

### 安装`apache2`

如果只安装`apache2`服务器，可以使用命令：

`sudo apt-get install apache2`

安装好以后重启：

`sudo /etc/ini.d/apache2 restart`

> `mac`下默认安装了`apache2`服务器，并通过`apachectl`控制。

通过访问[http://localhost](http://localhost)来确认是否已安装成功。如果能够访问到则说明成功了。默认情况下会显示`It works!`。这是`/var/www/index.html`的内容，即`apache2`服务器默认的首页。

### 故障排除

故障显示：`apache2: Could not determine the server's fully qualified domain name, using 127.0.0.1 for [ServerName](https://help.ubuntu.com/community/ServerName)`

在新版的`apache`中，使用文本编辑器，例如`sudo nano`或者`gksudo gedit`来编辑配置文件。

> 注意：`gksu`需要手动安装`sudo apt-get install gksu`。

`sudo nano /etc/apache2/apache2.conf`或者`gksu "gedit /etc/apache2/apache2.conf"`，在文件的`global configuration`小节加入下面这行内容：

`ServerName localhost`

在较老版本的`apache`中配置文件可能不同，需要使用编辑器来添加一个新文件，例如：

`sudo nano /etc/apache2/conf.d/fqdn`

或者

`gksu "gedit /etc/apache2/conf.d/fqdn"`

然后在新建的文件中加上`ServerName localhost`。

上面的步骤也可以通过一行命令来完成：

`echo "ServerName localhost" | sudo tee /etc/apache2/conf.d/fqdn`

### `Virtual Hosts`

`apache2`有`sites`的概念，即`apache2`读取的独立配置文件。这些文件放在`/etc/site-available`下。默认情况下，只有一个`000-default`的站点可用，这就是访问`http://127.0.0.1`时的那个站点。可以有多个不同的站点配置，并且只激活需要的站点。

例如，我们希望默认站点为`/home/user/public_html/`，必须创建一个新的`site`并在`apache2`中启用。

创建一个新的站点的步骤为：
1.  先复制默认的站点`sudo cp /etc/apache2/site-available/000-default.conf /etc/apache2/site-available/mysite.conf`。
2.  在文本编辑器中编辑一个新的配置文件（使用`sudo nano`或者`gksudo gedit`。例如`gksudo gedit /etc/apache2/site-available/mysite.conf`。
3.  将`DocumentRoot`指向新的位置。例如`/home/user/public_html`。
4.  修改`Directory`指令，将`<Directory /var/www>`替换成`<Directory /home/user/public_html>`。
5.  也可以为每个站点创建分开的日志（`log`）。通过修改`ErrorLog`和`CustomLog`指令来完成。
6.  保存文件的修改。

接下来，我们需要禁用旧的站点，并启用新的站点。`Ubuntu`提供了两个小工具来处理：`a2ensite`（`apache2 enablesite`）和`a2dissite`（`apache2disable site`）。

`sudo a2dissite 000-default && sudo a2ensite mysite`

最后，重启`apache2`：`sudo /etc/init.d/apache2 restart`。

如果没有创建`/home/user/public_html/`文件夹的话，会收到警告。要测试新站点，在`/home/user/public_html/`目录下新建一个文件，使用下面的命令：

`echo 'This is a newly activated site' > /home/user/public_html/index.html`

访问[http://localhost](http://localhost)就可以看到效果了。

### 安装`PHP 5`

使用命令`sudo apt-get install libapache2-mod-php5`。通过如下命令启用该模块`sudo a2enmod php5`。该命令会创建一个指向`/etc/apache2/mods-available/php5`的软链接`/etc/apache2/mods-enabled/php5`。

要检查`php5`是否已经安装好，在`/var/www`或者当前启用的站点目录下新建一个`index.php`文件，文件内容为：

```
<?php
phpinfo();
?>
```

这时候访问[http://localhost/index.php](http://localhost/index.php)，如果能看到`php`信息，则说明安装成功，如果是弹出一个下载窗口询问是否下载`index.php`文件，说明`apache2`服务器上的`php`模块还没有配置成功。需要安装`libapache2-mod-php5`或者删除已经安装但是没有成功的这个模块内容并重新安装。其他可能的失败原因还有文件权限不对等，可以自行`Google`解决。

> 建议最好看官方文档解决。

### `php.ini`开发环境`vs`生产环境



### 参考资料
[ApacheMySqlPHP--ubuntu community](https://help.ubuntu.com/community/ApacheMySQLPHP)
