let through = require('through2')
let size = 0;
process.stdin
    .pipe(through.obj(write1))
    .pipe(through.obj(write2))

function write1(buf, enc, next) {
    next(null, {length: buf.length, total: size += buf.length})
}

function write2(obj, enc, next) {
    console.log('obj= ', obj);
    next();
}