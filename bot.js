const config = require('./config');

const updateSheet = `actualizá la planilla de masajes: https://docs.google.com/spreadsheets/d/${config.spreadsheet.id}`;

const dayReminderMessage = (user, time) =>
	`Hola ${user.name}, hoy te tocan los masajes a las ${time.getHours()}:${time
		.getMinutes()
		.toString()
		.padStart(2, '0')}.\n\nSi ya sabés que NO podés asistir en ese horario, por favor ${updateSheet}`;

const itsTimeMessage = (user, minsToGo) =>
	`Hola ${
		user.name
	}, te aviso que te tocan los masajes en ${minsToGo} minutos.\n\nSi NO podés asistir, por favor avisá en el canal <#C1CNEG2L9> y ${updateSheet}`;

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
