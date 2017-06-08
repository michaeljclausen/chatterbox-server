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
    var requestBeginning = request.url.split('?');
    console.log(requestBeginning, 'NICK!!!!!!!!!!!!!!!!');
    if (requestBeginning[0] === '/classes/messages') {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data.data));
    } else {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end('end');
    }
  };
  
  var responseToPost = function() {
    var statusCode = 201;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    request.on('data', function(chunk) {
      var convertedData = chunk;
      console.log(chunk);
      //console.log('convertedData ', JSON.parse(convertedData.toString()));
      //data.data.results.push(JSON.parse(convertedData));
    });
    response.writeHead(statusCode, headers);
    response.end('thanks');
  };  
  
  if (request.method === 'GET') {
    responseToGet();
  }
  if (request.method === 'POST') {
    responseToPost();
  }
  
  
};




module.exports.requestHandler = requestHandler;

