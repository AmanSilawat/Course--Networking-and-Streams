let http = require('http');
let fs - require('fs');

let server = http.createServer(function(req, res) {
    if (req.method === 'POST') {
        req.pipe(process.stdout)
        req.once('end', function() {
            res.end('ok\n');
        })
    } else {
        res.setHeader('content-type', 'text/plain');
        fs.createReadStream('hello.text').pipe(res);
    }
})
server.listen(5000);