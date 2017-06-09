var http = require('http');  
var url = require('url');
var data = require('./message-data');
var fs = require('fs');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var requestHandler = function(request, response, body, result) {
  // console.log('request.url ', request.url);
  // const urlPath = url.parse(request.url).pathname;
  // var notdonefilePath = urlPath.slice(urlPath.indexOf('x') + 1);
  // //var filePath = '.' + filePath;
  // console.log('filePath ', notdonefilePath);
  // // var filePath = './client' + notdonefilePath;
  // var filePath = '/Users/student/code/hrsf77-chatterbox-server/client/scripts' + notdonefilePath;
  // console.log('filePath after', filePath);

  // fs.stat(urlPath, function(err, fileInfo) {
  //   // if (!err && fileInfo.isDirectory()) {
  //   //   filePath += urlPath;
  //   // }
  //   console.log('Mike is the best');
  //   // if (!err && fileInfo.isDirectory()) {
  //   //   filePath += '/index.html';
  //   //   console.log(filePath);
  //   // }

  //   fs.exists(filePath, function(doesExist) {
  //     console.log('Mike is also the best in fs exists');
      
  //     if (!doesExist) {
  //       console.log('it DOESNT exist');
  //       response.statusCode = 404;
  //       response.end(`Resource not found: (hehe) "${urlPath}"`);
  //     }

  //     fs.readFile(filePath, (err, data) => {
  //       if (err) {
  //         response.statusCode = 500;
  //         response.end(`Server error: "${err}"`);
  //       } else {
  //         response.end(data.toString('utf-8'));
  //       }
  //     });


  //   });
  
  // }); 
  
  
  var responseToGet = function() {
    if (request.url.includes('/classes/messages')) {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data.data));
    } else if (request.url.includes('chatterbox')) {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/html';
      fs.createReadStream('../client/index.html').pipe(response);
    } else if (request.url.includes('app')) {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/html';
      fs.createReadStream('../client/scripts/app.js').pipe(response);
    } else if (request.url.includes('styles')) {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/html';
      fs.createReadStream('../client/styles/styles.css').pipe(response);
    } else if (request.url.includes('spiffy')) {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/html';
      fs.createReadStream('../client/images/spiffygif_46x46.gif').pipe(response);
    } else {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end('404 page not found');
    }
  };
  
  var responseToPost = function() {
    var statusCode = 201;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    request.on('data', function(chunk) {
      var betterData = JSON.parse(chunk);
      betterData['username'] = decodeURIComponent(betterData['username']);
      console.log('betterData HOPEFULLY good ', betterData);
      data.data.results.push(betterData);
    });
    response.end(JSON.stringify('nice job there buddy boy, Im proud of you, go buy yourself a new hotwheel race car'));
  };  
  
  if (request.method === 'GET') {
    responseToGet();
  }
  if (request.method === 'POST') {
    responseToPost();
  }
  if (request.method === 'OPTIONS') {
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    //headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end();
  }
  
  
};




module.exports.requestHandler = requestHandler;

