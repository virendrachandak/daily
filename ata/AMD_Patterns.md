AMD模块模式（AMD Module Patterns）
---
>	来自[AMD-module-patterns](riptable.com/code/AMD-module-patterns/)

### AMD是什么?
*	我们常用的Firebug是基于AMD的实现。
*	例如，最简单的AMD模块定义是这样的：
	<pre><code>// mylib/my-module
	define(['mylib/one', 'mylib/two'], function (dep1, dep2) {
		// 自定义模块
		return {};
	});
	</code></pre>
	AMD插件定义如下所示：
	<pre><code>// 基本插件语法：
	// 插件模块id！资源id
	// 在相同的包里为模块/资源使用相对模块ID
	define(['./BaseView', 'text!./CoolView.html', 'css!./CoolView.css'],
		function (BaseView, template) {
			// 代码
	});
	</code></pre>

### singleton（单例模式）
	<pre><code>// 简单的AMD模块
	define({
		format: function (dicomDate) {
			return (discomDate || '').replace(/(?:\d{4})\d{2}/, '$1/');
		};
	});
	// 不是所有的builder都支持字符串单例，因为
	// 字符串看上去像模块ID
	define("WTF， AMD build tool. I am not a module id!");
	</code></pre>

### singleton++
	<pre><code>// 使用定义函数
	define(function () {
		return {
			format: function(dicomDate) {
				return (dicomDate || '').replace(/(?:\d{4}\d{2}/, '$1/');
			}
		};
	});
	
	define(function () { return " I < 3 u, AMD build tool!"; });
	</code></pre>	
*	所有AMD loader和builder都支持函数。

### AMD的java风格单例
	<pre><code> define( function () {
		var instance;
		function Singleton() {}
		Singleton.prototype.format = function (dicomDate) {
			return (dicomDate || '').replace(/(?:\d{4}\d{2}/, '$1/');
		};
		
		return function getSingleton() {
			return (instance = (instance || new Singleton()));
		}
	});
	</code></pre>

### decorator
```
```
	<pre><code>// mylib/UpdateableObservable: a decorator for dojo/store/Observable
	define(['dojo', 'dojo/store/Observable', function (dojo, Observable) {
		return function UpdatableObservable (store) {
			var observable = dojo.isFunction(store.notify) ? store :
					new Observable(store);
			observable.updated = function (object) {
				dojo.when(object, function (itemOrArray) {
					dojo.forEach([].concat(itemOrArray), this.notify, this);
				});
			};
			return observable;
		};
	});
	</code></pre>

### decorator consumer
	<pre><code>// a consumer for mylib/UpdatableObservable
	define(['mylib/UpdatableObservable'], function (makeUpdatable) {
		var observable, updatable, someItem;
		// ... here be code to get or create 'observable'
		
		// ... make the observable store updatable
		updatable = makeUpdatable(observable); // 'new' is optional
	
		// ... later, when a cometd message arrives with new data item
		updatable.updated(updatedItem);
	});
	</code></pre>

### 依赖注入（dependency injection）
1.	按照资源的方式提供而不是直接拉取；
2.	删除资源地址、创建和初始化等细节。

例如：使用如下方式
<pre><code>define(['injectMe1', 'injectMe2', function (dep1, dep2) {
	return {};
});
</code></pre>

错误的方式：
<pre><code>var config = {};
config.paths = {
	// map generic module name to concrete instances
	'model/Store', 'dojo/store/JsonRest',
	'Array': 'dojo/_base/array'
};

// 'myapp/my-module'
define(['model/Store', 'Array'], function (JsonRest, array) {
	var store = new JsonRest();
	array.forEach(['uno', 'dos', 'tres'], function (esp) { /*...*/ });
});
</code></pre>
>	config.paths不是用于模块别名（module aliasing）的。
>	而是应该用于将package/modules（包/模块）映射到相应的url上。
>	note：有些加载器提供了模块别名机制。

尝试加入一个抽象层
<pre><code>// 'model/Store' (rempas dojo/sotre/JsonRest):
define(['dojo/store/JsonRest'], function (JsonRest) {
	return JsonRest;
});

// 'Array' (remaps dojo/_base/array):
define(['dojo/_base/array'], function (array) {
	return array;
});

// 'myapp/my-module'
define(['model/Store', 'mylib/Array'], function (JsonRest, array) {
	var store = new JsonRest();
	array.forEach(['uno', 'dos', 'tres', function (esp) { /*...*/ });
});
</code></pre>

上述方法有效但是增加了多余的boilerplate创建和维护工作量。
而且，依赖注入似乎不应该是loader的工作。最佳实践是将依赖注入交给应用控制器或者IOC容器来完成。
> IOC:Inversion of Control
