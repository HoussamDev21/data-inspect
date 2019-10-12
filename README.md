# data-inspect

## params
+ data: `any`
+ options: `object`
  - expanded: `boolean` (default: false)
  
## return 
`html string`


## example with nodejs
```javascript
var http = require('http')
var inspect = require('data-inspect')

http.createServer(function (req, res) {
    let data = { test: 'any' }
    let html = inspect(data)
    res.end(html)
}).listen(3000)
```
