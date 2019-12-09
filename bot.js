const messages = require('./messages.json');

const birthdayMessage = (name, user, on) => {
	if (user) {
		name += ` <@${user}>`;
	}
	const template = on ? messages.birthday.pastDay : messages.birthday.today;
	return template.replace('[NAME]', name).replace('[ON]', on);
};

const companyBirthdayMessage = (name, user, years) => {
	if (user) {
		name += ` <@${user}>`;
	}
	return messages.companyBirthday.replace('[NAME]', name).replace('[YEARS]', years);
};

class BotService {
	birthday(name, user, on) {
		return birthdayMessage(name, user, on);
	}

	companyBirthday(name, user, years) {
		return companyBirthdayMessage(name, user, years);
	}
}

module.exports = new BotService();
