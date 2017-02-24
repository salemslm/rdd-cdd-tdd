#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const weather = require('./');

const cli = meow({
	help: [
		'Usage',
		'  $ weather <input>',
		'',
		'Options',
		'  city [Default: Dhaka]',
		'  country [Default: Bangladesh]',
		'  scale (C/F) [Default: Celcius]',
		'',
		'Examples',
		'  $ weather London UK C',
		'  London, UK',
		'  Condition: Partly Cloudy',
		'  Temperature: 32C'
	]
});
/**
* Converts Fahrenheit to Celcius
* @constructor
* @param {int} temp - The Fahrenheit temperature
*/
function _toCelcius(temp) {
	return Math.round(((temp - 32) * 5) / 9);
}

updateNotifier({ pkg}).notify();


 /** this function take as parameter the text typed by the user on the consol.
		 Then it will print the weather on the desired location.
  */
weather(cli.input, (err, result) => {
	if (err) {
		console.log(chalk.bold.red(err));
		process.exit(1);
	}

 // Retrieve weather
	let condition = result.query.results.channel.item.condition.text;
	let temperature;

// Defining temperature according to user input
	if (cli.input[2] && cli.input[2] === 'C') {
		temperature = _toCelcius(result.query.results.channel.item.condition.temp) + 'C';
	} else if (cli.input[2] && cli.input[2] === 'F') {
		temperature = result.query.results.channel.item.condition.temp + 'F';
	} else {
		temperature = _toCelcius(result.query.results.channel.item.condition.temp) + 'C';
	}

// Defining default position.
	let city = cli.input[0] ? cli.input[0] : 'Dhaka';
	let country = cli.input[1] ? cli.input[1] : 'Bangladesh';


	console.log(chalk.red(city + ', ' + country));
	console.log(chalk.cyan('Condition: ' + chalk.yellow(condition)));
	console.log(chalk.cyan('Temperature: ' + chalk.yellow(temperature)));
	process.exit();
});
