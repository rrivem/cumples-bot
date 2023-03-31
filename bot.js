const messages = require('./messages.json');
const atHere = '@here';

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
	return template.replace('[NAME]', name).replace('[ON]', on).replace('[YEARS]', years);
};

const healthyBreakMessage = (text, links) => {
	let template = text || messages.healthyBreak;
	if (!template.startsWith(atHere)) {
		template = `${atHere} ${template}`;
	}

	return `${template}\n\n${links.join('\n')}`;
};

class BotService {
	birthday(name, user, on) {
		return birthdayMessage(name, user, on);
	}

	companyBirthday(name, user, on, years) {
		return companyBirthdayMessage(name, user, on, years);
	}

	healthyBreak(text, links) {
		return healthyBreakMessage(text, links);
	}
}

module.exports = new BotService();
