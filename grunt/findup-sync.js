var findup = require('findup-sync');// Start looking in the CWD.var filepath1 = findup('{a, b}*.txt');console.log(process.cwd('../'));// Start looking somewhere else, and ignore case (probably a good idea).var filepath2 = findup('{a, b}*.txt', {cwd: '/some/path', nocase: true});// <https://github.com/cowboy/node-findup-sync>