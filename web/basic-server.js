var http = require("http");
var handler = require("./request-handler");
var url = require("url");
var helpers = require('./http-helpers.js');

var port = 8080;
var ip = "127.0.0.1";

var routes = {
	'/': handler.handleRequest
};

var server = http.createServer(function(req,res) {

	console.log("here we go");
	var urlName = url.parse(req.url);
	var route = routes[urlName.pathname];
	if ( route ) {
		route(req, res);
	} else {
		helpers.send404(res);
	}
}


console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

