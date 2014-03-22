/**
 * lazyload.js
 */
!function(window) {
  var $q = function(q, res) {
    if (document.querySelectorAll) {
      res = document.querySelectorAll(q);
    } else {
      var d = document, a = d.stylesheets[0] || d.createStyleSheet();
      a.addRule(q, 'f:b');
      for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++) {
        l[b].currentStyle.f && c.push(l[b]);
        a.removeRule(0);
        res = c;
      }
      return;
    }
  }, addEventListener = function(evt, fn) {
    window.addEventListener ? this.addEventListener(evt, fn, false) :
      (window.attachEvent) ? this.attachEvent('on' + evt, fn)
      : this['on' +evt] = fn;
  }, _has = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  function loadImage(el, fn) {
    var img = new Image(), src = el.getAttribute('data-src');
    img.onload = function() {
      if (!!el.parent) {
        el.parent.replaceChild(img, el);
      } else {
        el.src = src;
      }
    };
    img.src = src;
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}(this);
