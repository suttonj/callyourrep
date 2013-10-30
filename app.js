var express = require('express');
var app = express();

var states = [ 'ma' ];
var cgmSearch = require('./members.js');

app.get('/members/:state', function(req, res) {
	// if (req.params.state != 'ma') {
	// 	res.statusCode = 404;
	// 	return res.send('Error 404: State not found');
	// }

	cgmSearch.getCongressmen(req.params.state, function(members) {
		// for (var i = 0; i < members.length; i++) {
		// 	res.write(members[i].name);
		// };
		res.send(members);
		res.end();
		return;
	});
});

app.get('/portraits', function(req, res) {

	cgmSearch.getSenatePortraits(function(portraits) {
		res.send(portraits);
		res.end();
		return;
	});
});

app.listen(process.env.PORT || 8080);