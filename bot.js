const itsTimeMessage = (user, minsToGo) =>
	`Hola ${user.name}, te aviso que te tocan los masajes en ${minsToGo} minutos.`;

class BotService {
	itsTime(user, minsToGo) {
		return itsTimeMessage(user, minsToGo);
	}
}

module.exports = new BotService();
