创建简单的HTTP服务器
---

> 一行代码创建简单的HTTP服务器。

### ruby

```
ruby -run -e httpd . -p 8000
```

### nodejs

```
cnpm install http-server -g
http-server [path] [options]
```

> 默认选项
> `-p`                端口号                      `8080`
> `-a`                绑定的host地址              `localhost`
> `-i`                是否显示目录下的文件索引    `True`
> `s`或者`--silent`   `silent mode`不在控制台打印日志
> `-h`或者`--help`    显示帮助信息并退出

```
http-server -p 8000
```

[github网址](https://github.com/nodeapps/http-server)
[npmjs网址](https://www.npmjs.org/package/http-server)

### twisted

[twisted官网](http://twistedmatrix.com)

OS X 10.5开始都预装了。

```
twisted -no web --path=. --port 8000
```

```
nohup twisted -no web --path=. 8000  > /dev/null 2>&1 &
```

## 参考资料
[http://stackoverflow.com/questions/12905426/faster-alternative-to-pythons-simplehttpserver](http://stackoverflow.com/questions/12905426/faster-alternative-to-pythons-simplehttpserver)
[http://stackoverflow.com/questions/530787/simple-http-web-server](http://stackoverflow.com/questions/530787/simple-http-web-server)
