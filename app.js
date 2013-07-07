var express = require('express');
var app = express();

var states = [ 'ma' ];
var senators = require('./senators.js');
var parseXml = require('xml2js').parseString;

app.get('/senators/:state', function(req, res) {
	if (req.params.state != 'ma') {
		res.statusCode = 404;
		return res.send('Error 404: State not found');
	}

	senators.getSenators(req.params.state, function(cgmlist) {
		res.write(cgmlist);
		res.end();
		
	});
	//res.json();
});

app.listen(process.env.PORT || 8080);