var request = require('request');
var cheerio = require('cheerio');

exports.getCongressmen = function( stateCode, callback ) {
	callback = (callback || function(){});
	var members = { senators: [], reps: [] };

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
			members.senators.push({
				"name" : name,
				"phone" : phone,
				"state" : state,
				"party" : party
			});
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
				members.reps.push({
					"name" : name,
					"phone" : phone,
					"state" : state,
					"party" : party
				});
					
			});

			callback( members );
			return( this );
		});
	});
};

exports.getSenatePortraits = function( stateCode, callback ) {
	callback = (callback || function(){});
	var portraits = [];

	request({
		uri: "http://en.wikipedia.org/wiki/List_of_current_United_States_Senators",
		method: "GET",
		qs: {
			state: stateCode
		},
		timeout: 10000,
		followRedirect: true
	}, function(err, response, body) {

		var $ = cheerio.load(body);
		var imgurl, members, membersTable, state, imgs, name ;

		membersTable = $('#Members_by_state').parent().next();
		imgs = membersTable.find('img');

		imgs.each(function(index, img) {
			imgurl = $(img).attr('src');
			state = $(img).parent().parent().prev().prev().children().text();
			name = $(img).parent().parent().next().children().children().text();

			portraits.push({
				"name" : name,
				"imgurl" : "http:" + imgurl,
				"state" : state,
			});
		});

		callback( portraits );
		return( this );
	});
};