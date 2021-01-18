// ! npm i split2 to2
let split = require('split2')
let to = require('to2')
let lineCount = 0

process.stdin
    .pipe(split())
    .pipe(to(write, end))

function write(buf, enc, next) {
    lineCount++
    next()
}
function end(next) {
    console.log(lineCount)
    next()
}