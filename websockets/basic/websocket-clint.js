//  ! npm i -S ecstatic
let wsock = require('websocket-stream')
let stream = wsock('ws://' + location.host);
let html = require('yo-yo');
let root = document.body.appendChild(document.createElement('div'))

function update() {
    
}