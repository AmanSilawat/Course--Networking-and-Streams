let fs = require('fs');
let Transform = require('stream').Transform;
process.stdin
    .pipe(toUpper())
    .pipe(process.stdout)

function toUpper() {
    return new Transform({
        transform: function (buf, enc, next) {
            next(null, buf.toString().toUpperCase())
        }
    })
}