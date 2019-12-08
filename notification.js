const slack = require('./slack');
const bot = require('./bot');
const googleImages = require('./google-images');

class NotificationService {
	setup() {
		return slack.setup();
	}

	async birthday({ name, mail }) {
		const slackUser = await slack.findUser(mail);
		return slack.postMessage({
			channel: slack.channels.birthdays,
			attachments: [
				{
					color: 'good',
					text: bot.birthday(name, slackUser && slackUser.name),
					image_url: await googleImages.getRandomImage('birthday')
				}
			]
		});
	}
}

module.exports = new NotificationService();
