天生一队投票应用
---

1.  部署服务器
>   使用forever，命令为`forever start app.js`
>   或者使用`nohup node app.js &`
>   有问题，最好改成`nohup node app.js > /foo/log.txt 2>&1`

2.  查看服务状态
>   `forever list`可以查看当前运行的forever脚本


### 参考资料
1.  [forever让nodejs应用后台执行](http://cnodejs.org/topic/5021c2cff767cc9a51e684e3)
2.  [forever 替代工具 pm2 的介绍](http://cnodejs.org/topic/51cc49e973c638f37042f7b4)
3.  [关于nodejs的web server如何设置开机启动，定时重启和自动备份数据](http://cnodejs.org/topic/50b22bfa637ffa4155ce29e9)
4.  [告别node-forever,拥抱PM2](http://cnodejs.org/topic/51f8c15144e76d216a588fcc)
5.  [automatically-start-forever-node-on-system-restart](http://stackoverflow.com/questions/13385029/automatically-start-forever-node-on-system-restart)
6.  [http://www.ibm.com/developerworks/library/wa-notify-app/](http://www.ibm.com/developerworks/library/wa-notify-app/)
7.  [https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/](https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/)
8.  [https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/](https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/)
9.  [http://kvz.io/blog/2009/12/15/run-nodejs-as-a-service-on-ubuntu-karmic/](http://kvz.io/blog/2009/12/15/run-nodejs-as-a-service-on-ubuntu-karmic/)
10. [http://stackoverflow.com/questions/4018154/node-js-as-a-background-service](http://stackoverflow.com/questions/4018154/node-js-as-a-background-service)
11. [http://nodeguide.com/beginner.html](http://nodeguide.com/beginner.html)
