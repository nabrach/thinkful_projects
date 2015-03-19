var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
	switch(req.method){
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});
			req.on('end', function(){
				items.push(item);
				res.end('Item added\n');
			});
			break;
		case 'GET':
			items.forEach(function (item, i){
				res.write(i + '. ' + item + '\n');
			});
			res.end();
			break;
		case 'DELETE':
		    var pathname = url.parse(req.url).pathname;
		    var i = parseInt(pathname.slice(1), 10);

		    if (isNaN(i)) {
		        res.statusCode = 400;
		        res.end('Item id not valid');
		    }
		    else if (!items[i]) {
		        res.statusCode = 404;
		        res.end('Item not found');
		    }
		    else {
		        items.splice(i, 1);
		        res.end('Item deleted successfully');
		    }
		    break;
		case 'PUT':
				var pathname = url.parse(req.url).pathname;
				var i = parseInt(pathname.slice(1), 10);
				var item = '';
				req.setEncoding('utf8');
				req.on('data', function(chunk) {
					item += chunk;
				});
				req.on('end', function() {
					items.splice(i, 1, item);
					res.end('Item replaced\n');
				});
				break;
			}
});

// items = [1,2,3];

// for loop on GET

// push on POST

// PUT item[i] = i

server.listen(9000, function(){
	console.log('listening on 9000');
});