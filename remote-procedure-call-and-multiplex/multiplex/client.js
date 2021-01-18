// ! npm i net multiplex rpc-stream
let net = require('net')
let multiplex = require('multiplex')
let rpc = require('rpc-stream')

let plex = multiplex(function (stream, id) {
    if (/^file-/.test(id)) {
        console.log('RECEIVED FILE ' + id.replace(/^file-/, ''))
        stream.pipe(process.stdout)
    }
})
plex.pipe(net.connect(5000)).pipe(plex)

let client = rpc()
client.pipe(plex.createSharedStream('rpc')).pipe(client)

let remote = client.wrap(['read'])
remote.read(process.argv[2], function (err) {
    if (err) console.error(err)
})