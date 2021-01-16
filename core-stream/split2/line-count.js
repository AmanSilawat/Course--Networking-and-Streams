// ! npm install split2 
let split = require('split2');
let through = require('through2');

process.stdin
    .pipe(split())
    .pipe(through(function(buf, enc, next) {
        console.log(buf);
        next();
    }))


// $ node line-count.js 
// hello
// <Buffer 68 65 6c 6c 6f>
// my
// <Buffer 6d 79>
// name



// $ echo -e 'one\ntwo\nthree' | node line-count.js 
// <Buffer 6f 6e 65>
// <Buffer 74 77 6f>
// <Buffer 74 68 72 65 65>