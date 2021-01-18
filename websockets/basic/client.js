let wsock = require('websocket-stream')
let through = require('through2')
let stream = wsock('ws://' + location.host)
let html = require('yo-yo')
let root = document.body.appendChild(document.createElement('div'))
let output = []
update()

stream.pipe(through(function (buf, enc, next) {
    output.push(buf.toString())
    update()
    next()
}))

function update() {
    html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <input type="text" name="msg">
    </form>
    <pre>${output.join('')}</pre>
  </div>`)
    function onsubmit(ev) {
        ev.preventDefault()
        stream.write(this.elements.msg.value + '\n')
        this.reset()
    }
}