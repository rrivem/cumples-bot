const slack = require('./slack');
const bot = require('./bot');
const googleImages = require('./google-images');

class NotificationService {
	setup() {
		return slack.setup();
	}

	async birthday({ name, on, mail }) {
		const slackUser = await slack.findUser(mail);
		return slack.postMessage({
			channel: slack.channels.birthdays,
			attachments: [
				{
					color: 'good',
					text: bot.birthday(name, slackUser && slackUser.name, on),
					image_url: await googleImages.getRandomImage('birthday')
				}
			]
		});
	}

	async companyBirthday({ name, on, mail }, years) {
		const slackUser = await slack.findUser(mail);
		return slack.postMessage({
			channel: slack.channels.companyBirthdays,
			attachments: [
				{
					color: 'good',
					text: bot.companyBirthday(name, slackUser && slackUser.name, on, years),
					image_url: await googleImages.getRandomImage(`birthday ${years}`)
				}
			]
		});
	}
}

module.exports = new NotificationService();
