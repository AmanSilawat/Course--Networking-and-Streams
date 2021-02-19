/*
Compress a file through command line
$ gzip -<hello.txt> hello.txt.gz

How to unzip a compressed file through command line
$ gunzip < hello.txt.gz
*/

let createGunzip = require('zlib');
let createHash = require('crypto').createHash;
process.stdin
    .pipe(createGunzip.createGunzip())
    .pipe(createHash('sha512', {encoding: 'hex'}))
    .pipe(process.stdout)

/*
$ node gunzip-hash.js  < hello.txt.gz
8c3b411312b58cc9783c8a9e2c395296a8

$ node gunzip-hash.js  < hello.txt.gz; echo
8c3b411312b58cc9783c8a9e2c395296a8

// !hello.txt
$ shasum -a 512 < hello.txt
8c3b411312b58cc9783c8a9e2c395296a8

$ gunzip < hello.txt.gz  | shasum -a 512
8c3b411312b58cc9783c8a9e2c395296a8
*/