let net = require('net');
net.createServer(function(stream) {
    stream.pipe(stream)
}).listen(5000)

// in first terminal
    // $ node duplex.js

// in second terminal nc localhost 5005

// output in first terminal
    // throw er; // Unhandled 'error' event