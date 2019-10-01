const config = require('./config');

const dayReminderMessage = (user, time) =>
	`Hola ${user.name}, te anotaste para almorzar a las ${time.getHours()}:${time
		.getMinutes()
		.toString()
		.padStart(
			2,
			'0'
		)}. Te pedimos puntualidad con la hora para agilizar el servicio.\n\nSi precisas cambiar tu hora o NO vas a estar, por favor avisá en el canal <#${
		config.slack.channel
	}>.`;

const itsTimeMessage = (user, minsToGo) =>
	`Hola ${user.name}, te aviso que tu almuerzo estará pronto en ${minsToGo} minutos.\n\nSi precisás cambiar la hora por favor avisame personalmente (estoy en la cocina) o en el canal <#${config.slack.channel}>.`;

const footer = '\n\n(Este mensaje fue enviado por un bot)';

class BotService {
	dayReminder(user, time) {
		return dayReminderMessage(user, time) + footer;
	}

	itsTime(user, minsToGo) {
		return itsTimeMessage(user, minsToGo) + footer;
	}
}

module.exports = new BotService();
