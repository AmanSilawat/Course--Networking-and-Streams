var net = require('net')
let CryptoJS = require('crypto-js');
let pw = 'abc123';

net.createServer(function (stream) {
	stream
		.pipe(CryptoJS.AES.decrypt(stream, pw))
		.pipe(net.connect(5000, 'localhost'))
		.pipe(CryptoJS.AES.encrypt(stream, pw))
		.pipe(stream)
}).listen(5005)