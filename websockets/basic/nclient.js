let socket = require('websocket-stream')
let stream = socket('ws://localhost:5000')
process.stdin.pipe(stream).pipe(process.stdout)