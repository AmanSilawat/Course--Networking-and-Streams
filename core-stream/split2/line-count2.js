// ! npm install split2 
let split = require('split2');
let through = require('through2');
let lineCount = 0;

process.stdin
    .pipe(split())
    .pipe(through(write, end))

function write(vuf, enc, next) {
    lineCount++;
    next();
}
function end(next) {
    console.log(lineCount);
    next();
}

// $ wc -l < line-count2.js
// 16

// $ node line-count2.js  < line-count2.js 
// 16
