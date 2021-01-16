let createHash = require('crypto').createHash

process.stdin.pipe(createHash('sha512'))
    .pipe(process.stdout);


// $ node crypto.js
// type sometext and press ctrl + d

// $ echo -n abcd | node crypto.js
// $ echo -n abcd | node crypto.js; echo


// echo -n abcd | shasum -a 512
// d8022f2060ad6efd297ab73dcc5355c9b214054b0d1776a136a669d26a7d3b14f73aa0d0ebff19ee333368f0164b6419a96da49e3e481753e7e96b716bdccb6f  -