const fetch = require('node-fetch');
const Response = fetch.Response;
const uuid = require('uuid');
const config = require('./config');
const slackConfig = config.slack;

if (config.isProduction) {
	module.exports = fetch;
} else {
	let channels = [];
	const getChannelByUser = user => channels.find(c => c.user === user);
	const getChannelByChannelId = channelId => channels.find(c => c.id == channelId);

	const getResponse = response => new Response(JSON.stringify(response));

	module.exports = function(url, options) {
		if (url === `${slackConfig.host}/im.open`) {
			return new Promise(resolve => {
				let user = options.body._streams[4];
				if (!getChannelByUser(user)) {
					channels.push({
						user: user,
						id: uuid.v4(),
						messages: []
					});
				}
				let channel = getChannelByUser(user);
				response = {
					ok: true,
					channel: channel
				};
				console.info(response);

				return resolve(getResponse(response));
			});
		} else if (url === `${slackConfig.host}/chat.postMessage`) {
			const result = new Response(
				JSON.stringify({
					ok: true
				})
			);
			return new Promise(resolve => {
				let channelid = options.body._streams[4];
				let message = options.body._streams[7];
				let from = options.body._streams[10];

				let channel = getChannelByChannelId(channelid);
				if (!channel) {
					throw new Error('Cannot find channel ' + channelid);
				}
				channel.messages.push({
					from: from,
					message: message
				});
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
