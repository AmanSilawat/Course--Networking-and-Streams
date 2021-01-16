let concat = require('concat-stream');
let http = require('http');
let qs = require('querystring')

let server = http.createServer(function(req, res) {
    req.pipe(concat({encoding: 'string'}, function(body) {
        let params = qs.parse(body)
        console.log(params);
        res.end('ok\n');
    }))
})
server.listen(5000);