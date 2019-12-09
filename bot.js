const messages = require('./messages.json');

const birthdayMessage = (name, user) => {
	if (user) {
		name += ` <@${user}>`;
	}
	return messages.birthday.replace('[NAME]', name);
};

const companyBirthdayMessage = (name, user, years) => {
	if (user) {
		name += ` <@${user}>`;
	}
	return messages.companyBirthday.replace('[NAME]', name).replace('[YEARS]', years);
};

class BotService {
	birthday(name, user) {
		return birthdayMessage(name, user);
	}

	companyBirthday(name, user, years) {
		return companyBirthdayMessage(name, user, years);
	}
}

module.exports = new BotService();
