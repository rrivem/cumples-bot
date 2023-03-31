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
					image_url: await googleImages.getRandomImage('birthday'),
				},
			],
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
					image_url: await googleImages.getRandomImage(`birthday ${years}`),
				},
			],
		});
	}

	async healthyBreak({ text, links }) {
		return slack.postMessage({
			channel: slack.channels.healthyBreaks,
			text: bot.healthyBreak(text, links),
			unfurl_links: true,
			unfurl_media: true,
			as_user: false,
			username: 'Pausa Saludable Bot',
			icon_emoji: ':hourglass:',
		});
	}
}

module.exports = new NotificationService();
