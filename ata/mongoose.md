### Node.JS和MongoDB，开始使用Mongoose(Node.JS and MongoDB - Getting Started
    with Mongoose)

---

Node.JS的[Mongoose](http://mongoosejs.com/)库提供了Node.JS与MongoDB的仿ORM对象映射接口。[ORM（Object Relational Mapping，对象关系映射）](http://en.wikipedia.org/wiki/Object-relational_mapping)在Mongoose里被称为ODM（Object Data Mapping，对象数据映射），即Mongoose会将数据库中的数据转化成JavaScript对象来供应用程序使用。下面将展示使用MongoDB和Mongoose库来创建和存储集合（collection）文件（document）的过程。

注意：本文假设读者已经安装了[Node.js](http://nodejs.org/)和[MongoDB](http://www.mongodb.org/downloads)，本文给出的示例必须安装MongoDB才能运行。

##### 连接MongoDB

本文将连接MongoDB启动时默认使用的test数据库，并确保所有的连接错误都显示在控制台上。请注意open事件，数据库模式的创建和数据库模型的编译在它的回调函数中。

<pre><code>var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    //创建schema和model
})

mongoose.connect('mongodb://localhost/test');
</code></pre>

##### 数据库模式（schema）和数据库模型（model）

开始之前，我们需要在MongoDB数据库里创建一份
