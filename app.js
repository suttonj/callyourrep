var express = require('express');
var app = express();

var states = [ 'ma' ];
var senatorSearch = require('./senators.js');

app.get('/senators/:state', function(req, res) {
	if (req.params.state != 'ma') {
		res.statusCode = 404;
		return res.send('Error 404: State not found');
	}

	senatorSearch.getSenators(req.params.state, function(senators) {
		// for (var i = 0; i < senators.length; i++) {
		// 	res.write(senators[i].name);
		// };
		res.send(senators);
		res.end();
		
	});
	//res.json();
});

app.listen(process.env.PORT || 8080);