var http = require('http');
var fs   = require('fs');
var path = require('path');
var filepath = path.resolve(__dirname + '/climate.svg')
// console.log(filepath);
var count = 12;
var img  = fs.readFileSync(filepath, 'utf-8');
// console.log(img);
var port = process.env.PORT || 8000;
http.createServer(function handler(req, res) {
  var url = req.url;
  var agent = req.headers.user-agent
  var r = req.headers;
  r.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  r.url = url
  console.log(" - - - - - - - - - - record:", r);
  if (url.match(/svg/)) {
    count = count + 1;
    var newurl = "https://img.shields.io/badge/hits-" + count +"-brightgreen.svg"
    res.writeHead(307, {"Location": newurl });
    res.end();
  }
  else {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(JSON.stringify(r, null, "  ")); // see next line
  } // For pretty JSON in Browser see: http://stackoverflow.com/a/5523967/1148249
}).listen(port);

console.log('Visit http://localhost:' + port);