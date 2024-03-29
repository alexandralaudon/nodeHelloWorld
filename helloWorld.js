var http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err,data) {
    if(err){
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('500 - Internal Error');
    } else {
      res.writeHead(responseCode, {'Content-Type': contentType});
      res.end(data);
    }
  });
}

http.createServer(function(req,res){
  var path = req.url.replace(/\/?(?:\?.*)$/, '').toLowerCase();
    switch (path) {
      case '':
          serveStaticFile(res, '/public/home.html', 'text/html');
          break;
      case '/about':
          serveStaticFile(res, '/public/about.html', 'text/html');
          break;
      case '/img/logo.jpg':
          serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
          break;
      default:
          serveStaticFile(res, '/public/404.html', 'text/html');
          break;
    }
}).listen(3000);

// http.createServer(function(req,res){
//   var path = req.url.replace(/\/?(?:\?.*)$/, '').toLowerCase();
//   switch (path) {
//     case '':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Homepage');
//       break;
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('About Me');
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not Found');
//       break;
//   }
// }).listen(3000);

console.log('Server started on localhost:3000; Press Cntl-C to terminate....');
