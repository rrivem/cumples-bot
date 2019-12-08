const fetch = require('node-fetch');
const Response = fetch.Response;
const config = require('./config');
const slackConfig = config.slack;

if (config.isProduction) {
	module.exports = fetch;
} else {
	let channels = {};
	const getResponse = response => new Response(JSON.stringify(response));

	module.exports = function(url, options) {
		if (url === slackConfig.webhook) {
			return new Promise(resolve => {
				const { channel: channelid, ...body } = JSON.parse(options.body);

				let channel = channels[channelid];
				if (!channel) {
					channel = channels[channelid] = [];
				}
				channel.push(body);
				console.info(channel);

				let response = {
					ok: true
				};
				return resolve(getResponse(response));
			});
		} else {
			console.info('fetching', url, 'with', options);
			return fetch(url, options);
		}
	};
}
