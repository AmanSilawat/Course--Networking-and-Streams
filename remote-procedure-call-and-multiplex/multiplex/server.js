let net = require('net')
let multiplex = require('multiplex')
let rpc = require('rpc-stream')
let fs = require('fs')

net.createServer(function (stream) {
    let plex = multiplex()
    stream.pipe(plex).pipe(stream)
    let client = rpc({
        read: function (name, cb) {
            if (!/^[\w-]+$/.test(name)) {
                return cb(new Error('file not allowed'))
            }
            let r = fs.createReadStream('files/' + name)
            r.on('error', cb)
            r.pipe(plex.createStream('file-' + name)).pipe(r)
            cb(null)
        }
    })
    client.pipe(plex.createSharedStream('rpc')).pipe(client)
}).listen(5000)
