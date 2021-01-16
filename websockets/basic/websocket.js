//  ! npm i -S ecstatic
let http = require('http');
let ecstatic = require('ecstatic');
let through = require('through2')

let server = http.createServer(function(__.dirname + '/public') {
    
})
let wsock = require('websocket-stream')
wsock.createServer({server: server}, function(stream) {
    // 'stream' is a duplex stream
    stream.pipe(loud()).pipe(stream);
})

function loud() {
    return through(function(buf, enc, next) {
        next(null, buf.toString().toUpperCase());
    })
}