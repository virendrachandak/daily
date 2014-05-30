mac lamp环境配置
---

## apache服务器

mac自带apache服务器，使用`apachectl`命令进行控制

mac已经安装了php，需要进入`/etc/apache2/`目录，修改`httpd.conf`文件。

取消下面这句的注释即可(即删除开头的`#`号)：

```
LoadModule php5_module libexec/apache2/libphp5.so                                
```

apache服务器资源的存放路径为`/Library/WebServer/Documents/`

要检测php是否已经启用，可以新建一个`test.php`文件，输入如下内容：

```php
<?php
phpinfo();
?>
```

然后通过`sudo apachectl start`命令启动apache服务器，再访问地址`http://localhost/test.php`，如果页面显示php信息则说明启用php成功。
