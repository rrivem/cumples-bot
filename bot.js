const itsTimeMessage = (user, minsToGo) =>
	`Hola ${user.name}, te aviso que te tocan los masajes en ${minsToGo} minutos. (Este mensaje fue enviado por un bot)`;

class BotService {
	itsTime(user, minsToGo) {
		return itsTimeMessage(user, minsToGo);
	}
}

module.exports = new BotService();
