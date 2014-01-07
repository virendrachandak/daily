var Chrome = require('chrome-remote-interface');
Chrome(function(chrome) {
  with(chrome) {
    on('Network.requestWillBeSent', function(message) {
      console.log(message.request.url);
    });
    on('Page.loadEventFired', close);
    Network.enable();
    Page.enable(); 
    Page.navigator({'url': 'https://github.com'});
  }
}).on('error', function() {
  console.error('Cannot connect to Chrome');
});
