<div itemprop="articleBody">
  


<style type="text/css">

.extdoc:before{
  left: 80px;
  bottom: 5px;
  width: 50%;
  height: 35%;
  max-width: 200px;
  max-height: 50px;
  -webkit-box-shadow: -80px 0 8px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: -80px 0 8px rgba(0, 0, 0, 0.4);
  box-shadow: -80px 0 8px rgba(0, 0, 0, 0.4);
  -webkit-transform: skew(50deg);
  -moz-transform: skew(50deg);
  -ms-transform: skew(50deg);
  -o-transform: skew(50deg);
  transform: skew(50deg);
  -webkit-transform-origin: 0 100%;
  -moz-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -o-transform-origin: 0 100%;
  transform-origin: 0 100%;
}

.drop-shadow{
  position: relative;
  padding: 1em;
  margin: 2em 10px 4em;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

}

.extdoc {
  padding:10px;
  background: hsl(218, 73%, 97%);
}

.extdoc img{
  max-width:800px;
}

.drop-shadow:before, .drop-shadow:after {
  content: "";
  position: absolute;
  z-index: -2;
}

.perspective:after {
  display: none;
}

.drop-shadow:before, .drop-shadow:after {
  content: "";
  position: absolute;
  z-index: -2;
}

.kbd {
  padding: 0.1em 0.6em;
  border: 1px solid #ccc;
  font-size: 11px;
  font-family: Arial,Helvetica,sans-serif;
  background-color: #f7f7f7;
  color: #333;
  -moz-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
  -webkit-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  display: inline-block;
  margin: 0 0.1em;
  text-shadow: 0 1px 0 #fff;
  line-height: 1.5;
  white-space: nowrap;
}

body.docs .screenshot, body.docs .border {
  border:0px;
}

img{
  max-width:950px;
}
</style>


<p>There are many <strong>power tools</strong> at your disposal when using the DevTools, some of which are more obvious than others. In this guide, we will highlight some of those great tools, tips and tricks that are less well known. Read on and learn about those capabilities you might not know yet!</p>


<ul>

<li><strong>Console

<ul>
<li><strong><a href="#multiline-commands">Write multi-line commands</a></strong></li>
<li><strong><a href="#inspect-element-line">A shortcut to launch in inspect element mode</a></strong></li>
<li><strong><a href="#console-table">Support for the console.table command</a></strong></li>
<li><strong><a href="#preview-logged-objects">Preview logged console objects</a></strong></li>
<li><strong><a href="#styled-console-multiple">Pass multiple arguments to styled console logs</a></strong></li>
<li><strong><a href="#clear-console-history">Shortcut to clear the console history</a></strong></li>
<li><strong><a href="#keyboard-ninja">Become a keyboard ninja</a></strong></li>
<li><strong><a href="#access-elements-console">Accessing elements from the console</a></strong></li>
<li><strong><a href="#last-console-result">Access the last console result</a></strong></li>
<li><strong><a href="#dom-xpath-expressions">Querying the DOM using XPath expressions</a></strong></li>
<li><strong><a href="#console-dir">Using console.dir</a></strong></li>
<li><strong><a href="#console-iframe">Running the JS console in a specific iframe</a></strong></li>
<li><strong><a href="#console-persist">Stop the console clearing when navigating to a new page</a></strong></li>
<li><strong><a href="#benchmarking-console">Benchmark loops using console.time() and console.timeEnd()</a></strong></li>
<li><strong><a href="#profiling-console">Profiling with console.profile() and console.profileEnd()</a></strong></li>
</ul>
</strong></li>

<li><strong>Timeline

<ul>
<li><strong><a href="#timeline-frames-mode">Frame profiling with Timeline Frames Mode</a></strong></li>
<li><strong><a href="#forced-layout-events">Spot forced layout events using warnings</a></strong></li>
<li><strong><a href="#timeline-shared">Share and analyze a Timeline recorded by someone else</a></strong></li>
<li><strong><a href="#timeline-recordings">Annotating Timeline Recordings</a></strong></li>
<li><strong><a href="#counter-display">FPS Counter/HUD Display</a></strong></li>
</ul>
</strong></li>


<li><strong>Profiles

<ul>
<li><strong><a href="#three-snapshot-technique">Finding JavaScript memory leaks with the “3 snapshot” technique</a></strong></li>
<li><strong><a href="#nodes-heap-profiler">Understanding Nodes In The Heap Profiler</a></strong></li>
<li><strong><a href="#timespent-cpu-profiler">Understanding time spent in CPU profiler</a></strong></li>
<li><strong><a href="#moreinsights-heapprofiler">Additional insights with Heap profiler views</a></strong></li>
</ul>
</strong></li>
<li><strong>Sources

<ul>
<li><strong><a href="#debug-dom-modifications">Debug on DOM modifications</a></strong></li>
<li><strong><a href="#tracking-uncaught-exceptions">Tracking uncaught exceptions</a></strong></li>
<li><strong><a href="#conditional-breakpoint-actions">Conditional breakpoint actions with console.log</a></strong></li>
<li><strong><a href="#prettyprint-javascript">Pretty Print JavaScript</a></strong></li>
<li><strong><a href="#favorite-expression">‘Favourite’ an expression or variable value</a></strong></li>
<li><strong><a href="#insights-internal">Get insights into internal properties</a></strong></li>
<li><strong><a href="#debug-xhr">Easily debug XHRs</a></strong></li>
<li><strong><a href="#retrive-handlers">Retrieve event handlers registered on elements</a></strong></li>
<li><strong><a href="#escape-console">Escape to see the console</a></strong></li>
<li><strong><a href="#paused-breakpoint">Become more effective when paused at a breakpoint</a></strong></li>
<li><strong><a href="#pause-exceptions">Pause on exceptions</a></strong></li>
<li><strong><a href="#textsearch-across-allscripts">Text search across all scripts</a></strong></li>
<li><strong><a href="#coffeescript-sourcemaps">Debugging CoffeeScript With DevTools And Source Maps</a></strong></li>
</ul>
</strong></li>
<li><strong>Elements

<ul>
<li><strong><a href="#enable-rulers">Enable rulers</a></strong></li>
<li><strong><a href="#dragdrop-elements">Drag and drop in the Elements panel</a></strong></li>
<li><strong><a href="#css-autocomplete">Autocompletion of CSS properties</a></strong></li>
<li><strong><a href="#colorpicker">Color picker in the DevTools</a></strong></li>
<li><strong><a href="#adding-styles">Adding new CSS styles</a></strong></li>
<li><strong><a href="#drag-around-html">Drag around HTML</a></strong></li>
<li><strong><a href="#force-element-state">Force Element State</a></strong></li>
<li><strong><a href="#debugging-sass">Writing and debugging Sass with the DevTools</a></strong></li>
</ul>
</strong></li>
<li><strong>Network

<ul>
<li><strong><a href="#replay-xhrs">Replay XHRs</a></strong></li>
<li><strong><a href="#clear-network">Clear the network cache or cookies</a></strong></li>
<li><strong><a href="#record-export-trace">Record a trace &amp; export the waterfall</a></strong></li>
<li><strong><a href="#details-network">Use large resource rows in network timeline for more detail</a></strong></li>
<li><strong><a href="#websocket-inspection">WebSocket inspection</a></strong></li>
<li><strong><a href="#find-filter-xhrs">Find and filter XHRs from the Network panel</a></strong></li>
<li><strong><a href="#dump-network-stack">Get a dump of the network stack’s internal state</a></strong></li>
</ul>
</strong></li>
<li><strong>Settings

<ul>
<li><strong><a href="#emulating-touch">Emulating touch events</a></strong></li>
<li><strong><a href="#emulating-ua-viewports">Emulating UA Strings &amp; Device Viewports</a></strong></li>
<li><strong><a href="#emulating-geolocation">Emulating Geolocation</a></strong></li>
<li><strong><a href="#dock-to-right-viewport">Dock-to-right for viewport debugging</a></strong></li>
<li><strong><a href="#disable-javascript">Disable JavaScript</a></strong></li>
</ul>
</strong></li>
<li><strong>General

<ul>
<li><strong><a href="#switch-between-tabs">Quickly switch between tabs</a></strong></li>
<li><strong><a href="#improved-dock-to-right">Get an improved dock-to-right experience</a></strong></li>
<li><strong><a href="#disable-cache">Use ‘Disable Cache’ for cache invalidation</a></strong></li>
<li><strong><a href="#inspect-shadow-dom">Inspect Shadow DOM</a></strong></li>
<li><strong><a href="#preview-inspectable-pages">Preview all inspectable pages</a></strong></li>
<li><strong><a href="#appcached-sites">Get insights into which sites have appcached</a></strong></li>
<li><strong><a href="#multiple-filters">Select multiple filters in the Network/Console panels</a></strong></li>
<li><strong><a href="#hard-reload">Clear the cache and perform a hard reload</a></strong></li>
<li><strong><a href="#chrome-task-manager">Insights with the Chrome Task Manager</a></strong></li>
</ul>
</strong></li>
<li><strong>Additional Tools

<ul>
<li><strong><a href="#debugging-ios-apps">Debugging iOS apps in DevTools</a></strong></li>
<li><strong><a href="#jsruntime">JSRunTime: Easily Greb Objects</a></strong></li>
<li><strong><a href="#other-resources">Other Resources</a></strong></li>
</ul>
</strong></li>
</ul>



<h2>Console</h2>

<h3 id="multiline-commands">Write multi-line commands</h3>

<p>When in the console's multi-line editing mode, you can treat blocks of text as if you were using a standard text editor. <span class="kbd">Shift</span> + <span class="kbd">Enter</span> allows you enter multi-line mode in the console.</p>

<p><img src="tips-and-tricks/consolemultiline.png"></p>

<p>This can be particularly helpful when writing JavaScript that is more complex than a simple one-liner. Once you've entered a block of text, press <span class="kbd">Enter</span> at the end of the command and it should run.</p>

<p><img src="tips-and-tricks/consolerun.png"></p>

<h3 id="inspect-element-line">A shortcut to launch in inspect-element mode</h3>

<p><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span> or <span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span> will open up DevTools in inspect element mode (or switch focus to it) so you can inspect the current page immediately. Repeating returns focus to the page. On Mac, use <span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span> to achieve the same.</p>

<p><img src="tips-and-tricks/image_10.png"></p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/console">More: Using The Console | DevTools Docs</a></p>

<h3 id="console-table">Support for the console.table command</h3>

<p>This command logs any supplied data using a tabular layout. Some examples of how to use it include:</p>

<pre>console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
console.table([[1,2,3], [2,3,4]]);
</pre>

<p><img src="tips-and-tricks/consoleg1.png"></p>

<p>There is also an optional 'columns' parameter which takes the form of an array of strings. Below, we define a family object containing many "Person"s and can then choose which columns we would like displayed using it:</p>

<p></p><pre>function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

var family = {};
family.mother = new Person("Susan", "Doyle", 32);
family.father = new Person("John", "Doyle", 33);
family.daughter = new Person("Lily", "Doyle", 5);
family.son = new Person("Mike", "Doyle", 8);

console.table(family, ["firstName", "lastName", "age"]);
</pre><p></p>

<p><img src="tips-and-tricks/consoleperson.png"></p>

<p>whilst, if you just want to output the first two of these columns, use:</p>

<pre>console.table(family, ["firstName", "lastName"]);
</pre>

<p><a href="https://plus.google.com/u/0/115133653231679625609/posts/PmTC5wwJVEc">More: Support for the console.table command has landed | G+</a>.</p>

<h3 id="preview-logged-objects">Preview logged console objects</h3>

<p>Objects logged using console.log() can be previewed directly inside the DevTools without further work on your part.</p>

<p><img src="tips-and-tricks/image_12.png"></p>

<h3 id="styled-console-multiple">Pass multiple arguments to styled console logs</h3>

<p>As we’ve documented you can add style to your console logs via <code>%c</code>, just like you can in Firebug. e.g</p>

<pre>console.log("%cBlue!", "color: blue;");
</pre>

<p>Blocks specifying multiple styles are also supported:</p>


<pre>console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');
</pre>

<p><img src="tips-and-tricks/image_13.png" width="800px"></p>

<p><a href="https://plus.google.com/115133653231679625609/posts/TanDFKEN9Kn">More: Styled Console Logging In The DevTools | G+</a></p>

<h3 id="clear-console-history">Shortcut to clear the console history</h3>

<p>With the console open you can easily clear your console history using the <span class="kbd">Ctrl</span> + <span class="kbd">L</span> or <span class="kbd">Cmd</span> + <span class="kbd">L</span>  <a href="https://developers.google.com/chrome-developer-tools/docs/shortcuts">shortcut</a><a href="https://developers.google.com/chrome-developer-tools/docs/shortcuts">.</a> A clear() command is also available at the shell prompt as is the <a href="https://developers.google.com/chrome-developer-tools/docs/console#clearing_the_console_history">console.clear()</a> method via the Console API from JavaScript.</p>

<h3 id="keyboard-ninja">Become a keyboard ninja</h3>

<p>With the DevTools open you can just use <span class="kbd">?</span> to see all of the <a href="https://developers.google.com/chrome-developer-tools/docs/shortcuts">supported shortcuts</a> in a convenient panel.</p>

<p><img src="tips-and-tricks/image_14.png"></p>

<h3 id="access-elements-console">Accessing elements from the console</h3>

<p>Select an element and type $0 in the console, it will be used by the script. If you have jQuery on the page, you can then use $($0) to reselect the element in the page.</p>

<p><img src="tips-and-tricks/image_15.png"></p>

<p>You can also right click on any element output to the console and click “Reveal in Elements Panel” to find it in the DOM.</p>

<p><img src="tips-and-tricks/image_16.png"></p>

<h3 id="dom-xpath-expressions">Querying the DOM using XPath expressions</h3>

<p>XPath is a query language for selecting nodes from documents and generally returns a node-set, string, boolean or number. You can use XPath expressions to query the DOM from the DevTools JavaScript console.</p>

<p>The <code>$x(xpath)</code> command will allow you to execute a query - see below for an example of how to search for the images in a page using <code>$x(‘//img’)</code>:</p>

<p><img src="tips-and-tricks/image_17.png"></p>

<p>However, the function also accepts an optional second argument for the path context - i.e <code>$x(xpath, context)</code>. This lets us select a specific context (e.g an iframe) and run an XPath query against it.</p>

<pre>var frame = document.getElementsByTagName('iframe')[0].contentWindow.document.body;
$x('//'img, frame);
</pre>

<p>which queries the images within the specified iframe.</p>


<h3 id="access-elements-console">Access the last console result</h3>

<p>Using the $_ helper will allow you to access the last console result. We can demonstrate using this with another XPath example:</p>

<p><img src="tips-and-tricks/image_17a.png"></p>


<h3 id="console-dir">Using console.dir</h3>

<p>The <a href="https://developers.google.com/chrome-developer-tools/docs/console-api#consoledirobject">console.dir(object)</a> command lists out all of the properties of a provided object as an expandable JavaScript object. Below is an example displaying an expandable object representing the properties found under document.body.</p>

<p><img src="tips-and-tricks/image_18.png"></p>

<h3 id="console-iframe">Running the JS console in a specific iframe</h3>

<p>Along the bottom bar of the DevTools are drop-down options that change depending on the context of your current tab. When you’re in the Console panel, there’s a drop-down that allows you to select the frame context that the console will operate in. Select your frame in the drop-down and you’ll find yourself in the right context in no time.</p>

<p><img src="tips-and-tricks/image_19.png"></p>

<h3 id="console-persist">Stop the console clearing when navigating to a new page</h3>

<p>Sometimes you want to be able to preserve your console log history when you navigate to a new page. To enable this, right-click in the console and select "Preserve Log upon Navigation". When you navigate to a different page from the current tab, the console history will no longer be cleared.</p>

<p><img src="tips-and-tricks/image_20.png"></p>

<h3 id="benchmarking-console">Benchmark loops using <code>console.time()</code> and <code>console.timeEnd()</code></h3>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimelabel">console.time()</a> begins a new timer using a specific label. When <a href="https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimeendlabel">console.timeEnd()</a> is called using the same label the time is stopped and the elapsed time between both is logged to the console. This is particularly useful for benchmarking loops or code which doesn’t call a function.</p>

<p><img src="tips-and-tricks/image_21.png"></p>

<h3 id="profiling-console">Profiling with <code>console.profile()</code> and <code>console.profileEnd()</code></h3>

<p>With the DevTools open, calling <a href="https://developers.google.com/chrome-developer-tools/docs/console-api#consoleprofilelabel">console.profile()</a> begins a JavaScript CPU profile. A label for the profile can be optionally passed, as seen below in console.profile("Processing"). To complete a profile run, call <a href="https://developers.google.com/chrome-developer-tools/docs/console-api#consoleprofileend">console.profileEnd()</a>.</p>

<p><img src="tips-and-tricks/image_22.png"></p>

<p>Each profile run gets added to the <a href="https://developers.google.com/chrome-developer-tools/docs/profiles">Profiles</a> panel:</p>

<p><img src="tips-and-tricks/image_23.png"></p>

<p>It is also added to the <code>console.profiles[]</code> array for inspection later on:</p>

<p><img src="tips-and-tricks/image_24.png"></p>


<div class="drop-shadow extdoc">

  <!--Description-->
  <p>For more key tricks with the console, dive into <a href="https://developers.google.com/chrome-developer-tools/docs/console">Using The Console</a>:</p>
  <p></p><ul>
  <li>A place to log diagnostic information using methods provided by the <a href="https://developers.google.com/chrome-developer-tools/docs/console-api">Console API</a>, such as <code>console.log()</code>, or <code>console.profile()</code>.</li>
  <li>The methods provided by the <a href="https://developers.google.com/chrome-developer-tools/docs/commandline-api">Command Line API</a>, such as <code>$()</code> command for selecting elements, or <code>profile()</code> to start the CPU profiler.</li>
  </ul>
<p></p>
  <!--Screenshot -->
 <p><a href="https://developers.google.com/chrome-developer-tools/docs/console"><img src="tips-and-tricks/preview_console.png"></a></p>

</div>



<h2>Timeline</h2>

<h3 id="timeline-frames-mode">Frame profiling with Timeline Frames Mode</h3>

<p>The Timeline panel provides an overview of where time is spent loading up your web application such as how long it takes to process DOM events, render page layouts or paint elements to the screen. It allows you to drill down into three separate facets that can help discover why your application is slow: Events, Frames and actual Memory usage.</p>

<p><img src="tips-and-tricks/image_0.png"></p>

<p>Timeline won’t display any data by default but you can begin a recording session with it by opening your app and clicking on the circle <img src="tips-and-tricks/recordbuttonblack.png"> at the bottom of the pane. Using the <span class="kbd">Ctrl</span> + <span class="kbd">E</span> or <span class="kbd">Cmd</span> + <span class="kbd">E</span> shortcut will also trigger a record.</p>

<p><img src="tips-and-tricks/image_1.png"></p>

<p>This record button will turn from gray to red and the Timeline will begin to capture the timelines for your page. Complete a few actions inside your app and after a few seconds, click the button again to stop recording.</p>

<p><img src="tips-and-tricks/image_2.png"></p>

<p>Frames mode gives you insight into the tasks Chrome had to perform to generate a single frame (update) of your application for presentation on the screen. In this mode, the shaded vertical bars correspond to recalculating styles, compositing and so on. The transparent areas of each vertical bar correspond to idle time, at least, idle on the part of your page.</p>

<p><img src="tips-and-tricks/image_3.png"></p>

<p>For example, say your first frame takes 15ms to execute and the next takes 30ms. A common situation is that frames are synchronized to refresh rate and in this case, the second frame took slightly longer than 15ms to render. Here, frame 3 missed the "true" hardware frame and was rendered upon the next frame, hence, the length of the second frame was effectively doubled.</p>

<p>If your app doesn't have a lot of animation in it, the idea of frames is useful as the browser has to perform a repeated sequence of actions while processing input events. When you leave enough time to process such events in a frame, it makes your app more responsive, meaning a better user experience.</p>

<p><img src="tips-and-tricks/image_4.png"></p>

<p>When we target 60fps, we have a max of 16.66ms to do everything. That's not a lot of time and so squeezing as much performance out of your animations as possible is important.</p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/timeline">More: Improving Performance With The DevTools Timeline | DevTools Docs</a></p>

<h3 id="forced-layout-events">Spot forced layout events using warnings</h3>

<p>In the DevTools Timeline, if you see a yellow triangular icon in the Records view, this is an indication some of your code is triggering forced/synchronous layout events.</p>

<p>You ideally want to avoid unnecessary layout triggers as they can have a significant impact on the performance of your page.</p>

<p><img src="tips-and-tricks/image_5.png"></p>

<p><a href="https://plus.google.com/u/0/115133653231679625609/posts/A7rYqkMMmW8">More: Timeline Warnings Are A Performance Smell | G+</a></p>

<h3 id="timeline-shared">Share and analyze a Timeline recorded by someone else</h3>

<p>You can view and share Timelines with other developers thanks to a useful import/export feature. Use <span class="kbd">Ctrl</span> + <span class="kbd">E</span>  or <span class="kbd">Cmd</span> + <span class="kbd">E</span> to start &amp; stop recording then right-click inside the Timeline and use Save Timeline data. The same menu supports Load Timeline data for loading an exported file back in for viewing.</p>

<p><img src="tips-and-tricks/image_6.png"></p>

<h3 id="timeline-recordings">Annotating Timeline Recordings</h3>

<p>Your code can add annotations to Timeline recordings using the <a href="https://developers.google.com/chrome-developer-tools/docs/console#marking_the_timeline">console.timeStamp()</a> method. This helps correlate code in your web app to other activity going on or browser events.</p>

<p><img src="tips-and-tricks/image_7.png"></p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/console#marking_the_timeline">More: DevTools Console API - Marking The Timeline | DevTools Docs</a></p>

<p>Your application can add annotations to Timeline recordings by calling the console.timeStamp() method. This lets you easily correlate code in your application to other activity in your application or browser events. In the following recording, the Timeline is annotated with the string "Adding result". See Marking the Timeline in Using the Console for example code.</p>

<h3 id="counter-display">FPS Counter/HUD Display</h3>

<p>A useful tool for visualizing frame rate and jank is the real-time FPS counter. This can be enabled in the DevTools by going to the Settings menu and checking “Show FPS meter”.</p>

<p><img src="tips-and-tricks/image_8.png"></p>

<p>When activated, you will see a dark box in the top-right corner of your page with frame statistics. The counter can be used during live editing to diagnose what in your page is causing a drop-off in frame rate without having to switch back and forth with the Timeline view.</p>

<p><img src="tips-and-tricks/image_9.png"></p>

<p><a href="http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode">More: Profiling Long Paint Times with DevTools' Continuous Painting Mode | HTML5Rocks</a></p>


<p>Keep in mind that just tracking the FPS counter may lead to you not noticing frames with intermittent jank. Be careful when using the content. It is also worth noting that FPS on desktop does not equal FPS on devices and special care should be taken to profile the performance there too.</p>



<div class="drop-shadow extdoc">

  <!--Description-->
  <p>For more key tricks with profiling using the Timeline, dive into <a href="https://developers.google.com/chrome-developer-tools/docs/using-timeline">Performance Profiling With The Timeline</a>:</p>
  <p></p><ul>
  <li>A place to record and analyze all the activity in your application as it runs. It's the best place to start investigating perceived performance issues in your application.</li>
  <li>Insights into frame-rate, individual types of records that are generated in recordings and the layout process by which Chrome calculates the positions and sizes of all the elements on the page.</li>
  </ul>
<p></p>
  <!--Screenshot -->
<p><a href="https://developers.google.com/chrome-developer-tools/docs/using-timeline"><img src="tips-and-tricks/preview_timeline.png"></a></p>

</div>



<h2>Profiles</h2>

<h3 id="three-snapshot-technique">Finding JavaScript memory leaks with the “3 snapshot” technique</h3>

<ol>
<li><p>Open up the DevTools and switch to the Profiles panel</p></li>
<li><p>Perform an action in your page that makes a leak</p></li>
<li><p>Take a new heap snaphot</p></li>
<li><p>Repeat steps 2 and 3 three times</p></li>
<li><p>Select the latest heap snapshot</p></li>
<li><p>Change the filter “All Object” to “Objects between Snapshot 1 and 2”</p></li>
<li><p>You should now see a set of leaked objects. You can select one and look at the list of retainers in the Object’s retaining tree for insights into what is causing leaks.</p></li>
</ol>


<p><img src="tips-and-tricks/image_25.png"></p>

<p><img src="tips-and-tricks/image_26.png"></p>

<p><a href="https://docs.google.com/presentation/d/1wUVmf78gG-ra5aOxvTfYdiLkdGaR9OhXRnOlIcEmu2s/pub?start=false&amp;loop=false&amp;delayms=3000#slide=id.g1d65bdf6_0_0">More: BloatBusters - Eliminating Memory Leaks In GMail</a></p>

<h3 id="nodes-heap-profiler">Understanding Nodes In The Heap Profiler</h3>

<p>Red nodes are those that are staying alive because they're part of a detached DOM tree and there is a node in the tree referenced from JavaScript (either as a closure variable or by some property).</p>

<p>Yellow nodes indicate a detached DOM node reference from an object's property or an array element - there should be a chain of properties leading from the DOM window to the element (e.g window.foo.bar[2].baz).</p>

<p><img src="tips-and-tricks/image_27.jpg"></p>

<p><a href="https://plus.google.com/u/0/115133653231679625609/posts/hEMupRLRJSF">More: Understanding Nodes In The Heap Profiler | G+</a></p>

<h3 id="timespent-cpu-profiler">Understanding time spent in CPU profiler</h3>

<p>In the CPU profiler, "(idle)" time is now marked as such. Time spent in non-browser processing is "(program)".</p>

<p><img src="tips-and-tricks/image_28.png"></p>

<h3 id="moreinsights-heapprofiler">Additional insights with Heap profiler views</h3>

<p>One common question we get asked is “what are the differences between the Comparison, Dominator, Containment and Summary views in DevTools &gt; Profiles &gt; Heap snapshot”. These views provide additional insights into the data exposed by the profiler and break down as follows:</p>

<p>Comparison view helps you track down memory leaks, by displaying which objects have been correctly cleaned up by the garbage collector. Generally used to record and compare two (or more) memory snapshots of before and after an operation. The idea is that inspecting the delta in freed memory and reference count lets you confirm the presence and cause of a memory leak.</p>

<p>Dominators view helps confirm that no unexpected references to objects are still hanging around (i.e that they are well contained) and that deletion/garbage collection is actually working.</p>

<p>Summary view helps you hunt down objects (and their memory use) based on type grouped by constructor name. This view is particularly helpful for tracking down DOM leaks.</p>

<p>Containment view provides a better view of object structure, helping us analyze objects referenced in the global namespace (i.e. window) to find out what is keeping them around. It lets you analyze closures and dive into your objects at a low level.</p>

<p><img src="tips-and-tricks/image_29.png"></p>


<p><a href="http://addyosmani.com/blog/taming-the-unicorn-easing-javascript-memory-profiling-in-devtools/">More: Taming The Unicorn: Easing JavaScript Memory Profiling In Chrome | AddyOsmani.com</a></p>


<div class="drop-shadow extdoc">

  <!--Description-->
  <p>For more key tricks with memory profiling, dive into <a href="https://developers.google.com/chrome-developer-tools/docs/heap-profiling">Profiling Memory Performance</a>:</p>
  <p></p><ul>
  <li>A place to learn how to use the Heap Profiler for uncovering memory leaks in your applications.</li>
  <li>Insights into the different views of data that are available - including Summary view, Comparison view Containment view and Dominator view.</li>
  </ul>
<p></p>
  <!--Screenshot -->
<p><a href="https://developers.google.com/chrome-developer-tools/docs/heap-profiling"><img src="tips-and-tricks/preview_memory.png"></a></p>

</div>




<h2>Sources</h2>

<h3 id="debug-dom-modifications">Debug on DOM modifications</h3>

<p>Right-click an element and enable ‘Break on Subtree Modifications’: whenever a script traverses that element childs and modifies them, the debugger rolls in automatically to let you inspect what’s happening:</p>

<p><img src="tips-and-tricks/image_30.png"></p>

<p>Also worth noting is that Attribute modifications pause on inline style changes which can be useful for debugging DOM animations.</p>

<h3 id="tracking-uncaught-exceptions">Tracking uncaught exceptions</h3>

<p>From the Sources pane, double clicking the pause script execution (<img src="tips-and-tricks/image_31.png">) button will break the code when an uncaught exception occurs, preserving the call stack and the current state of the application - some refer to this as the purple pause.</p>

<p><img src="tips-and-tricks/image_32.png"></p>

<h3 id="conditional-breakpoint-actions">Conditional breakpoint actions with console.log</h3>

<p>The DevTools support conditional breakpoints, which we know can be set by clicking the line you wish to set a breakpoint on and applying a breakpoint as normal.</p>

<p><img src="tips-and-tricks/image_33.png"></p>

<p>You then right-click the line and "Edit Breakpoint" where you are presented with an expression field. Define your condition here (e.g if the expression evaluates as truthy execution will break here).</p>

<p><img src="tips-and-tricks/image_34.png"></p>

<p>A normal expression may be of the form <code>x === 5</code>, however console.log statements are also completely valid input in the field.</p>

<p><img src="tips-and-tricks/image_35.png"></p>

<p>This approach works well and we can easily see the console.log statements being fired in the console on breakpoints:</p>

<p><img src="tips-and-tricks/image_36.png"></p>

<p>As console.log doesn't have a real return value, undefined means the conditional breakpoint won't result in execution being paused and your code will continue to run. It's much like a hard-coded console.log statement without the need to modify your code directly.</p>

<p><a href="http://www.google.com/url?q=http%3A%2F%2Fwww.randomthink.net%2Fblog%2F2012%2F11%2Fbreakpoint-actions-in-javascript%2F&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNE9yz1n3H6Boru1bl11nQdiUwmR4w">More: Breakpoint Actions In JavaScript | randomthink.net</a></p>

<h3 id="prettyprint-javascript">Pretty Print JavaScript</h3>

<p>The DevTools support prettifying of minified JavaScript to a more readable form. To pretty print:</p>

<ul>
<li><p>Go to the Sources panel and selected your desired script from the scripts list.</p></li>
<li><p>Next, press the "Pretty print" button <img src="tips-and-tricks/image_37.png"> (marked with curly braces) from the bottom of the DevTools window.</p></li>
<li><p>Your code should now be prettified!</p></li>
</ul>


<p>Before</p>

<p><img src="tips-and-tricks/image_38.png"></p>

<p>After</p>

<p><img src="tips-and-tricks/image_39.png"></p>

<h3 id="favorite-expression">‘Favorite’ an expression or variable value</h3>

<p>Instead of writing again and again a variable name or an expression you are going to check a lot during a debug session, add it to the ‘Watch Expression’ list. You refresh the values if you modify them directly, or just watch them change while the code runs</p>

<p><img src="tips-and-tricks/image_40.png"></p>

<h3 id="insights-internal">Get insights into internal properties</h3>

<p>Suppose you've defined a variable of value `s` and it performs the following operation:</p>

<pre>s.substring(1, 4)  // returns 'ell'
</pre>

<p>Do you think that `s` is a string? Not necessarily. It also can be a string object wrapper. Try the following in watch expressions:</p>

<pre>"hello"
Object("hello")
</pre>

<p>First is a regular string value, the second is a full-featured object. As confusing as it could be, the two values behave almost identically. But the second one has real properties and you can set your own too.</p>

<p>Expand the properties list and you will notice, how it's not a completely regular object: it will have an internal property <code>[[PrimitiveValue]]</code>, where the original string value is stored. You cannot access this property from your code, but you can see it in DevTools debugger now.</p>

<p><a href="http://www.google.com/url?q=https%3A%2F%2Fgist.github.com%2Fpaulirish%2F4158604&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNEoLc-D7771J2l_GvAj0QkGOuT0QQ">More: Learn JavaScript Concepts With The DevTools | GitHub</a></p>

<h3 id="debug-xhr">Easily debug XHRs</h3>

<p>From the debugger open the “XHR Breakpoints” section, you can specify any URL (even a substring) your code should break into when doing an XHR request. Or even tell it to break on every XHR:</p>

<p><img src="tips-and-tricks/image_41.jpg"></p>

<h3 id="retrieve-handlers">Retrieve event handlers registered on elements</h3>

<p>With the "Elements" tab open, find an element in the DOM tree and click to select the node. Note: You can also do this using the console API with <code>getEventListeners(targetNode);</code></p>

<p>Next on the right, click to expand the "Event Listeners" section. There you will find a list of all event listeners attached to the element.</p>

<p><img src="tips-and-tricks/image_42.png"></p>

<h3 id="escape-console">Escape to see the console</h3>

<p>When debugging in the Sources panel, you sometimes require simultaneous access to a console. Simply hit the escape key and the console panel will be displayed.</p>

<p>You can write and execute JavaScript in this console as expected, but what's even better is if you're paused at a breakpoint, JS executed will be within the currently paused context.</p>

<p><img src="tips-and-tricks/image_43.png"></p>

<h3 id="paused-breakpoint">Become more effective when paused at a breakpoint</h3>

<p>While your script is paused at a breakpoint, there are a number of useful features at your disposal.</p>

<p><img src="tips-and-tricks/image_44.png"></p>

<p>You might know that you can move around using "Continue", "Step Over", "Step Into" and "Step Out", but there are keyboard shortcuts available for each of these buttons. As mentioned in an earlier tip, <span class="kbd">?</span> will bring up a panel displaying them. Learn them as they'll make you more efficient at navigating through your code.</p>

<p>Watch Expressions (in the sidebar to the right) will keep an eye on expressions so you don't have to keep switching back to the console (e.g X === Y). Call Stack (under it) displays function cals the system has gone through to achieve where it is at present.</p>

<p>In Scope Variables, you're able to right click on any function and hten use "Jump to definition" to jump to the line in your script that defines that function.</p>

<p>DOM Breakpoints display any "Break on" modifications taken by right-clicking on a node in the Elements panel. This is helpful for debugging whether listeners have been correctly attached to nodes and what occurs when they are invokved.</p>

<p>The XHR Breakpoints panel is also useful as it can setup a breakpoint for XMLHttpRequests. Specify a breakpoint by typing in a substring of the URL you wish to inspect.</p>

<h3 id="pause-exceptions">Pause on exceptions</h3>

<p>You may want to pause JavaScript execution next time an exception is thrown and inspect its call stack, scope variables and state of your app.</p>

<p><img src="tips-and-tricks/image_45.png"></p>

<p>A tri-state stop button ( <img src="tips-and-tricks/image_46.png">) at the bottom of the Scripts panel enables you to switch between different exception handling modes:</p>

<ul>
<li><p>Pause on all exceptions <img src="tips-and-tricks/image_47.png"></p></li>
<li><p>Pause on uncaught exceptions <img src="tips-and-tricks/pauseuncaught.png"></p></li>
<li><p>Don’t pause on exceptions (default) <img src="tips-and-tricks/image_49.png"></p></li>
</ul>



<h3 id="textsearch-across-allscripts">Text search across all scripts</h3>

<p>If you wish to search across all of the files loaded for a page for a particular string, you can load up the search pane using the following shortcut:</p>

<ul>
<li><p><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">F</span> (Windows, Linux)</p></li>
<li><p><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">F</span> (Max OSX)</p></li>
</ul>


<p>This supports both regular expressions and case sensitive search.</p>

<p><img src="tips-and-tricks/image_50.png"></p>

<h3 id="coffeescript-sourcemaps">Debugging CoffeeScript With DevTools And Source Maps</h3>

<p>Source Maps provide a language-agnostic way to map compiled production code back to the original source code that was authored in your development environment.</p>

<p>When analyzing code generated for production, it is often minified (and in the case of a language that tranpiles to JavaScript, compiled) making it difficult to locate where the lines map to your originally authored code.</p>

<p>During the compilation phase, source maps can store this information, allowing you to debug production code, a line will return the exact location in the original file back to you. This makes a world of difference as you can both read and debug production code, whether it's in CoffeeScript or otherwise - as long as it has a source map.</p>

<p>To enable Source Maps support in Chrome:</p>

<ul>
<li><p>Open the Settings cog &gt; General</p></li>
<li><p>Select "Enable source maps"</p></li>
</ul>


<p><img src="tips-and-tricks/image_51.png"></p>

<p>Next:</p>

<ul>
<li><p>Compile your CoffeeScript to JavaScript running: coffee -c myexample.coffee</p></li>
<li><p>Install <a href="https://github.com/michaelficarra/CoffeeScriptRedux">CoffeeScript Redux</a></p></li>
<li><p>Create a Source map file example.js.map which will hold the mapping information: <code>$ coffee-redux/bin/coffee --source-map -i example.coffee &gt; example.js.map</code></p></li>
<li><p>Make sure the generated JavaScript file, example.js, has the source mapping url at the end as follows: <code>//# sourceMappingURL=example.js.map</code></p></li>
</ul>


<p><img src="tips-and-tricks/image_52.png"></p>

<p>Now when you're debugging CoffeeScript code, thanks to this statement the DevTools know where your original source file lives.</p>

<p>You could then take this source map and during your optimization/minification phase use a tool like UglifyJS2 to reference this first source map (CS to JS) and have it map the minified JavaScript back to the CoffeeScript and not the compiled JavaScript output. This allows you to debug production code straight back to your source CoffeeScript code.</p>

<p><a href="http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/">More: NetTuts - Source Maps 101</a></p>


<div class="drop-shadow extdoc">

  <!--Description-->
  <p>For more key tricks with your authoring workflow, dive into <a href="https://developers.google.com/chrome-developer-tools/docs/authoring-development-workflow">Authoring And Development Workflow</a>:</p>
  <p></p><ul>
  <li>A place to learn how to optimize your development workflow to save time achieving common tasks, such as locating files or functions, persisting edits to scripts or stylesheets or simply rearranging the layout to better suit your needs.</li>
  <li>Learning about new features such as Snippets which can be used to save and execute custom snippets of JavaScripts which are always available inside the DevTools.</li>
  </ul>
<p></p>
  <!--Screenshot -->
<p><a href="https://developers.google.com/chrome-developer-tools/docs/authoring-development-workflow"><img src="tips-and-tricks/preview_authoring.png"></a></p>
</div>



<h2>Elements</h2>

<h3 id="enable-rulers">Enable rulers</h3>

<p>Under Settings &gt; General &gt; Show rulers a ruler can be enabled which will be displayed when you hover over or select an element in the Elements panel.</p>

<p><img src="tips-and-tricks/image_53.png"></p>

<h3 id="css-autocomplete">Autocompletion of CSS properties</h3>

<p>The DevTools support autocompletion of known CSS properties and values (including those requiring a prefix), which is a useful way to determine which properties can be set for the current element.</p>

<p>Suggestions are displayed when you begin to type in a name for for a property or value, but you can also scroll through the available options for some properties using the right arrow key. It's also useful to know that the selected item will get applied to the page stylesheet so its effect will become visible instantly.</p>

<p><img src="tips-and-tricks/image_55.png"></p>

<p>Colors can be defined within the Styles pane using named (e.g ‘red’), HSL, HEX or RGB values. You can shift/click to iterate through these if required.</p>

<p>Should you wish to display all supported values for a property, you can use <span class="kbd">Ctrl</span> + <span class="kbd">space</span> to display a complete list of suggestions.</p>

<p><img src="tips-and-tricks/image_56.png"></p>

<p>The list of suggestions is context-specific and in certain cases (e.g font) numeric, named and prefixed values supported will also be displayed.</p>

<p><img src="tips-and-tricks/image_57.png"></p>

<h3 id="colorpicker">Color picker in the DevTools</h3>

<p>The DevTools include a built-in color picker which is displayed when clicking on the colored preview square next to any valid color.</p>

<p><img src="tips-and-tricks/colorpickercanary.png"></p>

<p>You can <span class="kbd">Shift</span> + click to change the color format of the color being selected.</p>

<h3 id="adding-styles">Adding new CSS styles</h3>

<p>Clicking anywhere within the opening and closing brackets for a CSS rule (including within "element.style"), allows you to add a new CSS property which will similarly be instantly applied.</p>

<p><img src="tips-and-tricks/image_60.png"></p>

<p>Once you have finished adding a property, you can hit the tab key to set the next property.</p>

<p>New selectors can be added by clicking the <img src="tips-and-tricks/image_61.png">button to the right-hand side of the "Styles" sub-panel. This allows you to define a selector and similarly, add new properties and values as needed.</p>

<p>Note: You can also edit any selector in the Styles pane by single-clicking on the name of a selector. Once the name has been changed, the existing properties for the selector will be applied to the element selection defined by the new selector.</p>

<p><img src="tips-and-tricks/image_62.png"></p>

<p>New pseudo-selectors can be added in a similar fashion, by appending them to the name of a selector. Also note that clicking on the "toggle element states" <img src="tips-and-tricks/image_63.png">button, to the right of the  new selector button will toggle the visibility of the "Force element state" pane.</p>

<p><img src="tips-and-tricks/image_64.png"></p>

<p>Going back to the “Matched CSS Rules” panel, clicking on the link to the stylesheet next to a rule will take you to the Sources panel.  The will display the complete stylesheet and take you to the line number where the relevant CSS rule exists.</p>

<p><img src="tips-and-tricks/image_65.png"></p>

<h3 id="dragdrop-elements">Drag and drop in the Elements panel</h3>

<p>In the Elements panel you can drag-and-drop an element to change its position within its parent, or move it to a completely different part of the document.</p>

<p><img src="tips-and-tricks/image_66.png"></p>

<h3 id="force-element-state">Force Element State</h3>

<p>Want to force an element to adopt a particular state?</p>

<ul>
<li><p>Right click on a child element and select 'Inspect Element'</p></li>
<li><p>In the Elements panel right-click the parent element and choose "Force Element State"</p></li>
<li><p>You can now choose one of :active, :hover, :focus or :visited to force the element into one of these states.</p></li>
</ul>


<p><img src="tips-and-tricks/image_67.png"></p>

<h3 id="debugging-sass">Writing and debugging Sass with the DevTools</h3>

<p class="note"><strong>Note:</strong> To use Sass debugging in Chrome you need to have version <a href="http://sass-lang.com/download.html">3.3.0 (pre-release)</a> of the Sass compiler, which is the only version that currently supports source map generation.</p>

<p>Working with a page containing pre-processed CSS can be a challenge as modifications made to your CSS styles within the DevTools typically won’t apply them back to your Sass source files. This means if making changes to your styles on the fly, you would need to go back and manually apply them to your source files using an external editor if you wanted to maintain them.</p>

<p>This is no longer an issue with recent improvements which improve the Sass development workflow. To enable Sass support:</p>

<ol>
<li><p>Check to ensure you have Developer Tools experiments enabled in about:flags.</p></li>
<li><p>Next, go to the Settings cog &gt; Experiments and enable “Sass stylesheet debugging” (Note that this feature will be out of experiments soon).</p> <p><img src="tips-and-tricks/stylesheetdebugging.png"></p></li>
<li><p>Go to the General menu &gt; Settings &gt; Check “Enable source maps” and “Auto-reload CSS upon Sass save”.</p>

  <p><img src="tips-and-tricks/autoreload.png"></p>

  <p>You can leave the timeout at its default value. Depending on how long the Sass compiler needs to complete its work, you may need to adjust the auto-reload delay. You can also disable auto-reload to manually reload the page as necessary.</p> </li>
<li><p>Navigate to the page for a project you wish to debug Sass on in Chrome (with the DevTools open)</p></li>
<li><p>Next, fire up the Sass compiler using the following flags (which also specify a target CSS compile target): <code>sass --watch --sourcemap sass/styles.scss:styles.css</code>. This will have Sass watch for changes to your Sass source files and create source map files (.map) for each generated CSS file. You should see something similar to the below in your terminal:</p> <p><img src="tips-and-tricks/image_70.png"></p><p>This confirms Sass debugging is indeed working.</p></li>

<li><p>If the setup worked as expected, you can go to the Elements panel. The first thing you’ll notice is that the filename for your styles will now display the corresponding .scss source file as well as the line number reflecting the line number in your source.</p>

<p><img src="tips-and-tricks/image_71.png"></p>
</li>
<li>
<p>Clicking on a filename from here will take you directly to the Sources panel, with the line that corresponds to the selector highlighted. You’re now able to work with your Sass source file directly inside the developer tools with syntax highlighting in place.</p>

<p><img src="tips-and-tricks/image_72.jpg"></p>
</li>
<li>
<p>When you wish to edit a Sass file from inside the Sources panel, the one thing you need to ensure is that DevTools is aware of where this file exists in your local file system. Right-click within the editor and choose “Save As” to overwrite your original source file with the one you are editing. As auto-reloading has been enabled and Sass is running in the background, changes we make are instantaneously shown inside both Chrome and the DevTools editor.</p>

<p><img src="tips-and-tricks/image_73.png"></p>
</li>
</ol>



<div class="drop-shadow extdoc">

  <!--Description-->
  <p>For more key tricks with working with elements and styles, dive into <a href="https://developers.google.com/chrome-developer-tools/docs/elements">Editing Styles And The DOM</a>:</p>
  <p></p><ul>

  <li>A place to learn how to view the real underlying structure of the page. For example, you may be curious if an image has an HTML id attribute, and what that attribute's value is.</li>
  <li>Discovery how to see everything in one DOM tree, including inspection and on-the-fly editing of DOM elements. You will often visit the Elements tabs when you need to identify the HTML snippet for some aspect of the page.</li>
  </ul>

<p></p>
  <!--Screenshot -->
<p><a href="https://developers.google.com/chrome-developer-tools/docs/elements"><img src="tips-and-tricks/preview_elements.png"></a></p>

</div>


<h2>Network</h2>

<h3 id="replay-xhrs">Replay XHRs</h3>

<p>As you probably know, the Network panel shows a list of all the requests your page has made including XHRs. You can replay any XHR (POST or GET) by right-clicking on the request to display the context-menu then selecting “Replay XHR”.</p>

<p><img src="tips-and-tricks/image_74.png"></p>

<h3 id="clear-network">Clear the network cache or cookies</h3>

<p>Right-click/<span class="kbd">Ctrl</span>-click anywhere in Network panel and select Clear Browser Cache/Network Cache from context menu.</p>

<p><img src="tips-and-tricks/image_75.png"></p>

<h3 id="record-export-trace">Record a trace &amp; export the waterfall</h3>

<ul>
<li><p>Hit "record" to capture a multi-page trace</p></li>
<li><p>Export request meta-data: right click, "Copy Entry as HAR"</p></li>
<li><p>Export entire waterfall: right click, "Copy All as HAR"</p></li>
</ul>


<p><img src="tips-and-tricks/image_76.png"></p>

<p><a href="http://www.google.com/url?q=http%3A%2F%2Fwww.igvita.com%2Fslides%2F2012%2Fdevtools-tips-and-tricks%2F%231&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNHwM1MWYUas6E9zsZxBARF0igWUow">More: Wait, DevTools Could Do That? | Igvita.com</a></p>

<h3 id="details-network">Using large resource rows in network timeline for more detail</h3>

<p>By triggering the “Use large resource rows” icon in the bottom of the Network panel, you can enable display of additional insights not found in the more compact/smaller resource rows view.</p>

<p><img src="tips-and-tricks/image_77.png"></p>

<p>Compare the smaller resource rows view:</p>

<p><img src="tips-and-tricks/image_78.png"></p>

<p>and the larger row version:</p>

<p><img src="tips-and-tricks/image_79.png"></p>

<h3>Tricks for getting more information out of the Network panel</h3>

<p><strong>Left-click</strong> on the header of the Timeline column in the Network panel to get access to further insights about network requests. You can switch between:</p>

<ul>
<li><p>Timeline</p></li>
<li><p>Start Time</p></li>
<li><p>Response Time</p></li>
<li><p>End Time</p></li>
<li><p>Duration</p></li>
<li><p>Latency</p></li>
</ul>

<p><img src="tips-and-tricks/network-left.png"></p>

<b>View the text in gray for insights into:</b>

<ul>
<li><p>What is the HTTP overhead on each request?</p></li>
<li><p>What is the time to first byte (TTFB) for each request?</p></li>
<li><p>Which is the slowest resource by response time?</p></li>
<li><p>Which is the slowest resource by duration?</p></li>
</ul>

<p><strong>Right-click</strong> anywhere on the header of any column in the network panel and you can enable or disable columns. 3 of these columns are not shown by default:</p>
<p>
  </p><ul>
    <li>Cookies</li>
    <li>Domain</li>
    <li>Set-Cookies</li>
  </ul>
<p></p>

<p><img src="tips-and-tricks/network-right.png"></p>

<h3 id="websocket-inspection">WebSocket inspection</h3>

<p>In the Network panel, you can use the filters at the bottom of the window to inspect WebSocket message frames.</p>

<p><img src="tips-and-tricks/websocketbar.png"></p>

<p>For example, navigate to the <a href="http://www.websocket.org/echo.html">Echo</a> demo, select the "WebSockets" filter from the bottom of the Network panel then click the "Connect" button. Any messages you send by clicking the 'Send' button can be inspected using the 'Frames' subpanel.</p>

<p><img src="tips-and-tricks/websocketdemo.png"></p>

<p>Green reflects messages sent by your client. WebSocket inspection is useful has it allows you to inspect both the WebSocket handshake as well as individual WebSocket frames.</p>


<p><a href="http://www.igvita.com/slides/2012/devtools-tips-and-tricks/#1">More: Wait, DevTools Could Do That? | Igvita.com</a></p>

<p><a href="http://blog.kaazing.com/2012/05/09/inspecting-websocket-traffic-with-chrome-developer-tools/">More: WebSocket inspection with DevTools | Zaaking</a></p>

<h3 id="find-filter-xhrs">Find and filter XHRs from the Network panel</h3>

<p>When inspecting network requests in the Network panel you often need to narrow down to a specific request based on a specific keyboard. This can be easily done using the<span class="kbd">Ctrl</span> + <span class="kbd">F</span> or <span class="kbd">Cmd</span> + <span class="kbd">F</span> keyboard shortcut.</p>

<p>In the search input field, type in the keyword you are searching for and those requests with a filename/URL matching it will be highlighted. You can flip between results using the up and down buttons beside the input field.</p>

<p><img src="tips-and-tricks/image_82.png"></p>

<p>Although this is useful, it can be of more help to only display those results in the Network panel that matched your search term. Checking the “Filter” option will do this and we can see below.</p>

<p><img src="tips-and-tricks/image_83.png"></p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/network">More: Evaluating Network Performance | DevTools Docs</a></p>

<h3 id="dump-network-stack">Get a dump of the network stack’s internal state</h3>

<p>The "about:net-internals" page is a special URL that dumps a view of the network stack's internal state. This data can be helpful when debugging performance or connectivity problems. It includes information on request performance, proxy settings and DNS cache.</p>

<p><img src="tips-and-tricks/image_84.png"></p>

<p>Also note that <code>about:net-internals/#tests</code> is able to run tests for a specific URL.</p>



<div class="drop-shadow extdoc">

  <!--Description-->
  <p>For more key tricks with measuring network performance, dive into <a href="https://developers.google.com/chrome-developer-tools/docs/network">Evaluating Network Performance</a>:</p>
  <p></p><ul>

  <li>A place to learn how to get insights each network operation in your application, including detailed timing data, HTTP request and response headers, cookies, WebSocket data, and more</li>
  <li>Learn which resource had the slowest time to first byte?. Which resources took the longest time to load (duration)? Who initiated a particular network request? and much more.</li>
  </ul>

<p></p>
  <!--Screenshot -->
<p><a href="https://developers.google.com/chrome-developer-tools/docs/network"><img src="tips-and-tricks/preview_network.png"></a></p>

</div>



<h2>Settings</h2>

<h3 id="emulating-touch">Emulating touch events</h3>

<p>Touch is an input method that's difficult to test on the desktop, since most desktops don't have touch input. Having to test on mobile can lengthen your development cycle, since every change you make needs to be pushed out to a server and then loaded on the device.</p>

<p>A solution to this problem is to simulate touch events on your development machine. For single-touches, the Chrome DevTools supports single<a href="http://www.w3.org/TR/touch-events/"> touch event</a> emulation to make it easier to debug mobile applications on the desktop.</p>

<p>To enable support for touch event emulation:</p>

<ol>
<li><p>Open up the overrides menu in the DevTools</p></li>
<li><p>Scroll down and check “Enable touch events”</p></li>
</ol>

<p><img src="tips-and-tricks/image_85.png"></p>

<p>We can now debug touch events in the same way that we can with standard desktop events via Event Listener Breakpoints in Sources.</p>

<p class="note"><strong>Note:</strong> A caveat with touch event emulation is that the DOM0 event handlers do not currently work with the emulation
mode. See <a href="https://code.google.com/p/chromium/issues/detail?id=133915">here</a> for the relevant bug to track.</p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/mobile-emulation">More: DevTools Mobile Emulation | DevTools Docs</a></p>

<h3 id="emulating-ua-viewports">Emulating UA Strings &amp; Device Viewports</h3>

<p>It’s often easier to start prototyping on the desktop and then tackle the mobile-specific parts on the devices you intend to support. Device emulation can make this process more straightforward.</p>

<p>The DevTools support for device emulation includes native User Agent and dimension overriding. This allows developers to debug mobile browsers on different devices and operating systems via the overrides Menu.</p>

<p><img src="tips-and-tricks/image_86.png"></p>

<p>Now you can emulate the exact device metrics of devices like the Galaxy Nexus and the iPhone to test your media query-driven design.</p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/mobile-emulation">More: DevTools Mobile Emulation | DevTools Docs</a></p>

<h3 id="emulating-gelocation">Emulating Geolocation</h3>

<p>When working with HTML5 geolocation support in an application, it can be useful to debug the output received when using different values for longitude and latitude.</p>

<p>The DevTools support both overriding position values for navigator.geolocation and simulating geolocation not being available via the overrides menu.</p>

<p><img src="tips-and-tricks/image_87.png"></p>

<p>Overriding geolocation positions</p>

<ol>
<li><p>Navigate to the<a href="http://html5demos.com/geo"> Geolocation</a> demo</p></li>
<li><p>Allow the page access to your position. This should hopefully be accurate.</p></li>
<li><p>Open up the overrides menu in the DevTools</p></li>
<li><p>Check “Override Geolocation” then enter in Lat = 41.4949819 and Lat = -0.1461206</p></li>
</ol>


<p><img src="tips-and-tricks/image_88.png"></p>

<ol>
<li>Refresh the page. The demo will now use your overridden positions for geolocation</li>
</ol>


<p><img src="tips-and-tricks/image_89.png"></p>

<ol>
<li><p>Now check the “Emulate position unavailable” option</p></li>
<li><p>Refresh the page. The demo will now inform you that finding your location failed</p></li>
</ol>

<p><img src="tips-and-tricks/image_90.png"></p>

<p><a href="https://developers.google.com/chrome-developer-tools/docs/mobile-emulation">More: DevTools Mobile Emulation | DevTools Docs</a></p>

<h3 id="dock-to-right-viewport">Dock-to-right for viewport debugging</h3>

<p>Dock-to-right mode is also useful for previewing how your pages look when viewed on screens with smaller viewports. To use this:</p>

<ul>
<li><p>Enable dock-to-right mode by long-holding on the layout switcher icon <img src="tips-and-tricks/image_91.png"> at the bottom of the DevTools window</p></li>
<li><p>You can now drag the window splitter right and left to change the width of the viewport and trigger your media query breakpoints.</p></li>
</ul>


<p><img src="tips-and-tricks/image_92.png"></p>

<h3 id="disable-javascript">Disable JavaScript</h3>

<p>Click the Settings cog in the lower-right corner, then under Settings -&gt; General enable “Disable JavaScript”. While the DevTools are open and this option is checked JavaScript will be disabled in the current page.</p>

<p><img src="tips-and-tricks/disablejavascript.png"></p>

<p>Should you require it, you can also run Chrome with the “-disable-javascript” flag to achieve the same effect.</p>

<h2>General</h2>

<h3 id="switch-between-tabs">Quickly switch between tabs</h3>

<p>The <span class="kbd">Cmd</span> + <span class="kbd">]</span> and <span class="kbd">Cmd</span> + <span class="kbd">[</span> (or <span class="kbd">Ctrl</span> + <span class="kbd">]</span> and <span class="kbd">Ctrl</span> + <span class="kbd">[</span>) shortcuts allow you to move right and left between the different tabs within the DevTools with ease. Use them to avoid manually selecting the tab you’re after!.</p>

<p><img src="tips-and-tricks/image_94.png"></p>

<h3 id="improved-dock-to-right">Get an improved dock-to-right experience</h3>

<p>Improved horizontal splitting for the Elements and Sources panels are now in Chrome beta and can be experienced anytime you toggle dock-to-right mode:</p>

<p><img src="tips-and-tricks/image_95.png"></p>

<p>However, if you have a very wide screen and would like to disable this, simply uncheck the “Split panels vertically when docked to right” option in the Settings panel.</p>

<p><img src="tips-and-tricks/toolbaricons.png"></p>

<p><a href="https://plus.google.com/u/0/115133653231679625609/posts/8bfFX8BVzTQ">More: 3 Steps To A Better Dock-To-Right Experience | G+</a></p>

<h3 id="disable-cache">Use ‘Disable Cache’ for cache invalidation</h3>

<p>Under the Settings cog, you can enable ‘Disable cache’ to invalidate the disk cache. This is great for developing, but the DevTools must be visible/open for this to work.</p>

<p><img src="tips-and-tricks/disablecache.png"></p>

<h3 id="inspect-shadow-dom">Inspect Shadow DOM</h3>

<p>Elements which have Shadow DOM elements will now be displayed in the elements tab.</p>

<ol>
<li><p>Enable the ‘Show Shadow DOM’ checkbox in Settings</p></li>
<li><p>Restart the DevTools</p></li>
</ol>


<p><img src="tips-and-tricks/image_98.png"></p>

<p>You can now peek inside Shadow DOM. For example, you can poke around the Shadow DOM <a href="http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/">Title</a> demo on HTML5 Rocks:</p>

<p><img src="tips-and-tricks/image_99.png"></p>

<h3 id="preview-inspectable-pages">Preview all inspectable pages</h3>

<p>If you find yourself regularly using remote debugging, you might enjoy “about:inspect” which displays all inspectable tabs/extensions in Chrome. Click 'inspect' to switch to a page &amp; launch the DevTools for it in one go.</p>

<p><img src="tips-and-tricks/image_100.png"></p>

<h3 id="appcached-sites">Get insights into which sites have appcache'd</h3>

<p>You can see information about appcached sites by visiting “about:appcache-internals”. This allows you to see which sites have appcached, when they were last modified, and how much space they're using. You can also remove appcaches here.</p>

<p><img src="tips-and-tricks/image_101.png"></p>

<h3 id="multiple-filters">Select multiple filters in the Network/Console panels</h3>

<p>You’re probably aware that there are filters available in the Network and Console panels, allowing you to narrow down the data displays based on different criteria.</p>

<p>What you probably don’t know is that you can use a shortcut (<span class="kbd">Cmd</span> / <span class="kbd">Ctrl</span> + click) to select more than one filter to be applied to view. Below you can see this in action across both panels.</p>

<p><img src="tips-and-tricks/image_102.png"></p>

<p><img src="tips-and-tricks/image_103.png"></p>

<h3 id="hard-reload">Clear the cache and perform a hard reload</h3>

<p>If you require a hard refresh, click and hold Chrome’s refresh button with the DevTools open. You should see a drop-down menu allowing you to clear the cache and do a hard reload in one go. Time saver!.</p>

<p>Note: This is currently only available on Windows and ChromeOS</p>

<p><img src="tips-and-tricks/image_104.png"></p>

<h3 id="chrome-task-manager">Insights with the Chrome Task Manager</h3>

<p>The task manager in Chrome can give you useful insights into the GPU, CPU and JavaScript memory usage, CSS and Script cache usage and more for any tab.</p>

<p>Follow these steps to open the task manager:</p>

<ol>
<li><p>Click the Chrome menu on the browser toolbar.</p></li>
<li><p>Select Tools.</p></li>
<li><p>Select Task manager.</p></li>
<li><p>From there you can either select additional views to drill down to by right-clicking on any column or end a process by right-clicking on it.</p></li>
</ol>

<h2>Additional Tools</h2>

<h3 id="debugging-ios-apps">Debugging iOS apps in DevTools</h3>

<p><a href="https://github.com/square/PonyDebugger">PonyDebugger</a> is a client library and gateway server combination that uses Chrome Developer Tools on your browser to debug your application's network traffic and managed object contexts.</p>

<p><img src="tips-and-tricks/image_105.png"></p>

<h3 id="jsruntime">JSRunTime: DevTools Extension For Grepping JavaScript Objects</h3>

<p><a href="https://plus.google.com/114708134049085210473">Andrei Kashcha</a> wrote a very useful extension for DevTools that can grep a reachable graph of JavaScript objects in memory and find matches by their value or name.</p>

<p><img src="tips-and-tricks/image_106.jpg"></p>

<p><a href="https://plus.google.com/u/0/115133653231679625609/posts/ih85hKCyGve">More: JSRuntime - A DevTools Extension For Grepping Objects | G+</a>.</p>

<h2 id="other-resources">Other Resources</h2>

<p>In addition to the tips above, there are also a number of fantastic external resources, slides, articles and videos that discuss the lesser known capabilities of the DevTools. We recommend looking at:</p>

<ul>
<li><a href="http://www.youtube.com/watch?v=x6qe_kVaBpg">Chrome DevTools Revolutions 2013 (I/O 2013)</a></li>
<li><a href="www.youtube.com/watch?v=kVSo4buDAEE">Improving Your 2013 Productivity With The Chrome DevTools
</a></li>
<li><a href="http://anti-code.com/devtools-cheatsheet/">The DevTools Cheatsheet</a></li>
<li><a href="http://www.igvita.com/slides/2012/devtools-tips-and-tricks/#1">Wait DevTools can do that?</a></li>
<li><a href="http://www.youtube.com/watch?v=3pxf3Ju2row">Chrome DevTools Evolution (I/O 2012)</a></li><a href="http://www.youtube.com/watch?v=3pxf3Ju2row">
</a><li><a href="http://www.youtube.com/watch?v=3pxf3Ju2row"></a><a href="http://paulirish.com/2011/a-re-introduction-to-the-chrome-developer-tools/">A Re-introduction to the Chrome DevTools (I/O 2011)</a></li><a href="http://paulirish.com/2011/a-re-introduction-to-the-chrome-developer-tools/">
</a><li><a href="http://paulirish.com/2011/a-re-introduction-to-the-chrome-developer-tools/"></a><a href="http://www.elijahmanor.com/2012/02/textmate-like-t-t-in-chrome-dev-tools.html">TextMate-like features in Chrome DevTools</a></li>
<li><a href="http://www.youtube.com/watch?v=nOEw9iiopwI">Google Chrome Developer Tools: 12 Tricks to Develop Quicker</a></li>
<li><a href="http://www.youtube.com/watch?v=4mf_yNLlgic">Become a JavaScript Power User With The DevTools</a></li>
<li><a href="http://jtaby.com/2012/04/23/modern-web-development-part-1.html">Modern Web Development</a></li>
</ul>



  
  </div>