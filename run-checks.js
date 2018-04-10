const fs = require('fs');
const filename = 'run-checks.json';

class RunChecks {
	constructor() {
		try {
			const file = JSON.parse(fs.readFileSync(filename, 'utf-8'));
			this.shouldRunToday = new Date(file.shouldRunToday);
			this.dayReminderSent = new Date(file.dayReminderSent);
		} catch (err) {
			this.shouldRunToday = new Date('2018-03-20');
			this.dayReminderSent = new Date('2018-03-20');
		}
	}

	save() {
		fs.writeFileSync(
			filename,
			JSON.stringify({ shouldRunToday: this.shouldRunToday, dayReminderSent: this.dayReminderSent }),
			'utf-8'
		);
	}

	get lastShouldRunToday() {
		return this.shouldRunToday;
	}

	set lastShouldRunToday(date) {
		this.shouldRunToday = date;
		this.save();
	}

	get lastDayReminderSent() {
		return this.dayReminderSent;
	}

	set lastDayReminderSent(date) {
		this.dayReminderSent = date;
		this.save();
	}

	isSameDate(date1, date2) {
		return date1.getYear() === date2.getYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate();
	}
}

module.exports = new RunChecks();
