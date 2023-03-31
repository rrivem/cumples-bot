const google = require('googleapis');
const authentication = require('./auth');
const { healthyBreaksSpreadsheet } = require('./config');

const columnsIds = {
	date: 'Fecha',
	text: 'Texto',
	links: 'Enlaces',
};

const parseList = (info) => {
	const columns = Object.keys(columnsIds).reduce((res, k) => ({ ...res, [k]: info[0].indexOf(columnsIds[k]) }), {});
	return info.slice(1).map((i) => ({
		date: new Date(i[columns.date]),
		text: i[columns.text],
		links: i[columns.links].split('\n').filter((l) => l),
	}));
};

function getData(auth) {
	return new Promise((resolve, reject) => {
		var sheets = google.sheets('v4');
		// obtener datos de la planilla
		sheets.spreadsheets.get({ auth, spreadsheetId: healthyBreaksSpreadsheet.id }, (err) => {
			if (err) {
				return reject(err);
			}

			sheets.spreadsheets.values.batchGet(
				{ auth, spreadsheetId: healthyBreaksSpreadsheet.id, ranges: healthyBreaksSpreadsheet.ranges },
				(err, { valueRanges }) => {
					if (err) {
						return reject(err);
					}
					return resolve(valueRanges.reduce((res, list) => [...res, ...parseList(list.values)], []));
				}
			);
		});
	});
}

const getList = () => authentication.authenticate(healthyBreaksSpreadsheet).then((auth) => getData(auth));

module.exports = {
	getList,
};
