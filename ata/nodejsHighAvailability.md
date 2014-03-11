高可用性NodeJS
---
你是否在生产环境中用到了NodeJS？想不想了解Yahoo的处理方式？如果这两个答案都是“YES”，而且你希望能够有清晰简单的高可用性解决方案的话，请看下文。

### 需要的模块

* monitr:[https://npmjs.org/package/monitr](https://npmjs.org/package/monitr)
* process-watcher:[https://npmjs.org/package/process-watcher](https://npmjs.org/package/process-watcher)
* mod_statuspage:[https://npmjs.org/package/mod_statuspage](https://npmjs.org/package/mod_statuspage)

使用*monitr*提供的`monitor.start()`方法监测加载的应用，使用`monitor.stop()`停止监控已经关闭的程序。

*monitr*模块会创建线程监控应用，从不同的系统文件查看进程状态并通过socket报告。

*process-watcher*模块提供了socket监听器(*listener*)，在进程不满足监控程序指定的性能要求时发送`SIGHUP`和`SIGKILL`信号。

怎样在已有或者新应用中加入这些模块呢？

### MONITOR

```javascript
// Your includes.

var monitor = require('monitr');
monitor.start();

// You application logic.
process.on('exit', function(){
  monitor.stop();
})
```

### LISTENER

```javascript
var watcher = require('process-watcher');

/*
 * Dummy metric monitoring object.
 */
var watcher_metric = {
  increment: function(name, v) {},
  set: function(name, va) {}
};

var dgpath = '/tmp/nodejs.mon',
    statusPath = '/tmp/watcher_status_path_test',
    watcher_config = {
      max_inactive: 0.001,
      monitor: 0.001,
      monPath: dgpath,
      timeout: 3,
      timeout_start: 60
    };

// Instantiate watcher
var watcher_instance = new watcher.Watcher({
  metric: watcher_metric,
  config: watcher_config
});
```

###  怎样在这样的生态系统里查看应用的行为呢？

mod_statuspage模块提供了在指定服务器上查看所有进程状态的简单中间件。

```javascript
// Your includes.
var app = express();

app.use(status({
  url: '/status',
  check: function(req) {
    if (req.something === false)　{
      return false;
    }
    return true;
  },
  responseContentType: 'html'
}));

// Other middleware
app.use(...)
//URLs served
app.get(...)
```

集成到一起以后：

[示例应用和监听器](https://github.com/rohiniwork/monitr/tree/nodejs-highavailability/examples/app-highavailability)

#### application.js
```javascript
/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// Reference: http://yahooeng.tumblr.com/post/68823943185/nodejs-high-availability

var cluster = require('cluster'),
    express = require('express'),
    http = require('http'),
    monitor = require('monitr'),
    status = require('mod_statuspage'),
    timers = require('timers');
// Spawn numCPUs worker processes
var numCPUs = require('os').cpus().length,
    clusterStartTime = Date.now(),
    newWorkerEnv = {};

// Master spawns worker processes
if (cluster.isMaster) {
  newWorkerEnv.clusterStartTime = clusterStartTime;

  // For workers
  for (var i = 0; i < numCPUs; i++) {
    console.log('Starting worker ' + i);
    cluster.fork(newWorkerEnv);
  }

  // Logs to know what workers are active
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' online');
  });
} else {
  // Worker process
  // Start monitoring
  monitor.start();

  if (process.env.clusterStartTime) {
    process.clusterStartTime = new Date(parseInt(process.env.clusterStartTime, 10));
  }

  // Simple express app
  var app = express();
  // Server statuspage to get application metrics
  app.use(status({
    url: '/status',
    check: function(req) {
      if (req.something == false) {
        return false; // Don't show status
      }
      return true;  // Show status
    },
responseContentType: 'html'
  }));

  // An example of a request that makes CPU idle for some time
  app.get('/late-response', function(req, res) {
    var end = Date.now() + 5000;
    // CPU cycles wasted for 5000ms
    // Blocking
    while (Date.now() < end );
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I came after a delay\n');
  });
  // All other requests served normal
  app.get('*', function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('I am being monitored\n');
  });

  console.log('Go to: http://127.0.0.1:8000/status');
  app.listen(8000);

  // Stop monitoring
  process.on('exit', function() {
    monitor.stop();
  });

  // Graceful shutdown
  process.on('SIGINT', function() {
    process.exit();
  });
} // end worker
```

#### listener.js

```javascript
/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// Reference : http://yahooeng.tumblr.com/post/68823943185/nodejs-high-availability
var watcher = require('process-watcher');

/*
 * Dummy metric monitoring object.
 */
var watcher_metric = {
  /**
   * Increment metric
   */
  increment: function(name, v) {
    console.log('Increment ' + name + ' with ' + v);
  },
  /**
   * Set the metric or multiple metrics at the same time.
   */
  set: function(name, v) {
    console.log('Selecting the following metrics: ' + require('util').inspect(name));
  }
};

var dgpath = '/tmp/nodejs.mon',
    statusPath = '/tmp/watcher_status_path_test',
    watcher_config = {
      max_inactive: 0.001,
      monitor: 0.001,
      monPath: dgpath,
      timeout: 3, timeout_start: 60
    };

// Instantiate watcher
var watcher_instance  = new watcher.Watcher({ metric: watcher_metric, config: watcher_config });
```

[包含nodejs模块的完整示例下载地址](https://github.com/rohiniwork/monitr/tree/nodejs-highavailability/examples/)

分别在控制台里运行这两个文件：

`node ./application.js`

`node ./listener.js`

*状态页面*

应用和监控程序（watcher）运行后，可以在`http://localhost:8000/status`查看应用状态。

![](http://media.tumblr.com/509b5b25c58951757f57262d654ecd0f/tumblr_inline_mx7bp62TdY1stb2qs.png)

激活`watcher`杀死`worker`进程的URL地址为：`http://localhost:8000/late-response`。

### 参考资料
1.  [NodeJS High Availability](http://yahooeng.tumblr.com/post/68823943185/nodejs-high-availability)
