// ! code is not working
var net = require('net')
let crypto = require('crypto');
let pw = 'abc123';
net.createServer(function (stream) {
	let enc = crypto.createCipheriv('ase192')
	stream.pipe(net.connect(5000, 'localhost')).pipe(stream)
}).listen(5005)