var minimatch = require('minimatch');minimatch('bar.foo', '*.foo');minimatch('bar.foo', 'foo.*');minimatch('bar.foo', '*.+(bar|foo', {debug: true}); // true, and noisy!//  <https://github.com/isaacs/minimatch>