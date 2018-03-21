const { getList } = require('./spreadsheet');
const { shouldRunToday, dontRunToday, sameDate } = require('./run-today');
const notification = require('./notification');
const config = require('./config');

if (!sameDate(new Date(), shouldRunToday())) {
	getList().then(({ people, list }) => {
		const now = new Date();
		if (!list.some(i => sameDate(i.time, now))) {
			dontRunToday(now);
		} else {
			list.forEach(({ time, person }) => {
				const minsToGo = (time - now) / 60000;
				if (minsToGo > 0 && minsToGo < config.minsBeforeNotice) {
					const user = people.find(p => p.name === person);
					notification.itsTime(user, Math.floor(minsToGo));
				}
			});
		}
	});
}
