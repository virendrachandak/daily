traceroute
---
### 使用
**traceroute**命令可以查看数据包从本机到指定站点经过的路径信息，包括
所有经过的路由器信息(无论数据包成功到达指定站点或是失败，或者被丢弃)，
以及在路由之间每一跳所花费的时间。

windows的使用方法是在命令行（快捷键windows键+r，输入`cmd`），输入
`tracert taobao.com`，linux下的命令为`traceroute`。

### traceroute的工作原理


### 参考资料
1.  [http://www.mediacollege.com/internet/troubleshooter/traceroute.html](http://www.mediacollege.com/internet/troubleshooter/traceroute.html)
2.  [http://support.microsoft.com/kb/162326](http://support.microsoft.com/kb/162326)
3.  [http://victor1980.blog.51cto.com/3664622/1066652](http://victor1980.blog.51cto.com/3664622/1066652)
> X-Forwarded-For(通过header来传递网站的ip信息)
> [http://en.wikipedia.org/wiki/X-Forwarded-For](http://en.wikipedia.org/wiki/X-Forwarded-For)
> X-Originating-IP(Email Header Field)
> [http://en.wikipedia.org/wiki/X-Originating-IP](http://en.wikipedia.org/wiki/X-Originating-IP)
4.  [http://tools.ietf.org/html/draft-petersson-forwarded-for-01](http://tools.ietf.org/html/draft-petersson-forwarded-for-01)
