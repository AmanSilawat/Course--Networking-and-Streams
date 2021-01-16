// ! code is not working
var net = require('net')
let crypto = require('crypto');
let pw = 'abc123';
net.createServer(function (stream) {
	let enc = crypto.createCipher('ase512')
	stream.pipe(net.connect(5000, 'localhost')).pipe(stream)
}).listen(5005)