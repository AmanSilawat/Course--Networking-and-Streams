// ! npm i -S duplexify mkdirp fs
// mkdirp :- already exist directory doesn't create otherwise create

let duplexify = require('duplexify')
let mkdirp = require('mkdirp')
let fs = require('fs')

module.exports = function (name) {
    let d = duplexify()
    mkdirp('logs', function (err) {
        let w = fs.createWriteStream('logs/' + name + '.log')
        d.setWritable(w)
    })
    return d
}

// ! not working
// throw new TypeError('invalid options argument')
// ^
// TypeError: invalid options argument