有效的JavaScript变量名
---

> 今天有人在“大前端”群里报了一个店铺页面的存储性XSS漏洞。如图所示：其实是利用了渲染代码的漏洞成功引入了恶意脚本替换了页面内容。本文与这个例子无关，但是也有关，较详细讲解了JavaScript变量命名，对于编写安全的代码相信有所帮助和启发。

### 保留词

ECMAScript 5.1说：

> 标识符是一个非保留词的标识符名称。

ECMAScript 5.1规范描述了4组[保留词](http://mathiasbynens.be/notes/reserved-keywords)：关键词、未来保留词、null常量以及布尔常量。

关键词（Keyword）是在JavaScript中有特殊意义的标记：

```javascript
break, case, catch, continue, debugger, default, delete, do, else, finally, for, function, if, in, instanceof, new, return, switch, this, throw, try, typeof, var, void, while, with
```

未来保留词（future reserved words）是在未来的ECMAScript版本中将会成为关键词的标记：

```javascript
class, const, enum, export, extends, import, super
```

有一些未来保留词只应用于严格模式（strict mode）：

```javascript
implements, interface, let, package, private, protected, public, static, yield
```

null常量很简单，即`null`。

有两个布尔常量：`true`和`false`。

以上均不允许用于变量名。

### 行为与保留词相同的非保留词

全局对象的`NaN`，`Infinity`和`undefined`属性都是ES5中的不可变（immutable）或者只读（read-only）属性。因此在全局域里即使`var NaN = 42;`也不会报错，实际上这句程序并没有做任何事情。为了避免混淆，我建议避免使用这些变量名。


```javascript
// In the global scrope:
var NaN = 42;
console.log(NaN);   // NaN

// ... but elsewhere:
(function() {
  var NaN = 42;
  console.log(NaN); // 42
})();
```

在严格模式下，`eval`和`arguments`都不允许被作为变量名。（在这种情况下他们和关键词相同。）

就得ES3规范定义了一些在ES5中不再保留的关键词：


```javascript
int, byte, char, goto, long, final, float, short, double, native, throws,
boolean, abstract, volatile, transient, synchronized
```

然而，最好避免使用这些关键词，以保持最佳的向后兼容性。

### 有效标识符名称

正如上面提到的，规范区分了标识符名称（identifier name）和标识符（identifier）。标识符是标识符名称的子集，因为标识符有一些额外所有保留词都不允许的限制。例如：`var`是一个有效地标识符名称，但是并不是一个有效地标识符。

因此，标识符允许什么限制呢？

标识符必须以`$`，`_`或者任何unicode字符集的“[大写字母--Uppercase letter（Liu）](http://codepoints.net/search?gc=Lu)”，“[小写字母--Lowercase letter（LI）](http://codepoints.net/search?gc=Ll)”，“[首字母大写字母--Titlecase letter（Lt）](http://codepoints.net/search?gc=Lt)”，“[修饰符字母--Modified letter（Lm）](http://codepoints.net/search?gc=Lm)”，“[其他字母--Other letter（Lo）](http://codepoints.net/search?gc=Lo)”以及“[字母数字--Letter number（NI）](http://codepoints.net/search?gc=Nl)”。

字符串的剩余部分可以包含仙童的字符，加上任何U_200C零宽度非连接字符，U+200D零宽连接字符，以及Unicode字符集中的“[非空格标记--Non-spacing mark（Mn）](http://codepoints.net/search?gc=Mn)”，“[空格符连接标记--Space combining mark（Mc）](http://codepoints.net/search?gc=Mc)”，“[十进制数字--Decimal digit number（Nd）](http://codepoints.net/search?gc=Nd)”和“[连接标点--Connector punctuation（Pc）](http://codepoints.net/search?gc=Pc)”。

这就是真实情况。但是有基点需要注意：

如我们所知，[JavaScript内部使用了UCS-2](http://mathiasbynens.be/notes/javascript-encoding)，该规范对“字符”的定义如下：

> 在本文档接下来的内容中，“代码单元（code unit）”和“字符（character）”将会用于指代用于表示一个单个16位文字单位的16位无符号值。

这有效地指出了[补充unicode字符](http://mathiasbynens.be/notes/javascript-encoding#bmp)（例如：[丽, 即U+2F800 CJK兼容性象形文字（U+2F800 CJK Compatibility Ideograph）](http://codepoints.net/U+2F800)，即[Lo]类列出的字符）不允许用于标识符名称，因为JavaScript会将他们解析成两个单独的代理字符（即`\uD87E\uDC00`），这样就不匹配上面列出的受允许的unicode类型了。


另一个点为：

> 标识符名称允许有[Unicode换码序列--Unicode escape sequence](http://mathiasbynens.be/notes/javascript-escapes#unicode)，并且被认为是一个单独的字符。unicode换码序列不能用于将字符放到标识符名称中，否则是非法的。

这意味着可以交换使用`var \u0061`和`var a`。类似的，因为`var 1`是无效的，因此`var \u0031`也是无效的。

对于web浏览器，这条规则有[一个特例](http://wiki.whatwg.org/wiki/Web_ECMAScript#Identifiers)，即使用了保留词的情况。大部分浏览器支持将标识符编码成保留词，只要有一个字符使用了unicode转码序列转码。例如`var var;`不行，但是`var \v\u0061r;`可以，即使严格说来，ECMAScript规范不允许。这种标识符接下来的使用液必须有至少一个转码的字符（否则会使用保留词），但是可以不必是刚开始用于创建标识符的相同字符。例如，`var v\u0061r = 42; alert(va\u0072);`会弹出42。这让人非常困惑，因此我不建议依赖这样的hack。幸运的是，ECMAScript 6规范[将会显示将这种行为视为不合规范](https://bugs.ecmascript.org/show_bug.cgi?id=277)。Firefox/Spidermonkey和IE/Chakra已经去掉了这种行为。

> 根据Unicode标准，两个[按照规矩来说相等](http://en.wikipedia.org/wiki/Unicode_equivalence)的标识符名称只有在他们使用完全相同的代码单元表示才相等。

因此，`ma\u00F1ana`和`man\u0303ana`是两个不同的标识符名称，即使他们在
[Unicode规范化](https://github.com/walling/unorm)后相等。

### 示例

```javascript
// How convenient!
var π = Math.PI;

// Sometimes, you just have to use the Bad Parts of JavaScript:
var ಠ_ಠ = eval;

// Code, Y U NO WORK?!
var ლ_ಠ益ಠ_ლ = 42;

// How about a JavaScript library for functional programming?
var λ = function() {};

// Obfuscate boring variable names for great justice
var \u006C\u006F\u006C\u0077\u0061\u0074 = 'heh';

// …or just make up random ones
var Ꙭൽↈⴱ = 'huh';

// While perfectly valid, this doesn’t work in most browsers:
var foo\u200Cbar = 42;

// This is *not* a bitwise left shift (`<<`):
var 〱〱 = 2;
// This is, though:
〱〱 << 〱〱; // 8

// Give yourself a discount:
var price_9̶9̶_89 = 'cheap';

// Fun with Roman numerals
var Ⅳ = 4,
    Ⅴ = 5;
Ⅳ + Ⅴ; // 9

// Cthulhu was here
var Hͫ̆̒̐ͣ̊̄ͯ͗͏̵̗̻̰̠̬͝ͅE̴̷̬͎̱̘͇͍̾ͦ͊͒͊̓̓̐_̫̠̱̩̭̤͈̑̎̋ͮͩ̒͑̾͋͘Ç̳͕̯̭̱̲̣̠̜͋̍O̴̦̗̯̹̼ͭ̐ͨ̊̈͘͠M̶̝̠̭̭̤̻͓͑̓̊ͣͤ̎͟͠E̢̞̮̹͍̞̳̣ͣͪ͐̈T̡̯̳̭̜̠͕͌̈́̽̿ͤ̿̅̑Ḧ̱̱̺̰̳̹̘̰́̏ͪ̂̽͂̀͠ = 'Zalgo';
```

[以上一些内容](http://mathias.html5.org/tests/javascript/identifiers/)不适用于所有浏览器--至少，还没有全部使用。参考下面的bug列表：

* [WebKit/JavaScriptCore bug #79353](https://bugs.webkit.org/show_bug.cgi?id=79353)
* [#78908 (now fixed)](https://bugs.webkit.org/show_bug.cgi?id=78908)
* [Chrome/V8 bug #1965 (now fixed)](http://code.google.com/p/v8/issues/detail?id=1965)
* [#1958](http://code.google.com/p/v8/issues/detail?id=1958)
* [Internet Explorer/Chakra bug #725622](https://connect.microsoft.com/IE/feedback/details/725622/chakra-use-unicode-6-1-0-when-determining-whether-an-identifier-is-acceptable-or-not)
* [Opera/Carakan bug DSK-358119](https://bugs.opera.com/browse/DSK-358119)
* [DSK-3577714/CORE_44659(now fixed)](https://bugs.opera.com/browse/CORE-44659)
* [Firefox/Spidermonkey bug #744784](https://bugzilla.mozilla.org/show_bug.cgi?id=744784)

原文作者也fix了一些bug。


### JavaScript变量名验证器

即使已经用心学习了上面的规则，也几乎不可能记住能够使用的不同unicode类型的所有字符。如果使用一个ASCII编码的正则表达式来总结这些规则的话，需要[11236个字符](http://stackoverflow.com/a/9337047/96656)。

因此，原文作者创建了[mothereff.in/js-variables](http://mothereff.in/js-variables)。

具体介绍和实现可以fork作者的[源码](https://github.com/mathiasbynens/mothereff.in/tree/master/js-variables)。

> 哈哈，原文评论也精彩。
> 感慨，国外开发者能深入阅读和研究规范，也许，这是我所缺乏的恒心和勇气。且行且努力。

### 参考资料
1. [英文原文](http://mathiasbynens.be/notes/javascript-identifiers)
