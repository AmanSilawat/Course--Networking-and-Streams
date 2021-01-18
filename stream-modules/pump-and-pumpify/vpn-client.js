let net = require('net')
let crypto = require('crypto')
let pw = 'abc123'

let stream = net.connect(5005, 'localhost')
process.stdin
    .pipe(crypto.createCipher('aes192', pw))
    .pipe(stream)
    .pipe(crypto.createDecipher('aes192', pw))
    .pipe(process.stdout)