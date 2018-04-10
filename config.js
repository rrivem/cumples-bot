const private = require('./config.private.json');

const base = {
	spreadsheet: {
		id: private.spreadsheet.id,
		ranges: {
			list: ['[SHEET]!B1', '[SHEET]!B3:D100', '[SHEET]!F1', '[SHEET]!F3:H100'],
			people: 'Listas!A2:B100'
		}
	},
	slack: {
		host: 'https://slack.com/api',
		token: private.slack.token
	},
	minsBeforeNotice: 20,
	dayReminderHour: 8
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
