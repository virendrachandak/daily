adblock plus
---
> 凡是上网而且有一点点洁癖的人，想必都使用过`adblock plus`之类的软件，作为前端，我们也有必要来了解下这个流行神器的使用和原理。本文来自于[`adblock plus`官方站点](https://adblockplus.org/)的相应文档，并进行了翻译和整理。

# 关于`Adblock Plus`

* `Adblock Plus`是什么？
* `Adblock Plus`是怎样运行的？
* 什么是可接受的广告？

## `Adblock Plus`是什么？

`Adblock Plus`阻止网站上令人讨厌的广告，还有例如阻止跟踪等[其他功能](https://adblockplus.org/en/features)。`Adblock Plus`由`Wladimir Palant`在2006年创建，并由`Wladimir Palant`和`Till Faida`在2011年创建了[`Eyeo`](https://eyeo.com/)来支持`Adblock Plus`可持续开发。

## `Adblock Plus`是怎样运行的？

`Adblock Plus`本身没有功能，因为它只有加载了过滤器列表(`filter lists`)才会发挥阻止功能。这些过滤器列表本质上其实是扩展规则集，让`Adblock Plus`来阻止页面上的特定元素。除了阻止广告，过滤器列表也可以用于阻止[跟踪--`tracking`](https://adblockplus.org/en/features#tracking)和[恶意软件--`malware`](https://adblockplus.org/en/features#malware)。

刚出箱（安装好)的`Adblock Plus`会启用两个过滤器列表：

* 根据用户语言选择的阻止广告列表。
* 可接受的广告例外列表。

可以自由禁用、添加列表，或者[创建自己的过滤器列表](https://adblockplus.org/en/filters)。

![](https://adblockplus.org/en/images/how-adblock-plus-works.png?a=show)

## 什么是可接受的广告？

`Adblock Plus`是为了帮助用户远离令人讨厌的广告而存在的。然而，`Adblock Plus`并不认为所有广告都是坏的，因为许多网站依赖广告才能生存。因此，`Adblock Plus`有[严格的标准](https://adblockplus.org/en/acceptable-ads#criteria)来标记可接受的广告：非侵入式不用阻止的广告。原因遵守这些标准的站点可以将这些标准应用到他们的广告上来将自己的广告加入可接受广告列表，这样大部分用户也不会对这样的广告进行阻止。注意：如果不想看到任何广告，可以选择[不使用这个选项](https://adblockplus.org/en/acceptable-ads#optout)。

> 更多关于可接受广告的内容可以查看[可接受广告FAQ](https://adblockplus.org/en/acceptable-ads)。

# WEB工具

* 查找无用的过滤器
* `Adblock Plus`订阅链接工厂
* 将正则表达式转换成简单的过滤器

## 查找无用的过滤器


