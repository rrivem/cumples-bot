const slack = require('./slack');
const bot = require('./bot');

class NotificationService {
	itsTime(user, minsToGo) {
		return slack
			.findUser(user.mail)
			.then(slackUser => {
				if (!slackUser) {
					throw new Error(`Usuario "${user.name}" <${user.mail}> no encontrado en slack`);
				} else {
					return slack.imOpen(slackUser.id);
				}
			})
			.then(channelId => slack.postMessage(channelId, bot.itsTime(user, minsToGo)))
			.catch(err => console.error('Error connecting to Slack', err));
	}
}

module.exports = new NotificationService();
