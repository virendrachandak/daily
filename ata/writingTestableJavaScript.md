编写可测试的JavaScript代码
---

>   我们都经历过这样的场景：某项JavaScript功能代码开始只有几行，慢慢地变成了几十行，慢慢越来越多……在代码增长的过程中，初始JavaScript函数增加了几个新的参数；条件语句增加了几个条件。接着某天，来了一份Bug报告：某个地方出错了，我们需要在“膨胀了的代码”中整理出头绪来。

随着客户端代码承担更多的责任（实际上，许多完整应用都在浏览器上运行），两件事情变得清晰起来。第一，我们不能仅使用鼠标点击和滑动来进行测试，自动化测试对于代码非常重要。第二，我们很可能需要改变编写代码的方式以编写测试。

我们真的需要改变编写代码的方式吗？是的，因为即使我们知道自动化测试很好，大部分人很可能只会写集成测试。集成测试非常有价值，因为集成测试关注整个应用的工作情况，但是集成测试不能告诉我们某项功能是否如我们预期工作。

因此我们还需要单元测试。在开始编写可测试的JavaScript代码之前，编写单元测试会比较困难。

### 单元测试vs集成测试：区别？

编写集成测试通常非常直接：我们只需要编写用户与应用的交互方式，以及用户预期结果的代码。[Selenium](http://docs.seleniumhq.org/)是一个非常流行的浏览器自动化测试工具。使用Ruby的[Capybara](https://github.com/jnicklas/capybara)可以轻松地与Selenim通讯，其他语言也有许多工具可以使用。

例如一个搜索应用的集成测试的部分代码：

```ruby
def test_search
  fill_in ('q', :width => 'cat')
  find ('.btn').click
  assert( find ('#results li').has_content?('cat'), 'Search results are shown' )
  assert( page.has_no_selector?('#results li.no-results'), 'No result is not
          shown' )
end
```

集成测试关注用户与应用（APP）的交互，而单元测试则仅关注某段代码：

> 某个函数在调用时输入特定内容会不会得到预期的输出？

应用时按照传统的过程风格编写的，很难进行单元测试，也难以维护、调试和扩展。但是如果我们在写代码时考虑一下要做单元测试，我们会发现单元测试不仅比我们想象的更加直接，而且也能让我们写出更好的代码。

例如下面这样一个简单的搜索应用（search app）：

![](http://d.alistapart.com/375/app.png)

用户输入一个搜索关键词，应用发送一个XHR（XmlHTTPRequest请求）道服务器请求对应的数据。服务器会用JSON格式的数据响应并在页面上使用客户端模板展示。用户可以点击搜索结果来表明自己“喜欢”该内容。用户在点击时，他/她所喜欢的人的名字将会加入到右侧的“已喜欢“列表。

这个应用的传统JavaScript实现如下所示：

```javascript
var tmplCache = {};

function loadTemplate(name) {
    if (!tmplCache[name]) {
        tmplCache[name] = $.get('/templates/' + name);
    }
    return tmplCache[name];
}

$(function() {
  var resultsList = $('#results');
  var liked = $('#liked');
  var pending = false;

  $('#searchForm').on('submit', function(e) {
      e.preventDefault();

      if (pending) { return; }

      var form = $(this;)
      var query = $.trim( form.find('input[name="q"').val() );

      if (!query) { return; }

      pending = true;

      $.ajax('/data/search.json', {
        data: { q: query },
        dataType: 'json',
        success: function(data) {
          loadTemplate('people-detailed.tmpl').then(function (t) {
            var tmpl = _.template(t);
            resultsList.html( tmpl({ people: data.results }) );
            pending = false;
          });
        }
      });

      $('<li>', {
        'class' : 'pending',
        html: 'Searching &hellip;'
      }).appendTo( resultsList.empty() );
  });

  resultsList.on('click', '.like', function (e) {
    e.preventDefault();
    var name = $(this).closest('li').find('h2').text();
    liked.find('.no-results').remove();
    $('<li>', { text: name }).appendTo(liked);
  });
});
```

上面的代码在任意一行，我们可能需要处理展现、数据或者用户交互和应用状态。为这样的代码编写集成测试非常轻松，但是要为函数功能编写单元测试却有困难。

难在哪里呢？有四点：

* 普遍缺乏结构；几乎所有事情都先发生在`$(document).redy()`回调里，然后在没有暴露所以不能测试的匿名函数中。
* 复杂的函数：如果一个函数的代码超过10行，例如提交处理，很有可能这个函数处理的事情太多了。
* 隐藏或者共享的状态：例如，因为`pending`在闭包里，无法测试挂起状态的设置是否正确。
* 紧耦合：例如，`$.ajax`成功处理函数不应该直接访问DOM。

### 组织代码

解决这些问题的第一步就是理清我们的代码，将这些代码分成不同责任的代码块：

* 展现和交互
* 数据管理和持久化
* 应用总体状态
* 让所有代码块统一工作的设置和胶水代码

在上面所示的“传统”实现中，这四种职责的代码被混到了一起--在某行我们处理了展现，但是接下来两行我们可能在处理和服务器的通信。

![](http://d.alistapart.com/375/code-lines.png)

虽然我们肯定可以也应该为这样的代码编写集成测试，但是要编写单元测试却非常困难。在我们的功能测试里，我们做了例如“如果用户搜索某个东西，他应该看到合适的结果”，但是我们不能更具体。如果有错，我们需要追踪到出错的具体位置，而功能测试对这点并没有帮助。

如果我们重新考虑编写代码的方式，我们可以编写能够更好的了解出错原因的代码，也能帮助我们写出能够更加轻松的重用、维护和扩展的代码。

我们的新版代码遵循了一下几条指导原则：

* 将每种行为的代码变成上面四种职责之一且互相没有依赖的独立对象。这样可以帮助我们写出混乱的代码。
* 支持配置，而不是硬编码。这样可以避免需要复制整个HTML环境才能编写测试。
* 保持对象方法简单、简洁。这样可以保持测试简单、代码易读。
* 使用构造器函数来新建对象实例。这样可以为测试创建“干净”的代码拷贝。

首先，我们需要将应用拆分成不同的代码块。我们将3块代码用于展现和交互：搜索表单、搜索结果以及喜欢区域。

![](http://d.alistapart.com/375/app-views.png)

我们还将一块代码用于从服务器获取数据，一块代码用于将所有代码粘贴到一起。

首先看一下应用中最简单的代码块：喜欢区域。在初始版本的应用代码中，这块代码负责更新喜欢区域：

```javascript
var liked = $('#liked');

var resultsList = $('#results');


// ...


resultsList.on('click', '.like', function (e) {
  e.preventDefault();

  var name = $(this).closest('li').find('h2').text();

  liked.find( '.no-results' ).remove();

  $('<li>', { text: name }).appendTo(liked);

});
```

搜索结果代码块和喜欢区域代码块完成混到了一起。更好的可测试的方法应该是创建一个负责处理喜欢区域DOM操作的对象：

```javascript
var Likes = function(el) {
    this.el = $(el);
    return this;
};

Likes.prototype.add = function(name) {
    this.el.find('.no-results').remove();
    $('<li>', { text: name }).appendTo(this.el);
};
```

上面的代码提供了一个创建喜欢区域新实例的构造器函数。在实例中创建了一个`.add()`方法用于添加新结果。我们可以编写几个测试来验证：

```javascript
var ul;

setup(function() {
  ul = $('<ul><li class="no-results"></li></ul>');
});

test('constructor', function() {
  var l = new Likes(ul);
  assert(l);
});

test('adding a name', function() {
  var l = new Likes(ul);
  l.add('Brendan Eich');

  assert(ul.find('li').length ,1);
  assert(ul.find('li').fisrt().html , "Brendan Eich");
  assert(ul.find('li.no-results').length , 0);
});
```

不是很困难，对吧？我们使用了[`Mocha`](http://visionmedia.github.io/mocha/)作测试框架以及[`Chai`](http://chaijs.com/)作为断言库。Mocha提供了`test`和`setup`函数；`Chai`提供了`assert`方法。还可以选择其他框架和断言库，但是作为介绍，上面两者已经够用了。可以为自己的或者自己的项目查找除Mocha外最适合的框架和库。例如流行的[Qunit](http://qunitjs.com/)以及新兴的[Intern](http://theintern.io/)。

测试代码以创建作为喜欢区域容器元素的代码开始，接着，会执行两个测试：一个是确保我们可以创建喜欢区域，另一个是测试`.add()`方法能够实现我们期望的效果。有了这些测试，我们可以安全的重构喜欢区域的代码，也能确信有问题发生我们可以马上了解到。

新的应用代码如下所示：

```javascript
var liked = new Likes('#liked');
var resultsList = $('#results');



// ...



resultsList.on('click', '.like', function (e) {
  e.preventDefault();

  var name = $(this).closest('li').find('h2').text();

  liked.add(name);
});
```

搜索结果代码块比喜欢区域代码块更加复杂，也需要做一些重构。正如为喜欢区域添加
`.add()`方法一样，我们也需要为和喜欢区域的互动创建方法。我们需要添加新结果的方法，以及向应用的其他代码块“广播”搜索结果的方法。

```javascript
var SearchResults = function (el) {
  this.el = $(el);
  this.el.on( 'click', '.btn.like', _.bind(this._handleClick, this) );
};

SearchResults.prototype.setResults = function (results) {
  var templateRequest = $.get('people-detailed.tmpl');
  templateRequest.then( _.bind(this._populate, this, results) );
};

SearchResults.prototype._handleClick = function (evt) {
  var name = $(evt.target).closest('li.result').attr('data-name');
  $(document).trigger('like', [ name ]);
};

SearchResults.prototype._populate = function (results, tmpl) {
  var html = _.template(tmpl, { people: results });
  this.el.html(html);
};
```

这样，旧版用于管理搜索结果和喜欢区域互动的应用代码将如下所示：

```javascript
var liked = new Likes('#liked');
var resultsList = new SearchResults('#results');


// ...


$(document).on('like', function (evt, name) {
  liked.add(name);
})
```

代码更加简单也更加条理清晰，因为我们用到了`document`来作全局信息传递，这样各个独立组件不再需要彼此了解。（在实际的应用中，我们会使用[`Backbone`](http://backbonejs.org/)或者[`RSVP`](https://github.com/tildeio/rsvp.js)库来管理实践，这里使用`document`来简化）。这里也隐藏了一些脏活，例如在搜索结果对象中查找受喜爱的名字，而不是在一堆混乱的代码中查找。最好的地方在于，我们现在可以编写测试来验证搜索结果对象会按照我们所期待的工作：

```javascript
var ul;
var data = [ /* fake data here */ ];

setup(function () {
  ul = $('<ul><li class="no-results"></li></ul>');
});

test('constructor', function () {
  var sr = new SearchResults(ul);
  assert(sr);
});

test('display received results', function () {
  var sr = new SearchResults(ul);
  sr.setResults(data);

  assert.equal(ul.find('.no-results').length, 0);
  assert.equal(ul.find('li.result').length, data.length);
  assert.equal(
    ul.find('li.result').first().attr('data-name'),
    data[0].name
  );
});

test('announce likes', function() {
  var sr = new SearchResults(ul);
  var flag;
  var spy = function () {
    flag = [].slice.call(arguments);
  };

  sr.setResults(data);
  $(document).on('like', spy);

  ul.find('li').first().find('.like.btn').click();

  assert(flag, 'event handler called');
  assert.equal(flag[1], data[0].name, 'event handler receives data' );
});
```

与服务器的操作也是另外一块需要考虑的有趣的代码。初始代码包括一个直接地`$.ajax()`请求以及一个与DOM直接交互的回调函数：

```javascript
$.ajax('/data/search.json', {
  data : { q: query },
  dataType : 'json',
  success : function( data ) {
    loadTemplate('people-detailed.tmpl').then(function(t) {
      var tmpl = _.template( t );
      resultsList.html( tmpl({ people : data.results }) );
      pending = false;
    });
  }
});
```

上面的代码难以编写测试，因为在几行代码里发生了好几件不同的事情。我们可以将应用的数据部分重构成一个独立对象：

```javascript
var SearchData = function () { };

SearchData.prototype.fetch = function (query) {
  var dfd;

  if (!query) {
    dfd = $.Deferred();
    dfd.resolve([]);
    return dfd.promise();
  }

  return $.ajax( '/data/search.json', {
    data : { q: query },
    dataType : 'json'
  }).pipe(function( resp ) {
    return resp.results;
  });
};
```

现在，我们可以修改将搜索结果展现到页面的代码：

```javascript
var resultsList = new SearchResults('#results');

var searchData = new SearchData();

// ...

searchData.fetch(query).then(resultsList.setResults);
```

应用代码再一次得到了简化，复杂性也被从应用代码抽取到了搜索数据对象中（Search Data Object）。搜索接口也能够测试。测试与服务器交互的代码有几个地方需要注意：

第一点是：不要真正和服务器交互--这样做就会和集成测试一样了，因为我们是负责任的开发者，我们已经有测试保证服务器不会出错，是吧？实际上，我们希望“mock”与服务器的交互，可以通过[`Sinon`](http://sinonjs.org/)库来实现。第二点是我们应该测试不理想的路径，例如输入为空：

```javascript
test('constructor', function () {
  var sd = new SearchData();
  assert(sd);
});

suite('fetch', function () {
  var xhr, requests;

  setup(function () {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });

  teardown(function () {
    xhr.restore();
  });

  test('fetches from correct URL', function () {
    var sd = new SearchData();
    sd.fetch('cat');

    assert.equal(requests[0].url, '/data/search.json?q=cat');
  });

  test('returns a promise', function () {
    var sd = new SearchData();
    var req = sd.fetch('cat');

    assert.isFunction(req.then);
  });

  test('no request if no query', function () {
    var sd = new SearchData();
    var req = sd.fetch();
    assert.equal(requests.length, 0);
  });

  test('return a promise even if no query', function () {
    var sd = new SearchData();
    var req = sd.fetch();

    assert.isFunction( req.then );
  });

  test('no query promise resolves with empty array', function () {
    var sd = new SearchData();
    var req = sd.fetch();
    var spy = sinon.spy();

    req.then(spy);

    assert.deepEqual(spy.args[0][0], []);
  });

  test('returns contents of results property of the response', function () {
    var sd = new SearchData();
    var req = sd.fetch('cat');
    var spy = sinon.spy();

    requests[0].respond(
      200, { 'Content-type': 'text/json' },
      JSON.stringify({ results: [ 1, 2, 3 ] })
    );

    req.then(spy);

    assert.deepEqual(spy.args[0][0], [ 1, 2, 3 ]);
  });
});
```

出于简洁的考虑，在此漏掉了搜索表单的重构，并简化了其他重构和测试，如果感兴趣的话可以[这个地址](https://github.com/rmurphey/testable-javascript)查看完成的重构后的应用代码。

使用可测试的JavaScript代码模式重写应用后，我们可以使用以下更加简洁的代码：

```javascript
$(function() {
  var pending = false;

  var searchForm = new SearchForm('#searchForm');
  var searchResults = new SearchResults('#results');
  var likes = new Likes('#liked');
  var searchData = new SearchData();

  $(document).on('search', function (event, query) {
    if (pending) { return; }

    pending = true;

    searchData.fetch(query).then(function (results) {
      searchResults.setResults(results);
      pending = false;
    });

    searchResults.pending();
  });

  $(document).on('like', function (evt, name) {
    likes.add(name);
  });
});
```

比代码的整洁度更重要的是我们有了一个经过完全测试的代码库。这意味着我们可以安全地重构和新增代码，而不必害怕破坏某些代码。我们甚至可以编写新的测试来发现问题，并且编写代码来通过这些新的测试。

### 长远考虑，测试让生活更加轻松

看完所有代码后你很容易说“稍等，你想让我写更多的代码来完成相同的事情？”

问题在于，让生活网络化有几件事情不能逃避。你会花费一些时间来设计解决问题的方法。你会测试解决方案，无论是在浏览器上导出点击，或者编写自动化测试，或者--战战栗栗地--让用户在生产环境来帮你测试。你会修改代码，其他人会使用你的代码。最终，会有bug，无论你写了多少测试。

测试的意义在于，虽然开始会花费更加多一点的时间，但是实际上从长远看来这会帮你节省时间。当你第一次在将代码发布到生产环境之前通过测试发现了一个bug，你会很感激、也会松一口气。

### 更多资源

本文只讲解了JavaScript测试的皮毛，如果想继续深入，可以参考：

* [演讲资料](http://lanyrd.com/2012/full-frontal/sztqh/)
* [Grunt，帮助自动化测试流程以及其他许多事情的工具](http://gruntjs.com/)
* [测试驱动的JavaScript开发](http://www.amazon.com/Test-Driven-JavaScript-Development-Developers-Library/dp/0321683919/ref=sr_1_1?ie=UTF8&qid=1366506174&sr=8-1&keywords=test+driven+javascript+development)

### 英文原文
[链接](http://alistapart.com/article/writing-testable-javascript)
