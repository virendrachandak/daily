[origin](https://gist.github.com/benfoxall/4218050)

```javascript
<script type="text/javascript">
// See MDN: https://developer.mozilla.org/en-US/docs/DOM/MutationObserver?redirectlocale=en-US&redirectslug=DOM%2FDOM_Mutation_Observers
(function(){
  // select the target node
  var target = document.querySelector('body');
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  var i={};
   
  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        i[mutation.type] = (i[mutation.type] || 0) + 1;
    });
    console.log(Object.keys(i).map(function(k){
        return k + '=' + i[k]
    }).join(', '))
  });
      
  // configuration of the observer:
  var config = {
    childList: true, 
    attributes: true, 
    characterData: true, 
    subtree: true, 
    attributeOldValue: true, 
    characterDataOldValue: true, 
    attributeFilter: true
  };
 
  // pass in the target node, as well as the observer options
  observer.observe(target, config);
})();
</script>
```
