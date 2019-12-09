process.env.TZ = 'UTC';

function isSameDate(date1, date2) {
	return date1.getYear() === date2.getYear() && this.isSameYearDate(date1, date2);
}

function isSameYearDate(date1, date2) {
	return date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

function addDays(date, days) {
	date = new Date(date);
	date.setDate(date.getDate() + days);
	return date;
}

module.exports = {
	isSameDate,
	isSameYearDate,
	addDays
};
