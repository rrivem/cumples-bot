const google = require('googleapis');
const authentication = require('./auth');
const { spreadsheet } = require('./config');

const columnsIds = {
	name: 'Nombre completo',
	active: 'Activo',
	mail: 'Correo en Slack',
	companyStart: 'Fecha de ingreso',
	birthdate: 'Fecha de nacimiento',
};

const parseList = (people) => {
	const columns = Object.keys(columnsIds).reduce((res, k) => ({ ...res, [k]: people[0].indexOf(columnsIds[k]) }), {});
	return people
		.slice(1)
		.filter((i) => i[columns.active] === 'SI')
		.map((i) => ({
			name: i[columns.name],
			mail: i[columns.mail],
			companyStart: new Date(i[columns.companyStart]),
			birthdate: new Date(i[columns.birthdate]),
		}));
};

function getData(auth) {
	return new Promise((resolve, reject) => {
		var sheets = google.sheets('v4');
		// obtener datos de la planilla
		sheets.spreadsheets.get({ auth, spreadsheetId: spreadsheet.id }, (err) => {
			if (err) {
				return reject(err);
			}

			sheets.spreadsheets.values.batchGet(
				{ auth, spreadsheetId: spreadsheet.id, ranges: spreadsheet.ranges },
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

const getList = () => authentication.authenticate(spreadsheet).then((auth) => getData(auth));

module.exports = {
	getList,
};
