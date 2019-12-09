require('./dotenv');

const base = {
	spreadsheet: {
		apiKey: process.env.SPREADSHEET_API_KEY,
		id: process.env.SPREADSHEET_ID,
		ranges: JSON.parse(process.env.SPREADSHEET_RANGES)
	},
	slack: {
		host: 'https://slack.com/api',
		token: process.env.SLACK_TOKEN,
		webhook: process.env.SLACK_WEBHOOK,
		channels: {
			birthdays: process.env.SLACK_CHANNELS_BIRTHDAY
		}
	},
	googleImages: {
		engineKey: process.env.IMAGES_ENGINE_KEY,
		apiKey: process.env.IMAGES_API_KEY
	},
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
