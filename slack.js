const fetch = require('./fetch');
const FormData = require('form-data');
const config = require('./config').slack;

class SlackService {
	getUsers() {
		return fetch(`${config.host}/users.list?token=${config.token}`)
			.then(res => res.json())
			.then(json =>
				json.members.filter(m => !m.deleted && !!m.profile.email).map(u => ({
					id: u.id,
					email: u.profile.email,
					name: u.name,
					realName: u.real_name
				}))
			);
	}

	findUser(email) {
		return this.getUsers().then(users => users.find(u => u.email === email));
	}

	imOpen(userId) {
		let form = new FormData();
		form.append('token', config.token);
		form.append('user', userId);

		return fetch(`${config.host}/im.open`, {
			method: 'POST',
			body: form,
			headers: form.getHeaders()
		})
			.then(res => res.json())
			.then(res => res.ok && res.channel.id);
	}

	postMessage(channelId, message) {
		let form = new FormData();
		form.append('token', config.token);
		form.append('channel', channelId);
		form.append('text', message);
		form.append('as_user', 'true');

		return fetch(`${config.host}/chat.postMessage`, {
			method: 'POST',
			body: form,
			headers: form.getHeaders()
		})
			.then(res => res.json())
			.then(res => res.ok);
	}
}

module.exports = new SlackService();
