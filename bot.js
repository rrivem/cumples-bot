const messages = require('./messages.json');

const birthdayMessage = (name, user, on) => {
	if (user) {
		name += ` <@${user}>`;
	}
	const template = on ? messages.birthday.pastDay : messages.birthday.today;
	return template.replace('[NAME]', name).replace('[ON]', on);
};

const companyBirthdayMessage = (name, user, on, years) => {
	if (user) {
		name += ` <@${user}>`;
	}
	const template = on ? messages.companyBirthday.pastDay : messages.companyBirthday.today;
	return template
		.replace('[NAME]', name)
		.replace('[ON]', on)
		.replace('[YEARS]', years);
};

class BotService {
	birthday(name, user, on) {
		return birthdayMessage(name, user, on);
	}

	companyBirthday(name, user, on, years) {
		return companyBirthdayMessage(name, user, on, years);
	}
}

module.exports = new BotService();
