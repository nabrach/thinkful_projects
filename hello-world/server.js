var http = require('http');
var server = http.createServer(function(req, res){
	var url = 'http://thinkful.com';
	var body = '<span>Redirecting to <a href="' + url + '">' + url + '</a></span>';
	res.setHeader('Location', url);
	res.statusCode = 302;
	res.setHeader('Content-Length', body.length);
	res.setHeader('Content-Type', 'text/html');
	res.end(body);
});

server.listen(9000, function(){
	console.log('listening on port 9000');
});