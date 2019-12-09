const private = require('./config.private.json');

const base = {
	spreadsheet: Object.assign({}, private.spreadsheet, {
		ranges: ['URUGUAY!A:E', 'COLOMBIA!A:E']
	}),
	slack: Object.assign({}, private.slack, {
		host: 'https://slack.com/api'
	}),
	googleImages: private.googleImages,
	runHourUTC: 11
};

const configData = {
	dev: Object.assign({}, base, {}),
	prod: Object.assign({}, base, {
		isProduction: true
	})
};

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
console.log(environment);
module.exports = configData[environment];
