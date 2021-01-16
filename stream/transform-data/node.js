let fs = require('fs');
let through = require('through2');
fs.createReadStream(process.argv[2])
// process.stdin
    .pipe(toUpper())
    .pipe(process.stdout)

function toUpper() {
    return through(
        function (buf, enc, next) {
            next(null, buf.toString().toUpperCase())
        }
    )
}