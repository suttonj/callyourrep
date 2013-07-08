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
		var phone, name, party, state;
		var returnVal = { "senators": [] };

		senators = $('rep');
		senators.each(function(index, sen) {
			name = $(sen).attr('name');
			phone = $(sen).attr('phone');
			state = $(sen).attr('state');
			party = $(sen).attr('party');
			returnVal.senators.push({
				"name" : name,
				"phone" : phone,
				"state" : state,
				"party" : party
			});

			console.log(name + ' (' + party + ') - ' + state + ' : ' + phone);
		});

		callback( returnVal );
		return( this );
	});
}