require('./polyfill');
const { getList } = require('./spreadsheet');
const { isSameYearDate, addDays } = require('./dates');
const notification = require('./notification');
const now = new Date();

(async function() {
	const list = await getList();
	const birthdaysList = list.filter(i => isSameYearDate(i.companyStart, now));
	if (now.getDay() === 1) {
		// notify on Mondays the birthdays from last Saturday and Sunday
		birthdaysList.push(
			...list.filter(i => isSameYearDate(i.companyStart, addDays(now, -2))).map(p => ({ ...p, on: 'Sábado' })),
			...list.filter(i => isSameYearDate(i.companyStart, addDays(now, -1))).map(p => ({ ...p, on: 'Domingo' }))
		);
	}

	if (!birthdaysList.length) {
		console.info('No company birthdays today');
	} else {
		await notification.setup();

		await birthdaysList.map(person =>
			notification.companyBirthday(person, now.getFullYear() - person.companyStart.getFullYear())
		);
	}
})();
