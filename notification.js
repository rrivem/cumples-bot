const slack = require('./slack');
const bot = require('./bot');

class NotificationService {
	setup() {
		return slack.setup();
	}

	send(user, message) {
		return slack
			.findUser(user.mail)
			.then(slackUser => {
				if (!slackUser) {
					throw new Error(`Usuario "${user.name}" <${user.mail}> no encontrado en slack`);
				} else {
					return slack.imOpen(slackUser.id);
				}
			})
			.then(channelId => slack.postMessage(channelId, message))
			.catch(err => console.error('Error connecting to Slack', err));
	}

	dayReminder(user, time) {
		return this.send(user, bot.dayReminder(user, time));
	}

	itsTime(user, minsToGo) {
		return this.send(user, bot.itsTime(user, minsToGo));
	}
}

module.exports = new NotificationService();
