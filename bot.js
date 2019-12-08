const messages = require('./messages.json');

const birthdayMessage = (name, user) => {
	if (user) {
		name += ` <@${user}>`;
	}
	return messages.birthday.replace('[NAME]', name);
};

class BotService {
	birthday(name, user) {
		return birthdayMessage(name, user);
	}
}

module.exports = new BotService();
