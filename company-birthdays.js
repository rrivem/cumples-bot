require('./polyfill');
const { getList } = require('./spreadsheet');
const { isSameYearDate } = require('./dates');
const notification = require('./notification');
const now = new Date();

(async function() {
	const list = await getList();
	const birthdaysList = list.filter(i => isSameYearDate(i.companyStart, now));

	if (!birthdaysList.length) {
		console.info('No company birthdays today');
	} else {
		await notification.setup();

		await birthdaysList.map(person =>
			notification.companyBirthday(person, now.getFullYear() - person.companyStart.getFullYear())
		);
	}
})();
