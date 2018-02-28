const { getList } = require('./spreadsheet');
const notification = require('./notification');
const config = require('./config');

getList().then(({ people, list }) => {
	const now = new Date();
	list.forEach(({ time, person }) => {
		const minsToGo = (time - now) / 60000;
		if (minsToGo > 0 && minsToGo < config.minsBeforeNotice) {
			const user = people.find(p => p.name === person);
			notification.itsTime(user, Math.floor(minsToGo));
		}
	});
});
