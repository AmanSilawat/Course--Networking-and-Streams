var net = require('net')
let CryptoJS = require('crypto-js');
let pw = 'abc123';

let stream = net.connect(5005, 'localhost');
process.stdin
	.pipe(CryptoJS.AES.decrypt(stream, pw))
	.pipe(stream)
	.pipe(CryptoJS.AES.encrypt(stream, pw))