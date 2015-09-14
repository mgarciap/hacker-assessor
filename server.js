var ecstatic = require('ecstatic');
var http = require('http');
var app = require('./app')
var respond = require('./response');
var port = process.env.PORT || 8080;
var staticsFiles = ecstatic({ root: __dirname + '/public' });

http.createServer(function(req, res) {
  if (req.url === '/') {
    respond.make(req, res, {}, 'index.html.ejs')
  } else if (req.url === '/become/senior-frontend.html') {
    app.pathSeniority('Senior Frontend', req, res);
  } else if (req.url === '/become/senior-full-stack-js.html') {
    app.pathSeniority('Senior Full Stack JS', req, res);
  } else {
    staticsFiles(req, res);
  }
}).listen(port);

console.log('Listening on http://localhost:' + port );
