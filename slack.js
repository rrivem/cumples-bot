const fetch = require('./fetch');
const FormData = require('form-data');
const config = require('./config').slack;

class SlackService {
	setup() {
		return this.getUsers();
	}

	getUsers() {
		const self = this;
		if (self.users) {
			return Promise.resolve(self.users);
		} else {
			return fetch(`${config.host}/users.list?token=${config.token}`)
				.then(res => res.json())
				.then(json =>
					json.members
						.filter(m => !m.deleted && !!m.profile.email)
						.map(u => ({
							id: u.id,
							email: u.profile.email,
							name: u.name,
							realName: u.real_name
						}))
				)
				.then(result => {
					self.users = result;
					return result;
				});
		}
	}

	findUser(email) {
		return this.getUsers().then(users => users.find(u => u.email === email));
	}

	postMessage(channelId, message) {
		const body = {
			channel: channelId,
			text: message,
			as_user: true
		};

		return fetch(config.webhook, {
			method: 'POST',
			body: JSON.stringify(body)
		});
	}
}

module.exports = new SlackService();
