require('./polyfill');
const { getList } = require('./spreadsheet');
const { isSameYearDate } = require('./dates');
const notification = require('./notification');
const now = new Date();

(async function() {
	const list = await getList();
	const birthdaysList = list.filter(i => isSameYearDate(i.birthdate, now));

	if (!birthdaysList.length) {
		console.info('No birthdays today');
	} else {
		await notification.setup();

		return birthdaysList.map(person => notification.birthday(person));
	}
})();
