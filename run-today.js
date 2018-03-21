const fs = require('fs');
const filename = 'run-today.json';

const shouldRunToday = () => {
	try {
		const file = JSON.parse(fs.readFileSync(filename, 'utf-8'));
		return new Date(file.date);
	} catch (err) {
		return new Date('2018-03-20');
	}
};

const dontRunToday = date => {
	fs.writeFileSync(filename, JSON.stringify({ date }), 'utf-8');
};

const sameDate = (date1, date2) =>
	date1.getYear() === date2.getYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();

module.exports = {
	shouldRunToday,
	dontRunToday,
	sameDate
};
