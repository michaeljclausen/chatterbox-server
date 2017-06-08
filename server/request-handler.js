var data = require('./message-data');
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
  
  var responseToGet = function() {
    if (request.url.includes('/classes/messages')) {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data.data));
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

