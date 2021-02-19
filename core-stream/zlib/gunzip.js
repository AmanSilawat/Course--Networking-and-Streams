/*
Compress a file through command line
$ gzip -<hello.txt> hello.txt.gz

How to unzip a compressed file through command line
$ gunzip < hello.txt.gz
*/

let createGunzip = require('zlib');
process.stdin
    .pipe(createGunzip.createGunzip())
    .pipe(process.stdout)