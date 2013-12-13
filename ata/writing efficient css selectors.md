Writing Efficient CSS selecotrs（书写高效的CSS选择器）
---
>   译者序：书写高效CSS选择器对于网站来说十分重要，无论你是在做Facebook这样的大型网站，或者为当地的土豪搞个个人展示网站O(∩_∩)O哈哈~如果你和译者一样还不是很清楚高效CSS选择器的写法，那么可以开始阅读了。

### CSS选择器
*   常见的有:
    1.  标签选择器，例如：`div`；
    2.  id选择器，例如：`#header`；
    3.  类选择器，例如：`.tweet`；
*   不常见的有：
    1.  伪类选择器，例如：`:hover`
    2.  复杂的CSS3和<b>正则</b>选择器，例如：`:first-child`和`[class^="grid-"]`
        >   分别表示第一个子元素和类名以"grid-"开头的元素
*   CSS选择器效率有差别，按照Steve Souders的说法，CSS选择器效率从搞到低依次如下所示：
    1.  ID选择器，例如：`#header`
    2.  类选择器，例如：`.promo`
    3.  标签选择器，例如：`div`
    4.  相邻兄弟节点选择器，例如`h2 + p`
    5.  子节点选择器，例如`li > ul`
    6.  祖孙节点选择器，例如`ul a`
    7.  通配符选择器，例如`*`
    8.  属性选择器，例如：`[type="text"]`
    9.  伪类、伪元素选择器，例如：`a:hover`
*   来自于Steve Souders的[Even Faster Websites站点](http://stevesouders.com/)

>  译注：作者通过实验发现，虽然从技术上来说，CSS选择器的性能会按照上面列出的次序存在差异，但是实际上ID选择器和类选择器之间，以及标签选择器和祖孙选择器之间的差异并不大。不过ID选择（或类选择器）与标签选择器（或祖孙选择器）之间的差异还是挺大的。
>  
>  两个实验，一个是[选择ID选择器的回流（reflow）](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=%23id&body=background%3A+%23CFD&ne=1000)，另一个是[选择类选择器时的回流](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=.class&body=background%3A+%23CFD&ne=1000)，有兴趣的同学可以在自己的机器和浏览器上跑一跑。

### 选择器组合
*   例如这样一个选择器组合`#nav a`。开发者的读法是从左往右，即先查找`#nav`代表的DOM节点，再在它的子节点中查找`a`节点。但是，浏览器的读取顺序正好是相反的（从右往左的）。
*   继续上面的例子，我们的理解是包含有`a`标签的`#nav`节点。而浏览器则理解成在`#nav`元素中的`a`标签。这两种理解方式对性能的影响非常大。详情可以参考stack overflow上的[这篇讨论](http://stackoverflow.com/questions/5797014/css-selectors-parsed-right-to-left-why)。
*   对于浏览器来说，更加高效的做法是从最右边的元素开始（也就是需要应用样式的元素），在DOM树上循着父亲节点上溯。而不是从DOM树顶点开始向下查找。因为这样有可能甚至找不到关键选择器元素（key selector）。

### 关键选择器(The key selector)
>   The key selector，有点像《黑客帝国》里neo去寻找的开锁人一样

*   关键选择器（Key Selector），也就是一个大型的CSS选择器组合中的最右边的元素，也就是浏览器最先开始查找的元素。
*   因此，根据上文提到过的选择器性能排序，如果关键选择器性能越高，则整个CSS选择器的性能就会越高。
*   带有这样的Key Selector的组合选择器比较高效（注意下划线标出的key selector）：
    *   #content <b style="border-bottom: 1px solid #000;color:RED;">.intro</b>{}
*    因为浏览器会首先查找所有的`.intro`节点，然后再在它们的DOM树的父节点上查找是否有`#content`节点。
*    而这样的选择器则是性能不好的（同样注意下划线标出的key selector）：
    *   #content <b style="border-bottom:1px solid #000;color:RED;">*</b>{}
*   这回导致浏览器首先查找页面上的所有节点，然后再看他们是否是`#content`的子节点。显然，性能会差很多。
*   根据以上知识，现在假设我们在开发一个大型网站，我们有一个很大的页面（理解成页面很复杂，DOM节点很多就行了），这个页面上有成百上千个`a`标签（译者注：这难道是当年卖出了几百万的hao123导航网站^_^）。而且这个页面上有一小块ID值为social的区域（即`#social`表示的DOM节点）的`ul`子节点里放满了各种SNS分享链接，比如说Twitter、Facebook、Dribble、Google+（译者注：什么？都没听过，好吧，谢谢GFW，那你就想象成咱们的人人，qq空间，天涯，百度贴吧）这四个站点的分享链接。如果使用这样的CSS选择器：
    *   `#social a{}`
*   浏览器需要从页面上成百上千的链接中找出这四个`a`标签代表的节点。我们的关键选择器匹配范围太大了。
*   改进的方法就是给这几个`a`标签加上更加具体的选择器名称，例如加上`.social-link`（使他们变成类选择器）。但是这样会和我们所了解的保持页面标签少而且整洁的最佳实践有矛盾。
*   这就是性能问题有趣的地方：需要在最佳实践和绝对速度之间做出平衡和取舍。
*   最佳实践（也就是我们通常的）做法代码如下所示：
    <pre><code>&lt;ul id="social"&gt;
        &lt;li&gt;&lt;a href="#" class="twitter"&gt;Twitter&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#" class="facebook"&gt;Facebook&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#" class="dribble"&gt;Dribbble&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#" class="gplus"&gt;Google+&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
    </code></pre>
    相应的CSS为：
     `#social a{}`
*   而看重性能的做法则是写成如下HTML代码：
    <pre><code>&lt;ul id="social"&gt;
        &lt;li&gt;&lt;a href="#" class="social-link twitter"&gt;Twitter&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#" class="social-link facebook"&gt;Facebook&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#" class="social-link dribble"&gt;Dribbble&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#" class="social-link gplus"&gt;Google+&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
    </code></pre>
    CSS为：
    `#social .social-link{}`
*   当然，我们还可以将CSS简化成`.social-link{}`。这是下一节的内容。我们现在要记住的是，关键选择器（key selector）决定了CSS选择器的性能，我们应该让key selector匹配的元素尽量地少，这样才会性能越好，浏览器也能更快地完成CSS渲染任务。

### 过于复杂的CSS选择器
*   根据上文的知识，我们知道key selecotr是CSS选择器性能的关键，同时，我们也可以在今后的实际工作中尽量简化我们所写的CSS选择器，并且避免出现过于复杂的CSS选择器的情况。例如：
*   `html body .wrapper #content a{}`
*   很容易可以看出，至少左边的三个选择器是可以省去的。写成如下形式：
    *   `#content a{}`
*   然后呢？
*   通过上文我们知道浏览器会先找到最右的key selector`a`的所有DOM节点，然后再查找它是不是在ID为`nav`的元素中。也就是顺着DOM树父节点的上溯查找。在实际中，我们有时候会写出这样的CSS选择器：
    *   `#nav li a{}`
*   而实际上， 写成:
    *   `#nav a{}`
*   更加高效。

###　总结
*   这样坚持去写高效的CSS选择器有必要吗？
*   简单的回答是：可能没必要。
*   长一点的答案是：需要取决于你所开发的站点。如果你是做自己的个人网站而且更看重页面代码的简洁而不是CSS选择器的性能，那你可能真地不需要去注意书写高效的CSS选择器。
*   但是如果你开发的是像Amazon（或者咱们大淘宝，译者注）这样的大型站点，毫秒之差都可能影响到用户的体验，那你应该好好注意一下你写出来的CSS选择器的性能。

>   译者注：作者最后还在很保守地说CSS高效选择器的重要性。其实，就像上面一段作者根据自己的理解和我们大淘宝，大天猫所处的开发环境来说，写好CSS选择器，保持高效，确实是非常重要的。

### 参考资料
1.  [原文](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)
2.  [Even Faster Web Site--Steve Souders](http://stevesouders.com/efws/)
3.  [High Performance Web Sites--Steve Souders](http://stevesouders.com/hpws/)