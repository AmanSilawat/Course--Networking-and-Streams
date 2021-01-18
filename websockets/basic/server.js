let http = require('http')
let ecstatic = require('ecstatic')
let through = require('through2')

let server = http.createServer(ecstatic(__dirname + '/public'))
server.listen(5000)

let socket = require('websocket-stream')
socket.createServer({ server: server }, function (stream) {
    stream.pipe(loud()).pipe(stream)
})

function loud() {
    return through(function (buf, enc, next) {
        next(null, buf.toString().toUpperCase())
    })
}