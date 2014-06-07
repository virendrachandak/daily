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

[`MySQL community server`下载地址](http://cdn.mysql.com/Downloads/MySQL-5.6/mysql-5.6.19-osx10.7-x86_64.dmg)

[官方说明](http://dev.mysql.com/doc/refman/5.6/en/macosx-installation-prefpane.html)

注意：这个安装包里包含4部分内容：

1.  `mysql-$version-osx$version-x86_64.pkg`：`MySQL`服务器的安装包；
2.  `MySQL.prefPane`：`MySQL`设置栏，会在`OS X`系统的设置中显示；
3.  `MySQLStartupItem.pkg`：`MySQL`启动项；
4.  `ReadMe.txt`：说明文档。

只要点击安装即可（需要在`security & privacy`设置中选择`allow apps downloaded from anywhere`）。如果之前安装过，需要手动删除，具体方法为：


1.  先停止所有mysql有关进程。
2.  执行下面的删除命令：

  ```
  sudo rm /usr/local/mysql
  sudo rm -rf /usr/local/mysql*
  sudo rm -rf /Library/StartupItems/MySQLCOM
  sudo rm -rf /Library/PreferencePanes/My*
  vim /etc/hostconfig and removed the line MYSQLCOM=-YES-
  rm -rf ~/Library/PreferencePanes/My*
  sudo rm -rf /Library/Receipts/mysql*
  sudo rm -rf /Library/Receipts/MySQL*
  sudo rm -rf /var/db/receipts/com.mysql.*
  ```

  > [参考资料](http://stackoverflow.com/questions/1436425/how-do-you-uninstall-mysql-from-mac-os-x)

`MySQL`的启动项安装在`/Library/StartupItems/MySQLCOM/`目录。`Mac OS X`下的启动项安装时会在系统配置文件`/etc/hostconfig`中加入一个变量`MYSQLCOM=-YES-`。如果要禁止`MySQL`在系统启动时自动启动，将`YES`改为`NO`即可。

安装完毕后，可以通过在`terminal`窗口中运行如下命令启动`MySQL`服务器：

  1.  `sudo /Library/StartupItems/MySQLCOM/MySQLCOM start`
  > 输入密码。按`Control+D`或者输入`exit`退出`terminal`。
  2.  如果没有安装`startup item`，通过下面的命令来运行：
  ```
  shell> cd /usr/local/mysql
  shell> sudo ./bin/mysql_safe
  (输入密码)
  (按`Control+z`)
  shell> bg
  (按`Control+D`或者输入`exit`退出`terminal`。)
  ```

通过运行`/usr/local/mysql/bin/mysql`命令来连接到`MySQL`服务器。

可以安装`MySQL workbench`来方便`MySQL`操作，[下载地址](http://cdn.mysql.com/Downloads/MySQLGUITools/mysql-workbench-community-6.1.6-osx-i686.dmg)。
安装了`workbench`后，还可以安装[`utilities`](http://cdn.mysql.com/Downloads/MySQLGUITools/mysql-utilities-1.4.3-osx10.7.dmg)。

`MySQL`的初始账户密码为空，在启动服务器后，应该为初始账号做一些安全设置。[参考资料](http://dev.mysql.com/doc/refman/5.0/en/default-privileges.html)

### 设置`alias`

```
alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
```

这样就可以直接通过`mysql`和`mysqladmin`另个命令来操作和连接`MySQL`数据库了。

> 更好的方法是将`/usr/local/mysql/bin`加到`PATH`环境变量。具体内容可参考[`MySQL`程序调用--Invoking MySQL Programs](http://dev.mysql.com/doc/refman/5.0/en/invoking-programs.html)。

以上内容参考自[官方文档](http://dev.mysql.com/doc/mysql-macosx-excerpt/5.0/en/macosx-installation.html)

### 安全

`MySQL`安装过程中会设置一个`mysql`数据库，这个数据库中包含了`grant`表，`mysql.user`中的`grant`表定义了初始`MySQL`用户账户以及它们的访问权限：

  * 一些账户的用户名为`root`，初始密码为空。
  * 一些账户允许匿名用户使用。

要查看`mysql.user`表中存在的账户并且检查它们的密码是否为空，使用如下命令：

```
mysql> select User, Host, Password from mysql.user;
```

> 以上命令需要权限，因此需要先通过`/usr/local/mysql/bin/mysql -uroot`连接`MySQL`服务器。默认结果如下：

<pre>
+------+-----------+----------+
| User | Host      | Password |
+------+-----------+----------+
| root | localhost |          |
| root | leo.local |          |
| root | 127.0.0.1 |          |
| root | ::1       |          |
|      | localhost |          |
|      | leo.local |          |
+------+-----------+----------+
</pre>

可以看到有几个`root`账户和匿名账户，而且这些账户都不需要密码。从以上结果我们可以看到应该：

  * 为每个`MySQL root`账户设置一个密码；
  * 如果希望阻止匿名用户不使用密码连接`MySQL`服务器，应该为每个匿名用户设置一个密码或者删除这些匿名账户。

除此之外，`mysql.db`表包含了几行，允许所有的账户访问`test`数据库和其他以`test_`作为数据库名称前缀的数据库。即使没有特权的账户也可以访问，例如匿名账户。这对于测试来说非常方便，但是在生产服务器上是不建议这么做的。

<pre>
查看测试数据库
mysql> select Host, Db, User from mysql.db;
+------+---------+------+
| Host | Db      | User |
+------+---------+------+
| %    | test    |      |
| %    | test\_% |      |
+------+---------+------+
2 rows in set (0.00 sec)
</pre>

建议从`mysql.db`表中删除这几行允许所有用户连接测试数据库`test`或者`test_`的内容。

### 安全设置

[设置`MySQL`密码的官方文档](http://dev.mysql.com/doc/refman/5.0/en/assigning-passwords.html)
[重置密码](http://dev.mysql.com/doc/refman/5.0/en/resetting-permissions.html)
[创建账户](http://dev.mysql.com/doc/refman/5.0/en/adding-users.html)

#### 为`root`账户指定密码

三种方法：

  1.  使用`set password`命令；

      ```
      shell> mysql -u root
      mysql> set password for 'root'@'localhost'=password('xxxx');
      mysql> set password for 'root'@'leo.local'=password('xxxx');
      mysql> set password for 'root'@'127.0.0.1'=password('xxxx');
      mysql> set password for 'root'@'::1'=password('xxxx');
      ```

      上面的命令用到了`MySQL`服务器自带的`password()`函数来对密码`xxx`加密。
  
  2.  使用`update`命令；

      ```
      shell> mysql -u root
      mysql> update mysql.user set password = password('xxx') where user='root';
      mysql> flush privileges;
      ```

  3.  使用`mysqladmin`命令行程序。

`Mac OS X MySQL`的`DMG`安装包安装在`/usr/local/mysql-`**VERSION**目录下，并且创建了一个符号链接`/usr/local/mysql`。

## `mongodb`
