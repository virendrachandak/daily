Web App CSS3动画(Mobile CSS3 Animation)
---
1. prefix（前缀）
	<pre><code>/**
   	 *@description {Get Current Browser Prefix}
	 *@return ['', '-webkit', '-ms-', '-o-']
   	 */
  	var dummyStyle = document.createElement('div').style,
      vendor = (function() {
        var vendors = 't,webkitT,MozT,msT,OT'.split(','),
            t,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
          t = vendors[i] + 'ransform';
          if (t in dummyStyle) {
            return vendors[i].substr(0, vendors[i].length - 1);
          }
        }

        return false;
    })(),
    cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',
</code></pre>
	
2. transform
3. transitionDuration
4. perspective
	has3d
5. ontouchstart in window
	hasTouch
6. translateZ(0)
	*	3D acceleration and CSS performance
	*	[http://stackoverflow.com/questions/10814178/css-performance-relative-to-translatez0](http://stackoverflow.com/questions/10814178/css-performance-relative-to-translatez0)
	*	`-webkit-font-smoothing: antialiased;` only works in safari
	*	[http://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css](http://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css)
	*	[http://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/](http://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)
	*	[http://desandro.github.io/3dtransforms/docs/cube.html](http://desandro.github.io/3dtransforms/docs/cube.html)
7. orientationchange || resize
8.	css responsive units || css3 units

8.	Refereces
	1.	[https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function)
	2.	[http://css3.bradshawenterprises.com/](http://css3.bradshawenterprises.com/)
	3.	[http://css3.bradshawenterprises.com/transforms/](http://css3.bradshawenterprises.com/transforms/)
	4.	[http://desandro.github.io/3dtransforms/](http://desandro.github.io/3dtransforms/)