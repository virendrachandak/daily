`HTTP`权威指南
---

# 第一部分

> **HTTP:Web的基础**
> 本部分主要概述HTTP协议。

* 第1章简要概述HTTP。
* 第2章详细介绍URL的格式，以及URL在因特网上命名的各种类型的资源，以及对URL发展的概要介绍。
* 第3章详细说明了传输Web内容的HTTP报文。
* 第4章讨论了通过HTTP管理TCP连接时的规则和行为。

# 第1章：HTTP概述

### 媒体类型

MIME类型(`MIME Type`，`Multipurpose Internet Mail Extension`，多用途因特网邮件扩展)。

### URI

URI(Uniform Resource Ideintifier，统一资源标识符)有两种形式，分别称为URL和URN。

### URL

URL(Uniform Resource Location，统一资源定位符)

### URN

URN(Uniform Resource Name，统一资源名称)，作为特定内容的唯一名称使用，与目前的资源所在地无关。通过URN可以用同一个名字通过多种网络访问协议来访问资源。

例如通过下列URN命名RFC 214：

`urn:ietf:rfc:2141`

## 事务

一个HTTP事务由一条请求命令和一个响应结果组成。通信通过HTTP报文（HTTP message）的格式化数据进行。

### 方法

HTTP方法（HTTP method）。常见的五种如下：

GET     从服务器向客户端发送命名资源
PUT     将来自客户端的数据存储到一个命名的服务器资源中去
DELETE  从服务器中删除命名资源
POST    将客户端数据发送到一个服务器网管应用程序
HEAD    仅发送命名资源响应中的HTTP首部

### 状态码

例如：`200`表示OK，文档正确返回。

### Web页面可以包含多个对象

## 报文

HTTP报文都是纯文本，不是二进制代码，所以可以很方便地读写。

HTTP报文包括3个部分：

* 起始行
* 首部字段
* 主体
