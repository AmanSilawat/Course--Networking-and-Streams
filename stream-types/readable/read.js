let fs = require('fs');
let read = fs.createReadStream(process.argv[2]);
read.pipe(process.stdout);