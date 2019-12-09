const config = require('./config').spreadsheet;

class Authentication {
	authenticate() {
		return Promise.resolve(config.apiKey);
	}
}

module.exports = new Authentication();
