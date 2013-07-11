var request = require('request');
var cheerio = require('cheerio');

exports.getCongressmen = function( stateCode, callback ) {
	callback = (callback || function(){});
	var returnVal = { senators: [], reps: [] };

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

		request({
			uri: "http://whoismyrepresentative.com/getall_reps_bystate.php",
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

			reps = $('rep');
			reps.each(function(index, rep) {
				name = $(rep).attr('name');
				phone = $(rep).attr('phone');
				state = $(rep).attr('state');
				party = $(rep).attr('party');
				returnVal.reps.push({
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
	});
};

