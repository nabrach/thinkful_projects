var http = require("http");
var fs = require("fs");
var parse = require("url").parse;
var join = require("path").join;
var qs = require("querystring");


var root = __dirname;

var server = http.createServer(function(req, res) {
    var item = '';
    
    if(req.url === '/') {
        if(req.method === 'GET') {
            req.url = '/index.html';
        }
        else if(req.method === 'POST') {
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            
            req.on('end', function () {
                var obj = qs.parse(item);
                res.end('The item: "' + obj.item + '" was successfully added')
            })
        }
    }
    
    var url = parse(req.url);
    var filePath = join(root, url.pathname);
    fs.stat(filePath, function(err, stats) {
       if(err) {
           if(err.code === 'ENOENT') {
               res.statusCode = 404;
               res.end("File Not Found");
           }
           else {
               res.statusCode = 500;
               res.end("Internal Server Error");
           }
       } 
    });

    var stream = fs.createReadStream(filePath);
    stream.pipe(res);
    
    stream.on('error', function(){
       res.statusCode = 500;
       res.end("Internal Server Error");
    });
});

server.listen(process.env.PORT, process.env.IP);