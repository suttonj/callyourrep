var express = require('express');
var app = express();

var states = [ 'ma' ];
var cgmSearch = require('./senators.js');

app.get('/senators/:state', function(req, res) {
	// if (req.params.state != 'ma') {
	// 	res.statusCode = 404;
	// 	return res.send('Error 404: State not found');
	// }

	cgmSearch.getCongressmen(req.params.state, function(cgmList) {
		// for (var i = 0; i < senators.length; i++) {
		// 	res.write(senators[i].name);
		// };
		res.send(cgmList);
		res.end();
		return;
	});
});

app.listen(process.env.PORT || 8080);