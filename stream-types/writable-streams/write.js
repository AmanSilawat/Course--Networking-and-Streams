let fs = require('fs');
let w = fs.createWriteStream('hello.txt');
w.on('finish', function () {
    console.log('FINISHED');
})
w.write('hi\n');
w.write('wow\n');
w.end();