var request = require('request');
var cheerio = require('cheerio');
var senators = {};

exports.getSenators = function( stateCode, callback ) {
	callback = (callback || function(){});

	request({
		uri: "http://whoismyrepresentative.com/getall_sens_bystate.php",
		method: "GET",
		qs: {
			state: stateCode
		},
		timeout: 10000,
		followRedirect: false
	}, function(err, response, body) {
 		//console.log(body);
		var $ = cheerio.load(body);
		senators = $('rep');
		senators.each(function(index, sen) {
			console.log($(sen).attr('name'));
		});

		callback( body );
		return( this );
	});
}