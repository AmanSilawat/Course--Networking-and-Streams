# Course--Networking-and-Streams
___
## Networking, Servers, and Clients

### Protocols

Protocols mean each computer talk each other.

HTTP: browse web pages.
HTTPS: browser web pages with encryption.
SMTP: send and receive emails.
IMAP, POP3 - load emails from inbox
IRC: chat
FTP: file transfer
SSH: remote shell over an encrypted connection
SSL: low-level secure data transfer (used by HTTPS)


### customary Ports
A port number is a between 1 and 65535
Any service can listen on any port, but there are customary ports for many protocols:

21 - FTP (control port)
22 - SSH
25 - SMTP
80 - HTTP
443 - HTTPS
3306 - MYSQL
5432 - POSTGRESQL
5984 - COUCHDB
667 - IRC


### port and permission
By default, systems can only listen to ports below 1024 as the root user:

```
$ nc -lp 1024

Can't grab 0.0.0.0:1023 with bind: Permission denied
$ nc -lp 1023
```
___
## Streams
data transmits on chunks. stream all type of files like audio, video, text etc.
Data transmission to build the data pipe line. 

### composition 

We can pope abstraction togeter with streams using `.pipe`

```
fs.createReadStream('abc.txt)
    .pipe(zlib.createGunzip())
    .pipe(replace(/\s+/g), '\n'))
    .pipe(filter(/whale/i))
    .pipe(linecount(console.log))
```

### chunk by chunk
Data transmit in chunk by chunk, without buffering everything into memory.


### fs
We can read a file and stream the file contents to stdout: 
```js
let fs = require('fs');
fs.createReadStream('greet.txt)
    .pipe(process.stdout)
```

1. For terminal exercise: `node.js`
```js
let fs = require('fs');
fs.createReadStream(process.argv[2])
    .pipe(process.stdout)
```
2. Create `greet.txt` file
```
Hi
Hello
Hi again
```

3. In terminal
```
$ node node.js node.js 

var fs = require('fs');
fs.createReadStream(process.argv[2])
    .pipe(process.stdout)


$ node node.js greet.txt 

Hi
Hello
Hi again
```

### Transform Data

through is a write function

```
$ npm install through2
```

EXAMPLE ONE
create a file `node.js`
```js
let fs = require('fs');
let through = require('through2');
fs.createReadStream(process.argv[2])
    .pipe(toUpper())
    .pipe(process.stdout)

function toUpper() {
    return through(
        function (buf, enc, next) {
            next(null, buf.toString().toUpperCase())
        }
    )
}
```

In terminal:
```
$ node node.js greet.txt
```


Output:
```
HI
HELLO
HI AGAIN
```


EXAMPLE TWO
```
let fs = require('fs');
let through = require('through2');
process.stdin
    .pipe(toUpper())
    .pipe(process.stdout)

function toUpper() {
    return through(
        function (buf, enc, next) {
            next(null, buf.toString().toUpperCase())
        }
    )
}
```

In terminal:
```
$ node node.js greet.txt
```


OUTPUT:
```
type any word and press enter
TYPE ANY WORD AND PRESS ENDTER
& converted to upper case
& CONVERTED TO UPPER CASE
```

### stream 
New core interface

Create a `node.js` file
```js
let fs = require('fs');
let Transform = require('stream').Transform;
process.stdin
    .pipe(toUpper())
    .pipe(process.stdout)

function toUpper() {
    return new Transform({
        transform: function (buf, enc, next) {
            next(null, buf.toString().toUpperCase())
        }
    })
}
```
In terminal
```
$ node node.js < greet.txt
HI
HELLO
HI AGAIN
```


### through2 vs stream.Transform
* `through2(opts={...}, write, end`
* `new Transform({ transfer: write, flush: end, ... })`

#### through(write, end)
2 parameters: write and end. Both are optional.
```
function write (buf, enc, next) {}
function end () {}
```
Call next() when you're ready for the next chunk. If you don't call next(), your stream will hang!

Call this.push(VALUE) inside the callback to put VALUE into the stream's output.

Use a VALUE of null to end the stream.

#### through()
If you don't give through any arguments, these are the default values for write and end:
```
function write (buf, enc, next) { this.push(buf); next() }
function end () { this.push(null) }
```
if no arguments will pass everything written as input directly through to its output.


### concat-stream
install package
```
npm install concat-stream
```

create a file `node.js` in your directory.
```
var concat = require('concat-stream')
process.stdin.pipe(concat(function (body) {
    console.log(body.length)
}))
```

in terminal: 
```
$ node cat.js
hi
hello
hi again
```

Type some text and press `CTRL + D` to exit and get total size of this file.


#### querystring

create file `cat.js`

```js
let concat = require('concat-stream');
let http = require('http');
let qs = require('querystring')

let server = http.createServer(function(req, res) {
    req.pipe(concat({encoding: 'string'}, function(body) {
        let params = qs.parse(body)
        console.log(params);
        res.end('ok\n');
    }))
})
server.listen(5000);
```

In first terminal: 
```
$ node cat.js
```

In second terminal: 
```
$ curl -d msg=hello localhost:5000
```

output in first terminal
```
[Object: null prototype] { msg: 'hello' }
```





```js
var concat = require('concat-stream')
var through = require('through2')
var http = require('http')
var qs = require('querystring')

var server = http.createServer(function (req, res) {
    req
        .pipe(counter())
        .pipe(concat({ encoding: 'string' }, onbody))

    function counter() {
        var size = 0
        return through(function (buf, enc, next) {
            size += buf.length
            if (size > 20) {
                res.end('to big\n')
                //next(null, null)
            } else next(null, buf)
        })
    }
    function onbody(body) {
        var params = qs.parse(body)
        console.log(params)
        res.end('ok\n')
    }
})
server.listen(5000)
```

first terminal
```
$ node cat.js
```

second terminal
```
$ curl -d msg=hello localhost:5000
$ curl -d msg=helloooooooooooooooooooooooo localhost:5000
```

output in first termina
```
[Object: null prototype] { msg: 'hello' }

```
first line is a object
and in second line nothing to do

---

## stream types
readable - produces data: you can pipe FROM it
writable - consumes data: you can pipe TO it
transform - consumes data, producing transformed data
duplex - consumes data separately from producing data (bidirectional network protocol as duplex stream )


#### stream type in code 
readable: readable.pipe(A)
writable: A.pipe(writable)
transform: A.pipe(transform).pipe(B)
duplex: A.pipe(duplex).pipe(A)

##### writable
.write(buf)
.end()
.end(buf)
.on('finish', function () {})
(...).pipe(stream)

```
let fs = require('fs');
let w = fs.createWriteStream('greet.txt');
w.on('finish', function() {
    console.log('FINISHED);
})
w.write('hi\n');
w.write('wow\n');
w.end();
```