require('./polyfill');
const { getList } = require('./spreadsheet');
const runChecks = require('./run-checks');
const notification = require('./notification');
const config = require('./config');

const now = new Date();
if (!runChecks.isSameDate(now, runChecks.lastRun) && now.getHours() >= config.runHourUTC) {
	// run once a day
	getList().then(list => {
		const birthdaysList = list.filter(i => runChecks.isSameYearDate(i.birthdate, now));

		if (!birthdaysList.length) {
			runChecks.lastRun = now;
		} else {
			notification.setup().then(() => {
				birthdaysList.forEach(person => notification.birthday(person));
				runChecks.lastRun = now;
			});
		}
	});
}
