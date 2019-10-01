const private = require('./config.private.json');

const base = {
	spreadsheet: {
		id: private.spreadsheet.id,
		ranges: {
			list: ['[SHEET]!A1', '[SHEET]!A:F'],
			people: 'Personas!A2:B200'
		}
	},
	slack: {
		host: 'https://slack.com/api',
		...private.slack
	},
	minsBeforeNotice: 15,
	dayReminderHour: 0
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
