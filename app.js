var express = require('express');
var app = express();

var states = [ 'ma' ];
var senators = [
	{ name: "Elizabeth Warren" },
	{ name: "William Mo Cowan" }
];

app.get('/senators/:state', function(req, res) {
	if (req.params.state != 'ma') {
		res.statusCode = 404;
		return res.send('Error 404: State not found');
	}

	res.json(senators);
});

app.listen(process.env.PORT || 8080);