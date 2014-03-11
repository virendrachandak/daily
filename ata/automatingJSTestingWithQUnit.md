使用QUnit来完成自动化JavaScript测试
---
*QUnit起源于jQuery核心代码库自带的testrunner。2009年底QUnit被重构，不再依赖
jQuery，适用于各种JavaScript框架和应用的测试。QUnit的`assertion`方法遵循`CommonJS assert`规范。QUnit可以在服务器端或者命令行环境中运行，但是最适用于在浏览器环境里测试JavaScript。本文探索如何使用QUnit写单元测试，以及QUnit在应用开发中的用途。*

开始前，我们先看一个最简单的QUnit测试（`hello world`代码）：

```html
<!DOCTYPE html>
<link rel="stylesheet" href="qunit.css">
<script src="qunit.js"></script>
<script>
test('hello', function() {
    ok(true, 'world');
})
</script>
<h1 id="qunit-header">QUnit Hello World</h1>
<h1 id="qunit-banner"></h1>
<ol id="qunit-tests"></ol>
```

这是最简单的测试内容。上面的代码声明了`doctype`，引用了QUnit的CSS和JS文件，并且使用了一个单独的QUnit测试和`assert`定义了一个script元素，并且为测试结果的输出增加了一些额外的标签。`test()`函数定义了一个名称为`hello`的测试。QUnit会在页面加载时运行测试。函数传递给`test()`的第二个参数包含了测试代码实际运行的内容，即对`ok()`的调用。第一个参数定义了`assertion`是否通过，第二个参数制定了输出的信息内容。在上面的代码里，传递的布尔值始终为`true`，因为实际上做任何测试。

使用浏览器打开上面的HTML文件输出如下所示：

![](http://i.msdn.microsoft.com/gg749824.image001\(en-us,MSDN.10\).jpg)

可以将上面的`assertion`设置为总是失败：

```javascript
test('Hello', function() {
    ok(false, 'world');
});
```

如何想比较一下可以用下面的代码：

```html
<!DOCTYPE html>
<link rel="stylesheet" href="qunit.css">
<script src="qunit.js"></script>
<script>
test('hello', function() {
    ok(true, 'world');
    //ok(false, '  world');
});

test('hello2', function() {
    ok(false, 'world2');
});
</script>
<h1 id="qunit-header">what ever this title is</h1>
<h1 id="qunit-banner"></h1>
<ol id="qunit-tests"></ol>
```

### QUnit测试

一个更加完整的示例：

```html
<!DOCTYPE html>
<html>
<head>
    <title>QUnit Test</title>
    <link rel="stylesheet" href="qunit.css" ref="stylesheet">
    <script src="qunit.js"></script>
    <script src="tests.js"></script>
</head>
<body>
    <h1 id="qunit-header">QUnit Test</h1>
    <h2 id="qunit-banner"></h2>
    <div id="qunit-testrunner-toolbar"></div>
    <h2 id="qunit-userAgent"></h2>
    <ol id="qunit-tests"></ol>
    <div id="qunit-fixture">test markup</div>
</body>
</html>
```

`tests.js`内容如下：

```javascript
function format(string, values) {
    for (var key in values) {
        string = string.replace(new RegExp("\{" + key + "}"), values[key]);
    }
    return string;
}

test('basics', function() {
    var values = {
        name: "World"
    };

    equal(format("Hello, {name}", values), "Hello, World", "single use");
    equal(format("Hello, {name}, how is {name} today?", values), "Hello, World, how is World today", "multiple");
});
```

这段代码运行了一个名为`format`的测试函数，这个函数期待的输出时一个字符串模板，使用键值对对象来替换模板内容。

该函数的测试使用了`equal()`假设(assertion)，即使用JavaScript的`==`操作符比较两个参数。第一个参数是实际值，在本实例中为调用`format()`的输出。第二个参数是期待的输出：即格式化的字符串内容。

在浏览器中运行的结果如下所示：

![](http://i.msdn.microsoft.com/gg749824.image003\(en-us,MSDN.10\).jpg)

如我们所见，上面的`format`函数实现有bug，并没有替换掉重复出现的单个键内容。使用`equal()`假设可以轻松的发现。因为我们可以看到实际的结果和期待的结果，以及两者之间的区别，以及（依赖于使用的浏览器，最佳为firefox和chrome）。甚至包括了assertion为false时的文件名称和代码行数。

我们可以通过给RegExp构造器传递`\g`（全局标志）来解决这个bug。

```new RegExp("\{" + key + "}", "g")``

通过以上改动，我们可以通过assertion测试。我们还可以通过写一个包含多个键模板的测试来扩展上面的测试用例。可以自己试一试。

>   答案在文章最后，可以参考一下

### 原子性

只要我们只测试没有副作用的函数，测试非常轻松。如果代码会有副作用，例如改变DOM结构，引入或者修改全局变量，测试代码的写法会需要更多技巧。书写没有副作用的代码当然是非常合理的目标而且不仅限于测试，但是通常这不太可能。要保持测试的原子性--不相互依赖-QUnit提供了一些有用的工具。

### DOM设备（DOM fixture）

对于需要修改DOM的测试，我们使用`#qunit-fixture`元素。我们可以在这个元素里放置静态标签用于所有测试，或者可以让这个元素为空，并根据需要为每个测试添加元素而不必担心被删除。QUnit会在每次测试后自动将`qunit-fixture`的`innerHTML`属性重置为初始值。如果可以使用jQuery的话，QUnit会使用jQuery的`html()`方法，该方法会清除掉jQuery的事件处理函数。

如果我们希望测试HTML5的`placeholder pollyfill`，我们可以从为一个`input`元素添加`placeholder`属性开始：

```html
<div id="qunit-fixture">
    <input id="input" type="text" placeholder="placeholder text">
</div>
```

这样每个测试都可以选择和修改`#input`元素，QUnit会进行重置。

###　module(模块)

如果我们需要更多的清理（cleanup）而不只是重置DOM，我们可以将cleanup加入到测试中。如果每次测试都需要相同的清理工作，我们可以使用`module()`方法来进行重构。`module()`的主要作用就是对测试进行分组，即测试某个指定方法的多个测试可以加入一个单独的模块（module）里。这样可以帮助我们过滤测试（可以参考下面的使用QUnit开发）。要让测试原子化，我们可以使用`module()`提供的`setup`和`teardown`回调：

```javascript
module('core', {
    setup: function(){
        // 在每次测试开始前执行
    },
    teardown: function() {
        // 在每次测试结束后执行
    }
});

test('basics', function() {
    // 测试内容
})；
```
`setup`和`teardown`分别在每次测试开始前和结束后执行。

我们还可以使用回调函数来创建在测试中使用的对象，而不用依赖闭包（或者全局变量）来传递给测试函数。这也适用于`setup`和`teardown`函数，因为实际上所有的测试都在同一个定制的作用域里自动调用和共享。

下面是一段测试货币值处理库的代码：（比较简单，不完全）

```javascript
var Money = function(options) {
    this.amount = options.amout || 0;
    this.template = options.template || "{symbol}{amount}";
    this.symbol = options.symbol || "$";
};

Money.prototype = {
    add: function(toAdd) {
        this.amount += toAdd;
    },
    toString: function() {
        return this.template.replace('{symbol}', this.symbol)
                .replace('{amount}', this.amount);
    }
};

Money.euro = function(amount) {
    return new Money({
        amount: amount,
        template: '{amount} {symbol}',
        symbol: 'ERU'
    });
};
```

上面的代码创建了一个`Money`对象，以及一个默认为美元的构造函数和欧元的工厂方法，以及两个用于处理和打印的方法。我们可以使用`setup`回调来创建对象并将它们存储在测试作用域里而不必为每个测试都创建一个新的`Money`对象。

```javascript
module('Money', {
    setup: function() {
        this.dollar = new Money({
            amount: 15.5
        });
        this.euro = Money.euro(14.5);
    },
    teardown: function() {
        // 可以使用this.dollar和this.euro来清理
    }
});

test('add', function() {
    equal(this.dollar.amount, 15.5);
    this.dollar.add(16.1).equal(this.dollar.amount, 31.6);
});

test('toString', function() {
        equal(this.dollar.toString(), '$15.5');
        equal(this.euro.toString(), '14.5 EUR');
});
```
>   上面的代码是有问题的，测试都不会通过，可以通过QUnit看到期待的结果和实际输出的结果。而通过肉眼似乎也难以看出区别，可以通过添加`debugger`函数来找出错误。实际上这里的错误是两处拼写问题。

上面的代码在`setup`时创建并存储了两个`Money`对象。`add`测试用到了其中一个，`toString`使用了两个。这里并不需要`teardown`函数，因为不必移除创建的`Money`对象。

### 测试异步代码

我们已经了解QUnit控制test执行的时机，代码同步执行时这种工作方式没有问题，但如果我们的测试需要使用异步回调（例如，因为`setTimeout`或者Ajax请求），需要给QUnit反馈，以阻止下一个测试的执行并让其等待开始的命令。

```javascript
test('async', function() {
    stop();
    $.getJSON('resource', function(result) {
        deepEqual(result, {
            status: 'ok'
        });
        start();
    });
});
```

上面的代码使用了jQuery的`$.getJOSN`方法从资源请求数据并对结果进行测试。在这里用到了`deepEqual`（而不是之前的`equal`）来检查结果是否和我们期待的完全一致。

因为`$.getJSON`是异步的，我们调用了`stop()`再执行代码，并在回调结束时调用
`start()`来让QUnit继续执行测试。

执行异步代码而不让QUnit`stop()`的话会在其他测试中显示任意的失败（或者通过）测试结果。

### asynTest

我们可以将调用放到`stop()`并且使用`asyncTest()`而不是`test()`。这样可以很清楚的表示出异步执行的测试：

```javascript
asynTest('async2', function(){
    $.getJSON('resource', function(result) {
        deepEqual(result, {
            status: 'ok'
        });
        start();
    });
});
```

### expect

测试回调函数时，无论是否异步我们都不发确定回调函数是否在某个点被调用了。这种情况我们可以使用`expect()`来定义我们在一个测试里期待的assertion次数。这样就可以避免应该有两次assertion，但是只有一次assertion通过的情况。

```javascript
asyncTest('async3', function() {
    expect(1);
    $.getJSON('resource', function(result) {
        deepEqual(result, {
            status: 'ok'
        });
        start();
    });
});
```

在`asyncTest`中，`expect`调用使用了参数1，QUnit会知道只有一次测试判断。在处理多次异步测试时，增加`expect`调用对于只有一条代码路径的测试也有用。如果其他测试损坏，assertion“泄露”到了这次测试中，`expect`调用也可帮助发现问题。

### async semaphore(异步信号)

如果一个测试有多个潜在的结束点--按照随机顺序执行的多个回调--我们可以使用QUnit内置的信号。通过在调用`start()`后调用同样次数的`stop()`，QUnit会在`stop()`调用增加的内部计数器通过调用`start()`减少后才继续执行。

```javascript
test('async semaphore', function() {
    stop();
    stop();
    $.getJSON('resource', function(result) {
        equal(result.status, 'ok');
        start();
    });
    $.getJSON('resource', function(result) {
        equal(result.status, 'ok');
        start();
    });
});
```

### 更多assertsion

上文已经使用了`ok`,`equal`和`deepEqual`。但是QUnit提供了更多的assertion类型。例如`stricEqual`，和`equal`一样进行相等判断，但是会使用JavaScript的`===`操作符。在比较类型可能不同的值时，例如数字和字符串，使用`strictEqual`很有意义，这样就不会在测试中出现0等于'0'的情况了（数字0等于字符串0）。

和`equal`,`deepEqual`以及`strictEqual`对应的是`notEqual`,`notDeepEqual`和
`notStrictEqual`。用法相同，结果相反。

### raises

除了这些，还有raises assertion（类似于CommonJS规范中的`throws`，但是没有使用保留关键字）。传递一个函数作为第一个参数，在`try-catch`代码块中有QUnit调用。如果函数抛出了异常的话，assertion会通过，否则会失败。也可以使用第二个参数来测试抛出的异常（thrown exceptions）。可以使用正则表达式来测试异常，使用构造函数测试`instanceof`，或者只是一个传递了异常作为第一个参数并且返回有效或者无效结果的函数。

```javascript
test('raises', function() {
    function CustomError() {}
    raise(function() {
        throw new CustomError();
    }, CustomError, 'must throw error to pass');
});
```

上面的代码示例展示了如何使用raises来测试构造函数抛出的异常。即为期待的构造器函数传递一个引用作为第二个参数。

### 定制assertion

assertion通常会调用多个`equal()`，一种好的重构测试代码的方法就是讲定制assertion方法抽取出来。要让输出和其他assertion一致，可以直接使用`QUnit.push()`。下面的例子来自jQuery UI的测试集：

```javascript
function domEqual(selector, modifier, message) {
    var attributes = ['class', 'role', 'id', 'tabIndex', 'aria-activedescendant'];

    function extract(value) {
        var result = {};
        result.nodeName = value[0].nodeName;
        $.each(attributes, function(index, attr) {
            result[arr] = value.attr(attr);
        });
        result.children = [];
        var children = value.children();
        if (children.length) {
            children.each(function() {
                result.children.push(extract($(this)));
            });
        } else {
            result.text = value.text();
        }
        return result;
    }

    var expected = extract($(selector));
    modifier($(selector));

    var actual = extract($(selector));
    QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
}

该方法用于测试验证destroty方法的实现是否正确，在离开时将元素还原到初始化时未调用destroy方法的状态。这种方法取代了比较`innerHTML`属性的方法（这样做会产生很多假的失败状态）而是用属性列表进行比较。通过递归所有子元素来获取文本内容。

最后会使用`deepEqual`使用的深度比较实现`QUnit.equiv`来比较两个结果。实际结果和期待的结果都会和信息参数一起传递给`QUnit.push`方法。通过直接使用`QUnit.push`，QUnit可以输出正确的文件名和行号。如果我们使用`deepEqua`的话，行号会指向我们调用`deepEqual`的定制assertion，而不是调用了定制assertion的代码。

下面是在jQuery UI自动完成测试集中使用该方法的示例：

```javascript
test('destroy', function() {
    domEqual('#autocomplete', function() {
        $('#autocomplete').autocomplete().autocomplete('destroy');
    });
});
```

定制assertion方法在调用时使用了选择器和回调函数。选择器指定了要测试的元素，回调函数完成了实际修改。assertion方法会记录应用修改函数前后的状态并比较结果。

### 使用QUnit开发

在写测试前我们花费了很多时间来查看测试结果，尝试了解为什么某个测试执行失败或者为什么某个应该失败的测试通过了。

QUnit提供了在这一步的帮助工具。我们已经看到了详细的测试输出，包括实际值和期待值，以及两者之间的区别和行号。

在进行测试时，如果能够重新执行特定测试而不是所有测试会很有帮助。运行测试的时间会不同（更少的测试=更少的时间），也有利于集中处理和其他失败测试没有关系的问题。

要重新执行某个测试，点击该测试名上的`Return`链接会重新打开相同的测试集，但是会在URL上添加`?filter=name-of-test`。测试名称会使用URL编码。改变URL地址的好处在于可以通过重新加载页面使用相同过滤器重新测试，或者返回执行全部测试集。

![](http://i.msdn.microsoft.com/gg749824.image004\(en-us,MSDN.10\).jpg)

这样会过滤QUnit测试集，只执行assertion模块（module）中的raises测试。

也可以手动修改地址。如果我们设置`filter=assertion`，测试集会执行所有名字包含
`assertion`的测试。

![](http://i.msdn.microsoft.com/gg749824.image005\(en-us,MSDN.10\).jpg)

### 调试工具

QUnit头部的`noglobals`和`notrycatch`勾选框可以设置特殊过滤器。

*noglobals*

选中`noglobals`后，QUnit会在执行测试前遍历`window`对象的所有属性，并在执行完当前测试后比较`window`对象和该属性列表。如果不同，测试失败，额外输出引入的或者没有的全局属性测试。这样就可以轻松发现不小心引入的全局变量。

如果修改第一个测试并且去除变量前的`var`关键字，会返回没有选中`noglobals`的测试集。

![](http://i.msdn.microsoft.com/gg749824.image006\(en-us,MSDN.10\).jpg)

有时候代码会引入全局变量；因此默认会关闭此功能。但是通过偶尔启用该功能可以发现错误。

*notrycatch*

另外一个勾选框是`notrycatch`。QUnit会在`try-catch`代码块外执行测试回调函数。如果测试因为异常失败，QUnit不能捕捉到，测试集会停止执行。这在调试特定异常时非常有用，尤其是在浏览器的内置JavaScript调试工具功能很差时。特别是在IE6中，未处理的异常会提供更加有用的信息以及缓存的异常。即使重新抛出异常，因为JavaScript而不是异常处理能力弱，原始的堆栈追踪信息在大部分浏览器中都会丢失。

这是用途非常特殊的工具。但是如果因为异常追踪不到实际代码，上面的选项会非常有用。

### 更加高效的TDD

QUnit是测试驱动开发（TDD）的有力工具，加上一点调试，可以更快提供有用的结果。

考虑一个需要十秒执行时间的较大测试集。做了修改后，测试集结束处的某个测试如预期失败了。完成缺少的功能后，重新执行测试，等待十秒钟查看结果，仍然得到失败结果。十秒时间很可能变成三十秒、一分钟或者更坏。但即使每次运行只需要十秒，TDD也会崩溃。使用过滤器执行测试集中的部分测试并不适用，因为需要验证修改是否破坏了任何内容。优化加速测试集本身就比较充满挑战，要测试修改测试集是否会引发破坏也很困难。

可以选中`Hide passed tests`勾选框。选中该勾选框后，QUnit不会显示正在执行或者通过了的测试，而仅显示失败的测试。

![](http://i.msdn.microsoft.com/gg749824.image007\(en-us,MSDN.10\).jpg)

通过隐藏已经通过的测试，可以更加清楚的看到其他QUnit功能。这样QUnit会记录之前哪些测试失败。QUnit会使用`sessionStorage`，如果浏览器支持的话（目前所有现代浏览器都支持）。下次运行测试集会首先运行失败的测试，而不会维护相同的输出顺序。

### 测试多个jQuery版本

```javascript
(function() {
    var parts = document.location.search.slice(1).split('&'),
        length = parts.length,
        i = 0,
        current,
        version = '';
    for (; i < length; i++) {
        current = parts[i].split('=');
        if (current[0] === 'jquery') {
            version = current[1];
            break;
        }
    }
    if (version) {
    version = '-' + version;
    }
    document.write("<script src='../lib/jquery' + version + '.js'></script>");
})();
```

### 参考资料
1.  [Automating JavaScript Testing with QUnit](http://msdn.microsoft.com/zh-cn/magazine/gg749824(en-us).aspx)

### 参考答案
```javascript
function format(string, values) {
    for (var key in values) {
        //buggy version
        //string = string.replace(new RegExp("\{" + key + "}"), values[key]);
        //fixed version
        string = string.replace(new RegExp("\{" + key + "}", "g"), values[key]);
    }
    return string;
}

test('basics', function() {
    var values = {
        name: "World"
    };

    equal(format("Hello, {name}", values), "Hello, World", "single use");
    equal(format("Hello, {name}, how is {name} today", values), "Hello, World, how is World today", "multiple");
});

test('intermediate', function() {
    var values = {
        name: "World",
        value: 'whateverValue'
    };

    equal(format("Hello, {name}, {value}", values), "Hello, World, whateverValue", "single use");
    equal(format("Hello, {name}, how is {name} today, {value}", values), "Hello, World, how is World today, whateverValue", "multiple");
});
```
