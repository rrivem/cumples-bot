require('./polyfill');
const { getList } = require('./healthy-breaks-spreadsheet');
const { isSameYearDate } = require('./dates');
const notification = require('./notification');
const now = new Date();

(async function () {
	const list = await getList();
	const healthyBreakList = list.filter((i) => isSameYearDate(i.date, now));

	if (!healthyBreakList.length) {
		console.info('No healthy breaks today');
	} else {
		await healthyBreakList.map((info) => notification.healthyBreak(info));
	}
})();
