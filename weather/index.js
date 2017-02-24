'use strict';

const YQL = require('yql');
const _ = require('lodash');


module.exports = (opts, callback) => {
	opts = opts || [];

	let query;

	// The default city will be : Dhaka, Bangladesh
	if (_.isEmpty(opts)) {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Dhaka, Bangladesh")');
	} else {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + opts[0] + ', ' + opts[1] + '")');
	}

// Execute the SQL Query
	query.exec((err, response) => {
		if (err) {
			return callback(err);
		}

		callback(null, response);
	});
};
