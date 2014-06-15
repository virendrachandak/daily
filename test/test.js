/**
 *@author: yunhe
 */

function isPlainObject(arg) {
  var result = Object.prototype.toString.call(arg);
  if (result === '[object object]') {
    return true;
  } else {
    return false;
  }
}

function ready() {
  //DOMContentLoaded
}

KISSY.add

KISSY.use

KISSY.namespace

KISSY.mix
// for...in
// javascript mixin

/**
 * KISSY的工具方法
 */
KISSY.globalEval

KISSY.isArray

KISSY.isEmptyObject = function (obj) {
  for (var p in obj) {
    if (p !== undefined) {
      return false;
    }
  }
  return true;
};

KISSY.isWindow = function(obj) {
  return obj != null && obj == obj.window;
};

KISSY.makeArray

KISSY.merge

KISSY.now

// TODO:Chrome开发者工具什么时候返回{[native code]}

KISSY.trim
KISSY.isNumber  jQuery.isNumeric
KISSY.filter    jQuery.grep

/**
 *@description: 扩展机制
 */

//扩展jQuery.prototype
jQuery.fn.extend({
  check: function() {
    return this.each(function() {
      this.checked = true;
    });
  }
});

/**
 *@description: KISSY的辅助函数
 */

KISSY.isNull
KISSY.isObject
KISSY.isRegExp
KISSY.isString()
KISSY.lastIndexOf()
KISSY.substitute('{hello}, {world}!', { 'hello': 'test', world: 'pandora'});

function insertScript() {
  void function(g,f,j,c,h,d,b){
    g.alogObjectName=h,
    g[h]=g[h]||function(){
      (g[h].q=g[h].q||[]).push(arguments);
    },
    g[h].l=g[h].l||+new Date(),
    d=f.createElement(j),
    d.asyn=1,
    d.src=c,
    b=f.getElementsByTagName(j)[0];
    b.parentNode.insertBefore(d,b);
  }(window,document,"script","http://img.baidu.com/hunter/alog/alog.min.js","alog");
}

KISSY.augment
KISSY.extend
KISSY.each
KISSY.map
KISSY.bind
KISSY.on
KISSY.delegate
KISSY.fire
KISSY.fireHandler
KISSY.IO
KISSY.IO.get
KISSY.IO.jsonp
