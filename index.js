require('./polyfill');
const { getList } = require('./spreadsheet');
const runChecks = require('./run-checks');
const notification = require('./notification');
const config = require('./config');

if (!runChecks.isSameDate(new Date(), runChecks.lastShouldRunToday)) {
	getList().then(({ people, list }) => {
		const now = new Date();
		todayList = list.filter(i => runChecks.isSameDate(i.time, now));

		if (!todayList.length) {
			runChecks.lastShouldRunToday = now;
		} else {
			notification.setup().then(() => {
				if (
					!runChecks.isSameDate(now, runChecks.lastDayReminderSent) &&
					now.getHours() >= config.dayReminderHour
				) {
					// notify today is massage day
					todayList.forEach(({ time, person }) => {
						const user = people.find(p => p.name === person);
						if (user) {
							notification.dayReminder(user, time);
						}
					});
					runChecks.lastDayReminderSent = now;
				}

				// notify when it's time
				todayList.forEach(({ time, person }) => {
					const minsToGo = (time - now) / 60000;
					if (minsToGo > 0 && minsToGo < config.minsBeforeNotice) {
						const user = people.find(p => p.name === person);
						notification.itsTime(user, Math.floor(minsToGo));
					}
				});
			});
		}
	});
}
