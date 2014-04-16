### MongoDB学习笔记

>	前端工程师的福利，服务器使用nodejs+express，数据库使用MongoDB。So Easy！妈妈再也不用担心我不会整站开发了。

---
### mongodb介绍
*	文档数据库(Document Database)
*	mongodb中的记录被称为文档（document），是一种键值对数据结构，类似于[JSON对象](http://json.org/)。一个document示例如下图所示：
*	![](http://docs.mongodb.org/master/_images/crud-annotated-document.png)
*	使用document的好处有：
	1.	document可以对应到编程语言中的原始数据类型；
	2.	嵌套的document和数组减少了join操作需要的成本；
	3.	动态模式（schema）支持多态。
*	关键特点
	*	高性能
		*	MongoDB提供了高性能数据持久性，尤其是
			*	对嵌套数据模型的支持减少了数据库系统的IO操作；
			*	索引支持更快地查询操作，支持嵌套文档和数组的键索引。
	*	高可用性
		*	MongoDB的同步机制（称为replica sets，复制集合，即保持了相同数据集合同步的MongoDB服务器集群），提供了自动失效备援（automatic failover）和数据冗余性（data redundancy）支持。
	*	自动均衡
		*	MongoDB的核心功能之一：水平伸缩性：
			*	自动分片部署数据到机器集群的功能
			*	复制集合（replica sets）能够为低延迟高吞吐量的部署提供最终一致性。
	>	以上内容来自MongoDB官网介绍，对于前端工程师来说，MongoDB最大的好处就是，可以使用Javascript的语法来方便的完成数据库的CRUD操作。

		
###	windows下的安装
	
*	在官网上[下载](http://www.mongodb.org/downloads)相应的安装包，注意区分64位系统和32位系统。如果不确定，可以使用下面的命令来查看。
	
	`wmic os get osarchitecture`

*	下载后解压到一个指定的目录，然后配置环境变量，将bin文件夹的路径加入到环境变量中，就可以在命令行里使用了。
	>	<b style="color:red">TIP：</b>windows7下按windows键然后输入`var`就可以快速打开编辑环境变量的窗口，选择编辑`path`环境变量，加入刚才bin文件夹路径。
	>	
	>	<b style="color:red">PS：</b>windows下的命令行工具推荐使用[cmder](https://www.google.com.hk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CC0QFjAA&url=%68%74%74%70%3a%2f%2f%62%6c%69%6b%65%72%2e%67%69%74%68%75%62%2e%69%6f%2f%63%6d%64%65%72%2f&ei=FNTEUovCCML-iAfgu4CwDA&usg=AFQjCNF_0GeTmDfqHt7TIM7UsMtneP6wBA)，支持自动补全等功能

### 运行MongoDB
1.	设置数据文件夹
	*	首先需要为mongodb创建存放数据的文件夹，例如，在刚才的mongodb解压目录里新建一个名为`data\db`的文件夹。
2.	启动mongodb
	*	使用这个命令：`mongod.exe --dbpath data/db`
	>	<b style="color:red">PS:</b>`--dbpath`指定了mongodb使用的数据文件夹。
	>	
	>	看到`admin web console waiting for connections on port xxx`就说明启动成功了。
	>	
	>	如果你刚刚创建的数据文件夹有空格的话，可以用双引号引起来。
	>	
	>	<b style="color:red">TIP:</b>`mongod`里的d是`daemon`的意思。也就是mongodb的守护进程。


3.	连接到mongodb
	*	使用`mongo`命令。
	>	<b style="color:red">TIP：</b>记得新开一个命令行窗口使用这个命令。
	>	
	>	`mongo.exe`会连接到正在运行的`mongod.exe`，默认使用的连接端口为`27017`，如果有问题，可以看一下系统的防火墙设置。
	*	现在可以使用下面的命令来往`test`数据库中插入内容。
	
		1.	`db.test.save({a:'testtest'})`

		2.	`db.test.find()`
4.	配置mongodb作为windows服务
	*	显然，上面的方法不太方便，可以配置`mongd.exe`和`mongo.exe`作为windows的系统服务。
		>	<b style="color:red">注意：</b>`mongos`需要**2.1.1**及以上的版本，`mongod`需要**2.0**及以上的版本
	#####	系统配置
	总的来说需要指定两个选项，分别为**`log日志`(即[logpath](http://docs.mongodb.org/manual/reference/configuration-options/#logpath))的输出路径，以及[配置文件](http://docs.mongodb.org/manual/reference/configuration-options/)的路径**。具体步骤如下：
	1.	在mongodb的目录里新建一个`log`文件夹；
	2.	新建一个`mongod.cfg`文件，内容如下：
		`logpath=d:\mongodb\log\mongo.log`
		>	<b style="color:red">注意：</b>这里请使用你自己刚刚放mongodb的文件夹路径。需要设置`logapend`选项，否则每次`mongod`启动时的日志信息都会被覆盖掉。
		>	
		>	设置方法为：新建一个`mongodb.conf`文件，添加这样一行内容：`logappend = true`
		>	
		>	并且在启动mongodb时使用下面任意一条命令：
		>	`mongod --config d:/mongodb/mongodb.conf`
		>	
		>	`mongod -f d:/mongodb/mongodb.conf`
		>	
		>	`mongos --config d:/mongodb/mongos.conf`
		>	
		>	`mongos -f d:/mongodb/mongos.conf`

	#####	安装并运行mongodb服务
	1.	安装mongodb服务，使用如下命令：
		`mongod.exe --config d:\mongodb\mongod.cfg --install`
	2.	运行下面命令来启动mongodb服务：
		`net start MongoDB`
		>	在这一步，我失败了，mongodb没有安装成功，没关系，不用急，可以删除mongodb服务。使用如下命令：
		>	
		>	`mongd.exe --remove`
		>	
		>	失败的原因，`cmder`这个工具使用的路径是linux形式的，因此在这里使用的`--config`跟的参数也应该是linux形式的路径。
		>	
		>	修改后的安装命令为：
		>	
		>	` mongod.exe --config /d/mongodb/mongodb.cfg --install`
		>	
		>	<b style="color:red">PS：</b>这里主要用到了mongod.exe这个命令，可以输入`mongod --help`查看它的具体用法。

### MongoDB基本操作

>	CRUD（Create, Read, update以及Delete，数据库的基本操作），本节还介绍了使用mongodb命令的基本操作。
	
*	MongoDB的document（也就是数据库里的数据记录）其实是[BSON格式](http://docs.mongodb.org/manual/reference/glossary/#term-bson)的，即JSON格式的二进制数据类型。与JSON的不同点在于BSON带有额外的类型信息。
*	MongoDB将所有的document存储在[集合（collections），即拥有共享索引的相关document的集合](http://docs.mongodb.org/manual/reference/glossary/#term-collection)里。collection对应于关系数据库里的数据库表(table)。因此，可以理解document对应于关系数据库中的一条记录。collection和document的关系如下所示：
*	![](http://docs.mongodb.org/master/_images/crud-annotated-collection.png)

##### 数据库基本操作
*	MongoDB查询命令的基本格式如下所示：
*	![](http://docs.mongodb.org/master/_images/crud-query-stages.png)
*	MongoDB数据修改的基本格式如下所示：
*	![](http://docs.mongodb.org/master/_images/crud-insert-stages.png)


##### 连接到数据库
1.	连接到mongod
	*	在命令行里输入`mongo`，它会自动寻找`localhost`的27017端口上是否运行了mongodb数据库服务器。可以使用`--port`和`--host`选项来指定端口号和目标主机。
2.	选择数据库
	*	连接到mongodb服务器后，在`mongo`命令里使用`db`命令来查看当前链接的数据库名。默认会连接`test`数据库。
	*	查看当前服务器上的数据库列表，使用命令`show dbs`。
	*	切换到某个数据库，例如名称为`mydb`的数据库，使用命令`use mydb`。
	*	其中`mydb`之前并不存在，会新建以`mydb`命名的数据库，但是`show dbs`不会显示。因为mongodb只有在某个数据库中有插入的数据才会存储。
3.	查看`mongo`帮助
	*	使用命令`help`

##### 创建集合（collection）和插入document
*	mongodb在使用数据库表（mongodb中成为collection）时如果不存在的话会隐式地去创建。因为mongodb使用的是[动态模式--dynamic schema](http://docs.mongodb.org/manual/faq/fundamentals/#faq-schema-free)，用户无需在插入数据前指定collection的数据结构。
*	示例：
	1.	运行`mongod`或者启动已经安装的mongodb服务；
	2.	使用`mongo`连接；
	3.	在`mongo`命令的提示符后输入`db`命令查看当前使用的数据库名称；
	4.	如果不是`mydb`的话，使用命令`use mydb`切换；
	5.	使用javascript操作定义j，k两条数据（document）：

		`j = { name: 'mongo' }`

		`k = { x: 3}`
	6.	将j，k插入数据库`mydb`中，使用如下命令：

		`db.testData.insert(j)`

		`db.testData.insert(k)`
	7.	查看插入后的效果，使用命令`db.testData.find()`

		命令行的输出结果大概会是这个样子：
		`{ "_id" : ObjectId("4c2209f9f3924d31102bd84a"), "name" : "mongo" }`

		`{ "_id" : ObjectId("4c2209fef3924d31102bd84b"), "x" : 3 }`

		>	请注意[ObjectId值](http://docs.mongodb.org/manual/reference/object-id/)，这是每个mongodb document都会有的唯一的值。

##### 使用for循环或者javascript函数来插入document
>	插入测试数据，使用命令`for (var i = 1; i <= 25; i++) db.testData.insert( { x : i } )`

##### cursor对象
*	使用mongodb查询时会返回一个cursor对象。`mongo`命令会递归cursor对象来显示查询结果并且每次最多显示20条。使用`it`命令来递归查看cursor对象的下一个结果集合。
####### 循环递归cursor
*	先使用上文提到的命令插入至少25条document数据。使用下面的步骤来递归查询cursor对象。
	1.	`var c = db.testData.find()`
	2.	`while (c.hasNext()) printjson(c.next())`

####### 对cursor对象使用数组操作
1.	`var c = db.testData.find()`
2.	`printjson(c[4])`

>	更多关于cursor对象的递归，请参考[这里](http://docs.mongodb.org/manual/reference/method/db.collection.find/#crud-read-cursor)

####### 查询指定数据
*	示例：

	`db.testData.find({x:18})`
*	详细文档:[Query Documents](http://docs.mongodb.org/manual/tutorial/query-documents/#read-operations-query-document)，[Read Operations](http://docs.mongodb.org/manual/core/read-operations/)

####### 只查询一条数据
*	使用命令`db.testData.findOne()`

####### 限制查询结果的数目
*	`db.testData.find().limit(3)`

### 参考资料
1.	[mongodb官网](www.mongodb.org)
2.	[try mongodb](try.mongodb.org/)
3.	[introduction to MongoDB](http://docs.mongodb.org/manual/core/introduction/)
3.	[windows下的mongodb安装--英文](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
4.	[logappend选项配置](http://docs.mongodb.org/manual/reference/configuration-options/#logappend)
5.	[getting started with mongoose](http://blog.modulus.io/getting-started-with-mongoose)
6.	[mongoosejs](http://mongoosejs.com/)
7.	[getting started with mongoose](http://mongoosejs.com/docs/index.html)
8.	[mongodb crud introduction](http://docs.mongodb.org/manual/core/crud-introduction/)
9.	[http://api.mongodb.org/js/](http://api.mongodb.org/js/)
10.	[mongo shell methods](http://docs.mongodb.org/manual/reference/method/)
11.	[http://docs.mongodb.org/manual/tutorial/getting-started/](http://docs.mongodb.org/manual/tutorial/getting-started/)
12.	[crud-read-cursor](http://docs.mongodb.org/manual/reference/method/db.collection.find/#crud-read-cursor)
13.	[bson](http://bsonspec.org/)