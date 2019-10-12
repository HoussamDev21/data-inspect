var http = require('http')
var inspect = require('./data-inspect')

http.createServer(function (req, res) {
    let data = { test: 'any' }
    let html = inspect(data)
    res.end(html)
}).listen(3000)