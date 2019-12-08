const fs = require('fs');
const filename = 'run-checks.json';
process.env.TZ = 'UTC';

class RunChecks {
	constructor() {
		try {
			const file = JSON.parse(fs.readFileSync(filename, 'utf-8'));
			this.run = new Date(file.run);
		} catch (err) {
			this.run = new Date(0);
		}
	}

	save() {
		fs.writeFileSync(filename, JSON.stringify({ run: this.run }), 'utf-8');
	}

	get lastRun() {
		return this.run;
	}

	set lastRun(date) {
		this.run = date;
		this.save();
	}

	isSameDate(date1, date2) {
		return date1.getYear() === date2.getYear() && this.isSameYearDate(date1, date2);
	}

	isSameYearDate(date1, date2) {
		return date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
	}
}

module.exports = new RunChecks();
