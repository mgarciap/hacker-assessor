var ecstatic = require("ecstatic");
var http = require('http');
 
http.createServer(
  ecstatic({ root: __dirname + '/public' })
).listen(8080);
 
console.log('Listening on :8080');
