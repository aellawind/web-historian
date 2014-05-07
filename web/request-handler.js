var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers.js');
var url = require('url');
var fs = require('fs');
var path = require('path');

var getSites = function(req, res) {
	var urlName = url.parse(req.url);
	var pathname = urlName.pathname;
	if (pathname === "/") {
		data = "<input";
	} else {
		data = pathname;
	}

	helpers.sendResponse(res,data);
};

var postSite = function(req, res) {
	var postedURL = req._postData["url"] + "\n";
	fs.appendFile(archive.paths.list, postedURL, function(err) {
		console.log("Error" + err);
	});
	helpers.sendResponse(res, postedURL, 302);
	// WILL EVENTUALLY WANT TO SEND IN AN OBJECT ID INSTEAD OF postedURL
};

var options = function(req, res) {
	helpers.sendResponse(res);
};

var actions = {
  	'GET': getSites,
  	'POST': postSite,
  	'OPTIONS': options
};

exports.handleRequest = function (req, res) {
  
  var action = actions[req.method];
  if ( action ) {
  	action(req,res);
  } else {
  	helpers.send404(res);
  }

};
